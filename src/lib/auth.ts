import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "siduman_admin";
export const OAUTH_STATE_COOKIE = "siduman_oauth_state";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const isDevelopment = process.env.NODE_ENV === "development";

/** Üretimde en az 32 karakterlik AUTH_SECRET zorunludur; yoksa admin paneli kapalı kalır. */
export function authSecret(): string | null {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 32) return secret;
  return isDevelopment ? "yalnizca-yerel-gelistirme-icin-kullanilan-anahtar" : null;
}

export function adminLogin(): string {
  return (process.env.ADMIN_GITHUB_LOGIN || "sidumandr").toLowerCase();
}

export function isGithubConfigured(): boolean {
  return Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);
}

export const devLoginEnabled = isDevelopment;

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createSessionToken(login: string): string {
  const secret = authSecret();
  if (!secret) throw new Error("AUTH_SECRET tanımlı değil.");
  const payload = Buffer.from(JSON.stringify({ login, exp: Date.now() + SESSION_MAX_AGE * 1000 })).toString("base64url");
  return payload + "." + sign(payload, secret);
}

export function verifySessionToken(token: string | undefined): { login: string } | null {
  const secret = authSecret();
  if (!secret || !token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload, secret))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { login?: unknown; exp?: unknown };
    if (typeof data.login !== "string" || typeof data.exp !== "number" || data.exp < Date.now()) return null;
    // ADMIN_GITHUB_LOGIN değişirse eski oturumlar geçersiz olur.
    return data.login === adminLogin() ? { login: data.login } : null;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: !isDevelopment,
  path: "/",
  maxAge: SESSION_MAX_AGE,
};

export async function getAdmin() {
  return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
}

/** Her admin sayfasında ve her server action'da çağrılır; layout tek başına action'ları korumaz. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/giris");
  return admin;
}
