import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';

/**
 * Hizmet / iş talep formu.
 *
 * Form doldurulup "Oluştur"a basıldığında WhatsApp'a doğrudan yapıştırılabilen
 * formatlı bir metin üretir. Talep aynı anda iki yere kaydedilir:
 *   1. Formspree  -> ücretsiz form servisi, kayıt e-postanıza düşer
 *   2. localStorage -> aynı tarayıcıda "Kayıtlı Talepler" listesinden tekrar kopyalanır
 *
 * Sitede bir rotaya bağlı değildir; istediğiniz sayfaya import edip
 * <JobPostForm /> şeklinde kullanabilirsiniz.
 */

/**
 * Google Apps Script Web App adresi (Google Sheets Entegrasyonu).
 */
const DEFAULT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxwJGT9m_Pev_YIV5Trmo9wesK6cvGxfn9pFA56QjacTrQ_Y60iKpXD1VOv736Az_ze/exec';

const STORAGE_KEY = 'kaptan:is-talepleri';
const MAX_SAVED = 30;

const CATEGORIES = [
  'Yazılım & Tasarım',
  'Ev Tadilat & Usta',
  'Nakliyat & Taşımacılık',
  'Temizlik',
  'Diğer'
] as const;

const DIVIDER = '━━━━━━━━━━━━━━━━━━━';

interface FormValues {
  title: string;
  category: string;
  location: string;
  budget: string;
  details: string;
  name: string;
  phone: string;
}

interface SavedPost {
  id: string;
  createdAt: string;
  title: string;
  message: string;
}

const EMPTY_FORM: FormValues = {
  title: '',
  category: CATEGORIES[0],
  location: '',
  budget: '',
  details: '',
  name: '',
  phone: ''
};

/* ------------------------------------------------------------- yardımcılar -- */

/**
 * Girilen numarayı wa.me formatına çevirir: "0551 136 76 34" -> "905511367634".
 * Boşluk, parantez, tire ve + işaretleri temizlenir; baştaki 0 veya 90 tekrarı
 * kırpılır ve ülke kodu tek sefer eklenir.
 */
export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('90')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = digits.slice(1);
  return digits ? `90${digits}` : '';
}

/** Türk cep numarası 90 + 10 hane olmalı ve yerel kısım 5 ile başlamalı. */
function isValidPhone(raw: string): boolean {
  const normalized = normalizePhone(raw);
  return normalized.length === 12 && normalized.startsWith('905');
}

/** Ekranda okunaklı gösterim: 0551 136 76 34 */
function formatPhoneForDisplay(raw: string): string {
  const digits = normalizePhone(raw).slice(2);
  if (digits.length !== 10) return raw;
  return `0${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
}

/** WhatsApp markdown kurallarına uygun paylaşım metni. */
export function buildWhatsAppMessage(values: FormValues): string {
  const fallback = (value: string) => value.trim() || 'Belirtilmedi';

  return [
    '📢 *YENİ İŞ TALEBİ / İLANI*',
    DIVIDER,
    `📌 *İş Tanımı:* ${values.title.trim()}`,
    `🏷️ *Kategori:* ${values.category}`,
    `📍 *Konum:* ${fallback(values.location)}`,
    `💰 *Bütçe:* ${fallback(values.budget)}`,
    '',
    '📝 *Detaylar:*',
    values.details.trim(),
    '',
    `👤 *İletişim:* ${values.name.trim()}`,
    `📞 *WhatsApp:* https://wa.me/${normalizePhone(values.phone)}`,
    DIVIDER,
    '_Teklif komisyonu yok. Doğrudan iletişime geçebilirsiniz._'
  ].join('\n');
}

/**
 * Panoya kopyalar. navigator.clipboard yalnızca güvenli bağlamda (https veya
 * localhost) çalıştığı için başarısız olursa eski yönteme düşer.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Aşağıdaki yedek yönteme düşülür.
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

function readSavedPosts(): SavedPost[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedPost[]) : [];
  } catch {
    return [];
  }
}

function writeSavedPosts(posts: SavedPost[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts.slice(0, MAX_SAVED)));
  } catch {
    // Depolama dolu veya kapalıysa sessizce geçiyoruz; çıktı yine ekranda duruyor.
  }
}

/* ---------------------------------------------------------- kopyala butonu -- */

