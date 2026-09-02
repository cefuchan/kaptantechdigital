# KVKK: saklama, imha ve doğrulama yordamı

Bu dosya **iç kullanım içindir** — sitede yayınlanmaz. Sitede yayınlanan
aydınlatma metni: [`/kvkk`](https://kaptantechdigital.com/kvkk)
(kaynağı `src/data/kvkk.ts`).

Gruba 1 Eylül 2026'da yazılı olarak "proje sonlandığında verileriniz imha
edilecek" taahhüdü verildi. Aşağıdaki yordam o sözü tutulabilir hale getirir.
Yordam işletilmezse taahhüt beyanda kalır.

---

## 1. Saklama süresi

**Talep kapandıktan sonra en fazla 30 gün.**

Bu süre üç yerde birden geçiyor ve **üçü de aynı kalmalı**:

- `src/data/kvkk.ts` içindeki `RETENTION_DAYS`
- `/kvkk` sayfasındaki "Ne kadar süre saklanıyor?" bölümü (aynı sabitten gelir)
- Gruba verilen söz

Süreyi değiştirirsen `RETENTION_DAYS` sabitini güncelle; sayfa kendiliğinden
uyar. Gruba da düzeltme geç.

---

## 2. Aylık temizlik (ayın ilk iş günü, ~10 dakika)

Google Sheet'te:

1. `Tarih` sütununa göre sırala.
2. 30 günden eski **ve** kapanmış talepleri seç.
3. Şu sütunları temizle: `Musteri`, `Telefon`, `WhatsApp`, `Ilan_Metni`
   (ilan metni onay verilmişse iletişim bilgisi içerir).
4. `Baslik`, `Kategori`, `Butce`, `Konum` kalabilir — kişisel veri taşımaz ve
   ileride fiyat aralığı içeriği için lazım olacak.
5. Silinen satır sayısını aşağıdaki kayıt tablosuna yaz.

> **Neden tüm satırı silmiyoruz:** Kişisel veri sütunları boşaltıldığında
> kalan bilgi kimseyle ilişkilendirilemez, yani artık kişisel veri değildir.
> "Ankara Çankaya, boya işi, 15-20 bin TL" verisini tutmak hem KVKK açısından
> sorun değil hem de ileride kategori sayfalarındaki gerçek fiyat aralıkları
> için tek kaynağın olacak.

### İmha kayıt tablosu

Denetim istenirse tek dayanağın bu. Sheet'te ikinci bir sekmeye tut.

| Tarih | Temizlenen satır | Yapan |
|---|---|---|
| | | |

---

## 3. Silme talebi gelirse

Biri "verilerimi silin" derse:

1. Sheet'te `Telefon` sütununda ara.
2. Bulunan satırlarda `Musteri`, `Telefon`, `WhatsApp`, `Ilan_Metni` sütunlarını temizle.
3. Kişi WhatsApp grubundaysa ve çıkmak istiyorsa gruptan çıkar.
4. Kayıt tablosuna yaz ve kişiye "silindi" yanıtı ver.

**Yasal süre 30 gün, ücret alınamaz.** Pratikte aynı gün hallet — zaten 2 dakikalık iş.

Şunu söyleme: *"tüm verileriniz tamamen silindi."* WhatsApp grubundaki eski
mesajlar üyelerin cihazlarında kalır, senin silme yetkin yok. Doğrusu:
*"Kayıtlarımdaki kişisel verileriniz silindi. Grupta paylaşılmış mesajlarda
adınız ve numaranız zaten yer almıyordu."*

---

## 4. Talep doğrulama (gruba göndermeden önce)

Freelancer'ın en büyük riski **sahte talebe emek harcamak**. Anonim talep;
fiyat toplamak isteyenleri, rakip keşfini ve ciddi olmayan merakı çeker. Üç kez
boşluğa teklif veren dördüncüde vermez.

Komisyonsuz aracının kattığı asıl değer burada: **sen ayıklıyorsun.**

Gruba atmadan önce en az birini doğrula:

- [ ] Web sitesi veya sosyal medya hesabı var mı, iş tanımıyla uyuşuyor mu?
- [ ] Numara aranıyor mu, açan kişi talebi teyit ediyor mu?
- [ ] Şirketse: unvan ve vergi numarası tutarlı mı?
- [ ] Bütçe aralığı işin gerçeğiyle makul ölçüde uyumlu mu?

Doğruladıktan sonra, kopyaladığın ilan metninin **en başına** şu satırı ekle:

```
✅ Talep doğrulandı — firma teyit edildi
```

Doğrulayamadıysan bu satırı **ekleme**. Rozeti her talebe koyarsan hiçbir şey
ifade etmez; asıl değeri, konulmadığında da bir anlam taşımasından gelir.

> Not: Bu satır otomatik eklenmiyor, bilerek. Kod "doğrulandı" yazamaz, çünkü
> doğrulamayı yapan sensin. Otomatik yazsaydı rozet yalan olurdu.

---

## 5. Gruba sabitlenecek metin

Aşağıdakini WhatsApp grubunda **sabitle** (mesaja uzun bas → Sabitle).
Freelancer tarafının aydınlatması bu; formda karşılığı yok çünkü teklifler
şu an WhatsApp üzerinden geliyor.

```
📌 TOPLULUK KURALLARI VE VERİ POLİTİKASI

• Ağa katılmak, teklif vermek ve iş almak ücretsizdir. Hiçbir aşamada
  komisyon alınmaz.

• Bir talebe teklif verdiğinizde, teklifiniz ve iletişim bilgileriniz
  yalnızca o talebi oluşturan kişiyle paylaşılır. Başka hizmet verenlerle,
  üçüncü taraflarla veya herkese açık bir yerde paylaşılmaz.

• Talep sonuçlandıktan sonra teklif kayıtlarınız en geç 30 gün içinde
  silinir. Verilerinizin silinmesini istediğinizde bana yazmanız yeterli.

• Talep sahiplerinin iletişim bilgisi varsayılan olarak paylaşılmaz. Talep
  sahibi açıkça onay verirse ilanda yer alır; vermezse gelen teklifler
  arasından seçtiği kişiye kendisi ulaşır. Bunun sebebi talep sahibini
  onlarca soğuk aramadan korumak — aksi halde kimse ikinci kez talep açmaz.

• "✅ Talep doğrulandı" satırı taşıyan ilanlarda firmayı bizzat teyit ettim.
  Bu satır yoksa teyit edilmemiş demektir; teklif verirken bunu göz önünde
  bulundurun.

• Aracı benim, ama komisyon almıyorum. Kazancım, dijital işleri kendim
  yapmam ve ağın büyümesi. Bu yüzden sistem kapanmaz.

Sorusu olan doğrudan yazabilir.
```

---

## 6. Bu dosya ne zaman güncellenmeli

- Teklif formu eklenirse → freelancer aydınlatması siteye taşınmalı,
  gruptaki sabit mesaj ona işaret etmeli
- Hosting veya veri deposu değişirse → `/kvkk` "Veriler nerede tutuluyor?"
  bölümü güncellenmeli
- Yeni bir hizmet sağlayıcı eklenirse (e-posta servisi, CRM, analitik) →
  aydınlatma metnine eklenmeli
- Saklama süresi değişirse → `RETENTION_DAYS` + gruba düzeltme

---

*Bu belge pratik bir işletme yordamıdır, hukuki mütalaa değildir. Sistem
büyüdüğünde veya kurumsal müşteriye satış yapacağın noktada bir avukata
gözden geçirtmek isteyebilirsin — özellikle VERBİS kayıt yükümlülüğü senin
ölçeğinde doğuyor mu sorusu için.*
