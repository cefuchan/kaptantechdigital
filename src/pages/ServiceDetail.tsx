import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from '../data/schema';
import { findService } from '../data/services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = findService(slug);

  if (!service) {
    return (
      <>
        <SEO
          title="Hizmet bulunamadı | KAPTAN"
          description="Aradığınız hizmet sayfası bulunamadı. Tüm hizmetlerimizi inceleyebilirsiniz."
          url="/hizmetler"
          noindex
        />
        <div className="pt-32 pb-24 text-center min-h-screen flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-display">Hizmet bulunamadı.</h1>
          <Link to="/hizmetler" className="text-gold hover:text-white transition-colors">
            Tüm hizmetlere dön
          </Link>
        </div>
      </>
    );
  }

  const servicePath = `/hizmetler/${slug}`;
  const crumbs = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetler', path: '/hizmetler' },
    { name: service.title, path: servicePath }
  ];

  const structuredData = graph(
    serviceSchema({
      name: `${service.title} Hizmeti`,
      description: service.description,
      path: servicePath,
      serviceType: service.title,
      offers: service.whatWeDo
    }),
    service.faqs ? faqSchema(service.faqs) : null,
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <SEO
        title={`${service.title} | KAPTAN`}
        description={service.description}
        url={servicePath}
        schema={structuredData}
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />
          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">{service.slogan}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold mb-8">{service.title}</h1>
          <p className="text-muted text-lg md:text-xl max-w-3xl leading-relaxed">
            {service.description}
          </p>
          {service.details && (
            <div className="max-w-3xl mt-8 space-y-5 text-muted leading-relaxed">
              {service.details.map((detail: string, index: number) => <p key={index}>{detail}</p>)}
            </div>
          )}
        </div>

        {service.outcomes && (
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <div className="border-y border-white/10 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.outcomes.map((outcome: string, index: number) => <p key={index} className="text-text-primary/90 font-medium">{outcome}</p>)}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-surface p-8 md:p-10 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-display font-semibold mb-8 flex items-center">
              <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center mr-3 text-sm">01</span>
              Ne Yapıyoruz?
            </h2>
            <ul className="space-y-4">
              {service.whatWeDo.map((item: string, i: number) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-gold mr-3 shrink-0" />
                  <span className="text-text-primary/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface p-8 md:p-10 rounded-2xl border border-white/5 flex flex-col">
            <h2 className="text-2xl font-display font-semibold mb-8 flex items-center">
              <span className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center mr-3 text-sm">02</span>
              Neden KAPTAN?
            </h2>
            <p className="text-muted text-lg leading-relaxed flex-grow">
              {service.whyUs}
            </p>
            
            <div className="mt-12 pt-8 border-t border-white/10">
               <Link to="/iletisim" className="inline-flex items-center text-gold font-medium hover:text-white transition-colors group">
                Bu hizmet için teklif alın
                <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>

        {service.sections && (
          <section className="max-w-4xl mx-auto px-6 mt-20">
            <div className="border-t border-white/10 pt-16 space-y-14">
              {service.sections.map((section: { heading: string; paragraphs: string[] }, index: number) => (
                <div key={index}>
                  <p className="text-gold font-mono text-xs tracking-widest mb-3">0{index + 3}</p>
                  <h2 className="text-2xl md:text-3xl font-display font-semibold mb-5">{section.heading}</h2>
                  <div className="space-y-5 text-muted text-lg leading-relaxed">
                    {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {service.faqs && (
          <section className="max-w-4xl mx-auto px-6 mt-20">
            <div className="border-t border-white/10 pt-16">
              <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Sık sorulan sorular</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">GEO hakkında merak edilenler</h2>
              <div className="space-y-4">
                {service.faqs.map((faq: { question: string; answer: string }, index: number) => (
                  <article key={index} className="bg-surface p-7 rounded-2xl border border-white/5">
                    <h3 className="text-xl font-display font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted leading-relaxed">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
