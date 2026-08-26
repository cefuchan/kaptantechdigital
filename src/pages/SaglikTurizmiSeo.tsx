import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from '../data/schema';
import { absoluteUrl, site } from '../data/site';

/**
 * Sağlık turizmi kliniklerine yönelik hizmet sayfası.
 *
 * Yüksek bütçeli, düşük rekabetli bir niş. Google sağlık içeriklerinde daha
 * yüksek bir güven eşiği uyguladığı için sayfa dili bilgilendirici tutulur;
 * tedavi sonucu vaadi verilmez.
 */

const pillars = [
  [
    'Dil başına ayrı strateji',
    'Otomatik çeviri yerine her dil için ayrı anahtar kelime araştırması yapıyoruz. Almanya’daki bir hastanın aradığı terim ile Irak’taki bir hastanınki aynı değildir.'
  ],
  [
    'Doğru hreflang mimarisi',
    'Her dil sürümünün kendi kanonik adresi, taranabilir dil geçişi ve karşılıklı hreflang etiketleri olur. Yanlış kurulum, dillerin birbirini yemesine yol açar.'
  ],
  [
    'E-E-A-T ve mevzuat uyumu',
    'Tedavi içerikleri ilgili hekimin adı, uzmanlığı ve doğrulanabilir profiliyle yayınlanır. Sağlık Bakanlığı yetki belgeleri ve akreditasyonlar sitede görünür kılınır.'
  ],
  [
    'Tedavi bazlı sayfa yapısı',
    'Her tedavi kendi sayfasını hak eder: süreç, süre, iyileşme dönemi, konaklama ve transfer bilgisi, sık sorulan sorular. Toplu hizmet listesi hiçbir sorguda sıralanmaz.'
  ]
];

const measures = [
  'Dil bazlı organik trafik ve sorgu kırılımı',
  'Tedavi sayfası başına form ve WhatsApp talebi',
  'Ülke bazlı talep dağılımı',
  'İlk temas ile başvuru arasındaki süre',
  'Google İşletme Profili üzerinden gelen aramalar'
];

const faqs: Array<[string, string]> = [
  [
    'Sağlık turizmi SEO çalışması ne kadar sürede sonuç verir?',
    'Teknik düzeltmelerin ve işletme profili optimizasyonunun etkisi genellikle birkaç hafta içinde görülür. Çok dilli içerik ve otorite çalışmalarının etkisi ise aylara yayılır; rekabetçi tedavi sorgularında anlamlı bir konum için altı ay ve üzeri düzenli çalışma gerekir.'
  ],
  [
    'Kaç dilde içerik hazırlanmalı?',
    'Hedef pazarınıza göre değişir. Genellikle Türkçe’ye ek olarak İngilizce zorunludur; Orta Doğu hedefleniyorsa Arapça, Balkanlar ve BDT ülkeleri için Rusça öne çıkar. Az sayıda dilde derin içerik, çok sayıda dilde yüzeysel içerikten her zaman daha iyi sonuç verir.'
  ],
  [
    'Tedavi sonucu garantisi verebilir miyiz?',
    'Hayır. Sağlık mevzuatı sonuç garantisi ve karşılaştırmalı üstünlük iddiası içeren tanıtımı sınırlar. İçerik dilini bilgilendirici tutar, hasta kararını destekleyecek süreç ve şeffaflık bilgisine odaklanırız. Bu yaklaşım hem mevzuata hem de Google’ın sağlık içeriği beklentilerine uyar.'
  ],
  [
    'Yurt içi hastalar ile uluslararası hastalar aynı sayfayla hedeflenebilir mi?',
    'Hayır, iki katman ayrı kurgulanmalı. Yurt içi için Google İşletme Profili, harita görünürlüğü ve yorum yönetimi belirleyicidir. Uluslararası hastalar içinse ülke bazlı açılış sayfaları, ilgili dilde hasta deneyimleri ve ulaşım-konaklama bilgisi öne çıkar.'
  ]
];

const crumbs = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Sağlık Turizmi SEO', path: '/saglik-turizmi-seo' }
];

