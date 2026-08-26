/**
 * Tüm sayfaların ve yapılandırılmış verilerin paylaştığı marka bilgileri.
 * Tek kaynak: burada değişen bilgi meta etiketlere ve JSON-LD'ye birlikte yansır.
 */
export const SITE_URL = 'https://kaptantechdigital.com';

export const site = {
  url: SITE_URL,
  name: 'KAPTAN',
  legalName: 'KAPTAN Dijital Büyüme Stüdyosu',
  tagline: 'Ankara Dijital Büyüme Stüdyosu',
  description:
    'Ankara merkezli dijital büyüme stüdyosu — SEO, GEO, Web Tasarım, Google & Meta Reklam Yönetimi ve Video Prodüksiyon.',
  locale: 'tr_TR',
  language: 'tr',
  telephone: '+90 551 136 76 34',
  email: 'merhaba@kaptantechdigital.com',
  address: {
    street: 'Güneşevler 71. Cadde No:1',
    district: 'Altındağ',
    city: 'Ankara',
    region: 'TR-06',
    postalCode: '06105',
    country: 'TR'
  },
  geo: {
    latitude: 39.97067346786774,
    longitude: 32.893593472347014
  },
  sameAs: [
    'https://instagram.com/kaptantechdigital',
    'https://linkedin.com/company/kaptantechdigital'
  ],
  openingHours: 'Mo-Fr 09:00-18:00',
  foundingDate: '2017',
  defaultImage: `${SITE_URL}/og-image.png`,
  imageWidth: 1200,
  imageHeight: 630
} as const;

/** Göreli yolu her zaman mutlak ve tekrarsız bir kanonik URL'e çevirir. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = `/${path}`.replace(/\/{2,}/g, '/');
  const withoutTrailingSlash = normalized.length > 1 ? normalized.replace(/\/+$/, '') : '/';
  return `${SITE_URL}${withoutTrailingSlash}`;
}
