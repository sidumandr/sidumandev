import type { Project } from "@/types/portfolio";
export const projects = [
  {
    title: "Sidufy",
    description:
      "Dinamik ses yönetimi ve akıcı kullanıcı deneyimini merkeze alan, kişiselleştirilebilir bir müzik çalar uygulaması. Şarkı listeleri, çalma kontrolleri ve görselleştirilmiş ses dalgaları ile müziği dijital dünyayla buluşturur.",
    tags: ["React", "TypeScript", "Zustand", "Django", "Shadcn UI"],
    github: "https://github.com/sidumandr/Music-Streaming-Service",
    live: "https://sidufy.vercel.app/",
    featured: true,
  },
  {
    title: "Cinapil",
    description:
      "'Cinephile' tutkusunu modern API mimarisiyle buluşturan dinamik bir film rehberi. Gerçek zamanlı veri senkronizasyonu ve performans odaklı arayüzü ile sinema dünyasını parmaklarınızın ucuna getirir.",
    tags: [
      "Next.js",
      "TypeScript",
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
    title: "SidusChat",
    description:
      "WebSockets protokolü üzerinden düşük gecikmeli (low-latency) çift yönlü iletişim sağlayan, modern bir anlık mesajlaşma uygulaması. Kullanıcıların odalar oluşturabildiği, anlık bildirimler alabildiği ve kesintisiz veri akışının sağlandığı ölçeklenebilir bir iletişim mimarisi sunar.",
    tags: [
      "Next.js",
      "TypeScript",
      "C#",
      ".NET",
      "SignalR",
      "PostgreSQL",
      "Shadcn UI",
    ],
    github: "https://github.com/sidumandr/realtime-chat-app",
    live: undefined,
    featured: false,
  },
  {
    title: "Mersin Arslan Nakliyat",
    description:
      "Bir nakliyat firması için kurumsal web sitesini uçtan uca geliştirdim. Responsive UI, custom navigation (mobile menu, dropdown, outside click handling) ve kullanıcı etkileşimlerini React ile implemente ettim. SEO ve performans optimizasyonları ile projeyi production kalitesine ulaştırdım. Projenin yayına alınması ve repository yönetimi ekip arkadaşım tarafından gerçekleştirildi.",
    tags: ["Next.js", "TypeScript", "Bootstrap"],
    github:
      "https://github.com/sevketemingurbuz/mersin-arslan-nakliyat-1/tree/main",
    live: "https://www.mersinarslannakliyat.com/",
    featured: false,
  },
] satisfies readonly Project[];
