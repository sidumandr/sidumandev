import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const kinds = {
  image: { types: { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/avif": "avif" }, maxBytes: 4 * 1024 * 1024 },
  pdf: { types: { "application/pdf": "pdf" }, maxBytes: 4 * 1024 * 1024 },
} as const;

export type UploadKind = keyof typeof kinds;

export class UploadError extends Error {}

export const uploadsEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN) || process.env.NODE_ENV === "development";

/**
 * Üretimde Vercel Blob'a, yerelde public/uploads klasörüne yazar ve herkese açık adresi döner.
 * Dosya türü ve boyutu sunucuda yeniden doğrulanır.
 */
export async function uploadFile(file: File, kind: UploadKind, folder: string, baseName: string): Promise<string> {
  const rule = kinds[kind];
  const extension = (rule.types as Record<string, string>)[file.type];
  if (!extension) throw new UploadError(kind === "image" ? "Yalnızca PNG, JPEG, WebP veya AVIF yükleyebilirsin." : "Yalnızca PDF yükleyebilirsin.");
  if (file.size > rule.maxBytes) throw new UploadError("Dosya en fazla 4 MB olabilir.");

  const safeBase = baseName.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "") || "dosya";
  const name = `${folder}/${safeBase}-${randomBytes(4).toString("hex")}.${extension}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(name, file, { access: "public", contentType: file.type });
    return blob.url;
  }
  if (process.env.NODE_ENV !== "development") throw new UploadError("Dosya yükleme için Vercel Blob yapılandırılmamış.");

  const target = path.join(process.cwd(), "public", "uploads", name);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}
