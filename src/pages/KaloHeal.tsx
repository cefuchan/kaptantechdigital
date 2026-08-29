import { useState, type FormEvent, type ReactNode } from 'react';
import {
  Apple,
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  Shield,
  Sparkles,
  Trophy,
  UtensilsCrossed,
  Scan,
  HeartHandshake,
  Lock,
  Share2,
  CheckCircle2,
  X
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { absoluteUrl, site } from '../data/site';
import {
  kalohealFaqs,
  kalohealFeatures,
  kalohealPricing,
  kalohealStore,
  kalohealTrophies,
  philosophyRows,
  trophyTiers
} from '../data/kaloheal';

const PATH = '/kaloheal';

const FEATURE_ICONS = [Camera, Shield, Scan, HeartHandshake];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${absoluteUrl(PATH)}#app`,
      name: 'KaloHeal',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS, Android',
      inLanguage: 'tr',
      description:
        'Devrimsel yapay zekâ klinik beslenme platformu. Fotoğraftan Türk mutfağı tabak analizi, kaçamak kalkanı ve sıfır suçluluk felsefesi.',
      url: absoluteUrl(PATH),
      publisher: { '@id': `${site.url}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'TRY',
        description: 'İlk 7 gün ücretsiz klinik deneyim'
      },
      featureList: kalohealFeatures.map((f) => f.title)
    },
    {
      '@type': 'FAQPage',
      '@id': `${absoluteUrl(PATH)}#faq`,
      mainEntity: kalohealFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'KAPTAN', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'KaloHeal', item: absoluteUrl(PATH) }
      ]
    }
  ]
};

