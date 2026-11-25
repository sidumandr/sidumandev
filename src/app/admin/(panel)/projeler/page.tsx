import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { ensureProjectsImported } from "@/lib/content/import";
import { toProjectView } from "@/lib/content/queries";
import type { ProjectView } from "@/lib/content/schema";
import { db } from "@/lib/db";
import { ProjectActions } from "../../_components/ProjectActions";
import styles from "../../admin.module.css";

export const metadata: Metadata = { title: "Projeler" };

function ProjectTable({ projects, empty }: { projects: ProjectView[]; empty: string }) {
  if (projects.length === 0) return <p className={styles.empty}>{empty}</p>;
  return (
    <table className={styles.table}>
      <thead>
        <tr><th className={styles.hideSmall}>Görsel</th><th>Proje</th><th className={styles.hideSmall}>Yıl</th><th><span className="sr-only">İşlemler</span></th></tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={project.id}>
            <td className={styles.hideSmall}>
              <div className={styles.thumb}>{project.imageUrl && <Image src={project.imageUrl} alt="" fill sizes="72px" />}</div>
            </td>
            <td>
              <div className={styles.projectTitle}>
                {project.title} {project.featured && <span className={styles.badge}>Öne çıkan</span>}
              </div>
              <div className={styles.projectSummary}>{project.summary}</div>
            </td>
            <td className={styles.hideSmall + " " + styles.muted}>{project.year ?? ""}</td>
            <td>
              <ProjectActions id={project.id} title={project.title} archived={project.archived} first={index === 0} last={index === projects.length - 1} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ kaydedildi?: string }> }) {
  await requireAdmin();
  await ensureProjectsImported();
  const { kaydedildi } = await searchParams;
  const projects = (await db().project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] })).map(toProjectView);
  const active = projects.filter(project => !project.archived);
  const archived = projects.filter(project => project.archived);

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Projeler</h1>
          <p className={styles.pageLead}>Sitede &quot;Yaptığım işler&quot; altında görünen projeler. Arşivlenen projeler sitede görünmez ama burada saklanır.</p>
        </div>
        <Link href="/admin/projeler/yeni" className={styles.button + " " + styles.primary}><Plus size={16} aria-hidden="true" />Yeni proje</Link>
      </header>
      {kaydedildi && <p className={styles.statusOk} role="status" style={{ marginBottom: 16 }}>&quot;{kaydedildi}&quot; kaydedildi ve sitede güncellendi.</p>}
      <div className={styles.stack}>
        <section className={styles.card} aria-labelledby="active-title">
          <h2 id="active-title" className={styles.cardTitle}>Yayında <small>{active.length} proje, sitedeki sırayla</small></h2>
          <ProjectTable projects={active} empty="Yayında proje yok. Sitede yalnızca ana proje görünecek." />
        </section>
        <section className={styles.card} aria-labelledby="archive-title">
          <h2 id="archive-title" className={styles.cardTitle}>Arşiv <small>{archived.length} proje</small></h2>
          <ProjectTable projects={archived} empty="Arşivde proje yok." />
        </section>
      </div>
    </>
  );
}
