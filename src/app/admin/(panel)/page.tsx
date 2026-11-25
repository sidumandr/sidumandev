import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { clickEvents, trackedSections, type ClickEvent } from "@/lib/analytics/events";
import { getDashboard, ranges, type Range, type Totals } from "@/lib/analytics/stats";
import { requireAdmin } from "@/lib/auth";
import { VisitorsChart } from "../_components/VisitorsChart";
import styles from "../admin.module.css";

export const metadata: Metadata = { title: "Genel bakış" };

const number = new Intl.NumberFormat("tr-TR");
const regionNames = new Intl.DisplayNames(["tr"], { type: "region" });

function duration(seconds: number) {
  if (seconds < 60) return `${seconds} sn`;
  return `${Math.floor(seconds / 60)} dk ${seconds % 60} sn`;
}

function Delta({ current, previous }: { current: number; previous: number }) {
  if (previous === 0) return <span className={styles.delta}>önceki dönemde veri yok</span>;
  const change = Math.round(((current - previous) / previous) * 100);
  if (change === 0) return <span className={styles.delta}>önceki döneme göre aynı</span>;
  const Icon = change > 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={styles.delta + " " + (change > 0 ? styles.up : styles.down)}>
      <Icon size={14} aria-hidden="true" />%{Math.abs(change)} {change > 0 ? "artış" : "düşüş"}
    </span>
  );
}

function Kpi({ label, value, current, previous, field }: { label: string; value: string; current: Totals; previous: Totals; field: keyof Totals }) {
  return (
    <div className={styles.kpi}>
      <div className={styles.kpiLabel}>{label}</div>
      <div className={styles.kpiValue}>{value}</div>
      <Delta current={current[field]} previous={previous[field]} />
    </div>
  );
}

function Bars({ rows, empty }: { rows: { label: string; count: number }[]; empty: string }) {
  if (rows.length === 0) return <p className={styles.empty}>{empty}</p>;
  const max = Math.max(...rows.map(row => row.count));
  return (
    <ul className={styles.bars}>
      {rows.map(row => (
        <li key={row.label} className={styles.barRow}>
          <span className={styles.barLabel}>{row.label}</span>
          <span className={styles.barValue}>{number.format(row.count)}</span>
          <span className={styles.barTrack} aria-hidden="true"><span className={styles.barFill} style={{ display: "block", width: `${(row.count / max) * 100}%` }} /></span>
        </li>
      ))}
    </ul>
  );
}

