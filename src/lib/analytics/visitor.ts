import "server-only";
import { createHash } from "node:crypto";

const BOT_PATTERN =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|embedly|whatsapp|telegram|discord|slack|python|curl|wget|axios|node-fetch|go-http|java\/|okhttp|postman|insomnia/i;

export function isBot(userAgent: string): boolean {
  return !userAgent || BOT_PATTERN.test(userAgent);
}

/**
 * IP adresi saklanmaz. IP + tarayıcı bilgisi, gizli anahtar ve İstanbul saatine göre
 * o günün tarihiyle özetlenir; anahtar her gün değiştiği için ziyaretçi günler arasında izlenemez.
 */
export function visitorHash(ip: string, userAgent: string, secret: string): string {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul" }).format(new Date());
  return createHash("sha256").update([secret, day, ip, userAgent].join("|")).digest("base64url").slice(0, 22);
}

export function parseUserAgent(userAgent: string) {
  const device = /iPad|Tablet/i.test(userAgent) ? "Tablet" : /Mobi|Android|iPhone/i.test(userAgent) ? "Mobil" : "Masaüstü";
  const browser = /Edg\//.test(userAgent)
    ? "Edge"
    : /OPR\/|Opera/.test(userAgent)
      ? "Opera"
      : /SamsungBrowser/.test(userAgent)
        ? "Samsung Internet"
        : /Firefox\/|FxiOS/.test(userAgent)
          ? "Firefox"
          : /Chrome\/|CriOS/.test(userAgent)
            ? "Chrome"
            : /Safari\//.test(userAgent)
              ? "Safari"
              : "Diğer";
  const os = /Windows/.test(userAgent)
    ? "Windows"
    : /iPhone|iPad|iPod/.test(userAgent)
      ? "iOS"
      : /Mac OS X|Macintosh/.test(userAgent)
        ? "macOS"
        : /Android/.test(userAgent)
          ? "Android"
          : /Linux/.test(userAgent)
            ? "Linux"
            : "Diğer";
  return { device, browser, os };
}

/** Yönlendiren sitenin yalnızca alan adı tutulur; site içi geçişler "doğrudan" sayılır. */
export function referrerHost(referrer: string | undefined, ownHost: string): string | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (!host || host === ownHost.replace(/^www\./, "")) return null;
    if (/(^|\.)linkedin\.com$|^lnkd\.in$/.test(host)) return "linkedin.com";
    if (/(^|\.)google\.[a-z.]+$/.test(host)) return "google";
    if (/(^|\.)bing\.com$/.test(host)) return "bing.com";
    if (/(^|\.)(t\.co|x\.com|twitter\.com)$/.test(host)) return "x.com";
    return host.slice(0, 80);
  } catch {
    return null;
  }
}
