/**
 * Build sonrası statik HTML üretimi (SSG / prerender).
 *
 * Vite iki kez derlenir:
 *   1. istemci paketi  -> dist/
 *   2. sunucu paketi   -> dist/server/entry-server.js
 *
 * Ardından her rota Node içinde render edilip dist/<rota>/index.html olarak
 * yazılır. Böylece arama motoru botları JavaScript çalıştırmadan da sayfanın
 * başlığını, meta etiketlerini, JSON-LD'sini ve metnini görür.
 *
 * Not: Uygulama tarayıcıda hydrate edilmez; React normal şekilde devralır.
 * Statik çıktı ilk boyama ve tarama içindir, davranışı değiştirmez.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(ROOT, 'dist');
const SERVER_ENTRY = resolve(DIST, 'server/entry-server.js');
const TEMPLATE_PATH = resolve(DIST, 'index.html');

if (!existsSync(SERVER_ENTRY)) {
  console.error(`[!] Sunucu paketi bulunamadı: ${SERVER_ENTRY}`);
  console.error('    Önce "npm run build:ssr" çalıştırın.');
  process.exit(1);
}

const template = readFileSync(TEMPLATE_PATH, 'utf8');
const { render, allRoutes, loadBlogContent } = await import(pathToFileURL(SERVER_ENTRY).href);

/**
 * Blog gövdesini sayfaya gömer. React devraldığında içerik yeniden
 * indirilmeden önbellekten okunur; böylece kısa bir "boş içerik" anı olmaz.
 */
async function inlineBlogContent(url) {
  const match = url.match(/^\/blog\/([^/?#]+)$/);
  if (!match) return '';

  const html = await loadBlogContent(decodeURIComponent(match[1]));
  if (!html) return '';

  const payload = JSON.stringify({ slug: match[1], html }).replace(/</g, '\\u003c');
  return `\n    <script id="__kaptan-blog-content__" type="application/json">${payload}</script>`;
}

/** Bir meta/link etiketinin kimliğini (name / property / rel) döndürür. */
function tagKey(tag) {
  const name = tag.match(/\b(?:name|property)="([^"]+)"/i);
  if (name) return `meta:${name[1].toLowerCase()}`;
  const rel = tag.match(/\brel="([^"]+)"/i);
  if (rel) return `link:${rel[1].toLowerCase()}`;
  return null;
}

/**
 * Şablondaki varsayılan head etiketlerinden, sayfanın kendi ürettikleriyle
 * çakışanları temizler. Aksi halde her sayfada iki title, iki canonical ve
 * çift og: etiketleri kalır.
 */
function stripDefaults(template, renderedHead) {
  const owned = new Set(
    (renderedHead.match(/<(?:meta|link)\b[^>]*>/gi) ?? []).map(tagKey).filter(Boolean)
  );

  // Canonical her zaman sayfaya özeldir: sayfa kendi canonical'ını üretmiyorsa
  // (örn. noindex 404 sayfası) şablondaki varsayılan da kalmamalı.
  owned.add('link:canonical');

  let html = template.replace(/[ \t]*<title\b[^>]*>[\s\S]*?<\/title>\n?/i, '');

  // rel="icon" gibi aynı rel'i paylaşan birden çok etiket olabileceğinden
  // yalnızca sayfanın gerçekten ürettiği kimlikleri kaldırıyoruz.
  html = html.replace(/[ \t]*<(?:meta|link)\b[^>]*>\n?/gi, (tag) => {
    const key = tagKey(tag);
    return key && owned.has(key) ? '' : tag;
  });

  return html;
}

/**
 * React 19, <title>/<meta>/<link> gibi "hoistable" etiketleri render çıktısının
 * başına yerleştirir. Bir parça (fragment) render ettiğimiz için bunlar <head>'e
 * kendiliğinden taşınmaz; baştaki kesintisiz diziyi ayırıp head'e alıyoruz.
 */
function splitHoistedHead(html) {
  const pattern = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/;
  let head = [];
  let rest = html;

  while (true) {
    const match = rest.match(pattern);
    if (!match) break;
    // Uygulama açılırken bu etiketleri SEO bileşeni devralır (src/main.tsx),
    // bu yüzden kaldırılabilir olarak işaretliyoruz.
    head.push(match[0].replace(/^<(meta|link|title)\b/, '<$1 data-seo-default'));
    rest = rest.slice(match[0].length);
  }

  return { head: head.join('\n    '), body: rest };
}

function outputPath(route) {
  const clean = route === '/' ? '/index.html' : `${route.replace(/\/+$/, '')}/index.html`;
  return join(DIST, clean);
}

async function renderPage(url) {
  const rendered = await render(url);
  const { head, body } = splitHoistedHead(rendered);

  if (!/<title\b/.test(head)) {
    throw new Error('render çıktısında <title> bulunamadı');
  }

  const inlined = await inlineBlogContent(url);

  return stripDefaults(template, head)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>${inlined}`)
    .replace('</head>', `    ${head}\n  </head>`);
}

const routes = allRoutes();
const results = [];
let failed = 0;

for (const route of routes) {
  try {
    const page = await renderPage(route.path);
    const target = outputPath(route.path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, page, 'utf8');
    results.push({ route: route.path, bytes: page.length });
  } catch (error) {
    failed++;
    console.error(`[x] ${route.path}: ${error.message}`);
  }
}

for (const item of results) {
  console.log(`[+] ${item.route.padEnd(60)} ${(item.bytes / 1024).toFixed(1)} KB`);
}

// Bilinmeyen adresler için gerçek 404 gövdesi (Netlify bu dosyayı otomatik sunar)
try {
  writeFileSync(resolve(DIST, '404.html'), await renderPage('/bulunamadi'), 'utf8');
  console.log('[+] 404.html');
} catch (error) {
  failed++;
  console.error(`[x] 404.html: ${error.message}`);
}

console.log(`\n${results.length}/${routes.length} rota ön render edildi.`);

if (failed > 0) process.exit(1);
