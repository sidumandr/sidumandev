import type { Certificate } from "@/types/portfolio";
export const certificates = [
  { title: "CS50W: CS50's Web Programming with Python and JavaScript", issuer: "Harvard University · edX", date: "2026-02", credentialUrl: "https://courses.edx.org/certificates/df59c255fe164665abc6584375322d8b" },
  { title: "Foundational C# with Microsoft", issuer: "Microsoft · freeCodeCamp", date: "2025-12", credentialUrl: "https://www.freecodecamp.org/certification/sidumandr/foundational-c-sharp-with-microsoft" },
  { title: "Intermediate Frontend Web Development Path", issuer: "Patika.dev", date: "2024-09", credentialUrl: "https://academy.patika.dev/certificates/fc50f94e" },
  { title: "React Basics", issuer: "Meta · Coursera", date: "2024-03", credentialUrl: "https://coursera.org/verify/5JXILKJ21THS" },
] as const satisfies readonly Certificate[];
