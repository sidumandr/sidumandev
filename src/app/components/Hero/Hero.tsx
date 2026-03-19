"use client";

import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero} id="hero">
      {/* Background grid */}
      <div className={styles.grid} aria-hidden="true" />
      {/* Glow orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.badge}>
          <span>Full-Stack Developer</span>
        </div>

        <h1 className={styles.heading}>
          <span className={styles.line}>Merhaba, ben</span>
          <span className={styles.name}>Safa İlhan Duman</span>
          <span className={styles.line2}>
            Kod yazıyorum, <em>deneyim</em> inşa ediyorum.
          </span>
        </h1>

        <p className={styles.sub}>
          Frontend&apos;den backend&apos;e uzanan bir yelpazede modern, hızlı ve
          kullanıcı odaklı uygulamalar geliştiriyorum.
        </p>

        <div className={styles.cta}>
          <a href="#projects" className={styles.btnPrimary}>
            Projeleri Gör
            <ArrowDown size={16} />
          </a>
          <a href="#contact" className={styles.btnSecondary}>
            İletişime Geç
          </a>
        </div>

        <div className={styles.socials}>
          <a
            href="https://github.com/sidumandr"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/safa-ilhan-duman-5796b6256/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:dumansafailhan@gmail.com"
            className={styles.socialLink}
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </div>
    </section>
  );
};

export default Hero;
