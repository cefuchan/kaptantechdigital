import { useState, type FormEvent } from 'react';
import {
  MapPin,
  ShieldCheck,
  Clock,
  MessageCircle,
  Check,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { absoluteUrl } from '../../data/site';
import { garageContact, whatsappLink } from '../../data/altindagGaraj';
import { CaprazGecis } from '../../components/garage/CaprazGecis';

const PATH = '/ankara-gizli-ozellik/vag-grubu';

const vagFeatures = [
  {
    title: 'Kadran Selamlama & Lap Timer',
    desc: 'Kontak açıldığında ibre testi animasyonu ve gösterge panelinde tur zamanlayıcı (kronometre).'
  },
  {
    title: 'Amerikan Park & Karşılama Işıkları',
    desc: 'Ön sinyallerin kısık yanması, Coming Home / Leaving Home ışık süre ve mod kontrolü.'
  },
  {
    title: 'Strobe DRL (Zıt Yanan Sinyal & Gündüz Farı)',
    desc: 'Sinyal verildiğinde gündüz farının sırayla zıt yanıp sönmesi (Audi/VW animasyonu).'
  },
  {
    title: 'Geri Viteste Sağ Ayna İndirme (Tilt)',
    desc: 'Geri vitese takıldığında sağ yan aynanın kaldırımı gösterecek şekilde otomatik aşağı inmesi.'
  },
  {
    title: 'Korna ile Kilit Onay Sesi',
    desc: 'Aracı uzaktan kumanda ile kilitlerken veya açarken kısa korna bip sesi onayı.'
  },
  {
    title: 'Konfor Sinyal Sayısı Artırma (3 -> 5)',
    desc: 'Sinyal koluna dokunulduğunda yanan şerit değiştirme sinyal sayısının 3’ten 4 veya 5’e çıkarılması.'
  },
  {
    title: 'Klima Otomatik Modda Fan Hızı Göstergesi',
    desc: 'Klima AUTO modundayken fan üfleme hız seviyesinin dijital panelde görünür kılınması.'
  },
  {
    title: 'Ek Yakıt Göstergesi & Sürüş Modları',
    desc: 'Deponun tam dolması için gereken litre miktarının ve ek sürüş profillerinin açılması.'
  }
];

const faqs = [
  {
    q: 'VAG Grubu kodlama işlemi araç garantisini bozar mı?',
    a: 'Hayır. Yapılan tüm kodlamalar Volkswagen AG grubunun orijinal ODIS / VCDS beyin yazılımı standartlarına uygun parametrelerdir. Kablo kesme veya ek modül lehimleme yapılmaz.'
  },
  {
    q: 'Hangi modeller destekleniyor?',
    a: 'VW Golf (7, 7.5, 8), Passat (B8, B8.5), Polo, Tiguan, T-Roc, Seat Leon, Ibiza, Arona, Skoda Octavia, Superb, Kodiaq ve Audi A3 modelleri desteklenmektedir.'
  },
  {
    q: 'İşlem süresi ve yerinde servis imkanı var mı?',
    a: 'Ortalama 20 dakikada tamamlanır. Altındağ garajımızda veya Ankara genelinde adresinize gelerek kapınızda uyguluyoruz.'
  }
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['AutoRepair', 'Service'],
      '@id': `${absoluteUrl(PATH)}#service`,
      name: 'Ankara VAG Grubu Gizli Özellik Açma & Kodlama — VW, Seat, Skoda, Audi',
      description:
        'Ankara genelinde Volkswagen Golf, Passat, Seat Leon ve Skoda Octavia araçlar için orijinal ODIS lisanslı gizli özellik açma, kadran selamlama ve Amerikan park kodlaması.',
      url: absoluteUrl(PATH),
      provider: {
        '@type': 'LocalBusiness',
        name: 'Altındağ Gizli Özellik & Araç Kodlama',
        telephone: `+${garageContact.whatsapp}`
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

export default function VagGizliOzellik() {
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

  const waHref = whatsappLink('Merhaba, VAG grubu (VW/Seat/Skoda/Audi) aracım için gizli özellik kodlaması yaptırmak istiyorum.') ?? '#randevu';

  return (
    <>
      <SEO
        title="Ankara VAG Grubu Gizli Özellik Açma | VW, Seat, Skoda, Audi Kodlama"
        description="Volkswagen Golf, Passat, Seat Leon ve Skoda Octavia için kadran selamlama, Amerikan park, ayna indirme ve korna onayı. Ankara genelinde kapıda mobil servis!"
        url={PATH}
        schema={schema}
      />

      <div className="min-h-screen bg-[#0B192C] text-[#E0E6ED] font-garage antialiased">
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B192C]/90 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
            <Link to="/ankara-gizli-ozellik" className="flex items-center gap-2 text-sm text-[#00E5FF] hover:underline">
              <ArrowLeft className="h-4 w-4" />
              <span>Garaj Ana Sayfası</span>
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#00E5FF] px-4 py-2 text-xs font-semibold text-[#0B192C] hover:bg-[#00B4D8] transition-all"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>VAG Randevusu Al</span>
            </a>
          </div>
        </header>

        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[#00E5FF]">
              <MapPin className="h-3.5 w-3.5" />
              VOLKSWAGEN · SEAT · SKODA · AUDI KODLAMA · ANKARA
            </p>
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl md:text-6xl leading-tight">
              Ankara VAG Grubu <span className="text-[#00E5FF]">Gizli Özellik Açma</span> &amp; Yazılım
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-[#E0E6ED]/70 md:text-lg">
              Golf, Passat, Polo, Leon ve Octavia araçlarınızda fabrikasyon kapalı olan konfor, ışık ve gösterge donanımlarını sıfır kablo kesme garantisiyle aktif ediyoruz.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00E5FF]" /> Orijinal Beyin Yedeği
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <Clock className="h-3.5 w-3.5 text-[#00E5FF]" /> 20 Dakika İşlem
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <MapPin className="h-3.5 w-3.5 text-[#00E5FF]" /> Ankara Geneli Yerinde Servis
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
                VAG Özellik Listesi ve Fiyat Al
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-[#0E1626] py-20">
          <div className="mx-auto max-w-5xl px-5">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                VAG Araçlarında En Çok Açılan Özellikler
              </h2>
              <p className="mt-3 text-sm text-[#E0E6ED]/60">
                Model yılı ve kontrol ünitesi (BCM) desteğine göre açılan popüler fonksiyonlar
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {vagFeatures.map((item) => (
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

        <section className="py-20">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">
              VAG Grubu Kodlama Hakkında Merak Edilenler
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

        <section id="randevu" className="border-t border-white/5 bg-[#0E1626] py-16">
          <div className="mx-auto max-w-xl px-5 text-center">
            <h2 className="text-2xl font-bold text-white">VAG Aracınız İçin Hızlı Randevu Alın</h2>
            <p className="mt-2 text-sm text-[#E0E6ED]/65">
              Marka, model ve yıl bilginizi girin, aracınıza özel kodlama listesini hemen paylaşalım.
            </p>

            {formState === 'success' ? (
              <div className="mt-6 rounded-2xl border border-[#00E5FF]/30 bg-[#00E5FF]/10 p-6 text-[#00E5FF]">
                ✓ Talebiniz alındı! En kısa sürede aracınıza özel liste ile dönüş yapacağız.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
                <input type="hidden" name="kategori" value="VAG Grubu Kodlama" />
                <input
                  type="text"
                  name="arac_modeli"
                  required
                  placeholder="Araç Modeli ve Yılı (Örn: 2020 Golf 7.5)"
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
                  placeholder="Bulunduğunuz İlçe / Konum"
                  className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#00E5FF] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full rounded-full bg-[#00E5FF] py-3.5 text-sm font-semibold text-[#0B192C] hover:bg-[#00B4D8] transition-all disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Gönderiliyor…' : 'VAG İçin Teklif Al'}
                </button>
              </form>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-5 pb-16">
          <CaprazGecis current="vag-group" />
        </div>
      </div>
    </>
  );
}
