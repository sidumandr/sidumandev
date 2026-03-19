"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  MapPin,
  CheckCircle,
} from "lucide-react";
import styles from "./contact.module.css";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleReset = (): void => {
    setForm({ name: "", email: "", message: "" });
    setSent(false);
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>
            <Mail size={13} />
            İletişim
          </span>
          <h2 className={styles.title}>Birlikte çalışalım</h2>
          <p className={styles.subtitle}>
            Yeni projeler, iş birlikleri veya sadece merhaba demek için
            ulaşabilirsin.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left — info */}
          <div className={styles.left}>
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <Mail size={18} />
                </div>
                <div>
                  <p className={styles.infoLabel}>E-posta</p>
                  <a
                    href="mailto:dumansafailhan@gmail.com"
                    className={styles.infoValue}
                  >
                    dumansafailhan@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <MapPin size={18} />
                </div>
                <div>
                  <p className={styles.infoLabel}>Konum</p>
                  <p className={styles.infoValue}>Türkiye</p>
                </div>
              </div>

              <div className={styles.divider} />

              <p className={styles.availText}>
                🟢 Şu an yeni projeler için müsaitim.
              </p>

              <div className={styles.socials}>
                <a
                  href="https://github.com/sidumandr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/safa-ilhan-duman-5796b6256/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className={styles.right}>
            {sent ? (
              <div className={styles.successState}>
                <CheckCircle size={48} strokeWidth={1.5} />
                <h3>Mesajın alındı!</h3>
                <p>En kısa sürede geri döneceğim.</p>
                <button className={styles.resetBtn} onClick={handleReset}>
                  Yeni mesaj gönder
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Ad Soyad</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Adın Soyadın"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>E-posta</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="ornek@mail.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Mesajın</label>
                  <textarea
                    name="message"
                    placeholder="Projen, fikrin ya da merhaba..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={styles.textarea}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Send size={16} />
                  Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
