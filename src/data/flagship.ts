export const flagshipSections = [
  {
    "id": "section-01",
    "number": "01",
    "label": "İş akışları",
    "title": "Karmaşık süreçler için merkezi iş akışı motoru",
    "description": "Birbirini etkileyen süreçleri; durum geçişleri, ön koşullar ve bekleme adımlarıyla modellenen bir uygulama mimarisinde birleştiriyorum.",
    "items": [
      {
        "title": "Durum ve bağımlılık yönetimi",
        "description": "Bir süreçteki değişikliğin diğer görevleri durdurmasını, bekletmesini veya yeniden başlatmasını merkezi iş kurallarıyla yönetiyorum."
      },
      {
        "title": "Belge ve işlem durumu takibi",
        "description": "Dosyaya gelen belgeleri, tensip durumlarını ve bekleyen işlemleri operasyon ekranlarıyla ilişkilendiriyor; sonraki adımın ekip tarafından takip edilmesini sağlıyorum."
      },
      {
        "title": "Takvim ve süre hesaplama",
        "description": "Tarih, takvim istisnaları ve süreç durumlarını birlikte değerlendiren hesaplama bileşenleri geliştiriyor; hesaplamanın girdilerini ve dayanaklarını kaydediyorum."
      },
      {
        "title": "İstisna yönetimi",
        "description": "Standart akışın dışında kalan durumları ayrı iş adımlarına dönüştürüyor; inceleme gerektiren kayıtları personelin iş havuzuna aktarıyorum."
      }
    ]
  },
  {
    "id": "section-02",
    "number": "02",
    "label": "Yapay zekâ",
    "title": "AI destekli karşılaştırma, insan kontrollü değerlendirme",
    "description": "Farklı biçimlerde yazılmış kayıtların benzerliğini değerlendiren yapay zekâ destekli karşılaştırmayı, kural tabanlı kontroller ve insan incelemesiyle birleştiriyorum.",
    "items": [
      {
        "title": "Kayıt kalitesi ve karşılaştırma",
        "description": "Adres karşılaştırma senaryolarında yazım farklılıklarını ve eksik alanları ele alıyor; karşılaştırma sonuçlarını geçmiş işlem kayıtlarıyla birlikte değerlendiriyorum."
      },
      {
        "title": "Belirsiz sonuçların yönetimi",
        "description": "Belirsiz sonuçları otomatik olarak kesinleştirmek yerine operatör incelemesine aktaran bir akış geliştiriyorum. Model çıktısını uygulama içindeki kontrol adımlarından geçiriyorum."
      }
    ]
  },
  {
    "id": "section-03",
    "number": "03",
    "label": "İşlem güvenilirliği",
    "title": "Tekrarlı işlemleri önleyen kontrollü yürütme",
    "description": "Yan etkisi veya maliyeti olan işlemler için önizleme, ön koşul kontrolü ve onay adımlarını ayrı bir modülde birleştiriyorum.",
    "items": [
      {
        "title": "Çift işlem koruması",
        "description": "Tekrarlı yürütmeyi önleyen kontroller ve işlem kilitleri kullanıyorum. Yarıda kalan veya sonucu belirsiz işlemleri yeniden çalıştırmadan önce incelemeye ayırıyorum."
      },
      {
        "title": "Maliyet görünürlüğü",
        "description": "İşlem bazında kullanım haklarını, günlük bütçe sınırlarını ve harcama kayıtlarını izleyerek operasyon maliyetlerinin takip edilmesini sağlıyorum."
      }
    ]
  },
  {
    "id": "section-04",
    "number": "04",
    "label": "Operasyon",
    "title": "Ekiplerin çalışabildiği bir operasyon arayüzü",
    "description": "Arka plan süreçlerini, bekleyen kararları ve personel görevlerini ortak bir iş havuzunda görünür hale getiriyorum.",
    "items": [
      {
        "title": "Görev ve gecikme takibi",
        "description": "İş türü, proje, süreç adımı ve bekleme süresine göre filtreler geliştiriyorum. Görevlerin kimde beklediği ve hangi adımların geciktiği izlenebiliyor."
      },
      {
        "title": "Tek ekranda süreç bağlamı",
        "description": "Mevcut durum, sıradaki iş ve geçmiş hareketlerin zaman çizelgesini aynı dosya ekranında sunarak personelin işlem bağlamını takip etmesini kolaylaştırıyorum."
      }
    ]
  },
  {
    "id": "section-05",
    "number": "05",
    "label": "Güvenlik & mimari",
    "title": "İzlenebilir işlemler, sınırlandırılmış erişim",
    "description": "NestJS üzerinde modüler monolit mimarisiyle iş kurallarını merkezi ve sürümlenebilir bileşenlerde tutuyor; işlem sonuçlarının girdileriyle birlikte izlenmesini sağlıyorum.",
    "items": [
      {
        "title": "Proje bazında veri izolasyonu",
        "description": "Uygulama sorgularını kullanıcının proje kapsamıyla sınırlandırıyorum. Veri saklamada şifreleme, arayüzlerde maskeleme ve erişim kontrolü uyguluyorum."
      },
      {
        "title": "Denetim izi ve CI kontrolleri",
        "description": "İşlem geçmişinde iptal ve düzeltme kayıtlarını koruyor; commit, push ve CI aşamalarında kişisel veri sızıntısını kontrol eden geliştirme kapıları kullanıyorum."
      }
    ]
  },
  {
    "id": "section-06",
    "number": "06",
    "label": "Ölçüm & test",
    "title": "İş kurallarını ölçerek doğrulamak",
    "description": "Değişiklikleri veri analizi, uygulama, otomatik test ve kaynak kayıtlarla karşılaştırma döngüsüyle geliştiriyorum.",
    "items": [
      {
        "title": "Tarih hesaplamalarında geriye dönük doğrulama",
        "description": "Bir günlük tarih sapmasının kök nedenlerini analiz ederek hesaplama mantığını düzelttim. Etkilenen kayıtları kaynak verilerle karşılaştırarak sonucu doğruladım."
      },
      {
        "title": "10.000+ otomatik test",
        "description": "Otomatik testleri mutasyon testleriyle destekliyorum. Kritik bir kural bilerek değiştirildiğinde testin hatayı yakalayıp yakalamadığını kontrol ediyorum."
      }
    ]
  },
  {
    "id": "section-07",
    "number": "07",
    "label": "Altyapı & kuyruklar",
    "title": "Arka plan işlerinden canlı ortam işletimine",
    "description": "Redis ve BullMQ ile arka plan işlerini, eşzamanlılık kontrollerini ve süreç yürütmesini uygulama katmanından ayrı ele alıyorum.",
    "items": [
      {
        "title": "Eşzamanlılık ve işlem kilitleri",
        "description": "Aynı işlem bağlamındaki çakışmaları kilit yönetimiyle kontrol ediyor; oturum yaşam döngüsü ve değişen dış bağımlılıklar için hata durumlarını ele alıyorum."
      },
      {
        "title": "Uçtan uca geliştirme ve dağıtım",
        "description": "Next.js ve TypeScript ile operasyon arayüzünü; NestJS, Prisma ve PostgreSQL ile API ve veri katmanlarını geliştiriyorum. Çok kopyalı dağıtım, systemd ve sürekli entegrasyon kontrolleriyle canlı ortamın işletimini yürütüyorum."
      }
    ]
  }
] as const;

export const flagshipStack = ["NestJS", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "BullMQ", "systemd", "CI/CD"] as const;
