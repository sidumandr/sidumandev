"use client";
import { AppShell } from "./AppShell";
import { maskedId, mockCourts, mockFileNumbers, mockPeople, mockProjects } from "./mock";
import { formatNumber, useScreen, useTicker } from "./ScreenFrame";
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

/** Turda durumu değişen dosya: tebligat tamamlanınca kesinleşir ve havuzu değişir. */
const FLIP_ROW = 3;

/** Ana sayfa listesi: dosyalar durumlarına göre havuzlarda, klavyeyle gezilebilir tablo. */
export function PoolsScreen() {
  const { beat } = useScreen();
  const tick = useTicker(1100);
  const selected = tick % statuses.length;
  const flipped = beat >= 0;
  return (
    <AppShell active="files" bump={{ label: "Kesinleşme işlenmemiş", on: beat >= 1 }}>
      <div className={styles.pageTitle}>
        <h3>Ana sayfa</h3>
        <span><b>10.248</b> dosya, <b>1.736</b> tanesi ilk ödeme emri sürecinde</span>
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
              const flip = index === FLIP_ROW ? "flip" : undefined;
              const chip = <span className={styles.chip + " " + styles[status.tone]}>{status.label}</span>;
              return (
                <tr key={index} data-spot={index === selected ? "row" : undefined} className={styles.row + (index === selected ? " " + styles.selected : "") + (index === FLIP_ROW && flipped ? " " + styles.flashRow : "")} style={{ animationDelay: `${index * 70}ms` }}>
                  <td data-spot={flip}>{mockProjects[index % mockProjects.length]}</td>
                  <td data-spot={flip}>
                    {index === FLIP_ROW ? (
                      <span className={styles.swap + (flipped ? " " + styles.swapOn : "")}>{chip}<span className={styles.chip + " " + styles.chipGray}>Kesinleşti</span></span>
                    ) : chip}
                  </td>
                  <td data-spot={flip}>{mockCourts[index]}</td>
                  <td data-spot={flip}><span className={styles.fileNo}>{mockFileNumbers[index]}</span></td>
                  <td><span className={styles.person}>{mockPeople[index]}<small>{maskedId(index)}</small></span></td>
                  <td data-spot={index < 3 ? "outcome" : undefined}>Tebliğ<span className={styles.sub}>{deliveries[index]}</span></td>
                  <td data-spot={index < 3 ? "outcome" : undefined}>{typeof outcome === "string" ? outcome : <span className={styles.chip + " " + styles[outcome.tone]}>{outcome.chip}</span>}</td>
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
