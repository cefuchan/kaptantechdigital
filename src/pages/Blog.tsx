import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight, Search } from 'lucide-react';
import { blogPostsByDate } from '../data/blog';
import { breadcrumbSchema, graph } from '../data/schema';
import { site, absoluteUrl } from '../data/site';

const ALL = 'Tümü';

/** Yazı, arama teriminin tüm kelimelerini başlık, özet veya kategoride içeriyor mu? */
function matchesQuery(haystack: string, query: string) {
  const normalized = haystack.toLocaleLowerCase('tr');
  return query
    .toLocaleLowerCase('tr')
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => normalized.includes(term));
}

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(blogPostsByDate.map((post) => post.category)))],
    []
  );

  const posts = useMemo(
    () =>
      blogPostsByDate.filter((post) => {
        const categoryMatch = activeCategory === ALL || post.category === activeCategory;
        const queryMatch =
          !query || matchesQuery(`${post.title} ${post.excerpt} ${post.category}`, query);
        return categoryMatch && queryMatch;
      }),
    [activeCategory, query]
  );

  const crumbs = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Blog', path: '/blog' }
  ];

  const schema = graph(
    {
      '@type': 'Blog',
      '@id': `${absoluteUrl('/blog')}#blog`,
      url: absoluteUrl('/blog'),
      name: 'KAPTAN İçgörüler',
      description:
        'Dijital pazarlama, SEO, GEO, reklam yönetimi ve web tasarım üzerine stratejik içgörüler ve rehberler.',
      inLanguage: site.language,
      publisher: { '@id': `${site.url}/#organization` },
      blogPost: blogPostsByDate.slice(0, 20).map((post) => ({
        '@type': 'BlogPosting',
        '@id': `${absoluteUrl(`/blog/${post.slug}`)}#article`,
        headline: post.title.slice(0, 110),
        description: post.excerpt,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.datePublished,
        articleSection: post.category
      }))
    },
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SEO
        title="İçgörüler & Blog | KAPTAN — Ankara Dijital Büyüme Stüdyosu"
        description="Dijital pazarlama, SEO, GEO, reklam yönetimi ve web tasarım üzerine stratejik içgörüler ve uygulanabilir rehberler."
        url="/blog"
        schema={schema}
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">İçgörüler</h1>
          <p className="text-muted max-w-2xl text-lg mb-10">
            Dijital dünyadaki son trendler, veri odaklı stratejiler ve sektör rehberleri.
          </p>

          <form
            role="search"
            className="relative max-w-md mb-10"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="blog-search" className="sr-only">
              İçgörülerde ara
            </label>
            <Search
              className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="blog-search"
              type="search"
              name="q"
              value={query}
              placeholder="İçgörülerde ara…"
              onChange={(event) => {
                const next = event.target.value;
                setSearchParams(next ? { q: next } : {}, { replace: true });
              }}
              className="w-full bg-surface border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-gold/50 transition-colors"
            />
          </form>

          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === category
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-white/10 text-muted hover:border-white/30 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {posts.length === 0 ? (
            <p className="text-muted text-lg py-16">
              Bu filtreyle eşleşen içerik bulunamadı. Farklı bir kategori veya arama terimi deneyin.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-surface rounded-2xl border border-white/5 hover:border-gold/30 transition-all overflow-hidden flex flex-col h-full"
                >
                  <div className="w-full aspect-[16/10] bg-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-surface to-surface/0 opacity-50 z-10" />
                    <div className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" />
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gold font-mono tracking-widest uppercase">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-display font-semibold mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted text-sm line-clamp-3 mb-6">{post.excerpt}</p>

                    <div className="mt-auto flex items-center justify-between text-sm text-muted">
                      <time dateTime={post.datePublished}>{post.date}</time>
                      <span className="flex items-center text-white font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        Okumaya Devam Et
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
