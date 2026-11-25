import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { getPublicProjects, readSiteContent } from "@/lib/content/queries";
import { AppearanceForm } from "../../_components/AppearanceForm";
import styles from "../../admin.module.css";

export const metadata: Metadata = { title: "Görünüm" };

export default async function AppearancePage() {
  await requireAdmin();
  const [content, projects] = await Promise.all([readSiteContent(), getPublicProjects()]);
  const images = projects.flatMap(project => (project.imageUrl ? [project.imageUrl] : []));
  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Görünüm</h1>
          <p className={styles.pageLead}>Sitenin vurgu rengini ve ilk ekrandaki arka planı seç. Kaydettiğinde site hemen güncellenir.</p>
        </div>
      </header>
      <AppearanceForm initialValue={content.appearance} images={images} name={content.hero.name} headline={content.hero.headline} />
    </>
  );
}
