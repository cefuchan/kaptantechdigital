import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from '../data/schema';
import { absoluteUrl, site } from '../data/site';

/**
 * OSTİM ve İvedik OSB'deki imalatçılara yönelik bölgesel açılış sayfası.
 *
 * Bölge + sektör + hizmet üçlüsünü tek belgede birleştirir; hem yerel arama
 * hem de üretken motorların "Ostim'de sanayi firması için kim web sitesi
 * yapar?" tipi sorularını yanıtlayabilmesi için gerekli olan budur.
 */

const pillars = [
  [
    'Teknik ürün kataloğu',
    'Ürün gruplarınızı; ölçü, malzeme, kapasite ve tolerans bilgileriyle taranabilir sayfalara dönüştürürüz. Satın almacı PDF indirmeden önce aradığı teknik veriyi sitede bulur.'
  ],
  [
    'Teklif toplama akışı',
    'Sanayide satış formdan değil, teknik resim ve şartnameden başlar. Dosya yükleme, ürün seçimi ve hızlı iletişim kanallarını satın alma sürecine göre kurgularız.'
  ],
  [
    'İhracat ve çok dillilik',
    'İngilizce ve Arapça sürümleri doğru hreflang yapısıyla kurar, her dilin kendi anahtar kelimesine göre optimize edilmesini sağlarız.'
  ],
  [
    'B2B arama görünürlüğü',
    'Sanayi alıcısı marka değil parça arar. "CNC fason imalat", "hidrolik silindir üretimi" gibi ürün odaklı sorgular için ayrı sayfalar planlarız.'
  ]
];

const sectors = [
  'Makine ve teçhizat imalatı',
  'CNC işleme ve fason üretim',
  'Yedek parça ve otomotiv yan sanayi',
  'Savunma sanayi tedarikçileri',
  'Plastik enjeksiyon ve kalıp',
  'Metal işleme, kaynak ve sac şekillendirme',
  'Elektrik-elektronik panel üretimi',
  'Endüstriyel mutfak ve soğutma sistemleri'
];

const faqs: Array<[string, string]> = [
  [
    'OSTİM veya İvedik OSB firması için web sitesi ne kadar sürede hazır olur?',
    'Ürün grubu sayısı ve teknik içeriğin hazır olup olmamasına göre değişir. Ürün bilgileri elinizde hazırsa kurumsal bir B2B sitesi genellikle 4-6 hafta içinde yayına alınır. Ürün fotoğrafı ve teknik metin üretimi de bizden bekleniyorsa süre 8 haftaya çıkabilir.'
  ],
  [
    'Sanayi firmaları için SEO, normal SEO’dan farklı mı?',
    'Evet. B2B sanayide arama hacimleri düşük, arama niyeti ise çok yüksektir. Ayda 40 arama alan "paslanmaz sac lazer kesim Ankara" sorgusu, 5.000 arama alan genel bir kelimeden daha fazla teklif getirebilir. Bu yüzden hacim değil, ürün ve süreç bazlı uzun kuyruklu sorgular hedeflenir.'
  ],
  [
    'Mevcut sitemiz var ama teklif gelmiyor, ne yapmak gerekir?',
    'Genellikle üç sorundan biri vardır: ürünler tek bir sayfada toplu listelendiği için hiçbiri sıralanmaz, site mobilde çok yavaştır, ya da iletişim yolu yalnızca genel bir iletişim formudur. Önce ölçümleme kurup ziyaretçilerin nerede kaybedildiğini tespit ederiz.'
  ],
  [
    'İhracat için hangi dil öncelikli olmalı?',
    'Hedef pazarınıza göre değişir. Avrupa ve Kuzey Amerika için İngilizce, Orta Doğu ve Kuzey Afrika için Arapça öncelikli olur. Her dilin ayrı anahtar kelime araştırmasıyla optimize edilmesi gerekir; otomatik çeviri hem sıralanmaz hem güven kaybettirir.'
  ]
];

const crumbs = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'OSTİM & İvedik OSB', path: '/ostim-ivedik' }
];

const schema = graph(
  serviceSchema({
    name: 'OSTİM ve İvedik OSB Web Tasarım ve SEO Hizmeti',
    description:
      'Ankara OSTİM ve İvedik OSB’deki imalatçı ve sanayi firmaları için B2B web tasarımı, teknik ürün kataloğu, ihracat odaklı çok dilli yapı ve sanayi SEO’su.',
    path: '/ostim-ivedik',
    serviceType: 'B2B Sanayi Dijital Pazarlaması',
    offers: pillars.map(([title]) => title)
  }),
  {
    '@type': 'LocalBusiness',
    '@id': `${absoluteUrl('/ostim-ivedik')}#service-area`,
    name: site.name,
    url: absoluteUrl('/ostim-ivedik'),
    telephone: site.telephone,
    email: site.email,
    image: site.defaultImage,
    parentOrganization: { '@id': `${site.url}/#organization` },
    areaServed: [
      { '@type': 'Place', name: 'OSTİM Organize Sanayi Bölgesi, Yenimahalle, Ankara' },
      { '@type': 'Place', name: 'İvedik Organize Sanayi Bölgesi, Yenimahalle, Ankara' }
    ],
    knowsAbout: sectors
  },
  faqSchema(faqs.map(([question, answer]) => ({ question, answer }))),
  breadcrumbSchema(crumbs)
);

