/**
 * Talep sahibinin özel ucu. Token, tahmin edilemez 32 karakterlik anahtardır.
 *
 *   GET  /api/owner/<token>  -> talep + gelen tekliflerin tamamı
 *   POST /api/owner/<token>  -> {islem:'sec', bidId} | {islem:'kapat'}
 *
 * Hizmet verenin iletişim bilgisi, talep sahibi o teklifle ilerlemeye karar
 * verene kadar DÖNMEZ. Bu, iki tarafa da verilen sözün kod karşılığı:
 * "iletişim bilgisi ancak bir teklifle ilerlemeye karar verdiğinizde
 * paylaşılır". Seçim kaydı aynı zamanda tek geri besleme kanalıdır —
 * komisyon alınmadığı için hangi işin tuttuğu başka yerden öğrenilemiyor.
 */
import { type Env, bad, json } from '../../_lib';

interface JobRow {
  id: number;
  public_id: string;
  baslik: string;
  kategori: string;
  konum: string | null;
  butce: string | null;
  detaylar: string;
  durum: string;
  dogrulandi: number;
  created_at: string;
  expires_at: string;
  purged_at: string | null;
}

async function loadJob(env: Env, token: string): Promise<JobRow | null> {
  if (!/^[A-Za-z0-9]{32}$/.test(token)) return null;
  return env.DB.prepare(
    `SELECT id, public_id, baslik, kategori, konum, butce, detaylar, durum,
            dogrulandi, created_at, expires_at, purged_at
       FROM jobs WHERE owner_token = ?`
  )
    .bind(token)
    .first<JobRow>();
}

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const job = await loadJob(env, String(params.token ?? ''));
  if (!job) return json({ hata: 'Bulunamadı.' }, 404);

  const suresiDoldu = job.purged_at !== null || new Date(job.expires_at) < new Date();

  const { results } = await env.DB.prepare(
    `SELECT id, ad, telefon, fiyat, baslama, not_metni, created_at, secildi
       FROM bids WHERE job_id = ? ORDER BY created_at ASC`
  )
    .bind(job.id)
    .all<{
      id: number;
      ad: string;
      telefon: string;
      fiyat: string | null;
      baslama: string | null;
      not_metni: string | null;
      created_at: string;
      secildi: number | null;
    }>();

  return json({
    baslik: job.baslik,
    kategori: job.kategori,
    konum: job.konum,
    butce: job.butce,
    detaylar: job.detaylar,
    durum: suresiDoldu ? 'kapali' : job.durum,
    ilanUrl: `/is/${job.public_id}`,
    olusturma: job.created_at,
    sonGecerlilik: job.expires_at,
    teklifler: (results ?? []).map((bid) => ({
      id: bid.id,
      ad: bid.ad,
      fiyat: bid.fiyat,
      baslama: bid.baslama,
      not: bid.not_metni,
      tarih: bid.created_at,
      secildi: bid.secildi === 1,
      // Numara yalnızca "bu teklifle ilerle" dendikten sonra açılır.
      telefon: bid.secildi === 1 ? bid.telefon : null
    }))
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ params, request, env }) => {
  const job = await loadJob(env, String(params.token ?? ''));
  if (!job) return json({ hata: 'Bulunamadı.' }, 404);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad('Geçersiz istek.');
  }

  if (body.islem === 'kapat') {
    await env.DB.prepare(`UPDATE jobs SET durum = 'kapali' WHERE id = ?`).bind(job.id).run();
    return json({ tamam: true });
  }

  if (body.islem === 'sec') {
    const bidId = Number(body.bidId);
    if (!Number.isInteger(bidId)) return bad('Teklif seçilemedi.');

    const updated = await env.DB.prepare(
      `UPDATE bids SET secildi = 1 WHERE id = ? AND job_id = ?`
    )
      .bind(bidId, job.id)
      .run();

    if (!updated.meta.changes) return bad('Teklif bulunamadı.', 404);

    const bid = await env.DB.prepare(`SELECT ad, telefon FROM bids WHERE id = ?`)
      .bind(bidId)
      .first<{ ad: string; telefon: string }>();

    return json({ tamam: true, iletisim: bid });
  }

  return bad('Bilinmeyen işlem.');
};
