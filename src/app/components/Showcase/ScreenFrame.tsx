"use client";
import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./frame.module.css";

/** Ekranlar 1280px genişliğinde çizilir ve çerçevenin genişliğine göre ölçeklenir. */
export const DESIGN_WIDTH = 1280;

/** `beat`: turda o an oynayan sahnenin sırası; sahne yoksa -1. Ekranlar olaylarını buna bağlar. */
interface ScreenState { active: boolean; reduced: boolean; glass: boolean; beat: number }
const ScreenContext = createContext<ScreenState>({ active: false, reduced: false, glass: false, beat: -1 });
export const useScreen = () => useContext(ScreenContext);

/**
 * Tanıtım filmi gibi bir sahne. `spot`, ekranda `data-spot` ile işaretlenmiş bileşenin adıdır:
 * kamera o bileşene yaklaşır, geri kalan karartılır ve bileşen yer değiştirirse ışık onu izler.
 * `focus` ve `zoom` verilirse kamera sabit kalır. Koordinatlar 1280px'lik tasarım tuvaline göredir.
 */
export interface Camera {
  spot?: string;
  focus?: [number, number];
  zoom?: number;
  /** İmlecin gideceği nokta; verilmezse ışıktaki bileşenin üstüne gider, `false` ise gizlenir. */
  cursor?: [number, number] | false;
  click?: boolean;
  callout?: string;
  /** Açıklamanın yanında gösterilen tuşlar; ilki ışık her yer değiştirdiğinde basılır. */
  keys?: string[];
  caption?: "top" | "bottom";
}

interface Rect { x: number; y: number; w: number; h: number }
const SPOT_PADDING = 10;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const sameRect = (a: Rect, b: Rect) => Math.abs(a.x - b.x) < 1 && Math.abs(a.y - b.y) < 1 && Math.abs(a.w - b.w) < 1 && Math.abs(a.h - b.h) < 1;

/** Ölçek ve kamera dönüşümlerinden etkilenmeyen, tuval içindeki yerleşim kutusu. */
function layoutRect(element: HTMLElement, root: HTMLElement): Rect {
  let x = 0;
  let y = 0;
  for (let node: HTMLElement | null = element; node && node !== root; node = node.offsetParent as HTMLElement | null) {
    x += node.offsetLeft;
    y += node.offsetTop;
  }
  for (let parent = element.parentElement; parent && parent !== root; parent = parent.parentElement) {
    x -= parent.scrollLeft;
    y -= parent.scrollTop;
  }
  return { x, y, w: element.offsetWidth, h: element.offsetHeight };
}

/** Aynı adı taşıyan bütün bileşenleri kapsayan kutu, tuvalin içinde kalacak şekilde. */
function measureSpot(root: HTMLElement, name: string, height: number): Rect | null {
  const elements = root.querySelectorAll<HTMLElement>(`[data-spot~="${name}"]`);
  if (elements.length === 0) return null;
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  elements.forEach(element => {
    const rect = layoutRect(element, root);
    left = Math.min(left, rect.x);
    top = Math.min(top, rect.y);
    right = Math.max(right, rect.x + rect.w);
    bottom = Math.max(bottom, rect.y + rect.h);
  });
  left = Math.max(4, left - SPOT_PADDING);
  top = Math.max(4, top - SPOT_PADDING);
  right = Math.min(DESIGN_WIDTH - 4, right + SPOT_PADDING);
  bottom = Math.min(height - 4, bottom + SPOT_PADDING);
  return { x: left, y: top, w: right - left, h: bottom - top };
}

function framing(view: { focus: [number, number]; zoom: number } | null, width: number, height: number) {
  if (!view) return { x: 0, y: 0, z: 1 };
  const z = view.zoom;
  const [fx, fy] = view.focus;
  return {
    x: clamp(width / 2 - fx * z, width - width * z, 0),
    y: clamp(height / 2 - fy * z, height - height * z, 0),
    z,
  };
}

