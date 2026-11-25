import { ArrowUpRight, FileText, Mail } from "lucide-react";
import type { ContactContent, HeroContent } from "@/lib/content/schema";
import { CopyEmail } from "./CopyEmail";
import styles from "./contact.module.css";

export function cvLink(contact: ContactContent, name: string) {
  if (contact.cvUrl) return { href: contact.cvUrl, label: "CV'yi indir", external: true };
  const subject = encodeURIComponent("CV talebi (" + name + ")");
  const body = encodeURIComponent("Merhaba,\n\nCV'ni benimle paylaşabilir misin?\n\nAd Soyad:\nŞirket / Pozisyon:\n\nTeşekkürler.");
  return { href: `mailto:${contact.email}?subject=${subject}&body=${body}`, label: "CV talep et", external: false };
}

export default function Contact({ contact, hero }: { contact: ContactContent; hero: HeroContent }) {
  const cv = cvLink(contact, hero.name);
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.panel + " reveal"}>
          <div className={styles.glow} aria-hidden="true" />
          <h2 id="contact-title" className={styles.title}>{contact.title}</h2>
          <p className={styles.text}>{contact.text}</p>

          <div className={styles.emailRow}>
            <a className={styles.email} href={"mailto:" + contact.email} data-track="email_click" data-track-label="iletişim">
              <Mail size={20} aria-hidden="true" />{contact.email}
            </a>
            <CopyEmail email={contact.email} />
          </div>

          <ul className={styles.links}>
            <li><a href={contact.github} target="_blank" rel="noopener noreferrer" data-track="github" data-track-label="iletişim">GitHub <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (yeni sekmede açılır)</span></a></li>
            {contact.linkedin && <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer" data-track="linkedin" data-track-label="iletişim">LinkedIn <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (yeni sekmede açılır)</span></a></li>}
            <li>
              <a href={cv.href} target={cv.external ? "_blank" : undefined} rel={cv.external ? "noopener noreferrer" : undefined} data-track="cv" data-track-label={cv.label}>
                <FileText size={15} aria-hidden="true" />{cv.label}
              </a>
            </li>
          </ul>

          {hero.available && hero.availabilityText && <p className={styles.status}>{hero.availabilityText}</p>}
        </div>
      </div>
    </section>
  );
}
