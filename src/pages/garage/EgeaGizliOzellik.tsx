import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  MapPin,
  ShieldCheck,
  Clock,
  MessageCircle,
  Check,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { absoluteUrl } from '../../data/site';
import { garageContact, whatsappLink } from '../../data/altindagGaraj';
import { CaprazGecis } from '../../components/garage/CaprazGecis';

const PATH = '/ankara-gizli-ozellik/egea';

const egeaFeatures = [
  {
    title: 'Kadran Karşılama (Selamlama)',
    desc: 'Kontak açıldığında gösterge ibrelerinin sona vurup geri gelmesi animasyonu.'
  },
  {
    title: 'Viraj Aydınlatma (Cornering)',
    desc: 'Direksiyon çevrildiğinde veya sinyal verildiğinde ilgili sis farının otomatik yanması.'
  },
  {
    title: 'Anlık Tork & Güç Göstergesi',
    desc: 'Yol bilgisayarı ekranında motorun anlık ürettiği tork ve beygir gücü değerleri.'
  },
  {
    title: 'Emniyet Kemeri İkaz Sesi İptali',
    desc: 'Kemer takılmadığında çalan rahatsız edici sesli uyarının yazılımsal kapatılması (görsel uyarı kalır).'
  },
  {
    title: 'Ekstra Yol Bilgisayarı Sayfaları',
    desc: 'Akü voltajı, turbo basıncı, yağ sıcaklığı ve tüketim geçmişi göstergelerinin açılması.'
  },
  {
    title: 'Gündüz Farı (DRL) Menü Kontrolü',
    desc: 'Gündüz sürüş farlarının gösterge menüsünden isteğe bağlı açılıp kapatılabilmesi.'
  },
  {
    title: 'Kumandadan Cam Açma / Kapama',
    desc: 'Uzaktan kumanda kilitleme/açma tuşuna basılı tutarak tüm camların kontrolü.'
  },
  {
    title: 'Geri Viteste Arka Silecek İptali',
    desc: 'Ön silecekler açıkken geri vitese takıldığında arka sileceğin kuru cama sürtmesinin önlenmesi.'
  }
];

const faqs = [
  {
    q: 'Egea gizli özellik açma işlemi garantiyi bozar mı?',
    a: 'Hayır. İşlem Fiat’ın orijinal beyin yazılımı (Body Control Module) üzerinden, fabrikada kapalı bırakılmış resmi parametrelerin aktif edilmesiyle yapılır. Kablo kesme veya ek modül yoktur.'
  },
  {
    q: 'Hangi Egea modelleriyle uyumludur?',
    a: '2015 - 2026 arası tüm Egea Sedan, Hatchback, Station Wagon ve Egea Cross (Easy, Urban, Lounge, Limited) donanımlarıyla tam uyumludur.'
  },
  {
    q: 'İşlem ne kadar sürer ve adrese geliyor musunuz?',
    a: 'İşlem ortalama 15-20 dakika sürer. Altındağ servis noktamızda veya Ankara’nın tüm ilçelerinde kapınızda mobil servis ile uygulanabilir.'
  },
  {
    q: 'TÜVTÜRK muayenesinde sorun yaşar mıyım?',
    a: 'Kesinlikle hayır. Açılan özellikler konfor ve bilgilendirme odaklıdır; muayene standartlarına ve araç güvenliğine %100 uygundur.'
  }
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['AutoRepair', 'Service'],
      '@id': `${absoluteUrl(PATH)}#service`,
      name: 'Ankara Fiat Egea Gizli Özellik Açma — Altındağ Garaj',
      description:
        'Ankara genelinde Fiat Egea Sedan, HB ve Cross modelleri için yerinde garantili gizli özellik açma, kadran selamlama, viraj aydınlatma ve tork göstergesi kodlaması.',
      url: absoluteUrl(PATH),
      provider: {
        '@type': 'LocalBusiness',
        name: 'Altındağ Gizli Özellik & Araç Kodlama',
        telephone: `+${garageContact.whatsapp}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: garageContact.district,
          addressRegion: garageContact.city,
          addressCountry: 'TR'
        }
      },
      areaServed: { '@type': 'City', name: 'Ankara' }
    },
    {
      '@type': 'FAQPage',
      '@id': `${absoluteUrl(PATH)}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    }
  ]
};

