import { identity } from "@/data/identity";
import { StatusDot } from "../ui/StatusDot";
import { TextLink } from "../ui/TextLink";
import { Window } from "../ui/Window";
import styles from "./contact.module.css";
export function ContactInfo() {
  return <Window title="iletisim.txt" className={styles.infoPanel}><dl className={styles.details}><div><dt>e-posta</dt><dd><TextLink href={"mailto:"+identity.email} accent>{identity.email}</TextLink></dd></div><div><dt>konum</dt><dd>{identity.location}</dd></div><div><dt>durum</dt><dd><StatusDot text={identity.available}/></dd></div></dl><div className={styles.socials}><TextLink href={identity.github} bracket external>github</TextLink><TextLink href={identity.linkedin} bracket external>linkedin</TextLink></div></Window>;
}
