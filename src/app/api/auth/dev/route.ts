import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, adminLogin, createSessionToken, devLoginEnabled, sessionCookieOptions } from "@/lib/auth";

/** Yalnızca `next dev` altında çalışır; üretim derlemesinde 404 döner. */
export function POST(request: NextRequest) {
  if (!devLoginEnabled) return new NextResponse(null, { status: 404 });
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(SESSION_COOKIE, createSessionToken(adminLogin()), sessionCookieOptions);
  return response;
}
