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

/**
 * Bir sahne: kamera `spot` ile işaretli bileşene yaklaşır, geri kalanı kararır. `point`, soldaki
 * listede vurgulanan maddedir; `say` verilirse açıklamada o maddenin yerine bu yazılır.
 */
type Scene = Omit<Camera, "callout"> & { point: number; say?: string; hold?: number };

const INTRO = 1300;
const SCENE = 3600;
const OUTRO = 1200;
const holdOf = (scene: Scene) => scene.hold ?? SCENE;

const screens: Record<TourScreenId, { path: string; height: number; label: string; scenes: Scene[]; render: () => React.ReactNode }> = {
  pools: {
    path: "operasyon-paneli / ana-sayfa",
    height: 780,
    label: "Durumlarına göre havuzlara ayrılmış dosya listesi",
    scenes: [
      { spot: "flip", point: 0, say: "Tebliğ tamamlandı, dosya kendiliğinden Kesinleşti oldu" },
      { spot: "pool", zoom: 2.3, click: true, point: 0, say: "Dosya Kesinleşme işlenmemiş havuzuna geçti" },
      { spot: "row", focus: [760, 430], zoom: 1.4, cursor: false, keys: ["↓", "Enter"], caption: "top", point: 1, hold: 4800 },
      { spot: "outcome", point: 2 },
    ],
    render: () => <PoolsScreen />,
  },
  address: {
    path: "operasyon-paneli / adres-sorgu",
    height: 780,
    label: "Adres kaynaklarının sırayla denendiği adres araştırma ekranı",
    scenes: [
      { spot: "ladders", point: 0 },
      { spot: "ladder", point: 1, hold: 4600 },
      { spot: "stopped", click: true, point: 2 },
    ],
    render: () => <AddressScreen />,
  },
  operations: {
    path: "operasyon-paneli / işlemler",
    height: 780,
    label: "Toplu gönderim kuyruğu, saat aralığı ve maliyet özeti",
    scenes: [
      { spot: "subtabs", click: true, point: 0 },
      { spot: "sending", focus: [560, 470], zoom: 1.45, cursor: false, caption: "top", point: 1, hold: 4600 },
      { spot: "queue", point: 2 },
    ],
    render: () => <OperationsScreen />,
  },
  monitoring: {
    path: "operasyon-paneli / performans",
    height: 780,
    label: "Dış sistem isteklerinin canlı akışı ve tam tur süreleri",
    scenes: [
      { spot: "latest", point: 0, hold: 4000 },
      { spot: "tours", point: 1 },
      { spot: "health", point: 2 },
    ],
    render: () => <MonitoringScreen />,
  },
  overview: {
    path: "operasyon-paneli / genel-bakış",
    height: 860,
    label: "Toplam dosya, kesinleşme oranı ve dosyanın yolculuğu",
    scenes: [
      { spot: "total", point: 0 },
      { spot: "journey", point: 1, hold: 4000 },
      { spot: "ring", point: 2 },
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
    const delay = scene === -1 ? INTRO : scene < config.scenes.length ? holdOf(config.scenes[scene]) : OUTRO;
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
  let camera: Camera | null = null;
  if (activeScene) {
    const { point, say, ...shot } = activeScene;
    camera = { ...shot, callout: say ?? step.points[point] };
  }
  const total = INTRO + config.scenes.reduce((sum, item) => sum + holdOf(item), 0) + OUTRO;

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
                <ScreenFrame path={screen.path} label={(item.text || screen.label) + " Veriler örnektir."} height={screen.height} active={isCurrent} camera={isCurrent ? camera : undefined} beat={isCurrent ? scene : -1}>
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
