import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight, Compass, Target, LineChart } from 'lucide-react';

export default function About() {
  return (
    <>
      <SEO 
        title="Hakkımızda | KAPTAN — Ankara Dijital Büyüme Stüdyosu" 
        description="Şansa değil, rotaya inanan dijital büyüme stüdyosu KAPTAN ile tanışın."
      />
      
      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold mb-6">Biz <span className="font-logo italic text-gold font-normal pr-2">Kaptan</span>'ız.</h1>
          <p className="text-muted max-w-3xl text-xl md:text-2xl leading-relaxed mb-20">
            Dijital okyanusta pusulasız ilerleyen markalara, ölçülebilir ve veriye dayalı bir büyüme rotası çiziyoruz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="text-3xl font-display font-semibold mb-6">Felsefemiz</h2>
              <div className="space-y-6 text-muted text-lg leading-relaxed">
                <p>
                  "İşinizi şansa değil, rotaya bırakın." Bu sadece bir slogan değil, tüm çalışma metodolojimizin özetidir.
                </p>
                <p>
                  Dijital pazarlama, tahmine dayalı bir sanat değil, veriye dayalı bir bilimdir. Biz, her tıklamanın, her gösterimin ve her kod satırının ölçülebilir bir amaca hizmet etmesi gerektiğine inanıyoruz.
                </p>
                <p>
                  Ankara merkezli stüdyomuzda, SEO'dan tasarıma, reklamlardan video prodüksiyona kadar her hizmeti "optimizasyon" merceğinden geçirerek sunuyoruz.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface p-8 rounded-2xl border border-white/5 flex flex-col justify-center">
                <Compass className="w-10 h-10 text-gold mb-6" />
                <h3 className="font-display font-semibold text-xl mb-2">Stratejik Rota</h3>
                <p className="text-sm text-muted">Ezbere paketler değil, markanıza özel veriye dayalı stratejiler.</p>
              </div>
              <div className="bg-surface p-8 rounded-2xl border border-white/5 flex flex-col justify-center sm:-translate-y-6">
                <Target className="w-10 h-10 text-gold mb-6" />
                <h3 className="font-display font-semibold text-xl mb-2">Kesin Hedefleme</h3>
                <p className="text-sm text-muted">Doğru kitleye, doğru platformda, en optimize maliyetle ulaşım.</p>
              </div>
              <div className="bg-surface p-8 rounded-2xl border border-white/5 flex flex-col justify-center">
                <LineChart className="w-10 h-10 text-gold mb-6" />
                <h3 className="font-display font-semibold text-xl mb-2">Sürekli Büyüme</h3>
                <p className="text-sm text-muted">A/B testleri ve optimizasyon döngüleriyle sürekli artan ROAS.</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-white/5 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-gold/5 blur-[100px] pointer-events-none" />
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-display font-semibold mb-8">Yeni rotanızı birlikte çizelim.</h2>
               <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
                 Mevcut dijital stratejinizi incelemek ve büyüme fırsatlarını keşfetmek için ücretsiz bir ön değerlendirme toplantısı planlayın.
               </p>
               <Link to="/iletisim" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors group">
                 İletişime Geçin
                 <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
               </Link>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
