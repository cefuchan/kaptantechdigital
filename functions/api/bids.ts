/**
 * POST /api/bids — bir ilana teklif verir.
 *
 * Kimlik doğrulama girişsiz yapılır: teklif veren numara `providers`
 * tablosunda kayıtlı olmalıdır. Link WhatsApp grubundan dışarı sızsa bile
 * ağın dışındaki biri teklif veremez.
 *
 * Aynı numara aynı işe ikinci kez teklif verirse yeni satır açılmaz,
 * mevcut teklif güncellenir (UNIQUE(job_id, telefon)).
 */
import { type Env, bad, clean, json, normalizePhone, now, tooManyRecent } from '../_lib';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad('Geçersiz istek.');
  }

  const publicId = clean(body.publicId, 12);
  const telefon = normalizePhone(body.telefon as string);
  const fiyat = clean(body.fiyat, 60);
  const baslama = clean(body.baslama, 80);
  const notMetni = clean(body.not, 1200);

  if (!/^[A-Za-z0-9]{12}$/.test(publicId)) return bad('İlan bulunamadı.', 404);
  if (!telefon) return bad('Geçerli bir cep numarası girin.');

  const job = await env.DB.prepare(
    `SELECT id, durum, expires_at, purged_at FROM jobs WHERE public_id = ?`
  )
    .bind(publicId)
    .first<{ id: number; durum: string; expires_at: string; purged_at: string | null }>();

  if (!job) return bad('İlan bulunamadı.', 404);
  if (job.purged_at !== null || new Date(job.expires_at) < new Date() || job.durum !== 'acik') {
    return bad('Bu ilan kapanmış, artık teklif alınmıyor.', 410);
  }

  // Allowlist: teklif verebilmek için ağa kayıtlı olmak gerekir.
  const provider = await env.DB.prepare(
    `SELECT ad FROM providers WHERE telefon = ? AND aktif = 1`
  )
    .bind(telefon)
    .first<{ ad: string }>();

  if (!provider) {
    return bad(
      'Bu numara hizmet veren ağımızda kayıtlı değil. Ağa katılmak için WhatsApp’tan yazabilirsiniz.',
      403
    );
  }

  if (await tooManyRecent(env.DB, 'bids', 10, 60)) {
    return bad('Şu an çok fazla teklif alıyoruz, birkaç dakika sonra tekrar deneyin.', 429);
  }

  await env.DB.prepare(
    `INSERT INTO bids (job_id, ad, telefon, fiyat, baslama, not_metni, created_at)
     VALUES (?,?,?,?,?,?,?)
     ON CONFLICT (job_id, telefon) DO UPDATE SET
       fiyat = excluded.fiyat,
       baslama = excluded.baslama,
       not_metni = excluded.not_metni,
       created_at = excluded.created_at`
  )
    .bind(job.id, provider.ad, telefon, fiyat || null, baslama || null, notMetni || null, now())
    .run();

  return json({ tamam: true }, 201);
};
