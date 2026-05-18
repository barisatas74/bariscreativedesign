# Yayina Hazirlik Notlari

Bu proje host/domain olmadan kod tarafinda yayina hazir durumdadir. Manuel yayin yapmadan once bu dosyayi kontrol et.

## Lokal Kontrol

```bash
npm install
npm run check
npm run audit
```

`npm run check` basariliysa `dist/` klasoru yayina verilecek temiz ciktidir.

## Manuel Yayin

- Build komutu: `npm run build`
- Yayin klasoru: `dist`
- Node surumu: `22` veya uzeri (`>=22.12.0`)
- SPA zorunlu degil; site ana sayfa ve hash linklerle calisir.

## Domain Alinca Kontrol Edilecekler

Su an SEO adresleri `https://bariscreativedesign.com/` icin hazirlandi. Farkli domain alirsan su dosyalardaki URL'leri degistir:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

## Form Durumu

Web3Forms sonraya birakildi. Bu yuzden form otomatik backend gonderimi yapmaz; kullanicinin mail uygulamasini acar. WhatsApp ve direkt e-posta linkleri aktif kalir.

Sonradan Web3Forms eklemek istersen:

```bash
VITE_WEB3FORMS_ACCESS_KEY=buraya_key
```

Bu deger `.env.local` veya host panelindeki environment variable alanina girilir.

## Host Guvenlik Ayarlari

- Vercel icin `vercel.json` hazir.
- Netlify/Cloudflare Pages benzeri hostlar icin `public/_headers` hazir.
- Duz klasik hosting kullanirsan bu header'lar panelden veya sunucu ayarindan manuel eklenmelidir.

## Yayin Sonrasi Mini Kontrol

- Site HTTPS ile aciliyor mu?
- Mobilde ana baslik tasiyor mu?
- WhatsApp linki aciliyor mu?
- E-posta linki aciliyor mu?
- `/robots.txt` aciliyor mu?
- `/sitemap.xml` aciliyor mu?
- Sosyal paylasimda gorsel cikiyor mu?
