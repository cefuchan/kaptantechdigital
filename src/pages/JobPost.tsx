import { SEO } from '../components/SEO';
import JobPostForm from '../components/JobPostForm';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { breadcrumbSchema, graph } from '../data/schema';
import { absoluteUrl, site } from '../data/site';

const crumbs = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'İş Talebi Oluştur', path: '/is-talebi' }
];

const schema = graph(
  {
    '@type': 'WebApplication',
    '@id': `${absoluteUrl('/is-talebi')}#tool`,
    name: 'İş ve Hizmet Talebi Oluşturucu',
    url: absoluteUrl('/is-talebi'),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: site.language,
    description:
      'Hizmet veya iş talebinizi doldurun; WhatsApp’ta paylaşmaya hazır, biçimlendirilmiş ilan metnini anında oluşturun.',
    publisher: { '@id': `${site.url}/#organization` },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' }
  },
  breadcrumbSchema(crumbs)
);

export default function JobPost() {
  return (
    <>
      <SEO
        title="İş ve Hizmet Talebi Oluştur | KAPTAN"
        description="Hizmet veya iş talebinizi oluşturun, WhatsApp'ta tek tıkla paylaşmaya hazır ilan metnini hemen alın. Ücretsiz, komisyonsuz."
        url="/is-talebi"
        schema={schema}
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-4xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />

          <h1 className="text-4xl md:text-6xl font-display font-semibold max-w-3xl mb-6">
            İlanınızı yazmayın, oluşturun.
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl mb-12">
            Aradığınız hizmeti veya vermek istediğiniz işi aşağıdaki forma girin;
            WhatsApp gruplarında doğrudan paylaşabileceğiniz düzenli bir ilan
            metnini saniyeler içinde hazırlayalım. Komisyon yok, aracı yok —
            talep sahibiyle doğrudan iletişime geçilir.
          </p>

          <JobPostForm />
        </div>
      </div>
    </>
  );
}
