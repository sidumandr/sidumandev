import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { SESSION_COOKIE, authSecret, verifySessionToken } from "@/lib/auth";
import { eventTypes } from "@/lib/analytics/events";
import { isBot, parseUserAgent, referrerHost, visitorHash } from "@/lib/analytics/visitor";
import { db, hasDatabase } from "@/lib/db";

const payloadSchema = z.object({
  t: z.enum(eventTypes),
  p: z.string().max(200).startsWith("/"),
  pv: z.string().max(40),
  n: z.string().max(60).optional(),
  l: z.string().max(120).optional(),
  r: z.string().max(500).optional(),
  u: z.string().max(60).optional(),
  d: z.number().int().min(0).max(30 * 60 * 1000).optional(),
});

const accepted = () => new NextResponse(null, { status: 204 });

export async function POST(request: NextRequest) {
  const secret = authSecret();
  if (!hasDatabase || !secret) return accepted();

  const userAgent = request.headers.get("user-agent") ?? "";
  if (isBot(userAgent)) return accepted();
  // Admin olarak gezinirken kendi ziyaretlerin sayılmaz.
  if (verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) return accepted();

  if (Number(request.headers.get("content-length") ?? 0) > 2000) return new NextResponse(null, { status: 413 });
  const raw = await request.text();
  if (raw.length > 2000) return new NextResponse(null, { status: 413 });
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) return new NextResponse(null, { status: 400 });
  const event = parsed.data;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "0.0.0.0";
  const country = request.headers.get("x-vercel-ip-country");
  const isPageview = event.t === "pageview";

  try {
    await db().event.create({
      data: {
        type: event.t,
        name: event.n ?? null,
        label: event.l ?? null,
        path: event.p,
        pageview: event.pv,
        visitor: visitorHash(ip, userAgent, secret),
        duration: event.d ?? null,
        // Kaynak, ülke ve cihaz bilgisi yalnızca sayfa görüntülemesinde tutulur.
        ...(isPageview && {
          referrer: referrerHost(event.r, request.nextUrl.hostname),
          utmSource: event.u ?? null,
          country: country && /^[A-Z]{2}$/.test(country) ? country : null,
          ...parseUserAgent(userAgent),
        }),
      },
    });
  } catch (error) {
    console.error("Ziyaret kaydedilemedi.", error);
  }
  return accepted();
}
