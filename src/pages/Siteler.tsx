import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const services = [
  { title: 'Siteler Web Tasarım', text: 'Hızlı, mobil uyumlu ve teklif toplamaya odaklanan kurumsal siteler; ürünlerinizi, üretim gücünüzü ve hizmetlerinizi anlaşılır biçimde sunar.' },
  { title: 'Siteler Dijital Pazarlama', text: 'SEO, içerik, Google İşletme Profili ve performans kanallarını ortak bir büyüme hedefinde birleştiririz.' },
  { title: 'Siteler Reklam', text: 'Google ve Meta kampanyalarını doğru hedefleme, güçlü mesaj ve ölçülebilir dönüşüm altyapısıyla yönetiriz.' },
  { title: 'Siteler Reklam Çekimi', text: 'Ürün, üretim ve marka hikâyenizi reklamlarda kullanılabilecek profesyonel fotoğraf ve video içeriklerine dönüştürürüz.' },
  { title: 'Siteler Drone Çekimi', text: 'Showroom, tesis, üretim alanı ve projelerinizi havadan güçlü bir perspektifle gösteren planlı drone çekimleri gerçekleştiririz.' }
];

const faqs = [
  ['Siteler web tasarım projesi ne kadar sürer?', 'Süre; sayfa sayısı, içerik, fotoğraf-video ihtiyacı ve özel fonksiyonlara göre belirlenir. Proje başlangıcında kapsamı netleştirip aşamalı bir takvim oluştururuz.'],
  ['Siteler reklam çalışmasında hangi kanallar kullanılır?', 'Hedef kitlenizin arama niyetine ve ürünün karar sürecine göre Google Ads, Meta reklamları, yeniden pazarlama ve içerik destekli kampanyaları birlikte planlarız.'],
  ['Reklam çekimi ve drone çekimi dijital pazarlamaya nasıl katkı sağlar?', 'Özgün görsel içerikler, markanın güven etkisini artırır. Bu içerikleri web sitenizde, sosyal medyada ve performans reklamlarında farklı formatlarda değerlendirerek yatırımın kullanım alanını genişletiriz.']
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: 'KAPTAN',
      url: 'https://kaptantechdigital.com/siteler',
      areaServed: { '@type': 'Place', name: 'Siteler, Ankara' },
      serviceType: ['Siteler web tasarım', 'Siteler dijital pazarlama', 'Siteler reklam', 'Siteler reklam çekimi', 'Siteler drone çekimi']
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }))
    }
  ]
};

export default function Siteler() {
  return <>
    <SEO title="Siteler Web Tasarım, Reklam ve Dijital Pazarlama | KAPTAN" description="Siteler web tasarım, dijital pazarlama, reklam yönetimi, reklam çekimi ve drone çekimi hizmetleriyle markanızı büyütün." url="https://kaptantechdigital.com/siteler" />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
    <main className="pt-32 pb-24 bg-bg relative min-h-screen">
      <VerticalLine />
      <div className="max-w-7xl mx-auto px-6">
        <HorizontalLine />
        <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Ankara · Siteler</p>
        <h1 className="text-4xl md:text-6xl font-display font-semibold max-w-4xl mb-8">Siteler’de dijital büyümeniz için tek ekip.</h1>
        <div className="max-w-3xl text-muted text-lg leading-relaxed space-y-5 mb-12">
          <p>KAPTAN; Siteler web tasarım, Siteler dijital pazarlama, Siteler reklam, reklam çekimi ve drone çekimi ihtiyaçlarını birbiriyle bağlantılı bir sistem olarak ele alır. Hedefimiz yalnızca dijitalde görünmeniz değil, doğru müşterilerin sizi bulması ve iletişime geçmesidir.</p>
          <p>Mobilya, üretim, perakende ve kurumsal hizmet işletmeleri için marka hikâyesini, ürün bilgisini, görsel içeriği ve dönüşüm yolculuğunu aynı çatı altında planlarız.</p>
        </div>
        <Link to="/iletisim" className="inline-flex items-center px-6 py-3 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors">Siteler için teklif alın <ArrowUpRight className="w-5 h-5 ml-2" /></Link>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => <article key={service.title} className="bg-surface p-8 rounded-2xl border border-white/5">
            <span className="text-gold font-mono text-xs">0{index + 1}</span>
            <h2 className="text-2xl font-display font-semibold mt-4 mb-3">{service.title}</h2>
            <p className="text-muted leading-relaxed">{service.text}</p>
          </article>)}
        </section>

        <section className="mt-24 max-w-4xl">
          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Yaklaşımımız</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">Görünürlükten teklife kadar ölçülebilir bir yol.</h2>
          <div className="space-y-5 text-muted text-lg leading-relaxed">
            <p>Çalışmaya mevcut dijital varlıklarınızı, hedef kitlenizi ve rekabet ortamını inceleyerek başlarız. Ardından web sitesi, içerik, reklam ve görsel üretim ihtiyaçlarını önceliklendirir; hangi kanalın hangi amaca hizmet edeceğini netleştiririz.</p>
            <p>Web sitenize gelen ziyaretçinin deneyimi, reklamın verdiği vaat ve satış ekibinin iletişim biçimi birbiriyle tutarlı olmalıdır. Ölçümleme altyapısı sayesinde form, telefon ve mesaj taleplerini izler; bütçeyi gerçek sonuçlara göre iyileştiririz.</p>
          </div>
        </section>

        <section className="mt-24 max-w-4xl">
          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Sık sorulanlar</p>
          <div className="space-y-4">{faqs.map(([question, answer]) => <div key={question} className="bg-surface p-7 rounded-2xl border border-white/5"><h2 className="text-xl font-display font-semibold mb-3">{question}</h2><p className="text-muted leading-relaxed">{answer}</p></div>)}</div>
        </section>

        <section className="mt-24 bg-surface p-8 md:p-12 rounded-2xl border border-gold/20 max-w-4xl">
          <h2 className="text-3xl font-display font-semibold mb-4">Markanız için doğru rotayı birlikte çizelim.</h2>
          <p className="text-muted text-lg leading-relaxed mb-8">Web tasarım, reklam veya çekim ihtiyacınızı konuşalım; işletmenize uygun, ölçülebilir bir büyüme planı oluşturalım.</p>
          <Link to="/iletisim" className="inline-flex items-center text-gold font-medium hover:text-white transition-colors">İletişime geçin <ArrowUpRight className="w-5 h-5 ml-2" /></Link>
        </section>
      </div>
    </main>
  </>;
}
