import type { SkillGroupData } from "@/types/portfolio";
export const skillGroups = [
  { title: "Diller", skills: ["TypeScript", "JavaScript", "Python", "C#"] },
  { title: "Frontend", skills: ["React", "Next.js"] },
  { title: "UI ve stil", skills: ["Tailwind CSS", "shadcn/ui"] },
  { title: "Backend", skills: ["Node.js", "NestJS", "ASP.NET Core", "Django"] },
  { title: "Mobil ve masaüstü", skills: ["React Native", "Expo", "Electron"] },
  { title: "Veritabanları", skills: ["PostgreSQL", "Microsoft SQL Server", "MongoDB"] },
  { title: "Sorgulama", skills: ["SQL", "NoSQL"] },
  { title: "Veri erişimi ve önbellekleme", skills: ["Prisma ORM", "Redis"] },
  { title: "Mesaj kuyrukları ve görev işleme", skills: ["BullMQ"] },
  { title: "Yapay zekâ uygulamaları", skills: ["LangChain", "RAG"] },
  { title: "Altyapı ve geliştirme", skills: ["Caddy", "Docker", "CI/CD", "Git"] },
  { title: "AI Tools", skills: ["Claude Code", "Codex", "Qwen"] },
] as const satisfies readonly SkillGroupData[];
