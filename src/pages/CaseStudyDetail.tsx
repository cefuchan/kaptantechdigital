import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight } from 'lucide-react';
import { findCaseStudy, isCaseStudyComplete, metricSizeClass } from '../data/caseStudies';
import { breadcrumbSchema, caseStudySchema, graph } from '../data/schema';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = findCaseStudy(slug);

  if (!study) {
    return (
      <>
        <SEO
          title="Vaka çalışması bulunamadı | KAPTAN"
          description="Aradığınız vaka çalışması bulunamadı. Tüm çalışmalarımızı inceleyebilirsiniz."
          url="/vaka-calismalari"
          noindex
        />
        <div className="pt-32 pb-24 text-center min-h-screen flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-display">Vaka çalışması bulunamadı.</h1>
          <Link to="/vaka-calismalari" className="text-gold hover:text-white transition-colors">
            Tüm vaka çalışmalarına dön
          </Link>
        </div>
      </>
    );
  }

  const path = `/vaka-calismalari/${study.id}`;
  const crumbs = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Vaka Çalışmaları', path: '/vaka-calismalari' },
    { name: study.client, path }
  ];

  // Gerçek anlatı verisi girilmemiş vakalar "ince içerik" sayılır; arama
  // motorlarına sunmak yerine hazır olana kadar indeks dışında tutuyoruz.
  const complete = isCaseStudyComplete(study);

  const schema = complete
    ? graph(
        caseStudySchema({
          title: `${study.client} — ${study.service} Vaka Çalışması`,
          description: study.description,
          path,
          about: study.industry ?? study.service
        }),
        breadcrumbSchema(crumbs)
      )
    : graph(breadcrumbSchema(crumbs));

  return (
    <>
      <SEO
        title={`${study.client} Vaka Çalışması | KAPTAN`}
        description={study.description}
        url={path}
        type="article"
        noindex={!complete}
        schema={schema}
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />

        <div className="max-w-4xl mx-auto px-6 mb-20">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />

          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full border border-gold/30 text-gold text-xs font-medium tracking-widest uppercase mb-6">
              {study.service}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">{study.client}</h1>
          </div>

          <div className="bg-surface border border-white/5 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] pointer-events-none" />
            <p className="text-xs text-muted uppercase tracking-wider mb-2">Öne Çıkan Sonuç</p>
            <p className={`${metricSizeClass(study.metric, 'hero')} font-display font-light text-white mb-6 leading-tight`}>{study.metric}</p>
            <p className="text-xl md:text-2xl text-text-primary/90 max-w-2xl leading-relaxed">
              {study.description}
            </p>
          </div>

          {/*
            Anlatı bölümleri yalnızca gerçek proje verisi girildiğinde görünür.
            Veri yoksa uydurma metin göstermek yerine hiçbir şey göstermiyoruz;
            sayfa da bu durumda noindex olarak yayınlanıyor.
          */}
          {study.narrative && (
            <div className="space-y-16">
              {[
                { heading: 'Zorluk', body: study.narrative.challenge },
                { heading: 'KAPTAN Yaklaşımı', body: study.narrative.approach },
                { heading: 'Sonuç', body: study.narrative.result }
              ].map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-display font-semibold mb-4 flex items-center text-gold">
                    <span className="w-1.5 h-6 bg-gold mr-3" />
                    {section.heading}
                  </h2>
                  <p className="text-muted text-lg leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          )}

          {study.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-16">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-muted border border-white/10 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-20 pt-10 border-t border-white/10 text-center">
            <h3 className="text-3xl font-display font-semibold mb-6">Sizin için de aynısını yapalım.</h3>
            <Link to="/iletisim" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors group">
              Projeyi Konuşalım
              <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
