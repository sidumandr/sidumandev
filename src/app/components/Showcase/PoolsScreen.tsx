"use client";
import { AppShell } from "./AppShell";
import { maskedPhone, mockHubs, mockShipmentNumbers, mockPeople, mockProjects } from "./mock";
import { formatNumber, useScreen, useTicker } from "./ScreenFrame";
import styles from "./app.module.css";

type Tone = "chipGray" | "chipRed" | "chipOrange" | "chipBlue" | "chipGreen";
const statuses: { label: string; tone: Tone }[] = [
  { label: "Teslim edildi", tone: "chipGray" },
  { label: "İade talebi", tone: "chipRed" },
  { label: "Teslim edildi", tone: "chipGray" },
  { label: "Dağıtımda", tone: "chipBlue" },
  { label: "Teslim edildi", tone: "chipGray" },
  { label: "Ulaşılamadı", tone: "chipOrange" },
  { label: "Teslim edildi", tone: "chipGray" },
  { label: "Teslim edildi", tone: "chipGray" },
];
const deliveries = ["Komşuya teslim", "Aynı adreste yakını", "Alıcının kendisi", "Kargo dolabı", "Komşuya teslim", "Adreste bulunamadı", "Alıcının kendisi", "Kargo dolabı"];
const outcomes: ({ chip: string; tone: Tone } | string)[] = [
  { chip: "Faturalamada", tone: "chipOrange" },
  "Teslim, imza alındı",
  { chip: "Faturalamada", tone: "chipOrange" },
  "Araç yolda",
  "Fatura kesildi",
  "Yeni adres aranıyor",
  { chip: "Faturalamada", tone: "chipOrange" },
  "Dolaptan alındı",
];

/** Turda durumu değişen gönderi: teslimat onaylanınca teslim edildi olur ve havuzu değişir. */
const FLIP_ROW = 3;

/** Ana sayfa listesi: gönderiler durumlarına göre havuzlarda, klavyeyle gezilebilir tablo. */
export function PoolsScreen() {
  const { beat } = useScreen();
  const tick = useTicker(1100);
  const selected = tick % statuses.length;
  const flipped = beat >= 0;
  return (
    <AppShell active="files" bump={{ label: "Teslim işlenmemiş", on: beat >= 1 }}>
      <div className={styles.pageTitle}>
        <h3>Ana sayfa</h3>
        <span><b>10.248</b> gönderi, <b>1.736</b> tanesi ilk dağıtım turunda</span>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span>Görüntülenen: 1-50 / {formatNumber(10248)}</span>
          <span className={styles.pager}>{[1, 2, 3, 4, 5, 6, 7].map(page => <span key={page} className={page === 1 ? styles.pagerActive : undefined}>{page}</span>)}</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr><th>Proje</th><th>Gönderi durumu</th><th>Şube</th><th>Gönderi no</th><th>Alıcı</th><th>Teslimat durumu</th><th>Son gelişme</th></tr>
          </thead>
          <tbody>
            {statuses.map((status, index) => {
              const outcome = outcomes[index];
              const flip = index === FLIP_ROW ? "flip" : undefined;
              const chip = <span className={styles.chip + " " + styles[status.tone]}>{status.label}</span>;
              return (
                <tr key={index} data-spot={index === selected ? "row" : undefined} className={styles.row + (index === selected ? " " + styles.selected : "") + (index === FLIP_ROW && flipped ? " " + styles.flashRow : "")} style={{ animationDelay: `${index * 70}ms` }}>
                  <td data-spot={flip}>{mockProjects[index % mockProjects.length]}</td>
                  <td data-spot={flip}>
                    {index === FLIP_ROW ? (
                      <span className={styles.swap + (flipped ? " " + styles.swapOn : "")}>{chip}<span className={styles.chip + " " + styles.chipGray}>Teslim edildi</span></span>
                    ) : chip}
                  </td>
                  <td data-spot={flip}>{mockHubs[index]}</td>
                  <td data-spot={flip}><span className={styles.fileNo}>{mockShipmentNumbers[index]}</span></td>
                  <td><span className={styles.person}>{mockPeople[index]}<small>{maskedPhone(index)}</small></span></td>
                  <td data-spot={index < 3 ? "outcome" : undefined}>Teslimat<span className={styles.sub}>{deliveries[index]}</span></td>
                  <td data-spot={index < 3 ? "outcome" : undefined}>{typeof outcome === "string" ? outcome : <span className={styles.chip + " " + styles[outcome.tone]}>{outcome.chip}</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.cardHeader} style={{ borderTop: "1px solid var(--line)", borderBottom: 0 }}>
          <span>↑ ↓ ile gönderiler arasında gez, Enter ile aç, ? ile bütün kısayollar</span>
        </div>
      </div>
    </AppShell>
  );
}
