/**
 * POST /api/jobs — yeni iş talebi oluşturur.
 *
 * Dönen `ownerUrl`, talep sahibinin tekliflerini göreceği özel adrestir ve
 * SADECE burada bir kez döner; kaybedilirse yeniden üretilemez, elle
 * bulunup gönderilmesi gerekir.
 *
 * Bilerek YOK: bütün işleri listeleyen bir uç. "Kimse toplu iş göremesin"
 * kuralı buna dayanıyor — böyle bir uç eklenirse kural çöker.
 */
import {
  type Env,
  RETENTION_DAYS,
  bad,
  clean,
  json,
  normalizePhone,
  now,
  phoneForSheet,
  plusDays,
  randomId,
  tooManyRecent, guard } from '../_lib';
import { buildIlanMetni, sheetAynasi } from '../_ilan';

/** SHEETDB_URL ortam degiskeni tanimli degilse kullanilir. Gizli bilgi degil. */
const SHEETDB_FALLBACK = 'https://sheetdb.io/api/v1/4fptt41pnlx4a';

const KATEGORILER = [
  'Yazılım & Tasarım',
  'Ev Tadilat & Usta',
  'Nakliyat & Taşımacılık',
  'Temizlik',
  'Diğer'
];

export const onRequestPost: PagesFunction<Env> = guard(async ({ request, env, waitUntil }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad('Geçersiz istek.');
  }

  const baslik = clean(body.baslik, 140);
  const detaylar = clean(body.detaylar, 4000);
  const musteri = clean(body.musteri, 120);
  const telefon = normalizePhone(body.telefon as string);
  const eposta = clean(body.eposta, 160);
  const kategori = KATEGORILER.includes(String(body.kategori)) ? String(body.kategori) : KATEGORILER[4];
  const konum = clean(body.konum, 160);
  const butce = clean(body.butce, 80);

  if (!baslik) return bad('İş başlığı zorunludur.');
  if (detaylar.length < 20) return bad('İşin detaylarını biraz daha ayrıntılı yazın.');
  if (!musteri) return bad('İsim veya şirket adı zorunludur.');
  if (!telefon) return bad('Geçerli bir cep numarası girin.');
  if (body.kvkkOnay !== true) return bad('Aydınlatma metnini onaylamanız gerekiyor.');
  if (eposta && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(eposta)) return bad('E-posta adresi geçersiz.');

  // Sistem geneli kaba sınır: tek oturumda toplu kayıt açılmasını engeller.
  if (await tooManyRecent(env.DB, 'jobs', 10, 20)) {
    return bad('Şu an çok fazla talep alıyoruz, birkaç dakika sonra tekrar deneyin.', 429);
  }

  // Süresi dolmuş kayıtların kişisel verilerini burada temizliyoruz.
  // Cloudflare Pages'te cron yok; her yeni talepte yapmak, ayrı bir Worker
  // kurmadan 30 günlük imha sözünü otomatik tutmanın en basit yolu.
  // Satır silinmiyor: kişisel sütunlar boşaltılınca kalan kayıt kimseyle
  // ilişkilendirilemez, yani artık kişisel veri değil — ve fiyat aralığı
  // içeriği için değerli.
  await env.DB.prepare(
    `UPDATE jobs
        SET musteri = NULL, telefon = NULL, eposta = NULL,
            durum = 'kapali', purged_at = ?
      WHERE purged_at IS NULL AND expires_at < ?`
  )
    .bind(now(), now())
    .run();
  await env.DB.prepare(
    `DELETE FROM bids WHERE job_id IN (SELECT id FROM jobs WHERE purged_at IS NOT NULL)`
  ).run();

  const publicId = randomId(12);
  const ownerToken = randomId(32);
  const createdAt = now();

  await env.DB.prepare(
    `INSERT INTO jobs
       (public_id, owner_token, baslik, kategori, konum, butce, detaylar,
        musteri, telefon, eposta, paylasim_onayi, kvkk_onayi, durum,
        created_at, expires_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,'acik',?,?)`
  )
    .bind(
      publicId,
      ownerToken,
      baslik,
      kategori,
      konum || null,
      butce || null,
      detaylar,
      musteri,
      telefon,
      eposta || null,
      body.paylasimOnayi === true ? 1 : 0,
      1,
      createdAt,
      plusDays(RETENTION_DAYS)
    )
    .run();

  // Google Sheet aynası: tablo, günlük işleyişte kullanılan panel. Yanıtı
  // geciktirmemesi için waitUntil ile arka planda gönderiliyor.
  const origin = new URL(request.url).origin;
  const ilanMetni = buildIlanMetni({
    baslik,
    kategori,
    konum,
    butce,
    detaylar,
    musteri,
    telefon,
    paylasimOnayi: body.paylasimOnayi === true,
    publicId,
    origin
  });

  waitUntil(
    sheetAynasi(env.SHEETDB_URL ?? SHEETDB_FALLBACK, {
      Tarih: new Date().toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Istanbul'
      }),
      Baslik: baslik,
      Kategori: kategori,
      Musteri: musteri,
      Telefon: phoneForSheet(telefon),
      WhatsApp: `https://wa.me/${telefon}`,
      Butce: butce || 'Belirtilmedi',
      Konum: konum || 'Belirtilmedi',
      Detaylar: detaylar,
      Ilan_Metni: ilanMetni,
      Paylasim_Onayi: body.paylasimOnayi === true ? 'Evet' : 'Hayir',
      KVKK_Onayi: 'Evet',
      Ilan_Linki: `${origin}/is/${publicId}`,
      Panel_Linki: `${origin}/talep/${ownerToken}`
    })
  );

  return json({ publicId, ownerToken, ownerUrl: `/talep/${ownerToken}`, ilanUrl: `/is/${publicId}` }, 201);
});