function CopyButton({
  text,
  label = 'Tek Tıkla Kopyala',
  className = ''
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(text);
    setState(ok ? 'copied' : 'error');
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
        state === 'copied'
          ? 'bg-green-500 text-black'
          : state === 'error'
            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
            : 'bg-gold text-bg hover:bg-gold-light'
      } ${className}`}
    >
      {state === 'copied' ? '✓ Kopyalandı!' : state === 'error' ? 'Kopyalanamadı' : label}
    </button>
  );
}

/* --------------------------------------------------------------- ana form -- */

export interface JobPostFormProps {
  /** Taleplerin gönderileceği webhook / Google Apps Script adresi. */
  endpoint?: string;
  /** Servis gönderimini tamamen kapatmak için false verin. */
  submitToService?: boolean;
}

export default function JobPostForm({
  endpoint = DEFAULT_ENDPOINT,
  submitToService = true
}: JobPostFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [saved, setSaved] = useState<SavedPost[]>([]);
  const outputRef = useRef<HTMLDivElement | null>(null);

  // localStorage yalnızca tarayıcıda var; ilk render'dan sonra okuyoruz.
  useEffect(() => {
    setSaved(readSavedPosts());
  }, []);

  const update = (field: keyof FormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const raw = event.target.value;
    // Telefon alanı yalnızca rakam kabul eder.
    const next = field === 'phone' ? raw.replace(/\D/g, '') : raw;
    setValues((current) => ({ ...current, [field]: next }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  function validate(): boolean {
    const found: Partial<Record<keyof FormValues, string>> = {};

    if (!values.title.trim()) found.title = 'İş başlığı zorunludur.';
    if (!values.details.trim()) found.details = 'İşin detaylarını yazın.';
    else if (values.details.trim().length < 20) found.details = 'Biraz daha ayrıntı ekleyin (en az 20 karakter).';
    if (!values.name.trim()) found.name = 'İsim veya şirket adı zorunludur.';
    if (!values.phone.trim()) found.phone = 'Telefon numarası zorunludur.';
    else if (!isValidPhone(values.phone)) found.phone = 'Geçerli bir cep numarası girin (örn. 0551 136 76 34).';

    setErrors(found);
    return Object.keys(found).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const text = buildWhatsAppMessage(values);
    setMessage(text);

    const post: SavedPost = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      title: values.title.trim(),
      message: text
    };
    const next = [post, ...saved].slice(0, MAX_SAVED);
    setSaved(next);
    writeSavedPosts(next);

    // Çıktıyı görünür kıl; kayıt ve kopyalama buna bağlı değil.
    requestAnimationFrame(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (!submitToService) return;

    setSendState('sending');
    const payload = JSON.stringify({
      _subject: `Yeni iş talebi: ${values.title.trim()}`,
      baslik: values.title.trim(),
      kategori: values.category,
      konum: values.location.trim(),
      butce: values.budget.trim(),
      detaylar: values.details.trim(),
      isim: values.name.trim(),
      telefon: formatPhoneForDisplay(values.phone),
      whatsapp: `https://wa.me/${normalizePhone(values.phone)}`,
      whatsapp_mesaji: text
    });

    try {
      // Google Apps Script CORS preflight sorununu önlemek için text/plain ile gönderilir
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload
      });
      setSendState('sent');
    } catch {
      setSendState('failed');
    }
  }

  function resetForm() {
    setValues(EMPTY_FORM);
    setErrors({});
    setMessage(null);
    setSendState('idle');
  }

  function removeSaved(id: string) {
    const next = saved.filter((item) => item.id !== id);
    setSaved(next);
    writeSavedPosts(next);
  }

  const fieldClass =
    'w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-muted/70 focus:outline-none focus:border-gold transition-colors';
  const labelClass = 'text-sm font-medium text-muted';
  const errorClass = 'text-xs text-red-400';

  return (
    <section className="max-w-3xl mx-auto">
      {/* ---------------------------------------------------------- form -- */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-surface p-6 md:p-10 rounded-2xl border border-white/5 space-y-6"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-2">
            İş / Hizmet Talebi Oluştur
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Formu doldurun, WhatsApp'ta paylaşmaya hazır ilan metnini aşağıda oluşturalım.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="jp-title" className={labelClass}>
            Hizmet / İş Başlığı <span className="text-gold">*</span>
          </label>
          <input
            id="jp-title"
            name="title"
            type="text"
            value={values.title}
            onChange={update('title')}
            placeholder="3+1 Ev Boyama veya React Frontend Geliştirme"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'jp-title-error' : undefined}
            className={fieldClass}
          />
          {errors.title && (
            <p id="jp-title-error" className={errorClass}>
              {errors.title}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="jp-category" className={labelClass}>
              Kategori
            </label>
            <select
              id="jp-category"
              name="category"
              value={values.category}
              onChange={update('category')}
              className={fieldClass}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category} className="bg-bg">
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="jp-location" className={labelClass}>
              Konum / Şehir
            </label>
            <input
              id="jp-location"
              name="location"
              type="text"
              value={values.location}
              onChange={update('location')}
              placeholder="Ankara / Çankaya veya Remote"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="jp-budget" className={labelClass}>
            Bütçe / Ücret Aralığı
          </label>
          <input
            id="jp-budget"
            name="budget"
            type="text"
            value={values.budget}
            onChange={update('budget')}
            placeholder="5.000 TL veya Teklif Usulü"
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="jp-details" className={labelClass}>
            İşin Detayları <span className="text-gold">*</span>
          </label>
          <textarea
            id="jp-details"
            name="details"
            rows={6}
            value={values.details}
            onChange={update('details')}
            placeholder="Kapsam, süre, beklentiler ve varsa özel koşullar…"
            aria-invalid={Boolean(errors.details)}
            aria-describedby={errors.details ? 'jp-details-error' : undefined}
            className={`${fieldClass} resize-y`}
          />
          {errors.details && (
            <p id="jp-details-error" className={errorClass}>
              {errors.details}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="jp-name" className={labelClass}>
              İsim / Şirket Adı <span className="text-gold">*</span>
            </label>
            <input
              id="jp-name"
              name="name"
              type="text"
              value={values.name}
              onChange={update('name')}
              placeholder="Adınız veya firma adınız"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'jp-name-error' : undefined}
              className={fieldClass}
            />
            {errors.name && (
              <p id="jp-name-error" className={errorClass}>
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="jp-phone" className={labelClass}>
              Telefon Numarası <span className="text-gold">*</span>
            </label>
            <input
              id="jp-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={13}
              value={values.phone}
              onChange={update('phone')}
              placeholder="05511367634"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'jp-phone-error' : 'jp-phone-hint'}
              className={fieldClass}
            />
            {errors.phone ? (
              <p id="jp-phone-error" className={errorClass}>
                {errors.phone}
              </p>
            ) : (
              <p id="jp-phone-hint" className="text-xs text-muted/70">
                Sadece rakam. Otomatik olarak {values.phone ? normalizePhone(values.phone) : '90…'} formatına çevrilir.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={sendState === 'sending'}
            className="px-8 py-3.5 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {sendState === 'sending' ? 'Oluşturuluyor…' : 'Oluştur'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3.5 rounded-full border border-white/20 text-muted hover:text-text-primary hover:border-gold transition-colors text-sm"
          >
            Formu Temizle
          </button>
        </div>
      </form>

      {/* -------------------------------------------------------- çıktı -- */}
      {message && (
        <div ref={outputRef} className="mt-8 bg-surface rounded-2xl border border-gold/20 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 md:px-8 py-5 border-b border-white/5">
            <div>
              <h3 className="text-lg font-display font-semibold">WhatsApp Metni Hazır</h3>
              <p className="text-xs text-muted mt-1">
                {sendState === 'sending' && 'Kayıt gönderiliyor…'}
                {sendState === 'sent' && '✓ Kaydedildi ve e-postanıza gönderildi.'}
                {sendState === 'failed' &&
                  'Servise gönderilemedi (bağlantı sorunu olabilir) — talep tarayıcıya kaydedildi.'}
                {sendState === 'idle' && 'Talep tarayıcınıza kaydedildi.'}
              </p>
            </div>
            <CopyButton text={message} />
          </div>

          <pre className="px-6 md:px-8 py-6 text-sm text-text-primary whitespace-pre-wrap break-words font-body leading-relaxed overflow-x-auto">
            {message}
          </pre>

          <div className="px-6 md:px-8 pb-6">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
            >
              WhatsApp'ta Aç
            </a>
          </div>
        </div>
      )}

      {/* ------------------------------------------------ kayıtlı talepler -- */}
      {saved.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-semibold">
              Kayıtlı Talepler <span className="text-muted text-base">({saved.length})</span>
            </h3>
          </div>

          <ul className="space-y-3">
            {saved.map((item) => (
              <li
                key={item.id}
                className="bg-surface border border-white/5 rounded-xl px-5 py-4 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <time dateTime={item.createdAt} className="text-xs text-muted">
                    {new Date(item.createdAt).toLocaleString('tr-TR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <CopyButton text={item.message} label="Kopyala" className="px-4 py-2 text-xs" />
                  <button
                    type="button"
                    onClick={() => removeSaved(item.id)}
                    aria-label={`${item.title} talebini sil`}
                    className="px-4 py-2 rounded-full border border-white/10 text-muted hover:text-red-400 hover:border-red-400/40 transition-colors text-xs"
                  >
                    Sil
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-xs text-muted/70 mt-4">
            Kayıtlar yalnızca bu tarayıcıda saklanır. Son {MAX_SAVED} talep tutulur.
          </p>
        </div>
      )}
    </section>
  );
}
