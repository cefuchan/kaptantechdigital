/**
 * Ön render (prerender) girişi.
 *
 * Build sırasında Vite bu dosyayı Node hedefli olarak paketler; prerender.mjs
 * her rota için render() çağırıp elde ettiği HTML'i dist içindeki statik
 * dosyalara yazar. Böylece arama motoru botları boş bir <div id="root"> yerine
 * sayfanın tamamını görür.
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { StaticRoutes, resolvePages, type PageMap } from './routes';
import { loadBlogContent } from './content/blog';
import { allRoutes, allPaths } from './data/routes';

export { allRoutes, allPaths, loadBlogContent };

let pages: PageMap | null = null;

/**
 * Blog gövdeleri istek anında yüklendiği için, ilgili rotanın içeriğini
 * render'dan önce önbelleğe alıyoruz; aksi halde statik çıktı boş kalırdı.
 */
async function warmup(url: string): Promise<void> {
  if (!pages) pages = await resolvePages();

  const blogMatch = url.match(/^\/blog\/([^/?#]+)/);
  if (blogMatch) {
    await loadBlogContent(decodeURIComponent(blogMatch[1]));
  }
}

export async function render(url: string): Promise<string> {
  await warmup(url);

  return renderToStaticMarkup(
    <HelmetProvider>
      <StaticRouter location={url}>
        <Layout>
          <StaticRoutes pages={pages!} />
        </Layout>
      </StaticRouter>
    </HelmetProvider>
  );
}
