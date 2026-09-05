/**
 * /kart/:slug — paylaşılabilir hizmet veren kartı.
 *
 * Kart canvas üzerine çizilir ve PNG olarak indirilir. Sunucuda görsel
 * üretmiyoruz: tek bir kart için Worker'da resim işlemek gereksiz maliyet,
 * tarayıcı bunu zaten yapıyor.
 *
 * Tasarım kararı — kart ÜYEYİ öne çıkarır, markayı değil. İsim en büyük
 * öge; KAPTAN köşede durur. Tersi olsaydı kimse paylaşmazdı: insanlar bir
 * yere üye olduklarını değil, kendilerini iyi gösteren görselleri paylaşır.
 *
 * `noindex`: 31 ayrı profil sayfası, tarama bütçesi zaten kısıtlı olan bu
 * alan adında ince içerik yığını yaratır. Kart paylaşmak için, aranmak için
 * değil.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Share2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { VerticalLine } from '../components/Decorations';

interface Uye {
  slug: string;
  ad: string;
  firma: string | null;
  kategori: string;
  hizmetler: string;
  linkedin: string | null;
  instagram: string | null;
  behance: string | null;
  websitesi: string | null;
}

type Boyut = 'hikaye' | 'kare';

const BOYUTLAR: Record<Boyut, { w: number; h: number; etiket: string }> = {
  hikaye: { w: 1080, h: 1920, etiket: 'Instagram hikâye' },
  kare: { w: 1080, h: 1080, etiket: 'LinkedIn / gönderi' }
};

/** Metni verilen genişliğe sığacak şekilde satırlara böler. */
function satirla(ctx: CanvasRenderingContext2D, metin: string, maxGenislik: number): string[] {
  const kelimeler = metin.split(' ');
  const satirlar: string[] = [];
  let mevcut = '';
  for (const kelime of kelimeler) {
    const deneme = mevcut ? `${mevcut} ${kelime}` : kelime;
    if (ctx.measureText(deneme).width > maxGenislik && mevcut) {
      satirlar.push(mevcut);
      mevcut = kelime;
    } else {
      mevcut = deneme;
    }
  }
  if (mevcut) satirlar.push(mevcut);
  return satirlar;
}

