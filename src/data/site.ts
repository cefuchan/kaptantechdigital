/**
 * Tüm sayfaların ve yapılandırılmış verilerin paylaştığı marka bilgileri.
 * Tek kaynak: burada değişen bilgi meta etiketlere ve JSON-LD'ye birlikte yansır.
 */
export const SITE_URL = 'https://kaptantechdigital.com';

/**
 * Kurucu / sorumlu uzman.
 *
 * Yapay zekâ motorları uzmanlığı kuruma değil kişiye bağlamayı tercih eder.
 * `name` doldurulduğu anda Person şeması devreye girer, Organization'a
 * `founder` olarak bağlanır ve blog yazılarının yazarı bu kişi olur.
 * Boş bırakıldığı sürece hiçbir kişi bilgisi yayınlanmaz.
 */
export const founder = {
  name: 'Cafer İhsan Arpacı',
  jobTitle: 'Kurucu & SEO / GEO Uzmanı',
  /** Kişisel LinkedIn profili — varlık doğrulaması için önemli. */
  linkedin: 'https://www.linkedin.com/in/cefuchan/',
  github: 'https://github.com/cefuchan',
  bio:
    'KAPTAN Dijital Büyüme Stüdyosu’nun kurucusu. Ankara merkezli olarak SEO, ' +
    'GEO ve performans pazarlaması alanlarında kurumsal markalara danışmanlık veriyor.'
};

/** Footer'da görünen ve sameAs olarak beyan edilen profiller. */
export const socialProfiles = [
  { label: 'Instagram', url: 'https://instagram.com/kaptantechdigital' },
  { label: 'LinkedIn', url: 'https://linkedin.com/company/kaptantechdigital' },
  { label: 'GitHub', url: 'https://github.com/cefuchan' }
];

/** Hizmet verilen Ankara bölgeleri — LocalBusiness.areaServed için. */
export const servedDistricts = [
  'Altındağ',
  'Siteler',
  'Ostim',
  'İvedik OSB',
  'Çankaya',
  'Yenimahalle',
  'Keçiören'
];

/** Organization.knowsAbout — hangi konularda yetkin olduğumuzun açık beyanı. */
export const expertise = [
  'Arama Motoru Optimizasyonu (SEO)',
  'Generative Engine Optimization (GEO)',
  'Yerel SEO ve Google İşletme Profili Yönetimi',
  'Teknik SEO ve Core Web Vitals',
  'Kurumsal Web Tasarımı',
  'E-ticaret Web Geliştirme',
  'Google Ads Kampanya Yönetimi',
  'Meta (Facebook & Instagram) Reklamcılığı',
  'Kurumsal Video Prodüksiyon',
  'B2B Sanayi Dijital Pazarlaması',
  'Sağlık Turizmi Dijital Pazarlaması'
];

const telephone = '+90 551 136 76 34';

export const site = {
  url: SITE_URL,
  name: 'KAPTAN',
  legalName: 'KAPTAN Dijital Büyüme Stüdyosu',
  alternateName: 'KaptanTech Digital',
  tagline: 'Ankara Dijital Büyüme Stüdyosu',
  description:
    'Ankara merkezli dijital büyüme stüdyosu — SEO, GEO, Web Tasarım, Google & Meta Reklam Yönetimi ve Video Prodüksiyon.',
  locale: 'tr_TR',
  language: 'tr',
  telephone,
  /** wa.me biçimi: sadece rakam, ülke koduyla birlikte. */
  whatsapp: telephone.replace(/\D/g, ''),
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
  /** Doğrulanabilir profiller. Yeni profil eklerken socialProfiles'ı güncelleyin. */
  sameAs: [
    ...socialProfiles.map((profile) => profile.url),
    founder.linkedin,
    founder.github
  ].filter(Boolean),
  /** Cumartesi de açık. Farklı saat uygulanıyorsa ikinci bir satır ekleyin. */
  openingHours: 'Mo-Sa 09:00-18:00',
  foundingDate: '2017',
  defaultImage: `${SITE_URL}/og-image.png`,
  imageWidth: 1200,
  imageHeight: 630
};

/** Göreli yolu her zaman mutlak ve tekrarsız bir kanonik URL'e çevirir. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = `/${path}`.replace(/\/{2,}/g, '/');
  const withoutTrailingSlash = normalized.length > 1 ? normalized.replace(/\/+$/, '') : '/';
  return `${SITE_URL}${withoutTrailingSlash}`;
}
