"use client";
import { ArrowRight } from "lucide-react";
import { AppShell } from "./AppShell";
import { maskedPhone, mockHubs, mockShipmentNumbers, mockPeople } from "./mock";
import { useScreen, useTicker } from "./ScreenFrame";
import styles from "./app.module.css";

const sources = ["Sipariş", "CRM", "Harita", "Kurye notu", "SMS onayı"];
/** Her gönderinin merdivende kaçıncı basamakta olduğu. */
const rows = [
  { done: 0, note: "iade istendi, durdu", stopped: true },
  { done: 3, note: "sırada Kurye notu" },
  { done: 3, note: "sırada Kurye notu" },
  { done: 0, note: "sırada Sipariş" },
  { done: 2, note: "sırada Harita" },
  { done: 0, note: "sırada Sipariş" },
  { done: 1, note: "sırada CRM" },
  { done: 0, note: "sırada Sipariş" },
  { done: 4, note: "sırada SMS onayı" },
];
const results = [
  { label: "Sipariş", state: "geçildi", detail: "adres eksik" },
  { label: "CRM", state: "geçildi", detail: "09:41 adres yok" },
  { label: "Harita", state: "geçildi", detail: "09:42 adres bulundu" },
  { label: "Kurye notu", state: "sırada", detail: "" },
  { label: "SMS onayı", state: "kalan", detail: "" },
];

/** Adres araştırma merdiveni: teslim edilemeyen gönderiler için kaynaklar sırayla denenir. */
export function AddressScreen() {
  const { reduced } = useScreen();
  const tick = useTicker(700);
  const focus = [1, 2, 8][Math.floor(tick / 8) % 3];
  const revealed = reduced ? results.length : Math.min(results.length, (tick % 8) + 1);
  const person = mockPeople[focus + 2];

  return (
    <AppShell active="address">
      <p className={styles.muted} style={{ fontSize: 13.5 }}>Teslimat ›</p>
      <div className={styles.pageTitle}><h3>Adres doğrulama</h3></div>
      <div className={styles.toolbar}>
        <span className={styles.field} style={{ width: 300 }}>Gönderi no ya da alıcı adı</span>
        <span className={styles.muted} style={{ fontSize: 13.5 }}>Durum</span>
        <span className={styles.field + " " + styles.fieldStrong}>Tümü 612</span>
        <span className={styles.field + " " + styles.fieldStrong}>Süzgeçler</span>
      </div>
      <div className={styles.split}>
        <div className={styles.card}>
          <div className={styles.listHead}><span>Gönderi ve alıcı</span><span>Merdiven ve hazır adres</span></div>
          {rows.map((row, index) => (
            <div key={index} data-spot={index === 0 ? "stopped" : index >= 1 && index <= 4 ? "ladders" : undefined} className={styles.addressRow + (index === focus ? " " + styles.addressActive : "")}>
              <span><b>{mockShipmentNumbers[index + 2]}</b>{row.stopped && <span className={styles.chip + " " + styles.chipRed} style={{ marginLeft: 10, height: 20 }}>İade, durdu</span>}</span>
              <span className={styles.segments}>
                {sources.map((_, step) => (
                  <i key={step} className={step < row.done ? styles.segDone : step === row.done && !row.stopped ? styles.segNow : undefined} />
                ))}
              </span>
              <span>{mockPeople[index + 2]}, {mockHubs[index % mockHubs.length]}</span>
              <span className={styles.nextStep}>{row.note}</span>
            </div>
          ))}
        </div>

        <aside className={styles.detail}>
          <span className={styles.detailTitle}>{mockShipmentNumbers[focus + 2]}</span>
          <span style={{ marginTop: 6, fontSize: 14 }}>{person} <span className={styles.muted} style={{ fontFamily: "var(--font-mono)" }}>{maskedPhone(focus)}</span></span>
          <span className={styles.muted} style={{ fontSize: 13 }}>{mockHubs[focus % mockHubs.length]}</span>
          <dl className={styles.detailMeta}>
            <dt>Durum</dt><dd>Adres araştırması sürüyor</dd>
            <dt>Hata sebebi</dt><dd>Alıcı adresi değişmiş</dd>
            <dt>Doğrulanmış adres</dt><dd>var</dd>
            <dt>Son sorgu</dt><dd style={{ fontFamily: "var(--font-mono)" }}>12.03.2026 09:42</dd>
          </dl>
          <p className={styles.ladderTitle} data-spot="ladder">Merdiven</p>
          <div className={styles.ladder} data-spot="ladder">
            {results.map((step, index) => (
              <span key={step.label} className={styles.step + (index < revealed ? " " + styles.stepOn : "") + (step.state === "sırada" ? " " + styles.stepCurrent : "")}>
                <b>{step.label}</b> <span className={styles.muted}>{step.state}</span>
                {step.detail && <small>{step.detail}</small>}
              </span>
            ))}
          </div>
          <div className={styles.detailActions}>
            <span className={styles.navyButton} style={{ height: 40, fontSize: 14 }}>Adres kaydını aç <ArrowRight size={15} /></span>
            <span className={styles.ghostButton} style={{ height: 40, fontSize: 14 }}>Yeni sekmede aç</span>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