const schema = graph(
  serviceSchema({
    name: 'Sağlık Turizmi SEO ve Dijital Pazarlama Hizmeti',
    description:
      'Klinikler ve hastaneler için çok dilli SEO, hreflang mimarisi, tedavi bazlı içerik yapısı ve mevzuata uygun sağlık turizmi dijital pazarlaması.',
    path: '/saglik-turizmi-seo',
    serviceType: 'Sağlık Turizmi Dijital Pazarlaması',
    offers: pillars.map(([title]) => title)
  }),
  {
    '@type': 'Service',
    '@id': `${absoluteUrl('/saglik-turizmi-seo')}#audience`,
    name: 'Sağlık turizmi dijital danışmanlığı',
    provider: { '@id': `${site.url}/#organization` },
    audience: {
      '@type': 'BusinessAudience',
      name: 'Klinikler, hastaneler ve sağlık turizmi aracı kuruluşları'
    },
    areaServed: [
      { '@type': 'City', name: 'Ankara' },
      { '@type': 'Country', name: 'Türkiye' }
    ]
  },
  faqSchema(faqs.map(([question, answer]) => ({ question, answer }))),
  breadcrumbSchema(crumbs)
);

export default function SaglikTurizmiSeo() {
  return (
    <>
      <SEO
        title="Sağlık Turizmi SEO ve Çok Dilli Dijital Pazarlama | KAPTAN"
        description="Klinik ve hastaneler için sağlık turizmi SEO'su: çok dilli içerik stratejisi, hreflang mimarisi, tedavi bazlı sayfa yapısı ve ölçülebilir hasta adayı akışı."
        url="/saglik-turizmi-seo"
        schema={schema}
      />

      <main className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />

          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">
            Klinikler &amp; Hastaneler
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-semibold max-w-4xl mb-8">
            Sağlık turizminde hedef trafik değil, nitelikli hasta adayıdır.
          </h1>

          <div className="max-w-3xl text-muted text-lg leading-relaxed space-y-5 mb-10">
            <p>
              Sağlık turizmi, arama motoru optimizasyonunun en zorlu alanlarından
              biri. Hem çok dilli bir hedef kitle söz konusu, hem de Google’ın
              sağlık içeriklerinde uyguladığı yüksek güven eşiği devrede. Bu iki
              koşul birlikte ele alınmadığında yapılan yatırım sonuç üretmiyor.
            </p>
            <p>
              KAPTAN, klinikler için ziyaretçi sayısını değil başvuruya dönüşen
              nitelikli talebi büyütmeye odaklanır. İçerik dilini mevzuata uygun
              tutar, güven sinyallerini görünür kılar ve hangi dilin hangi
              tedavide gerçekten hasta getirdiğini ölçeriz.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/iletisim"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors"
            >
              Klinik analizi isteyin <ArrowUpRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/blog/ankara-saglik-turizmi-seo-hizmetleri"
              className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 hover:border-gold transition-colors"
            >
              Detaylı rehberi okuyun
            </Link>
          </div>

          <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map(([title, text], index) => (
              <article key={title} className="bg-surface p-8 rounded-2xl border border-white/5">
                <span className="text-gold font-mono text-xs">0{index + 1}</span>
                <h2 className="text-2xl font-display font-semibold mt-4 mb-3">{title}</h2>
                <p className="text-muted leading-relaxed">{text}</p>
              </article>
            ))}
          </section>

          <section className="mt-24 max-w-4xl">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Ölçümleme</p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">
              Karar süreci uzun, bu yüzden ölçüm de derin olmalı.
            </h2>
            <div className="space-y-5 text-muted text-lg leading-relaxed">
              <p>
                Sağlık turizminde ilk temas ile tedavi kararı arasında haftalar
                geçebilir. Yalnızca form gönderimine bakan bir raporlama, hangi
                içeriğin gerçekten işe yaradığını gizler.
              </p>
              <ul className="space-y-3 pt-2">
                {measures.map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-gold mr-3 shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                Bu kırılımlar olmadan bütçe dağıtmak, en pahalı hatadır: hangi
                dilin, hangi tedavi sayfasının ve hangi ülkenin hasta getirdiğini
                bilmeden yatırım yapılmış olur.
              </p>
            </div>
          </section>

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
              Kliniğinizin dijital durumunu birlikte inceleyelim.
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Mevcut dil sürümlerinizi, teknik altyapınızı ve rakip kliniklerin
              görünürlüğünü değerlendirip önceliklendirilmiş bir yol haritası
              çıkaralım.
            </p>
            <Link
              to="/iletisim"
              className="inline-flex items-center text-gold font-medium hover:text-white transition-colors"
            >
              İletişime geçin <ArrowUpRight className="w-5 h-5 ml-2" />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
