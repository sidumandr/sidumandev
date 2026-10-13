import { identity } from "@/data/identity";
import styles from "./prompt.module.css";
export function Prompt({command,cursor=false,className=""}:{command?:string;cursor?:boolean;className?:string}) {
  return <span className={styles.prompt+" "+className}><span className={styles.user}>{identity.user}@{identity.host}</span><span className={styles.punctuation}>:</span><span>~</span><span className={styles.punctuation}>$</span>{command&&<span className={styles.command}>{command}</span>}{cursor&&<span className={styles.cursor} aria-hidden="true" />}</span>;
}
