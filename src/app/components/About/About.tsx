"use client";

import { User, Layers, Zap, Globe, CheckCircle2 } from "lucide-react";
import styles from "./about.module.css";

const skillGroups = [
  {
    title: "Programlama Dilleri",
    skills: ["JavaScript", "TypeScript", "Python", "C#", "SQL"],
  },
  {
    title: "Framework & Kütüphaneler",
    skills: ["React", "Next.js", "Django", ".NET"],
  },
  {
    title: "Veritabanları",
    skills: ["PostgreSQL", "SQL Server"],
  },
  {
    title: "UI & Stylıng",
    skills: ["Tailwind CSS", "Shadcn UI"],
  },
  {
    title: "Araçlar & DevOps",
    skills: ["Docker", "CI/CD", "Git"],
  },
];

const About = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>
            <User size={13} /> Hakkımda
          </span>
          <h2 className={styles.title}>Kim olduğumu öğren</h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            <p className={styles.bio}>
              Merhaba! Ben Safa İlhan Duman, modern web teknolojileriyle uçtan
              uca çözümler geliştiren bir Full-Stack geliştiricisiyim. Özellikle
              React, Next.js ve backend tarafında ölçeklenebilir sistemler
              kurmaya odaklanıyorum.
            </p>
            <p className={styles.bio}>
              Kullanıcı deneyimini merkeze alırken, performanslı ve
              sürdürülebilir mimariler tasarlamayı önceliklendiriyorum. API
              geliştirme, veritabanı tasarımı ve deployment süreçleri dahil
              olmak üzere yazılım geliştirme yaşam döngüsünün tüm aşamalarında
              aktif rol alıyorum.
            </p>
          </div>
          <div className={styles.right}>
            {skillGroups.map((group, idx) => (
              <div key={idx} className={styles.skillGroup}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <div className={styles.tagCloud}>
                  {group.skills.map((skill, i) => (
                    <span key={i} className={styles.skillBadge}>
                      <CheckCircle2 size={14} className={styles.checkIcon} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
