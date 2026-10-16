import type { SkillGroupData } from "@/types/portfolio";
export const skillGroups = [
  { title: "programlama dilleri", skills: ["JavaScript", "TypeScript", "Python", "C#"] },
  { title: "framework & kütüphaneler", skills: ["React", "Next.js", "Django", ".NET"] },
  { title: "sorgulama dilleri", skills: ["SQL"] },
  { title: "veritabanları", skills: ["PostgreSQL", "SQL Server"] },
  { title: "veri erişimi & orm", skills: ["Prisma ORM"] },
  { title: "önbellekleme", skills: ["Redis"] },
  { title: "kuyruk & arka plan işleri", skills: ["BullMQ"] },
  { title: "ui & styling", skills: ["Tailwind CSS", "Shadcn UI"] },
  { title: "sunucu & devops", skills: ["Nginx", "Docker", "CI/CD", "Git"] },
] as const satisfies readonly SkillGroupData[];