export default function Kart() {
  const { slug } = useParams();
  const [uye, setUye] = useState<Uye | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const [boyut, setBoyut] = useState<Boyut>('hikaye');
  const [kopyalandi, setKopyalandi] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let iptal = false;
    fetch(`/api/uye/${slug}`)
      .then(async (res) => {
        const veri = await res.json();
        if (iptal) return;
        if (!res.ok) setHata(veri.hata ?? 'Kart bulunamadı.');
        else setUye(veri);
      })
      .catch(() => !iptal && setHata('Bağlantı hatası.'));
    return () => {
      iptal = true;
    };
  }, [slug]);

  const ciz = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !uye) return;
    const { w, h } = BOYUTLAR[boyut];
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Zemin
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, w, h);

    // Üstte ince altın şerit
    ctx.fillStyle = '#c9a227';
    ctx.fillRect(0, 0, w, 10);

    const kenar = 90;
    const icGenislik = w - kenar * 2;
    // Hikâye formatında içerik dikeyde ortaya yakın durmalı: Instagram üstte ve
    // altta kendi arayüzünü bindiriyor, tepeye yığılan metin oralarda kalıyor.
    let y = boyut === 'hikaye' ? 640 : 240;

    // Üst etiket
    ctx.fillStyle = '#c9a227';
    ctx.font = '600 30px system-ui, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('HİZMET VEREN', kenar, y);
    ctx.letterSpacing = '0px';
    y += 90;

    // İsim — kartın en büyük ögesi
    ctx.fillStyle = '#ffffff';
    const isimBoyut = uye.ad.length > 18 ? 78 : 96;
    ctx.font = `700 ${isimBoyut}px system-ui, sans-serif`;
    for (const satir of satirla(ctx, uye.ad, icGenislik)) {
      ctx.fillText(satir, kenar, y);
      y += isimBoyut + 14;
    }

    // Firma
    if (uye.firma) {
      ctx.fillStyle = '#8a8a8a';
      ctx.font = '400 40px system-ui, sans-serif';
      ctx.fillText(uye.firma, kenar, y + 8);
      y += 70;
    }

    y += 40;
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(kenar, y, 140, 4);
    y += 70;

    // Hizmetler
    ctx.fillStyle = '#d4d4d4';
    ctx.font = '400 42px system-ui, sans-serif';
    for (const satir of satirla(ctx, uye.hizmetler, icGenislik)) {
      ctx.fillText(satir, kenar, y);
      y += 58;
    }

    // Alt blok
    const altY = h - (boyut === 'hikaye' ? 560 : 220);

    ctx.fillStyle = '#8a8a8a';
    ctx.font = '400 34px system-ui, sans-serif';
    ctx.fillText('Komisyonsuz iş ağında yer alıyorum', kenar, altY);

    ctx.fillStyle = '#ffffff';
    ctx.font = '600 40px system-ui, sans-serif';
    ctx.fillText('İş yaptıracaksanız:', kenar, altY + 70);

    ctx.fillStyle = '#c9a227';
    ctx.font = '600 40px system-ui, sans-serif';
    ctx.fillText('kaptantechdigital.com', kenar, altY + 130);

    // Marka — köşede, küçük
    ctx.fillStyle = '#6a6a6a';
    ctx.font = '600 28px system-ui, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('KAPTAN', kenar, h - 70);
    ctx.letterSpacing = '0px';
  }, [uye, boyut]);

  useEffect(() => {
    ciz();
  }, [ciz]);

  function indir() {
    const canvas = canvasRef.current;
    if (!canvas || !uye) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${uye.slug}-${boyut}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  function linkiKopyala() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2000);
    });
  }

  const profiller = uye
    ? ([
        ['LinkedIn', uye.linkedin],
        ['Instagram', uye.instagram],
        ['Behance', uye.behance],
        ['Web sitesi', uye.websitesi]
      ] as const).filter(([, v]) => Boolean(v))
    : [];

  return (
    <>
      <SEO
        title={uye ? `${uye.ad} | KAPTAN Hizmet Veren Ağı` : 'Hizmet veren kartı | KAPTAN'}
        description="KAPTAN hizmet veren ağı üye kartı."
        url={`/kart/${slug}`}
        noindex
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-2xl mx-auto px-6">
          {hata && (
            <div className="bg-surface border border-white/5 rounded-2xl p-8 text-center">
              <h1 className="text-2xl font-display font-semibold mb-3">Kart bulunamadı</h1>
              <Link to="/katil" className="text-gold hover:text-white transition-colors">
                Ağa katılmak için form
              </Link>
            </div>
          )}

          {uye && (
            <>
              <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Kartınız hazır</p>
              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">{uye.ad}</h1>
              <p className="text-muted leading-relaxed mb-10">
                Kartı indirin, Instagram hikâyenizde veya LinkedIn&apos;de paylaşın. Bilgileriniz
                değişirse{' '}
                <Link to="/katil" className="text-gold hover:text-white transition-colors">
                  formu tekrar doldurun
                </Link>
                , kartınız güncellenir.
              </p>

              <div className="flex gap-2 mb-6">
                {(Object.keys(BOYUTLAR) as Boyut[]).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBoyut(b)}
                    className={`px-5 py-2.5 rounded-full text-sm transition-colors border ${
                      boyut === b
                        ? 'bg-gold text-bg border-gold font-medium'
                        : 'border-white/10 text-muted hover:text-text-primary hover:border-gold'
                    }`}
                  >
                    {BOYUTLAR[b].etiket}
                  </button>
                ))}
              </div>

              <div className="bg-surface border border-white/5 rounded-2xl p-4 mb-6">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto rounded-lg"
                  aria-label={`${uye.ad} hizmet veren kartı`}
                />
              </div>

              <div className="flex flex-wrap gap-3 mb-12">
                <button
                  type="button"
                  onClick={indir}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors text-sm"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  PNG olarak indir
                </button>
                <button
                  type="button"
                  onClick={linkiKopyala}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-muted hover:text-text-primary hover:border-gold transition-colors text-sm"
                >
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  {kopyalandi ? 'Kopyalandı!' : 'Kart adresini kopyala'}
                </button>
              </div>

              {profiller.length > 0 && (
                <div className="bg-surface border border-white/5 rounded-2xl p-7">
                  <p className="text-sm font-mono text-gold uppercase tracking-wider mb-4">Profilleriniz</p>
                  <ul className="space-y-2">
                    {profiller.map(([etiket, url]) => (
                      <li key={etiket}>
                        <a
                          href={url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-gold transition-colors text-sm break-all"
                        >
                          {etiket}: {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
