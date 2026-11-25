/** Sitedeki `data-track` değerleri ve admin panelindeki Türkçe karşılıkları. */
export const clickEvents = {
  project_live: "Canlı siteye gitti",
  project_source: "Kaynak koda gitti",
  flagship_open: "Ana proje detayını açtı",
  cta_projects: "Projelere bak düğmesi",
  cv: "CV",
  email_click: "E-posta bağlantısı",
  email_copy: "E-posta kopyalandı",
  github: "GitHub profili",
  linkedin: "LinkedIn profili",
} as const;

export type ClickEvent = keyof typeof clickEvents;

/** "İletişime dönüşen" sayılan tıklamalar. */
export const conversionEvents: ClickEvent[] = ["cv", "email_click", "email_copy"];

/** Sayfadaki bölümler, ziyaretçinin ne kadar aşağı indiğini göstermek için sırasıyla. */
export const trackedSections = [
  { id: "hero", label: "Giriş" },
  { id: "projects", label: "Projeler" },
  { id: "about", label: "Hakkımda" },
  { id: "certificates", label: "Sertifikalar" },
  { id: "contact", label: "İletişim" },
] as const;

export const eventTypes = ["pageview", "engagement", "section", "click"] as const;
