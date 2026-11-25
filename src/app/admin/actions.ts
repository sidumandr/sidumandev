"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import type { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { SESSION_COOKIE, requireAdmin } from "@/lib/auth";
import { ensureProjectsImported } from "@/lib/content/import";
import { CONTENT_TAG, PROJECTS_TAG } from "@/lib/content/queries";
import { contentSchemas, projectSchema, type ContentKey } from "@/lib/content/schema";
import { db } from "@/lib/db";
import { projectSlug } from "@/lib/format";
import { UploadError, uploadFile } from "@/lib/storage";

export interface ActionState {
  ok: boolean;
  message: string;
  issues?: string[];
  fieldErrors?: Record<string, string>;
  /** Kaydedilen içerik; sunucuda değişen alanlar (ör. yüklenen CV adresi) forma geri yazılır. */
  value?: unknown;
}

function issuesOf(error: z.ZodError): string[] {
  return error.issues.slice(0, 6).map(issue => (issue.path.length ? issue.path.join(" › ") + ": " : "") + issue.message);
}

function fieldErrorsOf(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    errors[key] ??= issue.message;
  }
  return errors;
}

function refreshSite(tag: string) {
  updateTag(tag);
  revalidatePath("/");
}

export async function saveProject(_previous: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  await ensureProjectsImported();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const raw = {
    title,
    slug: String(formData.get("slug") ?? "").trim() || projectSlug(title),
    summary: String(formData.get("summary") ?? ""),
    description: String(formData.get("description") ?? ""),
    tags: String(formData.get("tags") ?? "").split(",").map(tag => tag.trim()).filter(Boolean),
    githubUrl: String(formData.get("githubUrl") ?? "").trim(),
    liveUrl: String(formData.get("liveUrl") ?? "").trim(),
    imageUrl: formData.get("removeImage") === "on" ? "" : String(formData.get("imageUrl") ?? ""),
    year: String(formData.get("year") ?? "").trim(),
    featured: formData.get("featured") === "on",
  };
  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, message: "Bazı alanları düzeltmen gerekiyor.", fieldErrors: fieldErrorsOf(parsed.error) };
  const input = parsed.data;

  let imageUrl = input.imageUrl;
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    try {
      imageUrl = await uploadFile(image, "image", "projects", input.slug);
    } catch (error) {
      if (error instanceof UploadError) return { ok: false, message: error.message, fieldErrors: { image: error.message } };
      throw error;
    }
  }

  const data = {
    title: input.title,
    slug: input.slug,
    summary: input.summary,
    description: input.description,
    tags: input.tags,
    githubUrl: input.githubUrl || null,
    liveUrl: input.liveUrl || null,
    imageUrl: imageUrl || null,
    year: input.year === "" ? null : input.year,
    featured: input.featured,
  };

  try {
    if (id) {
      await db().project.update({ where: { id }, data });
    } else {
      const last = await db().project.aggregate({ _max: { sortOrder: true } });
      await db().project.create({ data: { ...data, sortOrder: (last._max.sortOrder ?? -1) + 1 } });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { ok: false, message: "Bu kısa adla başka bir proje var.", fieldErrors: { slug: "Bu kısa ad kullanılıyor." } };
    }
    throw error;
  }
  refreshSite(PROJECTS_TAG);
  redirect("/admin/projeler?kaydedildi=" + encodeURIComponent(input.title));
}

export async function setProjectArchived(id: string, archived: boolean) {
  await requireAdmin();
  if (typeof id !== "string" || typeof archived !== "boolean") return;
  await ensureProjectsImported();
  const last = await db().project.aggregate({ where: { archived }, _max: { sortOrder: true } });
  await db().project.update({ where: { id }, data: { archived, sortOrder: (last._max.sortOrder ?? -1) + 1 } });
  refreshSite(PROJECTS_TAG);
}

/** Aynı listedeki (aktif ya da arşiv) komşusuyla yer değiştirir. */
export async function moveProject(id: string, direction: "up" | "down") {
  await requireAdmin();
  if (typeof id !== "string" || (direction !== "up" && direction !== "down")) return;
  await ensureProjectsImported();
  const project = await db().project.findUniqueOrThrow({ where: { id } });
  const siblings = await db().project.findMany({
    where: { archived: project.archived },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });
  const order = siblings.map(sibling => sibling.id);
  const index = order.indexOf(id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= order.length) return;
  [order[index], order[target]] = [order[target], order[index]];
  await db().$transaction(order.map((projectId, sortOrder) => db().project.update({ where: { id: projectId }, data: { sortOrder } })));
  refreshSite(PROJECTS_TAG);
}

export async function deleteProject(id: string) {
  await requireAdmin();
  if (typeof id !== "string") return;
  await ensureProjectsImported();
  await db().project.delete({ where: { id } });
  refreshSite(PROJECTS_TAG);
}

export async function saveContent(key: ContentKey, _previous: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  if (!Object.hasOwn(contentSchemas, key)) return { ok: false, message: "Bilinmeyen içerik bölümü." };
  let value: unknown;
  try {
    value = JSON.parse(String(formData.get("payload") ?? ""));
  } catch {
    return { ok: false, message: "Form verisi okunamadı, sayfayı yenileyip tekrar dene." };
  }

  // İletişim bölümündeki CV dosyası ayrı alanla gelir.
  if (key === "contact" && value && typeof value === "object") {
    const cv = formData.get("cvFile");
    if (cv instanceof File && cv.size > 0) {
      try {
        (value as { cvUrl: string }).cvUrl = await uploadFile(cv, "pdf", "cv", "safa-ilhan-duman-cv");
      } catch (error) {
        if (error instanceof UploadError) return { ok: false, message: error.message };
        throw error;
      }
    }
  }

  const parsed = contentSchemas[key].safeParse(value);
  if (!parsed.success) return { ok: false, message: "Bazı alanları düzeltmen gerekiyor.", issues: issuesOf(parsed.error) };
  const json = parsed.data as Prisma.InputJsonValue;
  await db().setting.upsert({ where: { key }, create: { key, value: json }, update: { value: json } });
  refreshSite(CONTENT_TAG);
  return { ok: true, message: "Kaydedildi. Değişiklik sitede yayında.", value: parsed.data };
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/giris");
}
