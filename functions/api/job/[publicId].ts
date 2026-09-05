/**
 * GET /api/job/<publicId> — hizmet verenlere gösterilecek ilan detayı.
 *
 * GİZLİLİK KURALI: talep sahibinin adı ve telefonu yalnızca kendisi
 * `paylasim_onayi` verdiyse döner. Bu, /kvkk sayfasında ve gruba yazılı
 * olarak taahhüt edilen kuraldır; buradaki koşulu gevşetmek o sözü bozar.
 *
 * Teklif veren kişilerin bilgileri de dönmez — sadece kaç teklif geldiği.
 * Rakip fiyatlarını görmek teklifleri aşağı çeker ve hizmet verenin
 * güvenini bozar.
 */
import { type Env, json, guard } from '../../_lib';

interface JobRow {
  id: number;
  baslik: string;
  kategori: string;
  konum: string | null;
  butce: string | null;
  detaylar: string;
  musteri: string | null;
  telefon: string | null;
  paylasim_onayi: number;
  dogrulandi: number;
  durum: string;
  created_at: string;
  expires_at: string;
  purged_at: string | null;
}

export const onRequestGet: PagesFunction<Env> = guard(async ({ params, env }) => {
  const publicId = String(params.publicId ?? '');
  if (!/^[A-Za-z0-9]{12}$/.test(publicId)) return json({ hata: 'Bulunamadı.' }, 404);

  const job = await env.DB.prepare(
    `SELECT id, baslik, kategori, konum, butce, detaylar, musteri, telefon,
            paylasim_onayi, dogrulandi, durum, created_at, expires_at, purged_at
       FROM jobs WHERE public_id = ?`
  )
    .bind(publicId)
    .first<JobRow>();

  if (!job) return json({ hata: 'Bulunamadı.' }, 404);

  const suresiDoldu = job.purged_at !== null || new Date(job.expires_at) < new Date();

  const teklifSayisi = await env.DB.prepare('SELECT COUNT(*) AS n FROM bids WHERE job_id = ?')
    .bind(job.id)
    .first<{ n: number }>();

  const paylasiliyor = job.paylasim_onayi === 1 && !suresiDoldu;

  return json({
    baslik: job.baslik,
    kategori: job.kategori,
    konum: job.konum,
    butce: job.butce,
    detaylar: job.detaylar,
    dogrulandi: job.dogrulandi === 1,
    durum: suresiDoldu ? 'kapali' : job.durum,
    olusturma: job.created_at,
    teklifSayisi: teklifSayisi?.n ?? 0,
    // Yalnızca açık rıza varsa:
    iletisim: paylasiliyor ? { ad: job.musteri, telefon: job.telefon } : null
  });
});