export default function OstimIvedik() {
  return (
    <>
      <SEO
        title="OSTİM & İvedik OSB Web Tasarım ve Sanayi SEO | KAPTAN"
        description="OSTİM ve İvedik OSB'deki imalatçılar için B2B web tasarımı, teknik ürün kataloğu, ihracat odaklı çok dilli yapı ve sanayi SEO'su."
        url="/ostim-ivedik"
        schema={schema}
      />

      <main className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />

          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">
            Ankara · OSTİM &amp; İvedik OSB
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-semibold max-w-4xl mb-8">
            Sanayide alıcı artık fuarda değil, aramada.
          </h1>

          <div className="max-w-3xl text-muted text-lg leading-relaxed space-y-5 mb-10">
            <p>
              OSTİM ve İvedik OSB’de üretim gücü tartışmasız. Ancak satın alma
              süreci değişti: bir işletme yedek parça, fason imalat veya makine
              tedarikçisi ararken artık önce arama motoruna, giderek daha sık da
              yapay zekâ asistanına soruyor. Kartvizit ve fuar hâlâ önemli, ama
              ilk eleme dijitalde yapılıyor.
            </p>
            <p>
              KAPTAN, sanayi firmalarının bu ilk elemeyi geçmesi için çalışır.
              Ürün kabiliyetinizi teknik alıcının anlayacağı dilde sunan, hızlı
              açılan ve teklif talebine dönüşen bir dijital altyapı kurarız.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/iletisim"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors"
            >
              Sanayi projesi için teklif alın <ArrowUpRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/vaka-calismalari"
              className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 hover:border-gold transition-colors"
            >
              Vaka çalışmaları
            </Link>
          </div>

          {/* Hizmet sütunları */}
          <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map(([title, text], index) => (
              <article key={title} className="bg-surface p-8 rounded-2xl border border-white/5">
                <span className="text-gold font-mono text-xs">0{index + 1}</span>
                <h2 className="text-2xl font-display font-semibold mt-4 mb-3">{title}</h2>
                <p className="text-muted leading-relaxed">{text}</p>
              </article>
            ))}
          </section>

          {/* Sektörler */}
          <section className="mt-24 max-w-4xl">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">
              Çalıştığımız üretim alanları
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">
              Terminolojinizi öğrenmemize gerek kalmadan başlıyoruz.
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Sanayi projelerinde en çok kaybedilen zaman, ajansa işin ne
              olduğunu anlatmakla geçer. Aşağıdaki alanlarda üretim süreçlerini
              ve satın alma dinamiklerini biliyoruz.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sectors.map((sector) => (
                <li key={sector} className="flex items-start text-muted">
                  <CheckCircle2 className="w-5 h-5 text-gold mr-3 shrink-0 mt-1" />
                  {sector}
                </li>
              ))}
            </ul>
          </section>

          {/* Yaklaşım */}
          <section className="mt-24 max-w-4xl">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Çalışma biçimi</p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">
              Ürün sayfası, B2B satışın en değerli varlığıdır.
            </h2>
            <div className="space-y-5 text-muted text-lg leading-relaxed">
              <p>
                Sanayi sitelerinde en sık gördüğümüz hata, tüm ürünlerin tek bir
                “Ürünlerimiz” sayfasında listelenmesi. Bu yapıda hiçbir ürün
                kendi sorgusunda sıralanamaz, çünkü sayfanın neyle ilgili olduğu
                belirsizdir.
              </p>
              <p>
                Bunun yerine her ürün grubunu kendi sayfasına ayırırız: teknik
                özellikler, kapasite aralığı, kullanım alanları, sık sorulan
                sorular ve doğrudan teklif alma yolu aynı ekranda toplanır. Bu
                yapı aynı zamanda üretken arama motorlarının alıntılayabileceği
                netlikte bilgi üretir.
              </p>
              <p>
                Yayın sonrasında hangi ürün sayfasının teklif getirdiğini ölçer,
                bütçeyi talep üreten ürün gruplarına kaydırırız.
              </p>
            </div>
          </section>

          {/* SSS */}
          <section className="mt-24 max-w-4xl">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Sık sorulanlar</p>
            <div className="space-y-4">
              {faqs.map(([question, answer]) => (
                <article key={question} className="bg-surface p-7 rounded-2xl border border-white/5">
                  <h2 className="text-xl font-display font-semibold mb-3">{question}</h2>
                  <p className="text-muted leading-relaxed">{answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-24 bg-surface p-8 md:p-12 rounded-2xl border border-gold/20 max-w-4xl">
            <h2 className="text-3xl font-display font-semibold mb-4">
              Üretim gücünüzü dijitalde de gösterelim.
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Mevcut sitenizi ve rakiplerinizin arama görünürlüğünü inceleyip,
              hangi ürün gruplarıyla nereden başlanması gerektiğini içeren bir
              yol haritası çıkaralım.
            </p>
            <Link
              to="/iletisim"
              className="inline-flex items-center text-gold font-medium hover:text-white transition-colors"
            >
              Ücretsiz analiz isteyin <ArrowUpRight className="w-5 h-5 ml-2" />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
