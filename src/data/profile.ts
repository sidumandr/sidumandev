import type { ProfileEntry } from "@/types/portfolio";
export const profile = [
  { key: "konum", value: "Türkiye" },
  { key: "odak", value: "web · api · veritabanı" },
  { key: "stack", value: ["React", "Next.js", ".NET", "Django"] },
  { key: "durum", value: "müsait", available: true },
] as const satisfies readonly ProfileEntry[];
