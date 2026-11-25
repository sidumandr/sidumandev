"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import type { FlagshipContent } from "@/lib/content/schema";
import { ProductTour } from "../Showcase/ProductTour";
import { Architecture } from "./Architecture";
import { TagList } from "../ui/TagList";
import styles from "./flagship.module.css";

const number = (index: number) => String(index + 1).padStart(2, "0");
const anchor = (index: number) => "flagship-section-" + number(index);

type Panel = "details" | "architecture";

/**
 * Ana proje kartı bir ön izlemedir: başlık, tek satırlık tanıtım ve ekran turu.
 * Ayrıntılar ve mimari, kartın düğmeleriyle açılan pencerelerdedir.
 */
export function FlagshipProject({ flagship }: { flagship: FlagshipContent }) {
  const [panel, setPanel] = useState<Panel | null>(null);

  return (
    <Dialog.Root open={panel !== null} onOpenChange={open => !open && setPanel(null)}>
      <article id="flagship" className={styles.feature + " reveal"}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.head}>
          <div className={styles.headText}>
            <p className={styles.eyebrow}>{flagship.eyebrow}</p>
            <h3 className={styles.title}>{flagship.title}</h3>
            <p className={styles.tagline}>{flagship.tagline}</p>
          </div>
          <div className={styles.headActions}>
            <button type="button" className={styles.trigger} onClick={() => setPanel("details")} data-track="flagship_open" data-track-label="Detaylar">
              Detaylara bak <ArrowUpRight size={17} aria-hidden="true" />
            </button>
            <button type="button" className={styles.trigger} onClick={() => setPanel("architecture")} data-track="flagship_open" data-track-label="Mimari">
              Mimari ve teknolojiler <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ProductTour steps={flagship.tour} />
      </article>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.dialog}>
          <header className={styles.dialogBar}>
            <span>{panel === "architecture" ? "Mimari ve teknolojiler" : flagship.eyebrow}</span>
            <Dialog.Close className={styles.close} aria-label="Pencereyi kapat"><X size={18} /></Dialog.Close>
          </header>
          <div className={styles.scroll}>
            {panel === "architecture" ? (
              <>
                <div className={styles.intro}>
                  <p className={styles.eyebrow}>{flagship.title}</p>
                  <Dialog.Title className={styles.dialogTitle}>{flagship.architectureTitle}</Dialog.Title>
                  <Dialog.Description className={styles.summary}>{flagship.architectureText}</Dialog.Description>
                </div>
                <div className={styles.architecture}>
                  <Architecture stack={flagship.techStack} />
                </div>
              </>
            ) : (
              <>
                <div className={styles.intro}>
                  <p className={styles.eyebrow}>Rolüm: {flagship.role}</p>
                  <Dialog.Title className={styles.dialogTitle}>{flagship.title}</Dialog.Title>
                  <Dialog.Description className={styles.summary}>{flagship.summary}</Dialog.Description>
                  <p className={styles.ownership}>{flagship.ownership}</p>
                  {flagship.metrics.length > 0 && (
                    <dl className={styles.metrics}>
                      {flagship.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
                    </dl>
                  )}
                  {flagship.pillars.length > 0 && <TagList items={flagship.pillars} label="Öne çıkanlar" />}
                </div>
                <nav className={styles.sectionNav} aria-label="Bölümler">
                  {flagship.sections.map((section, index) => <a key={section.label} href={"#" + anchor(index)}>{number(index)} {section.label}</a>)}
                </nav>
                {flagship.sections.map((section, index) => (
                  <section key={section.label} id={anchor(index)} className={styles.detailSection} aria-labelledby={anchor(index) + "-title"}>
                    <div className={styles.sectionHeading}>
                      <span className={styles.sectionNumber}>{number(index)}</span>
                      <div>
                        <p className={styles.sectionLabel}>{section.label}</p>
                        <h3 id={anchor(index) + "-title"}>{section.title}</h3>
                      </div>
                    </div>
                    <p className={styles.sectionDescription}>{section.description}</p>
                    {section.items.length > 0 && (
                      <div className={styles.items}>
                        {section.items.map(item => <div key={item.title} className={styles.item}><h4>{item.title}</h4><p>{item.description}</p></div>)}
                      </div>
                    )}
                  </section>
                ))}
              </>
            )}
            <footer className={styles.dialogFooter}>
              <Dialog.Close className={styles.footerClose}>Kapat <X size={14} /></Dialog.Close>
            </footer>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
