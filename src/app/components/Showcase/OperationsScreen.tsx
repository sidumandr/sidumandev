"use client";
import { Check, Clock3, SlidersHorizontal } from "lucide-react";
import { AppShell } from "./AppShell";
import { mockHubs, mockShipmentNumbers, mockProjects } from "./mock";
import { formatNumber, useScreen, useTicker } from "./ScreenFrame";
import styles from "./app.module.css";

const items = [
  { type: "Yeni adres", source: "SMS onayı" },
  { type: "2. deneme", source: "Sipariş" },
  { type: "2. deneme", source: "Sipariş" },
  { type: "Yeni adres", source: "CRM" },
  { type: "Yeni adres", source: "Kurye notu" },
  { type: "Yeni adres", source: "Kurye notu" },
  { type: "2. deneme", source: "Harita" },
  { type: "Yeni adres", source: "SMS onayı" },
];
const COST = 300;

/** Toplu kurye ataması: hazır, bekletilen ve engellenen işlemler; maliyet gönderilmeden görünür. */
export function OperationsScreen() {
  const { reduced } = useScreen();
  const tick = useTicker(900);
  // Hepsi gönderildikten sonra birkaç adım bekleyip baştan başlar.
  const sent = reduced ? items.length : Math.min(tick % (items.length + 4), items.length);
  return (
    <AppShell active="operations">
      <div className={styles.pageTitle}><h3>İşlemler</h3></div>
      <div className={styles.tabs}>
        <span className={styles.tabActive}>Gönderime hazır<b>128</b></span>
        <span>Kurye ataması<b>602</b></span>
        <span>Talepler<b>17</b></span>
        <span>Gümrük beyanı<b>0</b></span>
        <span>Faturalama<b>{formatNumber(7940)}</b></span>
      </div>
      <div className={styles.opsGrid}>
        <div className={styles.card}>
          <div className={styles.subTabs} data-spot="subtabs">
            <span className={styles.tabActive}>Gönderilebilir 128</span>
            <span>Bekletilen 109</span>
            <span>Gönderilemeyen 431</span>
            <span>Hazırlanamadı 9</span>
            <span>Engellendi 3</span>
          </div>
          <div className={styles.cardHeader}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Clock3 size={15} />Saat aralığı 06:00 ile 07:30</span>
            <span style={{ display: "flex", gap: 8 }}>
              <span className={styles.prepared}><Check size={13} />Hazırlandı 05:48</span>
              <span className={styles.topButton} style={{ height: 30, padding: "0 8px" }}><SlidersHorizontal size={14} /></span>
            </span>
          </div>
          <table className={styles.table}>
            <thead><tr><th>Gönderi no</th><th>Proje</th><th>Şube</th><th>Tür</th><th>Adres kaynağı</th><th>Tutar</th><th>Saat</th></tr></thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} data-spot={index === sent - 1 ? "sending" : undefined} className={styles.row + (index < sent ? " " + styles.selected : "")} style={{ animationDelay: `${index * 60}ms` }}>
                  <td><span className={styles.fileNo}>{mockShipmentNumbers[(index + 4) % mockShipmentNumbers.length]}</span></td>
                  <td>{mockProjects[(index + 1) % mockProjects.length]}</td>
                  <td>{mockHubs[(index + 3) % mockHubs.length]}</td>
                  <td>{item.type}</td>
                  <td>{item.source}</td>
                  <td><span className={styles.money}>{COST} TL</span></td>
                  <td><span className={styles.money}>{index < sent ? "06:0" + index : "--:--"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <span className={styles.autoSend} data-spot="queue">Otomatik gönderim açık</span>
          <div className={styles.queue} data-spot="queue">
            <h5>Gönderim sırası <small>{items.length - sent} gönderi kaldı</small></h5>
            <div className={styles.progress}><i style={{ width: `${(sent / items.length) * 100}%` }} /></div>
            <div className={styles.queueRow}><span>Tamamlanan</span><b className={styles.money}>{sent}</b></div>
            <div className={styles.queueRow}><span>Bugünkü harcama</span><b className={styles.money}>{formatNumber(sent * COST)} TL</b></div>
            <div className={styles.queueRow}><span>Günlük bütçe</span><b className={styles.money}>{formatNumber(60000)} TL</b></div>
            <div className={styles.queueRow}><span>Ön koşulu eksik</span><b className={styles.money}>9</b></div>
            <p className={styles.muted} style={{ marginTop: 14, fontSize: 12.5, lineHeight: 1.5 }}>
              Aynı gönderi için ikinci bir gönderim kilitlenir. Sonucu belirsiz kalan işlemler yeniden gönderilmeden önce incelemeye düşer.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
