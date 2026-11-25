/**
 * Ana projenin ekranlarını yeniden çizerken kullanılan UYDURMA veriler.
 * Gerçek kişi, dosya, kurum, proje ya da müşteri bilgisi içermez; isimler ve numaralar rastgele seçilmiştir.
 */

export const mockProjects = ["Proje A", "Proje B", "Proje C", "Proje D"];

export const mockCourts = [
  "İstanbul 4. İcra Dairesi",
  "Ankara 12. İcra Dairesi",
  "İzmir 3. İcra Dairesi",
  "Bursa 6. İcra Dairesi",
  "Antalya 2. İcra Dairesi",
  "Kocaeli 1. İcra Dairesi",
  "Konya 5. İcra Dairesi",
  "Eskişehir 2. İcra Dairesi",
];

export const mockPeople = [
  "ELİF DEMİRCAN",
  "KAAN YALÇINER",
  "MERVE USLUOĞLU",
  "ONUR KAYABAŞI",
  "SELİN ERGÜVEN",
  "BURAK TEZEL",
  "DERYA SOYKAN",
  "EMRE BALTACIOĞLU",
  "GİZEM ORAKÇI",
  "HAKAN DURSUNLU",
  "İLAYDA KORKMAZER",
  "TOLGA AKINCILAR",
];

export const mockFileNumbers = [
  "2026/10482", "2026/20917", "2025/31206", "2026/47715", "2025/52390", "2026/60128",
  "2026/71844", "2025/83057", "2026/90613", "2025/14369", "2026/25780", "2026/36092",
];

/** Maskeli kimlik numarasının son iki hanesi de rastgeledir. */
export const maskedId = (index: number) => "*********" + String((index * 37 + 11) % 100).padStart(2, "0");

/** Ödeme emri altındaki iş havuzları; sayılar uydurmadır. */
export const poolCounts = [
  { label: "Zarf çıkmamış", count: 96 },
  { label: "Bila", count: 612 },
  { label: "Cezaevi", count: 104 },
  { label: "Vefat", count: 38 },
  { label: "İtiraz", count: 655 },
  { label: "Kritik Akıbet", count: 21 },
  { label: "Kesinleşme işlenmemiş", count: 74 },
  { label: "Yurt Dışı", count: 47 },
  { label: "Kesinleşme Günlük", count: 33 },
  { label: "Kesinleşme Genel", count: 7914 },
];

export const journey = [
  { label: "Zarf çıkmamış", count: 96, note: "Ödeme emri henüz çıkmadı", color: "#94a3b8" },
  { label: "Tebligat yolda", count: 168, note: "Zarf postada, sonuç bekleniyor", color: "#3b82f6" },
  { label: "Mazbata yolda", count: 241, note: "Teslim edildi, mazbata bekleniyor", color: "#2563eb" },
  { label: "Bila", count: 612, note: "Zarf döndü, yeni adres aranıyor", color: "#ef4444" },
  { label: "İtiraz", count: 655, note: "Borçlu itiraz etti, takip durdu", color: "#f59e0b" },
  { label: "Kesinleşti", count: 298, note: "Süre doldu, itiraz yok", color: "#22c55e" },
  { label: "Haciz süreci", count: 7316, note: "Haciz işleri başladı", color: "#16a34a" },
];
