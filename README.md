# siduman

Safa İlhan Duman'ın kişisel portföyü. Next.js 16, React 19 ve TypeScript.

## Çalıştırma

```sh
npm ci
npm run dev
```

## Kontroller

```sh
npm run lint
npm run typecheck
npm run build
```

## Tasarım

Geist / Geist Mono yerel fontları, koyu varsayılan tema ve açık tema, sarı seçim vurgusu, TUI panelleri, tmux menüsü ve vim durum çubuğu. Hero arka planı kare ızgara yerine düşük opaklıklı terminal geçmişidir. İçerik en fazla 1120px genişliğindedir. Mobil eşik 720px; proje ızgarası 900px altında iki sütun olur.

Renkler `src/app/styles/tokens.css`, içerikler `src/data`, ortak bileşenler `src/app/components/ui` içinde. Site uygulama kodu yalnızca TypeScript ile yazılmıştır.

## İletişim

Form alanları istemcide doğrulanır. Gönder eylemi kullanıcının e-posta uygulamasında doldurulmuş bir taslak açar. Kullanıcı bu taslağı kendisi gönderir. Sunucuya mesaj iletildiğini iddia eden sahte bir başarı durumu yoktur. Bir e-posta servisi veya API anahtarı gerektirmez.

## Erişilebilirlik

İçeriğe geç bağlantısı, etiketli form alanları, açıklayıcı hata mesajları, görünür klavye odağı, aktif bölüm için aria-current, mobil menü için Escape/dış tıklama desteği ve prefers-reduced-motion desteği vardır.
