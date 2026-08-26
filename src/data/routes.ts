/**
 * Sitenin taranabilir rota listesi — tek kaynak.
 *
 * Hem ön render (prerender) hem de sitemap.xml üretimi bu listeyi kullanır;
 * böylece yeni bir blog yazısı veya hizmet eklendiğinde iki dosyayı ayrı ayrı
 * güncellemek gerekmez.
 */
import { blogPosts } from './blog';
import { caseStudySlugs } from './caseStudies';
import { serviceSlugs } from './services';

export interface RouteEntry {
  path: string;
  /** sitemap.xml <changefreq> */
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** sitemap.xml <priority> */
  priority: number;
  /** sitemap.xml <lastmod>. Verilmezse üretim tarihi kullanılır. */
  lastmod?: string;
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
  { path: '/siteler', changefreq: 'monthly', priority: 0.8 }
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
    ...caseStudySlugs.map(
      (slug): RouteEntry => ({
        path: `/vaka-calismalari/${slug}`,
        changefreq: 'monthly',
        priority: 0.6
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

/** Ön render için sade yol listesi. */
export function allPaths(): string[] {
  return allRoutes().map((route) => route.path);
}
