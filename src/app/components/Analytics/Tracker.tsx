"use client";
import { useEffect } from "react";

type Payload = { t: "pageview" | "engagement" | "section" | "click"; n?: string; l?: string; r?: string; u?: string; d?: number };

/** Geliştirme modunda efektler iki kez çalışır; aynı sayfa yüklemesi iki kez sayılmasın. */
const pageviewId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()).slice(2);
let pageviewSent = false;

function send(data: Payload) {
  const body = JSON.stringify({ ...data, p: location.pathname, pv: pageviewId });
  try {
    if (navigator.sendBeacon?.("/api/collect", body)) return;
  } catch {}
  fetch("/api/collect", { method: "POST", body, keepalive: true }).catch(() => {});
}

/** Çerez kullanmayan, kişisel veri saklamayan ziyaret sayacı. */
export function Tracker() {
  useEffect(() => {
    if (navigator.webdriver) return;

    if (!pageviewSent) {
      pageviewSent = true;
      const params = new URLSearchParams(location.search);
      send({ t: "pageview", r: document.referrer || undefined, u: params.get("utm_source") ?? params.get("ref") ?? undefined });
    }

    // Sekme görünürken geçen süre; sekme gizlendiğinde gönderilir.
    let visibleSince: number | null = document.visibilityState === "visible" ? performance.now() : null;
    function flush() {
      if (visibleSince === null) return;
      const duration = Math.round(performance.now() - visibleSince);
      visibleSince = null;
      if (duration >= 1000) send({ t: "engagement", d: Math.min(duration, 30 * 60 * 1000) });
    }
    function onVisibility() {
      if (document.visibilityState === "hidden") flush();
      else visibleSince = performance.now();
    }

    // Bir bölüm ekranın ortasından geçtiğinde, sayfa başına bir kez.
    const seen = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (entry.isIntersecting && !seen.has(id)) {
          seen.add(id);
          send({ t: "section", n: id });
        }
      }
    }, { rootMargin: "-45% 0px -45% 0px" });
    document.querySelectorAll("section[id]").forEach(section => observer.observe(section));

    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track]") : null;
      if (target?.dataset.track) send({ t: "click", n: target.dataset.track, l: target.dataset.trackLabel });
    }

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      flush();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);
  return null;
}
