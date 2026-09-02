import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import JobPostForm from '../components/JobPostForm';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { breadcrumbSchema, faqSchema, graph } from '../data/schema';
import { absoluteUrl, site } from '../data/site';
import { jobCategories, jobFaqs, jobSteps, jobTips } from '../data/jobPost';

const crumbs = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'İş ve Hizmet Talebi', path: '/is-talebi' }
];

const pageUrl = absoluteUrl('/is-talebi');

const schema = graph(
  {
    '@type': 'WebApplication',
    '@id': `${pageUrl}#tool`,
    name: 'Ücretsiz İş ve Hizmet Talebi Formu',
    url: pageUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: site.language,
    description:
      'Aradığınız hizmeti tarif edin, talebiniz hizmet veren ağımıza iletilsin, teklifleri karşılaştırın. Üyelik yok, ilan ücreti yok, komisyon yok.',
    publisher: { '@id': `${site.url}/#organization` },
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' }
  },
  {
    '@type': 'HowTo',
    '@id': `${pageUrl}#howto`,
    name: 'Ücretsiz iş ve hizmet talebi oluşturup teklif nasıl alınır?',
    description:
      'Talebinizi yazmanızdan hizmet verenlerin tekliflerini karşılaştırmanıza kadar dört adım.',
    inLanguage: site.language,
    totalTime: 'PT3M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'TRY', value: '0' },
    step: jobSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.body,
      url: `${pageUrl}#adim-${index + 1}`
    }))
  },
  faqSchema(jobFaqs),
  breadcrumbSchema(crumbs)
);

const guarantees = [
  {
    icon: CheckCircle2,
    title: 'İki taraf da ücret ödemez',
    text: 'İlan ücreti, üyelik ücreti ya da iş başına komisyon yok.'
  },
  {
    icon: MessageCircle,
    title: 'Birden fazla teklif',
    text: 'Talebiniz kategorisine uyan hizmet veren ağımızda paylaşılır.'
  },
  {
    icon: ShieldCheck,
    title: 'Numaranız gizli',
    text: 'Ağa giden metinde telefonunuz yer almaz; üyelik de istenmez.'
  }
];

const relatedLinks = [
  { label: 'Tüm hizmetlerimiz', path: '/hizmetler' },
  { label: 'Ankara web tasarım', path: '/ankara-web-tasarim' },
  { label: 'Ankara SEO', path: '/ankara-seo' },
  { label: 'Vaka çalışmaları', path: '/vaka-calismalari' },
  { label: 'İletişim', path: '/iletisim' }
];

