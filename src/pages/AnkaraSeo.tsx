import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from '../data/schema';

const pillars = [
  ['Teknik SEO', 'Tarama, indeksleme, sayfa hızı, mobil deneyim, yapılandırılmış veri ve Core Web Vitals kontrolleriyle sitenizin arama motorları için güçlü bir temel üzerinde çalışmasını sağlarız.'],
  ['Yerel SEO', 'Google İşletme Profili, konum odaklı hizmet sayfaları, tutarlı iletişim bilgileri ve güven sinyalleriyle Ankara’daki doğru müşterilere ulaşmanıza yardımcı oluruz.'],
  ['İçerik Stratejisi', 'Anahtar kelimeleri kullanıcı niyeti ve ticari değerle eşleştirir; hizmet, rehber, SSS ve vaka içeriğini birbirini destekleyen bir bilgi mimarisi olarak planlarız.'],
  ['Otorite ve Ölçümleme', 'Marka görünürlüğünü, kaliteli kaynak sinyallerini, organik trafik ve dönüşümleri birlikte izler; stratejiyi düzenli verilerle iyileştiririz.']
];

const faqs = [
  ['Ankara SEO çalışması neyi kapsar?', 'Teknik altyapı analizi, anahtar kelime ve rakip araştırması, yerel SEO, içerik optimizasyonu, sayfa deneyimi ve dönüşüm takibini kapsayan sürekli bir gelişim sürecidir.'],
  ['Ankara SEO sonuçları ne zaman görülür?', 'Sitenin mevcut durumu, rekabet düzeyi ve hedeflenen sorgulara göre değişir. İlk teknik ve içerik iyileştirmelerinin etkisi erken dönemde görülebilir; sürdürülebilir görünürlük için düzenli çalışma gerekir.'],
  ['SEO ile Google Ads birlikte kullanılmalı mı?', 'SEO uzun vadeli organik talep oluştururken Google Ads belirli aramalarda hızlı görünürlük sağlayabilir. Hedefe ve bütçeye göre iki kanalın birlikte çalışacağı plan oluşturulabilir.'],
  ['Yerel SEO Siteler gibi bölgelerde neden önemlidir?', 'Bölgesel arama yapan kullanıcılar genellikle hizmet alma niyetindedir. Konum, hizmet ve güven bilgilerini doğru sunmak; ilgili yerel aramalarda bulunabilirliği ve nitelikli talep potansiyelini artırır.']
];

const crumbs = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Ankara SEO', path: '/ankara-seo' }
];

const schema = graph(
  serviceSchema({
    name: 'Ankara SEO Hizmeti',
    description:
      'Ankara işletmeleri için teknik SEO, yerel SEO, içerik stratejisi ve organik büyüme hizmetleri.',
    path: '/ankara-seo',
    serviceType: 'Arama Motoru Optimizasyonu',
    offers: pillars.map(([title]) => title)
  }),
  faqSchema(faqs.map(([question, answer]) => ({ question, answer }))),
  breadcrumbSchema(crumbs)
);

export default function AnkaraSeo() {
  return <>
    <SEO
      title="Ankara SEO Hizmeti | Teknik, Yerel ve İçerik SEO | KAPTAN"
      description="Ankara SEO hizmetiyle teknik altyapınızı, yerel görünürlüğünüzü ve organik müşteri edinme kanalınızı güçlendirin."
      url="/ankara-seo"
      schema={schema}
    />
    <main className="pt-32 pb-24 bg-bg relative min-h-screen">
      <VerticalLine />
      <div className="max-w-7xl mx-auto px-6">
        <HorizontalLine />
        <Breadcrumbs items={crumbs} />
        <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Ankara SEO Hizmeti</p>
        <h1 className="text-4xl md:text-6xl font-display font-semibold max-w-4xl mb-8">Ankara’da organik görünürlüğü gerçek iş fırsatlarına dönüştürün.</h1>
        <div className="max-w-3xl text-muted text-lg leading-relaxed space-y-5 mb-10">
          <p>Ankara SEO çalışması, yalnızca Google’da daha üst sıralarda görünmekten ibaret değildir. Doğru müşterinin doğru anda karşısına çıkmak; bunun için de teknik altyapıyı, içerik kalitesini, yerel sinyalleri ve güven unsurlarını birlikte geliştirmek gerekir.</p>
          <p>KAPTAN, Ankara’daki işletmeler için arama niyetini ve rekabeti analiz eder. Bu analizi; hızlı, anlaşılır, taranabilir web sayfaları ile nitelikli form, telefon ve teklif talepleri üretmeye odaklanan sürdürülebilir bir SEO planına dönüştürür.</p>
        </div>
        <Link to="/iletisim" className="inline-flex items-center px-6 py-3 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors">Ankara SEO analizi isteyin <ArrowUpRight className="w-5 h-5 ml-2" /></Link>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">{pillars.map(([title, text], index) => <article key={title} className="bg-surface p-8 rounded-2xl border border-white/5"><span className="text-gold font-mono text-xs">0{index + 1}</span><h2 className="text-2xl font-display font-semibold mt-4 mb-3">{title}</h2><p className="text-muted leading-relaxed">{text}</p></article>)}</section>

        <section className="mt-24 max-w-4xl"><p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Çalışma biçimi</p><h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">Tahmine değil veriye dayalı bir yol haritası.</h2><div className="space-y-5 text-muted text-lg leading-relaxed"><p>Önce sitenizin teknik durumunu, mevcut anahtar kelime görünürlüğünü, rakiplerini ve kullanıcıların arama niyetini inceleriz. Ardından en hızlı etki yaratacak teknik iyileştirmeleri ve uzun vadeli içerik fırsatlarını önceliklendiririz.</p><p>SEO çalışmalarını reklam ve web tasarım süreçlerinden ayrı düşünmeyiz. Sayfanın mesajı, hızı, yönlendirmesi ve ölçümleme altyapısı birlikte çalıştığında organik ziyaretçiler için daha net ve güven veren bir deneyim oluşur.</p><ul className="space-y-3 pt-2">{['Detaylı teknik SEO ve rakip analizi', 'Yerel görünürlük ve Google İşletme Profili optimizasyonu', 'Arama niyetine göre içerik planı', 'Organik trafik, teklif ve dönüşüm raporlama'].map(item => <li key={item} className="flex items-start"><CheckCircle2 className="w-5 h-5 text-gold mr-3 shrink-0 mt-1" />{item}</li>)}</ul></div></section>

        <section className="mt-24 max-w-4xl"><p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Sık sorulanlar</p><div className="space-y-4">{faqs.map(([question, answer]) => <article key={question} className="bg-surface p-7 rounded-2xl border border-white/5"><h2 className="text-xl font-display font-semibold mb-3">{question}</h2><p className="text-muted leading-relaxed">{answer}</p></article>)}</div></section>
      </div>
    </main>
  </>;
}
