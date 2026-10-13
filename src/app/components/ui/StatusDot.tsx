import styles from "./status-dot.module.css";
export function StatusDot({text}:{text?:string}) {
  return <span className={styles.status}><span className={styles.dot} aria-hidden="true" />{text&&<span>{text}</span>}</span>;
}
