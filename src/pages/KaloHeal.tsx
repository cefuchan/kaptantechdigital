import { useState, type FormEvent, type ReactNode } from 'react';
import {
  Apple,
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  ScanLine,
  Shield,
  Sparkles,
  Trophy,
  X
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { absoluteUrl, site } from '../data/site';
import {
  kalohealFaqs,
  kalohealFeatures,
  kalohealStore,
  kalohealTrophies,
  philosophyRows,
  trophyTiers
} from '../data/kaloheal';

/**
 * KaloHeal ürün açılış sayfası.
 *
 * KAPTAN kabuğu olmadan render edilir (bkz. routes.tsx → standalonePaths).
 * Palet Tailwind arbitrary value ile yazıldı; KAPTAN'ın tasarım tokenlarına
 * sızmıyor. Giriş animasyonları CSS tabanlı (.reveal) — Framer Motion'ın
 * inline opacity:0 çıktısı ön render edilmiş HTML'de içeriği gizliyordu.
 */

const PATH = '/kaloheal';
const FEATURE_ICONS = [Camera, Shield, ScanLine];

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
        'Türk mutfağına özel eğitilmiş yapay zekâ destekli beslenme asistanı. Fotoğraftan tabak analizi, kaçamak kalkanı ve akıllı menü önerileri.',
      url: absoluteUrl(PATH),
      publisher: { '@id': `${site.url}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'TRY',
        description: 'İlk 7 gün ücretsiz deneme'
      },
      featureList: kalohealFeatures.map((feature) => feature.title)
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

/** Mağaza butonu — link tanımlı değilse kayıt bölümüne düşer. */
function StoreButton({
  href,
  eyebrow,
  label,
  icon
}: {
  href: string;
  eyebrow: string;
  label: string;
  icon: ReactNode;
}) {
  const live = Boolean(href);
  const target = live ? href : '#erken-erisim';

  return (
    <a
      href={target}
      {...(live ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30D158]"
    >
      <span className="text-white/70 transition-colors group-hover:text-white">{icon}</span>
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
          {live ? eyebrow : 'Çok yakında'}
        </span>
        <span className="block text-[15px] font-medium text-white">{label}</span>
      </span>
    </a>
  );
}

/** Hero'daki buzlu cam telefon arayüzü. */
function PhoneMock() {
  return (
    <div className="float-slow relative mx-auto w-[260px] sm:w-[290px]">
      <div
        aria-hidden="true"
        className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.16),rgba(10,132,255,0.14),transparent_70%)] blur-2xl"
      />
      <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        <div className="rounded-[2rem] border border-white/10 bg-[#0C0E12]/90 p-5">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[11px] font-medium tracking-wide text-white/45">Bugün</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Sparkles className="h-3 w-3 text-[#30D158]" aria-hidden="true" />
            </span>
          </div>

          {/* Analiz kartı */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Tabak analizi</p>
            <p className="mt-1.5 text-[17px] font-medium text-white">Karnıyarık &amp; pilav</p>
            <div className="mt-4 flex items-end gap-4">
              <div>
                <p className="text-[26px] font-light leading-none text-white">612</p>
                <p className="mt-1 text-[10px] tracking-wide text-white/40">kcal</p>
              </div>
              <div className="flex-1 space-y-1.5 pb-0.5">
                {[
                  ['Protein', '32%', 'from-[#30D158] to-[#28B14C]'],
                  ['Karbonhidrat', '48%', 'from-[#0A84FF] to-[#0059C1]'],
                  ['Yağ', '20%', 'from-white/40 to-white/20']
                ].map(([label, width, grad]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-[9px] text-white/40">
                      <span>{label}</span>
                      <span>{width}</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/10">
                      <div className={`h-full rounded-full bg-gradient-to-r ${grad}`} style={{ width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sakin bildirim */}
          <div className="mt-3 rounded-2xl border border-[#30D158]/20 bg-[#30D158]/[0.07] p-3.5">
            <p className="text-[12px] leading-relaxed text-white/75">
              Güzel bir öğün. Akşam için hafif bir çorba dengeyi tamamlar.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-[11px] text-white/40">Seri</span>
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-white">
              12 gün
              <Shield className="h-3.5 w-3.5 text-[#30D158]" aria-hidden="true" />
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

  async function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    try {
      const response = await fetch(kalohealStore.waitlistEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{ tarih: new Date().toLocaleString('tr-TR'), eposta: email, kaynak: 'KaloHeal erken erişim' }]
        })
      }).catch(() => null);
      setState(response?.ok ? 'done' : 'error');
      if (response?.ok) setEmail('');
    } catch {
      setState('error');
    }
  }

  return (
    <>
      <SEO
        title="KaloHeal — Türk Mutfağına Özel Yapay Zekâ Beslenme Asistanı"
        description="Tahmin etmeyi bırak, yaşamaya başla. Fotoğraftan tabak analizi, kaçamak kalkanı ve akıllı menü önerileriyle suçluluk üretmeyen sessiz beslenme asistanı."
        url={PATH}
        schema={schema}
      />

      <div className="kaloheal-scope min-h-screen bg-[#0A0B0E] font-kaloheal text-white/80 antialiased">
        {/* ------------------------------------------------------ header -- */}
        <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0B0E]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <span className="text-[15px] font-medium tracking-tight text-white">KaloHeal</span>
            <nav aria-label="Bölümler" className="hidden items-center gap-7 text-[13px] text-white/50 sm:flex">
              <a href="#ozellikler" className="transition-colors hover:text-white">Özellikler</a>
              <a href="#felsefe" className="transition-colors hover:text-white">Felsefe</a>
              <a href="#kupalar" className="transition-colors hover:text-white">Kupalar</a>
            </nav>
            <a
              href="#erken-erisim"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-xl transition-colors hover:bg-white/10"
            >
              Başla
            </a>
          </div>
        </header>

        {/* -------------------------------------------------------- hero -- */}
        <section className="relative overflow-hidden px-6 pt-24 pb-28 md:pt-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] max-w-[130vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.13)_0%,rgba(10,132,255,0.12)_38%,transparent_68%)] blur-3xl"
          />

          <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="reveal text-center lg:text-left">
              <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] tracking-[0.12em] text-white/55 backdrop-blur-xl">
                <Sparkles className="h-3 w-3 text-[#30D158]" aria-hidden="true" />
                TÜRK MUTFAĞINA ÖZEL EĞİTİLDİ
              </p>

              <h1 className="bg-gradient-to-br from-white via-white to-white/55 bg-clip-text text-[52px] font-light leading-[0.95] tracking-[-0.045em] text-transparent sm:text-[76px] lg:text-[88px]">
                KaloHeal
              </h1>

              <p className="mt-8 text-[24px] font-light leading-snug tracking-tight text-white/90 sm:text-[30px]">
                Tahmin etmeyi bırak,<br className="hidden sm:block" /> yaşamaya başla.
              </p>

              <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/50 lg:mx-0">
                Türk mutfağına özel eğitilmiş ilk sessiz yapay zekâ. Suçluluk yok,
                kalori sayma stresi yok. Sadece mükemmel denge.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <StoreButton
                  href={kalohealStore.appStore}
                  eyebrow="İndir"
                  label="App Store"
                  icon={<Apple className="h-6 w-6" aria-hidden="true" />}
                />
                <StoreButton
                  href={kalohealStore.googlePlay}
                  eyebrow="Al"
                  label="Google Play"
                  icon={
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M3.6 1.8a1 1 0 0 0-.5.9v18.6a1 1 0 0 0 .5.9l10.1-10.2L3.6 1.8Zm11.5 8.6 2.9-2.9-11-6.2 8.1 9.1Zm0 3.2-8.1 9.1 11-6.2-2.9-2.9Zm4.3-4.4-2.4 2.4 2.4 2.4 2.5-1.4a1.2 1.2 0 0 0 0-2l-2.5-1.4Z" />
                    </svg>
                  }
                />
              </div>
            </div>

            <div className="reveal reveal-d2">
              <PhoneMock />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- özellikler -- */}
        <section id="ozellikler" className="scroll-mt-20 border-t border-white/[0.06] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="reveal mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-[34px] font-light leading-tight tracking-tight text-white md:text-[44px]">
                Neden farklıyız?
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/45">
                Kısıtlamak yerine anlamak üzerine kurulu üç yetenek.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {kalohealFeatures.map((feature, index) => {
                const Icon = FEATURE_ICONS[index] ?? Camera;
                return (
                  <article
                    key={feature.id}
                    className={`reveal reveal-d${index + 1} group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-colors hover:border-white/20`}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.12),rgba(10,132,255,0.10),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="relative mb-7 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#30D158]/15 to-[#0A84FF]/15">
                      <Icon className="h-5 w-5 text-white/85" aria-hidden="true" />
                    </span>
                    <h3 className="relative text-[19px] font-medium tracking-tight text-white">
                      {feature.title}
                    </h3>
                    <p className="relative mt-3.5 text-[14.5px] leading-relaxed text-white/50">
                      {feature.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- felsefe -- */}
        <section id="felsefe" className="scroll-mt-20 border-t border-white/[0.06] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="reveal mx-auto mb-16 max-w-2xl text-center">
              <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-white/35">Felsefe</p>
              <h2 className="text-[34px] font-light leading-tight tracking-tight text-white md:text-[44px]">
                Sessiz lüks, gürültülü diyet değil.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/45">
                Aynı durum, iki farklı yaklaşım.
              </p>
            </div>

            <div className="reveal reveal-d1 relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
              {/* Dikey ayırıcı — yalnızca geniş ekranda */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent sm:block"
              />

              <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
                <div className="px-7 py-5 sm:px-9">
                  <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/25">
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                    Standart diyet uygulamaları
                  </p>
                </div>
                <div className="px-7 py-5 sm:px-9">
                  <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#30D158]/80">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    KaloHeal
                  </p>
                </div>

                {philosophyRows.map((row) => (
                  <div key={row.old} className="contents">
                    <div className="border-t border-white/[0.06] px-7 py-6 sm:px-9">
                      <p className="text-[15px] leading-relaxed text-white/25 line-through decoration-white/15">
                        {row.old}
                      </p>
                    </div>
                    <div className="border-t border-white/[0.06] px-7 py-6 sm:px-9">
                      <p className="text-[15px] leading-relaxed text-white/85">{row.kaloheal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- kupalar -- */}
        <section id="kupalar" className="scroll-mt-20 overflow-hidden border-t border-white/[0.06] py-24 md:py-32">
          <div className="reveal mx-auto mb-14 max-w-2xl px-6 text-center">
            <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-white/35">Kupalar</p>
            <h2 className="text-[34px] font-light leading-tight tracking-tight text-white md:text-[44px]">
              Senin başarın, senin sanat eserin.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/45">
              Süreklilik biriktikçe koleksiyonun büyür.
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0A0B0E] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0A0B0E] to-transparent"
            />

            <div className="marquee-track flex w-max gap-4 px-6">
              {[...kalohealTrophies, ...kalohealTrophies].map((trophy, index) => {
                const tier = trophyTiers[trophy.tier];
                return (
                  <div
                    key={`${trophy.name}-${index}`}
                    aria-hidden={index >= kalohealTrophies.length}
                    className="flex w-[210px] shrink-0 flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center backdrop-blur-xl"
                  >
                    <span
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ background: `linear-gradient(140deg, ${tier.from}, ${tier.to})` }}
                    >
                      <Trophy className="h-6 w-6 text-black/55" aria-hidden="true" />
                    </span>
                    <p className="text-[15px] font-medium text-white">{trophy.name}</p>
                    <p className="mt-1 text-[12px] text-white/40">{trophy.detail}</p>
                    <p
                      className="mt-4 text-[10px] uppercase tracking-[0.16em]"
                      style={{ color: tier.from }}
                    >
                      {tier.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ sss -- */}
        <section className="border-t border-white/[0.06] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="reveal mb-10 text-center text-[30px] font-light tracking-tight text-white md:text-[38px]">
              Merak edilenler
            </h2>
            <div className="space-y-3">
              {kalohealFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="reveal group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl open:border-white/20"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-medium text-white marker:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#30D158]">
                    {faq.question}
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-white/40 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-6 pb-6 text-[14.5px] leading-relaxed text-white/50">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ cta -- */}
        <section id="erken-erisim" className="scroll-mt-20 border-t border-white/[0.06] px-6 py-28 md:py-36">
          <div className="reveal relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-16 text-center backdrop-blur-xl md:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-72 w-[560px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.18),rgba(10,132,255,0.14),transparent_70%)] blur-3xl"
            />

            <div className="relative">
              <h2 className="text-[32px] font-light leading-tight tracking-tight text-white md:text-[42px]">
                Sağlıklı yaşamın premium haliyle tanış.
              </h2>
              <p className="mt-5 text-[16px] text-white/50">İlk 7 gün bizden.</p>

              {state === 'done' ? (
                <p className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full border border-[#30D158]/30 bg-[#30D158]/10 px-6 py-3.5 text-[15px] text-white">
                  <Check className="h-4 w-4 text-[#30D158]" aria-hidden="true" />
                  Listedesin. Yayına çıktığımızda ilk sen haberdar olacaksın.
                </p>
              ) : (
                <form onSubmit={joinWaitlist} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
                  <label htmlFor="kh-email" className="sr-only">E-posta adresiniz</label>
                  <input
                    id="kh-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="E-posta adresin"
                    className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-[15px] text-white placeholder:text-white/30 backdrop-blur-xl focus:border-white/25 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#30D158] to-[#0A84FF] px-7 py-3.5 text-[15px] font-medium text-[#05070A] transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {state === 'sending' ? 'Gönderiliyor…' : 'Erken erişim al'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </form>
              )}

              {state === 'error' && (
                <p className="mt-4 text-[13px] text-red-300/80">
                  Kayıt alınamadı. Bağlantını kontrol edip tekrar dener misin?
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <StoreButton href={kalohealStore.appStore} eyebrow="İndir" label="App Store" icon={<Apple className="h-6 w-6" aria-hidden="true" />} />
                <StoreButton
                  href={kalohealStore.googlePlay}
                  eyebrow="Al"
                  label="Google Play"
                  icon={
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M3.6 1.8a1 1 0 0 0-.5.9v18.6a1 1 0 0 0 .5.9l10.1-10.2L3.6 1.8Zm11.5 8.6 2.9-2.9-11-6.2 8.1 9.1Zm0 3.2-8.1 9.1 11-6.2-2.9-2.9Zm4.3-4.4-2.4 2.4 2.4 2.4 2.5-1.4a1.2 1.2 0 0 0 0-2l-2.5-1.4Z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- footer -- */}
        <footer className="border-t border-white/[0.06] px-6 py-12">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-[13px] text-white/35 sm:flex-row">
            <span className="font-medium text-white/70">KaloHeal</span>
            <span>
              Bir{' '}
              <a href={site.url} className="text-white/60 transition-colors hover:text-white">
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
