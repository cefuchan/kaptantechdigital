# Hosting taşıma rehberi

Site tamamen statik: `npm run build` bütün rotaları `dist/` altına gerçek HTML
olarak basar. Sunucu tarafında çalışan hiçbir şey yok, ortam değişkeni gerekmiyor.
Yani herhangi bir statik host'a taşınabilir.

Ama **bir ayarı yanlış yaparsan SEO çalışmasının bir kısmı geri gider.** Aşağıdaki
"404" başlığı bu yüzden en önemli bölüm.

---

## Temel ayarlar

| Ayar | Değer |
|---|---|
| Build komutu | `npm run build` |
| Yayın klasörü | `dist` |
| Node sürümü | 20 veya üstü |
| Ortam değişkeni | Yok |

---

## 1. 404: EN KRİTİK AYAR

Statik host'ların çoğu, SPA'lar için varsayılan olarak şunu önerir:

```
/*  ->  /index.html   200
```

**Bunu YAPMA.** Bu kural, var olmayan her adrese `200 OK` ile ana sayfayı döndürür.
Google bunu "soft 404" sayar; olmayan sayfalar indekse girmeye çalışır ve sitenin
kalite değerlendirmesi düşer. Bu hata sitede bir kez yaşandı ve düzeltildi.

Doğru davranış: statik bir dosyayla eşleşmeyen adres, **404 durum koduyla**
ön render edilmiş `404.html` almalı.

Bu siteye SPA fallback'i gerekmiyor, çünkü her rota build sırasında kendi HTML
dosyası olarak üretiliyor.

### Cloudflare Pages

`public/_redirects` oluştur (dosya `dist/` içine kopyalanır):

```
/*  /404.html  404
```

`public/_headers` zaten var ve Cloudflare Pages bunu olduğu gibi okur.

### Vercel

Proje köküne `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/(.*).png",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=604800" }]
    },
    {
      "source": "/sitemap.xml",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=3600" }]
    }
  ]
}
```

Vercel bilinmeyen adreslerde `dist/404.html`'i zaten 404 koduyla sunar; ayrıca
rewrite kuralı **ekleme**.

### nginx (kendi sunucun)

```nginx
server {
    root /var/www/kaptan/dist;
    index index.html;

    # SPA fallback YOK. Dosya yoksa gerçek 404.
    location / {
        try_files $uri $uri/index.html =404;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    location = /sitemap.xml {
        add_header Cache-Control "public, max-age=3600";
    }
}
```

---

## 2. Sondaki eğik çizgi

Sayfalardaki `<link rel="canonical">` değerleri **sondaki eğik çizgi olmadan**
yazılıyor (`/is-talebi`, `/hizmetler/seo`).

Netlify `/is-talebi` adresini `/is-talebi/` adresine 301 ile yönlendiriyordu; yani
canonical, yönlendirilen bir adresi gösteriyordu. Google bunu çözüyor ama temiz
değil.

Vercel (`trailingSlash: false`) ve Cloudflare Pages varsayılan olarak eğik çizgisiz
sunar — yani taşındığında bu tutarsızlık kendiliğinden düzelir. Yeni host eğik
çizgi dayatıyorsa, bunu kapatabildiğinden emin ol.

---

## 3. Alan adı

- `www` ve köke aynı anda cevap verme; birini seçip diğerini **301** ile yönlendir.
  Mevcut kurulum köke (`kaptantechdigital.com`) göre, canonical'lar da öyle yazılı.
- HTTPS zorunlu, HTTP'den 301.
- Alan adını taşırken `googleb95800e25762d92d.html` dosyasının yayında kaldığından
  emin ol — Search Console doğrulaması ona bağlı. Dosya `public/` içinde, otomatik
  kopyalanıyor.

---

## 4. Taşıdıktan sonra doğrulama listesi

Sırayla kontrol et; hepsi geçmeden DNS'i tamamen çevirme.

```bash
# 1. Olmayan bir adres GERÇEKTEN 404 dönmeli (200 dönerse kural yanlış)
curl -o /dev/null -w "%{http_code}\n" https://kaptantechdigital.com/olmayan-sayfa

# 2. Ana sayfa ve önemli sayfalar 200
for u in / /hizmetler /is-talebi /blog /iletisim; do
  printf "%-16s " "$u"
  curl -o /dev/null -w "%{http_code}\n" "https://kaptantechdigital.com$u"
done

# 3. sitemap ve robots erişilebilir
curl -s https://kaptantechdigital.com/sitemap.xml | grep -c "<loc>"
curl -s https://kaptantechdigital.com/robots.txt | head -3

# 4. Search Console doğrulama dosyası duruyor mu
curl -o /dev/null -w "%{http_code}\n" https://kaptantechdigital.com/googleb95800e25762d92d.html

# 5. İçerik gerçekten HTML'de mi (JavaScript olmadan da görünmeli)
curl -s https://kaptantechdigital.com/ | grep -c "<h1"
```

Beklenen: 1 → `404`, 2 → hepsi `200`, 3 → `46` ve robots içeriği, 4 → `200`, 5 → `1`.

Ayrıca Search Console'da yeni host'a geçtikten sonra sitemap'i bir kez daha
gönder ve "Canlı URL'yi test et" ile bir sayfayı doğrula.

---

## 5. Formun bağlı olduğu dış servis

`/is-talebi` formu doğrudan tarayıcıdan SheetDB'ye POST atıyor
(`src/components/JobPostForm.tsx`). Host değişikliği bunu etkilemez, ortam
değişkeni de gerekmez.

Ama SheetDB'nin CORS ayarında alan adı kısıtlaması varsa yeni host'un alan adını
eklemen gerekebilir. Taşıdıktan sonra formdan bir test kaydı gönderip Sheet'e
düştüğünü doğrula.
