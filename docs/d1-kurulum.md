# D1 veritabanı kurulumu

Teklif sistemi Cloudflare D1 üzerinde çalışır. D1, Cloudflare'ın kendi
veritabanı servisidir — Pages projenle aynı hesapta, aynı panelde. Ayrı üyelik,
ayrı kart, ayrı ücret yok.

Bu kurulum **bir kez** yapılır, sonra bir daha dokunulmaz.

---

## Yol 1: Panelden (önerilen — komut satırı gerekmez)

### Adım 1 — Veritabanını oluştur

1. [dash.cloudflare.com](https://dash.cloudflare.com) adresine gir.
2. Sol menüde **Storage & Databases** başlığını bul, altındaki **D1 SQL Database**
   bağlantısına tıkla.
   *(Panelin sürümüne göre bu bölüm **Workers & Pages → D1** altında da olabilir.
   Menüde "D1" yazan yeri arıyorsun.)*
3. **Create database** butonuna bas.
4. **Database name** alanına tam olarak şunu yaz:

   ```
   kaptan-isler
   ```

   Bu isim `wrangler.toml` dosyasında geçtiği için birebir aynı olmalı.
5. **Location**: `Automatic` bırak. (İstersen `Europe` seçebilirsin, Türkiye'ye
   yakın olur; fark milisaniyeler mertebesinde.)
6. **Create** de.

### Adım 2 — Tabloları kur

Veritabanı boş oluştu; içine tabloları koymamız lazım.

1. Yeni oluşan veritabanına tıkla.
2. Üstteki sekmelerden **Console** sekmesine geç.
3. Projedeki `schema.sql` dosyasını bir metin düzenleyicide aç, **tamamını**
   kopyala.
4. Konsoldaki kutuya yapıştır ve **Execute** de.

Alt tarafta her komut için `success` görmelisin. Toplam 7 komut çalışır
(3 tablo + 4 indeks).

> Konsol "birden fazla komut çalıştıramıyorum" derse, `schema.sql` içindeki
> `CREATE TABLE` ve `CREATE INDEX` bloklarını tek tek yapıştırıp çalıştır.

### Adım 3 — Database ID'yi kopyala

1. Veritabanının sayfasında (Console'un yanındaki **Settings** sekmesi veya
   sayfanın üst kısmı) **Database ID** yazan bir değer var. Şuna benzer:

   ```
   a1b2c3d4-5e6f-7890-abcd-ef1234567890
   ```

2. Bunu kopyala.

### Adım 4 — ID'yi projeye yaz

Projedeki `wrangler.toml` dosyasını aç. En altta şu satır var:

```toml
database_id = "00000000-0000-4000-8000-000000000000"  # <-- WRANGLER CIKTISINDAKI GERCEK ID ILE DEGISTIR
```

Tırnak içindeki sahte değeri, 3. adımda kopyaladığın gerçek ID ile değiştir:

```toml
database_id = "a1b2c3d4-5e6f-7890-abcd-ef1234567890"
```

Kaydet, commit'le, push'la:

```bash
git add wrangler.toml && git commit -m "chore: D1 database_id ekle" && git push
```

Push ettiğin anda Cloudflare yeni bir deploy başlatır ve bağlantı devreye girer.

> **Neden panelden binding eklemiyoruz?** Projede `wrangler.toml` dosyası
> olduğu için Cloudflare Pages bağlantıları o dosyadan okur; paneldeki
> "D1 database bindings" ekranı bu durumda devre dışı kalır veya yok sayılır.
> Tek doğru yer `wrangler.toml`.
>
> Yine de deploy sonrası hata alırsan: Pages projesi → **Settings** →
> **Functions** (veya **Bindings**) → **D1 database bindings** → **Add binding**
> → Variable name `DB`, Database `kaptan-isler`. Sonra **Deployments** sekmesinden
> son dağıtımı **Retry deployment** ile tekrarla.

---

## Yol 2: Komut satırından

Terminal kullanmayı tercih edersen aynı işi üç komutla yaparsın.

```bash
npx wrangler login
```

Tarayıcı açılır, Cloudflare hesabınla giriş yapıp izin verirsin.

```bash
npx wrangler d1 create kaptan-isler
```

Çıktının sonunda `database_id = "..."` satırı görürsün. Onu `wrangler.toml`
içine yapıştır (yukarıdaki Adım 4).

```bash
npx wrangler d1 execute kaptan-isler --remote --file=./schema.sql
```

`--remote` önemli: onsuz sadece bilgisayarındaki yerel kopyaya yazar, gerçek
veritabanına değil.

Sonra commit + push.

---

## Kurulumu doğrula

Deploy bittikten sonra terminalde şunu çalıştır:

```bash
curl -s -X POST https://kaptantechdigital.com/api/jobs -H "Content-Type: application/json" -d '{"baslik":"KURULUM TESTI","kategori":"Diğer","detaylar":"Bu kayit kurulum dogrulamasi icindir, silinecek.","musteri":"Test","telefon":"05000000000","kvkkOnay":true}'
```

**Beklenen:** `publicId`, `ownerToken`, `ownerUrl` ve `ilanUrl` içeren bir JSON.

Bunu görüyorsan sistem çalışıyor. Test kaydını silmek için:

```bash
npx wrangler d1 execute kaptan-isler --remote --command "DELETE FROM jobs WHERE baslik = 'KURULUM TESTI';"
```

---

## Sık çıkan hatalar

**`no such table: jobs`**
Veritabanı oluşmuş ama şema kurulmamış. Adım 2'yi yap. Komut satırından
yaptıysan `--remote` bayrağını unutmuş olabilirsin — onsuz yerel kopyaya yazar.

**`Cannot read properties of undefined (reading 'prepare')`**
`DB` bağlantısı deploy'a geçmemiş. `wrangler.toml` içindeki `database_id`
doğru mu bak, sonra yeni bir deploy tetikle (boş bir commit yeter:
`git commit --allow-empty -m "deploy" && git push`).

**`D1_ERROR: ... UNIQUE constraint failed`**
Normal. Aynı numara aynı işe ikinci kez teklif verdiğinde tasarım gereği yeni
satır açılmaz, mevcut teklif güncellenir.

**Deploy başarılı ama `/is/...` sayfası 404**
`functions/` klasörünün repoda olduğundan emin ol. Cloudflare bu klasörü
otomatik tanır; yoksa API ve ilan sayfaları çalışmaz.

---

## Son adım: hizmet verenleri ekle

Sistem çalışsa bile **`providers` tablosu boşken kimse teklif veremez** —
allowlist kontrolü 403 döndürür.

Gruptaki kişileri şu formatta eklemek gerekiyor:

```sql
INSERT INTO providers (telefon, ad, kategoriler, aktif, created_at) VALUES
  ('905321234567', 'Murat K.',  'Ev Tadilat & Usta',  1, '2026-09-02'),
  ('905339876543', 'Ayşe D.',   'Yazılım & Tasarım',  1, '2026-09-02');
```

Telefon **905XXXXXXXXX** biçiminde olmalı: başında `0` yok, `+` yok, boşluk yok.

Listeyi bana `isim, telefon, kategori` şeklinde verirsen tüm INSERT komutunu
hazırlarım; sen sadece konsola yapıştırırsın.
