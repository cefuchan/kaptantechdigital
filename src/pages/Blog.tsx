import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight } from 'lucide-react';

export const blogPosts = [
  {
    slug: "geo-nedir-neden-onemli",
    title: "GEO nedir, neden önemli?",
    category: "GEO",
    date: "12 Kasım 2023",
    readTime: "5 dk okuma",
    excerpt: "Yapay zekâ destekli arama motorlarında markanızın görünürlüğünü nasıl sağlarsınız? Generative Engine Optimization rehberi."
  },
  {
    slug: "google-ads-butce-optimizasyonu",
    title: "Google Ads'te bütçe optimizasyonu nasıl yapılır?",
    category: "Reklam",
    date: "28 Ekim 2023",
    readTime: "7 dk okuma",
    excerpt: "Reklam harcamalarınızı kısmadan dönüşüm oranlarınızı ve kârlılığınızı artırmanın kanıtlanmış yolları."
  },
  {
    slug: "yerel-seo-ile-isletme-gorunurlugu",
    title: "Yerel SEO ile işletme görünürlüğü nasıl artırılır?",
    category: "SEO",
    date: "15 Ekim 2023",
    readTime: "6 dk okuma",
    excerpt: "Google Haritalar'da üst sıralara çıkmak ve çevrenizdeki potansiyel müşterileri mağazanıza çekmek için ipuçları."
  },
  {
    slug: "video-reklamda-ilk-3-saniye",
    title: "Video reklamda ilk 3 saniye kuralı",
    category: "Video",
    date: "02 Ekim 2023",
    readTime: "4 dk okuma",
    excerpt: "Kullanıcıların dikkatini anında yakalamak ve videonuzun izlenme oranlarını dramatik şekilde artırmak için stratejiler."
  },
  {
    slug: "yapay-zeka-aramalarinda-marka-gorunurlugu",
    title: "Yapay zekâ tabanlı aramalarda (ChatGPT, Gemini) marka görünürlüğü",
    category: "GEO",
    date: "18 Eylül 2023",
    readTime: "8 dk okuma",
    excerpt: "Büyük dil modellerinin markanızı tavsiye etmesini sağlamak için uygulamanız gereken semantik stratejiler."
  },
  {
    slug: "ankara-dijital-pazarlama-egitimi-ve-kursu",
    title: "Ankara Dijital Pazarlama Eğitimi ve Sertifikalı Kursları",
    category: "Eğitim",
    date: "10 Ağustos 2024",
    readTime: "10 dk okuma",
    excerpt: "Dijital pazarlama kursu, digital marketing eğitimi ve pazarlama sertifikası almak isteyenler için Ankara dijital pazarlama eğitim rehberi."
  },
  {
    slug: "kurumsal-web-tasarim-ankara-ajans",
    title: "Ankara Kurumsal Web Tasarım, Yazılım ve Site Tasarımı",
    category: "Web",
    date: "15 Ağustos 2024",
    readTime: "12 dk okuma",
    excerpt: "Ankara web tasarım firmaları arasında öne çıkan çözümlerimizle web sitesi tasarımı, internet sitesi tasarımı ve ankara web yazılım hizmetleri."
  },
  {
    slug: "seo-merkezi-ankara-google-ads",
    title: "Ankara SEO Merkezi, Web Tasarım SEO ve Google Ads",
    category: "SEO",
    date: "20 Ağustos 2024",
    readTime: "9 dk okuma",
    excerpt: "Site web seo, seo marketing digital, adwords ads ve marketing google ads stratejileriyle ankara web tasarımı ve seo hizmeti."
  },
  {
    slug: "sosyal-medya-ve-dijital-pazar-satis",
    title: "Sosyal Medya ve Dijital Pazarlama: Satışları Artırmak",
    category: "Pazarlama",
    date: "25 Ağustos 2024",
    readTime: "11 dk okuma",
    excerpt: "Dijital medya ve pazarlama, dijital pazar, dijital pazarlama ve satış ile pazarlama eğitimleri sayesinde markanızı büyütün."
  },
  {
    slug: "web-tasarim-fiyatlari-ankara-siteler",
    title: "Web Sitesi Fiyatları Ankara: Siteler ve Altındağ Web Tasarım",
    category: "Web",
    date: "28 Ağustos 2024",
    readTime: "8 dk okuma",
    excerpt: "Ankara siteler web tasarım, ankara altındağ web tasarım ve web sayfası tasarımı fiyatlandırmaları hakkında detaylı yazılımcılık rehberi."
  },
  {
    slug: "ankara-siteler-web-tasarim-ajansi",
    title: "Ankara Siteler Web Tasarım ve Mobilya Sektörü Çözümleri",
    category: "Web",
    date: "01 Eylül 2024",
    readTime: "7 dk okuma",
    excerpt: "Ankara Siteler web tasarım ihtiyaçlarınız için mobilya sektörüne özel, yüksek dönüşüm sağlayan kurumsal web sitesi tasarımları."
  },
  {
    slug: "ankara-saglik-turizmi-seo-hizmetleri",
    title: "Ankara Sağlık Turizmi SEO Stratejileri ile Hasta Çekin",
    category: "SEO",
    date: "05 Eylül 2024",
    readTime: "9 dk okuma",
    excerpt: "Klinik ve hastaneler için Ankara Sağlık Turizmi SEO çalışmaları ile yurt dışından ve yurt içinden potansiyel hastaları hedefleyin."
  },
  {
    slug: "ankara-seo-uzmani-ve-danismanligi",
    title: "Ankara SEO Danışmanlığı: Organik Trafiğinizi Katlayın",
    category: "SEO",
    date: "10 Eylül 2024",
    readTime: "11 dk okuma",
    excerpt: "Profesyonel Ankara SEO hizmetleri ve veri odaklı stratejilerle Google sıralamalarınızı kalıcı olarak zirveye taşıyın."
  },
  {
    slug: "ankara-geo-yapay-zeka-optimizasyonu",
    title: "Ankara GEO: Yapay Zekâ Aramalarında Öne Çıkın",
    category: "GEO",
    date: "15 Eylül 2024",
    readTime: "8 dk okuma",
    excerpt: "Ankara GEO (Generative Engine Optimization) ajansı olarak yapay zekâ destekli arama motorlarında markanızı geleceğe hazırlıyoruz."
  },
  {
    slug: "ankara-seo-firmalari-ile-dijitalde-zirveye-giden-yol",
    title: "Ankara SEO Firmaları ile Dijitalde Zirveye Giden Yol",
    category: "SEO",
    date: "23 Temmuz 2026",
    readTime: "4 dk okuma",
    excerpt: "Başkent Ankara’nın hızla dijitalleşen ticari ekosisteminde var olmak, artık sadece bir web sitesine sahip olmaktan çok daha fazlasını gerektiriyor."
  },
  {
    slug: "ankara-siteler-mobilya-ve-imalat-sektorune-ozel-dijital-rehber",
    title: "Ankara Siteler Mobilya ve İmalat Sektörüne Özel Dijital Rehber",
    category: "Web & SEO",
    date: "23 Temmuz 2026",
    readTime: "4 dk okuma",
    excerpt: "Ankara’nın ve Türkiye’nin en köklü mobilya, ahşap ve imalat merkezlerinden biri olan Siteler (Altındağ), binlerce atölye ve mağazasıyla devasa bir üretim gücüne sahip."
  }
];

