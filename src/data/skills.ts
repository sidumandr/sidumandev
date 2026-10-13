import type { SkillGroupData } from "@/types/portfolio";
export const skillGroups = [
  { title: "programlama dilleri", skills: ["JavaScript", "TypeScript", "Python", "C#", "SQL"] },
  { title: "framework & kütüphaneler", skills: ["React", "Next.js", "Django", ".NET"] },
  { title: "veritabanları", skills: ["PostgreSQL", "SQL Server"] },
  { title: "ui & styling", skills: ["Tailwind CSS", "Shadcn UI"] },
  { title: "araçlar & devops", skills: ["Docker", "CI/CD", "Git"] },
] as const satisfies readonly SkillGroupData[];
