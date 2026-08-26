import { Helmet } from 'react-helmet-async';
import { site, absoluteUrl } from '../data/site';

export interface ArticleMeta {
  /** ISO 8601 yayın tarihi, örn. "2026-07-23". */
  publishedTime: string;
  /** ISO 8601 güncelleme tarihi. Verilmezse yayın tarihi kullanılır. */
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface SEOProps {
  title: string;
  description: string;
  /** Göreli yol ("/blog/slug") ya da tam URL. Kanonik ve og:url için kullanılır. */
  url?: string;
  /** Paylaşım görseli. Göreli yol verilebilir; mutlak URL'e çevrilir. */
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  article?: ArticleMeta;
  /** Arama motorlarından gizlenmesi gereken sayfalar için. */
  noindex?: boolean;
  /** Sayfaya özel JSON-LD. Tek nesne veya nesne dizisi verilebilir. */
  schema?: object | object[];
}

export function SEO({
  title,
  description,
  url = '/',
  image,
  imageAlt,
  type = 'website',
  article,
  noindex = false,
  schema
}: SEOProps) {
  const canonical = absoluteUrl(url);
  const socialImage = absoluteUrl(image ?? site.defaultImage);
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const schemaList = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      {/* noindex sayfalarda canonical vermek çelişkili sinyal üretir */}
      {!noindex && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:secure_url" content={socialImage} />
      <meta property="og:image:width" content={String(site.imageWidth)} />
      <meta property="og:image:height" content={String(site.imageHeight)} />
      <meta property="og:image:alt" content={imageAlt ?? title} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={imageAlt ?? title} />

      {/* Makale meta verileri */}
      {type === 'article' && article && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {type === 'article' && article && (
        <meta property="article:modified_time" content={article.modifiedTime ?? article.publishedTime} />
      )}
      {type === 'article' && article && (
        <meta property="article:author" content={article.author ?? site.name} />
      )}
      {type === 'article' && article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {type === 'article' &&
        article?.tags?.map((tag) => <meta property="article:tag" content={tag} key={tag} />)}
      {type === 'article' && article && (
        <meta name="author" content={article.author ?? site.name} />
      )}

      {/* Sayfa bazlı yapılandırılmış veri */}
      {schemaList.map((entry, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
