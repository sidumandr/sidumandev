import { terminalHistory } from "@/data/terminal";
import styles from "./terminal-background.module.css";
interface TerminalBackgroundProps { lines?: readonly string[]; embedded?: boolean; }
export function TerminalBackground({ lines = terminalHistory, embedded = false }: TerminalBackgroundProps) {
  return <div className={styles.history + (embedded ? " " + styles.embedded : "")} aria-hidden="true">
    {!embedded && <div className={styles.caption}>siduman / session.log</div>}
    <div className={styles.viewport}><div className={styles.stream}>
      {[0, 1].map(copy => <div key={copy}>{lines.map((line, index) => <div className={styles.row} key={index}><span>{String(index + 1).padStart(2, "0")}</span><code>{line}</code></div>)}</div>)}
    </div></div>
  </div>;
}
