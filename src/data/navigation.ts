import type { NavigationItem } from "@/types/portfolio";
export const navigation = [
  { id: "about", label: "hakkımda", command: "hakkimda" },
  { id: "projects", label: "projeler", command: "projeler" },
  { id: "certificates", label: "sertifikalar", command: "sertifikalar" },
  { id: "contact", label: "iletişim", command: "iletisim" },
] as const satisfies readonly NavigationItem[];
