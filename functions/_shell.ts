/**
 * Calisma zamaninda dogan sayfalar icin SPA kabugunu 200 ile sunar.
 *
 * Neden _redirects degil: "/is/*  /uygulama  200" kurali Cloudflare tarafinda
 * 200 rewrite olarak degil 308 YONLENDIRME olarak uygulaniyor (hedef dizin
 * normalizasyonu devreye giriyor). Adres /uygulama/ olarak degisince React
 * Router gercek yolu goremiyor ve dogru bileseni acamiyor.
 *
 * Function ile sunmak adresi oldugu gibi birakir; ayrica noindex basligini
 * HTTP seviyesinde de verebiliyoruz.
 */
export async function serveShell(request: Request, env: { ASSETS: Fetcher }): Promise<Response> {
  const url = new URL(request.url);
  url.pathname = '/uygulama';

  const asset = await env.ASSETS.fetch(new Request(url.toString(), { method: 'GET' }));
  const headers = new Headers(asset.headers);
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  headers.set('Cache-Control', 'no-store');
  headers.set('Referrer-Policy', 'no-referrer');

  return new Response(asset.body, { status: 200, headers });
}
