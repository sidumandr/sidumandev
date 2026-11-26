"use client";
import { useId } from "react";
import { ArrowRight } from "lucide-react";
import { AppShell } from "./AppShell";
import { journey } from "./mock";
import { formatNumber, useCountUp } from "./ScreenFrame";
import styles from "./app.module.css";

const TOTAL = 10248;
const DELIVERED = 7914;
const WIDTH = 954;
const PIPE_Y = 140;
const columns = journey.map((_, index) => (WIDTH / journey.length) * (index + 0.5));

function Parcel({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x - 7} ${y})`} className={styles.nodeFill} stroke={color} strokeWidth="1.3">
      <rect width="14" height="11" rx="1.5" />
      <path d="M0.5 3.5h13M7 0.5v3M5 7h4" fill="none" />
    </g>
  );
}

/** Genel bakış ekranının yeniden çizimi: toplam gönderi, teslim oranı ve gönderinin aşamalar boyunca yolculuğu. */
export function OverviewScreen() {
  const total = useCountUp(TOTAL);
  const delivered = useCountUp(DELIVERED);
  const percent = TOTAL ? Math.round((delivered / TOTAL) * 100) : 0;
  const circumference = 2 * Math.PI * 92;
  const id = useId();
  const pipe = id + "pipe";
  const arrow = id + "arrow";

  return (
    <AppShell active="overview" deliveryOpen={false}>
      <section className={styles.hero}>
        <div>
          <p className={styles.date}>12 Mart 2026 Perşembe</p>
          <p className={styles.greeting}>İyi günler, Safa</p>
          <div className={styles.bigNumber} data-spot="total"><strong>{formatNumber(total)}</strong><span>gönderi takipte</span></div>
          <div className={styles.pills}>
            <span className={styles.pill}><b>4</b> proje</span>
            <span className={styles.pill + " " + styles.pillLive}>Son senkron az önce</span>
            <span className={styles.pill}><b>214</b> gönderi bugün kontrolde</span>
          </div>
          <div className={styles.heroActions}>
            <span className={styles.navyButton}>Ana sayfaya geç <ArrowRight size={16} /></span>
            <span className={styles.ghostButton}>Dağıtım süreci <ArrowRight size={16} /></span>
          </div>
        </div>
        <div>
          <div className={styles.ring} data-spot="ring">
            <svg viewBox="0 0 220 220" width="220" height="220">
              <circle cx="110" cy="110" r="92" fill="none" className={styles.ringTrack} strokeWidth="12" />
              <circle cx="110" cy="110" r="92" fill="none" className={styles.ringStroke} strokeWidth="12" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - percent / 100)} />
            </svg>
            <div className={styles.ringValue}><strong>%{percent}</strong><span>teslim edildi</span></div>
          </div>
          <p className={styles.ringCaption}>{formatNumber(delivered)} / {formatNumber(TOTAL)} gönderi teslim edildi</p>
        </div>
      </section>

      <section className={styles.journeyCard} data-spot="journey">
        <h4>Gönderinin yolculuğu</h4>
        <div className={styles.stages}>
          {journey.map(stage => (
            <div key={stage.label}>
              <span className={styles.stageLabel}><i style={{ background: stage.color }} />{stage.label}</span>
              <strong>{formatNumber(stage.count)}</strong>
            </div>
          ))}
        </div>
        <svg className={styles.journeySvg} width={WIDTH} height="200" viewBox={`0 0 ${WIDTH} 200`}>
          <defs>
            <linearGradient id={pipe} gradientUnits="userSpaceOnUse" x1="0" x2={WIDTH} y1="0" y2="0">
              {journey.map((stage, index) => <stop key={stage.label} offset={(index + 0.5) / journey.length} stopColor={stage.color} />)}
            </linearGradient>
            <marker id={arrow} viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 8 4 0 8Z" fill="#7c5cd6" />
            </marker>
          </defs>

          {/* Ana boru: aşamalar boyunca akan gönderiler */}
          {[-8, -4, 0, 4, 8].map(offset => (
            <g key={offset}>
              <line x1="0" x2={columns[6]} y1={PIPE_Y + offset} y2={PIPE_Y + offset} stroke={`url(#${pipe})`} strokeOpacity=".25" strokeWidth="1.2" />
              <line className={styles.flow} x1="0" x2={columns[6]} y1={PIPE_Y + offset} y2={PIPE_Y + offset} stroke={`url(#${pipe})`} strokeWidth="1.6" style={{ animationDuration: `${1.3 + Math.abs(offset) * 0.08}s` }} />
            </g>
          ))}

          {/* Her aşamaya yukarıdan gelen gönderiler */}
          {journey.map((stage, index) => (
            <g key={stage.label}>
              <path className={styles.drop} d={`M ${columns[index]} 4 L ${columns[index]} 30 L ${columns[index] - 6} 40 L ${columns[index] - 6} ${PIPE_Y - 22} L ${columns[index]} ${PIPE_Y - 14}`} fill="none" stroke={stage.color} strokeWidth="1.5" />
              <path d={`M ${columns[index] + 5} 26 L ${columns[index] + 5} ${PIPE_Y - 16}`} fill="none" stroke={stage.color} strokeOpacity=".35" strokeWidth="1.2" />
              <Parcel x={columns[index] - 6} y={44 + (index % 3) * 22} color={stage.color} />
              <circle cx={columns[index]} cy="4" r="5" className={styles.nodeFill} stroke={stage.color} strokeWidth="1.5" />
              {index < journey.length - 1 && (
                <>
                  <circle cx={columns[index]} cy={PIPE_Y} r="13" className={styles.nodeFill} stroke={stage.color} strokeOpacity=".3" strokeWidth="6" />
                  <circle cx={columns[index]} cy={PIPE_Y} r="9" className={styles.nodeFill} stroke={stage.color} strokeWidth="2.2" />
                  <circle cx={columns[index]} cy={PIPE_Y} r="3.5" fill={stage.color} />
                </>
              )}
            </g>
          ))}

          {/* Ulaşılamadı: yeni adres bulununca gönderi yeniden yola çıkar */}
          <path d={`M ${columns[3]} ${PIPE_Y + 12} L ${columns[3]} ${PIPE_Y + 44} L ${columns[1]} ${PIPE_Y + 44} L ${columns[1]} ${PIPE_Y + 14}`} fill="none" stroke="#7c5cd6" strokeWidth="1.4" markerEnd={`url(#${arrow})`} />

          {/* Faturalama: gönderiler işlere dağılır */}
          <g transform={`translate(${columns[6] - 36} ${PIPE_Y - 44})`}>
            <rect width="72" height="88" rx="10" className={styles.billingFill} stroke="#16a34a" strokeWidth="1.6" />
            <circle cx="36" cy="44" r="12" className={styles.nodeFill} stroke="#16a34a" strokeWidth="2" />
            <circle cx="36" cy="44" r="5" fill="#16a34a" />
            {[14, 30, 44, 58, 74].map(y => (
              <g key={y}>
                <path className={styles.flow} d={`M 72 ${y} L 104 ${y}`} stroke="#16a34a" strokeWidth="1.3" />
                <circle cx="108" cy={y} r="4" className={styles.nodeFill} stroke="#16a34a" strokeWidth="1.3" />
              </g>
            ))}
          </g>

          {/* Yoldaki kamyon */}
          <g className={styles.truck}>
            <g transform={`translate(${columns[0] - 22} ${PIPE_Y + 16})`}>
              <rect width="30" height="18" rx="3" fill="#f08a24" />
              <rect x="30" y="6" width="12" height="12" rx="2" fill="#f08a24" />
              <rect x="8" y="4" width="13" height="9" rx="1" fill="#fff" />
              <circle cx="9" cy="20" r="3.5" fill="#7a3d0b" />
              <circle cx="34" cy="20" r="3.5" fill="#7a3d0b" />
            </g>
          </g>
        </svg>
        <div className={styles.notes}>
          {journey.map(stage => <span key={stage.label}>{stage.note}</span>)}
        </div>
      </section>
    </AppShell>
  );
}
