/**
 * Blog yazılarının meta verisi. Yazı gövdeleri src/content/blog/<slug>.html
 * dosyalarında tutulur ve BlogPost sayfasında talebe göre yüklenir.
 *
 * Bu dosya add_blog.py tarafından da güncellenir; biçimi koruyun.
 */
export interface BlogPostMeta {
  slug: string;
  title: string;
  category: string;
  /** Listede gösterilen Türkçe tarih. */
  date: string;
  /** JSON-LD ve og:article için ISO 8601 tarih. */
  datePublished: string;
  readTime: string;
  excerpt: string;
  /**
   * Yazı arama motorlarına sunuluyor mu?
   *
   * false olan yazılar sitede kalır ve blog listesinden okunabilir; yalnızca
   * `noindex` alır ve sitemap dışında tutulur. Bunlar, konusunu kendi hizmet
   * sayfasının çok daha iyi karşıladığı kısa yazılar. Yeni bir alan adında
   * bu sayfaları indekse sunmak, taranmayı hak eden sayfaların tarama
   * bütçesini bölüyor.
   *
   * İçerik genişletilirse bu satır silinerek yazı indekse geri alınır.
   */
  index?: boolean;
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "google-ai-overviews-ve-arama-deneyimi-rehberi",
    title: "Google AI Overviews Nedir? Markalar Yapay Zekâ Özetlerinde Nasıl Kaynak Gösterilir?",
    category: "GEO",
    date: "27 Ağustos 2026",
    datePublished: "2026-08-27",
    readTime: "3 dk okuma",
    excerpt: "Google AI Overviews (SGE) yapay zekâ özetlerinde markanızı kaynak kartı olarak öne çıkarmanın ve organik görünürlüğü artırmanın stratejileri.",
    // 334 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "llm-seo-yapay-zeka-aramalarinda-marka-tavsiyesi",
    title: "LLM SEO: ChatGPT, Gemini ve Perplexity'de Markanızı Tavsiye Ettirmenin Yolları",
    category: "GEO",
    date: "27 Ağustos 2026",
    datePublished: "2026-08-27",
    readTime: "3 dk okuma",
    excerpt: "Büyük dil modellerinin (LLM) arama ve tavsiye mekanizması nasıl çalışır? ChatGPT ve Gemini'da ilk önerilen ajans olma rehberi."
  },
  {
    slug: "teknik-sema-ve-schema-org-yapilandirilmis-veri-rehberi",
    title: "Teknik Şema (Schema.org) Rehberi: Yapay Zekâ ve Google İçin Yapılandırılmış Veri",
    category: "SEO",
    date: "27 Ağustos 2026",
    datePublished: "2026-08-27",
    readTime: "3 dk okuma",
    excerpt: "JSON-LD ve Schema.org mimarisiyle web sitenizi hem Google zengin sonuçlarına hem de yapay zekâ botlarına tam uyumlu hale getirin.",
    // 336 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "geo-nedir-neden-onemli",
    title: "GEO nedir, neden önemli?",
    category: "GEO",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "1 dk okuma",
    excerpt: "Yapay zekâ destekli arama motorlarında markanızın görünürlüğünü nasıl sağlarsınız? Generative Engine Optimization rehberi.",
    // 297 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "google-ads-butce-optimizasyonu",
    title: "Google Ads'te bütçe optimizasyonu nasıl yapılır?",
    category: "Reklam",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "2 dk okuma",
    excerpt: "Reklam harcamalarınızı kısmadan dönüşüm oranlarınızı ve kârlılığınızı artırmanın kanıtlanmış yolları.",
    // 315 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "yerel-seo-ile-isletme-gorunurlugu",
    title: "Yerel SEO ile işletme görünürlüğü nasıl artırılır?",
    category: "SEO",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "1 dk okuma",
    excerpt: "Google Haritalar'da üst sıralara çıkmak ve çevrenizdeki potansiyel müşterileri mağazanıza çekmek için ipuçları.",
    // 291 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "video-reklamda-ilk-3-saniye",
    title: "Video reklamda ilk 3 saniye kuralı",
    category: "Video",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "1 dk okuma",
    excerpt: "Kullanıcıların dikkatini anında yakalamak ve videonuzun izlenme oranlarını dramatik şekilde artırmak için stratejiler.",
    // 272 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "yapay-zeka-aramalarinda-marka-gorunurlugu",
    title: "Yapay zekâ tabanlı aramalarda (ChatGPT, Gemini) marka görünürlüğü",
    category: "GEO",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "2 dk okuma",
    excerpt: "Büyük dil modellerinin markanızı tavsiye etmesini sağlamak için uygulamanız gereken semantik stratejiler."
  },
  {
    slug: "ankara-dijital-pazarlama-egitimi-ve-kursu",
    title: "Ankara Dijital Pazarlama Eğitimi ve Sertifikalı Kursları",
    category: "Eğitim",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "2 dk okuma",
    excerpt: "Dijital pazarlama kursu, digital marketing eğitimi ve pazarlama sertifikası almak isteyenler için Ankara dijital pazarlama eğitim rehberi."
  },
  {
    slug: "kurumsal-web-tasarim-ankara-ajans",
    title: "Ankara Kurumsal Web Tasarım, Yazılım ve Site Tasarımı",
    category: "Web",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "2 dk okuma",
    excerpt: "Ankara web tasarım firmaları arasında öne çıkan çözümlerimizle web sitesi tasarımı, internet sitesi tasarımı ve ankara web yazılım hizmetleri.",
    // 329 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "seo-merkezi-ankara-google-ads",
    title: "Ankara SEO Merkezi, Web Tasarım SEO ve Google Ads",
    category: "SEO",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "2 dk okuma",
    excerpt: "Site web seo, seo marketing digital, adwords ads ve marketing google ads stratejileriyle ankara web tasarımı ve seo hizmeti.",
    // 321 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "sosyal-medya-ve-dijital-pazar-satis",
    title: "Sosyal Medya ve Dijital Pazarlama: Satışları Artırmak",
    category: "Pazarlama",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "2 dk okuma",
    excerpt: "Dijital medya ve pazarlama, dijital pazar, dijital pazarlama ve satış ile pazarlama eğitimleri sayesinde markanızı büyütün.",
    // 323 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "web-tasarim-fiyatlari-ankara-siteler",
    title: "Web Sitesi Fiyatları Ankara: Siteler ve Altındağ Web Tasarım",
    category: "Web",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "2 dk okuma",
    excerpt: "Ankara siteler web tasarım, ankara altındağ web tasarım ve web sayfası tasarımı fiyatlandırmaları hakkında detaylı yazılımcılık rehberi.",
    // 315 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "ankara-siteler-web-tasarim-ajansi",
    title: "Ankara Siteler Web Tasarım ve Mobilya Sektörü Çözümleri",
    category: "Web",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "1 dk okuma",
    excerpt: "Ankara Siteler web tasarım ihtiyaçlarınız için mobilya sektörüne özel, yüksek dönüşüm sağlayan kurumsal web sitesi tasarımları.",
    // 181 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "ankara-siteler-dijital-pazarlama",
    title: "Ankara Siteler Dijital Pazarlama ile Nitelikli Müşteri Adaylarına Ulaşın",
    category: "Pazarlama",
    date: "05 Ağustos 2026",
    datePublished: "2026-08-05",
    readTime: "1 dk okuma",
    excerpt: "Ankara Siteler dijital pazarlama stratejisinde SEO, reklam ve içerik kanallarını ortak bir büyüme hedefinde birleştirin.",
    // 151 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "ankara-siteler-reklam-ajansi",
    title: "Ankara Siteler Reklam Ajansı Seçerken Nelere Dikkat Etmelisiniz?",
    category: "Reklam",
    date: "05 Ağustos 2026",
    datePublished: "2026-08-05",
    readTime: "1 dk okuma",
    excerpt: "Ankara Siteler reklam ajansı seçiminde yaratıcı fikirleri, ölçülebilir performansı ve marka stratejisini birlikte değerlendirin.",
    // 148 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "ankara-saglik-turizmi-seo-hizmetleri",
    title: "Ankara Sağlık Turizmi SEO Stratejileri ile Hasta Çekin",
    category: "SEO",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "2 dk okuma",
    excerpt: "Klinik ve hastaneler için Ankara Sağlık Turizmi SEO çalışmaları ile yurt dışından ve yurt içinden potansiyel hastaları hedefleyin."
  },
  {
    slug: "ankara-seo-uzmani-ve-danismanligi",
    title: "Ankara SEO Danışmanlığı: Organik Trafiğinizi Katlayın",
    category: "SEO",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "1 dk okuma",
    excerpt: "Profesyonel Ankara SEO hizmetleri ve veri odaklı stratejilerle Google sıralamalarınızı kalıcı olarak zirveye taşıyın.",
    // 298 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "ankara-geo-yapay-zeka-optimizasyonu",
    title: "Ankara GEO: Yapay Zekâ Aramalarında Öne Çıkın",
    category: "GEO",
    date: "26 Ağustos 2026",
    datePublished: "2026-08-26",
    readTime: "2 dk okuma",
    excerpt: "Ankara GEO (Generative Engine Optimization) ajansı olarak yapay zekâ destekli arama motorlarında markanızı geleceğe hazırlıyoruz.",
    // 302 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "ankara-seo-firmalari-ile-dijitalde-zirveye-giden-yol",
    title: "Ankara SEO Firmaları ile Dijitalde Zirveye Giden Yol",
    category: "SEO",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "5 dk okuma",
    excerpt: "Başkent Ankara’nın hızla dijitalleşen ticari ekosisteminde var olmak, artık sadece bir web sitesine sahip olmaktan çok daha fazlasını gerektiriyor."
  },
  {
    slug: "ankara-siteler-mobilya-ve-imalat-sektorune-ozel-dijital-rehber",
    title: "Ankara Siteler Mobilya ve İmalat Sektörüne Özel Dijital Rehber",
    category: "Web & SEO",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "3 dk okuma",
    excerpt: "Ankara’nın ve Türkiye’nin en köklü mobilya, ahşap ve imalat merkezlerinden biri olan Siteler (Altındağ), binlerce atölye ve mağazasıyla devasa bir üretim gücüne sahip."
  },
  {
    slug: "ankara-seo-firmalarinin-en-cok-dikkat-ettigi-kurallar",
    title: "Ankara SEO Firmalarının En Çok Dikkat Ettiği 10 Teknik Kural",
    category: "SEO",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "2 dk okuma",
    excerpt: "Bir SEO projesinin ilk haftasında kontrol edilen teknik başlıklar: kanonik yapı, başlık hiyerarşisi, ön render, Core Web Vitals ve ölçümleme."
  },
  {
    slug: "ankara-web-tasarim-ve-seo-rehberi-kurumsal-web-sitesi-fiyatlari-ve-ajans-secimi",
    title: "Ankara Web Tasarım ve SEO Rehberi: Kurumsal Web Sitesi Fiyatları ve Ajans Seçimi",
    category: "Web",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "2 dk okuma",
    excerpt: "Ankara'da kurumsal web sitesi yaptırmak isteyen işletmeler için web tasarım firmaları, SEO uyumlu site özellikleri ve 2026 web tasarım fiyatları rehberi.",
    // 302 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "ankara-seo-firmalari-ve-web-tasarim-rehberi-2026-dijital-buyume-ve-seo-fiyatlari",
    title: "Ankara SEO Firmaları ve Web Tasarım Rehberi: 2026 Dijital Büyüme ve SEO Fiyatları",
    category: "SEO",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "9 dk okuma",
    excerpt: "Ankara SEO firmaları, web tasarım ajansları ve Google Ads stratejileri ile işletmenizi üst sıralara taşıyın. 2026 SEO fiyatları ve kurumsal dijital pazarlama rehberi."
  },
  {
    slug: "ostim-ve-ivedik-osb-firmalari-icin-ankara-web-tasarim-ve-seo-rehberi-sanayide-b2b-dijital-pazarlama",
    title: "OSTİM ve İvedik OSB Firmaları İçin Ankara Web Tasarım ve SEO Rehberi: Sanayide B2B Dijital Pazarlama",
    category: "B2B",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "8 dk okuma",
    excerpt: "Ankara OSTİM ve İvedik OSB'deki imalatçı ve sanayi firmaları için B2B web tasarımı, SEO stratejileri ve 2026 kurumsal web sitesi rehberi."
  },
  {
    slug: "ankara-kurumsal-hizmet-sektoru-icin-web-tasarim-ve-seo-rehberi-cankaya-ve-kizilay-b2b-hizmet-odakli-dijital-buyume",
    title: "Ankara Kurumsal Hizmet Sektörü İçin Web Tasarım ve SEO Rehberi: Çankaya ve Kızılay B2B & Hizmet Odaklı Dijital Büyüme",
    category: "Kurumsal",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "7 dk okuma",
    excerpt: "Ankara Çankaya ve Kızılay merkezli hukuk, sağlık, danışmanlık ve kurumsal hizmet firmaları için web tasarımı, SEO stratejileri ve 2026 dijital pazarlama rehberi."
  },
  {
    slug: "ankara-e-ticaret-ve-perakende-sektoru-icin-web-tasarim-ve-seo-rehberi-2026-e-ticaret-fiyatlari-ve-dijital-satis",
    title: "Ankara E-Ticaret ve Perakende Sektörü İçin Web Tasarım ve SEO Rehberi: 2026 E-Ticaret Fiyatları ve Dijital Satış",
    category: "E-Ticaret",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "7 dk okuma",
    excerpt: "Ankara merkezli mağazalar, üreticiler ve e-ticaret markaları için SEO uyumlu e-ticaret web tasarımı, Google Alışveriş reklamları ve 2026 satış artırma rehberi."
  },
  {
    slug: "ankara-seo-calismalari-dijital-buyume-ve-arama-motoru-optimizasyonu-kapsamli-baskent-rehberi",
    title: "Ankara SEO Çalışmaları, Dijital Büyüme ve Arama Motoru Optimizasyonu: Kapsamlı Başkent Rehberi",
    category: "SEO",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "4 dk okuma",
    excerpt: "Ankara'daki işletmelerin dijital varlıklarını zirveye taşıyabileceği; yerel SEO, teknik altyapı ve GEO stratejilerini içeren kapsamlı başkent rehberi."
  },
  {
    slug: "ankara-web-site-fiyatlari-2026-kurumsal-e-ticaret-ve-ozel-yazilim-maliyetleri",
    title: "Ankara Web Site Fiyatları 2026: Kurumsal, E-Ticaret ve Özel Yazılım Maliyetleri",
    category: "Web",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "2 dk okuma",
    excerpt: "Ankara'daki web tasarım ve yazılım ajanslarının güncel fiyat politikaları; kurumsal site, e-ticaret ve özel yazılım maliyetleri rehberi."
  },
  {
    slug: "ankara-dijital-ajans-ve-buyume-studyolari-video-produksiyon-seo-ve-web-gelistirme-ile-kurumsal-olceklenme-rehberi",
    title: "Ankara Dijital Ajans ve Büyüme Stüdyoları: Video Prodüksiyon, SEO ve Web Geliştirme ile Kurumsal Ölçeklenme Rehberi",
    category: "Dijital Büyüme",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "3 dk okuma",
    excerpt: "Ankara'daki işletmelerin dijital ekosistemde ölçeklenmesi için video prodüksiyon, SEO, web tasarım ve yapay zeka destekli pazarlama stratejileri rehberi."
  },
  {
    slug: "ankara-dijital-buyume-ve-web-yazilim-stratejileri-kapsamli-kurumsal-donusum-ve-seo-rehberi",
    title: "Ankara Dijital Büyüme ve Web Yazılım Stratejileri: Kapsamlı Kurumsal Dönüşüm ve SEO Rehberi",
    category: "Dijital Büyüme",
    date: "23 Temmuz 2026",
    datePublished: "2026-07-23",
    readTime: "3 dk okuma",
    excerpt: "Ankara'daki işletmelerin dijital ekosistemde ölçeklenmesi için video prodüksiyon, ileri düzey SEO, Next.js web geliştirme ve yapay zeka entegrasyonları rehberi."
  },
  {
    slug: "ankara-video-cekimi",
    title: "Ankara Video Çekimi",
    category: "Video",
    date: "28 Temmuz 2026",
    datePublished: "2026-07-28",
    readTime: "1 dk okuma",
    excerpt: "Ankara video çekim hizmetlerimiz hakkında detaylı bilgi alın.",
    // 133 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "ankara-reels-cekimi-ile-sosyal-medyada-one-cikin",
    title: "Ankara Reels Çekimi ile Sosyal Medyada Öne Çıkın",
    category: "Video",
    date: "28 Temmuz 2026",
    datePublished: "2026-07-28",
    readTime: "1 dk okuma",
    excerpt: "Ankara reels çekim hizmetlerimizle Instagram ve TikTok'ta markanızın erişimini artırın. Trend içerikler ve profesyonel kurgu çözümleri.",
    // 147 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "ankara-video-produksiyon-hizmetleri-ve-kurumsal-cozumler",
    title: "Ankara Video Prodüksiyon Hizmetleri ve Kurumsal Çözümler",
    category: "Video",
    date: "28 Temmuz 2026",
    datePublished: "2026-07-28",
    readTime: "1 dk okuma",
    excerpt: "Ankara video prodüksiyon hizmetlerimizle markanızın hikayesini yüksek kaliteli sinematik içeriklere dönüştürün. Profesyonel ekipman ve uzman kurgu çözümleri.",
    // 164 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  },
  {
    slug: "ankara-kurumsal-tanitim-filmi-cekimi-ile-markanizi-buyutun",
    title: "Ankara Kurumsal Tanıtım Filmi Çekimi ile Markanızı Büyütün",
    category: "Video",
    date: "28 Temmuz 2026",
    datePublished: "2026-07-28",
    readTime: "1 dk okuma",
    excerpt: "Ankara kurumsal tanıtım filmi çekimi hizmetlerimizle şirketinizin vizyonunu, tesislerini ve hizmetlerini profesyonel sinematik çekimlerle anlatın.",
    // 141 kelime — indekslenmeye yetmiyor, konuyu güçlü kardeş sayfa karşılıyor
    index: false
  }
];

/** En yeni yazılar önce gelecek şekilde sıralanmış kopya. */
export const blogPostsByDate: BlogPostMeta[] = [...blogPosts].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished)
);

export function findBlogPost(slug?: string): BlogPostMeta | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Aynı kategorideki diğer yazılar; yoksa en yeni yazılarla tamamlanır. */
export function relatedBlogPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = findBlogPost(slug);
  if (!current) return blogPostsByDate.slice(0, limit);

  const sameCategory = blogPostsByDate.filter(
    (post) => post.slug !== slug && post.category === current.category
  );
  const others = blogPostsByDate.filter(
    (post) => post.slug !== slug && post.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Yazı arama motorlarına sunuluyor mu? (`index: false` verilmemişse evet) */
export function isBlogPostIndexable(post: BlogPostMeta): boolean {
  return post.index !== false;
}
