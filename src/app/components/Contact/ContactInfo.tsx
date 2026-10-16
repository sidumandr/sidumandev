"use client";
import { useEffect, useState } from "react";
import { identity } from "@/data/identity";
import { StatusDot } from "../ui/StatusDot";
import { TextLink } from "../ui/TextLink";
import { Window } from "../ui/Window";
import { Prompt } from "../ui/Prompt";
import { TerminalBackground } from "../Hero/TerminalBackground";
import styles from "./contact.module.css";
const logs = ["$ tail -f ~/gelen-kutusu", "> yeni mesaj: merhaba", "$ mail --to " + identity.email, "✓ taslak hazır", "$ cat iletisim.txt", "e-posta · konum · durum", "$ echo $DURUM", "müsait", "$ date +%H:%M", "Europe/Istanbul · UTC+3", "$ git log --oneline -1", "feat: iletişim bölümü", "$ whoami", "safa", "$ ping siduman", "✓ çevrimiçi"];
const cvHref = "mailto:" + identity.email + "?subject=" + encodeURIComponent("CV talebi · Safa İlhan Duman");
export function ContactInfo() {
  const [time, setTime] = useState("--:--");
  const [copyStatus, setCopyStatus] = useState("");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date()));
    update(); const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(identity.email); setCopyStatus("E-posta kopyalandı."); }
    catch { setCopyStatus("Kopyalanamadı; e-posta adresini seçerek kopyalayabilirsin."); }
  }
  return <Window title="iletisim.txt" className={styles.infoPanel}>
    <div className={styles.directContact}>
      <TerminalBackground lines={logs} embedded />
      <p className={styles.note}># en hızlı yol: doğrudan yaz</p>
      <Prompt command="echo $EPOSTA" />
      <a className={styles.email} href={"mailto:" + identity.email}>{identity.email}</a>
      <div className={styles.emailActions}>
        <button type="button" onClick={copyEmail}>[ kopyala ]</button>
        <a href={"mailto:" + identity.email}>[ mail uygulamasında aç ↗ ]</a>
      </div>
      <p className={styles.copyStatus} role="status">{copyStatus}</p>
      <p className={styles.note}># ya da formu doldur</p>
    </div>
    <dl className={styles.details}>
      <div><dt>konum</dt><dd>{identity.location}</dd></div>
      <div><dt>yerel saat</dt><dd><time>{time}</time> <span className={styles.zone}>UTC+3</span></dd></div>
      <div className={styles.availability}><dt>durum</dt><dd><StatusDot text={identity.available}/></dd></div>
    </dl>
    <div className={styles.socials}><TextLink href={identity.github} external>github</TextLink><TextLink href={identity.linkedin} external>linkedin</TextLink><TextLink href={cvHref}>CV talep et ↗</TextLink></div>
  </Window>;
}
