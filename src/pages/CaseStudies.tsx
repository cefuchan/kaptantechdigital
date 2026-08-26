import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight } from 'lucide-react';
import { breadcrumbSchema, graph } from '../data/schema';
import { absoluteUrl } from '../data/site';
import { caseStudiesData, metricSizeClass } from '../data/caseStudies';

const crumbs = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Vaka Çalışmaları', path: '/vaka-calismalari' }
];



const caseStudiesSchema = graph(
  {
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl('/vaka-calismalari')}#collection`,
    url: absoluteUrl('/vaka-calismalari'),
    name: 'Vaka Çalışmaları',
    description: 'Veriye dayalı stratejilerimizin müşteri hedeflerine nasıl ulaştığını gösteren vaka çalışmaları.',
    inLanguage: 'tr',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: caseStudiesData.map((study, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${study.client} — ${study.service}`,
        url: absoluteUrl(`/vaka-calismalari/${study.id}`)
      }))
    }
  },
  breadcrumbSchema(crumbs)
);

export default function CaseStudies() {
  return (
    <>
      <SEO
        title="Vaka Çalışmaları | KAPTAN — Ankara Dijital Büyüme Stüdyosu"
        description="Veriye dayalı SEO, reklam ve web tasarım çalışmalarımızın müşteri hedeflerine nasıl ulaştığını ölçülebilir sonuçlarla inceleyin."
        url="/vaka-calismalari"
        schema={caseStudiesSchema}
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">Kanıtlanmış Başarılar</h1>
          <p className="text-muted max-w-2xl text-lg mb-16">
            Rakamlar yalan söylemez. Şansa değil, veriye ve doğru rotaya dayanan stratejilerimizin somut sonuçları.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudiesData.map((study) => (
              <Link 
                key={study.id}
                to={`/vaka-calismalari/${study.id}`} 
                className="group bg-surface rounded-2xl p-8 border border-white/5 hover:border-gold/30 transition-all flex flex-col h-full min-h-[400px] relative overflow-hidden"
              >
                {/* Subtle gradient orb */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-gold/5 rounded-bl-full blur-2xl pointer-events-none transition-transform group-hover:scale-150" />
                
                <div className="mb-auto relative z-10">
                  <p className="text-xs text-gold font-mono mb-3 tracking-widest uppercase">{study.service}</p>
                  <h3 className="text-2xl font-display font-semibold mb-4">{study.client}</h3>
                  <p className="text-muted text-sm leading-relaxed">{study.description}</p>
                </div>

                <div className="mt-8 relative z-10 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">Öne Çıkan Sonuç</p>
                    <p className={`${metricSizeClass(study.metric, 'card')} font-light text-white leading-tight`}>{study.metric}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:text-bg transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
