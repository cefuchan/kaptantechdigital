import { lazy, Suspense, useMemo, type ComponentType } from 'react';
import { useRoutes } from 'react-router-dom';

/**
 * Rota tablosu — tek kaynak.
 *
 * Tarayıcıda sayfalar React.lazy ile ayrı parçalara bölünür (ilk yüklemede
 * yalnızca gereken kod iner). Ön render (prerender) sırasında ise Suspense
 * beklemesi statik çıktıyı gizli bir <div> içine ittiği için aynı modüller
 * önceden çözülüp doğrudan render edilir.
 */
export const pageLoaders = {
  Home: () => import('./pages/Home'),
  Services: () => import('./pages/Services'),
  ServiceDetail: () => import('./pages/ServiceDetail'),
  References: () => import('./pages/References'),
  CaseStudies: () => import('./pages/CaseStudies'),
  CaseStudyDetail: () => import('./pages/CaseStudyDetail'),
  About: () => import('./pages/About'),
  Blog: () => import('./pages/Blog'),
  BlogPost: () => import('./pages/BlogPost'),
  Siteler: () => import('./pages/Siteler'),
  OstimIvedik: () => import('./pages/OstimIvedik'),
  SaglikTurizmiSeo: () => import('./pages/SaglikTurizmiSeo'),
  AnkaraVideoProduksiyon: () => import('./pages/AnkaraVideoProduksiyon'),
  AnkaraSeo: () => import('./pages/AnkaraSeo'),
  AnkaraWebTasarim: () => import('./pages/AnkaraWebTasarim'),
  Contact: () => import('./pages/Contact'),
  JobPost: () => import('./pages/JobPost'),
  NotFound: () => import('./pages/NotFound')
} as const;

export type PageName = keyof typeof pageLoaders;
export type PageMap = Record<PageName, ComponentType>;

/** Rota yolu -> sayfa bileşeni eşlemesi. Sitemap ve ön render bunu okur. */
export const routeTable: Array<{ path: string; page: PageName }> = [
  { path: '/', page: 'Home' },
  { path: '/hizmetler', page: 'Services' },
  { path: '/hizmetler/:slug', page: 'ServiceDetail' },
  { path: '/referanslar', page: 'References' },
  { path: '/vaka-calismalari', page: 'CaseStudies' },
  { path: '/vaka-calismalari/:slug', page: 'CaseStudyDetail' },
  { path: '/hakkimizda', page: 'About' },
  { path: '/blog', page: 'Blog' },
  { path: '/blog/:slug', page: 'BlogPost' },
  { path: '/siteler', page: 'Siteler' },
  { path: '/ostim-ivedik', page: 'OstimIvedik' },
  { path: '/saglik-turizmi-seo', page: 'SaglikTurizmiSeo' },
  { path: '/ankara-video-produksiyon', page: 'AnkaraVideoProduksiyon' },
  { path: '/ankara-seo', page: 'AnkaraSeo' },
  { path: '/ankara-web-tasarim', page: 'AnkaraWebTasarim' },
  { path: '/iletisim', page: 'Contact' },
  { path: '/is-talebi', page: 'JobPost' },
  { path: '*', page: 'NotFound' }
];

const lazyPages = Object.fromEntries(
  Object.entries(pageLoaders).map(([name, load]) => [name, lazy(load)])
) as PageMap;

function RouteTree({ pages }: { pages: PageMap }) {
  const element = useRoutes(
    useMemo(
      () =>
        routeTable.map(({ path, page }) => {
          const Page = pages[page];
          return { path, element: <Page /> };
        }),
      [pages]
    )
  );
  return element;
}

/** Tarayıcı tarafı: sayfalar talebe göre indirilir. */
export function AppRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <RouteTree pages={lazyPages} />
    </Suspense>
  );
}

/** Ön render tarafı: önceden çözülmüş bileşenlerle, Suspense olmadan. */
export function StaticRoutes({ pages }: { pages: PageMap }) {
  return <RouteTree pages={pages} />;
}

/** Tüm sayfa modüllerini çözer; ön render öncesinde çağrılır. */
export async function resolvePages(): Promise<PageMap> {
  const entries = await Promise.all(
    Object.entries(pageLoaders).map(async ([name, load]) => {
      const module = await load();
      return [name, module.default as ComponentType] as const;
    })
  );
  return Object.fromEntries(entries) as PageMap;
}
