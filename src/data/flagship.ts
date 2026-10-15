export const flagshipSections = [
  {
    "id": "section-01",
    "number": "01",
    "label": "İş akışları",
    "title": "Birbirine bağlı hukuki süreçler",
    "description": "Tebligatın sonucu kesinleşmeyi, itiraz gönderim yetkisini, vefat veya cezaevi durumu ise sonraki işlemleri etkiliyor. Bu bağımlılıkları dosyanın mevcut durumuna göre ilerleyen bir süreç mimarisinde birleştiriyorum.",
    "items": [
      {
        "title": "Tebligat",
        "description": "Tebligat akıbetinin, teslim bilgilerinin ve mazbataların kontrolü; bila dönüş nedenlerinin değerlendirilmesi; sonraki araştırma veya gönderim adımının belirlenmesi."
      },
      {
        "title": "Tensip ve evrak kontrolü",
        "description": "Tensip durumlarının ve dosyaya gelen evrakların kontrolünü operasyonel takiple ilişkilendirerek bekleyen kararların ve sonraki işlerin görünür hale getirilmesi."
      },
      {
        "title": "Kesinleşme",
        "description": "Tebliğ tarihi, süre başlangıcı, tatil takvimi ve itiraz durumuna bağlı hesaplamalar; kararın kaynak ve gerekçesiyle kaydedilmesi."
      },
      {
        "title": "İtiraz",
        "description": "İtirazın tespiti ve türünün ayrıştırılması, ilgili işlemlerin durdurulması ve engel kalktığında sürecin uygun aşamadan devam etmesi."
      },
      {
        "title": "Vefat ve mirasçılık",
        "description": "Vefat tespiti, veraset yetki belgesi talebi, mirasçı bilgilerinin okunması ve tebligat adımlarının takibi."
      },
      {
        "title": "Cezaevi",
        "description": "Kurum bilgisinin çözümlenmesi, KEP tebligatı ve ilgili mühletlerin süreç üzerindeki etkilerinin yönetilmesi."
      },
      {
        "title": "Haciz ve mal varlığı",
        "description": "Haciz taleplerinin tespiti; SGK, araç, taşınmaz, banka, posta çeki ve icra dosyası sorgularının iş akışlarına bağlanması."
      }
    ]
  },
  {
    "id": "section-02",
    "number": "02",
    "label": "Yapay zekâ",
    "title": "Adres aramasından karar mekanizmasına",
    "description": "Sonuçsuz kalan tebligatların ardından MERNİS, İSKİ, GİB, kurumsal portal ve GSM kayıtlarını kapsayan beş aşamalı bir adres araştırma akışı tasarladım.",
    "items": [
      {
        "title": "AI destekli karşılaştırma",
        "description": "Farklı biçimlerde yazılmış adreslerin aynı fiziksel konuma ait olup olmadığını değerlendirmek için yapay zekâ destekli karşılaştırma kullanıyorum. Sistem bulunan adresleri geçmiş işlemlerle karşılaştırıyor; eksik veya gönderime uygun olmayan kayıtları eliyor."
      },
      {
        "title": "Belirsizlikte insan onayı",
        "description": "Sonucun belirsiz olduğu durumlarda karar operatöre aktarılıyor. Araştırma; geçmiş işlemleri, adres kalitesini ve hukuki koşulları birlikte değerlendiren bir karar sürecine dönüşüyor."
      }
    ]
  },
  {
    "id": "section-03",
    "number": "03",
    "label": "Gönderim & maliyet",
    "title": "Geri alınamaz işlemler için kontrollü akış",
    "description": "Ücret doğuran ve geri alınması mümkün olmayan tebligat gönderimlerini ayrı bir işlem modülünde yönetiyorum.",
    "items": [
      {
        "title": "Gönderim korumaları",
        "description": "Önizleme, çift gönderim koruması, mazbata bekleme koşulları ve operatör onaylarını gönderim akışının parçası olarak tasarladım. Yarıda kalan veya sonucu belirsiz işlemlerde dosya kilitlenerek insan incelemesine aktarılıyor."
      },
      {
        "title": "Bütçe ve harcama takibi",
        "description": "Ücretli sorgularda dosya bazında ücretsiz haklar, günlük bütçe sınırları ve her harcamanın kim tarafından, ne için ve ne zaman yapıldığı takip ediliyor."
      }
    ]
  },
  {
    "id": "section-04",
    "number": "04",
    "label": "Operasyon",
    "title": "Otomasyon ile insan kararının buluştuğu yer",
    "description": "Otomasyonun durduğu noktaları, insan kararı gerektiren durumları ve personelin tamamlaması gereken işleri ortak bir iş havuzunda topluyorum.",
    "items": [
      {
        "title": "Personel iş havuzu",
        "description": "İş türü, portföy, süreç adımı ve bekleme süresine göre filtreleme; görevlerin kimde beklediğini ve hangi işlemlerin geciktiğini görmeyi sağlıyor."
      },
      {
        "title": "Dosyanın üç katmanlı özeti",
        "description": "Dosya ekranında mevcut durum, sıradaki işlem ve geçmiş hareketlerin zaman çizelgesi birlikte sunuluyor. Personel ne olduğunu ve sonraki adımı tek ekranda görebiliyor."
      }
    ]
  },
  {
    "id": "section-05",
    "number": "05",
    "label": "Güvenlik & mimari",
    "title": "Her kararın bir dayanağı var",
    "description": "İş kurallarını merkezi ve sürümlenebilir yapıda tutuyorum. Kararların hangi veri, belge ve tarihe dayandığını kaydederek geçmiş işlemlerin açıklanabilmesini ve kurallar değiştiğinde yeniden değerlendirilebilmesini sağlıyorum.",
    "items": [
      {
        "title": "Yetki kapsamı ve veri izolasyonu",
        "description": "Çok portföylü yapıda her sorguyu kullanıcının yetki kapsamıyla sınırlandırıyorum. Kişisel verileri şifreli saklayıp arayüzde maskeliyorum."
      },
      {
        "title": "Denetim izi ve geliştirme kontrolleri",
        "description": "Hatalı işlem kayıtlarını silmek yerine iptal kaydıyla koruyan denetim izi ve commit, push ve CI aşamalarında kişisel veri sızıntısını kontrol eden kapılar kullanıyorum."
      }
    ]
  },
  {
    "id": "section-06",
    "number": "06",
    "label": "Ölçüm & test",
    "title": "Önce ölç, sonra geliştir, tekrar doğrula",
    "description": "İş kurallarını canlı veriden ölçüm, uygulama, mutasyon testi ve kaynak kayıtlarla karşılaştırma döngüsüyle geliştiriyorum.",
    "items": [
      {
        "title": "1.123 dosyada doğrulanan düzeltme",
        "description": "Bu yöntemle 1.123 dosyayı etkileyen bir günlük kesinleşme tarihi sapmasını tespit edip düzelttim; sonuçları UYAP kayıtlarıyla karşılaştırarak doğruladım."
      },
      {
        "title": "10.000+ otomatik test",
        "description": "Otomatik testler ve mutasyon testleriyle yalnızca kodun çalışmasını değil, kritik iş kurallarındaki değişikliklerin testler tarafından yakalanmasını da kontrol ediyorum."
      }
    ]
  },
  {
    "id": "section-07",
    "number": "07",
    "label": "Entegrasyon & altyapı",
    "title": "Dış sistemin değişkenliğini yönetmek",
    "description": "UYAP entegrasyonunu kullanıcı oturumu üzerinden Playwright tabanlı tarayıcı otomasyonuyla yürütüyorum.",
    "items": [
      {
        "title": "Oturum ve eşzamanlılık yönetimi",
        "description": "Kısa ömürlü oturum bilgileri, aynı kimlikle eşzamanlı işlem kısıtları ve değişen dış sistem davranışları için oturum ve kilit yönetimi geliştiriyorum."
      },
      {
        "title": "Uçtan uca teknoloji ve işletim",
        "description": "Redis ve BullMQ ile arka plan işlerini, Next.js ile operasyon arayüzünü; NestJS, Prisma ve PostgreSQL ile uygulama ve veri katmanlarını oluşturuyorum. Çok kopyalı dağıtım, systemd ve sürekli entegrasyon kontrolleriyle canlı ortamın işletimini yönetiyorum."
      }
    ]
  }
] as const;

export const flagshipStack = ["NestJS", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Playwright", "systemd", "CI/CD"] as const;
