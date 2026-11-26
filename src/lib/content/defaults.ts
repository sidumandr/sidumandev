import type { ProjectView, SiteContent } from "./schema";

/**
 * Veritabanı boşken ya da tanımlı değilken kullanılan içerik.
 * Admin panelinden bir bölüm kaydedildiğinde o bölüm veritabanındaki haliyle değişir.
 */
export const defaultContent: SiteContent = {
  hero: {
    name: "Safa İlhan Duman",
    role: "Full-stack geliştirici",
    headline: "İş kuralı karmaşık, hata kaldırmayan yazılımlar geliştiriyorum.",
    subheadline:
      "Şu sıralar 150'den fazla personel için tasarladığım bir lojistik operasyon ve sevkiyat platformunu geliştiriyorum. Bunun dışında web, masaüstü ve mobil uygulamalar yapıyorum. En çok NestJS ve Next.js ile çalışıyorum.",
    available: true,
    availabilityText: "Şu an yeni projelere açığım.",
    stack: [
      "TypeScript", "NestJS", "Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Redis", "BullMQ",
      "Docker", "Electron", "Expo", "React Native", ".NET", "Django", "LangChain", "RAG", "CI/CD",
    ],
  },
  about: {
    title: "Hakkımda",
    body:
      "Web, masaüstü ve mobil uygulamalar geliştiriyorum. Bir uygulamanın arayüzünden veritabanına ve sunucusuna kadar her katmanında çalışıyorum. Backend'de NestJS, arayüzde Next.js kullanıyorum. Masaüstü için Electron, mobil için Expo ile çalışıyorum.\n\n" +
      "Veritabanı tasarımı, Redis ile önbellekleme, BullMQ ile kuyruklar ve sunucu kurulumu da işimin parçası. LangChain ve RAG ile uygulamaların kendi verileri üzerinden soru cevaplayabilmesini sağlıyorum. Günlük işimde Claude Code ve Codex'i sık kullanıyorum. Önemli değişiklikleri testler ve kod incelemesiyle kontrol ediyorum.",
    skills: [
      { title: "Arayüz", items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui"] },
      { title: "Backend", items: ["NestJS", "Node.js", "ASP.NET Core", "Django", "Python", "C#"] },
      { title: "Veri ve altyapı", items: ["PostgreSQL", "SQL Server", "MongoDB", "Prisma", "Redis", "BullMQ", "Docker", "Caddy", "CI/CD"] },
      { title: "Mobil, masaüstü ve AI", items: ["React Native", "Expo", "Electron", "LangChain", "RAG", "Claude Code", "Codex"] },
    ],
    principles: [],
  },
  contact: {
    title: "Bir fikrin ya da projen varsa yaz.",
    text: "En hızlı ulaşma yolu e-posta. Ne yapmak istediğini birkaç cümleyle anlatman yeterli.",
    email: "dumansafailhan@gmail.com",
    github: "https://github.com/sidumandr",
    linkedin: "https://www.linkedin.com/in/safa-ilhan-duman-5796b6256/",
    location: "Türkiye",
    cvUrl: "",
  },
  seo: {
    title: "Safa İlhan Duman | Full-Stack Developer",
    description:
      "Full-stack geliştirici Safa İlhan Duman'ın projeleri. NestJS ve Next.js ile web, Electron ile masaüstü, Expo ile mobil uygulamalar ve yapay zekâ entegrasyonları.",
  },
  appearance: {
    heroBackground: "horizon",
    accent: "yellow",
  },
  flagship: {
    eyebrow: "Ana proje",
    title: "Lojistik operasyon ve sevkiyat platformu",
    summary:
      "Gönderilerin depodan teslimata kadar bütün sürecini tek yerden yöneten, benzer adres kayıtlarını yapay zekâyla karşılaştırıp son kararı personele bırakan bir platform. 100.000'den fazla gönderi ve 150'yi aşkın personel için tasarlandı.",
    tagline: "Depodan teslimata kadar sevkiyat süreçlerini tek yerden yöneten bir platform. Teknik tasarımı ve geliştirmesi baştan sona bende.",
    role: "Teknik tasarım ve geliştirmenin tamamı",
    ownership:
      "Projenin teknik tasarımını ve uçtan uca geliştirmesini üstleniyorum. Operasyonel ihtiyaçları analiz ederek iş kurallarını yazılım modellerine dönüştürüyor; backend, kullanıcı arayüzü, veri katmanı ve canlı ortam altyapısını geliştiriyorum.",
    pillars: ["Sevkiyat takibi", "Yapay zekâ ile adres karşılaştırma", "Geriye dönük izlenebilirlik"],
    metrics: [
      { value: "100.000+", label: "gönderi için tasarlandı" },
      { value: "150+", label: "personel için tasarlandı" },
      { value: "10.000+", label: "otomatik test" },
    ],
    architectureTitle: "Arayüzden arka plan işlerine kadar TypeScript",
    architectureText:
      "Arayüz Next.js, API NestJS ile yazıldı. İş kuralları API içinde modüllere ayrılmış tek bir kod tabanında duruyor. Uzun süren ya da dış sistemlere giden işler Redis üzerindeki BullMQ kuyruklarında çalışıyor, kalıcı veri PostgreSQL'de tutuluyor.",
    techStack: [
      { name: "Next.js", role: "Operasyon paneli ve raporlama ekranları" },
      { name: "TypeScript", role: "Arayüzden API'ye kadar tek dil" },
      { name: "NestJS", role: "Modüler monolit API ve iş kuralları" },
      { name: "PostgreSQL", role: "Gönderiler, süreç geçmişi ve kayıtlar" },
      { name: "Prisma", role: "Şema, migration ve tip güvenli sorgular" },
      { name: "Redis", role: "Önbellek ve işlem kilitleri" },
      { name: "BullMQ", role: "Zamanlanmış, yeniden denenen arka plan işleri" },
      { name: "Docker", role: "Servislerin paketlenmesi ve çalıştırılması" },
    ],
    tour: [
      {
        screen: "pools",
        title: "Her gönderi kendi havuzunda",
        text: "Gönderiler dağıtım, iade, teslim ya da faturalama durumuna göre kendiliğinden doğru havuza düşüyor. Personel neye bakacağını aramıyor, kendi listesini açıyor.",
        points: ["Durum değişince gönderi kendiliğinden doğru havuza geçer", "Satırlar arasında klavyeyle gezinme, Enter ile açma", "Teslimat ve fatura gelişmeleri satıra kendiliğinden işlenir"],
      },
      {
        screen: "address",
        title: "Adres bulunana kadar sırayla deneme",
        text: "Gönderi teslim edilemeyince sistem doğru adresi bir merdiven gibi sırayla farklı kaynaklarda arıyor. Her basamağın sonucu ve zamanı kaydediliyor, sıradaki adım ekranda görünüyor.",
        points: ["Kaynaklar belirli bir sırayla, tekrar etmeden denenir", "Her sorgunun sonucu ve saati gönderide saklanır", "İade istenen gönderide araştırma kendiliğinden durur"],
      },
      {
        screen: "operations",
        title: "Toplu gönderim, kontrollü ve maliyeti belli",
        text: "Gönderilecek işlemler gönderilebilir, bekletilen ve engellenen olarak ayrışıyor. Otomatik gönderim belirlenen saat aralığında çalışıyor ve her işlemin tutarı göndermeden önce görünüyor.",
        points: ["İşlemler gönderilebilir, bekletilen ve engellenen olarak ayrışır", "Otomatik gönderim belirlenen saat aralığında, sırayla", "Aynı gönderiye ikinci atama kilitlenir, harcama bütçeyle sınırlı"],
      },
      {
        screen: "monitoring",
        title: "Dış sistemlerle her konuşma kayıt altında",
        text: "Entegrasyonlara giden her istek sonucu ve süresiyle canlı olarak izleniyor. Her projenin bütün gönderilerinin kaç günde bir baştan sona tarandığı da ölçülüyor.",
        points: ["Her isteğin sonucu ve süresi canlı akışta", "Proje bazında tam tur süresi", "Harcama, Redis ve servis sağlığı tek ekranda"],
      },
    ],
    sections: [
      {
        label: "İş akışları",
        title: "Karmaşık süreçler için merkezi iş akışı motoru",
        description: "Birbirini etkileyen süreçleri; durum geçişleri, ön koşullar ve bekleme adımlarıyla modellenen bir uygulama mimarisinde birleştiriyorum.",
        items: [
          { title: "Durum ve bağımlılık yönetimi", description: "Bir süreçteki değişikliğin diğer görevleri durdurmasını, bekletmesini veya yeniden başlatmasını merkezi iş kurallarıyla yönetiyorum." },
          { title: "Belge ve işlem durumu takibi", description: "Gönderiye gelen irsaliye ve teslim belgelerini, yükleme durumlarını ve bekleyen işlemleri operasyon ekranlarıyla ilişkilendiriyor; sonraki adımın ekip tarafından takip edilmesini sağlıyorum." },
          { title: "Takvim ve süre hesaplama", description: "Teslim süreleri, takvim istisnaları ve süreç durumlarını birlikte değerlendiren hesaplama bileşenleri geliştiriyor; hesaplamanın girdilerini ve dayanaklarını kaydediyorum." },
          { title: "İstisna yönetimi", description: "Standart akışın dışında kalan durumları ayrı iş adımlarına dönüştürüyor; inceleme gerektiren kayıtları personelin iş havuzuna aktarıyorum." },
        ],
      },
      {
        label: "Yapay zekâ",
        title: "AI destekli karşılaştırma, insan kontrollü değerlendirme",
        description: "Farklı biçimlerde yazılmış kayıtların benzerliğini değerlendiren yapay zekâ destekli karşılaştırmayı, kural tabanlı kontroller ve insan incelemesiyle birleştiriyorum.",
        items: [
          { title: "Kayıt kalitesi ve karşılaştırma", description: "Adres karşılaştırma senaryolarında yazım farklılıklarını ve eksik alanları ele alıyor; karşılaştırma sonuçlarını geçmiş işlem kayıtlarıyla birlikte değerlendiriyorum." },
          { title: "Belirsiz sonuçların yönetimi", description: "Belirsiz sonuçları otomatik olarak onaylamak yerine operatör incelemesine aktaran bir akış geliştiriyorum. Model çıktısını uygulama içindeki kontrol adımlarından geçiriyorum." },
        ],
      },
      {
        label: "İşlem güvenilirliği",
        title: "Tekrarlı işlemleri önleyen kontrollü yürütme",
        description: "Yan etkisi veya maliyeti olan işlemler için önizleme, ön koşul kontrolü ve onay adımlarını ayrı bir modülde birleştiriyorum.",
        items: [
          { title: "Çift işlem koruması", description: "Tekrarlı yürütmeyi önleyen kontroller ve işlem kilitleri kullanıyorum. Yarıda kalan veya sonucu belirsiz işlemleri yeniden çalıştırmadan önce incelemeye ayırıyorum." },
          { title: "Maliyet görünürlüğü", description: "İşlem bazında kullanım haklarını, günlük bütçe sınırlarını ve harcama kayıtlarını izleyerek operasyon maliyetlerinin takip edilmesini sağlıyorum." },
        ],
      },
      {
        label: "Operasyon",
        title: "Ekiplerin çalışabildiği bir operasyon arayüzü",
        description: "Arka plan süreçlerini, bekleyen kararları ve personel görevlerini ortak bir iş havuzunda görünür hale getiriyorum.",
        items: [
          { title: "Görev ve gecikme takibi", description: "İş türü, proje, süreç adımı ve bekleme süresine göre filtreler geliştiriyorum. Görevlerin kimde beklediği ve hangi adımların geciktiği izlenebiliyor." },
          { title: "Tek ekranda süreç bağlamı", description: "Mevcut durum, sıradaki iş ve geçmiş hareketlerin zaman çizelgesini aynı gönderi ekranında sunarak personelin işlem bağlamını takip etmesini kolaylaştırıyorum." },
        ],
      },
      {
        label: "Güvenlik ve mimari",
        title: "İzlenebilir işlemler, sınırlandırılmış erişim",
        description: "NestJS üzerinde modüler monolit mimarisiyle iş kurallarını merkezi ve sürümlenebilir bileşenlerde tutuyor; işlem sonuçlarının girdileriyle birlikte izlenmesini sağlıyorum.",
        items: [
          { title: "Proje bazında veri izolasyonu", description: "Uygulama sorgularını kullanıcının proje kapsamıyla sınırlandırıyorum. Veri saklamada şifreleme, arayüzlerde maskeleme ve erişim kontrolü uyguluyorum." },
          { title: "Denetim izi ve CI kontrolleri", description: "İşlem geçmişinde iptal ve düzeltme kayıtlarını koruyor; commit, push ve CI aşamalarında kişisel veri sızıntısını kontrol eden geliştirme kapıları kullanıyorum." },
        ],
      },
      {
        label: "Ölçüm ve test",
        title: "İş kurallarını ölçerek doğrulamak",
        description: "Değişiklikleri veri analizi, uygulama, otomatik test ve kaynak kayıtlarla karşılaştırma döngüsüyle geliştiriyorum.",
        items: [
          { title: "Tarih hesaplamalarında geriye dönük doğrulama", description: "Bir günlük tarih sapmasının kök nedenlerini analiz ederek hesaplama mantığını düzelttim. Etkilenen kayıtları kaynak verilerle karşılaştırarak sonucu doğruladım." },
          { title: "10.000+ otomatik test", description: "Otomatik testleri mutasyon testleriyle destekliyorum. Kritik bir kural bilerek değiştirildiğinde testin hatayı yakalayıp yakalamadığını kontrol ediyorum." },
        ],
      },
      {
        label: "Altyapı ve kuyruklar",
        title: "Arka plan işlerinden canlı ortam işletimine",
        description: "Redis ve BullMQ ile arka plan işlerini, eşzamanlılık kontrollerini ve süreç yürütmesini uygulama katmanından ayrı ele alıyorum.",
        items: [
          { title: "Eşzamanlılık ve işlem kilitleri", description: "Aynı işlem bağlamındaki çakışmaları kilit yönetimiyle kontrol ediyor; oturum yaşam döngüsü ve değişen dış bağımlılıklar için hata durumlarını ele alıyorum." },
          { title: "Uçtan uca geliştirme ve dağıtım", description: "Next.js ve TypeScript ile operasyon arayüzünü; NestJS, Prisma ve PostgreSQL ile API ve veri katmanlarını geliştiriyorum. Çok kopyalı dağıtım, systemd ve sürekli entegrasyon kontrolleriyle canlı ortamın işletimini yürütüyorum." },
        ],
      },
    ],
  },
};

type DefaultProject = Omit<ProjectView, "id">;

/** Admin panelindeki "içe aktar" düğmesiyle veritabanına yazılan başlangıç projeleri. */
export const defaultProjects: DefaultProject[] = [
  {
    slug: "tabutabi",
    title: "Tabutabi",
    summary: "App Store'da yayında olan, takımla oynanan bir kelime anlatma oyunu. Yasaklı kelimeleri ses tanımayla dinleyen bir hakem tilki yakalıyor.",
    description:
      "Expo ve React Native ile geliştirilen mobil oyun. Yasaklı kelimeleri ses tanımayla yakalıyor, uygulama içi satın alma ve dokunsal geri bildirim içeriyor. Tanıtım sitesi Astro ile hazırlandı.",
    tags: ["React Native", "Expo", "TypeScript", "Ses tanıma", "Zustand", "Astro"],
    // Uygulamanın reposu gizli olduğu için kaynak kod bağlantısı yok.
    githubUrl: null,
    liveUrl: "https://tabutabi.com/",
    imageUrl: "/images/projects/tabutabi.webp",
    year: 2026,
    featured: true,
    archived: false,
  },
  {
    slug: "cisid",
    title: "cisid",
    summary: "Go ile yazdığım, Docker üzerinde çalışan ve kendi sunucunda barındırılan açık kaynak bir CI/CD sistemi.",
    description:
      "Webhook ya da dal takibiyle tetiklenen işler Docker içinde çalışıyor, loglar canlı akıyor. Şifreli gizli değişkenler, Prometheus metrikleri, OpenTelemetry izleri, GitHub, GitLab, Gitea ve Bitbucket desteği ve Helm chart ile kurulum var. MIT lisanslı.",
    tags: ["Go", "Docker", "PostgreSQL", "TypeScript", "Kubernetes"],
    githubUrl: "https://github.com/sidumandr/cisid",
    liveUrl: null,
    imageUrl: "/images/projects/cisid.webp",
    year: 2026,
    featured: true,
    archived: false,
  },
  {
    slug: "biopotan",
    title: "biopotan",
    summary: "Hobi olarak geliştirdiğim, EKG, EMG ve EEG sinyallerini ölçen düşük maliyetli açık bir cihaz. Sinyaller ESP32'de işlenip web arayüzünde gösteriliyor.",
    description:
      "Cihaz yazılımı C++ ile ESP32 için, arayüz Svelte ve TypeScript ile yazılıyor. Geliştirme için sahte sinyal üreten bir sunucu var. Deneysel bir hobi projesi, tıbbi cihaz değil.",
    tags: ["ESP32", "C++", "Svelte", "TypeScript"],
    githubUrl: "https://github.com/sidumandr/biopotan",
    liveUrl: null,
    imageUrl: "/images/projects/biopotan.webp",
    year: 2026,
    featured: false,
    archived: false,
  },
  {
    slug: "sidufy",
    title: "Sidufy",
    summary: "Şarkı listeleri, çalma kontrolleri ve ses dalgası görselleştirmeleri olan bir müzik uygulaması.",
    description:
      "React ve TypeScript ile arayüz, Zustand ile istemci durumu ve Django ile backend katmanını bir araya getiriyor.",
    tags: ["React", "TypeScript", "Zustand", "Django"],
    githubUrl: "https://github.com/sidumandr/Music-Streaming-Service",
    liveUrl: "https://sidufy.vercel.app/",
    imageUrl: "/images/projects/sidufy.webp",
    year: 2024,
    featured: true,
    archived: false,
  },
  {
    slug: "cinapil",
    title: "Cinapil",
    summary: "Film keşfini kolaylaştıran, izleme listeleri tutan bir rehber uygulaması.",
    description:
      "Next.js ve TypeScript arayüzünü .NET API ve PostgreSQL veri katmanıyla birleştiriyor; Docker ile uygulamanın çalıştırma ortamını tanımlıyor.",
    tags: ["Next.js", ".NET", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/sidumandr/cinapil",
    liveUrl: "https://cinapil.vercel.app/",
    imageUrl: "/images/projects/cinapil.webp",
    year: 2024,
    featured: true,
    archived: false,
  },
  {
    slug: "book-tracker",
    title: "Book Tracker",
    summary: "Kişisel kitaplığı ve okuma hedeflerini uçtan uca takip eden bir uygulama.",
    description: "Next.js arayüzü, .NET backend ve PostgreSQL veritabanı ile kitap yönetimini uçtan uca ele alıyor.",
    tags: ["Next.js", ".NET", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/sidumandr/book-tracker",
    liveUrl: "https://sidbooktracker.vercel.app",
    imageUrl: "/images/projects/book-tracker.webp",
    year: 2026,
    featured: true,
    archived: false,
  },
  {
    slug: "siduschat",
    title: "SidusChat",
    summary: "Odalar ve anlık bildirimlerle SignalR tabanlı gerçek zamanlı mesajlaşma.",
    description:
      "Next.js arayüzü ile .NET backend arasında SignalR ve WebSocket üzerinden çift yönlü iletişim kuruyor; verileri PostgreSQL üzerinde tutuyor.",
    tags: ["Next.js", ".NET", "SignalR", "PostgreSQL"],
    githubUrl: "https://github.com/sidumandr/siduschat",
    liveUrl: null,
    imageUrl: null,
    year: 2024,
    featured: false,
    archived: false,
  },
  {
    slug: "mersin-arslan-nakliyat",
    title: "Mersin Arslan Nakliyat",
    summary: "Bir nakliyat firması için Next.js ile geliştirilen kurumsal web sitesi.",
    description:
      "Farklı ekranlara uyumlu arayüzü, mobil menüyü, açılır menüleri ve dışarı tıklama etkileşimlerini uyguladım; SEO ve performans iyileştirmeleri yaptım. Yayına alma ve depo yönetimini ekip arkadaşım üstlendi.",
    tags: ["Next.js", "TypeScript", "Bootstrap"],
    githubUrl: "https://github.com/sevketemingurbuz/mersin-arslan-nakliyat-1/tree/main",
    // Alan adı artık yanıt vermediği için canlı bağlantı kaldırıldı.
    liveUrl: null,
    imageUrl: null,
    year: 2025,
    featured: false,
    archived: true,
  },
];
