/**
 * Blog gövdelerinin talebe göre yüklenmesi.
 *
 * `import.meta.glob` her HTML dosyasını ayrı bir dinamik parçaya (chunk) çevirir;
 * böylece bir yazıyı okuyan ziyaretçi yalnızca o yazının içeriğini indirir.
 * Yeni bir .html dosyası eklendiğinde burada değişiklik gerekmez.
 */
const modules = import.meta.glob('./*.html', { query: '?raw', import: 'default' }) as Record<
  string,
  () => Promise<string>
>;

const bySlug = new Map<string, () => Promise<string>>(
  Object.entries(modules).map(([path, loader]) => [
    path.replace(/^\.\//, '').replace(/\.html$/, ''),
    loader
  ])
);

/**
 * Yüklenmiş gövdeler. Ön render (prerender) sırasında bu önbellek önceden
 * doldurulur; böylece bileşen ilk render'da içeriği senkron okuyabilir ve
 * statik HTML çıktısı yazının tamamını içerir.
 */
const cache = new Map<string, string>();

/** Ön render edilmiş sayfaların gövdeyi istemciye taşıdığı script etiketi. */
export const INLINE_CONTENT_ID = '__kaptan-blog-content__';

/**
 * Ön render edilmiş bir blog sayfası açıldığında gövde HTML'i sayfaya gömülü
 * gelir. Bunu önbelleğe alıyoruz ki React devraldığında içerik bir an için
 * kaybolup yeniden yüklenmesin.
 */
if (typeof document !== 'undefined') {
  const inlined = document.getElementById(INLINE_CONTENT_ID);
  if (inlined?.textContent) {
    try {
      const { slug, html } = JSON.parse(inlined.textContent) as { slug: string; html: string };
      if (slug && typeof html === 'string') cache.set(slug, html);
    } catch {
      // Bozuk veri gelirse sessizce normal yükleme yoluna düşeriz.
    }
  }
}

export function hasBlogContent(slug: string): boolean {
  return bySlug.has(slug);
}

export function blogContentSlugs(): string[] {
  return [...bySlug.keys()];
}

/** Önbellekteki gövdeyi senkron döner; henüz yüklenmemişse null. */
export function getCachedBlogContent(slug: string): string | null {
  return cache.get(slug) ?? null;
}

/** Yazı gövdesini yükler; dosya yoksa null döner. */
export async function loadBlogContent(slug: string): Promise<string | null> {
  const cached = cache.get(slug);
  if (cached !== undefined) return cached;

  const loader = bySlug.get(slug);
  if (!loader) return null;

  const html = (await loader()).trim();
  cache.set(slug, html);
  return html;
}
