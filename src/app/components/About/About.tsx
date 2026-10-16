import { skillGroups } from "@/data/skills";
import { SectionHeader } from "../ui/SectionHeader";
import { SkillGroup } from "./SkillGroup";
import styles from "./about.module.css";
export default function About() {
  return <section className="section" id="about" aria-labelledby="about-title"><div className="container">
    <SectionHeader index={1} command="cd hakkimda" title="Kim olduğumu öğren" id="about-title" />
    <div className={styles.grid}>
      <div className={styles.bio}>
        <p>Web, masaüstü ve mobil platformlarda uçtan uca uygulamalar geliştiriyorum. React ve Next.js ile kullanıcı arayüzleri, Electron ile masaüstü uygulamaları, Expo ile mobil deneyimler oluşturuyorum. Backend tarafında güncel odağım NestJS; Node.js, .NET ve Django ile API, iş mantığı ve veri katmanlarında çalışıyorum.</p>
        <p>Veritabanı tasarımı, Redis ile önbellekleme, BullMQ ile kuyruk ve görev işleme, Caddy ile yayınlama ve sunucu yapılandırması süreçlerinde çalışıyorum. LangChain ve RAG kullanarak uygulamaların kendi bilgi kaynakları üzerinden yanıt üretebildiği yapay zekâ özellikleri geliştiriyorum.</p>
        <p>Claude Code, Codex ve Qwen gibi araçları geliştirme, hata ayıklama ve kod inceleme süreçlerimde aktif olarak kullanıyorum. Teknik kararlarımda kullanıcı ihtiyaçlarını, performansı, güvenliği ve bakım kolaylığını birlikte değerlendiriyor; güvenilir sistemler için test ve kod incelemeye önem veriyorum.</p>
      </div>
      <div className={styles.skills}>{skillGroups.map(group => <SkillGroup key={group.title} group={group} />)}</div>
    </div>
  </div></section>;
}
