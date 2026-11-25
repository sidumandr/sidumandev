import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { ProjectForm } from "../../../_components/ProjectForm";
import styles from "../../../admin.module.css";

export const metadata: Metadata = { title: "Yeni proje" };

export default async function NewProjectPage() {
  await requireAdmin();
  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Yeni proje</h1>
          <p className={styles.pageLead}>Kaydettiğinde proje &quot;Yaptığım işler&quot; listesinin sonuna eklenir ve sitede hemen görünür.</p>
        </div>
      </header>
      <ProjectForm />
    </>
  );
}
