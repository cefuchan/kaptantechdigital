import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight } from 'lucide-react';

export const caseStudiesData = [
  {
    id: "dynomark",
    client: "Dynomark Ordu Oto Ekspertiz",
    service: "SEO & GEO",
    metric: "1. Sıra",
    description: "3 ay içinde yerel arama sonuçlarında ilk sıraya yerleştik, organik trafik %180 arttı, Google Haritalar üzerinden gelen aramalar 4 kat büyüdü.",
    tags: ["SEO", "GEO", "Yerel Arama"]
  },
  {
    id: "bs-mimarlik",
    client: "BS Mimarlık",
    service: "SEO & Web Tasarım",
    metric: "%300",
    description: "Yeniden tasarlanan site ve teknik SEO çalışmasıyla hedef anahtar kelimelerin tamamında ilk sayfaya yerleşti, aylık teklif talepleri 3 kattan fazla arttı.",
    tags: ["SEO", "Web Tasarım"]
  },
  {
    id: "trinvest",
    client: "TRNVEST",
    service: "Google Ads & Meta",
    metric: "2.5x",
    description: "Yeniden yapılandırılan kampanya mimarisi ve sürekli optimizasyonla reklam bütçesi aynı kalırken nitelikli lead sayısı 2.5 kat arttı.",
    tags: ["Reklam", "Lead Generation"]
  },
  {
    id: "mk-psikoloji",
    client: "MK Psikoloji",
    service: "Yerel SEO & Reklam",
    metric: "%220",
    description: "Google Business profili optimizasyonu, yerel içerik stratejisi ve hedefli reklamlarla haftalık randevu talepleri iki katından fazla arttı.",
    tags: ["SEO", "GEO", "Reklam"]
  },
  {
    id: "torun-insaat",
    client: "Torun İnşaat",
    service: "Web Tasarım & Reklam",
    metric: "3x",
    description: "Kurumsal kimlikle uyumlu yeni web sitesi ve hedefli reklam kampanyalarıyla ilk ayda potansiyel müşteri formları katlanarak arttı.",
    tags: ["Web Tasarım", "Reklam"]
  },
  {
    id: "deccrane",
    client: "Deccrane",
    service: "SEO & İçerik",
    metric: "Top 8",
    description: "Endüstriyel B2B içerik stratejisiyle teknik arama terimlerinde görünürlük kazandı, sektör kelimelerinde ilk sayfada 8 pozisyon elde edildi.",
    tags: ["SEO", "İçerik Stratejisi"]
  }
];

export default function CaseStudies() {
  return (
    <>
      <SEO 
        title="Vaka Çalışmaları | KAPTAN — Ankara Dijital Büyüme Stüdyosu" 
        description="Veriye dayalı stratejilerimizin müşteri hedeflerine nasıl ulaştığını inceleyin."
      />
      
      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
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
                    <p className="text-5xl font-light text-white">{study.metric}</p>
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
