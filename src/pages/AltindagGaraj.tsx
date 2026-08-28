import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  BatteryCharging,
  Cpu,
  MapPin,
  MessageCircle,
  Instagram,
  Clock,
  ShieldCheck,
  Zap,
  Check,
  ChevronDown,
  Truck,
  MonitorSmartphone
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { absoluteUrl } from '../data/site';
import {
  garageContact,
  garageServices,
  garageTestimonials,
  guaranteeFaqs,
  serviceDistricts,
  vehicleGroups,
  whatsappLink
} from '../data/altindagGaraj';

/**
 * Altındağ Garaj açılış sayfası.
 *
 * KAPTAN'ın kendi kabuğu (Navbar / Footer) olmadan render edilir — kendi
 * markası, kendi paleti ve kendi navigasyonu vardır. Renkler bilinçli olarak
 * Tailwind'in arbitrary value söz dizimiyle yazıldı; böylece bu palet
 * KAPTAN'ın tasarım tokenlarına sızmıyor.
 */

const PATH = '/ankara-gizli-ozellik';

const NAV = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Marka & Modeller', href: '#modeller' },
  { label: 'Batarya (SoH) Testi', href: '#soh' },
  { label: 'Fiyat Sorgulama', href: '#randevu' },
  { label: 'İletişim', href: '#iletisim' }
];

const SERVICE_ICONS = [Cpu, MonitorSmartphone, BatteryCharging, Truck];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['AutoRepair', 'LocalBusiness'],
      '@id': `${absoluteUrl(PATH)}#business`,
      name: 'Altındağ Gizli Özellik — Ankara Araç Yazılım & EV Kodlama Merkezi',
      description:
        'Altındağ ve tüm Ankara’da yerinde gizli özellik açma, araç kodlama, tak-çalıştır multimedya ve elektrikli araç batarya sağlığı (SoH) ekspertizi.',
      url: absoluteUrl(PATH),
      image: absoluteUrl('/og-image.png'),
      inLanguage: 'tr',
      priceRange: '₺₺',
      address: {
        '@type': 'PostalAddress',
        ...(garageContact.streetAddress ? { streetAddress: garageContact.streetAddress } : {}),
        addressLocality: garageContact.district,
        addressRegion: garageContact.city,
        addressCountry: 'TR'
      },
      openingHours: garageContact.openingHours,
      areaServed: serviceDistricts.map((name) => ({
        '@type': 'Place',
        name: `${name}, Ankara`
      })),
      ...(garageContact.whatsapp ? { telephone: `+${garageContact.whatsapp}` } : {}),
      sameAs: [garageContact.instagram],
      makesOffer: garageServices.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description
        }
      }))
    },
    {
      '@type': 'FAQPage',
      '@id': `${absoluteUrl(PATH)}#faq`,
      mainEntity: guaranteeFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    }
  ]
};

