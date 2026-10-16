import type { ProfileEntry } from "@/types/portfolio";
import { Prompt } from "./Prompt";
import { StatusDot } from "./StatusDot";
import styles from "./json-block.module.css";
export function JsonBlock({ entries }: { entries: readonly ProfileEntry[] }) {
  return <div className={styles.block}><Prompt command="cat profil.json" />
    <ol className={styles.lines} aria-label="Profil bilgileri">
      <li><span className={styles.punctuation}>{"{"}</span></li>
      {entries.flatMap((entry, index) => {
        const comma = index < entries.length - 1 ? "," : "";
        const label = <><span className={styles.key}>{JSON.stringify(entry.key)}</span><span className={styles.punctuation}>: </span></>;
        if (Array.isArray(entry.value)) return [
          <li key={entry.key}><span className={styles.indent}>{label}<span className={styles.punctuation}>[</span></span></li>,
          ...entry.value.map((value, itemIndex) => <li key={entry.key + itemIndex}><span className={styles.arrayItem}><span className={styles.value}>{JSON.stringify(value)}</span><span className={styles.punctuation}>{itemIndex < entry.value.length - 1 ? "," : ""}</span></span></li>),
          <li key={entry.key + "-end"}><span className={styles.indent}><span className={styles.punctuation}>{"]" + comma}</span></span></li>,
        ];
        return [<li key={entry.key}><span className={styles.indent}>{label}<span className={styles.value}>{JSON.stringify(entry.value)}</span><span className={styles.punctuation}>{comma}</span>{entry.available && <span className={styles.available}><StatusDot /></span>}</span></li>];
      })}
      <li><span className={styles.punctuation}>{"}"}</span></li>
    </ol>
  </div>;
}
