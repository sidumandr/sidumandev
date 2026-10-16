import type { Project } from "@/types/portfolio";
export const projects = [
  {
    title: "Sidufy",
    description:
      "Şarkı listeleri, çalma kontrolleri ve ses dalgası görselleştirmeleri sunan bir müzik uygulaması. React ve TypeScript ile arayüz, Zustand ile istemci durumu ve Django ile backend katmanını bir araya getiriyor.",
    tags: ["React", "TypeScript", "Zustand", "Django", "Shadcn UI"],
    github: "https://github.com/sidumandr/Music-Streaming-Service",
    live: "https://sidufy.vercel.app/",
    featured: true,
  },
  {
    title: "Cinapil",
    description:
      "Film keşfini kolaylaştıran bir rehber uygulaması. Next.js ve TypeScript arayüzünü .NET API ve PostgreSQL veri katmanıyla birleştiriyor; Docker ile uygulamanın çalıştırma ortamını tanımlıyor.",
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
      "Kişisel kitaplığını ve okuma sürecini takip etmek için geliştirilmiş bir uygulama. Next.js arayüzü, .NET backend ve PostgreSQL veritabanı ile kitap yönetimini uçtan uca ele alıyor.",
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
      "Oda oluşturma ve anlık bildirim özellikleri sunan bir mesajlaşma uygulaması. Next.js arayüzü ile .NET backend arasında SignalR ve WebSocket üzerinden çift yönlü iletişim kuruyor; verileri PostgreSQL üzerinde tutuyor.",
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
      "Bir nakliyat firması için Next.js ve TypeScript ile kurumsal web sitesi geliştirdim. Farklı ekranlara uyumlu arayüzü, mobil menüyü, açılır menüleri ve dışarı tıklama etkileşimlerini uyguladım; SEO ve performans iyileştirmeleri yaptım. Yayına alma ve depo yönetimini ekip arkadaşım üstlendi.",
    tags: ["Next.js", "TypeScript", "Bootstrap"],
    github:
      "https://github.com/sevketemingurbuz/mersin-arslan-nakliyat-1/tree/main",
    live: "https://www.mersinarslannakliyat.com/",
    featured: false,
  },
] satisfies readonly Project[];
