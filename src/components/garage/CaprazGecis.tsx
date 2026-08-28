import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { garagePages } from '../../data/altindagGaraj';

/**
 * Garaj alt sayfaları arasında çapraz geçiş.
 *
 * Bulunduğu sayfa dışındaki tüm araç sayfalarını listeler ve hub'a döner.
 * Kaynak liste src/data/altindagGaraj.ts içindeki `garagePages`; yeni bir alt
 * sayfa eklendiğinde bu bölüm tüm sayfalarda kendiliğinden güncellenir.
 */
export function CaprazGecis({ current }: { current: string }) {
  const others = garagePages.filter((page) => page.id !== current);
  if (others.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold text-white md:text-3xl">Diğer araçlar ve hizmetler</h2>
      <p className="mt-2 mb-6 text-[#E0E6ED]/60">
        Başka bir aracınız varsa doğrudan ilgili sayfaya geçebilirsiniz.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {others.map((page) => (
          <Link
            key={page.id}
            to={page.path}
            className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0E1626] px-5 py-4 transition-colors hover:border-[#00E5FF]/40"
          >
            <span className="min-w-0">
              <span className="block font-semibold text-white">{page.label}</span>
              <span className="mt-0.5 block truncate text-[13px] text-[#E0E6ED]/55">
                {page.models}
              </span>
            </span>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-[#00E5FF] transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      <Link
        to="/ankara-gizli-ozellik"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#00E5FF] transition-colors hover:text-white"
      >
        Tüm hizmetler ve araç modelleri
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
