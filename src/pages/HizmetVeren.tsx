import { Link } from 'react-router-dom';
import { AlertTriangle, BadgeCheck, MessageCircle, ShieldCheck, Wallet } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { breadcrumbSchema, faqSchema, graph } from '../data/schema';
import { providerCategories, providerFaqs, providerSteps } from '../data/hizmetVeren';
import { RETENTION_DAYS } from '../data/kvkk';
import { absoluteUrl, site } from '../data/site';

const crumbs = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Hizmet Veren Ağı', path: '/hizmet-veren' }
];

const pageUrl = absoluteUrl('/hizmet-veren');

const schema = graph(
  {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: 'Hizmet Veren Ağı — Komisyonsuz İş Ağı',
    url: pageUrl,
    inLanguage: site.language,
    description:
      'Usta, freelancer ve hizmet verenler için komisyonsuz iş ağı. Katılım ücretsiz, teklif vermek ücretsiz, iş aldığınızda komisyon alınmaz.',
    isPartOf: { '@id': `${site.url}/#website` },
    publisher: { '@id': `${site.url}/#organization` }
  },
  faqSchema(providerFaqs),
  breadcrumbSchema(crumbs)
);

const promises = [
  { icon: Wallet, title: 'Komisyon yok', text: 'Katılım, teklif ve iş alma — hiçbirinde ücret alınmaz.' },
  { icon: BadgeCheck, title: 'Doğrulanmış talepler', text: 'Teyit ettiğimiz ilanlar işaretli gelir.' },
  { icon: ShieldCheck, title: 'Teklifiniz gizli', text: 'Yalnızca talep sahibi görür, başka hizmet veren görmez.' }
];

