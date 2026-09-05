/**
 * GET /api/uye/<slug> — tek üyenin kart verisi.
 *
 * Telefon ve e-posta DÖNMEZ. Kart herkese açık paylaşılacak bir görsel;
 * üyenin iletişim bilgisini oraya koymak, onu istemediği bir teşhire açar.
 * Kartta yalnızca kendi paylaştığı profil bağlantıları yer alır.
 */
import { type Env, json, guard } from '../../_lib';

export const onRequestGet: PagesFunction<Env> = guard(async ({ params, env }) => {
  const slug = String(params.slug ?? '');
  if (!/^[a-z0-9-]{1,60}$/.test(slug)) return json({ hata: 'Bulunamadı.' }, 404);

  const uye = await env.DB.prepare(
    `SELECT slug, ad, firma, kategori, hizmetler, linkedin, instagram, behance, websitesi
       FROM providers WHERE slug = ? AND aktif = 1`
  )
    .bind(slug)
    .first();

  if (!uye) return json({ hata: 'Bulunamadı.' }, 404);
  return json(uye);
});
