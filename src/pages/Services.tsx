import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight, Search, Globe, PenTool, Video, TrendingUp } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: "seo",
      title: "SEO",
      icon: <Search className="w-8 h-8 text-gold" />,
      description: "Arama motorlarında organik görünürlüğünüzü artırarak sürdürülebilir büyüme sağlıyoruz. Teknik altyapı, içerik stratejisi ve otorite inşası ile kalıcı sonuçlar.",
      link: "/hizmetler/seo"
    },
    {
      id: "geo",
      title: "GEO / Yapay Zekâ Aramaları",
      icon: <Globe className="w-8 h-8 text-gold" />,
      description: "ChatGPT, Gemini ve yeni nesil yapay zekâ destekli arama motorlarında markanızın doğru şekilde konumlanmasını ve tavsiye edilmesini sağlıyoruz.",
      link: "/hizmetler/geo"
    },
    {
      id: "web-tasarim",
      title: "Web Tasarım",
      icon: <PenTool className="w-8 h-8 text-gold" />,
      description: "Kullanıcı deneyimi (UX) odaklı, hızlı ve arama motorlarıyla tam uyumlu kurumsal web siteleri tasarlıyor ve geliştiriyoruz.",
      link: "/hizmetler/web-tasarim"
    },
    {
      id: "reklam",
      title: "Google & Meta Reklam Yönetimi",
      icon: <TrendingUp className="w-8 h-8 text-gold" />,
      description: "Bütçenizi en verimli şekilde kullanarak, doğru hedef kitleye ulaşıyor ve ölçülebilir, yüksek dönüşüm oranları (ROI) elde ediyoruz.",
      link: "/hizmetler/reklam"
    },
    {
      id: "video-produksiyon",
      title: "Video Prodüksiyon",
      icon: <Video className="w-8 h-8 text-gold" />,
      description: "Markanızın hikayesini en etkili şekilde anlatan kurumsal videolar, sosyal medya içerikleri ve reklam filmleri üretiyoruz.",
      link: "/hizmetler/video-produksiyon"
    }
  ];

  return (
    <>
      <SEO 
        title="Hizmetlerimiz | KAPTAN — Ankara Dijital Büyüme Stüdyosu" 
        description="SEO, GEO, Web Tasarım, Reklam Yönetimi ve Video Prodüksiyon hizmetleriyle işinizi şansa değil rotaya bırakın."
      />
      
      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">Hizmetlerimiz</h1>
          <p className="text-muted max-w-2xl text-lg mb-16">
            Bütünsel dijital büyüme stratejileriyle, markanızı hedeflerine ulaştıracak uçtan uca çözümler sunuyoruz.
          </p>

          <div className="space-y-6">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                id={service.id}
                className="group bg-surface p-8 md:p-12 rounded-2xl border border-white/5 hover:border-gold/30 transition-all flex flex-col md:flex-row gap-8 items-start md:items-center justify-between"
              >
                <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold mb-3">{service.title}</h2>
                    <p className="text-muted text-base max-w-2xl">{service.description}</p>
                  </div>
                </div>
                
                <Link 
                  to={service.link}
                  className="shrink-0 flex items-center text-sm font-medium text-white hover:text-gold transition-colors pt-4 md:pt-0"
                >
                  Detaylı İncele
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
