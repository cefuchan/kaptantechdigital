import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

const serviceData: Record<string, any> = {
  "seo": {
    title: "SEO",
    slogan: "Arama Motoru Optimizasyonu",
    description: "Web sitenizin organik arama sonuçlarında üst sıralarda yer alması tesadüf değildir. Kapsamlı teknik denetimler, otorite inşası ve veri odaklı içerik stratejileriyle uzun vadeli büyüme rotanızı çiziyoruz.",
    whatWeDo: [
      "Kapsamlı Teknik SEO Denetimi ve İyileştirmesi",
      "Anahtar Kelime ve Rakip Analizi",
      "İçerik Stratejisi ve Optimizasyonu",
      "Yerel SEO (Google İşletme Profili) Yönetimi",
      "Site Hızı ve Core Web Vitals Optimizasyonu",
      "Backlink ve Otorite İnşası"
    ],
    whyUs: "Standart SEO paketleri sunmuyoruz. Her sektörün arama dinamiği farklıdır; iş hedeflerinize doğrudan etki edecek en kârlı anahtar kelimelere odaklanıyoruz."
  },
  "geo": {
    title: "GEO / Yapay Zekâ Aramaları",
    slogan: "Geleceğin Arama Alışkanlıklarına Hazırlanın",
    description: "Kullanıcılar artık sadece Google'da aramıyor, yapay zekâ asistanlarına danışıyor. Markanızın ChatGPT, Gemini, Perplexity gibi platformlarda referans gösterilmesini sağlıyoruz.",
    whatWeDo: [
      "AI Motorları İçin Bilgi Grafiği Optimizasyonu",
      "Marka Mention ve Otorite Çalışmaları",
      "Soru-Cevap ve Niyet Odaklı İçerik Üretimi",
      "Semantik Ağ Geliştirme",
      "Büyük Dil Modelleri (LLM) İçin Veri Yapılandırması"
    ],
    whyUs: "Geleneksel SEO'nun ötesine geçerek, markanızın yeni nesil yapay zekâ destekli arama platformlarında bir otorite ve güvenilir kaynak olarak algılanmasını sağlıyoruz."
  },
  "web-tasarim": {
    title: "Web Tasarım",
    slogan: "Kullanıcı Deneyimi ve Dönüşüm Odaklı Mimari",
    description: "Bir web sitesi sadece güzel görünmemeli, ziyaretçileri müşteriye dönüştürmelidir. Hızlı, güvenli, SEO uyumlu ve marka kimliğinizi yansıtan dijital deneyimler tasarlıyoruz.",
    whatWeDo: [
      "UX/UI Tasarım ve Prototipleme",
      "Modern ve Hızlı Ön-yüz (Frontend) Geliştirme",
      "Mobil Öncelikli (Mobile-First) Mimari",
      "Dönüşüm Oranı Optimizasyonu (CRO)",
      "Güvenli ve Ölçeklenebilir Altyapı Kurulumu",
      "Performans ve Hız Optimizasyonu"
    ],
    whyUs: "Hazır şablonlar kullanmak yerine, markanızın hikayesine ve hedeflerine özel, teknik olarak kusursuz, 'el yapımı' dijital platformlar inşa ediyoruz."
  },
  "reklam": {
    title: "Google & Meta Reklam Yönetimi",
    slogan: "Veriye Dayalı, Hedef Odaklı Kampanyalar",
    description: "Reklam bütçenizi boşa harcamayın. Doğru hedef kitleye, doğru zamanda, doğru mesajla ulaşarak maksimum dönüşüm ve kârlılık (ROAS) elde etmenizi sağlıyoruz.",
    whatWeDo: [
      "Kapsamlı Kampanya Mimarisi Kurulumu",
      "Arama Ağı (Search) ve Görüntülü (Display) Reklamlar",
      "Meta (Facebook, Instagram) Reklam Stratejileri",
      "Dinamik Yeniden Pazarlama (Remarketing)",
      "A/B Testleri ve Sürekli Optimizasyon",
      "Gelişmiş Dönüşüm İzleme ve Raporlama"
    ],
    whyUs: "Reklam harcamalarını bir gider değil, yatırım olarak görüyoruz. Sürekli optimizasyon ve şeffaf raporlama ile bütçenizin tam kontrolünü sağlıyoruz."
  },
  "video-produksiyon": {
    title: "Video Prodüksiyon",
    slogan: "Markanızın Hikayesini Görselleştirin",
    description: "Etkileyici görsel anlatımla markanızın algısını yükseltin. Kurumsal tanıtım filmlerinden kısa sosyal medya içeriklerine kadar profesyonel prodüksiyon hizmetleri sunuyoruz.",
    whatWeDo: [
      "Kurumsal Tanıtım Filmleri",
      "Sosyal Medya Video İçerikleri (Reels, Shorts)",
      "Ürün ve Hizmet Tanıtım Videoları",
      "Röportaj ve Belgesel Çekimleri",
      "Post-Prodüksiyon (Kurgu, Renk, Ses)",
      "Drone Çekimleri"
    ],
    whyUs: "Sinematik kaliteyi dijital pazarlama stratejisiyle birleştiriyoruz. Sadece güzel görünen değil, mesajınızı en etkili şekilde ileten videolar üretiyoruz."
  }
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceData[slug || ""];

  if (!service) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-display">Hizmet bulunamadı.</h1>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${service.title} | KAPTAN`} 
        description={service.description}
      />
      
      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <HorizontalLine />
          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">{service.slogan}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold mb-8">{service.title}</h1>
          <p className="text-muted text-lg md:text-xl max-w-3xl leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-surface p-8 md:p-10 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-display font-semibold mb-8 flex items-center">
              <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center mr-3 text-sm">01</span>
              Ne Yapıyoruz?
            </h2>
            <ul className="space-y-4">
              {service.whatWeDo.map((item: string, i: number) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-gold mr-3 shrink-0" />
                  <span className="text-text-primary/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface p-8 md:p-10 rounded-2xl border border-white/5 flex flex-col">
            <h2 className="text-2xl font-display font-semibold mb-8 flex items-center">
              <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center mr-3 text-sm">02</span>
              Neden KAPTAN?
            </h2>
            <p className="text-muted text-lg leading-relaxed flex-grow">
              {service.whyUs}
            </p>
            
            <div className="mt-12 pt-8 border-t border-white/10">
               <Link to="/iletisim" className="inline-flex items-center text-gold font-medium hover:text-white transition-colors group">
                Bu hizmet için teklif alın
                <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
