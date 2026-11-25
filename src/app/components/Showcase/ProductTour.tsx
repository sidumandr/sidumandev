"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Check } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { FlagshipTourStep, TourScreenId } from "@/lib/content/schema";
import { AddressScreen } from "./AddressScreen";
import { MockDataNote } from "./MockDataNote";
import { MonitoringScreen } from "./MonitoringScreen";
import { OperationsScreen } from "./OperationsScreen";
import { OverviewScreen } from "./OverviewScreen";
import { PoolsScreen } from "./PoolsScreen";
import { ScreenFrame, type Camera } from "./ScreenFrame";
import styles from "./tour.module.css";

/** Her sahnede kamera bir bölgeye yaklaşır; `point`, o an anlatılan maddenin sırasıdır. */
type Scene = Omit<Camera, "callout"> & { point: number };

const INTRO = 1300;
const SCENE = 3400;
const OUTRO = 1300;
const stepDuration = (scenes: number) => INTRO + scenes * SCENE + OUTRO;

const screens: Record<TourScreenId, { path: string; height: number; label: string; scenes: Scene[]; render: () => React.ReactNode }> = {
  pools: {
    path: "operasyon-paneli / ana-sayfa",
    height: 780,
    label: "Durumlarına göre havuzlara ayrılmış dosya listesi",
    scenes: [
      { focus: [140, 610], zoom: 1.7, cursor: [150, 616], click: true, point: 0 },
      { focus: [1120, 96], zoom: 1.9, cursor: [1110, 100], click: true, point: 1 },
      { focus: [700, 600], zoom: 1.45, cursor: [760, 556], point: 2 },
    ],
    render: () => <PoolsScreen />,
  },
  address: {
    path: "operasyon-paneli / adres-sorgu",
    height: 780,
    label: "Adres kaynaklarının sırayla denendiği adres araştırma ekranı",
    scenes: [
      { focus: [790, 330], zoom: 1.7, cursor: [826, 306], point: 0 },
      { focus: [1080, 560], zoom: 1.6, cursor: [1010, 600], point: 1 },
      { focus: [420, 262], zoom: 1.8, cursor: [446, 264], click: true, point: 2 },
    ],
    render: () => <AddressScreen />,
  },
  operations: {
    path: "operasyon-paneli / işlemler",
    height: 780,
    label: "Toplu gönderim kuyruğu, saat aralığı ve maliyet özeti",
    scenes: [
      { focus: [560, 200], zoom: 1.9, cursor: [612, 204], click: true, point: 2 },
      { focus: [1100, 340], zoom: 1.8, cursor: [1150, 352], point: 1 },
      { focus: [1100, 480], zoom: 1.8, cursor: [1010, 470], point: 0 },
    ],
    render: () => <OperationsScreen />,
  },
  monitoring: {
    path: "operasyon-paneli / performans",
    height: 780,
    label: "Dış sistem isteklerinin canlı akışı ve tam tur süreleri",
    scenes: [
      { focus: [520, 300], zoom: 1.6, cursor: [570, 292], point: 0 },
      { focus: [1060, 300], zoom: 1.7, cursor: [1090, 330], point: 1 },
      { focus: [1060, 560], zoom: 1.7, cursor: [1000, 560], point: 2 },
    ],
    render: () => <MonitoringScreen />,
  },
  overview: {
    path: "operasyon-paneli / genel-bakış",
    height: 860,
    label: "Toplam dosya, kesinleşme oranı ve dosyanın yolculuğu",
    scenes: [
      { focus: [520, 300], zoom: 1.5, cursor: [560, 300], point: 0 },
      { focus: [760, 640], zoom: 1.5, cursor: [760, 640], point: 1 },
      { focus: [1100, 300], zoom: 1.6, cursor: [1100, 300], point: 2 },
    ],
    render: () => <OverviewScreen />,
  },
};

