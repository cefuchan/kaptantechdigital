import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';

const services = [
  ['Kurumsal Web Tasarım', 'Marka hikâyenizi, hizmetlerinizi ve uzmanlığınızı açık biçimde anlatan; güven oluşturan, hızlı ve mobil uyumlu kurumsal web siteleri tasarlarız.'],
  ['E-ticaret ve Ürün Deneyimi', 'Ürün keşfini, kategori yapısını, içerik akışını ve satın alma deneyimini hem kullanıcı hem operasyon ihtiyaçlarına göre planlarız.'],
  ['SEO Uyumlu Altyapı', 'Başlık yapısı, sayfa hızı, mobil deneyim, görsel optimizasyonu ve taranabilir içerik mimarisini geliştirme sürecinin başından itibaren kurarız.'],
  ['Dönüşüm Optimizasyonu', 'Ziyaretçilerin doğru bilgiye ulaşmasını ve telefon, form ya da WhatsApp üzerinden kolayca iletişime geçmesini sağlayan net kullanıcı akışları oluştururuz.']
];

const faqs = [
  ['Ankara web tasarım projesi nasıl başlar?', 'İş hedeflerinizi, hedef kitlenizi, rakiplerinizi ve mevcut dijital varlıklarınızı değerlendiririz. Ardından sayfa yapısı, içerik ihtiyaçları, tasarım dili ve teknik kapsam için net bir proje planı çıkarırız.'],
  ['Web sitesinin SEO uyumlu olması ne anlama gelir?', 'Hız, mobil uyumluluk, sayfa hiyerarşisi, semantik içerik, görsel optimizasyonu ve taranabilir teknik altyapının arama motorları ile kullanıcı deneyimi için doğru kurgulanmasıdır.'],
  ['Web tasarım ile SEO neden birlikte düşünülmeli?', 'Site yayınlandıktan sonra teknik hataları ve içerik eksiklerini gidermek maliyetli olabilir. SEO gereksinimlerini tasarım sürecine dahil etmek, görünürlük ve performans için daha güçlü bir başlangıç sağlar.'],
  ['Ankara’daki işletmeler için yerel web tasarımın avantajı nedir?', 'Yerel pazarın dilini, hizmet bölgelerini ve müşteri beklentilerini yansıtan sayfalar; ilgili aramalarda daha anlaşılır bir deneyim ve daha nitelikli iletişim talebi oluşturabilir.']
];

const schema = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'Service', name: 'Ankara Web Tasarım Hizmeti', description: 'Ankara işletmeleri için SEO uyumlu, hızlı ve dönüşüm odaklı web tasarım ve geliştirme hizmeti.', url: 'https://kaptantechdigital.com/ankara-web-tasarim', areaServed: { '@type': 'City', name: 'Ankara' }, provider: { '@type': 'Organization', name: 'KAPTAN', url: 'https://kaptantechdigital.com' } },
  { '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }
] };

export default function AnkaraWebTasarim() {
  return <>
    <SEO title="Ankara Web Tasarım | SEO Uyumlu Kurumsal Web Sitesi | KAPTAN" description="Ankara web tasarım hizmetiyle hızlı, mobil uyumlu, SEO altyapısı güçlü ve dönüşüm odaklı kurumsal web sitenizi oluşturun." url="https://kaptantechdigital.com/ankara-web-tasarim" />
    <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
    <main className="pt-32 pb-24 bg-bg relative min-h-screen"><VerticalLine /><div className="max-w-7xl mx-auto px-6"><HorizontalLine />
      <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Ankara Web Tasarım</p>
      <h1 className="text-4xl md:text-6xl font-display font-semibold max-w-4xl mb-8">Markanızı anlatan, müşteriyi harekete geçiren web siteleri.</h1>
      <div className="max-w-3xl text-muted text-lg leading-relaxed space-y-5 mb-10"><p>Ankara web tasarım hizmetimizde estetik ile iş hedeflerini birlikte ele alırız. Web siteniz, dijital kartvizitten öte; hedef kitlenizin sizi tanıdığı, hizmetlerinizi karşılaştırdığı ve iletişim kurmaya karar verdiği güçlü bir satış noktasıdır.</p><p>Kurumsal web sitesi, e-ticaret deneyimi veya özel dijital platform ihtiyacınız için; marka kimliğinize uygun, hızlı, güvenli ve SEO uyumlu bir temel oluştururuz.</p></div>
      <Link to="/iletisim" className="inline-flex items-center px-6 py-3 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors">Web tasarım teklifi alın <ArrowUpRight className="w-5 h-5 ml-2" /></Link>
      <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">{services.map(([title, text], index) => <article key={title} className="bg-surface p-8 rounded-2xl border border-white/5"><span className="text-gold font-mono text-xs">0{index + 1}</span><h2 className="text-2xl font-display font-semibold mt-4 mb-3">{title}</h2><p className="text-muted leading-relaxed">{text}</p></article>)}</section>
      <section className="mt-24 max-w-4xl"><p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Süreç</p><h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">Fikirden yayına, ölçülebilir bir dijital deneyim.</h2><div className="space-y-5 text-muted text-lg leading-relaxed"><p>Önce müşterinizin karar yolculuğunu anlarız. Hangi bilgiye ihtiyaç duyuyor, hangi sayfada güven kazanıyor ve hangi noktada iletişime geçiyor? Bu sorular; site haritasını, metinleri, görsel yönlendirmeleri ve tasarım kararlarını belirler.</p><p>Geliştirme aşamasında her ekran için mobil deneyimi, hız ve erişilebilirliği kontrol ederiz. Yayına alındıktan sonra da ziyaretçi davranışlarını ve dönüşüm noktalarını ölçerek sitenizi iyileştirmeye açık tutarız.</p><ul className="space-y-3 pt-2">{['Keşif, hedef kitle ve içerik planı', 'UX/UI tasarım ve onay süreci', 'Performans odaklı geliştirme ve SEO teknik kontrolü', 'Yayın sonrası ölçümleme ve dönüşüm iyileştirmesi'].map(item => <li key={item} className="flex items-start"><CheckCircle2 className="w-5 h-5 text-gold mr-3 shrink-0 mt-1" />{item}</li>)}</ul></div></section>
      <section className="mt-24 max-w-4xl"><p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Sık sorulanlar</p><div className="space-y-4">{faqs.map(([question, answer]) => <article key={question} className="bg-surface p-7 rounded-2xl border border-white/5"><h2 className="text-xl font-display font-semibold mb-3">{question}</h2><p className="text-muted leading-relaxed">{answer}</p></article>)}</div></section>
    </div></main>
  </>;
}
