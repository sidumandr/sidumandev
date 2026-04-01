"use client";

import { Briefcase, ExternalLink, Github, Tag } from "lucide-react";
import styles from "./projects.module.css";

const projects = [
  {
    title: "Book Tracker App",
    description:
      "Okuma yolculuğunuzu düzenleyen ve dijital kütüphanenizi oluşturmanıza olanak tanıyan bir takip platformu. Basit, hızlı ve kullanıcı deneyimi odaklı bir arayüzle kitap yönetimini kolaylaştırır.",
    tags: [
      "Next.js",
      "TypeScript",
      "C#",
      ".NET",
      "PostgreSQL",
      "Docker",
      "Shadcn UI",
    ],
    github: "https://github.com/sidumandr/book-tracker",
    live: "https://sidbooktracker.vercel.app",
    featured: true,
  },
  {
    title: "Cinapil",
    description:
      "'Cinephile' tutkusunu modern API mimarisiyle buluşturan dinamik bir film rehberi. Gerçek zamanlı veri senkronizasyonu ve performans odaklı arayüzü ile sinema dünyasını parmaklarınızın ucuna getirir.",
    tags: [
      "Next.js",
      "Typescript",
      "C#",
      ".NET",
      "PostgreSQL",
      "Docker",
      "Daisy UI",
    ],
    github: "https://github.com/sidumandr/react-film-app",
    live: "https://cinapil.vercel.app/",
    featured: true,
  },
  {
    title: "Sidufy",
    description:
      "Dinamik ses yönetimi ve akıcı kullanıcı deneyimini merkeze alan, kişiselleştirilebilir bir müzik çalar uygulaması. Şarkı listeleri, çalma kontrolleri ve görselleştirilmiş ses dalgaları ile müziği dijital dünyayla buluşturur.",
    tags: ["React", "Typescript", "Zustand", "Django", "Shadcn UI"],
    github: "https://github.com/sidumandr/Music-Streaming-Service",
    live: "https://sidufy.vercel.app/",
    featured: false,
  },
  {
    title: "SidusChat",
    description:
      "WebSockets protokolü üzerinden düşük gecikmeli (low-latency) çift yönlü iletişim sağlayan, modern bir anlık mesajlaşma uygulaması. Kullanıcıların odalar oluşturabildiği, anlık bildirimler alabildiği ve kesintisiz veri akışının sağlandığı ölçeklenebilir bir iletişim mimarisi sunar.",
    tags: [
      "Next.js",
      "Typescript",
      "C#",
      ".NET",
      "SignalR",
      "PostgreSQL",
      "Shadcn UI",
    ],
    github: "https://github.com/sidumandr/realtime-chat-app",
    live: "#",
    featured: false,
  },
  {
    title: "Mersin Arslan Nakliyat",
    description:
      "Bir nakliyat firması için kurumsal web sitesini uçtan uca geliştirdim. Responsive UI, custom navigation (mobile menu, dropdown, outside click handling) ve kullanıcı etkileşimlerini React ile implemente ettim. SEO ve performans optimizasyonları ile projeyi production kalitesine ulaştırdım. Projenin yayına alınması ve repository yönetimi ekip arkadaşım tarafından gerçekleştirildi.",
    tags: ["Next.js", "Typescript", "Bootstrap"],
    github:
      "https://github.com/sevketemingurbuz/mersin-arslan-nakliyat-1/tree/main",
    live: "https://www.mersinarslannakliyat.com/",
    featured: false,
  },
];

const Projects = () => {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>
            <Briefcase size={13} />
            Projeler
          </span>
          <h2 className={styles.title}>Geliştirdiğim işler</h2>
          <p className={styles.subtitle}>
            Gerçek problemlere odaklanan, üretim kalitesinde projeler.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <div
              className={`${styles.card} ${project.featured ? styles.featured : ""}`}
              key={i}
            >
              {project.featured && (
                <span className={styles.featuredBadge}>Featured</span>
              )}

              <div className={styles.cardTop}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.tags}>
                  {project.tags.map((t) => (
                    <span className={styles.techTag} key={t}>
                      <Tag size={10} />
                      {t}
                    </span>
                  ))}
                </div>

                <div className={styles.links}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconLink}
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
