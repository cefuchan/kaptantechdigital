/**
 * /katil — hizmet veren ağına katılım formu.
 *
 * Gruba iletilecek tek link budur. Form doldurulduğunda üye kaydı oluşur ve
 * kişi kendi paylaşılabilir kartına yönlendirilir.
 *
 * Telefon ve e-posta İSTEĞE BAĞLI: kartta ve ağ listesinde yayınlanmaz,
 * yalnızca gerektiğinde ulaşabilmek için tutulur. Formda bu açıkça yazılı.
 */
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { breadcrumbSchema, graph } from '../data/schema';
import { absoluteUrl, site } from '../data/site';

const KATEGORILER = [
  'Yazılım & Tasarım',
  'Ev Tadilat & Usta',
  'Nakliyat & Taşımacılık',
  'Temizlik',
  'Diğer'
];

const crumbs = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Hizmet Veren Ağı', path: '/hizmet-veren' },
  { name: 'Ağa Katıl', path: '/katil' }
];

const schema = graph(
  {
    '@type': 'WebPage',
    '@id': `${absoluteUrl('/katil')}#webpage`,
    name: 'Hizmet Veren Ağına Katıl',
    url: absoluteUrl('/katil'),
    inLanguage: site.language,
    description:
      'Usta, freelancer ve hizmet verenler için ücretsiz katılım formu. Kaydınız tamamlanınca paylaşabileceğiniz bir kart oluşturulur.',
    isPartOf: { '@id': `${site.url}/#website` }
  },
  breadcrumbSchema(crumbs)
);

