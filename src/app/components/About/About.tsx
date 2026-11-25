import type { AboutContent } from "@/lib/content/schema";
import { SectionHeader } from "../ui/SectionHeader";
import styles from "./about.module.css";

export default function About({ about }: { about: AboutContent }) {
  const paragraphs = about.body.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean);
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className={styles.layout + (about.principles.length === 0 ? " " + styles.single : "")}>
          <div>
            <SectionHeader title={about.title} id="about-title" />
            <div className={styles.bio + " reveal"}>
              {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </div>
          {about.principles.length > 0 && (
            <ul className={styles.principles} aria-label="Çalışma prensiplerim">
              {about.principles.map((principle, index) => (
                <li key={principle.title} className="reveal">
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {about.skills.length > 0 && (
          <div className={styles.skills + " reveal"}>
            {about.skills.map(group => (
              <div key={group.title} className={styles.group}>
                <h3>{group.title}</h3>
                <ul aria-label={group.title}>
                  {group.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
