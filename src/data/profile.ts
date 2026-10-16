import type { ProfileEntry } from "@/types/portfolio";
export const profile = [
  { key: "isim", value: "Safa İlhan Duman" },
  { key: "rol", value: "Full-Stack Geliştirici" },
  { key: "konum", value: "Türkiye" },
  { key: "platformlar", value: ["Web", "Masaüstü", "Mobil"] },
  { key: "çalışma_alanları", value: [
    "Sistem tasarımı ve yazılım mimarisi",
    "Backend, API ve veritabanı geliştirme",
    "Sunucu yönetimi ve ağ yapılandırması",
    "Yapay zekâ entegrasyonları",
    "UI/UX tasarımı ve arayüz geliştirme",
  ] },
  { key: "yaklaşım", value: [
    "Güvenilir ve sürdürülebilir sistemler",
    "Performans ve güvenlik",
    "Test ve kod inceleme",
  ] },
  { key: "durum", value: "Yeni projelere açık", available: true },
] as const satisfies readonly ProfileEntry[];
