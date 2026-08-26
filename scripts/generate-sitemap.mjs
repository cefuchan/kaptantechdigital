/**
 * public/sitemap.xml dosyasını src/data/routes.ts içindeki rota listesinden üretir.
 * Her URL bir <lastmod> tarihi taşır: blog yazılarında yayın tarihi,
 * diğer sayfalarda üretim (build) tarihi kullanılır.
 *
 * Çalıştırmak için: npm run sitemap
 */
import { build } from 'esbuild';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://kaptantechdigital.com';

const today = new Date().toISOString().slice(0, 10);

// routes.ts TypeScript olduğu için önce geçici bir ESM paketine derliyoruz.
const workDir = mkdtempSync(join(tmpdir(), 'kaptan-sitemap-'));
const bundlePath = join(workDir, 'routes.mjs');

try {
  await build({
    entryPoints: [resolve(ROOT, 'src/data/routes.ts')],
    outfile: bundlePath,
    bundle: true,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent'
  });

  const { allRoutes } = await import(pathToFileURL(bundlePath).href);
  const routes = allRoutes();

  const body = routes
    .map((route) => {
      const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${route.lastmod ?? today}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority.toFixed(1)}</priority>`,
        '  </url>'
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Bu dosya otomatik üretilir: npm run sitemap. Elle düzenlemeyin. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  writeFileSync(resolve(ROOT, 'public/sitemap.xml'), xml, 'utf8');
  console.log(`[+] public/sitemap.xml güncellendi (${routes.length} URL, lastmod: ${today})`);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
