import { NextResponse, type NextRequest } from "next/server";
import {
  OAUTH_STATE_COOKIE,
  SESSION_COOKIE,
  adminLogin,
  createSessionToken,
  isGithubConfigured,
  safeEqual,
  sessionCookieOptions,
} from "@/lib/auth";

function fail(request: NextRequest, reason: string) {
  const login = new URL("/admin/giris", request.url);
  login.searchParams.set("hata", reason);
  const response = NextResponse.redirect(login);
  response.cookies.delete({ name: OAUTH_STATE_COOKIE, path: "/api/auth/github" });
  return response;
}

export async function GET(request: NextRequest) {
  if (!isGithubConfigured()) return fail(request, "yapilandirma");
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;
  if (!code || !state || !expectedState || !safeEqual(state, expectedState)) return fail(request, "oturum");

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: new URL("/api/auth/github/callback", request.url).toString(),
      }),
      cache: "no-store",
    });
    const token = (await tokenResponse.json()) as { access_token?: string };
    if (!token.access_token) return fail(request, "github");

    const userResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token.access_token}`, Accept: "application/vnd.github+json", "User-Agent": "siduman-admin" },
      cache: "no-store",
    });
    const user = (await userResponse.json()) as { login?: string };
    if (user.login?.toLowerCase() !== adminLogin()) return fail(request, "yetkisiz");

    const response = NextResponse.redirect(new URL("/admin", request.url));
    response.cookies.delete({ name: OAUTH_STATE_COOKIE, path: "/api/auth/github" });
    response.cookies.set(SESSION_COOKIE, createSessionToken(adminLogin()), sessionCookieOptions);
    return response;
  } catch (error) {
    console.error("GitHub girişi tamamlanamadı.", error);
    return fail(request, "github");
  }
}
