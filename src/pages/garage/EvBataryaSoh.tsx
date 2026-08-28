import { useState, type FormEvent } from 'react';
import {
  MapPin,
  ShieldCheck,
  Clock,
  MessageCircle,
  Check,
  ArrowLeft,
  BatteryCharging,
  Zap,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { absoluteUrl } from '../../data/site';
import { garageContact, whatsappLink } from '../../data/altindagGaraj';
import { CaprazGecis } from '../../components/garage/CaprazGecis';

const PATH = '/ankara-gizli-ozellik/ev-batarya-soh';

const sohFeatures = [
  {
    title: 'SoH (State of Health) Batarya Sağlık Yüzdesi',
    desc: 'Bataryanın fabrika çıkış kapasitesine kıyasla mevcut net sağlık ve depolama durumunu yüzde olarak ölçme.'
  },
  {
    title: 'Hücre Voltaj Dengesi ve Zayıf Hücre Tespiti',
    desc: 'Tüm batarya hücrelerinin milivolt seviyesinde voltaj dengesizliğini ve potansiyel arızalı modülleri tespit etme.'
  },
  {
    title: 'Gerçek Menzil ve Tüketim Analizi',
    desc: 'Kullanım alışkanlıkları ve batarya yıpranmasına bağlı olarak aracın sunabileceği gerçekçi menzil hesabı.'
  },
  {
    title: 'Şarj Döngüsü (Cycle Count) ve Hızlı Şarj Geçmişi',
    desc: 'Bataryanın kaç kez DC (Hızlı Şarj) ve AC (Normal Şarj) ile doldurulduğunu ortaya çıkaran geçmiş raporu.'
  },
  {
    title: 'Yazılı ve Onaylı Ekspertiz Raporu',
    desc: '2. el elektrikli araç alım ve satımında taraflara güven veren, bağımsız ve kapsamlı teknik ekspertiz çıktısı.'
  },
  {
    title: 'Adreste / Noterde Yerinde Mobil Test',
    desc: 'Ankara genelinde araç başında veya noter öncesinde adrese gelerek 30 dakikada batarya teşhisi.'
  }
];

const faqs = [
  {
    q: 'SoH (State of Health) testi nedir ve neden önemlidir?',
    a: 'Elektrikli araçlarda batarya, toplam araç değerinin %40 ila %50’sini oluşturur. Göstergedeki şarj yüzdesi (SoC) sadece anlık doluluğu gösterir; bataryanın gerçek ömrünü ve yıpranmasını yalnızca bağımsız bir SoH testi ortaya koyabilir.'
  },
  {
    q: 'Hangi elektrikli araç modelleri test edilebiliyor?',
    a: 'Togg T10X, Tesla Model Y / Model 3, MG4 / ZS EV, Renault Zoe, Megane E-Tech, Hyundai Ioniq 5 / 6, Kia EV6, BMW i4 / iX ve BYD modelleri desteklenmektedir.'
  },
  {
    q: 'Test işlemi araca zarar verir mi veya garanti bozar mı?',
    a: 'Kesinlikle hayır. Test işlemi orijinal OBD teşhis portu üzerinden yalnızca veri okuma (diagnostik) protokolleriyle yapılır. Bataryaya fiziksel veya elektriksel hiçbir müdahale yapılmaz.'
  }
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['AutoRepair', 'Service'],
      '@id': `${absoluteUrl(PATH)}#service`,
      name: 'Ankara Elektrikli Araç Batarya Sağlığı (SoH) Testi & Ekspertiz — Togg, Tesla, MG',
      description:
        'Ankara genelinde elektrikli araçlar için mobil batarya sağlığı (SoH) testi, hücre voltaj dengesi ve 2. el alım-satım bağımsız batarya ekspertiz raporu.',
      url: absoluteUrl(PATH),
      provider: {
        '@type': 'LocalBusiness',
        name: 'Altındağ Garaj — Ankara EV Kodlama & Batarya Ekspertiz',
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

export default function EvBataryaSoh() {
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

  const waHref = whatsappLink('Merhaba, elektrikli araç batarya sağlığı (SoH) ekspertiz randevusu almak istiyorum.') ?? '#randevu';

  return (
    <>
      <SEO
        title="Ankara Elektrikli Araç Batarya Sağlığı (SoH) Testi | Togg, Tesla Ekspertiz"
        description="2. el elektrikli araç alımında batarya sağlığı (SoH) testi, hücre voltaj analizi ve bağımsız ekspertiz raporu. Ankara geneli adrese mobil servis!"
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
              <span>SoH Randevusu Al</span>
            </a>
          </div>
        </header>

        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[#00E5FF]">
              <MapPin className="h-3.5 w-3.5" />
              ANKARA ELEKTRİKLİ ARAÇ BATARYA EKSPERTİZİ
            </p>
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl md:text-6xl leading-tight">
              Ankara Elektrikli Araç <span className="text-[#00E5FF]">Batarya Sağlığı (SoH)</span> Testi
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-[#E0E6ED]/70 md:text-lg">
              Togg, Tesla, MG ve diğer elektrikli araçların ikinci el alım-satımında batarya yıpranmasını, hücre voltaj dengesini ve gerçek menzilini 30 dakikada raporluyoruz.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <BatteryCharging className="h-3.5 w-3.5 text-[#00E5FF]" /> %SoH Sağlık Ölçümü
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <FileText className="h-3.5 w-3.5 text-[#00E5FF]" /> Bağımsız Yazılı Rapor
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <MapPin className="h-3.5 w-3.5 text-[#00E5FF]" /> Noterde / Kapıda Mobil Test
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
                WhatsApp ile SoH Test Randevusu Al
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-[#0E1626] py-20">
          <div className="mx-auto max-w-5xl px-5">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Batarya Ekspertiz Raporunda Neler İncelenir?
              </h2>
              <p className="mt-3 text-sm text-[#E0E6ED]/60">
                Aracın batarya yönetim sistemi (BMS) üzerinden elde edilen hassas teşhis verileri
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sohFeatures.map((item) => (
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
              EV Batarya Sağlığı Hakkında Sıkça Sorulan Sorular
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
            <h2 className="text-2xl font-bold text-white">Elektrikli Aracınız İçin Batarya Testi Randevusu Alın</h2>
            <p className="mt-2 text-sm text-[#E0E6ED]/65">
              Ankara genelinde noter öncesi veya araç başında yerinde test.
            </p>

            {formState === 'success' ? (
              <div className="mt-6 rounded-2xl border border-[#00E5FF]/30 bg-[#00E5FF]/10 p-6 text-[#00E5FF]">
                ✓ Randevu talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
                <input type="hidden" name="kategori" value="EV Batarya SoH Testi" />
                <input
                  type="text"
                  name="arac_modeli"
                  required
                  placeholder="Araç Modeli ve Yılı (Örn: 2024 Togg T10X / Tesla Model Y)"
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
                  placeholder="Test Yapılacak İlçe / Konum"
                  className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#00E5FF] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full rounded-full bg-[#00E5FF] py-3.5 text-sm font-semibold text-[#0B192C] hover:bg-[#00B4D8] transition-all disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Gönderiliyor…' : 'Batarya Test Randevusu Al'}
                </button>
              </form>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-5 pb-16">
          <CaprazGecis current="elektrikli" />
        </div>
      </div>
    </>
  );
}
