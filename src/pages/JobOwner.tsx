/**
 * /talep/:token — talep sahibinin gelen teklifleri gördüğü özel sayfa.
 *
 * Giriş yok; adresteki 32 karakterlik anahtar kimlik yerine geçer. Bu yüzden
 * sayfa `noindex` ve `no-referrer` olmalı: adres bir Referer başlığıyla dışarı
 * sızarsa panelin tamamı sızmış olur.
 */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Copy, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';
import { VerticalLine } from '../components/Decorations';

interface Teklif {
  id: number;
  ad: string;
  fiyat: string | null;
  baslama: string | null;
  not: string | null;
  tarih: string;
  secildi: boolean;
  telefon: string | null;
}

interface Panel {
  baslik: string;
  kategori: string;
  konum: string | null;
  butce: string | null;
  detaylar: string;
  durum: string;
  ilanUrl: string;
  sonGecerlilik: string;
  teklifler: Teklif[];
}

export default function JobOwner() {
  const { token } = useParams();
  const [panel, setPanel] = useState<Panel | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [kopyalandi, setKopyalandi] = useState(false);

  async function yukle() {
    try {
      const res = await fetch(`/api/owner/${token}`);
      const veri = await res.json();
      if (!res.ok) setHata(veri.hata ?? 'Talep bulunamadı.');
      else setPanel(veri);
    } catch {
      setHata('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setYukleniyor(false);
    }
  }

  useEffect(() => {
    yukle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function teklifSec(bidId: number) {
    await fetch(`/api/owner/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ islem: 'sec', bidId })
    });
    yukle();
  }

  async function talebiKapat() {
    await fetch(`/api/owner/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ islem: 'kapat' })
    });
    yukle();
  }

  function linkiKopyala() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2000);
    });
  }

  return (
    <>
      <SEO
        title="Talebiniz ve gelen teklifler | KAPTAN"
        description="Talebinize gelen teklifleri buradan görebilirsiniz."
        url={`/talep/${token}`}
        noindex
      />
      {/* Adres kimlik yerine geçiyor; Referer ile dışarı sızmamalı. */}
      <meta name="referrer" content="no-referrer" />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-3xl mx-auto px-6">
          {yukleniyor && <p className="text-muted">Yükleniyor…</p>}

          {hata && (
            <div className="bg-surface border border-white/5 rounded-2xl p-8 text-center">
              <h1 className="text-2xl font-display font-semibold mb-3">Talep bulunamadı</h1>
              <p className="text-muted leading-relaxed mb-6">
                Bu adres hatalı olabilir veya talep kapanmış olabilir. Talepler 30 gün sonra
                kapanır ve kişisel veriler silinir.
              </p>
              <Link to="/is-talebi" className="text-gold hover:text-white transition-colors">
                Yeni talep oluştur
              </Link>
            </div>
          )}

          {panel && (
            <>
              <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Talebiniz</p>
              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">{panel.baslik}</h1>
              <p className="text-muted text-sm mb-8">
                {panel.kategori}
                {panel.konum && ` · ${panel.konum}`}
                {panel.butce && ` · ${panel.butce}`}
                {panel.durum !== 'acik' && ' · Kapandı'}
              </p>

              <div className="bg-surface border border-gold/20 rounded-2xl p-6 mb-10">
                <p className="text-sm text-muted leading-relaxed mb-3">
                  <strong className="text-text-primary">Bu sayfayı kaydedin.</strong> Adres
                  size özeldir; teklifleri buradan takip edersiniz. Kaybederseniz bize
                  yazın, yeniden gönderelim.
                </p>
                <button
                  type="button"
                  onClick={linkiKopyala}
                  className="inline-flex items-center gap-2 text-sm text-gold hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  {kopyalandi ? 'Kopyalandı!' : 'Sayfa adresini kopyala'}
                </button>
              </div>

              <h2 className="text-2xl font-display font-semibold mb-6">
                Gelen teklifler ({panel.teklifler.length})
              </h2>

              {panel.teklifler.length === 0 ? (
                <div className="bg-surface border border-white/5 rounded-2xl p-8 text-center">
                  <p className="text-muted leading-relaxed">
                    Henüz teklif gelmedi. Talebiniz hizmet veren ağımızda paylaşıldı; teklifler
                    geldikçe bu sayfada görünecek.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {panel.teklifler.map((teklif) => (
                    <article
                      key={teklif.id}
                      className={`bg-surface rounded-2xl p-7 border ${
                        teklif.secildi ? 'border-gold/40' : 'border-white/5'
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                        <h3 className="text-xl font-display font-semibold">{teklif.ad}</h3>
                        {teklif.fiyat && <span className="text-gold font-medium">{teklif.fiyat}</span>}
                      </div>
                      {teklif.baslama && (
                        <p className="text-muted text-sm mb-3">Başlangıç: {teklif.baslama}</p>
                      )}
                      {teklif.not && (
                        <p className="text-muted leading-relaxed mb-4 whitespace-pre-line">{teklif.not}</p>
                      )}

                      {teklif.secildi && teklif.telefon ? (
                        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/5">
                          <span className="inline-flex items-center gap-2 text-sm text-muted">
                            <Phone className="w-4 h-4 text-gold" aria-hidden="true" />
                            {teklif.telefon.replace(/^90/, '0')}
                          </span>
                          <a
                            href={`https://wa.me/${teklif.telefon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-medium text-bg hover:bg-gold-light transition-colors"
                          >
                            WhatsApp&apos;tan yaz
                          </a>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => teklifSec(teklif.id)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted hover:text-text-primary hover:border-gold transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          Bu teklifle ilerle
                        </button>
                      )}
                    </article>
                  ))}
                </div>
              )}

              <p className="text-muted/70 text-xs leading-relaxed mt-8">
                “Bu teklifle ilerle” dediğinizde hizmet verenin telefon numarası açılır ve
                ona da sizin bilginiz iletilir. Öncesinde iki taraf da birbirinin iletişim
                bilgisini görmez.
              </p>

              {panel.durum === 'acik' && (
                <button
                  type="button"
                  onClick={talebiKapat}
                  className="mt-8 text-sm text-muted hover:text-text-primary transition-colors underline underline-offset-4"
                >
                  Talebi kapat, yeni teklif alma
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
