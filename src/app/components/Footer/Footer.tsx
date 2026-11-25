import type { ContactContent } from "@/lib/content/schema";
import styles from "./footer.module.css";

export default function Footer({ name, contact }: { name: string; contact: ContactContent }) {
  return (
    <footer className={styles.footer}>
      <div className={"container " + styles.container}>
        <p>© {new Date().getFullYear()} {name}</p>
        <ul className={styles.links}>
          <li><a href={contact.github} target="_blank" rel="noopener noreferrer" data-track="github" data-track-label="alt bilgi">GitHub</a></li>
          {contact.linkedin && <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer" data-track="linkedin" data-track-label="alt bilgi">LinkedIn</a></li>}
          <li><a href="#hero">Başa dön ↑</a></li>
        </ul>
      </div>
      <p className={"container " + styles.privacy}>Bu site çerez kullanmıyor. Ziyaretleri anonim olarak sayıyorum, IP adresi saklamıyorum.</p>
    </footer>
  );
}
