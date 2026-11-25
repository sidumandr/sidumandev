import type { ReactNode } from "react";
import styles from "./text-link.module.css";

/** `bracket` eski terminal temasından kalan bir seçenek; geriye uyumluluk için kabul edilir, görünümü değiştirmez. */
export function TextLink({ href, children, external = false, accent = false, className = "", track, trackLabel }: {
  href: string;
  children: ReactNode;
  external?: boolean;
  bracket?: boolean;
  accent?: boolean;
  className?: string;
  track?: string;
  trackLabel?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={[styles.link, accent ? styles.accent : "", className].filter(Boolean).join(" ")}
      data-track={track}
      data-track-label={trackLabel}
    >
      <span className={styles.label}>{children}</span>
      {external && <span className={styles.arrow} aria-hidden="true">↗</span>}
      {external && <span className="sr-only"> (yeni sekmede açılır)</span>}
    </a>
  );
}
