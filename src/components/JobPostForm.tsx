import { useState, type ChangeEvent, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * SheetDB API adresi (Google Sheets Entegrasyonu).
 */
const DEFAULT_ENDPOINT = 'https://sheetdb.io/api/v1/4fptt41pnlx4a';

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

/**
 * Hizmet veren ağına (WhatsApp grubuna) yapıştırılacak ilan metni.
 *
 * ÖNEMLİ: Bu metin talep sahibinin adını ve telefonunu İÇERMEZ. Sayfada
 * "numaranız ağa giden metinde yer almaz" sözü veriliyor; iletişim bilgisi
 * yalnızca tabloda ayrı sütunlarda tutulur ve anlaşma aşamasında paylaşılır.
 * Buraya isim/telefon eklemek o sözü bozar.
 */
export function buildWhatsAppMessage(values: FormValues): string {
  const fallback = (value: string) => value.trim() || 'Belirtilmedi';

  return [
    '📢 *YENİ İŞ TALEBİ*',
    DIVIDER,
    `📌 *İş:* ${values.title.trim()}`,
    `🏷️ *Kategori:* ${values.category}`,
    `📍 *Konum:* ${fallback(values.location)}`,
    `💰 *Bütçe:* ${fallback(values.budget)}`,
    '',
    '📝 *Detaylar:*',
    values.details.trim(),
    DIVIDER,
    '_Teklif vermek için bu mesajı yanıtlayın: fiyatınız ve ne zaman başlayabileceğiniz._',
    '_Talep sahibinin iletişim bilgisi, anlaşma sağlandığında paylaşılır._',
    '_Katılım ve teklif vermek ücretsizdir, komisyon alınmaz._'
  ].join('\n');
}

/* --------------------------------------------------------------- ana form -- */

export interface JobPostFormProps {
  endpoint?: string;
}

export default function JobPostForm({ endpoint = DEFAULT_ENDPOINT }: JobPostFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = (field: keyof FormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const raw = event.target.value;
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

    setIsSubmitting(true);
    setSubmitError(null);

    const formattedMessage = buildWhatsAppMessage(values);

    /**
     * DİKKAT — bu anahtarlar Google Sheet'teki başlık satırıyla BİREBİR
     * aynı olmak zorundadır. SheetDB gelen anahtarı sütun adıyla harfi
     * harfine eşler; eşleşmeyen anahtar sessizce atılır, sütun boş kalır
     * ve kullanıcı yine "talebiniz alındı" görür. Yani uyumsuzluk hiçbir
     * hata üretmez, sadece yarım kayıt bırakır.
     *
     * Bu yüzden başlıklar ASCII tutuluyor: Türkçe karakter (İ/ı/ş/ü),
     * büyük-küçük harf farkı ve görünmeyen sondaki boşluk, geçmişte altı
     * sütunun boş düşmesine yol açtı.
     *
     * Tablodaki başlık satırı tam olarak şu olmalı:
     *   Tarih | Baslik | Kategori | Musteri | Telefon | WhatsApp | Butce |
     *   Konum | Detaylar | Ilan_Metni
     */
    const payload = JSON.stringify({
      data: [
        {
          Tarih: new Date().toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          Baslik: values.title.trim(),
          Kategori: values.category,
          Musteri: values.name.trim(),
          Telefon: formatPhoneForDisplay(values.phone),
          WhatsApp: `https://wa.me/${normalizePhone(values.phone)}`,
          Butce: values.budget.trim() || 'Belirtilmedi',
          Konum: values.location.trim() || 'Belirtilmedi',
          Detaylar: values.details.trim(),
          Ilan_Metni: formattedMessage
        }
      ]
    });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: payload
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setSubmitError('Bir bağlantı hatası oluştu. Lütfen tekrar deneyin.');
      }
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
          Talebinizi, kategorisine uyan hizmet veren ağımızla paylaşıyoruz. Gelen teklifleri derleyip WhatsApp veya telefon numaranız üzerinden size iletiyoruz. Telefon numaranız ağa gönderilen metinde yer almaz.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="px-8 py-3.5 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors text-sm"
        >
          Yeni Talep Gönder
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
            İş / Hizmet Talebi Oluştur
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            İhtiyacınız olan hizmetin detaylarını girin, teklif toplamaya hemen başlayalım.
          </p>
        </div>

        {submitError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {submitError}
          </div>
        )}

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
            placeholder="Örn: 3+1 Ev Boyama veya Web Sitesi Geliştirme"
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
