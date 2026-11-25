import { Info } from "lucide-react";
import styles from "./mock-note.module.css";

/** Yeniden çizilen ekranların altında, içerikteki verilerin gerçek olmadığını belirten not. */
export function MockDataNote({ className = "" }: { className?: string }) {
  return (
    <span className={styles.note + (className ? " " + className : "")}>
      <Info size={16} aria-hidden="true" className={styles.icon} />
      <em>Ekrandaki tüm veriler örnek (mock) veridir.</em>
    </span>
  );
}
