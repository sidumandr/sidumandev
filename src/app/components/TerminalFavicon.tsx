"use client";
import { useEffect } from "react";
const filled = "/terminal-cursor.svg";
const outline = "/terminal-cursor-outline.svg";
export function TerminalFavicon() {
  useEffect(() => {
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"][href="/terminal-cursor.svg"]');
    if (!icon) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof window.setInterval> | undefined;
    let isFilled = true;
    function reset() {
      if (interval !== undefined) window.clearInterval(interval);
      interval = undefined;
      isFilled = true;
      icon!.href = filled;
      if (document.hidden || reducedMotion.matches) return;
      interval = window.setInterval(() => {
        isFilled = !isFilled;
        icon!.href = isFilled ? filled : outline;
      }, 600);
    }
    reset();
    document.addEventListener("visibilitychange", reset);
    reducedMotion.addEventListener("change", reset);
    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      document.removeEventListener("visibilitychange", reset);
      reducedMotion.removeEventListener("change", reset);
      icon.href = filled;
    };
  }, []);
  return null;
}
