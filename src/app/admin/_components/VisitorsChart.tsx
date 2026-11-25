"use client";
import { useState } from "react";
import styles from "../admin.module.css";

interface Day { day: string; visitors: number; pageviews: number }

const dateLabel = (day: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("tr-TR", { ...options, timeZone: "UTC" }).format(new Date(day + "T00:00:00Z"));

/** Tek seri (günlük ziyaretçi) çubuk grafik; üzerine gelince değer, altında tablo görünümü. */
export function VisitorsChart({ data }: { data: Day[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const width = 1000;
  const height = 220;
  const max = Math.max(4, ...data.map(day => day.visitors));
  const step = width / data.length;
  const gap = data.length > 60 ? 1 : 2;
  const barWidth = Math.max(1, step - gap);
  const scale = (value: number) => (value / max) * (height - 8);
  const active = hover === null ? null : data[hover];

  return (
    <div className={styles.chart}>
      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Son ${data.length} günde günlük ziyaretçi sayısı; en yüksek ${max}.`}
        onMouseLeave={() => setHover(null)}
      >
        {[0.5, 1].map(ratio => (
          <line key={ratio} x1="0" x2={width} y1={height - scale(max * ratio)} y2={height - scale(max * ratio)} stroke="rgb(255 255 255 / .07)" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
        ))}
        <line x1="0" x2={width} y1={height} y2={height} stroke="rgb(255 255 255 / .18)" vectorEffect="non-scaling-stroke" />
        {data.map((day, index) => {
          const barHeight = Math.max(day.visitors > 0 ? 3 : 0, scale(day.visitors));
          return (
            <g key={day.day} onMouseEnter={() => setHover(index)}>
              <rect x={index * step} y={0} width={step} height={height} fill="transparent" />
              <rect
                x={index * step + gap / 2}
                y={height - barHeight}
                width={barWidth}
                height={barHeight}
                rx={Math.min(4, barWidth / 2)}
                fill="#ffe14d"
                opacity={hover === null || hover === index ? 0.9 : 0.35}
              />
            </g>
          );
        })}
      </svg>
      {active && hover !== null && (
        <div className={styles.tooltip} style={{ left: `${((hover + 0.5) / data.length) * 100}%`, top: `${((height - scale(active.visitors)) / height) * 220}px` }}>
          <strong>{dateLabel(active.day, { day: "numeric", month: "long", weekday: "short" })}</strong>
          {active.visitors} ziyaretçi, {active.pageviews} görüntüleme
        </div>
      )}
      <div className={styles.axis} aria-hidden="true">
        <span>{data[0] && dateLabel(data[0].day, { day: "numeric", month: "short" })}</span>
        <span>{data.at(-1) && dateLabel(data.at(-1)!.day, { day: "numeric", month: "short" })}</span>
      </div>
      <details className={styles.tableToggle}>
        <summary>Tablo olarak gör</summary>
        <table className={styles.table}>
          <thead><tr><th>Gün</th><th>Ziyaretçi</th><th>Görüntüleme</th></tr></thead>
          <tbody>
            {data.toReversed().map(day => (
              <tr key={day.day}><td>{dateLabel(day.day, { day: "numeric", month: "long" })}</td><td>{day.visitors}</td><td>{day.pageviews}</td></tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
