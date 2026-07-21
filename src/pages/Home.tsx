import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  const services = ["SEO", "GEO", "WEB", "ADS", "Video Prodüksiyon"];
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <>
      <SEO 
        title="KAPTAN | Ankara Dijital Büyüme Stüdyosu" 
        description="İşinizi şansa değil, rotayı bilen bir KAPTAN'a bırakın. SEO, GEO, Web Tasarım ve Reklam Yönetimi."
      />
      <Helmet>
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "KAPTAN",
            "description": "Ankara merkezli dijital büyüme stüdyosu — SEO, GEO, Web Tasarım, Google & Meta Reklam Yönetimi ve Video Prodüksiyon.",
            "telephone": "+90 551 136 76 34",
            "email": "merhaba@kaptantechdigital.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Güneşevler 71. Cadde No:1",
              "addressLocality": "Ankara",
              "addressCountry": "TR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 39.97067346786774,
              "longitude": 32.893593472347014
            },
            "url": "https://kaptantechdigital.com",
            "sameAs": [
              "https://instagram.com/kaptantechdigital",
              "https://linkedin.com/company/kaptantechdigital"
            ]
          }
          `}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Video Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="w-full h-full bg-surface" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
          <p className="text-xs text-gold uppercase tracking-[0.3em] mb-6 font-medium">DİJİTAL BÜYÜME STÜDYOSU</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold leading-tight mb-6 text-white">
            İşinizi şansa değil,<br />
            <span className="text-gold">rotaya bırakın.</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-muted mb-8 h-16 md:h-10 flex items-center justify-center">
            <p>Reklamlarda <span className="text-gold font-medium inline-block min-w-[120px] animate-role-fade-in">{services[currentService]}</span> yüksek optimizasyondan gelir.</p>
          </div>

          <p className="max-w-2xl mx-auto text-muted/80 mb-10 text-sm md:text-base leading-relaxed">
            Google Ads, Meta ve diğer platformlarda verilen reklamlar şansa değil optimizasyonla başarı sağlar. Arama motorlarında ve yapay zekâ tabanlı aramalarda görünürlüğünüzü stratejiyle inşa ediyoruz.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/hizmetler" className="px-8 py-4 rounded-full bg-text-primary text-bg font-medium hover:bg-gold hover:text-bg transition-colors w-full sm:w-auto text-center">
              Hizmetlerimiz
            </Link>
            <Link to="/iletisim" className="px-8 py-4 rounded-full border border-white/20 text-text-primary hover:border-gold transition-colors w-full sm:w-auto text-center">
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 relative bg-bg">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-12">Hizmetlerimiz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Bento Box 1 - Large */}
            <Link to="/hizmetler/seo" className="group relative bg-surface p-8 rounded-2xl border border-white/5 hover:border-gold/30 transition-colors md:col-span-2 md:row-span-2 overflow-hidden flex flex-col justify-end min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div className="relative z-20">
                <h3 className="text-3xl font-display font-semibold mb-2 group-hover:text-gold transition-colors">SEO & GEO</h3>
                <p className="text-muted mb-4 max-w-sm">Arama motorlarında ve yapay zeka aramalarında markanızı en üste taşıyan stratejiler.</p>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:text-bg" />
                </div>
              </div>
            </Link>

            {/* Bento Box 2 */}
            <Link to="/hizmetler/reklam" className="group relative bg-surface p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-colors min-h-[200px] flex flex-col justify-between">
              <h3 className="text-xl font-display font-semibold group-hover:text-gold transition-colors">Google & Meta Ads</h3>
              <div className="flex justify-between items-end">
                <p className="text-muted text-sm max-w-[80%]">Veriye dayalı reklam yönetimi.</p>
                <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-gold transition-colors" />
              </div>
            </Link>

            {/* Bento Box 3 */}
            <Link to="/hizmetler/web-tasarim" className="group relative bg-surface p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-colors min-h-[200px] flex flex-col justify-between">
              <h3 className="text-xl font-display font-semibold group-hover:text-gold transition-colors">Web Tasarım</h3>
              <div className="flex justify-between items-end">
                <p className="text-muted text-sm max-w-[80%]">Dönüşüm odaklı, SEO uyumlu modern siteler.</p>
                <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-gold transition-colors" />
              </div>
            </Link>

            {/* Bento Box 4 */}
            <Link to="/hizmetler/video-produksiyon" className="group relative bg-surface p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-colors md:col-span-2 min-h-[200px] flex flex-col justify-between overflow-hidden">
               <div className="absolute right-0 bottom-0 w-32 h-32 bg-gold/10 rounded-tl-full blur-2xl" />
              <h3 className="text-xl font-display font-semibold group-hover:text-gold transition-colors relative z-10">Video Prodüksiyon</h3>
              <div className="flex justify-between items-end relative z-10">
                <p className="text-muted text-sm max-w-[60%]">Markanızın hikayesini anlatan profesyonel kurumsal videolar ve reklam filmleri.</p>
                <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-gold transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-surface overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex items-center space-x-12 px-6 font-display text-2xl font-bold tracking-widest text-white"
          >
            {[
              "TRNVEST", "TDALORA", "BS MİMARLIK", "DYNOMARK", "DECCRANE", 
              "SİLTEM", "GÜVENLİ NABIZ", "TURAN CONCEPT", "İKLİM DANIŞMANLIK", 
              "MK PSİKOLOJİ", "TORUN İNŞAAT",
              // Repeat for seamless loop
              "TRNVEST", "TDALORA", "BS MİMARLIK", "DYNOMARK", "DECCRANE", 
              "SİLTEM", "GÜVENLİ NABIZ", "TURAN CONCEPT", "İKLİM DANIŞMANLIK", 
              "MK PSİKOLOJİ", "TORUN İNŞAAT"
            ].map((name, i) => (
              <span key={i}>{name}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Animated Gallery Section */}
      <section className="py-24 relative bg-surface overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4">Kreatif Vizyonumuz</h2>
          <p className="text-muted max-w-2xl">Projelerimizden ve stüdyomuzdan yansıyan anlar.</p>
        </div>
        
        <div className="flex gap-6 overflow-hidden py-4 px-6 group">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
            className="flex gap-6 w-max"
          >
            {[
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
            ].map((url, index) => (
              <div key={index} className="w-[280px] h-[380px] md:w-[350px] md:h-[450px] rounded-2xl overflow-hidden shrink-0 relative">
                <div className="absolute inset-0 bg-black/40 hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={url}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-110 transition-all duration-700"
                  alt={`Gallery ${index}`}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 relative bg-bg">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <HorizontalLine />
              <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4">Kanıtlanmış Başarılar</h2>
              <p className="text-muted max-w-md">Gerçek verilerle desteklenen, dönüşüm odaklı stratejilerimizin sonuçları.</p>
            </div>
            <Link to="/vaka-calismalari" className="mt-6 md:mt-0 text-gold hover:text-white transition-colors flex items-center group font-medium">
              Tümünü Gör
              <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/vaka-calismalari/dynomark" className="group bg-surface rounded-2xl p-8 border border-white/5 hover:border-gold/30 transition-all flex flex-col h-full">
              <div className="mb-8">
                <p className="text-sm text-gold font-mono mb-2">SEO & GEO</p>
                <h3 className="text-2xl font-display font-semibold">Dynomark Ordu Oto Ekspertiz</h3>
              </div>
              <div className="mt-auto">
                <p className="text-4xl md:text-5xl font-light text-white mb-4">1. Sıra</p>
                <p className="text-muted text-sm">Yerel arama sonuçlarında kalıcı liderlik ve %180 organik trafik artışı.</p>
              </div>
            </Link>
            
            <Link to="/vaka-calismalari/bs-mimarlik" className="group bg-surface rounded-2xl p-8 border border-white/5 hover:border-gold/30 transition-all flex flex-col h-full relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-gold/5 rounded-bl-full blur-3xl pointer-events-none" />
              <div className="mb-8 relative z-10">
                <p className="text-sm text-gold font-mono mb-2">SEO & Web Tasarım</p>
                <h3 className="text-2xl font-display font-semibold">BS Mimarlık</h3>
              </div>
              <div className="mt-auto relative z-10">
                <p className="text-4xl md:text-5xl font-light text-white mb-4">%300</p>
                <p className="text-muted text-sm">6 ayda organik trafikte büyüme ve teklif taleplerinde 3x artış.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-4">
              <p className="text-5xl md:text-6xl font-display font-light text-gold mb-2">150+</p>
              <p className="text-muted text-sm uppercase tracking-wider font-medium">Tamamlanan Proje</p>
            </div>
            <div className="py-4">
              <p className="text-5xl md:text-6xl font-display font-light text-gold mb-2">%210</p>
              <p className="text-muted text-sm uppercase tracking-wider font-medium">Ortalama Trafik Artışı</p>
            </div>
            <div className="py-4">
              <p className="text-5xl md:text-6xl font-display font-light text-gold mb-2">8+</p>
              <p className="text-muted text-sm uppercase tracking-wider font-medium">Yıl Deneyim</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="py-32 relative bg-bg text-center px-6 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-semibold mb-8">Rotanızı birlikte çizelim.</h2>
          <Link to="/iletisim" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors group">
            Teklif Al
            <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
