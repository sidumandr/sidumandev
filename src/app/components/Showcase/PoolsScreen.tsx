"use client";
import { Download } from "lucide-react";
import { AppShell } from "./AppShell";
import { maskedId, mockCourts, mockFileNumbers, mockPeople, mockProjects } from "./mock";
import { formatNumber, useTicker } from "./ScreenFrame";
import styles from "./app.module.css";

type Tone = "chipGray" | "chipRed" | "chipOrange" | "chipBlue" | "chipGreen";
const statuses: { label: string; tone: Tone }[] = [
  { label: "Kesinleşti", tone: "chipGray" },
  { label: "İtiraz var", tone: "chipRed" },
  { label: "Kesinleşti", tone: "chipGray" },
  { label: "Tebligat yolda", tone: "chipBlue" },
  { label: "Kesinleşti", tone: "chipGray" },
  { label: "Bila", tone: "chipOrange" },
  { label: "Kesinleşti", tone: "chipGray" },
  { label: "Kesinleşti", tone: "chipGray" },
];
const deliveries = ["Muhtara teslim", "Aynı konutta yakını", "Muhatabın kendisi", "e-Tebligat", "Muhtara teslim", "Adreste bulunamadı", "Muhatabın kendisi", "e-Tebligat"];
const outcomes: ({ chip: string; tone: Tone } | string)[] = [
  { chip: "Haciz aşamasında", tone: "chipOrange" },
  "Tebliğ, mazbata geldi",
  { chip: "Haciz aşamasında", tone: "chipOrange" },
  "Zarf postada",
  "Müzekkere gitti",
  "Yeni adres aranıyor",
  { chip: "Haciz aşamasında", tone: "chipOrange" },
  "e-Tebligat okundu",
];

/** Ana sayfa listesi: dosyalar durumlarına göre havuzlarda, klavyeyle gezilebilir tablo. */
export function PoolsScreen() {
  const tick = useTicker(1400);
  const selected = tick % statuses.length;
  return (
    <AppShell active="files">
      <div className={styles.pageTitle} style={{ justifyContent: "space-between" }}>
        <span style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <h3>Ana sayfa</h3>
          <span><b>10.248</b> dosya, <b>1.736</b> tanesi ilk ödeme emri sürecinde</span>
        </span>
        <span className={styles.topButton}><Download size={15} />Takipteki dosyalar Excel</span>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span>Görüntülenen: 1-50 / {formatNumber(10248)}</span>
          <span className={styles.pager}>{[1, 2, 3, 4, 5, 6, 7].map(page => <span key={page} className={page === 1 ? styles.pagerActive : undefined}>{page}</span>)}</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr><th>Proje</th><th>Dosya durumu</th><th>İcra dairesi</th><th>Dosya no</th><th>Borçlu</th><th>Tebligat durumu</th><th>Gelişme sonucu</th></tr>
          </thead>
          <tbody>
            {statuses.map((status, index) => {
              const outcome = outcomes[index];
              return (
                <tr key={index} className={styles.row + (index === selected ? " " + styles.selected : "")} style={{ animationDelay: `${index * 70}ms` }}>
                  <td>{mockProjects[index % mockProjects.length]}</td>
                  <td><span className={styles.chip + " " + styles[status.tone]}>{status.label}</span></td>
                  <td>{mockCourts[index]}</td>
                  <td><span className={styles.fileNo}>{mockFileNumbers[index]}</span></td>
                  <td><span className={styles.person}>{mockPeople[index]}<small>{maskedId(index)}</small></span></td>
                  <td>Tebliğ<span className={styles.sub}>{deliveries[index]}</span></td>
                  <td>{typeof outcome === "string" ? outcome : <span className={styles.chip + " " + styles[outcome.tone]}>{outcome.chip}</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.cardHeader} style={{ borderTop: "1px solid var(--line)", borderBottom: 0 }}>
          <span>↑ ↓ ile dosyalar arasında gez, Enter ile aç, ? ile bütün kısayollar</span>
        </div>
      </div>
    </AppShell>
  );
}
