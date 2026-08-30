/**
 * public/sitemap.xml dosyasını src/data/routes.ts içindeki rota listesinden üretir.
 *
 * <lastmod>, sayfanın en son ne zaman DEĞİŞTİĞİNİ bildirir — yayın tarihini değil.
 * Blog yazılarında değer, ilgili içerik dosyasının git geçmişindeki son commit
 * tarihinden alınır. Bir yazı 2023 tarihli olsa da bu siteye 2026'da eklendiyse
 * lastmod 2026 olmalıdır; aksi halde Google sayfayı "yıllardır değişmemiş" sayıp
 * tarama önceliğini düşürür.
 *
 * Çalıştırmak için: npm run sitemap
 */
import { build } from 'esbuild';
import { writeFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://kaptantechdigital.com';

const today = new Date().toISOString().slice(0, 10);

/** Bir dosyanın git geçmişindeki son commit tarihi (YYYY-MM-DD). */
function gitLastModified(filePath) {
  if (!existsSync(filePath)) return null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', filePath], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

/**
 * Rotanın gerçek değişiklik tarihi.
 * Blog yazıları için içerik dosyasının git tarihi; yoksa build tarihi.
 */
function resolveLastmod(route) {
  if (route.lastmod) return route.lastmod;

  const blog = route.path.match(/^\/blog\/(.+)$/);
  if (blog) {
    const fromGit = gitLastModified(resolve(ROOT, `src/content/blog/${blog[1]}.html`));
    if (fromGit) return fromGit;
  }

  return today;
}

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

  const { indexableRoutes } = await import(pathToFileURL(bundlePath).href);
  const routes = indexableRoutes();

  const body = routes
    .map((route) => {
      const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${resolveLastmod(route)}</lastmod>`,
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
