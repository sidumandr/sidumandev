import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { readSiteContent } from "@/lib/content/queries";
import { FlagshipForm } from "../../_components/ContentForms";
import styles from "../../admin.module.css";

export const metadata: Metadata = { title: "Ana proje" };

export default async function FlagshipPage() {
  await requireAdmin();
  const { flagship } = await readSiteContent();
  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Ana proje</h1>
          <p className={styles.pageLead}>Sitedeki en güçlü işin. Metinleri sonuç ve sorumluluk odaklı tut; gizli müşteri bilgisi yazma.</p>
        </div>
      </header>
      <FlagshipForm initialValue={flagship} />
    </>
  );
}
