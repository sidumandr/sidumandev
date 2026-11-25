"use client";
import { AppShell } from "./AppShell";
import { mockProjects } from "./mock";
import { formatNumber, useTicker } from "./ScreenFrame";
import styles from "./app.module.css";

const methods = ["dosyaEvrakListesi", "evrakSayfaToplami", "arama", "barkodSorgu", "belgeGoruntule"];
const accounts = ["GENEL", "TARAMA"];

/** Sabit bir başlangıçtan geriye doğru, her satırı rastgele görünen ama tekrarlanabilir istek kaydı. */
function request(index: number) {
  const seconds = 14 * 3600 + 20 * 60 + 4 + index;
  const time = [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60].map(part => String(part).padStart(2, "0")).join(":");
  return {
    time,
    project: mockProjects[(index * 3) % mockProjects.length],
    account: accounts[index % 2],
    method: methods[(index * 7) % methods.length],
    duration: 300 + ((index * 977) % 3900),
  };
}

const tours = [
  { project: "Proje A", last: "1 gün", start: 82, target: 99, left: "6 / 640 dosya kaldı", eta: "Yaklaşık bugün" },
  { project: "Proje B", last: "2,1 gün", start: 88, target: 97, left: "48 / 1.590 dosya kaldı", eta: "Yaklaşık bugün" },
  { project: "Proje C", last: "0,8 gün", start: 18, target: 41, left: "160 / 272 dosya kaldı", eta: "Yaklaşık 1,5 gün" },
];

/** Entegrasyon izleme: dış sistemlere giden istekler canlı akar, tam tur süreleri ölçülür. */
export function MonitoringScreen() {
  const tick = useTicker(1100);
  const rows = Array.from({ length: 10 }, (_, offset) => request(tick + 9 - offset));
  const progress = Math.min(1, tick / 12);

  return (
    <AppShell active="monitoring">
      <div className={styles.pageTitle}><h3>Performans</h3></div>
      <div className={styles.monitor}>
        <div className={styles.card}>
          <div className={styles.streamHead}>
            <strong>İstek akışı</strong>
            <span className={styles.muted}>Dış sistemlere giden her istek: proje, hesap, sonuç ve süre. En yenisi üstte.</span>
            <span className={styles.live}><i />Canlı</span>
          </div>
          <div className={styles.streamHead} style={{ color: "var(--muted)" }}>Bugün {formatNumber(58420 + tick * 3)} istek gitti, günlük sınırın altında.</div>
          <table className={styles.table + " " + styles.stream}>
            <thead><tr><th>Saat</th><th>Proje</th><th>Hesap</th><th>İşlem</th><th>Sonuç</th><th>Süre</th></tr></thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.time} className={index === 0 && tick > 0 ? styles.newRow : undefined}>
                  <td>{row.time}</td>
                  <td>{row.project}</td>
                  <td><span className={styles.method}>{row.account}</span></td>
                  <td><span className={styles.method}>{row.method}</span></td>
                  <td>Tamam</td>
                  <td><span className={styles.money}>{formatNumber(row.duration)} ms</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className={styles.card}>
            <div className={styles.streamHead}><strong>Tam tur: bir proje kaç günde baştan sona okunuyor</strong></div>
            <table className={styles.table + " " + styles.tour}>
              <thead><tr><th>Proje</th><th>Son tam tur</th><th>Şu anki tur</th></tr></thead>
              <tbody>
                {tours.map(tour => {
                  const value = Math.round(tour.start + (tour.target - tour.start) * progress);
                  return (
                    <tr key={tour.project}>
                      <td>{tour.project}</td>
                      <td><strong>{tour.last}</strong></td>
                      <td>
                        <strong>%{value}</strong> <span className={styles.muted}>{tour.left}</span>
                        <div className={styles.bar}><i style={{ width: value + "%" }} /></div>
                        <span className={styles.sub}>{tour.eta}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.metricList}>
            <div><b>Harcama</b><span>maliyet kayıtları, son 30 gün</span></div>
            <div><b>Giriş</b><span>giriş denemeleri, son 24 saat</span></div>
            <div><b>Redis</b><span>bellek, istemci, gecikme</span></div>
            <div><b>Servisler</b><span>durum ve çalışma süresi</span></div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
