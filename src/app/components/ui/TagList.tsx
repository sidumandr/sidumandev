import styles from "./tag.module.css";

export function TagList({ items, label = "Teknolojiler" }: { items: readonly string[]; label?: string }) {
  return (
    <ul className={styles.list} aria-label={label}>
      {items.map(item => <li className={styles.tag} key={item}>{item}</li>)}
    </ul>
  );
}
