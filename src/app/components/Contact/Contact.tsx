import { SectionHeader } from "../ui/SectionHeader";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import styles from "./contact.module.css";
export default function Contact() {
  return <section className="section" id="contact" aria-labelledby="contact-title"><div className="container"><SectionHeader index={4} command="cd iletisim" title="Birlikte çalışalım" subtitle="Yeni projeler, iş birlikleri veya sadece merhaba demek için ulaşabilirsin." id="contact-title"/><div className={styles.grid}><ContactInfo/><ContactForm/></div></div></section>;
}
