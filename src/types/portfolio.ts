export type Theme = "dark" | "light";
export type SectionId = "about" | "projects" | "certificates" | "contact";
export interface NavigationItem { id: SectionId; label: string; command: string; }
export interface Project { title: string; description: string; tags: readonly string[]; github: string; live?: string; featured: boolean; }
export interface Certificate { title: string; issuer: string; date: string; credentialUrl: string; logo: { src: string; width: number; height: number; square?: boolean }; }
export interface SkillGroupData { title: string; skills: readonly string[]; }
export interface ProfileEntry { key: string; value: string | readonly string[]; available?: boolean; }
