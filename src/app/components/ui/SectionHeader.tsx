import { twoDigits } from "@/lib/format";
import { Prompt } from "./Prompt";
import styles from "./section-header.module.css";
export function SectionHeader({index,command,title,subtitle,id}:{index:number;command:string;title:string;subtitle?:string;id:string}) {
  return <header className={styles.header}><div className={styles.command}><span className={styles.index}>{twoDigits(index)}</span><Prompt command={command}/><span className={styles.rule} aria-hidden="true" /></div><h2 id={id} className={styles.title}>{title}</h2>{subtitle&&<p className={styles.subtitle}><span aria-hidden="true"># </span>{subtitle}</p>}</header>;
}