export default function JobPost() {
  return (
    <>
      <SEO
        title="Ücretsiz Teklif Al — İş ve Hizmet Talebi Oluştur | KAPTAN"
        description="İş yaptıracaklar için: yaptırmak istediğiniz işi yazın, hizmet veren ağımızdan ücretsiz teklif alın. Üyelik yok, komisyon yok. (İş arıyorsanız ağa katılın.)"
        url="/is-talebi"
        schema={schema}
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-4xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />

          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">İş verenler için</p>
          <h1 className="text-4xl md:text-6xl font-display font-semibold max-w-3xl mb-6">
            Yaptıracağınız işi anlatın, ücretsiz teklif alın.
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl mb-8">
            Yazılımdan tadilata, nakliyattan temizliğe kadar <strong>yaptırmak
            istediğiniz</strong> işi aşağıdaki forma yazın. Talebinizi kategorisine uyan
            hizmet veren ağımıza iletelim, gelen teklifleri size ulaştıralım. Ne siz ne de
            hizmet veren bunun için ücret ödüyor.
          </p>

          {/* Yön ayrımı — sayfaya iki farklı niyetle geliniyor ve "iş talebi"
              ifadesi Türkçede iki yönlü okunduğu için iş arayanlar da formu
              dolduruyordu. Ayrımı en başta, formdan önce yapmak gerekiyor. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-surface border border-gold/30 rounded-2xl p-6">
              <p className="text-gold font-mono text-xs uppercase tracking-wider mb-3">
                Doğru yerdesiniz
              </p>
              <p className="font-medium mb-2">İş yaptıracağım</p>
              <p className="text-muted text-sm leading-relaxed">
                Bir ustaya, ekibe veya uzmana iş yaptırmak istiyorsanız aşağıdaki formu
                doldurun. Teklifleri size iletelim.
              </p>
            </div>

            <div className="bg-bg border border-white/10 rounded-2xl p-6">
              <p className="text-muted/70 font-mono text-xs uppercase tracking-wider mb-3">
                Bu form size göre değil
              </p>
              <p className="font-medium mb-2">İş arıyorum</p>
              <p className="text-muted text-sm leading-relaxed mb-4">
                Usta, freelancer veya hizmet verenseniz bu formu doldurmayın — buraya
                girilenler iş <em>talep eden</em> kayıtlardır. Siz ağımıza katılın, size
                uygun işler geldikçe paylaşalım.
              </p>
              <Link
                to="/hizmet-veren"
                className="inline-flex items-center gap-2 text-sm text-gold hover:text-white transition-colors"
              >
                Hizmet veren olarak katıl
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Yapay zekâ araçlarının ve öne çıkan sonuçların doğrudan
              alıntılayabileceği kısa cevap bloğu. */}
          <div className="bg-surface border border-gold/20 rounded-2xl p-6 md:p-7 mb-10">
            <p className="text-text-primary leading-relaxed">
              <strong className="text-gold">Kısaca:</strong> Talep oluşturmak ve teklif almak
              tamamen ücretsizdir; üyelik, ilan ücreti ve komisyon yoktur. Talebiniz
              herkese açık bir ilan panosunda yayınlanmaz, yalnızca kategorisine uyan
              hizmet verenlerden oluşan WhatsApp ağımızda paylaşılır. Bu paylaşımda
              telefon numaranız yer almaz; iletişim bilgileriniz ancak bir teklifle
              ilerlemeye karar verdiğinizde paylaşılır.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {guarantees.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-surface p-5 rounded-2xl border border-white/5">
                <Icon className="w-5 h-5 text-gold mb-3" aria-hidden="true" />
                <p className="font-medium mb-1">{title}</p>
                <p className="text-muted text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <JobPostForm />

          {/* ------------------------------------------------- nasıl çalışır -- */}
          <section className="mt-24" aria-labelledby="nasil-calisir">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Nasıl çalışır</p>
            <h2 id="nasil-calisir" className="text-3xl md:text-4xl font-display font-semibold mb-8">
              Talepten teklife dört adım.
            </h2>
            <ol className="space-y-4">
              {jobSteps.map((step, index) => (
                <li
                  key={step.title}
                  id={`adim-${index + 1}`}
                  className="bg-surface p-7 rounded-2xl border border-white/5 flex gap-5"
                >
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
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Kategoriler</p>
            <h2 id="kategoriler" className="text-3xl md:text-4xl font-display font-semibold mb-8">
              Hangi işler için talep oluşturabilirsiniz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobCategories.map((category) => (
                <article key={category.id} className="bg-surface p-7 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-display font-semibold mb-3">{category.name}</h3>
                  <p className="text-muted leading-relaxed mb-4">{category.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {category.examples.map((example) => (
                      <li
                        key={example}
                        className="text-xs text-muted border border-white/10 rounded-full px-3 py-1"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* ------------------------------------------------------- ipuçları -- */}
          <section className="mt-24" aria-labelledby="ipuclari">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Talep yazma rehberi</p>
            <h2 id="ipuclari" className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Daha çok teklif almanızı sağlayan 5 kural.
            </h2>
            <p className="text-muted leading-relaxed max-w-2xl mb-8">
              Aynı iş için gelen fiyatların birbirinden çok farklı çıkmasının sebebi
              genellikle işin kendisi değil, talebin nasıl anlatıldığıdır. Eksik yazılmış
              bir talebe hizmet verenler ya hiç fiyat vermez ya da kendini garantiye alan
              yüksek bir rakam verir. Aşağıdaki beş nokta, aldığımız taleplerde farkı en
              çok yaratanlar.
            </p>
            <div className="space-y-4">
              {jobTips.map((tip, index) => (
                <article
                  key={tip.title}
                  className="bg-surface p-7 rounded-2xl border border-white/5 flex gap-5"
                >
                  <span className="text-gold font-mono text-xs pt-1.5 shrink-0">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">{tip.title}</h3>
                    <p className="text-muted leading-relaxed">{tip.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ------------------------------------------------------------- SSS -- */}
          <section className="mt-24" aria-labelledby="sss">
            <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Sık sorulanlar</p>
            <h2 id="sss" className="text-3xl md:text-4xl font-display font-semibold mb-8">
              İş talebi hakkında sık sorulan sorular
            </h2>
            <div className="space-y-4">
              {jobFaqs.map((faq) => (
                <article key={faq.question} className="bg-surface p-7 rounded-2xl border border-white/5">
                  <h3 className="text-xl font-display font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ------------------------------------------- hizmet veren tarafı -- */}
          <section className="mt-24" aria-labelledby="hizmet-veren">
            <div className="bg-surface border border-gold/20 rounded-2xl p-8 md:p-10">
              <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">
                Hizmet verenler için
              </p>
              <h2
                id="hizmet-veren"
                className="text-3xl md:text-4xl font-display font-semibold mb-4"
              >
                Usta veya hizmet veren misiniz?
              </h2>
              <p className="text-muted leading-relaxed max-w-2xl mb-6">
                Boyacı, elektrikçi, nakliyeci, temizlik ekibi, tasarımcı ya da
                yazılımcıysanız ağımıza katılabilirsiniz. Uzmanlık alanınıza ve
                çalıştığınız ilçelere uyan talepler geldiğinde sizinle paylaşıyoruz;
                fiyatınızı verip vermemek size kalıyor. <strong>Katılmak ve teklif
                vermek ücretsiz, işi aldığınızda da komisyon almıyoruz.</strong>
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/hizmet-veren"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-bg hover:bg-gold-light transition-colors"
                >
                  Nasıl çalıştığını okuyun
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                    'Merhaba, hizmet veren ağınıza katılmak istiyorum. Uzmanlık alanım: '
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-muted hover:text-text-primary hover:border-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp&apos;tan yazın
                </a>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------- iç bağlantılar -- */}
          <section className="mt-24" aria-labelledby="devami">
            <h2 id="devami" className="text-2xl md:text-3xl font-display font-semibold mb-6">
              Dijital bir iş için mi geldiniz?
            </h2>
            <p className="text-muted leading-relaxed max-w-2xl mb-6">
              Web sitesi, e-ticaret, SEO ve reklam tarafı bizim kendi işimiz. Neyi nasıl
              yaptığımızı önce görmek isterseniz:
            </p>
            <ul className="flex flex-wrap gap-3">
              {relatedLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="inline-flex items-center rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted hover:text-text-primary hover:border-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
