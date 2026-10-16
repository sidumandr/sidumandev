import { skillGroups } from "@/data/skills";
import { SectionHeader } from "../ui/SectionHeader";
import { SkillGroup } from "./SkillGroup";
import styles from "./about.module.css";
export default function About() {
  return <section className="section" id="about" aria-labelledby="about-title"><div className="container"><SectionHeader index={1} command="cd hakkimda" title="Kim olduğumu öğren" id="about-title"/><div className={styles.grid}><div className={styles.bio}><p>React ve Next.js ile kullanıcı arayüzleri; .NET ve Django ile API ve sunucu tarafı uygulamalar geliştiriyorum. Veri modelleme, önbellekleme ve arka plan işlerini uygulamanın gereksinimlerine göre birlikte ele alıyorum.</p><p>Çalışmalarımda okunabilir kod, sürdürülebilir mimari ve güvenilir veri akışına odaklanıyorum. Arayüzden veri erişimine, testten dağıtıma kadar geliştirme sürecini bir bütün olarak değerlendiriyor; teknik kararları kullanıcı ihtiyaçları, performans ve bakım kolaylığı doğrultusunda alıyorum.</p></div><div className={styles.skills}>{skillGroups.map(group=><SkillGroup key={group.title} group={group}/>)}</div></div></div></section>;
}
