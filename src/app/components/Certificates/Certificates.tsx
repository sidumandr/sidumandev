import Image from "next/image";
import { certificates } from "@/data/certificates";
import { SectionHeader } from "../ui/SectionHeader";
import { TextLink } from "../ui/TextLink";
import styles from "./certificates.module.css";
export default function Certificates() {
  return <section className="section" id="certificates" aria-labelledby="certificates-title"><div className="container"><SectionHeader index={3} command="cd sertifikalar" title="Sertifikalarım" subtitle="Kendimi sürekli geliştirmek için tamamladığım kurslar ve programlar." id="certificates-title"/><table className={styles.table}><caption className="sr-only">Tamamladığım kurs ve programlar, en yeniden en eskiye</caption><thead><tr><th scope="col">Tarih</th><th scope="col">Sertifika</th><th scope="col">Bağlantı</th></tr></thead><tbody>{certificates.map(cert=><tr key={cert.credentialUrl}><td className={styles.date}><time dateTime={cert.date}>{cert.date}</time></td><th scope="row"><span className={styles.certTitle}>{cert.title}</span><span className={styles.issuer}>{cert.issuer}</span></th><td className={styles.link}><span className={styles.watermark} aria-hidden="true"><Image src={cert.logo.src} width={cert.logo.width} height={cert.logo.height} alt="" unoptimized className={styles.logo+("square" in cert.logo&&cert.logo.square?" "+styles.squareLogo:"")}/></span><TextLink href={cert.credentialUrl} external accent>görüntüle</TextLink></td></tr>)}</tbody></table><p className={styles.total}>toplam {certificates.length} sertifika</p></div></section>;
}
