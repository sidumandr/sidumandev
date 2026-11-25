"use client";
import { ArrowRight, Download } from "lucide-react";
import { AppShell } from "./AppShell";
import { maskedId, mockCourts, mockFileNumbers, mockPeople } from "./mock";
import { useScreen, useTicker } from "./ScreenFrame";
import styles from "./app.module.css";

const sources = ["MERNİS", "İSKİ", "GİB", "Sistem adresi", "GSM"];
/** Her dosyanın merdivende kaçıncı basamakta olduğu. */
const rows = [
  { done: 0, note: "itiraz var, durdu", stopped: true },
  { done: 3, note: "sırada Sistem adresi" },
  { done: 3, note: "sırada Sistem adresi" },
  { done: 0, note: "sırada MERNİS" },
  { done: 2, note: "sırada GİB" },
  { done: 0, note: "sırada MERNİS" },
  { done: 1, note: "sırada İSKİ" },
  { done: 0, note: "sırada MERNİS" },
  { done: 4, note: "sırada GSM" },
];
const results = [
  { label: "MERNİS", state: "geçildi", detail: "sorgu kaydı yok" },
  { label: "İSKİ", state: "geçildi", detail: "09:41 adres yok" },
  { label: "GİB", state: "geçildi", detail: "09:42 adres bulundu" },
  { label: "Sistem adresi", state: "sırada", detail: "" },
  { label: "GSM", state: "kalan", detail: "" },
];

/** Adres araştırma merdiveni: tebligat iade dönen dosyalar için kaynaklar sırayla denenir. */
export function AddressScreen() {
  const { reduced } = useScreen();
  const tick = useTicker(700);
  const focus = [1, 2, 8][Math.floor(tick / 8) % 3];
  const revealed = reduced ? results.length : Math.min(results.length, (tick % 8) + 1);
  const person = mockPeople[focus + 2];

  return (
    <AppShell active="address">
      <p className={styles.muted} style={{ fontSize: 13.5 }}>Ödeme emri ›</p>
      <div className={styles.pageTitle}><h3>Adres sorgu</h3></div>
      <div className={styles.toolbar}>
        <span className={styles.field} style={{ width: 300 }}>Dosya no ya da borçlu adı</span>
        <span className={styles.muted} style={{ fontSize: 13.5 }}>Durum</span>
        <span className={styles.field + " " + styles.fieldStrong}>Tümü 612</span>
        <span className={styles.field + " " + styles.fieldStrong}>Süzgeçler</span>
        <span className={styles.topButton} style={{ marginLeft: "auto" }}><Download size={15} />612 dosya Excel</span>
      </div>
      <div className={styles.split}>
        <div className={styles.card}>
          <div className={styles.listHead}><span>Dosya ve borçlu</span><span>Merdiven ve hazır adres</span></div>
          {rows.map((row, index) => (
            <div key={index} className={styles.addressRow + (index === focus ? " " + styles.addressActive : "")}>
              <span><b>{mockFileNumbers[index + 2]}</b>{row.stopped && <span className={styles.chip + " " + styles.chipRed} style={{ marginLeft: 10, height: 20 }}>İtiraz, durdu</span>}</span>
              <span className={styles.segments}>
                {sources.map((_, step) => (
                  <i key={step} className={step < row.done ? styles.segDone : step === row.done && !row.stopped ? styles.segNow : undefined} />
                ))}
              </span>
              <span>{mockPeople[index + 2]}, {mockCourts[index % mockCourts.length]}</span>
              <span className={styles.nextStep}>{row.note}</span>
            </div>
          ))}
        </div>

        <aside className={styles.detail}>
          <span className={styles.detailTitle}>{mockFileNumbers[focus + 2]}</span>
          <span style={{ marginTop: 6, fontSize: 14 }}>{person} <span className={styles.muted} style={{ fontFamily: "var(--font-mono)" }}>{maskedId(focus)}</span></span>
          <span className={styles.muted} style={{ fontSize: 13 }}>{mockCourts[focus % mockCourts.length]}</span>
          <dl className={styles.detailMeta}>
            <dt>Durum</dt><dd>Adres araştırması sürüyor</dd>
            <dt>Bila sebebi</dt><dd>Muhatap adresi değişmiş</dd>
            <dt>Çalışılmış adres</dt><dd>var</dd>
            <dt>Son sorgu</dt><dd style={{ fontFamily: "var(--font-mono)" }}>12.03.2026 09:42</dd>
          </dl>
          <p className={styles.ladderTitle}>Merdiven</p>
          <div className={styles.ladder}>
            {results.map((step, index) => (
              <span key={step.label} className={styles.step + (index < revealed ? " " + styles.stepOn : "") + (step.state === "sırada" ? " " + styles.stepCurrent : "")}>
                <b>{step.label}</b> <span className={styles.muted}>{step.state}</span>
                {step.detail && <small>{step.detail}</small>}
              </span>
            ))}
          </div>
          <div className={styles.detailActions}>
            <span className={styles.navyButton} style={{ height: 40, fontSize: 14 }}>Adres çalışmasını aç <ArrowRight size={15} /></span>
            <span className={styles.ghostButton} style={{ height: 40, fontSize: 14 }}>Yeni sekmede aç</span>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
