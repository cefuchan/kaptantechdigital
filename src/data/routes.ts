/**
 * Sitenin taranabilir rota listesi — tek kaynak.
 *
 * Hem ön render (prerender) hem de sitemap.xml üretimi bu listeyi kullanır;
 * böylece yeni bir blog yazısı veya hizmet eklendiğinde iki dosyayı ayrı ayrı
 * güncellemek gerekmez.
 */
import { blogPosts } from './blog';
import { caseStudiesData, isCaseStudyComplete } from './caseStudies';
import { serviceSlugs } from './services';

export interface RouteEntry {
  path: string;
  /** sitemap.xml <changefreq> */
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** sitemap.xml <priority> */
  priority: number;
  /** sitemap.xml <lastmod>. Verilmezse üretim tarihi kullanılır. */
  lastmod?: string;
  /**
   * Sayfa arama motorlarına sunuluyor mu?
   *
   * false olan rotalar yine ön render edilir ve siteden erişilebilir kalır —
   * yalnızca sitemap.xml dışında tutulur. Sayfanın kendisi `noindex` meta
   * etiketini SEO bileşeni üzerinden verir.
   */
  index?: boolean;
}

const staticRoutes: RouteEntry[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/hizmetler', changefreq: 'monthly', priority: 0.9 },
  { path: '/vaka-calismalari', changefreq: 'monthly', priority: 0.8 },
  { path: '/referanslar', changefreq: 'monthly', priority: 0.6 },
  { path: '/hakkimizda', changefreq: 'monthly', priority: 0.7 },
  { path: '/blog', changefreq: 'weekly', priority: 0.9 },
  { path: '/iletisim', changefreq: 'monthly', priority: 0.8 },
  { path: '/ankara-seo', changefreq: 'monthly', priority: 0.8 },
  { path: '/ankara-web-tasarim', changefreq: 'monthly', priority: 0.8 },
  { path: '/siteler', changefreq: 'monthly', priority: 0.8 },
  { path: '/ostim-ivedik', changefreq: 'monthly', priority: 0.8 },
  { path: '/saglik-turizmi-seo', changefreq: 'monthly', priority: 0.8 },
  { path: '/ankara-video-produksiyon', changefreq: 'monthly', priority: 0.8 },
  { path: '/is-talebi', changefreq: 'monthly', priority: 0.5 }
];

export function allRoutes(): RouteEntry[] {
  return [
    ...staticRoutes,
    ...serviceSlugs.map(
      (slug): RouteEntry => ({
        path: `/hizmetler/${slug}`,
        changefreq: 'monthly',
        priority: 0.8
      })
    ),
    // Anlatısı tamamlanmamış vakalar noindex yayınlanır ve site haritasına
    // girmez; sayfa yine ön render edilip listeden erişilebilir kalır.
    ...caseStudiesData.map(
      (study): RouteEntry => ({
        path: `/vaka-calismalari/${study.id}`,
        changefreq: 'monthly',
        priority: 0.6,
        index: isCaseStudyComplete(study)
      })
    ),
    ...blogPosts.map(
      (post): RouteEntry => ({
        path: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: post.datePublished
      })
    )
  ];
}

/** Ön render için sade yol listesi — indekslenmeyenler dahil. */
export function allPaths(): string[] {
  return allRoutes().map((route) => route.path);
}

/** sitemap.xml'e girecek rotalar. */
export function indexableRoutes(): RouteEntry[] {
  return allRoutes().filter((route) => route.index !== false);
}
