import type { CSSProperties } from "react";
import type { TechItem } from "@/lib/content/schema";
import styles from "./architecture.module.css";

const modules = ["Dosyalar", "Adres araştırma", "Tebligat", "Toplu işlemler", "Raporlar", "Yetki ve denetim"];
const runtime = ["Docker", "systemd", "CI/CD"];

/** Bir istek turu: arayüzden API'ye, oradan veri katmanına ve kuyruğa, son olarak dış sistemlere. */
const delay = (seconds: number) => ({ "--delay": seconds + "s" }) as CSSProperties;

function Node({ label, title, text, wait, className }: { label: string; title: string; text?: string; wait: number; className?: string }) {
  return (
    <div className={styles.node + (className ? " " + className : "")} style={delay(wait)}>
      <span className={styles.nodeLabel}>{label}</span>
      <strong>{title}</strong>
      {text && <span className={styles.nodeText}>{text}</span>}
    </div>
  );
}

const Wire = ({ wait, className }: { wait: number; className?: string }) => (
  <span className={styles.wire + (className ? " " + className : "")} style={delay(wait)} aria-hidden="true" />
);

/**
 * Ana projenin mimarisi ve kullanılan teknolojiler. Şemada bir istek katmanlar arasında akar:
 * önce arayüzden API'ye, sonra veri katmanına ve kuyruğa, en son dış sistemlere.
 */
export function Architecture({ title, text, stack }: { title: string; text: string; stack: TechItem[] }) {
  return (
    <section className={styles.section} aria-labelledby="flagship-architecture">
      <div className={styles.intro}>
        <p className={styles.kicker}>Mimari ve teknolojiler</p>
        <h4 id="flagship-architecture">{title}</h4>
        <p>{text}</p>
      </div>

      <div className={styles.body}>
        <figure className={styles.diagram} aria-label="Sistem mimarisi. Next.js arayüzü NestJS API'ye bağlanır. API, PostgreSQL, Redis ve BullMQ işçileriyle çalışır. İşçiler dış sistemlere istek gönderir. Servisler Docker ile paketlenir, systemd ile çalışır ve CI/CD hattından yayına çıkar.">
          <div className={styles.runtime}>
            <ul className={styles.runtimeTags} aria-hidden="true">
              {runtime.map(item => <li key={item}>{item}</li>)}
            </ul>
            <Node label="Arayüz" title="Next.js" text="Operasyon paneli, TypeScript" wait={0} className={styles.full} />
            <Wire wait={0} className={styles.center} />
            <div className={styles.node + " " + styles.full + " " + styles.api} style={delay(0.96)}>
              <span className={styles.nodeLabel}>API</span>
              <strong>NestJS, modüler monolit</strong>
              <ul className={styles.modules} aria-hidden="true">
                {modules.map((name, index) => <li key={name} style={delay(0.96 + index * 4.8)}>{name}</li>)}
              </ul>
            </div>
            <Wire wait={1.2} />
            <Wire wait={1.2} />
            <Wire wait={1.2} />
            <Node label="Veri" title="PostgreSQL" text="Prisma ile şema ve migration" wait={2.16} />
            <Node label="Önbellek" title="Redis" text="Önbellek ve işlem kilitleri" wait={2.16} />
            <Node label="Kuyruk" title="BullMQ işçileri" text="Zamanlanmış ve yeniden denenen işler" wait={2.16} />
          </div>
          <div className={styles.outside}>
            <p className={styles.runtimeNote}>Servisler Docker imajı olarak paketlenir, sunucuda systemd ile ayakta tutulur ve her birleştirmede CI/CD hattından geçer.</p>
            <div className={styles.externalColumn}>
              <Wire wait={2.4} className={styles.exitWire} />
              <Node label="Dış sistemler" title="Entegrasyonlar" text="Sorgu ve gönderim servisleri" wait={3.36} className={styles.external} />
            </div>
          </div>
        </figure>

        {stack.length > 0 && (
          <dl className={styles.stack}>
            {stack.map(item => (
              <div key={item.name}>
                <dt>{item.name}</dt>
                <dd>{item.role}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
