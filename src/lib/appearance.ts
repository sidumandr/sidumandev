/** Admin panelindeki Görünüm sayfasında seçilebilen hero arka planları ve vurgu renkleri. */

export const heroBackgroundIds = ["horizon", "beams", "cursor", "wall", "flow", "spotlight", "aurora", "grid", "none"] as const;
export type HeroBackgroundId = (typeof heroBackgroundIds)[number];

export const heroBackgrounds: Record<HeroBackgroundId, { label: string; description: string }> = {
  horizon: { label: "Ufuk çizgisi", description: "Ürün görseli, parlayan bir ufkun üzerinden yükselir." },
  beams: { label: "Işık hüzmeleri", description: "İnce dikey çizgilerden yavaşça ışık süzülür." },
  cursor: { label: "İmleci takip eden ışık", description: "Fare nerede gezinirse arkadaki desen orada aydınlanır." },
  wall: { label: "Proje duvarı", description: "Projelerinin ekran görüntüleri eğik bir duvarda kayar." },
  flow: { label: "İş akışı çizgileri", description: "Belge, kural, onay ve kuyruk adımları arasında ışık akar." },
  spotlight: { label: "Spot ışık ve gren", description: "Üstten tek bir yumuşak ışık ve hafif film dokusu." },
  aurora: { label: "Aurora", description: "Arka planda yavaşça dolaşan sıcak renk bulutları." },
  grid: { label: "Kareli ızgara", description: "Önceki tasarımdaki ince kare ızgara." },
  none: { label: "Sade", description: "Hiçbir efekt yok, yalnızca koyu zemin." },
};

export const accentIds = ["yellow", "orange", "green", "blue", "violet", "rose"] as const;
export type AccentId = (typeof accentIds)[number];

/** `rgb` CSS'te `rgb(var(--accent-rgb) / .2)` biçiminde kullanılır; hepsinde koyu metin okunur kalır. */
export const accents: Record<AccentId, { label: string; rgb: string; hover: string }> = {
  yellow: { label: "Sarı", rgb: "255 225 77", hover: "#fff06b" },
  orange: { label: "Turuncu", rgb: "255 159 67", hover: "#ffb877" },
  green: { label: "Yeşil", rgb: "74 222 128", hover: "#7ae8a0" },
  blue: { label: "Mavi", rgb: "96 165 250", hover: "#8cbefb" },
  violet: { label: "Mor", rgb: "167 139 250", hover: "#c0aefb" },
  rose: { label: "Pembe", rgb: "251 113 133", hover: "#fc97a6" },
};

export function accentStyle(id: AccentId) {
  const accent = accents[id] ?? accents.yellow;
  return { "--accent-rgb": accent.rgb, "--accent-hover": accent.hover } as React.CSSProperties;
}

export function accentCss(id: AccentId): string {
  const accent = accents[id] ?? accents.yellow;
  return `:root{--accent-rgb:${accent.rgb};--accent-hover:${accent.hover}}`;
}
