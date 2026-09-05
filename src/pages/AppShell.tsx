/**
 * /uygulama — çalışma zamanında doğan sayfalar için SPA kabuğu.
 *
 * `/is/*` ve `/talep/*` adresleri build sırasında üretilemez (kayıtlar sonradan
 * oluşuyor). _redirects bu adresleri 200 ile buraya yönlendirir; React Router
 * gerçek adrese bakıp doğru bileşeni açar.
 *
 * Bu kabuğun kendisi hiçbir zaman doğrudan gezilmez; `noindex` ve site
 * haritası dışıdır.
 */
import { SEO } from '../components/SEO';

export default function AppShell() {
  return (
    <>
      <SEO title="Yükleniyor | KAPTAN" description="Sayfa hazırlanıyor." url="/uygulama" noindex />
      <div className="pt-32 pb-24 bg-bg min-h-screen">
        <h1 className="text-muted text-center text-base font-normal">Yükleniyor…</h1>
      </div>
    </>
  );
}
