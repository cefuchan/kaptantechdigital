import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from '../data/schema';
import { absoluteUrl, site } from '../data/site';

/**
 * Ankara video prodüksiyon açılış sayfası.
 *
 * Fiyat sorgularında üretken motorlar rakam veren kaynağı alıntılar; bu yüzden
 * sayfa maliyeti neyin belirlediğini açıkça tablolar. Aralıklar bağlayıcı
 * teklif değildir ve sayfada da bu şekilde belirtilir.
 */

const formats = [
  [
    'Kurumsal tanıtım filmi',
    '2–4 dakika',
    'Şirket vizyonu, üretim gücü ve ekip. Fuar, web sitesi ve kurumsal sunumlarda kullanılır.'
  ],
  [
    'Ürün ve hizmet videosu',
    '30–90 saniye',
    'Tek bir ürünün ya da hizmetin nasıl çalıştığını gösterir. Ürün sayfalarında dönüşümü doğrudan etkiler.'
  ],
  [
    'Sosyal medya Reels / Shorts',
    '15–45 saniye',
    'Dikey kadraj, sessiz izlemeye göre kurgu. Tek çekim gününden çok sayıda içerik çıkarılır.'
  ],
  [
    'Reklam filmi',
    '15–60 saniye',
    'Performans kampanyaları için üretilir; farklı açılışlarla varyantlanarak test edilir.'
  ],
  [
    'Röportaj ve referans videosu',
    '1–3 dakika',
    'Müşteri deneyimi ve uzman görüşü. Güven inşasında en yüksek etkili format.'
  ],
  [
    'Drone çekimi',
    'Ek modül',
    'Tesis, showroom ve proje alanlarını havadan gösterir; anlatıya ölçek katar.'
  ]
];

const costFactors = [
  ['Çekim günü sayısı', 'Maliyetin en büyük kalemi. Tek mekânda bir gün ile üç şehirde üç gün arasında ciddi fark vardır.'],
  ['Ekip büyüklüğü', 'Yönetmen, görüntü yönetmeni, ışık, ses ve set asistanı. Format karmaşıklaştıkça ekip büyür.'],
  ['Oyuncu ve seslendirme', 'Profesyonel oyuncu, dış ses veya yabancı dilde seslendirme ayrı kalemdir.'],
  ['Kurgu ve post-prodüksiyon', 'Renk düzenleme, ses tasarımı, altyazı ve motion grafik. Genellikle çekimden uzun sürer.'],
  ['Drone ve özel ekipman', 'Havadan çekim, gimbal, slider ve özel lens ihtiyacı.'],
  ['Kullanım hakkı ve süre', 'Reklam yayını, müzik lisansı ve oyuncu kullanım süresi bütçeyi doğrudan etkiler.']
];

const faqs: Array<[string, string]> = [
  [
    'Ankara’da kurumsal tanıtım filmi ne kadara mal olur?',
    'Tek mekânda, tek çekim günü ve standart kurguyla hazırlanan kurumsal bir tanıtım filmi genellikle orta bütçeli bir prodüksiyon kalemidir. Maliyeti belirleyen asıl unsurlar çekim günü sayısı, ekip büyüklüğü, oyuncu kullanımı ve post-prodüksiyon derinliğidir. Net rakam, kapsam netleştikten sonra kalem kalem çıkarılır — hazır paket fiyatı vermiyoruz çünkü her projenin çekim planı farklı.'
  ],
  [
    'Bir çekim gününden kaç içerik çıkar?',
    'Doğru planlanmış bir çekim gününden genellikle bir ana tanıtım filmi ile birlikte 6–10 arası kısa sosyal medya içeriği çıkarılabilir. Bunun için dikey ve yatay kadrajın çekim planında baştan öngörülmesi gerekir; sonradan kırpma kompozisyonu bozar.'
  ],
  [
    'Senaryo ve kurgu dahil mi?',
    'Evet. Süreci brief ve yaratıcı konseptle başlatır; senaryo, çekim planı, mekân koordinasyonu, çekim ve post-prodüksiyon aşamalarını tek elden yürütürüz. Teslimde videonun kullanılacağı platforma göre farklı en-boy oranları ve altyazı seçenekleri hazırlanır.'
  ],
  [
    'Çekim ne kadar sürede tamamlanır?',
    'Brief’ten teslime kadar tipik bir kurumsal film 3–5 hafta sürer: bir hafta hazırlık ve senaryo, bir gün çekim, ardından kurgu ve revizyon turları. Acil işlerde bu süre kısaltılabilir ancak hazırlık aşamasından kısmak sonucu doğrudan etkiler.'
  ]
];