/** Titanyum telefon arayüzü mockup'ı */
function PhoneMockup() {
  return (
    <div className="float-slow relative mx-auto w-[280px] sm:w-[320px]">
      {/* Ambient ambient glow bloom */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.18)_0%,rgba(10,132,255,0.14)_40%,transparent_70%)] blur-3xl"
      />

      {/* Dış Titanyum Çerçeve */}
      <div className="relative rounded-[3rem] border border-white/[0.12] bg-[#121216]/80 p-3.5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl ring-1 ring-white/5">
        {/* İç Ekran Paneli */}
        <div className="rounded-[2.4rem] border border-white/[0.08] bg-[#0A0A0C] p-5 text-left">
          {/* Üst Durum & Tarih */}
          <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#30D158] shadow-[0_0_8px_#30D158]" />
              <span className="text-[11px] font-medium tracking-wider text-white/50 uppercase">Klinik AI Aktif</span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/60">
              Bugün
            </span>
          </div>

          {/* Tabak Analizi Kartı */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#30D158]">
                Görsel Analiz
              </span>
              <span className="text-[10px] text-white/40">13:42</span>
            </div>
            <p className="mt-1 text-[16px] font-medium text-white">Karnıyarık &amp; Bulgur Pilavı</p>
            <p className="text-[11px] text-white/45">Türk Mutfağı · Gizli Yağ Hesaplanmış</p>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[28px] font-light tracking-tight text-white">584</span>
              <span className="text-[12px] text-white/40">kcal</span>
            </div>

            {/* Makro Barları */}
            <div className="mt-3 space-y-1.5">
              {[
                { label: 'Protein', val: '28g', pct: '30%', col: 'bg-[#30D158]' },
                { label: 'Karbonhidrat', val: '54g', pct: '48%', col: 'bg-[#0A84FF]' },
                { label: 'Sağlıklı Yağ', val: '22g', pct: '22%', col: 'bg-white/40' }
              ].map((m) => (
                <div key={m.label} className="text-[10px]">
                  <div className="mb-0.5 flex justify-between text-white/50">
                    <span>{m.label}</span>
                    <span>{m.val}</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div className={`h-full ${m.col}`} style={{ width: m.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sakin Diyetisyen Notu (Zero Guilt) */}
          <div className="mt-3 rounded-2xl border border-[#30D158]/25 bg-[#30D158]/[0.06] p-3.5 backdrop-blur-sm">
            <p className="text-[11.5px] leading-relaxed text-white/80">
              <span className="font-semibold text-[#30D158]">Diyetisyen Notu:</span> Dengeli bir öğün. Akşam için hafif bir zeytinyağlı sebze tabağı günün dengesini mükemmel tamamlar.
            </p>
          </div>

          {/* Alt Durum: Kaçamak Kalkanı & Seri */}
          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[11px]">
            <span className="text-white/40">Huzurlu Seri</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              14 Gün Kesintisiz
              <Shield className="h-3.5 w-3.5 text-[#30D158]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KaloHeal() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function handleWaitlist(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setState('sending');

    try {
      const res = await fetch(kalohealStore.waitlistEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              tarih: new Date().toLocaleString('tr-TR'),
              eposta: email,
              kaynak: 'KaloHeal Quiet Luxury Landing'
            }
          ]
        })
      });

      if (res.ok) {
        setState('done');
        setEmail('');
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }

  return (
    <>
      <SEO
        title="KaloHeal — Sakin Bir Diyetisyen. Her Gün Yanında."
        description="Suçluluk yok. Panik yok. Sadece bilgelik, denge ve nazik rehberlik. Türk mutfağına özel eğitilmiş devrimsel yapay zekâ klinik beslenme platformu."
        url={PATH}
        schema={schema}
      />

      <div className="kaloheal-scope min-h-screen bg-gradient-to-b from-[#0A0A0B] via-[#0E0E10] to-[#121214] font-kaloheal text-white antialiased selection:bg-[#30D158]/20 selection:text-[#30D158]">
        {/* --------------------------------------------------- Header -- */}
        <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0A0A0B]/85 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="#top" className="flex items-center gap-2.5 group">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#30D158] shadow-[0_0_15px_-3px_rgba(48,209,88,0.3)] transition-colors group-hover:border-[#30D158]/40">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-[17px] font-light tracking-tight text-white">
                Kalo<span className="font-normal text-[#30D158]">Heal</span>
              </span>
            </a>

            <nav aria-label="Bölümler" className="hidden items-center gap-8 text-[13px] text-white/55 md:flex">
              <a href="#ozellikler" className="transition-colors hover:text-white">Sistemler</a>
              <a href="#felsefe" className="transition-colors hover:text-white">Felsefe</a>
              <a href="#kupalar" className="transition-colors hover:text-white">Koleksiyon</a>
              <a href="#fiyatlandirma" className="transition-colors hover:text-white">Planlar</a>
              <a href="#sss" className="transition-colors hover:text-white">Merak Edilenler</a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#erken-erisim"
                className="relative inline-flex items-center justify-center rounded-full border border-[#30D158]/40 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_0_20px_-5px_rgba(48,209,88,0.25)] backdrop-blur-xl transition-all hover:border-[#30D158] hover:bg-[#30D158]/10 hover:shadow-[0_0_25px_-3px_rgba(48,209,88,0.4)]"
              >
                Ücretsiz Başla
              </a>
            </div>
          </div>
        </header>

        {/* ----------------------------------------------------- Hero -- */}
        <section id="top" className="relative overflow-hidden px-6 pt-20 pb-28 md:pt-32 md:pb-40">
          {/* Volumetric ambient background rays */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[650px] w-[1000px] max-w-[140vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(48,209,88,0.14)_0%,rgba(10,132,255,0.10)_42%,transparent_70%)] blur-[100px]"
          />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="reveal text-center lg:text-left">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[11.5px] font-medium tracking-[0.14em] text-[#30D158] backdrop-blur-2xl">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30D158] animate-pulse" />
                KLİNİK YAPAY ZEKA · QUIET LUXURY FELSEFESİ
              </p>

              <h1 className="text-balance text-[44px] font-light leading-[1.05] tracking-[-0.04em] text-[#F5F5F7] sm:text-[62px] lg:text-[76px]">
                Sakin bir diyetisyen.<br />
                <span className="font-normal text-white">Her gün yanında.</span>
              </h1>

              <p className="mt-6 text-balance text-[18px] font-light leading-relaxed text-[#A1A1A6] sm:text-[21px]">
                Suçluluk yok. Panik yok. Sadece bilgelik, denge ve nazik rehberlik.
              </p>

              <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/50 lg:mx-0">
                Türk mutfağının karmaşık yemeklerini, gizli yağlarını ve porsiyon dinamiklerini milimetrik anlayan 10+ yıl deneyimli bir klinik uzman gibi şefkatli.
              </p>

              {/* Butonlar */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <a
                  href="#erken-erisim"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#30D158]/50 bg-[#30D158]/10 px-8 py-4 text-[14.5px] font-medium text-white shadow-[0_0_30px_-5px_rgba(48,209,88,0.35)] backdrop-blur-xl transition-all hover:border-[#30D158] hover:bg-[#30D158]/20 hover:shadow-[0_0_40px_-2px_rgba(48,209,88,0.5)]"
                >
                  <span>Ücretsiz Başla</span>
                  <ArrowRight className="h-4 w-4 text-[#30D158] transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#ozellikler"
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03] px-7 py-4 text-[14.5px] font-medium text-[#A1A1A6] backdrop-blur-xl transition-colors hover:border-white/25 hover:text-white"
                >
                  Nasıl Çalışır?
                </a>
              </div>

              {/* Minimal Trust Badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[12px] text-white/40 lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#30D158]" /> Sıfır Kırmızı Alarm
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#30D158]" /> Türk Mutfağı Uzmanı
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#30D158]" /> 7 Gün Ücretsiz Deneme
                </span>
              </div>
            </div>

            {/* Sağ Mockup */}
            <div className="reveal reveal-d2">
              <PhoneMockup />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ Features / Core Systems -- */}
        <section id="ozellikler" className="scroll-mt-20 border-t border-white/[0.07] px-6 py-28 md:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="reveal mx-auto mb-20 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#30D158] uppercase">
                ÇEKİRDEK TEKNOLOJİLER
              </p>
              <h2 className="text-[36px] font-light tracking-tight text-[#F5F5F7] md:text-[46px]">
                Kısıtlamak yerine <span className="font-normal text-white">anlayan</span> zeka.
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#A1A1A6]">
                Yılların klinik deneyimini saf yapay zekâ hızında parmaklarınızın ucuna getirir.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {kalohealFeatures.map((feat, idx) => {
                const Icon = FEATURE_ICONS[idx] ?? Camera;
                return (
                  <article
                    key={feat.id}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-9 backdrop-blur-2xl transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.04] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
                  >
                    {/* Corner ambient glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.12),rgba(10,132,255,0.08),transparent_70%)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#30D158] shadow-[0_0_20px_-5px_rgba(48,209,88,0.2)]">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1 text-[10.5px] font-medium tracking-wider text-white/45 uppercase">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 text-[22px] font-normal tracking-tight text-white group-hover:text-[#F5F5F7]">
                      {feat.title}
                    </h3>

                    <p className="mt-3 text-[14.5px] leading-relaxed text-[#A1A1A6]">
                      {feat.body}
                    </p>

                    <div className="mt-6 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-[12.5px] font-medium text-[#30D158]">
                      <span>{feat.highlight}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* -------------------------------------------- Social Proof / Quiet Trust -- */}
        <section className="relative border-y border-white/[0.07] bg-white/[0.01] px-6 py-24 md:py-32 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.08),transparent_65%)] blur-3xl"
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-white/35 uppercase">
              KLİNİK İTİMAT
            </p>
            <blockquote className="mt-6 text-balance text-[32px] font-light leading-tight tracking-tight text-[#F5F5F7] sm:text-[46px] md:text-[54px]">
              “KaloHeal <span className="text-[#30D158]">yargılamaz</span>.<br />Sadece anlar.”
            </blockquote>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#A1A1A6]">
              Sağlıklı beslenme bir irade savaşı değil, nazik bir öz-şefkat sürecidir. KaloHeal bunu her gün hatırlatır.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------- Philosophy -- */}
        <section id="felsefe" className="scroll-mt-20 border-b border-white/[0.07] px-6 py-28 md:py-36">
          <div className="mx-auto max-w-5xl">
            <div className="reveal mx-auto mb-20 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#30D158] uppercase">
                FELSEFİ KARŞILAŞTIRMA
              </p>
              <h2 className="text-[36px] font-light tracking-tight text-[#F5F5F7] md:text-[46px]">
                Sessiz lüks, gürültülü diyet değil.
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#A1A1A6]">
                Aynı tabak, iki taban tabana zıt psikoloji.
              </p>
            </div>

            <div className="reveal overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl">
              {/* Tablo Başlıkları */}
              <div className="grid grid-cols-1 border-b border-white/[0.08] sm:grid-cols-2">
                <div className="border-b border-white/[0.08] px-8 py-5 sm:border-b-0 sm:border-r">
                  <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/30">
                    <X className="h-4 w-4 text-red-400/60" />
                    Standart Diyet Uygulamaları
                  </p>
                </div>
                <div className="px-8 py-5 bg-[#30D158]/[0.02]">
                  <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#30D158]">
                    <Check className="h-4 w-4 text-[#30D158]" />
                    KaloHeal Yaklaşımı
                  </p>
                </div>
              </div>

              {/* Satırlar */}
              <div className="divide-y divide-white/[0.06]">
                {philosophyRows.map((row, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="px-8 py-6 sm:border-r sm:border-white/[0.06]">
                      <p className="text-[14.5px] leading-relaxed text-white/35 line-through decoration-white/15">
                        {row.old}
                      </p>
                    </div>
                    <div className="bg-[#30D158]/[0.015] px-8 py-6">
                      <p className="text-[14.5px] leading-relaxed text-white/90">
                        {row.kaloheal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- Trophies -- */}
        <section id="kupalar" className="scroll-mt-20 overflow-hidden border-b border-white/[0.07] py-28 md:py-36">
          <div className="reveal mx-auto mb-16 max-w-2xl px-6 text-center">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#30D158] uppercase">
              KONSOL TİPİ BAŞARI KOLEKSİYONU
            </p>
            <h2 className="text-[36px] font-light tracking-tight text-[#F5F5F7] md:text-[46px]">
              Senin disiplinin, senin sanat eserin.
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#A1A1A6]">
              Her sağlıklı gün titanyum ve platin kupalara dönüşür.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent"
            />

            <div className="marquee-track flex w-max gap-5 px-6">
              {[...kalohealTrophies, ...kalohealTrophies].map((trophy, index) => {
                const tier = trophyTiers[trophy.tier];
                return (
                  <div
                    key={`${trophy.name}-${index}`}
                    aria-hidden={index >= kalohealTrophies.length}
                    className="flex w-[220px] shrink-0 flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 text-center backdrop-blur-2xl transition-all hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <span
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ring-1 ring-white/10"
                      style={{ background: `linear-gradient(135deg, ${tier.from}, ${tier.to})` }}
                    >
                      <Trophy className="h-6 w-6 text-black/70" />
                    </span>
                    <p className="text-[15px] font-medium text-white">{trophy.name}</p>
                    <p className="mt-1 text-[12px] text-white/45">{trophy.detail}</p>
                    <span
                      className="mt-4 rounded-full border border-white/5 bg-white/[0.02] px-3 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: tier.from }}
                    >
                      {tier.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- Pricing -- */}
        <section id="fiyatlandirma" className="scroll-mt-20 border-b border-white/[0.07] px-6 py-28 md:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="reveal mx-auto mb-20 max-w-2xl text-center">
              <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#30D158] uppercase">
                ŞEFFAF VE ŞIK SEÇENEKLER
              </p>
              <h2 className="text-[36px] font-light tracking-tight text-[#F5F5F7] md:text-[46px]">
                Sağlığınıza layık <span className="font-normal text-white">sessiz lüks</span>.
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#A1A1A6]">
                İlk 7 gün tüm klinik özellikler ücretsizdir. Gizli maliyet yok.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {kalohealPricing.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-[2.5rem] border p-8 md:p-10 backdrop-blur-2xl transition-all duration-300 ${
                    plan.recommended
                      ? 'border-[#30D158]/50 bg-gradient-to-b from-[#30D158]/[0.08] via-white/[0.03] to-white/[0.01] shadow-[0_0_50px_-15px_rgba(48,209,88,0.25)] ring-1 ring-[#30D158]/30'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {plan.recommended && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-[#30D158] bg-[#30D158] px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-black shadow-[0_0_15px_#30D158]">
                      En Çok Tercih Edilen
                    </span>
                  )}

                  <div>
                    <h3 className="text-[22px] font-medium text-white">{plan.name}</h3>
                    <p className="mt-1 text-[13px] text-white/50">{plan.tagline}</p>

                    <div className="mt-6 flex items-baseline gap-1.5 border-b border-white/[0.08] pb-6">
                      <span className="text-[40px] font-light tracking-tight text-white">{plan.price}</span>
                      <span className="text-[13px] text-white/45">{plan.period}</span>
                    </div>

                    <ul className="mt-6 space-y-3.5 text-[14px] text-white/80">
                      {plan.features.map((feat, fidx) => (
                        <li key={fidx} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#30D158]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#erken-erisim"
                    className={`mt-10 inline-flex items-center justify-center rounded-full py-4 text-[14px] font-medium transition-all ${
                      plan.recommended
                        ? 'bg-[#30D158] text-black hover:bg-[#34e260] shadow-[0_0_25px_-5px_#30D158]'
                        : 'border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>

            {/* Viral Loop Badge */}
            <div className="mt-12 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-[12.5px] text-[#A1A1A6]">
                <Share2 className="h-3.5 w-3.5 text-[#30D158]" />
                Arkadaşını davet et, ikiniz de <span className="font-semibold text-white">+5 AI Tarama Hakkı</span> kazanın.
              </span>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- FAQ -- */}
        <section id="sss" className="scroll-mt-20 border-b border-white/[0.07] px-6 py-28 md:py-36">
          <div className="mx-auto max-w-3xl">
            <div className="reveal mb-14 text-center">
              <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-[#30D158] uppercase">
                KLİNİK MERAK EDİLENLER
              </p>
              <h2 className="text-[34px] font-light tracking-tight text-[#F5F5F7] md:text-[44px]">
                Sıkça Sorulan Sorular
              </h2>
            </div>

            <div className="space-y-4">
              {kalohealFaqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="reveal group rounded-[1.8rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl transition-all open:border-white/20 open:bg-white/[0.04]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-6 text-[15.5px] font-medium text-white focus:outline-none">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="px-7 pb-6 text-[14.5px] leading-relaxed text-[#A1A1A6]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ Early Access CTA -- */}
        <section id="erken-erisim" className="scroll-mt-20 px-6 py-28 md:py-36">
          <div className="reveal relative mx-auto max-w-4xl overflow-hidden rounded-[3rem] border border-white/[0.12] bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent p-10 text-center backdrop-blur-3xl md:p-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-80 w-[600px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.22)_0%,rgba(10,132,255,0.15)_40%,transparent_70%)] blur-3xl"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#30D158]/30 bg-[#30D158]/10 px-4 py-1.5 text-[11px] font-medium tracking-wider text-[#30D158] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                ERKEN ERİŞİM DAVETİ
              </span>

              <h2 className="mt-6 text-balance text-[34px] font-light leading-tight tracking-tight text-white md:text-[48px]">
                Sağlıklı yaşamın <span className="font-normal text-white">en sakin haliyle</span> tanışın.
              </h2>
              <p className="mt-4 text-[16px] text-[#A1A1A6]">
                İlk 7 gün tüm klinik özellikler sınırsız ve ücretsizdir.
              </p>

              {state === 'done' ? (
                <div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-[#30D158]/40 bg-[#30D158]/15 px-8 py-4 text-[15px] font-medium text-white shadow-[0_0_30px_-5px_#30D158]">
                  <Check className="h-5 w-5 text-[#30D158]" />
                  Talebiniz alındı. Erken erişim davetiniz e-posta adresinize gönderilecektir.
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresinizi girin"
                    className="flex-1 rounded-full border border-white/10 bg-white/[0.05] px-6 py-4 text-[14.5px] text-white placeholder:text-white/35 backdrop-blur-xl focus:border-[#30D158]/60 focus:outline-none focus:ring-1 focus:ring-[#30D158]/50"
                  />
                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#30D158] px-8 py-4 text-[14.5px] font-semibold text-black transition-all hover:bg-[#34e260] hover:shadow-[0_0_25px_-5px_#30D158] disabled:opacity-50"
                  >
                    {state === 'sending' ? 'Gönderiliyor…' : 'Başla'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {state === 'error' && (
                <p className="mt-4 text-[13px] text-red-300">
                  Bağlantı sırasında bir sorun oluştu. Lütfen tekrar deneyin.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- Footer -- */}
        <footer className="border-t border-white/[0.07] px-6 py-14">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-[13px] text-white/40 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white/80">KaloHeal</span>
              <span>— Sessiz Lüks &amp; Klinik Beslenme</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#ozellikler" className="hover:text-white transition-colors">Sistemler</a>
              <a href="#felsefe" className="hover:text-white transition-colors">Felsefe</a>
              <a href="#fiyatlandirma" className="hover:text-white transition-colors">Planlar</a>
              <a href="#sss" className="hover:text-white transition-colors">SSS</a>
            </div>

            <span>
              Bir{' '}
              <a href={site.url} className="font-medium text-white/70 transition-colors hover:text-[#30D158]">
                KAPTAN Tech Digital
              </a>{' '}
              ürünüdür.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
