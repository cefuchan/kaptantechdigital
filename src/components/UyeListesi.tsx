/**
 * Ağdaki hizmet verenlerin listesi.
 *
 * Veriyi tarayıcıdan çeker; ön render edilmez. Sebebi bilinçli: liste
 * ziyaretçiye "burada gerçekten insan var" güveni vermek için, arama
 * motorunda çıkmak için değil. Kişi listesi her gün değişebileceği için
 * build çıktısına gömmek de yanlış olurdu.
 *
 * Telefon ve e-posta HİÇ gelmiyor — /api/uyeler bu alanları döndürmüyor.
 */
import { useEffect, useState } from 'react';

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

export function UyeListesi() {
  const [uyeler, setUyeler] = useState<Uye[] | null>(null);

  useEffect(() => {
    let iptal = false;
    fetch('/api/uyeler')
      .then((res) => (res.ok ? res.json() : { uyeler: [] }))
      .then((veri) => !iptal && setUyeler(veri.uyeler ?? []))
      .catch(() => !iptal && setUyeler([]));
    return () => {
      iptal = true;
    };
  }, []);

  // Henüz kimse katılmadıysa boş bir başlık göstermek, hiç göstermemekten kötü.
  if (!uyeler || uyeler.length === 0) return null;

  const kategoriler = [...new Set(uyeler.map((u) => u.kategori))];

  return (
    <section className="mt-24" aria-labelledby="agdakiler">
      <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Ağımızda kimler var</p>
      <h2 id="agdakiler" className="text-3xl md:text-4xl font-display font-semibold mb-4">
        {uyeler.length} hizmet veren
      </h2>
      <p className="text-muted leading-relaxed max-w-2xl mb-8">
        Ağa katılan ve bilgilerinin yayınlanmasını onaylayan kişiler. İletişim bilgileri
        burada yer almaz; talebiniz geldiğinde uygun kişilerle biz paylaşırız.
      </p>

      <div className="space-y-10">
        {kategoriler.map((kategori) => {
          const grup = uyeler.filter((u) => u.kategori === kategori);
          return (
            <div key={kategori}>
              <h3 className="text-lg font-display font-semibold mb-4">
                {kategori} <span className="text-muted font-normal">({grup.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {grup.map((uye) => {
                  const profiller = (
                    [
                      ['LinkedIn', uye.linkedin],
                      ['Instagram', uye.instagram],
                      ['Behance', uye.behance],
                      ['Web', uye.websitesi]
                    ] as const
                  ).filter(([, url]) => Boolean(url));

                  return (
                    <article key={uye.slug} className="bg-surface p-5 rounded-2xl border border-white/5">
                      <p className="font-medium">{uye.ad}</p>
                      {uye.firma && <p className="text-muted/70 text-sm mb-2">{uye.firma}</p>}
                      <p className="text-muted text-sm leading-relaxed mt-2">{uye.hizmetler}</p>
                      {profiller.length > 0 && (
                        <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                          {profiller.map(([etiket, url]) => (
                            <li key={etiket}>
                              <a
                                href={url as string}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="text-xs text-gold hover:text-white transition-colors"
                              >
                                {etiket}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