export default function EgeaGizliOzellik() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('submitting');
    try {
      const res = await fetch(garageContact.formEndpoint, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) setFormState('success');
      else setFormState('error');
    } catch {
      setFormState('error');
    }
  }

  const waHref = whatsappLink('Merhaba, Fiat Egea aracım için gizli özellik açtırmak istiyorum.') ?? '#randevu';

  return (
    <>
      <SEO
        title="Ankara Fiat Egea Gizli Özellik Açma & Kodlama | Altındağ Garaj"
        description="Fiat Egea Sedan, Cross ve HB için kadran selamlama, viraj aydınlatma, tork göstergesi ve kemer ikaz iptali. Ankara geneli adrese mobil servis!"
        url={PATH}
        schema={schema}
      />

      <div className="min-h-screen bg-[#0B192C] text-[#E0E6ED] font-garage antialiased">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B192C]/90 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
            <Link to="/ankara-gizli-ozellik" className="flex items-center gap-2 text-sm text-[#00E5FF] hover:underline">
              <ArrowLeft className="h-4 w-4" />
              <span>Tüm Markalar &amp; Garaj Ana Sayfası</span>
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#00E5FF] px-4 py-2 text-xs font-semibold text-[#0B192C] hover:bg-[#00B4D8] transition-all"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Egea Randevusu Al</span>
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[#00E5FF]">
              <MapPin className="h-3.5 w-3.5" />
              FIAT EGEA ÖZEL YAZILIM KODLAMA · ANKARA
            </p>
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl md:text-6xl leading-tight">
              Ankara Fiat Egea <span className="text-[#00E5FF]">Gizli Özellik Açma</span> &amp; Kodlama
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-[#E0E6ED]/70 md:text-lg">
              Egea Cross, Sedan ve HB modellerinde fabrikanın kapalı bıraktığı tüm konfor, aydınlatma ve performans göstergelerini %100 orijinal OBD soketinden 20 dakikada açıyoruz.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00E5FF]" /> Sıfır Kablo Kesme
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <Clock className="h-3.5 w-3.5 text-[#00E5FF]" /> 20 Dakikada Teslim
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <MapPin className="h-3.5 w-3.5 text-[#00E5FF]" /> Kapıda Mobil Servis
              </span>
            </div>

            <div className="mt-10 flex justify-center gap-4">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#00E5FF] px-6 py-3.5 text-sm font-semibold text-[#0B192C] shadow-[0_0_25px_-5px_#00E5FF] hover:bg-[#00B4D8] transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp ile Egea Özellik Listesi İste
              </a>
            </div>
          </div>
        </section>

        {/* Özellikler Grid */}
        <section className="border-t border-white/5 bg-[#0E1626] py-20">
          <div className="mx-auto max-w-5xl px-5">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Fiat Egea’da Açtığımız Başlıca Gizli Özellikler
              </h2>
              <p className="mt-3 text-sm text-[#E0E6ED]/60">
                Aracınızın donanım paketine (Easy, Urban, Lounge, Cross) göre aktif edilen modüller
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
              {egeaFeatures.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#1E293B]/40 p-5 hover:border-[#00E5FF]/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00E5FF]/10 text-[#00E5FF]">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-xs text-[#E0E6ED]/65 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">
              Fiat Egea Gizli Özellik Sıkça Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-white/10 bg-[#0E1626] p-6">
                  <h3 className="text-base font-semibold text-white">{faq.q}</h3>
                  <p className="mt-2 text-sm text-[#E0E6ED]/70 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form CTA */}
        <section id="randevu" className="border-t border-white/5 bg-[#0E1626] py-16">
          <div className="mx-auto max-w-xl px-5 text-center">
            <h2 className="text-2xl font-bold text-white">Egea Aracınız İçin Hemen Fiyat &amp; Randevu Alın</h2>
            <p className="mt-2 text-sm text-[#E0E6ED]/65">
              Formu doldurun veya WhatsApp üzerinden bize doğrudan yazın.
            </p>

            {formState === 'success' ? (
              <div className="mt-6 rounded-2xl border border-[#00E5FF]/30 bg-[#00E5FF]/10 p-6 text-[#00E5FF]">
                ✓ Talebiniz alındı! En kısa sürede Egea özellik listenizle size dönüş yapacağız.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
                <input type="hidden" name="arac_modeli" value="Fiat Egea" />
                <input
                  type="text"
                  name="ad_soyad"
                  required
                  placeholder="Adınız Soyadınız"
                  className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#00E5FF] focus:outline-none"
                />
                <input
                  type="tel"
                  name="telefon"
                  required
                  placeholder="Telefon Numaranız (0551...)"
                  className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#00E5FF] focus:outline-none"
                />
                <input
                  type="text"
                  name="ilce_konum"
                  placeholder="Bulunduğunuz İlçe / Konum (Örn: Çankaya, Keçiören)"
                  className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#00E5FF] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full rounded-full bg-[#00E5FF] py-3.5 text-sm font-semibold text-[#0B192C] hover:bg-[#00B4D8] transition-all disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Gönderiliyor…' : 'Egea İçin Teklif Al'}
                </button>
              </form>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-5 pb-16">
          <CaprazGecis current="fiat-egea" />
        </div>
      </div>
    </>
  );
}
