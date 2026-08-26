import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';

/**
 * Bilinmeyen adresler. `noindex` ile işaretlenir; bu sayfaların
 * arama sonuçlarına düşmesi indeksleme kalitesini düşürür.
 */
export default function NotFound() {
  return (
    <>
      <SEO
        title="Sayfa bulunamadı | KAPTAN"
        description="Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ana sayfadan devam edebilirsiniz."
        url="/"
        noindex
      />

      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-3xl mx-auto px-6">
          <HorizontalLine />
          <p className="text-gold font-mono text-sm mb-4 uppercase tracking-wider">404</p>
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">
            Bu rota haritada yok.
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-10">
            Aradığınız sayfa taşınmış, adı değişmiş ya da hiç var olmamış olabilir. Aşağıdaki
            bağlantılardan devam edebilirsiniz.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="px-6 py-3 rounded-full bg-gold text-bg font-medium hover:bg-gold-light transition-colors"
            >
              Ana sayfa
            </Link>
            <Link
              to="/hizmetler"
              className="px-6 py-3 rounded-full border border-white/20 hover:border-gold transition-colors"
            >
              Hizmetler
            </Link>
            <Link
              to="/blog"
              className="px-6 py-3 rounded-full border border-white/20 hover:border-gold transition-colors"
            >
              İçgörüler
            </Link>
            <Link
              to="/iletisim"
              className="px-6 py-3 rounded-full border border-white/20 hover:border-gold transition-colors"
            >
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
