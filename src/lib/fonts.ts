import { Inter, Inter_Tight } from "next/font/google";
import localFont from "next/font/local";

/** Metin. Türkçe karakterler latin-ext alt kümesinde. */
const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
/** Başlıklar. */
const display = Inter_Tight({ subsets: ["latin", "latin-ext"], variable: "--font-display", weight: ["500", "600", "700"], display: "swap" });
/** Küçük etiketler, rakamlar ve sertifika tablosu. */
const mono = localFont({ src: "../../public/fonts/geist-mono.ttf", variable: "--font-mono", weight: "100 900", display: "swap" });

export const fonts = [sans.variable, display.variable, mono.variable].join(" ");
