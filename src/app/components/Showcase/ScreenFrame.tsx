"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./frame.module.css";

/** Ekranlar 1280px genişliğinde çizilir ve çerçevenin genişliğine göre ölçeklenir. */
export const DESIGN_WIDTH = 1280;

interface ScreenState { active: boolean; reduced: boolean }
const ScreenContext = createContext<ScreenState>({ active: false, reduced: false });
export const useScreen = () => useContext(ScreenContext);

export function ScreenFrame({ path, label, height = 780, active: forcedActive, children }: {
  path: string;
  /** Ekran okuyucular için ekranın kısa açıklaması. */
  label: string;
  height?: number;
  /** Turda yalnızca seçili ekran oynar; verilmezse görünür olduğunda oynar. */
  active?: boolean;
  children: ReactNode;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / DESIGN_WIDTH));
    const view = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    resize.observe(element);
    view.observe(element);
    return () => { resize.disconnect(); view.disconnect(); };
  }, []);

  const active = visible && (forcedActive ?? true);

  return (
    <figure className={styles.frame} role="img" aria-label={label}>
      <div className={styles.chrome} aria-hidden="true">
        <span /><span /><span />
        <div className={styles.address}>{path}</div>
      </div>
      <div ref={viewport} className={styles.viewport} style={{ aspectRatio: `${DESIGN_WIDTH} / ${height}` }}>
        <div
          className={styles.canvas}
          style={{ width: DESIGN_WIDTH, height, transform: `scale(${scale ?? 0})`, opacity: scale ? 1 : 0 }}
          aria-hidden="true"
        >
          <ScreenContext.Provider value={{ active, reduced }}>{children}</ScreenContext.Provider>
        </div>
      </div>
    </figure>
  );
}

/** Ekran görünür olduğunda 0'dan hedefe sayar; hareket azaltma tercihinde doğrudan hedefi gösterir. */
export function useCountUp(target: number, duration = 1400) {
  const { active, reduced } = useScreen();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || reduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, target, duration]);
  return reduced ? target : value;
}

/** Ekran görünürken belirli aralıklarla artan bir sayaç; canlı akış ve sıralı adımlar için. */
export function useTicker(interval: number, limit = Infinity) {
  const { active, reduced } = useScreen();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active || reduced) return;
    const id = window.setInterval(() => setTick(current => (current + 1 >= limit ? current : current + 1)), interval);
    return () => window.clearInterval(id);
  }, [active, reduced, interval, limit]);
  return reduced ? Math.max(0, limit === Infinity ? 0 : limit - 1) : tick;
}

export const formatNumber = (value: number) => new Intl.NumberFormat("tr-TR").format(value);
