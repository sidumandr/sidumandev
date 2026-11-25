# siduman

Safa İlhan Duman'ın kişisel portföyü ve içerik yönetim paneli. Next.js 16, React 19, TypeScript, Prisma 7 ve PostgreSQL.

## Çalıştırma

```sh
npm ci
cp .env.example .env   # değerleri doldur
npm run db:migrate     # yerel veritabanını oluşturur
npm run dev
```

Veritabanı tanımlı değilse site `src/lib/content/defaults.ts` içindeki varsayılan içerikle çalışır; admin paneli ve istatistikler kapalı kalır.

## Kontroller

```sh
npm run lint
npm run typecheck
npm run build
```

## Yapı

- `src/app/(site)` — herkese açık site. Sayfa statik üretilir; panelden kayıt yapıldığında ilgili önbellek etiketi (`site-content`, `projects`) yenilenir, yeniden yayına gerek kalmaz.
- `src/app/admin` — admin paneli: genel bakış (ziyaretçi istatistikleri), projeler (ekle, düzenle, sırala, arşivle, sil), ana proje (vaka çalışması) ve sayfa içeriği (hero, hakkımda, iletişim + CV, SEO).
- `src/lib/content` — içerik şemaları (zod), varsayılan içerik ve önbellekli sorgular.
- `src/lib/analytics` + `src/app/api/collect` — çerezsiz ziyaretçi sayacı.
- `prisma/` — şema ve migration'lar. `npm run build` bekleyen migration'ları `DATABASE_URL` tanımlıysa uygular.
- Sertifikalar bölümü (`src/app/components/Certificates`, `src/data/certificates.ts`) panelin dışındadır ve elle düzenlenir.

## Yayına alma (Vercel)

1. Vercel projesine **Neon Postgres** ekle (Storage → Create Database). `DATABASE_URL` otomatik tanımlanır.
2. **Vercel Blob** deposu ekle. `BLOB_READ_WRITE_TOKEN` otomatik tanımlanır; proje görselleri ve CV buraya yüklenir.
3. GitHub'da bir **OAuth App** oluştur (Settings → Developer settings → OAuth Apps).
   Authorization callback URL: `https://ALAN-ADIN/api/auth/github/callback`
4. Vercel ortam değişkenlerine ekle: `AUTH_SECRET` (`openssl rand -hex 32`), `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ADMIN_GITHUB_LOGIN`.
5. Yeniden yayınla, `/admin` adresinden GitHub ile giriş yap. Projeler sayfası ilk açıldığında mevcut projeler veritabanına aktarılır.

## İstatistikler ve gizlilik

Çerez kullanılmaz ve IP adresi saklanmaz. Ziyaretçi; IP, tarayıcı bilgisi, gizli anahtar ve günün tarihiyle özetlenen anonim bir kimlikle sayılır, bu kimlik her gün değişir. Kaynak site yalnızca alan adı olarak, ülke Vercel'in coğrafi başlığından tutulur. Botlar ve admin oturumu açık tarayıcılar sayılmaz. Sayılanlar: sayfa görüntüleme, sekmenin açık kaldığı süre, görülen bölümler ve `data-track` işaretli bağlantı tıklamaları.

## Tasarım

Koyu "ürün lansmanı" teması: Inter Tight başlıklar, Inter metin, Geist Mono küçük etiketler; sarı vurgu rengi. Renkler `src/app/styles/tokens.css` içinde. Ana projenin gerçek ekranları gizli olduğu için hero'daki görüntü CSS ile çizilmiş temsili bir arayüzdür ve altyazısında öyle belirtilir. Kaydırma animasyonları `prefers-reduced-motion` tercihine uyar.
