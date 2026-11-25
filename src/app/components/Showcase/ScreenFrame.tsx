"use client";
import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./frame.module.css";

/** Ekranlar 1280px genişliğinde çizilir ve çerçevenin genişliğine göre ölçeklenir. */
export const DESIGN_WIDTH = 1280;

interface ScreenState { active: boolean; reduced: boolean; glass: boolean }
const ScreenContext = createContext<ScreenState>({ active: false, reduced: false, glass: false });
export const useScreen = () => useContext(ScreenContext);

/**
 * Tanıtım filmi gibi bir sahne: kamera `focus` noktasına `zoom` kadar yaklaşır, imleç `cursor`
 * noktasına gider (isterse tıklar) ve `callout` metni odak noktasının yanında belirir.
 * Koordinatlar 1280px'lik tasarım tuvaline göredir.
 */
export interface Camera {
  focus: [number, number];
  zoom: number;
  cursor?: [number, number];
  click?: boolean;
  callout?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function framing(camera: Camera | null | undefined, width: number, height: number) {
  if (!camera) return { x: 0, y: 0, z: 1 };
  const z = camera.zoom;
  const [fx, fy] = camera.focus;
  return {
    x: clamp(width / 2 - fx * z, width - width * z, 0),
    y: clamp(height / 2 - fy * z, height - height * z, 0),
    z,
  };
}

export function ScreenFrame({ path, label, height = 780, active: forcedActive, glass = false, camera, children }: {
  path: string;
  /** Ekran okuyucular için ekranın kısa açıklaması. */
  label: string;
  height?: number;
  /** Turda yalnızca seçili ekran oynar; verilmezse görünür olduğunda oynar. */
  active?: boolean;
  /** Arka planı saydam, koyu cam görünümü. */
  glass?: boolean;
  /** Tanıtım sahnesi; verilmezse ekran tam görünür. */
  camera?: Camera | null;
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
  const scene = reduced ? null : camera;
  const { x, y, z } = framing(scene, DESIGN_WIDTH, height);

  // Açıklama balonu, odak noktasının ekrandaki yerine göre üstte ya da altta durur.
  let callout: ReactNode = null;
  if (scene?.callout) {
    const px = scene.focus[0] * z + x;
    const py = scene.focus[1] * z + y;
    const below = py < height * 0.55;
    const position: CSSProperties = { left: clamp(px - 210, 28, DESIGN_WIDTH - 448) };
    if (below) position.top = Math.min(py + 56, height - 150);
    else position.bottom = Math.min(height - py + 56, height - 150);
    callout = <div key={scene.callout} className={styles.callout} style={position}>{scene.callout}</div>;
  }

  return (
    <figure className={styles.frame + (glass ? " " + styles.glass : "")} role="img" aria-label={label}>
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
          <div className={styles.camera} style={{ transform: `translate(${x}px, ${y}px) scale(${z})` }}>
            <ScreenContext.Provider value={{ active, reduced, glass }}>{children}</ScreenContext.Provider>
            {camera !== undefined && !reduced && (
              <span
                className={styles.cursor + (scene?.cursor ? " " + styles.cursorOn : "")}
                style={{ left: scene?.cursor?.[0] ?? DESIGN_WIDTH * 0.62, top: scene?.cursor?.[1] ?? height * 0.7, transform: `scale(${1 / z})` }}
              >
                <svg width="26" height="30" viewBox="0 0 26 30"><path d="M2 2 L2 24 L8 18.5 L12 28 L16.5 26 L12.5 16.8 L20.5 16.5 Z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" /></svg>
                {scene?.click && <i key={scene.focus.join(",")} className={styles.ripple} />}
              </span>
            )}
          </div>
          {callout}
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