export default function Katil() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ad: '',
    firma: '',
    telefon: '',
    eposta: '',
    kategori: KATEGORILER[0],
    hizmetler: '',
    linkedin: '',
    instagram: '',
    behance: '',
    websitesi: ''
  });
  const [kvkkOnay, setKvkkOnay] = useState(false);
  const [yayinOnayi, setYayinOnayi] = useState(false);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  const guncelle = (alan: keyof typeof form) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((c) => ({ ...c, [alan]: e.target.value }));

  async function gonder(event: FormEvent) {
    event.preventDefault();
    setHata(null);
    setGonderiliyor(true);
    try {
      const res = await fetch('/api/uyeler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, kvkkOnay, yayinOnayi })
      });
      const veri = await res.json();
      if (res.ok) navigate(veri.kartUrl);
      else setHata(veri.hata ?? 'Kayıt oluşturulamadı.');
    } catch {
      setHata('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setGonderiliyor(false);
    }
  }

  const kutu =
    'w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-muted/70 focus:outline-none focus:border-gold transition-colors';
  const etiket = 'text-sm font-medium text-muted';
  const ipucu = 'text-xs text-muted/70';

  return (
    <>
      <SEO
        title="Hizmet Veren Ağına Katıl | KAPTAN"
        description="Usta, freelancer ve hizmet verenler için ücretsiz katılım. Formu doldurun, paylaşabileceğiniz kartınız hazır olsun. Komisyon yok, üyelik ücreti yok."
        url="/katil"
        schema={schema}
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-2xl mx-auto px-6">
          <HorizontalLine />
          <Breadcrumbs items={crumbs} />

          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Hizmet verenler için</p>
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">Ağa katılın.</h1>
          <p className="text-muted text-lg leading-relaxed mb-4">
            Formu doldurun, size özel bir kart oluşturalım. Kartı Instagram hikâyenizde ve
            LinkedIn&apos;de paylaşabilirsiniz. Katılım ücretsizdir, komisyon alınmaz.
          </p>
          <p className="text-muted leading-relaxed mb-10">
            Ağın nasıl çalıştığını{' '}
            <Link to="/hizmet-veren" className="text-gold hover:text-white transition-colors">
              buradan
            </Link>{' '}
            okuyabilirsiniz.
          </p>

          <form onSubmit={gonder} className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
            {hata && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {hata}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="k-ad" className={etiket}>
                Ad Soyad <span className="text-gold">*</span>
              </label>
              <input id="k-ad" required value={form.ad} onChange={guncelle('ad')} placeholder="Murat Kaya" className={kutu} />
            </div>

            <div className="space-y-2">
              <label htmlFor="k-firma" className={etiket}>
                Firma adı <span className="text-muted/60">(isteğe bağlı)</span>
              </label>
              <input id="k-firma" value={form.firma} onChange={guncelle('firma')} placeholder="Kaya Yazılım" className={kutu} />
            </div>

            <div className="space-y-2">
              <label htmlFor="k-kategori" className={etiket}>
                Ana alanınız <span className="text-gold">*</span>
              </label>
              <select id="k-kategori" value={form.kategori} onChange={guncelle('kategori')} className={kutu}>
                {KATEGORILER.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="k-hizmetler" className={etiket}>
                Verdiğiniz hizmetler <span className="text-gold">*</span>
              </label>
              <textarea
                id="k-hizmetler"
                required
                rows={3}
                value={form.hizmetler}
                onChange={guncelle('hizmetler')}
                placeholder="React, Next.js, Node.js, mobil uygulama"
                aria-describedby="k-hizmetler-ipucu"
                className={kutu}
              />
              <p id="k-hizmetler-ipucu" className={ipucu}>
                Virgülle ayırın. Kartınızda ve ağ listesinde bunlar görünecek.
              </p>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-6">
              <div>
                <p className="font-medium mb-1">İletişim</p>
                <p className={ipucu}>
                  İkisi de isteğe bağlı ve <strong>kartınızda yayınlanmaz</strong>. Yalnızca size
                  iş çıktığında ulaşabilmemiz için tutulur.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="k-tel" className={etiket}>Telefon</label>
                  <input id="k-tel" type="tel" value={form.telefon} onChange={guncelle('telefon')} placeholder="0551 136 76 34" className={kutu} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="k-eposta" className={etiket}>E-posta</label>
                  <input id="k-eposta" type="email" value={form.eposta} onChange={guncelle('eposta')} placeholder="ornek@firma.com" className={kutu} />
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-4">
              <div>
                <p className="font-medium mb-1">Profilleriniz</p>
                <p className={ipucu}>
                  Kartınızda ve ağ listesinde bağlantı olarak görünür. Kullanıcı adı yazmanız
                  yeterli, tam adres de olur.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="k-linkedin" className={etiket}>LinkedIn</label>
                  <input id="k-linkedin" value={form.linkedin} onChange={guncelle('linkedin')} placeholder="muratkaya" className={kutu} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="k-instagram" className={etiket}>Instagram</label>
                  <input id="k-instagram" value={form.instagram} onChange={guncelle('instagram')} placeholder="@muratkaya" className={kutu} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="k-behance" className={etiket}>Behance</label>
                  <input id="k-behance" value={form.behance} onChange={guncelle('behance')} placeholder="muratkaya" className={kutu} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="k-web" className={etiket}>Web siteniz</label>
                  <input id="k-web" value={form.websitesi} onChange={guncelle('websitesi')} placeholder="muratkaya.com" className={kutu} />
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-4">
              <label htmlFor="k-yayin" className="flex gap-3 cursor-pointer group">
                <input
                  id="k-yayin"
                  type="checkbox"
                  checked={yayinOnayi}
                  onChange={(e) => setYayinOnayi(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-gold cursor-pointer"
                />
                <span className="text-sm text-muted leading-relaxed group-hover:text-text-primary transition-colors">
                  Adım, firmam, hizmetlerim ve profil bağlantılarımın kartımda ve ağ sayfasında
                  yayınlanmasını kabul ediyorum. <span className="text-gold">*</span>
                </span>
              </label>

              <label htmlFor="k-kvkk" className="flex gap-3 cursor-pointer group">
                <input
                  id="k-kvkk"
                  type="checkbox"
                  checked={kvkkOnay}
                  onChange={(e) => setKvkkOnay(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-gold cursor-pointer"
                />
                <span className="text-sm text-muted leading-relaxed group-hover:text-text-primary transition-colors">
                  <Link to="/kvkk" target="_blank" className="text-gold hover:text-white transition-colors">
                    KVKK aydınlatma metnini
                  </Link>{' '}
                  okudum ve kabul ediyorum. <span className="text-gold">*</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={gonderiliyor}
              className="px-8 py-3.5 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors disabled:opacity-60"
            >
              {gonderiliyor ? 'Kaydediliyor…' : 'Kartımı Oluştur'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
