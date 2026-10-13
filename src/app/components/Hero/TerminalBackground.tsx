import { terminalHistory } from "@/data/terminal";
import styles from "./terminal-background.module.css";
export function TerminalBackground() {
  return <div className={styles.history} aria-hidden="true"><div className={styles.caption}>siduman / session.log</div>{terminalHistory.map((line,index)=><div className={styles.row} key={index}><span>{String(index+1).padStart(2,"0")}</span><code>{line}</code></div>)}</div>;
}
