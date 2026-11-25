"use client";
import { useActionState, useState } from "react";
import { HeroBackground } from "@/app/components/Hero/HeroBackground";
import { accentIds, accentStyle, accents, heroBackgroundIds, heroBackgrounds } from "@/lib/appearance";
import type { AppearanceContent } from "@/lib/content/schema";
import { saveContent, type ActionState } from "../actions";
import { FormStatus, SubmitButton } from "./FormBits";
import styles from "../admin.module.css";

const initial: ActionState = { ok: false, message: "" };
const saveAppearance = saveContent.bind(null, "appearance");
const recommended = "horizon";

export function AppearanceForm({ initialValue, images, name, headline }: { initialValue: AppearanceContent; images: string[]; name: string; headline: string }) {
  const [value, setValue] = useState(initialValue);
  const [state, action] = useActionState(saveAppearance, initial);
  const [lead, accent] = headline.includes(",") ? [headline.slice(0, headline.indexOf(",") + 1), headline.slice(headline.indexOf(",") + 1)] : [headline, ""];

  return (
    <form action={action} className={styles.form} style={accentStyle(value.accent)}>
      <input type="hidden" name="payload" value={JSON.stringify(value)} />

      <section className={styles.card} aria-labelledby="accent-title">
        <h2 id="accent-title" className={styles.cardTitle}>Vurgu rengi <small>düğmeler, bağlantılar ve ışıklar</small></h2>
        <div className={styles.swatches} role="radiogroup" aria-labelledby="accent-title">
          {accentIds.map(id => (
            <label key={id} className={styles.swatch + (value.accent === id ? " " + styles.swatchActive : "")}>
              <input type="radio" name="accent" value={id} checked={value.accent === id} onChange={() => setValue({ ...value, accent: id })} className="sr-only" />
              <span className={styles.swatchColor} style={{ background: `rgb(${accents[id].rgb})` }} aria-hidden="true" />
              {accents[id].label}
            </label>
          ))}
        </div>
      </section>

      <section className={styles.card} aria-labelledby="hero-bg-title">
        <h2 id="hero-bg-title" className={styles.cardTitle}>Hero arka planı <small>imleci önizlemenin üzerinde gezdirerek de deneyebilirsin</small></h2>
        <div className={styles.bgGrid} role="radiogroup" aria-labelledby="hero-bg-title">
          {heroBackgroundIds.map(id => (
            <label key={id} className={styles.bgOption + (value.heroBackground === id ? " " + styles.bgActive : "")}>
              <input type="radio" name="heroBackground" value={id} checked={value.heroBackground === id} onChange={() => setValue({ ...value, heroBackground: id })} className="sr-only" />
              <span className={styles.bgPreview}>
                <HeroBackground variant={id} images={images} preview />
                <span className={styles.bgPreviewText} aria-hidden="true">
                  <span>{name}</span>
                  <strong>{lead}<em>{accent}</em></strong>
                </span>
              </span>
              <span className={styles.bgMeta}>
                <strong>{heroBackgrounds[id].label}</strong>
                {id === recommended && <span className={styles.badge}>Önerim</span>}
                {value.heroBackground === id && <span className={styles.selectedMark}>Seçili</span>}
              </span>
              <span className={styles.hint}>{heroBackgrounds[id].description}</span>
            </label>
          ))}
        </div>
      </section>

      <div className={styles.formActions}>
        <FormStatus state={state} />
        <a className={styles.button} href="/" target="_blank" rel="noopener noreferrer">Siteyi aç</a>
        <SubmitButton />
      </div>
    </form>
  );
}