export default async function Overview({ searchParams }: { searchParams: Promise<{ aralik?: string }> }) {
  await requireAdmin();
  const { aralik } = await searchParams;
  const range: Range = ranges.find(value => String(value) === aralik) ?? 30;
  const data = await getDashboard(range);
  const { totals, previous } = data;

  const sectionCounts = new Map(data.sections.map(section => [section.key, section.count]));
  const sectionBase = Math.max(totals.pageviews, 1);

  return (
    <>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Genel bakış</h1>
          <p className={styles.pageLead}>
            <span className={styles.live}>Son 5 dakikada sitede {data.live} kişi</span>
          </p>
        </div>
        <nav className={styles.segmented} aria-label="Tarih aralığı">
          {ranges.map(value => (
            <Link key={value} href={`/admin?aralik=${value}`} className={value === range ? styles.segmentActive : undefined} aria-current={value === range ? "page" : undefined}>
              {value} gün
            </Link>
          ))}
        </nav>
      </header>

      {!data.hasAnyData && (
        <p className={styles.notice} style={{ marginBottom: 16 }}>
          Henüz kaydedilmiş ziyaret yok. Site yayına alındığında ziyaretler burada görünmeye başlar. Admin olarak giriş yaptığın
          tarayıcıdaki ziyaretlerin sayılmaz.
        </p>
      )}

      <div className={styles.kpis}>
        <Kpi label="Ziyaretçi" value={number.format(totals.visitors)} current={totals} previous={previous} field="visitors" />
        <Kpi label="Sayfa görüntüleme" value={number.format(totals.pageviews)} current={totals} previous={previous} field="pageviews" />
        <Kpi label="Ortalama süre" value={duration(totals.avgSeconds)} current={totals} previous={previous} field="avgSeconds" />
        <Kpi label="İletişim (e-posta, CV)" value={number.format(totals.conversions)} current={totals} previous={previous} field="conversions" />
      </div>

      <div className={styles.stack}>
        <section className={styles.card} aria-labelledby="daily-title">
          <h2 id="daily-title" className={styles.cardTitle}>Günlük ziyaretçi <small>Son {range} gün, İstanbul saati</small></h2>
          <VisitorsChart data={data.daily} />
        </section>

        <div className={styles.grid2}>
          <section className={styles.card} aria-labelledby="sources-title">
            <h2 id="sources-title" className={styles.cardTitle}>Nereden geldiler <small>ziyaretçi</small></h2>
            <Bars rows={data.referrers.map(row => ({ label: row.key || "Doğrudan / bilinmiyor", count: row.count }))} empty="Henüz kaynak verisi yok." />
          </section>
          <section className={styles.card} aria-labelledby="sections-title">
            <h2 id="sections-title" className={styles.cardTitle}>Ne kadar aşağı indiler <small>görüntülemelerin yüzdesi</small></h2>
            <ul className={styles.bars}>
              {trackedSections.map(section => {
                const count = sectionCounts.get(section.id) ?? 0;
                const percent = Math.min(100, Math.round((count / sectionBase) * 100));
                return (
                  <li key={section.id} className={styles.barRow}>
                    <span className={styles.barLabel}>{section.label}</span>
                    <span className={styles.barValue}>%{percent}</span>
                    <span className={styles.barTrack} aria-hidden="true"><span className={styles.barFill} style={{ display: "block", width: `${percent}%` }} /></span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <section className={styles.card} aria-labelledby="clicks-title">
          <h2 id="clicks-title" className={styles.cardTitle}>En çok ilgi gören bağlantılar <small>tıklama</small></h2>
          <Bars
            rows={data.clicks.map(row => ({
              label: (clickEvents[row.name as ClickEvent] ?? row.name) + (row.label ? " (" + row.label + ")" : ""),
              count: row.count,
            }))}
            empty="Henüz tıklama yok."
          />
        </section>

        <div className={styles.grid3}>
          <section className={styles.card} aria-labelledby="countries-title">
            <h2 id="countries-title" className={styles.cardTitle}>Ülkeler</h2>
            <Bars
              rows={data.countries.map(row => {
                let label = "Bilinmiyor";
                if (row.key) {
                  try { label = regionNames.of(row.key) ?? row.key; } catch { label = row.key; }
                }
                return { label, count: row.count };
              })}
              empty="Ülke bilgisi yalnızca Vercel üzerinde gelir."
            />
          </section>
          <section className={styles.card} aria-labelledby="devices-title">
            <h2 id="devices-title" className={styles.cardTitle}>Cihazlar</h2>
            <Bars rows={data.devices.map(row => ({ label: row.key || "Bilinmiyor", count: row.count }))} empty="Henüz veri yok." />
          </section>
          <section className={styles.card} aria-labelledby="browsers-title">
            <h2 id="browsers-title" className={styles.cardTitle}>Tarayıcılar</h2>
            <Bars rows={data.browsers.map(row => ({ label: row.key || "Bilinmiyor", count: row.count }))} empty="Henüz veri yok." />
          </section>
        </div>

        <p className={styles.hint}>
          Ziyaretçiler çerez kullanılmadan, günlük değişen anonim bir kimlikle sayılır; aynı kişinin farklı günlerdeki ziyaretleri ayrı sayılır.
          Botlar ve admin oturumu açık tarayıcılar hariç tutulur.
        </p>
      </div>
    </>
  );
}
