"use client";
import { navigation } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import styles from "./status-bar.module.css";
export function StatusBar() {
  const active=useActiveSection();
  const current=navigation.find(item=>item.id===active);
  return <div className={styles.bar} aria-label="Sayfa durumu"><span className={styles.mode}>NORMAL</span><span className={styles.path}>~/siduman{current?"/"+current.command:""}</span><span className={styles.meta}>tr · utf-8 · zsh</span><a className={styles.position} href="#hero" aria-label="Sayfa başına dön">{current?String(navigation.findIndex(item=>item.id===active)+1).padStart(2,"0"):"Top"}</a></div>;
}
