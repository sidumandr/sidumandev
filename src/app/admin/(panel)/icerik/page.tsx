import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { readSiteContent } from "@/lib/content/queries";
import { uploadsEnabled } from "@/lib/storage";
import { AboutForm, ContactForm, HeroForm, SeoForm } from "../../_components/ContentForms";
import styles from "../../admin.module.css";

export const metadata: Metadata = { title: "Sayfa içeriği" };

export default async function ContentPage() {
  await requireAdmin();
  const content = await readSiteContent();
  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Sayfa içeriği</h1>
          <p className={styles.pageLead}>Her bölüm ayrı kaydedilir ve kaydettiğin anda sitede yayına girer. Sertifikalar bölümü bu panelin dışında.</p>
        </div>
      </header>
      {!uploadsEnabled && (
        <p className={styles.notice} style={{ marginBottom: 16 }}>
          Dosya yükleme kapalı: Vercel projesine Blob deposu eklendiğinde <code>BLOB_READ_WRITE_TOKEN</code> tanımlanır ve CV ile proje görseli yüklenebilir.
        </p>
      )}
      <div className={styles.stack}>
        <HeroForm initialValue={content.hero} />
        <AboutForm initialValue={content.about} />
        <ContactForm initialValue={content.contact} />
        <SeoForm initialValue={content.seo} />
      </div>
    </>
  );
}
