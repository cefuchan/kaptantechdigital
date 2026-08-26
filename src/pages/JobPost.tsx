import { SEO } from '../components/SEO';
import JobPostForm from '../components/JobPostForm';
import { Breadcrumbs } from '../components/Breadcrumbs';

export default function JobPost() {
  return (
    <>
      <SEO
        title="İş ve Hizmet Talebi Oluştur | KAPTAN"
        description="Hizmet veya iş talebinizi oluşturun, WhatsApp'ta tek tıkla paylaşmaya hazır ilan metnini hemen alın."
        url="/is-talebi"
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="w-16 h-[2px] bg-gold mt-4 mb-6" />

          <Breadcrumbs
            items={[
              { name: 'Ana Sayfa', path: '/' },
              { name: 'İş Talebi Oluştur', path: '/is-talebi' }
            ]}
          />

          <div className="mt-8">
            <JobPostForm />
          </div>
        </div>
      </div>
    </>
  );
}