const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  'Merhaba, hizmet veren ağınıza katılmak istiyorum. Uzmanlık alanım: '
)}`;

export default function HizmetVeren() {
  return (
    <>
      <SEO
        title="Hizmet Veren Ağı — Komisyonsuz İş Ağı | KAPTAN"
        description="Usta, freelancer ve hizmet verenler için komisyonsuz iş ağı. Katılım ücretsiz, teklif vermek ücretsiz, iş aldığınızda komisyon alınmaz. Ankara ve uzaktan işler."
        url="/hizmet-veren"
        schema={schema}
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-4xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />

          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Hizmet verenler için</p>
          <h1 className="text-4xl md:text-6xl font-display font-semibold max-w-3xl mb-6">
            Komisyonsuz iş ağı.
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl mb-8">
            Usta, freelancer veya hizmet verenseniz ağımıza katılabilirsiniz. Uzmanlık
            alanınıza ve çalıştığınız ilçelere uyan talepler geldiğinde sizinle paylaşırız;
            fiyat verip vermemek size kalır.
          </p>

          <div className="bg-surface border border-gold/20 rounded-2xl p-6 md:p-7 mb-10">
            <p className="text-text-primary leading-relaxed">
              <strong className="text-gold">Kısaca:</strong> Ağa katılmak ücretsizdir, teklif
              vermek ücretsizdir, işi aldığınızda da komisyon alınmaz. Üyelik, sözleşme veya
              kayıt formu yok — WhatsApp’tan yazmanız yeterli. Teklifiniz yalnızca o talebi
              oluşturan kişiyle paylaşılır, başka hizmet verenler görmez.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {promises.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-surface p-5 rounded-2xl border border-white/5">
                <Icon className="w-5 h-5 text-gold mb-3" aria-hidden="true" />
                <p className="font-medium mb-1">{title}</p>
                <p className="text-muted text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-bg hover:bg-gold-light transition-colors mb-16"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            WhatsApp&apos;tan katılın
          </a>

          {/* -------------------------------------------- en sık yapılan hata -- */}
          <section
            className="bg-gold/10 border border-gold/30 rounded-2xl p-7 md:p-8 mb-20"
            aria-labelledby="form-uyarisi"
          >
            <AlertTriangle className="w-6 h-6 text-gold mb-4" aria-hidden="true" />
            <h2 id="form-uyarisi" className="text-2xl md:text-3xl font-display font-semibold mb-4">
              Sitedeki formu doldurmayın
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              <Link to="/is-talebi" className="text-gold hover:text-white transition-colors">
                İş verme formu
              </Link>{' '}
              iş <strong>yaptırmak</strong> isteyenler içindir. Oraya kendinizi tanıtan bir
              kayıt bırakırsanız size iş gelmez — sistemde “usta arıyorum” diyen biri olarak
              görünürsünüz.
            </p>
            <p className="text-muted leading-relaxed">
              Hizmet veren olarak ağa katılmanın tek yolu WhatsApp’tan yazmaktır. Formun
              linkini ise <strong>çevrenizde iş yaptıracak kişilere</strong> iletebilirsiniz;
              havuz büyüdükçe hepimize daha çok iş düşer.
            </p>
          </section>

          {/* ------------------------------------------------- nasıl çalışır -- */}
          <section aria-labelledby="nasil-calisir">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Nasıl çalışır</p>
            <h2 id="nasil-calisir" className="text-3xl md:text-4xl font-display font-semibold mb-8">
              Katılımdan işe dört adım.
            </h2>
            <ol className="space-y-4">
              {providerSteps.map((step, index) => (
                <li key={step.title} className="bg-surface p-7 rounded-2xl border border-white/5 flex gap-5">
                  <span className="text-gold font-mono text-xs pt-1.5 shrink-0">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ---------------------------------------------------- kategoriler -- */}
          <section className="mt-24" aria-labelledby="kategoriler">
            <h2 id="kategoriler" className="text-2xl md:text-3xl font-display font-semibold mb-6">
              Hangi alanlarda iş çıkıyor?
            </h2>
            <ul className="flex flex-wrap gap-3">
              {providerCategories.map((category) => (
                <li
                  key={category}
                  className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted"
                >
                  {category}
                </li>
              ))}
            </ul>
          </section>

          {/* ------------------------------------------------------ veriniz -- */}
          <section className="mt-24" aria-labelledby="veriniz">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Verileriniz</p>
            <h2 id="veriniz" className="text-3xl md:text-4xl font-display font-semibold mb-6">
              Bilgilerinize ne oluyor?
            </h2>
            <ul className="space-y-3 mb-6">
              {[
                'Teklifiniz ve iletişim bilginiz yalnızca o talebi oluşturan kişiyle paylaşılır.',
                'Başka hizmet verenlerle, üçüncü taraflarla veya herkese açık bir yerde paylaşılmaz.',
                `Talep sonuçlandıktan sonra kayıtlarınız en geç ${RETENTION_DAYS} gün içinde silinir.`,
                'Silinmesini istediğiniz an yazmanız yeterli; aynı gün siliyoruz, ücret alınmıyor.',
                'Numaranız pazarlama listelerine eklenmez, satılmaz.'
              ].map((item) => (
                <li key={item.slice(0, 30)} className="text-muted leading-relaxed flex gap-3">
                  <span className="text-gold mt-2 h-1 w-1 rounded-full bg-gold shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted leading-relaxed">
              Ayrıntılar için{' '}
              <Link to="/kvkk" className="text-gold hover:text-white transition-colors">
                KVKK aydınlatma metnine
              </Link>{' '}
              bakabilirsiniz. Şunu da açıkça söyleyelim: WhatsApp’ta paylaşılan mesajlar
              üyelerin cihazlarında kalır ve teknik olarak bizim silme yetkimizin dışındadır.
              Bu mesajlarda kimsenin adı ve numarası yer almadığı için kişisel veri taşımaz.
            </p>
          </section>

          {/* ---------------------------------------------------------- SSS -- */}
          <section className="mt-24" aria-labelledby="sss">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Sık sorulanlar</p>
            <h2 id="sss" className="text-3xl md:text-4xl font-display font-semibold mb-8">
              Hizmet verenlerin sorduğu sorular
            </h2>
            <div className="space-y-4">
              {providerFaqs.map((faq) => (
                <article key={faq.question} className="bg-surface p-7 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-display font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-20 bg-surface border border-gold/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-3">
              Ağa katılmak ister misiniz?
            </h2>
            <p className="text-muted leading-relaxed mb-6 max-w-xl mx-auto">
              Uzmanlık alanınızı ve çalıştığınız ilçeleri yazın, yeterli. Kayıt formu yok,
              ücret yok, taahhüt yok.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-bg hover:bg-gold-light transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp&apos;tan yazın
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
