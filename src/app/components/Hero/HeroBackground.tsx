import Image from "next/image";
import type { HeroBackgroundId } from "@/lib/appearance";
import { CursorLight } from "./CursorLight";
import styles from "./hero-background.module.css";

const beamPositions = [8, 19, 31, 44, 57, 70, 82, 93];
const flowNodes = [
  { x: 180, y: 120, label: "Belge" },
  { x: 1020, y: 120, label: "Kural" },
  { x: 180, y: 580, label: "Kuyruk" },
  { x: 1020, y: 580, label: "Onay" },
];

/** Ufuk çizgisi seçildiğinde ürün görselinin hemen arkasında yükselen parlak yay. */
export function HorizonArc() {
  return <span className={styles.horizonArc} aria-hidden="true" />;
}

/**
 * Hero'nun dekoratif arka planı. Sitede ve admin panelindeki önizlemelerde aynı bileşen kullanılır;
 * `preview` küçük kutularda ekran yüksekliğine bağlı ölçüleri kapsayıcıya göre ayarlar.
 */
export function HeroBackground({ variant, images = [], preview = false }: { variant: HeroBackgroundId; images?: string[]; preview?: boolean }) {
  const className = styles.root + (preview ? " " + styles.preview : "");

  switch (variant) {
    case "horizon":
      // Sitede yay, ürün görseline göre konumlanan <HorizonArc /> ile çizilir; burada yalnızca önizleme için.
      return (
        <div className={className} aria-hidden="true">
          {preview ? (
            <>
              <div className={styles.horizonSky} />
              <div className={styles.horizonPlanet} />
            </>
          ) : (
            <div className={styles.topGlow} style={{ opacity: 0.5 }} />
          )}
        </div>
      );

    case "beams":
      return (
        <div className={className + " " + styles.beams} aria-hidden="true">
          <div className={styles.topGlow} />
          {beamPositions.map((left, index) => (
            <span key={left} className={styles.beam} style={{ left: left + "%", "--delay": `${-index * 1.37}s`, "--duration": `${6 + (index % 3) * 1.6}s` } as React.CSSProperties} />
          ))}
        </div>
      );

    case "cursor":
      return (
        <div className={className} aria-hidden="true">
          <div className={styles.topGlow} />
          <CursorLight className={styles.cursorLayer} gridClassName={styles.cursorGrid} glowClassName={styles.cursorGlow} />
        </div>
      );

    case "wall": {
      const pool = images.length > 0 ? images : [];
      if (pool.length === 0) return <HeroBackground variant="spotlight" preview={preview} />;
      const row = Array.from({ length: Math.max(6, pool.length * 2) }, (_, index) => pool[index % pool.length]);
      return (
        <div className={className} aria-hidden="true">
          <div className={styles.wall}>
            {[0, 1, 2].map(rowIndex => (
              <div key={rowIndex} className={styles.wallRow} style={{ animationDuration: `${60 + rowIndex * 14}s`, animationDirection: rowIndex % 2 ? "reverse" : "normal" }}>
                {[...row, ...row].map((src, index) => (
                  <div key={index} className={styles.wallTile}>
                    <Image src={src} alt="" fill sizes="320px" />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.wallShade} />
        </div>
      );
    }

    case "flow":
      return (
        <div className={className} aria-hidden="true">
          <svg className={styles.flow} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
            <g fill="none" strokeLinecap="round">
              <path className={styles.flowTrack} d="M -40 120 L 180 120 C 420 120 460 350 600 350 S 820 580 1020 580 L 1240 580" />
              <path className={styles.flowTrack} d="M -40 580 L 180 580 C 420 580 460 350 600 350 S 820 120 1020 120 L 1240 120" />
              <path className={styles.flowTrack} d="M -40 350 L 1240 350" />
              <path className={styles.flowPulse} style={{ animationDuration: "7s" }} d="M -40 120 L 180 120 C 420 120 460 350 600 350 S 820 580 1020 580 L 1240 580" />
              <path className={styles.flowPulse} style={{ animationDuration: "8.5s", animationDelay: "-3s" }} d="M -40 580 L 180 580 C 420 580 460 350 600 350 S 820 120 1020 120 L 1240 120" />
              <path className={styles.flowPulse} style={{ animationDuration: "6s", animationDelay: "-1.5s" }} d="M -40 350 L 1240 350" />
            </g>
            {flowNodes.map(node => (
              <g key={node.label} className={styles.flowNode}>
                <rect x={node.x - 52} y={node.y - 19} width="104" height="38" rx="10" />
                <text x={node.x} y={node.y + 5} textAnchor="middle">{node.label}</text>
              </g>
            ))}
          </svg>
          <div className={styles.centerShade} />
        </div>
      );

    case "spotlight":
      return (
        <div className={className} aria-hidden="true">
          <div className={styles.spot} />
          <div className={styles.grain} />
        </div>
      );

    case "aurora":
      return (
        <div className={className} aria-hidden="true">
          <div className={styles.blobA} />
          <div className={styles.blobB} />
          <div className={styles.blobC} />
        </div>
      );

    case "grid":
      return (
        <div className={className} aria-hidden="true">
          <div className={styles.grid} />
          <div className={styles.topGlow} />
        </div>
      );

    default:
      return null;
  }
}
