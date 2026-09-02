import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { breadcrumbSchema, graph } from '../data/schema';
import { kvkkSections, providerNotice } from '../data/kvkk';
import { absoluteUrl, site } from '../data/site';

const crumbs = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'KVKK Aydınlatma Metni', path: '/kvkk' }
];

const schema = graph(
  {
    '@type': 'WebPage',
    '@id': `${absoluteUrl('/kvkk')}#webpage`,
    name: 'KVKK Aydınlatma Metni',
    url: absoluteUrl('/kvkk'),
    inLanguage: site.language,
    description:
      'İş ve hizmet talebi formunda toplanan kişisel verilerin hangi amaçla işlendiği, kimlerle paylaşıldığı, ne kadar süre saklandığı ve veri sahibinin hakları.',
    isPartOf: { '@id': `${site.url}/#website` },
    publisher: { '@id': `${site.url}/#organization` }
  },
  breadcrumbSchema(crumbs)
);

export default function Kvkk() {
  return (
    <>
      <SEO
        title="KVKK Aydınlatma Metni | KAPTAN"
        description="İş ve hizmet talebi formunda hangi verileri topluyoruz, ne için kullanıyoruz, kimlerle paylaşıyoruz ve ne kadar süre saklıyoruz? KVKK kapsamındaki haklarınız."
        url="/kvkk"
        schema={schema}
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-3xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />

          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Kişisel verilerin korunması</p>
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-4">
            Bu metin, <Link to="/is-talebi" className="text-gold hover:text-white transition-colors">iş ve hizmet
            talebi formunu</Link> dolduran kişilerin verilerinin nasıl işlendiğini anlatır. Sistemin bugün
            gerçekten yaptığı işi tarif eder; ilerideki bir plana değil.
          </p>
          <p className="text-muted/70 text-sm leading-relaxed mb-12">
            Son güncelleme: 1 Eylül 2026
          </p>

          <div className="space-y-12">
            {kvkkSections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2
                  id={section.id}
                  className="text-2xl md:text-3xl font-display font-semibold mb-4"
                >
                  {section.heading}
                </h2>
                {section.paragraphs?.map((text) => (
                  <p key={text.slice(0, 40)} className="text-muted leading-relaxed mb-4">
                    {text}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-3 mt-2">
                    {section.bullets.map((item) => (
                      <li key={item.slice(0, 40)} className="text-muted leading-relaxed flex gap-3">
                        <span className="text-gold mt-2 h-1 w-1 rounded-full bg-gold shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section aria-labelledby="hizmet-verenler">
              <h2 id="hizmet-verenler" className="text-2xl md:text-3xl font-display font-semibold mb-4">
                Hizmet verenler için
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Ağımıza katılıp taleplere teklif veren hizmet verenler için geçerli kurallar:
              </p>
              <ul className="space-y-3">
                {providerNotice.map((item) => (
                  <li key={item.slice(0, 40)} className="text-muted leading-relaxed flex gap-3">
                    <span className="text-gold mt-2 h-1 w-1 rounded-full bg-gold shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-16 bg-surface border border-white/5 rounded-2xl p-7">
            <p className="text-muted leading-relaxed">
              Verilerinizle ilgili bir talebiniz mi var? {' '}
              <a
                href={`mailto:${site.email}`}
                className="text-gold hover:text-white transition-colors"
              >
                {site.email}
              </a>{' '}
              adresine yazın; 30 gün içinde ücretsiz olarak sonuçlandıralım.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
