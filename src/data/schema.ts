/**
 * Schema.org (JSON-LD) üreticileri.
 *
 * Sayfalar bu yardımcıları çağırıp sonucu <SEO schema={...} /> ile enjekte eder.
 * Böylece yapılandırılmış veri tek yerde tanımlanır ve sayfalar arasında tutarlı kalır.
 */
import { site, absoluteUrl, SITE_URL } from './site';

type Json = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country
};

/** Hakkımızda sayfası ve tüm sayfaların yayıncı referansı için Organization. */
export function organizationSchema(): Json {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: site.name,
    legalName: site.legalName,
    url: SITE_URL,
    description: site.description,
    foundingDate: site.foundingDate,
    email: site.email,
    telephone: site.telephone,
    address: postalAddress,
    areaServed: { '@type': 'City', name: site.address.city },
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icon-512.png'),
      width: 512,
      height: 512
    },
    image: site.defaultImage,
    sameAs: [...site.sameAs],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.telephone,
        email: site.email,
        contactType: 'customer service',
        areaServed: 'TR',
        availableLanguage: ['Turkish', 'English']
      }
    ]
  };
}

/** Ana sayfa için yerel işletme sinyalleri (LocalBusiness alt tipi). */
export function localBusinessSchema(): Json {
  return {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: site.name,
    description: site.description,
    url: SITE_URL,
    telephone: site.telephone,
    email: site.email,
    image: site.defaultImage,
    logo: absoluteUrl('/icon-512.png'),
    priceRange: '₺₺',
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude
    },
    openingHours: site.openingHours,
    areaServed: [
      { '@type': 'City', name: 'Ankara' },
      { '@type': 'Country', name: 'Türkiye' }
    ],
    sameAs: [...site.sameAs],
    parentOrganization: { '@id': ORGANIZATION_ID },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dijital Büyüme Hizmetleri',
      itemListElement: [
        ['SEO', '/hizmetler/seo'],
        ['GEO / Yapay Zekâ Aramaları', '/hizmetler/geo'],
        ['Web Tasarım', '/hizmetler/web-tasarim'],
        ['Google & Meta Reklam Yönetimi', '/hizmetler/reklam'],
        ['Video Prodüksiyon', '/hizmetler/video-produksiyon']
      ].map(([name, path]) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name, url: absoluteUrl(path) }
      }))
    }
  };
}

/**
 * WebSite + Sitelinks Searchbox.
 * Hedef URL, blog sayfasındaki gerçek `?q=` arama filtresine bağlıdır.
 */
export function webSiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    alternateName: site.legalName,
    description: site.description,
    inLanguage: site.language,
    publisher: { '@id': ORGANIZATION_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/** Sayfa hiyerarşisini arama motorlarına bildiren breadcrumb zinciri. */
export function breadcrumbSchema(items: Array<{ name: string; path: string }>): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

/** Hizmet sayfaları için Service şeması. */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  offers?: string[];
}): Json {
  return {
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.serviceType ?? input.name,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: [
      { '@type': 'City', name: 'Ankara' },
      { '@type': 'Country', name: 'Türkiye' }
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absoluteUrl(input.path),
      servicePhone: site.telephone
    },
    ...(input.offers?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${input.name} kapsamı`,
            itemListElement: input.offers.map((offer) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: offer }
            }))
          }
        }
      : {})
  };
}

/** Sık sorulan sorular bloğu. */
export function faqSchema(faqs: Array<{ question: string; answer: string }>): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };
}

/** Blog yazıları için BlogPosting. */
export function blogPostingSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
  section?: string;
  wordCount?: number;
}): Json {
  const url = absoluteUrl(input.path);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: input.title.slice(0, 110),
    name: input.title,
    description: input.description,
    url,
    inLanguage: site.language,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    articleSection: input.section,
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    image: {
      '@type': 'ImageObject',
      url: input.image ?? site.defaultImage,
      width: site.imageWidth,
      height: site.imageHeight
    },
    author: { '@type': 'Organization', name: input.author ?? site.name, url: SITE_URL },
    publisher: { '@id': ORGANIZATION_ID }
  };
}

/** Vaka çalışmaları için Article. */
export function caseStudySchema(input: {
  title: string;
  description: string;
  path: string;
  about?: string;
}): Json {
  const url = absoluteUrl(input.path);
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: input.title.slice(0, 110),
    description: input.description,
    url,
    inLanguage: site.language,
    about: input.about,
    image: {
      '@type': 'ImageObject',
      url: site.defaultImage,
      width: site.imageWidth,
      height: site.imageHeight
    },
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID }
  };
}

/** Birden fazla şemayı tek bir @graph içinde paketler. */
export function graph(...nodes: Array<Json | null | undefined>): Json {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean) as Json[]
  };
}
