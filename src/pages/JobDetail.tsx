/**
 * /is/:publicId — hizmet verenlere gösterilen ilan sayfası.
 *
 * `noindex`: bu sayfalar listelenmez, site haritasına girmez ve aramada
 * çıkmaz. Adres tahmin edilemez olduğu için yalnızca linki alan görür.
 */
import { useEffect, useState, type FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BadgeCheck, CheckCircle2, Clock, MapPin, Tag, Wallet } from 'lucide-react';
import { SEO } from '../components/SEO';
import { VerticalLine } from '../components/Decorations';

interface Ilan {
  baslik: string;
  kategori: string;
  konum: string | null;
  butce: string | null;
  detaylar: string;
  dogrulandi: boolean;
  durum: string;
  teklifSayisi: number;
  iletisim: { ad: string; telefon: string } | null;
}

export default function JobDetail() {
  const { publicId } = useParams();
  const [ilan, setIlan] = useState<Ilan | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);

  const [telefon, setTelefon] = useState('');
  const [fiyat, setFiyat] = useState('');
  const [baslama, setBaslama] = useState('');
  const [notMetni, setNotMetni] = useState('');
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [gonderildi, setGonderildi] = useState(false);
  const [teklifHatasi, setTeklifHatasi] = useState<string | null>(null);

  useEffect(() => {
    let iptal = false;
    fetch(`/api/job/${publicId}`)
      .then(async (res) => {
        const veri = await res.json();
        if (iptal) return;
        if (!res.ok) setHata(veri.hata ?? 'İlan bulunamadı.');
        else setIlan(veri);
      })
      .catch(() => !iptal && setHata('Bağlantı hatası. Lütfen tekrar deneyin.'))
      .finally(() => !iptal && setYukleniyor(false));
    return () => {
      iptal = true;
    };
  }, [publicId]);

  async function teklifVer(event: FormEvent) {
    event.preventDefault();
    setTeklifHatasi(null);
    setGonderiliyor(true);
    try {
      const res = await fetch('/api/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, telefon, fiyat, baslama, not: notMetni })
      });
      const veri = await res.json();
      if (res.ok) setGonderildi(true);
      else setTeklifHatasi(veri.hata ?? 'Teklif gönderilemedi.');
    } catch {
      setTeklifHatasi('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setGonderiliyor(false);
    }
  }

  const kutu = 'w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-muted/70 focus:outline-none focus:border-gold transition-colors';

  return (
    <>
      <SEO
        title={ilan ? `${ilan.baslik} | KAPTAN` : 'İlan | KAPTAN'}
        description="Hizmet veren ağına iletilen iş ilanı."
        url={`/is/${publicId}`}
        noindex
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-2xl mx-auto px-6">
          {yukleniyor && <p className="text-muted">Yükleniyor…</p>}

          {hata && (
            <div className="bg-surface border border-white/5 rounded-2xl p-8 text-center">
              <h1 className="text-2xl font-display font-semibold mb-3">İlan bulunamadı</h1>
              <p className="text-muted leading-relaxed mb-6">
                Bu ilan kapanmış veya adres hatalı olabilir. İlanlar yayınlandıktan 30 gün
                sonra kapanır.
              </p>
              <Link to="/hizmet-veren" className="text-gold hover:text-white transition-colors">
                Hizmet veren ağı hakkında
              </Link>
            </div>
          )}

          {ilan && (
            <>
              {ilan.dogrulandi && (
                <p className="inline-flex items-center gap-2 text-sm text-gold border border-gold/30 rounded-full px-4 py-1.5 mb-6">
                  <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                  Talep doğrulandı
                </p>
              )}

              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-6">{ilan.baslik}</h1>

              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted mb-8">
                <span className="inline-flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gold" aria-hidden="true" />
                  {ilan.kategori}
                </span>
                {ilan.konum && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" aria-hidden="true" />
                    {ilan.konum}
                  </span>
                )}
                {ilan.butce && (
                  <span className="inline-flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-gold" aria-hidden="true" />
                    {ilan.butce}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" aria-hidden="true" />
                  {ilan.teklifSayisi} teklif verildi
                </span>
              </div>

              <div className="bg-surface border border-white/5 rounded-2xl p-7 mb-10">
                <h2 className="text-sm font-mono text-gold uppercase tracking-wider mb-4">Detaylar</h2>
                <p className="text-muted leading-relaxed whitespace-pre-line">{ilan.detaylar}</p>
              </div>

              {ilan.iletisim && (
                <div className="bg-surface border border-gold/20 rounded-2xl p-6 mb-10">
                  <p className="text-sm text-muted mb-2">
                    Talep sahibi iletişim bilgisinin paylaşılmasına onay verdi:
                  </p>
                  <p className="font-medium">{ilan.iletisim.ad}</p>
                  <a
                    href={`https://wa.me/${ilan.iletisim.telefon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-white transition-colors text-sm"
                  >
                    WhatsApp&apos;tan yaz
                  </a>
                </div>
              )}

              {ilan.durum !== 'acik' ? (
                <div className="bg-surface border border-white/5 rounded-2xl p-7 text-center">
                  <p className="text-muted">Bu ilan kapandı, artık teklif alınmıyor.</p>
                </div>
              ) : gonderildi ? (
                <div className="bg-surface border border-gold/30 rounded-2xl p-8 text-center">
                  <CheckCircle2 className="w-10 h-10 text-gold mx-auto mb-4" aria-hidden="true" />
                  <h2 className="text-xl font-display font-semibold mb-2">Teklifiniz iletildi</h2>
                  <p className="text-muted leading-relaxed text-sm">
                    Teklifiniz yalnızca talep sahibiyle paylaşıldı. İlgilenirse doğrudan size
                    ulaşacak. Aynı numarayla tekrar gönderirseniz teklifiniz güncellenir.
                  </p>
                </div>
              ) : (
                <form onSubmit={teklifVer} className="bg-surface border border-white/5 rounded-2xl p-7 space-y-5">
                  <div>
                    <h2 className="text-2xl font-display font-semibold mb-2">Teklif verin</h2>
                    <p className="text-muted text-sm leading-relaxed">
                      Teklifiniz yalnızca talep sahibine gösterilir; diğer hizmet verenler
                      görmez. Teklif vermek ücretsizdir, komisyon alınmaz.
                    </p>
                  </div>

                  {teklifHatasi && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                      {teklifHatasi}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="bid-tel" className="text-sm font-medium text-muted">
                      Telefonunuz <span className="text-gold">*</span>
                    </label>
                    <input
                      id="bid-tel"
                      type="tel"
                      required
                      value={telefon}
                      onChange={(e) => setTelefon(e.target.value)}
                      placeholder="0551 136 76 34"
                      className={kutu}
                    />
                    <p className="text-xs text-muted/70">
                      Ağa kayıtlı numaranız. Kayıtlı değilse önce{' '}
                      <Link to="/hizmet-veren" className="text-gold hover:text-white transition-colors">
                        ağa katılmanız
                      </Link>{' '}
                      gerekiyor.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="bid-fiyat" className="text-sm font-medium text-muted">Fiyatınız</label>
                      <input
                        id="bid-fiyat"
                        value={fiyat}
                        onChange={(e) => setFiyat(e.target.value)}
                        placeholder="Örn: 18.500 TL"
                        className={kutu}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="bid-baslama" className="text-sm font-medium text-muted">Ne zaman başlarsınız?</label>
                      <input
                        id="bid-baslama"
                        value={baslama}
                        onChange={(e) => setBaslama(e.target.value)}
                        placeholder="Örn: Pazartesi"
                        className={kutu}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="bid-not" className="text-sm font-medium text-muted">Notunuz</label>
                    <textarea
                      id="bid-not"
                      rows={4}
                      value={notMetni}
                      onChange={(e) => setNotMetni(e.target.value)}
                      placeholder="Fiyata neler dahil, kaç günde biter, referanslarınız…"
                      className={kutu}
                    />
                  </div>

                  <p className="text-xs text-muted/70 leading-relaxed">
                    Teklif göndererek, teklifinizin ve iletişim bilginizin yalnızca bu talebi
                    oluşturan kişiyle paylaşılmasını kabul edersiniz.{' '}
                    <Link to="/kvkk" className="text-gold hover:text-white transition-colors">
                      KVKK aydınlatma metni
                    </Link>
                  </p>

                  <button
                    type="submit"
                    disabled={gonderiliyor}
                    className="px-8 py-3.5 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors disabled:opacity-60"
                  >
                    {gonderiliyor ? 'Gönderiliyor…' : 'Teklifi Gönder'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
