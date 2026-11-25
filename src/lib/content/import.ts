import "server-only";
import { db } from "@/lib/db";
import { defaultProjects } from "./defaults";
import { PROJECTS_IMPORTED_KEY } from "./queries";

/**
 * İlk proje işleminde mevcut projeler veritabanına aktarılır; böylece sitede hiçbir proje kaybolmaz.
 * Tekrar çağrıldığında bir şey yapmaz. Yalnızca yetkisi doğrulanmış admin kodundan çağrılmalıdır.
 */
export async function ensureProjectsImported() {
  const imported = await db().setting.findUnique({ where: { key: PROJECTS_IMPORTED_KEY } });
  if (imported) return;
  await db().$transaction([
    db().project.createMany({
      data: defaultProjects.map((project, index) => ({ ...project, sortOrder: index })),
      skipDuplicates: true,
    }),
    db().setting.create({ data: { key: PROJECTS_IMPORTED_KEY, value: { at: new Date().toISOString() } } }),
  ]);
}
