export type SectionId = "projects" | "about" | "certificates" | "contact";
export interface NavigationItem { id: SectionId; label: string; }
export interface Certificate { title: string; issuer: string; date: string; credentialUrl: string; logo: { darkSrc: string; brandRgb: string; src: string; width: number; height: number; square?: boolean }; }
