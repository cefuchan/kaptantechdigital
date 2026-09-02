/**
 * Hizmet veren ağına (WhatsApp grubuna) yapıştırılacak ilan metni ve
 * Google Sheet aynası.
 *
 * Metin neden sunucuda üretiliyor: içine teklif linki giriyor, o link de
 * `public_id`'den doğuyor ve public_id yalnızca kayıt oluşturulduğunda,
 * sunucuda biliniyor.
 *
 * ÖNEMLİ: metin talep sahibinin adını ve telefonunu YALNIZCA kendisi açık
 * rıza verdiyse içerir. Bu kural /kvkk sayfasında ve gruba yazılı olarak
 * taahhüt edildi; koşulu gevşetmek o sözü bozar.
 */

const DIVIDER = '━━━━━━━━━━━━━━━━━━━';

export interface IlanGirdisi {
  baslik: string;
  kategori: string;
  konum: string;
  butce: string;
  detaylar: string;
  musteri: string;
  telefon: string;
  paylasimOnayi: boolean;
  publicId: string;
  origin: string;
}

export function buildIlanMetni(v: IlanGirdisi): string {
  const yoksa = (value: string) => value.trim() || 'Belirtilmedi';

  const iletisim = v.paylasimOnayi
    ? [
        '',
        `👤 *İletişim:* ${v.musteri}`,
        `📞 *WhatsApp:* https://wa.me/${v.telefon}`,
        '_Talep sahibi iletişim bilgisinin paylaşılmasına onay verdi._'
      ]
    : ['', '_Talep sahibi iletişim bilgisini paylaşmamayı seçti; teklifler üzerinden kendisi ulaşacak._'];

  return [
    '📢 *YENİ İŞ TALEBİ*',
    DIVIDER,
    `📌 *İş:* ${v.baslik}`,
    `🏷️ *Kategori:* ${v.kategori}`,
    `📍 *Konum:* ${yoksa(v.konum)}`,
    `💰 *Bütçe:* ${yoksa(v.butce)}`,
    '',
    '📝 *Detaylar:*',
    v.detaylar,
    ...iletisim,
    DIVIDER,
    `👉 *Teklif vermek için:* ${v.origin}/is/${v.publicId}`,
    '_Katılım ve teklif vermek ücretsizdir, komisyon alınmaz._'
  ].join('\n');
}

/**
 * Kaydı Google Sheet'e de yazar — tablo, günlük işleyişte kullanılan panel.
 *
 * Başarısız olursa yutulur: kayıt zaten D1'e yazıldı ve asıl kaynak orası.
 * Bu çağrı `waitUntil` ile yapılmalı, yanıtı geciktirmesin.
 *
 * Sütun adları tablodaki başlık satırıyla BİREBİR aynı olmalı; SheetDB
 * eşleşmeyen anahtarı sessizce atar ve sütun boş kalır.
 */
export async function sheetAynasi(
  url: string | undefined,
  satir: Record<string, string>
): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [satir] })
    });
  } catch {
    // Tablo yazımı başarısız olsa da talep geçerlidir.
  }
}
