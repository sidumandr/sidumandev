"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Check } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { FlagshipTourStep, TourScreenId } from "@/lib/content/schema";
import { AddressScreen } from "./AddressScreen";
import { MonitoringScreen } from "./MonitoringScreen";
import { OperationsScreen } from "./OperationsScreen";
import { OverviewScreen } from "./OverviewScreen";
import { PoolsScreen } from "./PoolsScreen";
import { ScreenFrame } from "./ScreenFrame";
import styles from "./tour.module.css";

const STEP_DURATION = 9000;

const screens: Record<TourScreenId, { path: string; height: number; label: string; render: () => React.ReactNode }> = {
  pools: { path: "operasyon-paneli / ana-sayfa", height: 780, label: "Durumlarına göre havuzlara ayrılmış dosya listesi", render: () => <PoolsScreen /> },
  address: { path: "operasyon-paneli / adres-sorgu", height: 780, label: "Adres kaynaklarının sırayla denendiği adres araştırma ekranı", render: () => <AddressScreen /> },
  operations: { path: "operasyon-paneli / işlemler", height: 780, label: "Toplu gönderim kuyruğu, saat aralığı ve maliyet özeti", render: () => <OperationsScreen /> },
  monitoring: { path: "operasyon-paneli / performans", height: 780, label: "Dış sistem isteklerinin canlı akışı ve tam tur süreleri", render: () => <MonitoringScreen /> },
  overview: { path: "operasyon-paneli / genel-bakış", height: 860, label: "Toplam dosya, kesinleşme oranı ve dosyanın yolculuğu", render: () => <OverviewScreen /> },
};

/**
 * Ana projenin ekranlarını sırayla gösteren tur. Görünürken kendiliğinden ilerler; üzerine gelince,
 * odaklanınca ya da hareket azaltma tercihinde durur. Ekranlardaki bütün veriler örnektir.
 */
export function ProductTour({ steps }: { steps: FlagshipTourStep[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const running = inView && !paused && !reduced && steps.length > 1;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % steps.length), STEP_DURATION);
    return () => window.clearTimeout(timer);
  }, [running, index, steps.length]);

  if (steps.length === 0) return null;
  const step = steps[Math.min(index, steps.length - 1)];

  return (
    <div
      ref={root}
      className={styles.tour}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.tabs} role="tablist" aria-label="Ana projeden ekranlar">
        {steps.map((item, itemIndex) => (
          <button
            key={item.screen + itemIndex}
            id={`${id}-tab-${itemIndex}`}
            type="button"
            role="tab"
            aria-selected={itemIndex === index}
            aria-controls={`${id}-panel`}
            className={styles.tab + (itemIndex === index ? " " + styles.tabActive : "")}
            onClick={() => setIndex(itemIndex)}
            data-track="flagship_open"
            data-track-label={"Tur: " + item.title}
          >
            <span className={styles.tabNumber}>{String(itemIndex + 1).padStart(2, "0")}</span>
            <span className={styles.tabTitle}>{item.title}</span>
            <span className={styles.tabProgress} aria-hidden="true">
              {itemIndex === index && (
                <i key={index} style={{ animationDuration: STEP_DURATION + "ms", animationPlayState: running ? "running" : "paused", ...(reduced ? { width: "100%", animation: "none" } : {}) } as CSSProperties} />
              )}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.stage}>
        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} className={styles.copy} key={index}>
          <h4>{step.title}</h4>
          <p>{step.text}</p>
          {step.points.length > 0 && (
            <ul>
              {step.points.map(point => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}
            </ul>
          )}
          <p className={styles.note}>Ekranlar yeniden çizildi, içindeki tüm veriler örnektir.</p>
        </div>
        <div className={styles.screens}>
          {steps.map((item, itemIndex) => {
            const screen = screens[item.screen];
            return (
              <div key={item.screen + itemIndex} className={styles.screen + (itemIndex === index ? " " + styles.screenActive : "")} aria-hidden={itemIndex !== index}>
                <ScreenFrame path={screen.path} label={screen.label + ". Veriler örnektir."} height={screen.height} active={itemIndex === index}>
                  {screen.render()}
                </ScreenFrame>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