/**
 * Ana projenin ekranlarını tanıtım filmi gibi gösteren tur: her adımda kamera önemli bölgelere
 * yaklaşır, imleç gezinir ve o anki madde vurgulanır. Görünürken kendiliğinden ilerler; üzerine
 * gelince ya da odaklanınca durur, hareket azaltma tercihinde hiç oynamaz.
 */
export function ProductTour({ steps }: { steps: FlagshipTourStep[] }) {
  const [index, setIndex] = useState(0);
  const [scene, setScene] = useState(-1);
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

  const current = Math.min(index, Math.max(0, steps.length - 1));
  const step = steps[current];
  const config = step ? screens[step.screen] : null;
  const running = inView && !paused && !reduced && steps.length > 0;

  // Sahne akışı: tam görünüm, sırayla sahneler, tekrar tam görünüm, sonraki adım.
  useEffect(() => {
    if (!running || !config) return;
    const delay = scene === -1 ? INTRO : scene < config.scenes.length ? SCENE : OUTRO;
    const timer = window.setTimeout(() => {
      if (scene < config.scenes.length) setScene(scene + 1);
      else {
        setIndex(value => (value + 1) % steps.length);
        setScene(-1);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [running, config, scene, steps.length]);

  if (!step || !config) return null;
  const activeScene = scene >= 0 && scene < config.scenes.length ? config.scenes[scene] : null;
  const camera: Camera | null = activeScene ? { ...activeScene, callout: step.points[activeScene.point] } : null;
  const total = stepDuration(config.scenes.length);

  function select(next: number) {
    setIndex(next);
    setScene(-1);
  }

  return (
    <div
      ref={root}
      className={styles.tour}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ol className={styles.stepper} role="tablist" aria-label="Ana projeden ekranlar">
        {steps.map((item, itemIndex) => {
          const state = itemIndex < current ? styles.done : itemIndex === current ? styles.current : "";
          return (
            <li key={item.screen + itemIndex} className={styles.stepItem + (state ? " " + state : "")}>
              <button
                id={`${id}-tab-${itemIndex}`}
                type="button"
                role="tab"
                aria-selected={itemIndex === current}
                aria-controls={`${id}-panel`}
                className={styles.stepButton}
                onClick={() => select(itemIndex)}
                data-track="flagship_open"
                data-track-label={"Tur: " + item.title}
              >
                <span className={styles.badge}>{itemIndex < current ? <Check size={18} strokeWidth={2.6} aria-hidden="true" /> : String(itemIndex + 1).padStart(2, "0")}</span>
                <span className={styles.stepTitle}>{item.title}</span>
              </button>
              {itemIndex < steps.length - 1 && (
                <span className={styles.connector} aria-hidden="true">
                  {itemIndex === current && !reduced ? (
                    <i key={current} className={styles.filling} style={{ animationDuration: total + "ms", animationPlayState: running ? "running" : "paused" } as CSSProperties} />
                  ) : (
                    <i style={{ width: itemIndex < current ? "100%" : "0%" }} />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className={styles.stage}>
        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${current}`} className={styles.copy} key={current}>
          <span className={styles.kicker}>Adım {current + 1} / {steps.length}</span>
          <h4>{step.title}</h4>
          <p>{step.text}</p>
          {step.points.length > 0 && (
            <ul>
              {step.points.map((point, pointIndex) => (
                <li key={point} className={activeScene?.point === pointIndex ? styles.pointActive : undefined}>
                  <Check size={16} aria-hidden="true" />{point}
                </li>
              ))}
            </ul>
          )}
          <p className={styles.note}><MockDataNote /></p>
        </div>
        <div className={styles.screens}>
          {steps.map((item, itemIndex) => {
            const screen = screens[item.screen];
            const isCurrent = itemIndex === current;
            return (
              <div key={item.screen + itemIndex} className={styles.screen + (isCurrent ? " " + styles.screenActive : "")} aria-hidden={!isCurrent}>
                <ScreenFrame path={screen.path} label={screen.label + ". Veriler örnektir."} height={screen.height} active={isCurrent} camera={isCurrent ? camera : undefined}>
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
