import { z } from "zod";
import { accentIds, heroBackgroundIds } from "@/lib/appearance";

const text = (max: number) => z.string().trim().min(1, "Bu alan boş bırakılamaz.").max(max, `En fazla ${max} karakter.`);
const optionalText = (max: number) => z.string().trim().max(max, `En fazla ${max} karakter.`);
const httpUrl = z.url({ protocol: /^https?$/, error: "Geçerli bir http(s) adresi gir." });
/** Boş bırakılabilen bağlantılar; boş değer `""` olarak saklanır. */
const optionalUrl = z.union([z.literal(""), httpUrl]);
/** Site içi yol (/uploads/…, /images/…) ya da tam adres. */
const assetUrl = z.union([z.literal(""), httpUrl, z.string().regex(/^\/[\w\-./]+$/, "Geçerli bir dosya yolu gir.")]);

export const metricSchema = z.object({ value: text(16), label: text(60) });

export const heroSchema = z.object({
  name: text(60),
  role: text(60),
  headline: text(120),
  subheadline: text(420),
  available: z.boolean(),
  availabilityText: optionalText(60),
  stack: z.array(text(40)).max(30),
});

export const aboutSchema = z.object({
  title: text(140),
  body: text(2000),
  skills: z.array(z.object({ title: text(40), items: z.array(text(40)).min(1).max(16) })).max(6),
  principles: z.array(z.object({ title: text(60), text: text(220) })).max(4),
});

export const contactSchema = z.object({
  title: text(120),
  text: text(300),
  email: z.email({ error: "Geçerli bir e-posta adresi gir." }),
  github: httpUrl,
  linkedin: optionalUrl,
  location: optionalText(60),
  cvUrl: assetUrl,
});

export const seoSchema = z.object({
  title: text(70),
  description: text(200),
});

/** Ana projede kullanılan bir teknoloji ve projedeki görevi. */
export const techItemSchema = z.object({ name: text(30), role: text(90) });

export const flagshipItemSchema = z.object({ title: text(90), description: text(400) });
export const flagshipSectionSchema = z.object({
  label: text(40),
  title: text(120),
  description: text(400),
  items: z.array(flagshipItemSchema).max(6),
});

/** Ana proje turunda gösterilebilecek, yeniden çizilmiş ekranlar. */
export const tourScreenIds = ["pools", "address", "operations", "monitoring", "overview"] as const;
export type TourScreenId = (typeof tourScreenIds)[number];

export const flagshipTourStepSchema = z.object({
  screen: z.enum(tourScreenIds),
  title: text(80),
  text: text(320),
  points: z.array(text(90)).max(4),
});

export const flagshipSchema = z.object({
  eyebrow: text(40),
  title: text(120),
  summary: text(400),
  role: text(80),
  ownership: text(800),
  pillars: z.array(text(40)).max(4),
  metrics: z.array(metricSchema).max(4),
  architectureTitle: text(120),
  architectureText: text(500),
  techStack: z.array(techItemSchema).max(12),
  sections: z.array(flagshipSectionSchema).max(10),
  tour: z.array(flagshipTourStepSchema).max(6),
});

export const appearanceSchema = z.object({
  heroBackground: z.enum(heroBackgroundIds),
  accent: z.enum(accentIds),
});

export const contentSchemas = {
  hero: heroSchema,
  about: aboutSchema,
  contact: contactSchema,
  seo: seoSchema,
  flagship: flagshipSchema,
  appearance: appearanceSchema,
} as const;

export type ContentKey = keyof typeof contentSchemas;
export const contentKeys = Object.keys(contentSchemas) as ContentKey[];

export type HeroContent = z.infer<typeof heroSchema>;
export type AboutContent = z.infer<typeof aboutSchema>;
export type ContactContent = z.infer<typeof contactSchema>;
export type SeoContent = z.infer<typeof seoSchema>;
export type FlagshipContent = z.infer<typeof flagshipSchema>;
export type TechItem = z.infer<typeof techItemSchema>;
export type FlagshipSection = z.infer<typeof flagshipSectionSchema>;
export type FlagshipTourStep = z.infer<typeof flagshipTourStepSchema>;
export type AppearanceContent = z.infer<typeof appearanceSchema>;
export type Metric = z.infer<typeof metricSchema>;

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
  seo: SeoContent;
  flagship: FlagshipContent;
  appearance: AppearanceContent;
}

export const projectSchema = z.object({
  title: text(80),
  slug: z.string().trim().max(80).regex(/^[a-z0-9-]*$/, "Yalnızca küçük harf, rakam ve tire kullan."),
  summary: text(180),
  description: optionalText(1200),
  tags: z.array(text(30)).max(6, "En fazla 6 etiket."),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  imageUrl: assetUrl,
  year: z.union([z.literal(""), z.coerce.number().int().min(2000).max(2100)]),
  featured: z.boolean(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

/** Sitede ve admin panelinde kullanılan, tarihleri içermeyen proje görünümü. */
export interface ProjectView {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  year: number | null;
  featured: boolean;
  archived: boolean;
}
