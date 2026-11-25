import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { toProjectView } from "@/lib/content/queries";
import { db } from "@/lib/db";
import { ProjectForm } from "../../../_components/ProjectForm";
import styles from "../../../admin.module.css";

export const metadata: Metadata = { title: "Projeyi düzenle" };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const project = await db().project.findUnique({ where: { id } });
  if (!project) notFound();
  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{project.title}</h1>
          <p className={styles.pageLead}>{project.archived ? "Bu proje arşivde; sitede görünmüyor." : "Bu proje sitede yayında. Kaydettiğinde değişiklik hemen yansır."}</p>
        </div>
      </header>
      <ProjectForm project={toProjectView(project)} />
    </>
  );
}
