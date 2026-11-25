import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { conversionEvents } from "./events";

export const ranges = [7, 30, 90] as const;
export type Range = (typeof ranges)[number];

export interface Totals {
  visitors: number;
  pageviews: number;
  avgSeconds: number;
  conversions: number;
}

export interface Dashboard {
  range: Range;
  totals: Totals;
  previous: Totals;
  daily: { day: string; visitors: number; pageviews: number }[];
  referrers: { key: string; count: number }[];
  countries: { key: string; count: number }[];
  devices: { key: string; count: number }[];
  browsers: { key: string; count: number }[];
  sections: { key: string; count: number }[];
  clicks: { name: string; label: string | null; count: number }[];
  live: number;
  hasAnyData: boolean;
}

const TZ = "Europe/Istanbul";

async function totals(from: Date, to: Date): Promise<Totals> {
  const [row] = await db().$queryRaw<{ visitors: number; pageviews: number; engaged_ms: number; conversions: number }[]>`
    SELECT
      COUNT(DISTINCT visitor) FILTER (WHERE type = 'pageview')::int AS visitors,
      COUNT(*) FILTER (WHERE type = 'pageview')::int AS pageviews,
      COALESCE(SUM(duration) FILTER (WHERE type = 'engagement'), 0)::float8 AS engaged_ms,
      COUNT(*) FILTER (WHERE type = 'click' AND name IN (${Prisma.join(conversionEvents)}))::int AS conversions
    FROM "Event"
    WHERE "createdAt" >= ${from} AND "createdAt" < ${to}`;
  return {
    visitors: row.visitors,
    pageviews: row.pageviews,
    avgSeconds: row.pageviews ? Math.round(row.engaged_ms / row.pageviews / 1000) : 0,
    conversions: row.conversions,
  };
}

const breakdownColumns = { referrer: "referrer", country: "country", device: "device", browser: "browser" } as const;

async function breakdown(column: keyof typeof breakdownColumns, from: Date, limit = 6) {
  const rows = await db().$queryRaw<{ key: string | null; count: number }[]>`
    SELECT ${Prisma.raw(`"${breakdownColumns[column]}"`)} AS key, COUNT(DISTINCT visitor)::int AS count
    FROM "Event"
    WHERE type = 'pageview' AND "createdAt" >= ${from}
    GROUP BY 1 ORDER BY 2 DESC LIMIT ${limit}`;
  return rows.map(row => ({ key: row.key ?? "", count: row.count }));
}

export async function getDashboard(range: Range): Promise<Dashboard> {
  const now = new Date();
  const from = new Date(now.getTime() - range * 86_400_000);
  const previousFrom = new Date(from.getTime() - range * 86_400_000);

  const [current, previous, daily, referrers, countries, devices, browsers, sections, clicks, live, anyEvent] = await Promise.all([
    totals(from, now),
    totals(previousFrom, from),
    db().$queryRaw<{ day: string; visitors: number; pageviews: number }[]>`
      WITH days AS (
        SELECT generate_series(
          (now() AT TIME ZONE ${TZ})::date - ${range - 1}::int,
          (now() AT TIME ZONE ${TZ})::date,
          interval '1 day'
        )::date AS day
      )
      SELECT to_char(days.day, 'YYYY-MM-DD') AS day,
        COUNT(DISTINCT e.visitor)::int AS visitors,
        COUNT(e.id)::int AS pageviews
      FROM days
      LEFT JOIN "Event" e
        ON e.type = 'pageview'
        AND e."createdAt" >= ${previousFrom}
        AND (e."createdAt" AT TIME ZONE ${TZ})::date = days.day
      GROUP BY days.day ORDER BY days.day`,
    breakdown("referrer", from),
    breakdown("country", from),
    breakdown("device", from, 3),
    breakdown("browser", from, 5),
    db().$queryRaw<{ key: string; count: number }[]>`
      SELECT name AS key, COUNT(DISTINCT pageview)::int AS count
      FROM "Event" WHERE type = 'section' AND "createdAt" >= ${from}
      GROUP BY name`,
    db().$queryRaw<{ name: string; label: string | null; count: number }[]>`
      SELECT name, label, COUNT(*)::int AS count
      FROM "Event" WHERE type = 'click' AND "createdAt" >= ${from}
      GROUP BY name, label ORDER BY count DESC LIMIT 8`,
    db().$queryRaw<{ count: number }[]>`
      SELECT COUNT(DISTINCT visitor)::int AS count FROM "Event"
      WHERE "createdAt" >= now() - interval '5 minutes'`,
    db().event.findFirst({ select: { id: true } }),
  ]);

  return {
    range,
    totals: current,
    previous,
    daily,
    referrers,
    countries,
    devices,
    browsers,
    sections,
    clicks,
    live: live[0]?.count ?? 0,
    hasAnyData: Boolean(anyEvent),
  };
}
