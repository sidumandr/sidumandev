import styles from "./stack-strip.module.css";

/** Kullanılan teknolojilerin kayan şeridi. Hareket azaltma tercihinde sabit, sarılı bir listeye dönüşür. */
export function StackStrip({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className={styles.strip}>
      <p className="sr-only">Kullandığım teknolojiler: {items.join(", ")}</p>
      <div className={styles.viewport} aria-hidden="true">
        <ul className={styles.track}>
          {[...items, ...items].map((item, index) => <li key={index} className={index >= items.length ? styles.copy : undefined}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
