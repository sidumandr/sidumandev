import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { OAUTH_STATE_COOKIE, authSecret, isGithubConfigured } from "@/lib/auth";

export function GET(request: NextRequest) {
  const login = new URL("/admin/giris", request.url);
  if (!isGithubConfigured() || !authSecret()) {
    login.searchParams.set("hata", "yapilandirma");
    return NextResponse.redirect(login);
  }
  const state = randomBytes(16).toString("hex");
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);
  authorize.searchParams.set("redirect_uri", new URL("/api/auth/github/callback", request.url).toString());
  authorize.searchParams.set("scope", "read:user");
  authorize.searchParams.set("allow_signup", "false");
  authorize.searchParams.set("state", state);

  const response = NextResponse.redirect(authorize);
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    path: "/api/auth/github",
    maxAge: 600,
  });
  return response;
}
