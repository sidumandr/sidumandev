"use client";
import { useEffect, useRef } from "react";

/**
 * Fare imlecinin altındaki ızgarayı ve ışığı görünür kılar. Dokunmatik ekranlarda ışık kendi
 * kendine yavaşça dolaşır; hareket azaltma tercihinde ortada sabit kalır.
 */
export function CursorLight({ className, gridClassName, glowClassName }: { className: string; gridClassName: string; glowClassName: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    let frame = 0;
    let target = { x: 0.5, y: 0.35 };
    let current = { ...target };

    const apply = () => {
      element.style.setProperty("--x", (current.x * 100).toFixed(2) + "%");
      element.style.setProperty("--y", (current.y * 100).toFixed(2) + "%");
    };
    apply();
    if (reduced) return;

    function onMove(event: PointerEvent) {
      const rect = element!.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
      target = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
    }

    const started = performance.now();
    function tick(now: number) {
      if (!canHover) {
        const t = (now - started) / 1000;
        target = { x: 0.5 + Math.sin(t * 0.35) * 0.32, y: 0.35 + Math.sin(t * 0.5) * 0.18 };
      }
      current = { x: current.x + (target.x - current.x) * 0.12, y: current.y + (target.y - current.y) * 0.12 };
      apply();
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    if (canHover) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <div className={gridClassName} />
      <div className={glowClassName} />
    </div>
  );
}
