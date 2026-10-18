"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ArrowRight, X, Workflow, ShieldCheck, BrainCircuit } from "lucide-react";
import { flagshipSections, flagshipStack } from "@/data/flagship";
import { TagList } from "../ui/TagList";
import styles from "./flagship.module.css";

const title = "Kurumsal İş Akışı ve Operasyon Platformu";
const summary = "100.000+ kayıt ve 150+ personel ölçeği için tasarladığım; karmaşık iş akışlarını, AI destekli karşılaştırmayı ve ekip operasyonlarını tek platformda birleştiren kurumsal yazılım.";

export function FlagshipProject() {
  return (
    <Dialog.Root>
      <article className={styles.feature}>
        <div className={styles.topline}><span className={styles.eyebrow}>01 / ANA PROJE</span><span className={styles.product}>Teknik liderlik · Uçtan uca geliştirme</span></div>
        <div className={styles.featureGrid}>
          <div>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.summary}>{summary}</p>
            <div className={styles.pillars}><span><Workflow size={15}/> Süreç otomasyonu</span><span><BrainCircuit size={15}/> AI entegrasyonu</span><span><ShieldCheck size={15}/> Denetlenebilir mimari</span></div>
            <Dialog.Trigger className={styles.trigger}>Projenin detaylarını keşfet <ArrowUpRight size={19}/></Dialog.Trigger>
          </div>
          <div className={styles.system} aria-label="Sistem akışı özeti">
            <div className={styles.systemHeader}><span aria-hidden="true">●</span> süreç motoru</div>
            <div className={styles.flow}><span>Veri & belgeler</span><ArrowRight size={16}/><span>İş kuralları</span></div>
            <div className={styles.flow}><span>AI / karşılaştırma</span><ArrowRight size={16}/><span>Kontrol & onay</span></div>
            <div className={styles.flow}><span>İş havuzu</span><ArrowRight size={16}/><span>Kontrollü işlem</span></div>
            <p className={styles.systemFooter}>İzlenebilir süreçler. Ölçülebilir iş kuralları.</p>
          </div>
        </div>
        <div className={styles.metrics}><div><strong>100.000+</strong><span>kayıt için tasarlanan ölçek</span></div><div><strong>150+</strong><span>personel için tasarlanan yapı</span></div><div><strong>10.000+</strong><span>otomatik test</span></div></div>
      </article>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}/>
        <Dialog.Content className={styles.dialog}>
          <header className={styles.dialogBar}><span>~/projeler/operasyon-platformu</span><Dialog.Close className={styles.close} aria-label="Proje detaylarını kapat"><X size={20}/></Dialog.Close></header>
          <div className={styles.scroll}>
            <div className={styles.intro}>
              <p className={styles.eyebrow}>ANA PROJE / TEKNİK İNCELEME</p>
              <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
              <Dialog.Description className={styles.summary}>{summary}</Dialog.Description>
              <p className={styles.ownership}>Projenin teknik tasarımını ve uçtan uca geliştirmesini üstleniyorum. Operasyonel ihtiyaçları analiz ederek iş kurallarını yazılım modellerine dönüştürüyor; backend, kullanıcı arayüzü, veri katmanı ve canlı ortam altyapısını geliştiriyorum.</p>
              <TagList items={flagshipStack} variant="soft"/>
            </div>
            <nav className={styles.sectionNav} aria-label="Proje detay başlıkları">{flagshipSections.map(section => <a key={section.id} href={"#flagship-"+section.id}>{section.number} {section.label}</a>)}</nav>
            <div className={styles.sections}>
              {flagshipSections.map(section => <section key={section.id} id={"flagship-"+section.id} className={styles.detailSection} aria-labelledby={"flagship-title-"+section.id}>
                <div className={styles.sectionHeading}><span className={styles.number}>{section.number}</span><div><p className={styles.label}>{section.label}</p><h3 id={"flagship-title-"+section.id}>{section.title}</h3></div></div>
                <p className={styles.sectionDescription}>{section.description}</p>
                <div className={styles.items}>{section.items.map(item => <div key={item.title} className={styles.item}><h4>{item.title}</h4><p>{item.description}</p></div>)}</div>
              </section>)}
            </div>
            <footer className={styles.dialogFooter}><span>Analiz → Mimari → Geliştirme → Canlı ortam</span><Dialog.Close className={styles.footerClose}>İncelemeyi kapat <X size={14}/></Dialog.Close></footer>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
