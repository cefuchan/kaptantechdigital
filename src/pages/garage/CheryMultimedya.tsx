import { useState, type FormEvent } from 'react';
import {
  MapPin,
  ShieldCheck,
  Clock,
  MessageCircle,
  Check,
  ArrowLeft,
  Tv,
  Smartphone,
  Wifi
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { absoluteUrl } from '../../data/site';
import { garageContact, whatsappLink } from '../../data/altindagGaraj';
import { CaprazGecis } from '../../components/garage/CaprazGecis';

const PATH = '/ankara-gizli-ozellik/chery-multimedya';

const cheryFeatures = [
  {
    title: 'Hareket Hâlinde YouTube & Netflix',
    desc: 'Sürüş esnasında video kısıtlaması olmadan orijinal ekranda kesintisiz YouTube, Netflix, Exxen ve video izleme.'
  },
  {
    title: 'Kablosuz Apple CarPlay & Android Auto',
    desc: 'Kablo takma zorunluluğunu ortadan kaldıran, araca bindiğiniz anda otomatik bağlanan kablosuz arayüz.'
  },
  {
    title: 'Trim & Göğüs Sökmeden Type-C Tak-Çalıştır',
    desc: 'Aracın orijinal konsoluna, trimlerine veya kablolarına hiçbir müdahale yapılmadan Type-C portu üzerinden anında aktifleşme.'
  },
  {
    title: 'Google Play Store & APK Yükleme',
    desc: 'Spotify, Yandex Navigasyon, IPTV ve dilediğiniz tüm Android uygulamalarını doğrudan araç ekranına yükleme.'
  },
  {
    title: 'Ekran Yansıtma (Screen Mirroring)',
    desc: 'Telefon ekranınızı tam çözünürlük ve ses senkronizasyonuyla Chery multimedya ekranına yansıtma.'
  },
  {
    title: 'Garantiyi Asla Bozmayan Yapı',
    desc: 'Cihaz araçtan çekildiği anda fabrika ayarlarına döner; servis ve garanti süreçlerinde sıfır iz bırakır.'
  }
];

const faqs = [
  {
    q: 'Chery aracımın göğsü veya trimleri sökülüyor mu?',
    a: 'Kesinlikle hayır! Sistem tamamen tak-çalıştır (Plug & Play) prensibiyle çalışır. Aracın orijinal Type-C / USB portuna bağlanır, hiçbir plastik parça sökülmez.'
  },
  {
    q: 'Hangi Chery modellerine uygundur?',
    a: 'Chery Omoda 5, Tiggo 7 Pro, Tiggo 8 Pro ve tüm donanım paketleriyle (Comfort, Luxury, Excellent) %100 uyumludur.'
  },
  {
    q: 'Sürüş güvenliği ve araç garantisi etkilenir mi?',
    a: 'Aracın orijinal yazılımına ya da beynine müdahale edilmediği için garantiye hiçbir etkisi yoktur. Cihaz istendiğinde 1 saniyede çıkartılabilir.'
  }
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['AutoRepair', 'Service'],
      '@id': `${absoluteUrl(PATH)}#service`,
      name: 'Ankara Chery Multimedya & Android Box Video Oynatma — Omoda 5, Tiggo 7/8',
      description:
        'Ankara genelinde Chery Omoda 5 ve Tiggo modelleri için trim sökmeden Type-C tak-çalıştır Android Box kurulumu, YouTube, Netflix ve kablosuz CarPlay aktivasyonu.',
      url: absoluteUrl(PATH),
      provider: {
        '@type': 'LocalBusiness',
        name: 'Altındağ Gizli Özellik & Araç Multimedya',
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

export default function CheryMultimedya() {
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

  const waHref = whatsappLink('Merhaba, Chery aracım için Android Box ve video oynatma çözümü hakkında bilgi almak istiyorum.') ?? '#randevu';

  return (
    <>
      <SEO
        title="Ankara Chery Video Oynatma & Android Box | Omoda 5, Tiggo 7/8"
        description="Chery Omoda 5 ve Tiggo için trim sökmeden Type-C tak-çalıştır YouTube, Netflix ve kablosuz CarPlay kurulumu. Ankara genelinde kapıda teslim ve test!"
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
              <span>Chery Bilgi Al</span>
            </a>
          </div>
        </header>

        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[#00E5FF]">
              <MapPin className="h-3.5 w-3.5" />
              CHERY OMODA 5 · TIGGO 7 · TIGGO 8 PRO · ANKARA
            </p>
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl md:text-6xl leading-tight">
              Ankara Chery <span className="text-[#00E5FF]">Video Oynatma</span> &amp; Android Box
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-[#E0E6ED]/70 md:text-lg">
              Aracınızın garantisini bozmadan, konsolunu sökmeden Type-C üzerinden tak-çalıştır YouTube, Netflix, Spotify ve kablosuz CarPlay keyfi.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <Tv className="h-3.5 w-3.5 text-[#00E5FF]" /> YouTube &amp; Netflix
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00E5FF]" /> Sıfır Trim Sökme
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E293B] px-3.5 py-1.5 text-xs text-white border border-white/10">
                <Wifi className="h-3.5 w-3.5 text-[#00E5FF]" /> Kablosuz CarPlay
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
                Chery Multimedya Fiyatı ve Randevu Al
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-[#0E1626] py-20">
          <div className="mx-auto max-w-5xl px-5">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Chery Android Box Sistemi Neler Sunuyor?
              </h2>
              <p className="mt-3 text-sm text-[#E0E6ED]/60">
                Aracın orijinal ekranına tam uyumlu yüksek performanslı akıllı kutu
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cheryFeatures.map((item) => (
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
              Chery Android Box Sıkça Sorulan Sorular
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
            <h2 className="text-2xl font-bold text-white">Chery Aracınız İçin Hemen Sipariş / Randevu Alın</h2>
            <p className="mt-2 text-sm text-[#E0E6ED]/65">
              Ankara genelinde yerinde deneme ve kurulum imkanı.
            </p>

            {formState === 'success' ? (
              <div className="mt-6 rounded-2xl border border-[#00E5FF]/30 bg-[#00E5FF]/10 p-6 text-[#00E5FF]">
                ✓ Talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
                <input type="hidden" name="kategori" value="Chery Android Box" />
                <input
                  type="text"
                  name="arac_modeli"
                  required
                  placeholder="Chery Modeliniz (Örn: Omoda 5 Luxury)"
                  className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#00E5FF] focus:outline-none"
                />
                <input
                  type="tel"
                  name="telefon"
                  required
                  placeholder="Telefon Numaranız (0551...)"
                  className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#00E5FF] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full rounded-full bg-[#00E5FF] py-3.5 text-sm font-semibold text-[#0B192C] hover:bg-[#00B4D8] transition-all disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Gönderiliyor…' : 'Fiyat Bilgisi Al'}
                </button>
              </form>
            )}
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-5 pb-16">
          <CaprazGecis current="chery" />
        </div>
      </div>
    </>
  );
}
