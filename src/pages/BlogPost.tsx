import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { findBlogPost, isBlogPostIndexable, relatedBlogPosts } from '../data/blog';
import { getCachedBlogContent, loadBlogContent } from '../content/blog';
import { blogPostingSchema, breadcrumbSchema, graph, personSchema } from '../data/schema';
import { founder, site } from '../data/site';

/** Yalnızca ilgili yazının gövdesini indiren, istek anında yükleme kancası. */
function useBlogContent(slug?: string) {
  const [state, setState] = useState<{ slug?: string; html: string | null }>(() => ({
    slug,
    html: slug ? getCachedBlogContent(slug) : null
  }));

  useEffect(() => {
    if (!slug) return;
    if (state.slug === slug && state.html !== null) return;

    const cached = getCachedBlogContent(slug);
    if (cached !== null) {
      setState({ slug, html: cached });
      return;
    }

    let active = true;
    loadBlogContent(slug).then((html) => {
      if (active) setState({ slug, html });
    });
    return () => {
      active = false;
    };
  }, [slug, state.slug, state.html]);

  return state.slug === slug ? state.html : null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = findBlogPost(slug);
  const content = useBlogContent(slug);

  if (!post) {
    return (
      <>
        <SEO
          title="İçerik bulunamadı | KAPTAN Blog"
          description="Aradığınız yazı bulunamadı. Tüm içgörüler için blog sayfamıza göz atabilirsiniz."
          url="/blog"
          noindex
        />
        <div className="pt-32 pb-24 text-center min-h-screen flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-display">İçerik bulunamadı.</h1>
          <Link to="/blog" className="text-gold hover:text-white transition-colors">
            Tüm içgörülere dön
          </Link>
        </div>
      </>
    );
  }

  const path = `/blog/${post.slug}`;
  const crumbs = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path }
  ];
  const related = relatedBlogPosts(post.slug);

  const schema = graph(
    personSchema(),
    blogPostingSchema({
      title: post.title,
      description: post.excerpt,
      path,
      datePublished: post.datePublished,
      section: post.category
      // author verilmiyor: kurucu tanımlıysa Person, değilse kurum otomatik seçilir.
    }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SEO
        title={`${post.title} | KAPTAN Blog`}
        description={post.excerpt}
        url={path}
        type="article"
        noindex={!isBlogPostIndexable(post)}
        article={{
          publishedTime: post.datePublished,
          author: founder.name || site.name,
          section: post.category,
          tags: [post.category]
        }}
        schema={schema}
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />

        <article className="max-w-3xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <span className="text-xs text-gold font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-gold/30">
                {post.category}
              </span>
              <time dateTime={post.datePublished} className="text-sm text-muted">
                {post.date}
              </time>
              <span className="text-sm text-muted" aria-hidden="true">•</span>
              <span className="text-sm text-muted">{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight mb-8">
              {post.title}
            </h1>
          </header>

          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-white/5 bg-surface relative">
            <div className="absolute inset-0 bg-black/20 z-10" />
            <div className="w-full h-full object-cover grayscale opacity-70 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center" />
          </div>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:text-gold hover:prose-a:text-gold-light prose-p:text-muted prose-table:text-sm prose-th:text-text-primary">
            <p className="lead text-xl text-text-primary mb-8">{post.excerpt}</p>

            {content === null ? (
              <div className="space-y-4 animate-pulse" aria-hidden="true">
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-11/12" />
                <div className="h-4 bg-white/5 rounded w-4/5" />
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}

            <hr className="my-12 border-white/10" />

            <div className="bg-surface p-8 rounded-2xl border border-white/5 not-prose">
              <h2 className="text-xl font-display font-semibold mb-2">
                Bu stratejiyi markanıza nasıl uygularsınız?
              </h2>
              <p className="text-muted mb-6 text-base">
                Mevcut durumunuzu birlikte değerlendirelim, markanıza özel bir büyüme rotası çizelim.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/iletisim"
                  className="inline-block px-6 py-3 rounded-full bg-gold text-bg hover:bg-gold-light transition-colors text-sm font-medium"
                >
                  Ücretsiz ön değerlendirme
                </Link>
                <Link
                  to="/hizmetler"
                  className="inline-block px-6 py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-bg transition-colors text-sm font-medium"
                >
                  Hizmetlerimizi inceleyin
                </Link>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20 pt-12 border-t border-white/10">
              <h2 className="text-2xl font-display font-semibold mb-8">İlgili içgörüler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/blog/${item.slug}`}
                    className="group bg-surface rounded-2xl border border-white/5 hover:border-gold/30 transition-colors p-6 flex flex-col"
                  >
                    <span className="text-xs text-gold font-mono tracking-widest uppercase mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-base font-display font-semibold group-hover:text-gold transition-colors line-clamp-3">
                      {item.title}
                    </h3>
                    <span className="mt-auto pt-4 text-xs text-muted">{item.readTime}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
