/**
 * Talep sahibinin bu tarayıcıdan oluşturduğu taleplerin listesi.
 *
 * Özel takip linki yalnızca gönderim anında bir kez dönüyor; sekme kapanırsa
 * kaybolur. Bu bileşen o linkleri geri bulmanın ikinci yolu.
 *
 * Sunucuya hiçbir şey sormaz — kayıtlar yalnızca bu cihazın tarayıcısında.
 * Başka cihazda görünmez, gizli sekmede görünmez; bu yüzden asıl kurtarma
 * yolu hâlâ "bize yazın, linki yeniden gönderelim".
 */
import { useEffect, useState } from 'react';
import { readSavedRequests, type SavedRequest } from './JobPostForm';

export function SavedRequests() {
  const [kayitlar, setKayitlar] = useState<SavedRequest[]>([]);

  // Ön render sırasında localStorage yok; okuma yalnızca tarayıcıda yapılır.
  useEffect(() => {
    setKayitlar(readSavedRequests());
  }, []);

  if (kayitlar.length === 0) return null;

  return (
    <section className="mt-24" aria-labelledby="onceki-talepler">
      <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">Bu cihazdan</p>
      <h2 id="onceki-talepler" className="text-2xl md:text-3xl font-display font-semibold mb-4">
        Önceki talepleriniz
      </h2>
      <p className="text-muted leading-relaxed max-w-2xl mb-6">
        Bu tarayıcıdan oluşturduğunuz talepler. Teklifleri görmek için birine tıklayın.
        Kayıtlar yalnızca bu cihazda tutulur.
      </p>
      <ul className="space-y-3">
        {kayitlar.map((kayit) => (
          <li key={kayit.url}>
            <a
              href={kayit.url}
              className="flex flex-wrap items-baseline justify-between gap-3 bg-surface border border-white/5 rounded-2xl px-6 py-4 hover:border-gold/40 transition-colors"
            >
              <span className="text-text-primary">{kayit.baslik}</span>
              <span className="text-muted text-sm">{kayit.tarih}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
