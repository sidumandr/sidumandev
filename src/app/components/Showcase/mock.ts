/**
 * Ana projenin ekranlarını yeniden çizerken kullanılan UYDURMA veriler.
 * Gerçek kişi, gönderi, kurum, proje ya da müşteri bilgisi içermez; isimler ve numaralar rastgele seçilmiştir.
 */

export const mockProjects = ["Proje A", "Proje B", "Proje C", "Proje D"];

export const mockHubs = [
  "İstanbul 4. Şube",
  "Ankara 12. Şube",
  "İzmir 3. Şube",
  "Bursa 6. Şube",
  "Antalya 2. Şube",
  "Kocaeli 1. Şube",
  "Konya 5. Şube",
  "Eskişehir 2. Şube",
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

export const mockShipmentNumbers = [
  "SVK-10482", "SVK-20917", "SVK-31206", "SVK-47715", "SVK-52390", "SVK-60128",
  "SVK-71844", "SVK-83057", "SVK-90613", "SVK-14369", "SVK-25780", "SVK-36092",
];

/** Maskeli telefon numarasının son iki hanesi de rastgeledir. */
export const maskedPhone = (index: number) => "05** *** ** " + String((index * 37 + 11) % 100).padStart(2, "0");

/** Teslimat altındaki iş havuzları; sayılar uydurmadır. */
export const poolCounts = [
  { label: "Depoda bekleyen", count: 96 },
  { label: "Ulaşılamadı", count: 612 },
  { label: "Gümrükte", count: 104 },
  { label: "Hasarlı", count: 38 },
  { label: "İade talebi", count: 655 },
  { label: "Kritik gecikme", count: 21 },
  { label: "Teslim işlenmemiş", count: 74 },
  { label: "Yurt Dışı", count: 47 },
  { label: "Teslim Günlük", count: 33 },
  { label: "Teslim Genel", count: 7914 },
];

export const journey = [
  { label: "Depoda", count: 96, note: "Henüz araca yüklenmedi", color: "#94a3b8" },
  { label: "Yolda", count: 168, note: "Araçta, aktarmaya gidiyor", color: "#3b82f6" },
  { label: "Dağıtımda", count: 241, note: "Kuryede, teslim bekleniyor", color: "#2563eb" },
  { label: "Ulaşılamadı", count: 612, note: "Teslim edilemedi, yeni adres aranıyor", color: "#ef4444" },
  { label: "İade talebi", count: 655, note: "Alıcı iade istedi, dağıtım durdu", color: "#f59e0b" },
  { label: "Teslim edildi", count: 298, note: "İmza alındı, sorun yok", color: "#22c55e" },
  { label: "Faturalama", count: 7316, note: "Fatura ve tahsilat başladı", color: "#16a34a" },
];
