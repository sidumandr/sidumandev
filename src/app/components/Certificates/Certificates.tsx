"use client";

import { Award, ExternalLink, Calendar } from "lucide-react";
import styles from "./certificates.module.css";

const certificates = [
  {
    title: "React Basics",
    issuer: "Meta - Coursera",
    date: "Mart 2024",
    credentialUrl: "https://coursera.org/verify/5JXILKJ21THS",
    color: "#0668E1",
  },
  {
    title: "CS50W: CS50's Web Programming with Python and JavaScript",
    issuer: "Harvard University - edx",
    date: "Şubat 2026",
    credentialUrl:
      "https://courses.edx.org/certificates/df59c255fe164665abc6584375322d8b",
    color: "#A01E27",
  },
  {
    title: "Foundational C# with Microsoft",
    issuer: "Microsoft - freeCodeCamp",
    date: "Aralık 2025",
    credentialUrl:
      "https://www.freecodecamp.org/certification/sidumandr/foundational-c-sharp-with-microsoft",
  },
  {
    title: "Intermediate Frontend Web Development Path",
    issuer: "Patika.dev",
    date: "Eylül 2024",
    credentialUrl: "https://academy.patika.dev/certificates/fc50f94e",
    color: "#FF9900",
  },
];

const Certificates = () => {
  return (
    <section className={styles.section} id="certificates">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>
            <Award size={13} />
            Sertifikalar
          </span>
          <h2 className={styles.title}>Sertifikalarım</h2>
          <p className={styles.subtitle}>
            Kendimi sürekli geliştirmek için tamamladığım kurslar ve programlar.
          </p>
        </div>

        <div className={styles.grid}>
          {certificates.map((cert, i) => (
            <div className={styles.card} key={i}>
              <div
                className={styles.accent}
                style={{ "--c": cert.color } as React.CSSProperties}
              />
              <div className={styles.cardContent}>
                <div
                  className={styles.icon}
                  style={{ "--c": cert.color } as React.CSSProperties}
                >
                  <Award size={20} />
                </div>
                <div className={styles.info}>
                  <h3 className={styles.certTitle}>{cert.title}</h3>
                  <p className={styles.issuer}>{cert.issuer}</p>
                  <div className={styles.meta}>
                    <span className={styles.date}>
                      <Calendar size={12} />
                      {cert.date}
                    </span>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.credentialLink}
                    >
                      Görüntüle
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