export default function Blog() {
  const categories = ["Tümü", "SEO", "GEO", "Reklam", "Web", "Video", "Eğitim", "Pazarlama"];

  return (
    <>
      <SEO 
        title="İçgörüler & Blog | KAPTAN — Ankara Dijital Büyüme Stüdyosu" 
        description="Dijital pazarlama, SEO, reklam yönetimi ve web tasarım üzerine stratejik içgörüler ve rehberler."
      />
      
      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">İçgörüler</h1>
          <p className="text-muted max-w-2xl text-lg mb-16">
            Dijital dünyadaki son trendler, veri odaklı stratejiler ve sektör rehberleri.
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category, index) => (
              <button 
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  index === 0 
                    ? 'border-gold text-gold bg-gold/10' 
                    : 'border-white/10 text-muted hover:border-white/30 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.slug}
                to={`/blog/${post.slug}`} 
                className="group bg-surface rounded-2xl border border-white/5 hover:border-gold/30 transition-all overflow-hidden flex flex-col h-full"
              >
                {/* Image Placeholder */}
                <div className="w-full aspect-[16/10] bg-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-surface to-surface/0 opacity-50 z-10" />
                  <div className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" />
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gold font-mono tracking-widest uppercase">{post.category}</span>
                    <span className="text-xs text-muted">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-display font-semibold mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted text-sm line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between text-sm text-muted">
                    <span>{post.date}</span>
                    <span className="flex items-center text-white font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      Okumaya Devam Et
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </span>
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
