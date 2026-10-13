import { skillGroups } from "@/data/skills";
import { SectionHeader } from "../ui/SectionHeader";
import { SkillGroup } from "./SkillGroup";
import styles from "./about.module.css";
export default function About() {
  return <section className="section" id="about" aria-labelledby="about-title"><div className="container"><SectionHeader index={1} command="cd hakkimda" title="Kim olduğumu öğren" id="about-title"/><div className={styles.grid}><div className={styles.bio}><p>Merhaba! Ben Safa İlhan Duman, modern web teknolojileriyle uçtan uca çözümler geliştiren bir Full-Stack geliştiricisiyim. Özellikle React, Next.js ve backend tarafında ölçeklenebilir sistemler kurmaya odaklanıyorum.</p><p>Kullanıcı deneyimini merkeze alırken, performanslı ve sürdürülebilir mimariler tasarlamayı önceliklendiriyorum. API geliştirme, veritabanı tasarımı ve deployment süreçleri dahil olmak üzere yazılım geliştirme yaşam döngüsünün tüm aşamalarında aktif rol alıyorum.</p></div><div className={styles.skills}>{skillGroups.map(group=><SkillGroup key={group.title} group={group}/>)}</div></div></div></section>;
}
