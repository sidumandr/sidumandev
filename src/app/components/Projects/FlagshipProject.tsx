"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, BrainCircuit, ShieldCheck, Workflow, X } from "lucide-react";
import type { FlagshipContent } from "@/lib/content/schema";
import { ProductTour } from "../Showcase/ProductTour";
import { Architecture } from "./Architecture";
import { TagList } from "../ui/TagList";
import styles from "./flagship.module.css";

const pillarIcons = [Workflow, BrainCircuit, ShieldCheck];
const number = (index: number) => String(index + 1).padStart(2, "0");
const anchor = (index: number) => "flagship-section-" + number(index);

export function FlagshipProject({ flagship }: { flagship: FlagshipContent }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <article className={styles.feature + " reveal"}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.head}>
          <div className={styles.headText}>
            <p className={styles.eyebrow}>{flagship.eyebrow}</p>
            <h3 className={styles.title}>{flagship.title}</h3>
            <p className={styles.summary}>{flagship.summary}</p>
          </div>
          <div className={styles.headSide}>
          <p className={styles.role}><span>Rolüm:</span> {flagship.role}</p>
          {flagship.pillars.length > 0 && (
            <ul className={styles.pillars}>
              {flagship.pillars.map((pillar, index) => {
                const Icon = pillarIcons[index % pillarIcons.length];
                return <li key={pillar}><Icon size={15} aria-hidden="true" />{pillar}</li>;
              })}
            </ul>
          )}
          <button type="button" className={styles.trigger} onClick={() => setOpen(true)} data-track="flagship_open" data-track-label="Detaylar">
            Detaylara bak <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          </div>
        </div>

        <ProductTour steps={flagship.tour} />

        <Architecture title={flagship.architectureTitle} text={flagship.architectureText} stack={flagship.techStack} />
      </article>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.dialog}>
          <header className={styles.dialogBar}>
            <span>{flagship.eyebrow}</span>
            <Dialog.Close className={styles.close} aria-label="Detayları kapat"><X size={18} /></Dialog.Close>
          </header>
          <div className={styles.scroll}>
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
              <TagList items={flagship.techStack.map(item => item.name)} />
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
            <footer className={styles.dialogFooter}>
              <Dialog.Close className={styles.footerClose}>Kapat <X size={14} /></Dialog.Close>
            </footer>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
