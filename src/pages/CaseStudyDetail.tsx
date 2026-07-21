import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight } from 'lucide-react';
import { caseStudiesData } from './CaseStudies';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = caseStudiesData.find(s => s.id === slug);

  if (!study) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-display">Vaka çalışması bulunamadı.</h1>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${study.client} Vaka Çalışması | KAPTAN`} 
        description={study.description}
      />
      
      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <HorizontalLine />
          <Link to="/vaka-calismalari" className="text-sm text-muted hover:text-white transition-colors mb-8 inline-block">
            ← Tüm Vaka Çalışmaları
          </Link>
          
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full border border-gold/30 text-gold text-xs font-medium tracking-widest uppercase mb-6">
              {study.service}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">{study.client}</h1>
          </div>

          <div className="bg-surface border border-white/5 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] pointer-events-none" />
            <p className="text-xs text-muted uppercase tracking-wider mb-2">Öne Çıkan Sonuç</p>
            <p className="text-6xl md:text-8xl font-display font-light text-white mb-6">{study.metric}</p>
            <p className="text-xl md:text-2xl text-text-primary/90 max-w-2xl leading-relaxed">
              {study.description}
            </p>
          </div>

          {/* Narrative Sections */}
          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-display font-semibold mb-4 flex items-center text-gold">
                <span className="w-1.5 h-6 bg-gold mr-3" />
                Zorluk
              </h2>
              <p className="text-muted text-lg leading-relaxed">
                {study.client} markası, dijital varlıklarını hedeflerine uygun şekilde ölçeklendirme konusunda zorluk yaşıyordu. Mevcut stratejiler yeterli dönüşüm sağlamıyor ve hedef kitleye ulaşmakta eksik kalıyordu.
                <br /><br />
                <em className="text-sm opacity-50">(Bu bölüm projeye özel gerçek verilerle güncellenecektir.)</em>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4 flex items-center text-gold">
                <span className="w-1.5 h-6 bg-gold mr-3" />
                KAPTAN Yaklaşımı
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                Markanın dijital ayak izini baştan aşağı analiz ettik. "Şansa değil, rotaya" felsefemizle veriye dayalı bir aksiyon planı çıkardık. Kullanıcı deneyimini merkeze alan ve arama motoru/yapay zeka görünürlüğünü maksimize eden teknik iyileştirmeler uygulandı.
                <br /><br />
                <em className="text-sm opacity-50">(Bu bölüm projeye özel gerçek verilerle güncellenecektir.)</em>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4 flex items-center text-gold">
                <span className="w-1.5 h-6 bg-gold mr-3" />
                Sonuç
              </h2>
              <p className="text-muted text-lg leading-relaxed">
                Stratejik optimizasyonlar sonucunda organik görünürlükte ve hedef kitle etkileşiminde büyük bir sıçrama yaşandı. Belirlenen KPI'lara öngörülen süreden daha kısa bir zamanda ulaşıldı.
                <br /><br />
                <em className="text-sm opacity-50">(Bu bölüm projeye özel gerçek verilerle güncellenecektir.)</em>
              </p>
            </section>
          </div>

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
