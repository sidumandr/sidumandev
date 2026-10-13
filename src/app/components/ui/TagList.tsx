import styles from "./tag.module.css";
export function TagList({items,variant="outline"}:{items:readonly string[];variant?:"outline"|"soft"}) {
  return <ul className={styles.list} aria-label="Teknolojiler">{items.map(item=><li className={styles[variant]} key={item}>{item}</li>)}</ul>;
}
