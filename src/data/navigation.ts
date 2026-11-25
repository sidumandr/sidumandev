import type { NavigationItem } from "@/types/portfolio";
export const navigation = [
  { id: "projects", label: "Projeler" },
  { id: "about", label: "Hakkımda" },
  { id: "certificates", label: "Sertifikalar" },
  { id: "contact", label: "İletişim" },
] as const satisfies readonly NavigationItem[];