/** WhatsApp numarası tanımlı değilse randevu formuna düşen çağrı butonu. */
function ActionButton({
  message,
  children,
  variant = 'primary',
  className = ''
}: {
  message: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
}) {
  const href = whatsappLink(message) ?? '#randevu';
  const external = href.startsWith('http');

  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B192C]';
  const styles =
    variant === 'primary'
      ? 'bg-[#00E5FF] text-[#0B192C] hover:bg-[#00B4D8] shadow-[0_0_28px_-6px_#00E5FF]'
      : 'border border-[#00E5FF]/40 text-[#00E5FF] hover:border-[#00E5FF] hover:bg-[#00E5FF]/10';

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export default function AltindagGaraj() {
  const [activeVehicle, setActiveVehicle] = useState(vehicleGroups[0].id);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const vehicle = useMemo(
    () => vehicleGroups.find((group) => group.id === activeVehicle) ?? vehicleGroups[0],
    [activeVehicle]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormState('submitting');

    try {
      const response = await fetch(garageContact.formEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  }

  return (
    <>
      <SEO
        title="Altındağ Gizli Özellik Açma & Ankara EV Araç Yazılım Merkezi"
        description="Altındağ ve tüm Ankara'da yerinde Fiat Egea, Renault Megane, Clio gizli özellik açma, Chery & Togg Android Box ve Elektrikli Araç Batarya (SoH) testi."
        url={PATH}
        schema={schema}
      />

      <div className="garage-scope min-h-screen bg-[#0B192C] text-[#E0E6ED] font-garage antialiased">
        {/* ------------------------------------------------------- header -- */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B192C]/85 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00E5FF]/10 ring-1 ring-[#00E5FF]/30">
                <Zap className="h-4.5 w-4.5 text-[#00E5FF]" aria-hidden="true" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[13px] font-bold tracking-wide text-white">
                  ALTINDAĞ GİZLİ ÖZELLİK
                </span>
                <span className="hidden truncate text-[10px] tracking-[0.18em] text-[#00E5FF]/80 sm:block">
                  ANKARA ARAÇ YAZILIM
                </span>
              </span>
            </a>

            <nav aria-label="Bölümler" className="hidden lg:flex items-center gap-1">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm text-[#E0E6ED]/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <ActionButton
              message="Merhaba, aracım için hızlı randevu almak istiyorum."
              variant="ghost"
              className="shrink-0 px-3.5 py-2.5 text-[13px] sm:px-4"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Hızlı Randevu Al</span>
              <span className="sm:hidden">Randevu</span>
            </ActionButton>
          </div>
        </header>

        {/* --------------------------------------------------------- hero -- */}
        <section id="top" className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(60%_60%_at_50%_40%,#00B4D8_0%,transparent_70%)] opacity-[0.18] blur-2xl"
          />
          <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-16 text-center md:pt-28 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/5 px-4 py-1.5 text-[11px] font-medium tracking-[0.16em] text-[#00E5FF]">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                ALTINDAĞ · ANKARA GENELİ MOBİL SERVİS
              </p>

              <h1 className="text-balance text-[34px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
                Ankara Gizli Özellik Açma,{' '}
                <span className="text-[#00E5FF]">Araç Kodlama</span> &amp; EV Batarya Ekspertizi
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-balance text-base leading-relaxed text-[#E0E6ED]/70 md:text-lg">
                Altındağ servis noktamızda veya Ankara geneli adresinizde! %100 orijinal OBD yazılımı ile garanti standartlarında kodlama, tak-çalıştır multimedya ve elektrikli araç batarya sağlığı (SoH) raporlama.
              </p>

              <ul className="mx-auto mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
                {[
                  { icon: ShieldCheck, text: 'Sıfır kablo kesme · Garantili işlem' },
                  { icon: MapPin, text: 'Ankara geneli adrese servis' },
                  { icon: Clock, text: '20 dakikada teslimat' }
                ].map((badge) => (
                  <li
                    key={badge.text}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1E293B]/60 px-4 py-2 text-[13px] text-[#E0E6ED]/85"
                  >
                    <badge.icon className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                    {badge.text}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ActionButton message="Merhaba, aracımda açılabilen özelliklerin listesini istiyorum.">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp ile Özellik Listesi İste
                </ActionButton>
                <a
                  href="#modeller"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#00E5FF]/50 hover:text-[#00E5FF]"
                >
                  Aracını Seç &amp; Özellikleri Gör
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------- araç seçici -- */}
        <section id="modeller" className="border-y border-white/5 bg-[#0E1626] py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#00E5FF]">
                İNTERAKTİF SEÇİCİ
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold text-white md:text-4xl">
                Aracınızda hangi özellikler açılabiliyor?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#E0E6ED]/65">
                Markanızı seçin, o modelde açtığımız özellikleri hemen görün.
              </p>
            </div>

            {/* Marka sekmeleri */}
            <div
              role="tablist"
              aria-label="Marka seçimi"
              className="mb-8 flex flex-wrap justify-center gap-2"
            >
              {vehicleGroups.map((group) => {
                const active = group.id === activeVehicle;
                return (
                  <button
                    key={group.id}
                    type="button"
                    role="tab"
                    id={`tab-${group.id}`}
                    aria-selected={active}
                    aria-controls={`panel-${group.id}`}
                    onClick={() => setActiveVehicle(group.id)}
                    className={`rounded-xl border px-4 py-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                      active
                        ? 'border-[#00E5FF]/60 bg-[#00E5FF]/10 shadow-[0_0_24px_-10px_#00E5FF]'
                        : 'border-white/10 bg-[#1E293B]/50 hover:border-white/25'
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${active ? 'text-[#00E5FF]' : 'text-white'}`}
                    >
                      {group.brand}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-[#E0E6ED]/55">
                      {group.models}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Özellik paneli */}
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              role="tabpanel"
              id={`panel-${vehicle.id}`}
              aria-labelledby={`tab-${vehicle.id}`}
              className="rounded-2xl border border-white/10 bg-[#1E293B]/45 p-6 md:p-9"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">
                    {vehicle.brand}{' '}
                    <span className="font-normal text-[#E0E6ED]/60">— {vehicle.models}</span>
                  </h3>
                  <p className="mt-1 text-sm text-[#E0E6ED]/55">
                    {vehicle.features.length} özellik açılabiliyor
                  </p>
                </div>
                <span className="rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/5 px-3 py-1 text-[11px] font-medium text-[#00E5FF]">
                  {vehicle.tag}
                </span>
              </div>

              <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {vehicle.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[15px]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00E5FF]/15">
                      <Check className="h-3 w-3 text-[#00E5FF]" aria-hidden="true" />
                    </span>
                    <span className="text-[#E0E6ED]/85">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#E0E6ED]/55">
                  Liste donanım seviyesine ve model yılına göre değişebilir.
                </p>
                <ActionButton
                  message={`Merhaba, ${vehicle.brand} ${vehicle.models} için gizli özellik fiyatı öğrenmek istiyorum.`}
                  className="shrink-0"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Bu Özellikler İçin Fiyat Al
                </ActionButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ----------------------------------------------------- hizmetler -- */}
        <section id="hizmetler" className="py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-12 max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#00E5FF]">
                HİZMETLERİMİZ
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold text-white md:text-4xl">
                Yazılım laboratuvarı, tamirhane değil.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {garageServices.map((service, index) => {
                const Icon = SERVICE_ICONS[index] ?? Cpu;
                const isSoh = service.title.includes('SoH');
                return (
                  <article
                    key={service.title}
                    {...(isSoh ? { id: 'soh' } : {})}
                    className="group scroll-mt-24 rounded-2xl border border-white/10 bg-[#0E1626] p-7 transition-colors hover:border-[#00E5FF]/35"
                  >
                    <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#00E5FF]/10 ring-1 ring-[#00E5FF]/20">
                      <Icon className="h-5 w-5 text-[#00E5FF]" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <p className="mt-3 leading-relaxed text-[#E0E6ED]/70">{service.description}</p>
                    <ul className="mt-5 space-y-2">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm text-[#E0E6ED]/60"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00B4D8]"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ garanti -- */}
        <section className="border-y border-white/5 bg-[#0E1626] py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#00E5FF]">
                NEDEN BİZ?
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold text-white md:text-4xl">
                Garanti neden bozulmuyor?
              </h2>
              <p className="mt-5 leading-relaxed text-[#E0E6ED]/70">
                Çünkü araca fiziksel olarak dokunmuyoruz. Tüm işlemler aracın kendi
                teşhis soketi üzerinden, üreticinin yazılımının izin verdiği
                parametreler değiştirilerek yapılıyor.
              </p>

              <dl className="mt-8 space-y-4">
                {[
                  ['Kablo kesme yok', 'Ek modül lehimlenmez, tesisata müdahale edilmez.'],
                  ['Orijinal yedek alınır', 'İstendiğinde fabrika ayarlarına tek işlemde dönülür.'],
                  ['Lisanslı donanım', 'Sertifikalı soket ve arayüzlerle sıfır arıza riski.']
                ].map(([term, detail]) => (
                  <div
                    key={term}
                    className="rounded-xl border border-white/10 bg-[#1E293B]/40 p-4"
                  >
                    <dt className="flex items-center gap-2 text-sm font-semibold text-white">
                      <ShieldCheck className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                      {term}
                    </dt>
                    <dd className="mt-1.5 pl-6 text-sm text-[#E0E6ED]/60">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-3">
              {guaranteeFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-white/10 bg-[#1E293B]/40 open:border-[#00E5FF]/30"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[15px] font-semibold text-white marker:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]">
                    {faq.question}
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-[#00E5FF] transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed text-[#E0E6ED]/70">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- yorumlar -- */}
        {garageTestimonials.length > 0 && (
          <section className="py-20 md:py-24">
            <div className="mx-auto max-w-6xl px-5">
              <h2 className="mb-10 text-balance text-3xl font-bold text-white md:text-4xl">
                Müşterilerimiz ne diyor?
              </h2>
              <div className="grid gap-5 md:grid-cols-3">
                {garageTestimonials.map((item) => (
                  <figure
                    key={item.name}
                    className="rounded-2xl border border-white/10 bg-[#0E1626] p-6"
                  >
                    <blockquote className="leading-relaxed text-[#E0E6ED]/80">
                      “{item.text}”
                    </blockquote>
                    <figcaption className="mt-5 text-sm">
                      <span className="font-semibold text-white">{item.name}</span>
                      <span className="mt-0.5 block text-[#E0E6ED]/50">{item.vehicle}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --------------------------------------------------- kapsama -- */}
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="rounded-2xl border border-white/10 bg-[#0E1626] p-8 md:p-12">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#00E5FF]">
                KAPSAMA ALANI
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold text-white md:text-4xl">
                Hizmet verdiğimiz Ankara bölgeleri
              </h2>
              <p className="mt-4 max-w-2xl text-[#E0E6ED]/65">
                Altındağ’daki servis noktamıza gelebilir ya da aracınızın bulunduğu
                adrese gelmemizi isteyebilirsiniz.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {serviceDistricts.map((district) => (
                  <li
                    key={district}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#1E293B]/50 px-3.5 py-2 text-sm text-[#E0E6ED]/80"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[#00B4D8]" aria-hidden="true" />
                    {district}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- randevu -- */}
        <section id="randevu" className="scroll-mt-20 border-t border-white/5 bg-[#0E1626] py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#00E5FF]">
                FİYAT SORGULAMA
              </p>
              <h2 className="mt-3 text-balance text-3xl font-bold text-white md:text-4xl">
                Aracınıza özel fiyat alın
              </h2>
              <p className="mt-5 leading-relaxed text-[#E0E6ED]/70">
                Marka, model ve yılı paylaşın; o araçta açılabilecek özelliklerin
                listesini, süresini ve fiyatını size dönelim.
              </p>

              <div className="mt-8 space-y-3 text-sm">
                <p className="flex items-center gap-3 text-[#E0E6ED]/75">
                  <MapPin className="h-4 w-4 shrink-0 text-[#00E5FF]" aria-hidden="true" />
                  {garageContact.district}, {garageContact.city} — Ankara geneli mobil servis
                </p>
                <p className="flex items-center gap-3 text-[#E0E6ED]/75">
                  <Clock className="h-4 w-4 shrink-0 text-[#00E5FF]" aria-hidden="true" />
                  Pazartesi – Cumartesi · 09:00 – 19:00
                </p>
                {garageContact.phoneDisplay && (
                  <p className="flex items-center gap-3 text-[#E0E6ED]/75">
                    <MessageCircle className="h-4 w-4 shrink-0 text-[#00E5FF]" aria-hidden="true" />
                    {garageContact.phoneDisplay}
                  </p>
                )}
                <a
                  href={garageContact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#E0E6ED]/75 transition-colors hover:text-[#00E5FF]"
                >
                  <Instagram className="h-4 w-4 shrink-0 text-[#00E5FF]" aria-hidden="true" />
                  {garageContact.instagramHandle}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#1E293B]/40 p-6 md:p-8">
              {formState === 'success' ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#00E5FF]/15">
                    <Check className="h-6 w-6 text-[#00E5FF]" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-bold text-white">Talebiniz alındı</h3>
                  <p className="mt-2 text-[#E0E6ED]/65">En kısa sürede size dönüş yapacağız.</p>
                  <button
                    type="button"
                    onClick={() => setFormState('idle')}
                    className="mt-7 rounded-full border border-white/15 px-5 py-2 text-sm text-[#E0E6ED]/80 transition-colors hover:border-[#00E5FF]/50 hover:text-[#00E5FF]"
                  >
                    Yeni talep gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="_subject" value="Altındağ Garaj — randevu talebi" />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="ag-name" className="text-sm text-[#E0E6ED]/70">
                        Ad Soyad
                      </label>
                      <input
                        required
                        id="ag-name"
                        name="isim"
                        type="text"
                        placeholder="Adınız"
                        className="w-full rounded-lg border border-white/10 bg-[#0B192C] px-4 py-3 text-white placeholder:text-[#E0E6ED]/35 focus:border-[#00E5FF] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="ag-phone" className="text-sm text-[#E0E6ED]/70">
                        Telefon
                      </label>
                      <input
                        required
                        id="ag-phone"
                        name="telefon"
                        type="tel"
                        inputMode="numeric"
                        placeholder="05XX XXX XX XX"
                        className="w-full rounded-lg border border-white/10 bg-[#0B192C] px-4 py-3 text-white placeholder:text-[#E0E6ED]/35 focus:border-[#00E5FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="ag-vehicle" className="text-sm text-[#E0E6ED]/70">
                      Marka / Model / Yıl
                    </label>
                    <input
                      required
                      id="ag-vehicle"
                      name="arac"
                      type="text"
                      placeholder="Fiat Egea 2021"
                      className="w-full rounded-lg border border-white/10 bg-[#0B192C] px-4 py-3 text-white placeholder:text-[#E0E6ED]/35 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="ag-district" className="text-sm text-[#E0E6ED]/70">
                      İlçe
                    </label>
                    <select
                      id="ag-district"
                      name="ilce"
                      defaultValue=""
                      className="w-full rounded-lg border border-white/10 bg-[#0B192C] px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none"
                    >
                      <option value="" disabled>
                        Seçiniz
                      </option>
                      {serviceDistricts.map((district) => (
                        <option key={district} value={district} className="bg-[#0B192C]">
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="ag-message" className="text-sm text-[#E0E6ED]/70">
                      Talebiniz
                    </label>
                    <textarea
                      id="ag-message"
                      name="talep"
                      rows={4}
                      placeholder="Hangi özellikleri açtırmak istiyorsunuz?"
                      className="w-full resize-y rounded-lg border border-white/10 bg-[#0B192C] px-4 py-3 text-white placeholder:text-[#E0E6ED]/35 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>

                  {formState === 'error' && (
                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      Talep gönderilemedi. Bağlantınızı kontrol edip tekrar deneyin.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full rounded-full bg-[#00E5FF] py-3.5 font-semibold text-[#0B192C] transition-colors hover:bg-[#00B4D8] disabled:opacity-60"
                  >
                    {formState === 'submitting' ? 'Gönderiliyor…' : 'Fiyat Teklifi Al'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- footer -- */}
        <footer id="iletisim" className="scroll-mt-20 border-t border-white/5 bg-[#0B192C] py-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <p className="text-sm font-bold tracking-wide text-white">
                ALTINDAĞ GİZLİ ÖZELLİK
              </p>
              <p className="mt-1 text-[11px] tracking-[0.18em] text-[#00E5FF]/80">
                ANKARA ARAÇ YAZILIM &amp; EV KODLAMA MERKEZİ
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[#E0E6ED]/55">
                Gizli özellik aktivasyonu, tak-çalıştır multimedya ve elektrikli araç
                batarya sağlığı ekspertizi. Altındağ merkezli, Ankara geneli mobil servis.
              </p>
            </div>

            <nav aria-label="Alt menü" className="flex flex-col gap-2.5 text-sm">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[#E0E6ED]/60 transition-colors hover:text-[#00E5FF]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 text-sm">
              <p className="flex items-center gap-2.5 text-[#E0E6ED]/70">
                <MapPin className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                {garageContact.district}, {garageContact.city}
              </p>
              <p className="flex items-center gap-2.5 text-[#E0E6ED]/70">
                <Clock className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                Pzt–Cmt · 09:00–19:00
              </p>
              <a
                href={garageContact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#E0E6ED]/70 transition-colors hover:text-[#00E5FF]"
              >
                <Instagram className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                {garageContact.instagramHandle}
              </a>
              <ActionButton
                message="Merhaba, randevu almak istiyorum."
                className="mt-2 px-5 py-2.5 text-[13px]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Randevu Al
              </ActionButton>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-6xl border-t border-white/5 px-5 pt-6">
            <p className="text-xs text-[#E0E6ED]/35">
              © {new Date().getFullYear()} Altındağ Gizli Özellik · Ankara Araç Yazılım Merkezi
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
