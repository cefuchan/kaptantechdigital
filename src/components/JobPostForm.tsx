import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  'Yazılım & Tasarım',
  'Ev Tadilat & Usta',
  'Nakliyat & Taşımacılık',
  'Temizlik',
  'Diğer'
] as const;

interface FormValues {
  title: string;
  category: string;
  location: string;
  budget: string;
  details: string;
  name: string;
  phone: string;
  /** İsteğe bağlı — teklif bildirimi ve link kurtarma için. */
  email: string;
  /** KVKK aydınlatma metni okundu onayı — zorunlu. */
  kvkkOnay: boolean;
  /**
   * İsim ve telefonun hizmet verenlerle paylaşılmasına açık rıza.
   *
   * Varsayılan KAPALI. Kapalıyken ağa giden metinde iletişim bilgisi
   * bulunmaz; teklifler talep sahibine iletilir ve ilk teması o kurar.
   * Bu, sayfada ve KVKK metninde verilen sözün kod karşılığıdır —
   * varsayılanı açık yapmak o sözü bozar.
   */
  iletisimPaylasim: boolean;
}

const EMPTY_FORM: FormValues = {
  title: '',
  category: CATEGORIES[0],
  location: '',
  budget: '',
  details: '',
  name: '',
  phone: '',
  email: '',
  kvkkOnay: false,
  iletisimPaylasim: false
};

/* ------------------------------------------------------------- yardımcılar -- */

/**
 * Girilen numarayı wa.me formatına çevirir: "0551 136 76 34" -> "905511367634".
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

/**
 * Metin iş ARAYAN birine mi ait?
 *
 * "İş talebi" Türkçede iki yönlü okunuyor: işveren "yaptıracağım iş", iş
 * arayan "iş başvurusu" diye anlıyor. Sayfa freelancer ağına duyurulduğu için
 * hizmet verenler de formu doldurmaya başladı.
 *
 * Kalıplar dar tutuldu; "web sitesi yaptıracağım, freelancer arıyorum" gibi
 * gerçek işveren cümlelerinde eşleşmemesi için "freelancer" veya "usta" gibi
 * tek kelimeler kasıtlı olarak listede yok — yalnızca birinci tekil şahıs
 * hizmet sunma kalıpları var.
 */
const JOB_SEEKER_PATTERNS = [
  /iş\s*ar[ıi]yorum/i,
  /is\s*ariyorum/i,
  /iş\s*aray[ıi]ş/i,
  /çal[ıi]şmak\s*istiyorum/i,
  /calismak\s*istiyorum/i,
  // "hizmet" ekiyle gelebilir ("boya hizmeti veriyorum"). Birinci tekil şahıs
  // şart: "iş vermek istiyorum" bir İŞVERENDİR, eşleşmemeli — bu yüzden kalıp
  // "hizmet" kelimesine bağlı.
  /hizmet\w*\s+ver(iyorum|ebilirim|mekteyim|mek\s*istiyorum)/i,
  /özgeçmiş|ozgecmis/i,
  /\bcv\b/i,
  /başvur(mak|uyorum)/i,
  /basvur(mak|uyorum)/i,
  /kendimi\s*tan[ıi]tmak/i,
  /part\s*[- ]?time\s*iş/i
];

export function looksLikeJobSeeker(text: string): boolean {
  return JOB_SEEKER_PATTERNS.some((pattern) => pattern.test(text));
}

/* --------------------------------------------- talep sahibinin linkleri -- */

const STORAGE_KEY = 'kaptan.talepler';

export interface SavedRequest {
  baslik: string;
  url: string;
  tarih: string;
}

/**
 * Talep sahibinin özel linki yalnızca gönderim anında bir kez döner.
 * Sekme kapanırsa kaybolmasın diye tarayıcıya da yazılır.
 *
 * Bu yalnızca bir kolaylık: kayıt aynı cihaz ve tarayıcıda kalır, başka yere
 * gitmez. Asıl kurtarma yolu, talep sahibinin bize yazıp linki yeniden
 * istemesidir.
 */
export function readSavedRequests(): SavedRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.slice(0, 10) : [];
  } catch {
    return [];
  }
}

function rememberRequest(baslik: string, url?: string): void {
  if (!url) return;
  try {
    const list = readSavedRequests().filter((item) => item.url !== url);
    list.unshift({ baslik, url, tarih: new Date().toISOString().slice(0, 10) });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 10)));
  } catch {
    // Gizli sekmede veya depolama kapalıysa sessizce geç.
  }
}

