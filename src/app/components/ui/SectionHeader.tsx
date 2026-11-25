import styles from "./section-header.module.css";

export function SectionHeader({ eyebrow, title, subtitle, id, align = "start" }: {
  eyebrow?: string;
  /** @deprecated Eski terminal temasından kalma; artık gösterilmiyor. */
  command?: string;
  /** @deprecated Artık gösterilmiyor. */
  index?: number;
  title: string;
  subtitle?: string;
  id: string;
  align?: "start" | "center";
}) {
  return (
    <header className={styles.header + " reveal" + (align === "center" ? " " + styles.center : "")}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id} className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