const crumbs = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Ankara Video Prodüksiyon', path: '/ankara-video-produksiyon' }
];

const schema = graph(
  serviceSchema({
    name: 'Ankara Video Prodüksiyon Hizmeti',
    description:
      'Ankara’da kurumsal tanıtım filmi, ürün videosu, reklam filmi, sosyal medya Reels ve drone çekimi. Fikirden teslime uçtan uca prodüksiyon.',
    path: '/ankara-video-produksiyon',
    serviceType: 'Video Prodüksiyon',
    offers: formats.map(([title]) => title)
  }),
  {
    '@type': 'ItemList',
    '@id': `${absoluteUrl('/ankara-video-produksiyon')}#formats`,
    name: 'Video prodüksiyon formatları',
    itemListElement: formats.map(([title, duration, text], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: title,
      description: `${duration} — ${text}`
    }))
  },
  faqSchema(faqs.map(([question, answer]) => ({ question, answer }))),
  breadcrumbSchema(crumbs)
);

export default function AnkaraVideoProduksiyon() {
  return (
    <>
      <SEO
        title="Ankara Video Prodüksiyon ve Kurumsal Tanıtım Filmi | KAPTAN"
        description="Ankara'da kurumsal tanıtım filmi, ürün videosu, reklam filmi, Reels ve drone çekimi. Formatlar, maliyeti belirleyen kalemler ve süreç tek sayfada."
        url="/ankara-video-produksiyon"
        schema={schema}
      />

      <main className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />

          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">
            Ankara · Video Prodüksiyon
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-semibold max-w-4xl mb-8">
            Bir çekim günü, aylarca içerik.
          </h1>

          <div className="max-w-3xl text-muted text-lg leading-relaxed space-y-5 mb-10">
            <p>
              Video prodüksiyonu bir çekim gününden ibaret değildir. Hedef
              kitlenizi, videonun yayınlanacağı kanalları ve vermek istediğiniz
              mesajı belirleyerek senaryo, çekim ve kurgu sürecini iş
              hedeflerinizle uyumlu biçimde yönetiriz.
            </p>
            <p>
              Çekim planını baştan çok formatlı kurguladığımız için tek bir
              günden hem kurumsal film hem de haftalarca sosyal medya akışını
              besleyecek kısa içerikler çıkar. İçerik yatırımınız tek bir
              videoda kalmaz.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/iletisim"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors"
            >
              Çekim için teklif alın <ArrowUpRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/hizmetler/video-produksiyon"
              className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 hover:border-gold transition-colors"
            >
              Hizmet detayları
            </Link>
          </div>

          {/* Formatlar */}
          <section className="mt-24">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Formatlar</p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8 max-w-3xl">
              Hangi format neye yarar?
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/5">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="bg-surface">
                    <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gold font-medium">Format</th>
                    <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gold font-medium">Tipik süre</th>
                    <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gold font-medium">Ne işe yarar</th>
                  </tr>
                </thead>
                <tbody>
                  {formats.map(([title, duration, text]) => (
                    <tr key={title} className="border-t border-white/5">
                      <td className="px-6 py-4 text-text-primary font-medium align-top">{title}</td>
                      <td className="px-6 py-4 text-muted whitespace-nowrap align-top">{duration}</td>
                      <td className="px-6 py-4 text-muted align-top">{text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Maliyet */}
          <section className="mt-24 max-w-4xl">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Bütçe</p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
              Maliyeti ne belirler?
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Hazır paket fiyatı yayınlamıyoruz, çünkü aynı süreye sahip iki
              video arasında maliyet birkaç kat değişebiliyor. Bunun yerine
              bütçeyi neyin belirlediğini açıkça paylaşıyoruz; teklif isterken
              hangi kalemde tasarruf edebileceğinizi bilerek konuşuyoruz.
            </p>
            <dl className="space-y-5">
              {costFactors.map(([title, text]) => (
                <div key={title} className="border-l-2 border-gold/40 pl-5">
                  <dt className="text-text-primary font-medium mb-1">{title}</dt>
                  <dd className="text-muted leading-relaxed m-0">{text}</dd>
                </div>
              ))}
            </dl>
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
              Çekim planını birlikte çıkaralım.
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              Ne anlatmak istediğinizi ve videoyu nerede kullanacağınızı
              konuşalım; kapsam netleştiğinde kalem kalem bir teklif hazırlayalım.
            </p>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gold font-medium hover:text-white transition-colors"
            >
              WhatsApp'tan yazın <ArrowUpRight className="w-5 h-5 ml-2" />
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
