import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight } from 'lucide-react';
import { caseStudiesData } from './CaseStudies';

export default function References() {
  const clients = [
    "TRNVEST", "TDALORA", "BS Mimarlık", "Dynomark Ordu Oto Ekspertiz", 
    "Deccrane", "Siltem", "Güvenli Nabız", "Turan Concept Tasarım", 
    "İklim Danışmanlık", "MK Psikoloji", "Torun İnşaat"
  ];

  return (
    <>
      <SEO 
        title="Referanslar | KAPTAN — Ankara Dijital Büyüme Stüdyosu" 
        description="Büyüme rotasını birlikte çizdiğimiz müşterilerimiz ve iş ortaklarımız."
      />
      
      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">Müşterilerimiz</h1>
          <p className="text-muted max-w-2xl text-lg mb-16">
            Farklı sektörlerden, büyümeye ve optimizasyona inanan iş ortaklarımızla birlikte çalışmaktan gurur duyuyoruz.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => {
              // Find if this client has a case study
              const relatedCaseStudy = caseStudiesData.find(cs => cs.client === client);
              
              if (relatedCaseStudy) {
                return (
                  <Link 
                    key={index} 
                    to={`/vaka-calismalari/${relatedCaseStudy.id}`}
                    className="group bg-surface border border-white/5 hover:border-gold/30 rounded-2xl p-8 aspect-square flex flex-col items-center justify-center text-center transition-all hover:bg-surface/80 relative"
                  >
                    <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="font-display font-semibold text-xl group-hover:text-gold transition-colors">{client}</span>
                    <span className="text-xs text-muted mt-2 uppercase tracking-wider block">Vaka Çalışmasını İncele</span>
                  </Link>
                );
              }

              return (
                <div 
                  key={index}
                  className="bg-surface border border-white/5 rounded-2xl p-8 aspect-square flex items-center justify-center text-center"
                >
                  <span className="font-display font-semibold text-xl text-muted">{client}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-24 pt-12 border-t border-white/10 text-center">
            <h2 className="text-3xl font-display font-semibold mb-6">Sıradaki başarı hikayesi sizin olsun.</h2>
            <Link to="/iletisim" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-text-primary text-bg font-medium hover:bg-gold transition-colors group">
              Teklif Al
              <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
