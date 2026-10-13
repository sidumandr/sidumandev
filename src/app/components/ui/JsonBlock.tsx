import type { ProfileEntry } from "@/types/portfolio";
import { Prompt } from "./Prompt";
import { StatusDot } from "./StatusDot";
import styles from "./json-block.module.css";
export function JsonBlock({entries}:{entries:readonly ProfileEntry[]}) {
  return <div className={styles.block}><Prompt command="cat profil.json"/><ol className={styles.lines} aria-label="Profil bilgileri"><li><span className={styles.punctuation}>{"{"}</span></li>{entries.map((entry,i)=><li key={entry.key}><span className={styles.indent}><span className={styles.key}>{JSON.stringify(entry.key)}</span><span className={styles.punctuation}>: </span><span className={styles.value}>{JSON.stringify(entry.value)}</span>{i<entries.length-1&&<span className={styles.punctuation}>,</span>}{entry.available&&<span className={styles.available}><StatusDot/></span>}</span></li>)}<li><span className={styles.punctuation}>{"}"}</span></li></ol></div>;
}
