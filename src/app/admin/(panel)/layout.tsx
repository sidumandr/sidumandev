import { ExternalLink, LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { logout } from "../actions";
import { AdminNav } from "../_components/AdminNav";
import styles from "../admin.module.css";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.mark} aria-hidden="true" />
          <span>siduman<small>Admin paneli</small></span>
        </div>
        <AdminNav />
        <div className={styles.sidebarFooter}>
          <span className={styles.user}>@{admin.login}</span>
          <a className={styles.navLink} href="/" target="_blank" rel="noopener noreferrer"><ExternalLink size={16} aria-hidden="true" />Siteyi aç</a>
          <form action={logout}>
            <button className={styles.navLink}><LogOut size={16} aria-hidden="true" />Çıkış yap</button>
          </form>
        </div>
      </aside>
      <main className={styles.main}>
        <div className={styles.mainInner}>
          {hasDatabase ? children : (
            <div className={styles.notice}>
              Veritabanı bağlı değil. Vercel projesine bir Postgres veritabanı (ör. Neon) ekleyip <code>DATABASE_URL</code> değişkenini tanımladığında
              içerik yönetimi ve istatistikler açılır. O zamana kadar site varsayılan içerikle çalışmaya devam eder.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
