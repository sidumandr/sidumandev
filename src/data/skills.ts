import type { SkillGroupData } from "@/types/portfolio";
export const skillGroups = [
  { title: "Programlama dilleri", skills: ["TypeScript", "JavaScript", "Python", "C#"] },
  { title: "Framework ve kütüphaneler", skills: ["React", "Next.js", "React Native"] },
  { title: "Backend ve API", skills: ["NestJS", "Node.js", ".NET", "Django"] },
  { title: "UI ve stil", skills: ["Tailwind CSS", "shadcn/ui"] },
  { title: "Masaüstü ve mobil", skills: ["Electron", "Expo"] },
  { title: "Veritabanları", skills: ["PostgreSQL", "Microsoft SQL Server", "MongoDB"] },
  { title: "Sorgulama", skills: ["SQL", "NoSQL"] },
  { title: "Veri erişimi ve önbellekleme", skills: ["Prisma ORM", "Redis"] },
  { title: "Mesaj kuyrukları ve görev işleme", skills: ["BullMQ"] },
  { title: "Yapay zekâ uygulamaları", skills: ["LangChain", "RAG"] },
  { title: "AI Tools", skills: ["Claude Code", "Codex", "Qwen"] },
  { title: "Altyapı ve geliştirme", skills: ["Caddy", "Docker", "CI/CD", "Git"] },
] as const satisfies readonly SkillGroupData[];