export function ScreenFrame({ path, label, height = 780, active: forcedActive, glass = false, camera, beat = -1, children }: {
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
  /** O an oynayan sahnenin sırası. */
  beat?: number;
  children: ReactNode;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [measured, setMeasured] = useState<{ name: string; rect: Rect; moves: number } | null>(null);
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

  const scene = reduced ? null : camera;
  const spotName = scene?.spot;

  // Işıktaki bileşen ölçülür; ekran işareti başka bir satıra taşırsa yeniden ölçülür.
  useEffect(() => {
    const root = stage.current;
    if (!root || !spotName) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = measureSpot(root, spotName, height);
        if (!rect) return;
        setMeasured(current => {
          if (current?.name === spotName && sameRect(current.rect, rect)) return current;
          return { name: spotName, rect, moves: current?.name === spotName ? current.moves + 1 : 0 };
        });
      });
    };
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(root, { subtree: true, attributes: true, attributeFilter: ["data-spot"] });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [spotName, height]);

  const active = visible && (forcedActive ?? true);
  const spot = spotName && measured?.name === spotName ? measured.rect : null;
  const tracking = spot !== null && (measured?.moves ?? 0) > 0;

  let view: { focus: [number, number]; zoom: number } | null = null;
  if (scene && spot) {
    const fit = Math.min((DESIGN_WIDTH * 0.72) / spot.w, (height * 0.56) / spot.h);
    view = { focus: scene.focus ?? [spot.x + spot.w / 2, spot.y + spot.h / 2], zoom: scene.zoom ?? clamp(fit, 1.1, 2.4) };
  } else if (scene?.focus) {
    view = { focus: scene.focus, zoom: scene.zoom ?? 1.5 };
  }
  const { x, y, z } = framing(view, DESIGN_WIDTH, height);

  // Işık yokken çerçeve tuvalin tamamını kaplar; sahne başlayınca bileşenin etrafına daralır.
  const ring: Rect = scene && spot ? spot : { x: 0, y: 0, w: DESIGN_WIDTH, h: height };
  const pointer = scene && scene.cursor !== false ? scene.cursor ?? (spot ? [spot.x + spot.w * 0.78, spot.y + spot.h * 0.62] : null) : null;

  let callout: ReactNode = null;
  if (scene?.callout) {
    const anchor = view ? view.focus[1] * z + y : height / 2;
    const atTop = scene.caption ? scene.caption === "top" : anchor > height * 0.5;
    callout = (
      <div key={scene.callout} className={styles.callout} style={atTop ? { top: 26 } : { bottom: 26 }}>
        <span>{scene.callout}</span>
        {scene.keys && (
          <span className={styles.keys}>
            {scene.keys.map((key, index) => (
              <kbd key={index === 0 ? key + (measured?.moves ?? 0) : key} className={index === 0 ? styles.keyPress : undefined}>{key}</kbd>
            ))}
          </span>
        )}
      </div>
    );
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
          <div ref={stage} className={styles.camera} style={{ transform: `translate(${x}px, ${y}px) scale(${z})` }}>
            <ScreenContext.Provider value={{ active, reduced, glass, beat: reduced ? -1 : beat }}>{children}</ScreenContext.Provider>
            {camera !== undefined && !reduced && (
              <>
                <span
                  className={styles.spot + (scene && spot ? " " + styles.spotOn : "") + (tracking ? " " + styles.spotTrack : "")}
                  style={{ left: ring.x, top: ring.y, width: ring.w, height: ring.h, "--z": z } as CSSProperties}
                />
                <span
                  className={styles.cursor + (pointer ? " " + styles.cursorOn : "")}
                  style={{ left: pointer?.[0] ?? DESIGN_WIDTH * 0.62, top: pointer?.[1] ?? height * 0.7, transform: `scale(${1.2 / z})` }}
                >
                  <svg width="26" height="30" viewBox="0 0 26 30"><path d="M2 2 L2 24 L8 18.5 L12 28 L16.5 26 L12.5 16.8 L20.5 16.5 Z" fill="#111" stroke="#fff" strokeWidth="2" strokeLinejoin="round" /></svg>
                  {scene?.click && <i key={spotName ?? scene.focus?.join(",")} className={styles.ripple} />}
                </span>
              </>
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
