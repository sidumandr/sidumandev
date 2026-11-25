import "server-only";
import { createHash } from "node:crypto";
import { unstable_cache } from "next/cache";
import { db, hasDatabase } from "@/lib/db";
import type { Project } from "@/generated/prisma/client";
import { defaultContent, defaultProjects } from "./defaults";
import { contentKeys, contentSchemas, type ProjectView, type SiteContent } from "./schema";

export const CONTENT_TAG = "site-content";
export const PROJECTS_TAG = "projects";
/** Projeler bir kez içe aktarıldıktan sonra site varsayılan listeye dönmez. */
export const PROJECTS_IMPORTED_KEY = "meta.projectsImported";

export function toProjectView(project: Project): ProjectView {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    description: project.description,
    tags: project.tags,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    imageUrl: project.imageUrl,
    year: project.year,
    featured: project.featured,
    archived: project.archived,
  };
}

const defaultProjectViews: ProjectView[] = defaultProjects.map(project => ({ ...project, id: project.slug }));

/** Veritabanındaki her bölümü şemayla doğrular; eksik ya da bozuk bölüm varsayılana düşer. */
export async function readSiteContent(): Promise<SiteContent> {
  const rows = await db().setting.findMany({ where: { key: { in: contentKeys } } });
  const content = structuredClone(defaultContent);
  for (const row of rows) {
    const key = row.key as keyof SiteContent;
    // Sonradan eklenen alanlar eski kayıtlarda yoksa varsayılan değerle tamamlanır.
    const stored = row.value && typeof row.value === "object" && !Array.isArray(row.value) ? row.value : {};
    const parsed = contentSchemas[key].safeParse({ ...defaultContent[key], ...stored });
    if (parsed.success) Object.assign(content, { [key]: parsed.data });
    else console.error(`"${key}" içeriği şemaya uymuyor, varsayılan kullanılıyor.`, parsed.error.issues);
  }
  return content;
}

async function readPublicProjects(): Promise<ProjectView[]> {
  const imported = await db().setting.findUnique({ where: { key: PROJECTS_IMPORTED_KEY } });
  if (!imported) return defaultProjectViews.filter(project => !project.archived);
  const projects = await db().project.findMany({ where: { archived: false }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return projects.map(toProjectView);
}

/**
 * Varsayılan içerik koddan değiştiğinde (yeni deploy) eski önbellek kullanılmasın diye anahtara eklenir.
 * Panel dışından yapılan veritabanı değişiklikleri de en geç bir saat içinde yansır.
 */
const defaultsVersion = createHash("sha1").update(JSON.stringify([defaultContent, defaultProjects])).digest("hex").slice(0, 12);
const cacheOptions = { revalidate: 3600 };
const cachedContent = unstable_cache(readSiteContent, ["site-content", defaultsVersion], { ...cacheOptions, tags: [CONTENT_TAG] });
const cachedProjects = unstable_cache(readPublicProjects, ["public-projects", defaultsVersion], { ...cacheOptions, tags: [PROJECTS_TAG] });

/**
 * Hatalar önbelleğe alınmaz: veritabanına geçici olarak ulaşılamazsa site varsayılan
 * içerikle açılır ve bir sonraki istekte yeniden denenir.
 */
export async function getSiteContent(): Promise<SiteContent> {
  if (!hasDatabase) return defaultContent;
  try {
    return await cachedContent();
  } catch (error) {
    console.error("İçerik okunamadı, varsayılan içerik kullanılıyor.", error);
    return defaultContent;
  }
}

export async function getPublicProjects(): Promise<ProjectView[]> {
  if (!hasDatabase) return defaultProjectViews.filter(project => !project.archived);
  try {
    return await cachedProjects();
  } catch (error) {
    console.error("Projeler okunamadı, varsayılan liste kullanılıyor.", error);
    return defaultProjectViews.filter(project => !project.archived);
  }
}
