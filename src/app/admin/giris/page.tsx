import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { authSecret, devLoginEnabled, getAdmin, isGithubConfigured } from "@/lib/auth";
import styles from "../admin.module.css";

export const metadata: Metadata = { title: "Giriş" };

const errors: Record<string, string> = {
  yetkisiz: "Bu GitHub hesabının admin paneline erişim izni yok.",
  oturum: "Giriş isteği doğrulanamadı. Tekrar dene.",
  github: "GitHub ile bağlantı kurulamadı. Biraz sonra tekrar dene.",
  yapilandirma: "GitHub girişi henüz yapılandırılmamış.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ hata?: string }> }) {
  if (await getAdmin()) redirect("/admin");
  const { hata } = await searchParams;
  const github = isGithubConfigured();
  const secret = Boolean(authSecret());

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <div className={styles.brand} style={{ padding: 0 }}><span className={styles.mark} aria-hidden="true" />siduman</div>
        <h1>Admin paneli</h1>
        <p className={styles.muted}>İçeriği yönetmek ve ziyaretçi istatistiklerini görmek için GitHub hesabınla giriş yap.</p>
        {hata && errors[hata] && <p className={styles.statusError} role="alert">{errors[hata]}</p>}

        {github && secret ? (
          <a className={styles.button + " " + styles.primary} href="/api/auth/github">GitHub ile giriş yap</a>
        ) : (
          <div className={styles.notice}>
            Giriş için ortam değişkenleri eksik:{" "}
            {!secret && <code>AUTH_SECRET</code>}{" "}
            {!github && <><code>GITHUB_CLIENT_ID</code> <code>GITHUB_CLIENT_SECRET</code></>}.
            Ayrıntılar <code>.env.example</code> dosyasında.
          </div>
        )}

        {devLoginEnabled && (
          <form action="/api/auth/dev" method="post">
            <button className={styles.button} style={{ width: "100%" }}>Yerel geliştirici girişi</button>
            <p className={styles.hint} style={{ marginTop: 8 }}>Yalnızca <code>npm run dev</code> altında görünür; canlı sitede yoktur.</p>
          </form>
        )}
      </div>
    </div>
  );
}
