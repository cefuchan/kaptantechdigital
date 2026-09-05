/**
 * Hizmet veren ağı üyelikleri.
 *
 *   POST /api/uyeler  -> yeni üye kaydı, paylaşılabilir kart adresi döner
 *   GET  /api/uyeler  -> yayın onayı veren aktif üyelerin listesi
 *
 * GET ucu kişisel veri döndürmez: yalnızca ad, firma, kategori, hizmetler ve
 * üyenin kendi paylaştığı profil bağlantıları. Telefon ve e-posta HİÇBİR
 * durumda listede yer almaz — üye kendi kartında göstermeyi seçse bile liste
 * ucundan sızmamalı.
 */
import { type Env, bad, clean, json, normalizePhone, now, tooManyRecent, guard } from '../_lib';

const KATEGORILER = [
  'Yazılım & Tasarım',
  'Ev Tadilat & Usta',
  'Nakliyat & Taşımacılık',
  'Temizlik',
  'Diğer'
];

/** Türkçe harfleri ASCII'ye indirger; adres satırında bozulmasın diye. */
const TR: Record<string, string> = {
  ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i', ö: 'o', Ö: 'o',
  ş: 's', Ş: 's', ü: 'u', Ü: 'u', I: 'i'
};

function slugify(text: string): string {
  return text
    .split('')
    .map((ch) => TR[ch] ?? ch)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

/** Profil bağlantısı: yalnızca https ve beklenen alan adı kabul edilir. */
function profilLinki(raw: unknown, alanAdi: string): string | null {
  const value = clean(raw, 200);
  if (!value) return null;

  // Kullanıcı sadece kullanıcı adı yazmış olabilir.
  const kullaniciAdi = value.replace(/^@/, '');
  if (/^[A-Za-z0-9._-]{1,60}$/.test(kullaniciAdi)) {
    return `https://${alanAdi}/${kullaniciAdi}`;
  }

  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (!url.hostname.endsWith(alanAdi.split('/')[0])) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function webLinki(raw: unknown): string | null {
  const value = clean(raw, 200);
  if (!value) return null;
  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export const onRequestPost: PagesFunction<Env> = guard(async ({ request, env }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad('Geçersiz istek.');
  }

  const ad = clean(body.ad, 120);
  const firma = clean(body.firma, 140);
  const hizmetler = clean(body.hizmetler, 400);
  const eposta = clean(body.eposta, 160);
  const telefonHam = clean(body.telefon, 40);
  const telefon = telefonHam ? normalizePhone(telefonHam) : '';
  const kategori = KATEGORILER.includes(String(body.kategori)) ? String(body.kategori) : KATEGORILER[4];

  if (!ad || ad.length < 3) return bad('Ad ve soyadınızı yazın.');
  if (!hizmetler) return bad('Verdiğiniz hizmetleri yazın.');
  if (telefonHam && !telefon) return bad('Telefon numarası geçersiz. Boş bırakabilirsiniz.');
  if (eposta && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(eposta)) return bad('E-posta adresi geçersiz.');
  if (body.kvkkOnay !== true) return bad('Devam etmek için aydınlatma metnini onaylamanız gerekiyor.');
  if (body.yayinOnayi !== true) {
    return bad('Bilgilerinizin ağ sayfasında yayınlanmasını onaylamanız gerekiyor.');
  }

  if (await tooManyRecent(env.DB, 'providers', 10, 30)) {
    return bad('Şu an çok fazla kayıt alıyoruz, birkaç dakika sonra tekrar deneyin.', 429);
  }

  // Aynı kişi formu tekrar doldurursa yeni kayıt açmak yerine güncellensin.
  const mevcut = telefon
    ? await env.DB.prepare('SELECT slug FROM providers WHERE telefon = ?')
        .bind(telefon)
        .first<{ slug: string }>()
    : null;

  // Mevcut slug adres biçimine uymuyorsa (eski kayıtlardan gelmiş olabilir)
  // yenisini üretiyoruz; /kart/<slug> ucu yalnızca [a-z0-9-] kabul ediyor.
  const slugGecerli = mevcut ? /^[a-z0-9-]{1,60}$/.test(mevcut.slug) : false;
  const slug = slugGecerli
    ? (mevcut as { slug: string }).slug
    : `${slugify(ad) || 'uye'}-${Math.random().toString(36).slice(2, 6)}`;

  const alanlar = {
    slug,
    ad,
    firma: firma || null,
    telefon: telefon || null,
    eposta: eposta || null,
    kategori,
    hizmetler,
    linkedin: profilLinki(body.linkedin, 'linkedin.com/in'),
    instagram: profilLinki(body.instagram, 'instagram.com'),
    behance: profilLinki(body.behance, 'behance.net'),
    websitesi: webLinki(body.websitesi)
  };

  if (mevcut && slugGecerli) {
    await env.DB.prepare(
      `UPDATE providers SET ad=?, firma=?, eposta=?, kategori=?, hizmetler=?,
              linkedin=?, instagram=?, behance=?, websitesi=?,
              yayin_onayi=1, kvkk_onayi=1, aktif=1, updated_at=?
        WHERE slug=?`
    )
      .bind(
        alanlar.ad, alanlar.firma, alanlar.eposta, alanlar.kategori, alanlar.hizmetler,
        alanlar.linkedin, alanlar.instagram, alanlar.behance, alanlar.websitesi,
        now(), slug
      )
      .run();
  } else {
    // Eski, biçimsiz slug'lı kayıt varsa temizlenir; yerine geçerli olan yazılır.
    if (mevcut) await env.DB.prepare('DELETE FROM providers WHERE slug = ?').bind(mevcut.slug).run();
    await env.DB.prepare(
      `INSERT INTO providers
         (slug, ad, firma, telefon, eposta, kategori, hizmetler,
          linkedin, instagram, behance, websitesi,
          yayin_onayi, kvkk_onayi, aktif, created_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,1,1,1,?)`
    )
      .bind(
        alanlar.slug, alanlar.ad, alanlar.firma, alanlar.telefon, alanlar.eposta,
        alanlar.kategori, alanlar.hizmetler,
        alanlar.linkedin, alanlar.instagram, alanlar.behance, alanlar.websitesi,
        now()
      )
      .run();
  }

  return json({ slug, kartUrl: `/kart/${slug}`, guncellendi: Boolean(mevcut) }, 201);
});

export const onRequestGet: PagesFunction<Env> = guard(async ({ env }) => {
  const { results } = await env.DB.prepare(
    `SELECT slug, ad, firma, kategori, hizmetler, linkedin, instagram, behance, websitesi
       FROM providers
      WHERE aktif = 1 AND yayin_onayi = 1
      ORDER BY kategori, ad`
  ).all();

  return json({ toplam: results?.length ?? 0, uyeler: results ?? [] });
});
