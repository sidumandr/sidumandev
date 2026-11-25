import type { CSSProperties } from "react";
import { ArrowDown, Mail } from "lucide-react";
import type { AppearanceContent, ContactContent, FlagshipContent, HeroContent } from "@/lib/content/schema";
import { Button } from "../ui/Button";
import { HeroBackground, HorizonArc } from "./HeroBackground";
import { OverviewScreen } from "../Showcase/OverviewScreen";
import { ScreenFrame } from "../Showcase/ScreenFrame";
import styles from "./hero.module.css";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Başlıkta virgülden sonraki kısım sarı gösterilir. */
function splitHeadline(headline: string): [string, string] {
  const index = headline.indexOf(",");
  if (index === -1 || index >= headline.length - 2) return [headline, ""];
  return [headline.slice(0, index + 1), headline.slice(index + 1).trim()];
}

const lowerFirst = (text: string) => text.charAt(0).toLocaleLowerCase("tr-TR") + text.slice(1);

export default function Hero({ hero, flagship, contact, appearance, images }: {
  hero: HeroContent;
  flagship: FlagshipContent;
  contact: ContactContent;
  appearance: AppearanceContent;
  /** "Proje duvarı" arka planı için proje ekran görüntüleri. */
  images: string[];
}) {
  const [lead, accent] = splitHeadline(hero.headline);
  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.backdrop}>
        <HeroBackground variant={appearance.heroBackground} images={images} />
      </div>

      <div className={"container " + styles.intro}>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.name + " enter"}>
            <span>{hero.name}<span className={styles.role}>, {lowerFirst(hero.role)}</span></span>
          </span>
          <span className="sr-only">. </span>
          <span className={styles.headline + " enter"} style={order(1)}>
            {lead}
            {accent && <> <span className={styles.accent}>{accent}</span></>}
          </span>
        </h1>

        <p className={styles.lead + " enter"} style={order(2)}>{hero.subheadline}</p>

        <div className={styles.actions + " enter"} style={order(3)}>
          <Button href="#projects" variant="primary" data-track="cta_projects">
            Projelere bak <ArrowDown size={16} aria-hidden="true" />
          </Button>
          <Button href={"mailto:" + contact.email} data-track="email_click" data-track-label="hero">
            <Mail size={16} aria-hidden="true" /> Bana yaz
          </Button>
        </div>
        {hero.available && hero.availabilityText && (
          <p className={styles.available + " enter"} style={order(4)}>{hero.availabilityText}</p>
        )}
      </div>

      <div className={"container " + styles.showcase + " enter"} style={order(5)}>
        {appearance.heroBackground === "horizon" && <HorizonArc />}
        <figure className={styles.shot}>
          <ScreenFrame path="operasyon-paneli / genel-bakış" label="Ana projenin genel bakış ekranı: toplam dosya sayısı, kesinleşme oranı ve dosyaların aşamalar boyunca ilerleyişi. Veriler örnektir." height={860}>
            <OverviewScreen />
          </ScreenFrame>
          <figcaption className={styles.caption}>Ekran yeniden çizildi, tüm veriler örnektir.</figcaption>
        </figure>
        {flagship.metrics.length > 0 && (
          <dl className={styles.metrics}>
            {flagship.metrics.map(metric => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