/* --------------------------------------------------------------- ana form -- */

export default function JobPostForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ownerUrl, setOwnerUrl] = useState<string | null>(null);
  const [linkKopyalandi, setLinkKopyalandi] = useState(false);

  const update = (field: keyof FormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const raw = event.target.value;
    const next = field === 'phone' ? raw.replace(/\D/g, '') : raw;
    setValues((current) => ({ ...current, [field]: next }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  /** Onay kutuları için ayrı işleyici: değer `value` değil `checked`. */
  const toggle = (field: 'kvkkOnay' | 'iletisimPaylasim') => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    setValues((current) => ({ ...current, [field]: checked }));
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
    if (!values.kvkkOnay) found.kvkkOnay = 'Devam etmek için aydınlatma metnini onaylamanız gerekiyor.';

    setErrors(found);
    return Object.keys(found).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Kayıt önce kendi veritabanımıza yazılır; teklif akışının kaynağı burasıdır.
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baslik: values.title.trim(),
          kategori: values.category,
          konum: values.location.trim(),
          butce: values.budget.trim(),
          detaylar: values.details.trim(),
          musteri: values.name.trim(),
          telefon: values.phone,
          eposta: values.email.trim(),
          paylasimOnayi: values.iletisimPaylasim,
          kvkkOnay: values.kvkkOnay
        })
      });

      const sonuc = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(sonuc.hata ?? 'Bir bağlantı hatası oluştu. Lütfen tekrar deneyin.');
        return;
      }

      setOwnerUrl(sonuc.ownerUrl ?? null);
      rememberRequest(values.title.trim(), sonuc.ownerUrl);

      setIsSubmitted(true);
    } catch {
      setSubmitError('Gönderim sırasında bir hata oluştu. Lütfen bağlantınızı kontrol edin.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setValues(EMPTY_FORM);
    setErrors({});
    setIsSubmitted(false);
    setSubmitError(null);
    setOwnerUrl(null);
  }

  const fieldClass =
    'w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-muted/70 focus:outline-none focus:border-gold transition-colors';
  const labelClass = 'text-sm font-medium text-muted';
  const errorClass = 'text-xs text-red-400';

  if (isSubmitted) {
    return (
      <div className="bg-surface p-8 md:p-12 rounded-2xl border border-gold/30 text-center max-w-2xl mx-auto shadow-2xl animate-fade-in">
        <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-semibold mb-3 text-white">
          Talebiniz Başarıyla Alındı!
        </h3>
        <p className="text-muted text-base leading-relaxed mb-8">
          Talebinizi, kategorisine uyan hizmet veren ağımızla paylaşıyoruz. Telefon
          numaranız ağa gönderilen metinde yer almaz.
        </p>

        {ownerUrl && (
          <div className="bg-bg border border-gold/30 rounded-2xl p-6 mb-8 text-left">
            <p className="text-text-primary font-medium mb-2">Teklifleri buradan takip edin</p>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Bu adres size özeldir — gelen teklifler burada birikir. <strong>Kaydedin;</strong>{' '}
              sayfayı kapatırsanız yeniden üretilemez, bize yazıp istemeniz gerekir.
            </p>

            <code className="block bg-surface border border-white/10 rounded-lg px-4 py-3 text-xs text-gold break-all mb-4">
              {typeof window !== 'undefined' ? window.location.origin : ''}
              {ownerUrl}
            </code>

            <div className="flex flex-wrap gap-3">
              <a
                href={ownerUrl}
                className="px-6 py-3 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors text-sm"
              >
                Teklifleri görüntüle
              </a>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard
                    .writeText(`${window.location.origin}${ownerUrl}`)
                    .then(() => {
                      setLinkKopyalandi(true);
                      setTimeout(() => setLinkKopyalandi(false), 2000);
                    })
                    .catch(() => undefined);
                }}
                className="px-6 py-3 rounded-full border border-white/10 text-muted hover:text-text-primary hover:border-gold transition-colors text-sm"
              >
                {linkKopyalandi ? 'Kopyalandı!' : 'Linki kopyala'}
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-muted hover:text-text-primary transition-colors underline underline-offset-4"
        >
          Yeni talep gönder
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-surface p-6 md:p-10 rounded-2xl border border-white/5 space-y-6"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-2">
            Yaptıracağınız İşi Anlatın
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Yaptırmak istediğiniz işin detaylarını girin, teklif toplamaya hemen başlayalım.
            Bu form <strong>iş verenler</strong> içindir.
          </p>
        </div>

        {submitError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {submitError}
          </div>
        )}

        {/* Yanlış tarafa düşenler için uyarı. Gönderimi ENGELLEMİYOR: kalıplar
            yanlış eşleşebilir ve gerçek bir işvereni durdurmak, birkaç hatalı
            kayıttan daha pahalıya mal olur. */}
        {looksLikeJobSeeker(`${values.title} ${values.details}`) && (
          <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-sm">
            <p className="text-text-primary font-medium mb-1">İş mi arıyorsunuz?</p>
            <p className="text-muted leading-relaxed">
              Bu form, <strong>iş yaptırmak</strong> isteyenler için. Usta, freelancer veya
              hizmet verenseniz buradan değil,{' '}
              <Link to="/hizmet-veren" className="text-gold hover:text-white transition-colors">
                hizmet veren ağına katılarak
              </Link>{' '}
              ilerlemeniz gerekiyor — işler size oradan ulaşıyor.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="jp-title" className={labelClass}>
            Yaptıracağınız iş <span className="text-gold">*</span>
          </label>
          <input
            id="jp-title"
            name="title"
            type="text"
            value={values.title}
            onChange={update('title')}
            placeholder="Örn: 3+1 daire boyanacak — Çankaya"
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
              placeholder="Örn: Ankara / Çankaya veya Remote"
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
            placeholder="Örn: 15.000 TL veya Teklif Usulü"
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
            rows={5}
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
              placeholder="0551 136 76 34"
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
                Sadece rakam. Otomatik olarak 90… formatına çevrilir.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="jp-email" className={labelClass}>
            E-posta <span className="text-muted/60">(isteğe bağlı)</span>
          </label>
          <input
            id="jp-email"
            name="email"
            type="email"
            value={values.email}
            onChange={update('email')}
            placeholder="ornek@firma.com"
            aria-describedby="jp-email-hint"
            className={fieldClass}
          />
          <p id="jp-email-hint" className="text-xs text-muted/70">
            Teklif takip linkinizi kaybederseniz e-postanızla bulabiliriz. Vermezseniz de
            talebiniz sorunsuz işler.
          </p>
        </div>

        {/* ------------------------------------------------ KVKK onayları -- */}
        <div className="space-y-4 pt-2 border-t border-white/5">
          <div className="space-y-2 pt-5">
            <label htmlFor="jp-kvkk" className="flex gap-3 cursor-pointer group">
              <input
                id="jp-kvkk"
                type="checkbox"
                checked={values.kvkkOnay}
                onChange={toggle('kvkkOnay')}
                aria-describedby={errors.kvkkOnay ? 'jp-kvkk-error' : undefined}
                aria-invalid={errors.kvkkOnay ? true : undefined}
                className="mt-0.5 h-4 w-4 shrink-0 accent-gold cursor-pointer"
              />
              <span className="text-sm text-muted leading-relaxed group-hover:text-text-primary transition-colors">
                <Link
                  to="/kvkk"
                  target="_blank"
                  onClick={(event) => event.stopPropagation()}
                  className="text-gold hover:text-white transition-colors"
                >
                  KVKK aydınlatma metnini
                </Link>{' '}
                okudum ve verilerimin talebimi iletmek amacıyla işlenmesini kabul ediyorum.{' '}
                <span className="text-gold">*</span>
              </span>
            </label>
            {errors.kvkkOnay && (
              <p id="jp-kvkk-error" className={`${errorClass} ml-7`}>
                {errors.kvkkOnay}
              </p>
            )}
          </div>

          <label htmlFor="jp-paylasim" className="flex gap-3 cursor-pointer group">
            <input
              id="jp-paylasim"
              type="checkbox"
              checked={values.iletisimPaylasim}
              onChange={toggle('iletisimPaylasim')}
              className="mt-0.5 h-4 w-4 shrink-0 accent-gold cursor-pointer"
            />
            <span className="text-sm text-muted leading-relaxed group-hover:text-text-primary transition-colors">
              İsmim ve telefon numaram hizmet verenlerle paylaşılabilir, doğrudan bana
              ulaşabilirler.
              <span className="block text-xs text-muted/70 mt-1">
                İşaretlemezseniz bilgileriniz kimseyle paylaşılmaz; gelen teklifleri size
                biz iletiriz ve kiminle görüşeceğinize siz karar verirsiniz.
              </span>
            </span>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3.5 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Gönderiliyor…' : 'Talebi Gönder'}
          </button>
        </div>
      </form>
    </section>
  );
}
