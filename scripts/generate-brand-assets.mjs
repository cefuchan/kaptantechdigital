/**
 * Marka görsellerini (favicon, touch icon, PWA ikonları ve Open Graph görseli)
 * bağımlılık olmadan üretir. Vektör çizim + kendi PNG kodlayıcımız kullanılır.
 *
 * Çalıştırmak için: node scripts/generate-brand-assets.mjs
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = resolve(ROOT, 'public');

const BG = [10, 10, 10];
const GOLD = [200, 162, 65];
const GOLD_LIGHT = [226, 197, 128];

/* ---------------------------------------------------------------- canvas -- */

function createCanvas(width, height, background) {
  const data = new Float64Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    data[i * 3] = background[0];
    data[i * 3 + 1] = background[1];
    data[i * 3 + 2] = background[2];
  }
  return { width, height, data };
}

function blend(canvas, x, y, color, alpha) {
  if (alpha <= 0 || x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;
  const a = Math.min(1, alpha);
  const i = (y * canvas.width + x) * 3;
  canvas.data[i] = canvas.data[i] * (1 - a) + color[0] * a;
  canvas.data[i + 1] = canvas.data[i + 1] * (1 - a) + color[1] * a;
  canvas.data[i + 2] = canvas.data[i + 2] * (1 - a) + color[2] * a;
}

/** Bir noktanın [ax,ay]-[bx,by] doğru parçasına uzaklığı. */
function distanceToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  let t = lengthSquared === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / lengthSquared;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

/** Yuvarlatılmış uçlu, kenar yumuşatmalı çizgi. */
function drawSegment(canvas, ax, ay, bx, by, thickness, color) {
  const radius = thickness / 2;
  const minX = Math.max(0, Math.floor(Math.min(ax, bx) - radius - 2));
  const maxX = Math.min(canvas.width - 1, Math.ceil(Math.max(ax, bx) + radius + 2));
  const minY = Math.max(0, Math.floor(Math.min(ay, by) - radius - 2));
  const maxY = Math.min(canvas.height - 1, Math.ceil(Math.max(ay, by) + radius + 2));

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const d = distanceToSegment(x + 0.5, y + 0.5, ax, ay, bx, by);
      const coverage = Math.max(0, Math.min(1, radius + 0.5 - d));
      if (coverage > 0) blend(canvas, x, y, color, coverage);
    }
  }
}

/** Yuvarlatılmış köşeli dolu dikdörtgen. */
function drawRoundedRect(canvas, x, y, width, height, radius, color) {
  for (let py = Math.floor(y); py < Math.ceil(y + height); py++) {
    for (let px = Math.floor(x); px < Math.ceil(x + width); px++) {
      const cx = Math.min(Math.max(px + 0.5, x + radius), x + width - radius);
      const cy = Math.min(Math.max(py + 0.5, y + radius), y + height - radius);
      const d = Math.hypot(px + 0.5 - cx, py + 0.5 - cy);
      const coverage = Math.max(0, Math.min(1, radius + 0.5 - d));
      if (coverage > 0) blend(canvas, px, py, color, coverage);
    }
  }
}

/** Merkezden dışarı sönümlenen yumuşak ışık. */
function drawGlow(canvas, cx, cy, radius, color, strength) {
  const minX = Math.max(0, Math.floor(cx - radius));
  const maxX = Math.min(canvas.width - 1, Math.ceil(cx + radius));
  const minY = Math.max(0, Math.floor(cy - radius));
  const maxY = Math.min(canvas.height - 1, Math.ceil(cy + radius));
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / radius;
      if (d >= 1) continue;
      blend(canvas, x, y, color, (1 - d) * (1 - d) * strength);
    }
  }
}

/* ------------------------------------------------------------ stroke font -- */

/**
 * Geometrik, tek çizgi kalınlıklı bir harf seti. Her harf, 0..1 aralığındaki
 * bir kutuda tanımlı doğru parçalarından oluşur (Syncopate'in geniş ve
 * geometrik karakterine yakın bir görünüm hedeflenir).
 */
const GLYPHS = {
  A: [[0, 1, 0.5, 0], [0.5, 0, 1, 1], [0.18, 0.62, 0.82, 0.62]],
  B: [[0, 0, 0, 1], [0, 0, 0.75, 0], [0.75, 0, 0.9, 0.16], [0.9, 0.16, 0.9, 0.34], [0.9, 0.34, 0.75, 0.5], [0, 0.5, 0.75, 0.5], [0.75, 0.5, 0.95, 0.68], [0.95, 0.68, 0.95, 0.84], [0.95, 0.84, 0.78, 1], [0, 1, 0.78, 1]],
  C: [[1, 0.14, 0.72, 0], [0.72, 0, 0.28, 0], [0.28, 0, 0, 0.28], [0, 0.28, 0, 0.72], [0, 0.72, 0.28, 1], [0.28, 1, 0.72, 1], [0.72, 1, 1, 0.86]],
  D: [[0, 0, 0, 1], [0, 0, 0.6, 0], [0.6, 0, 1, 0.35], [1, 0.35, 1, 0.65], [1, 0.65, 0.6, 1], [0, 1, 0.6, 1]],
  E: [[1, 0, 0, 0], [0, 0, 0, 1], [0, 1, 1, 1], [0, 0.5, 0.78, 0.5]],
  F: [[1, 0, 0, 0], [0, 0, 0, 1], [0, 0.5, 0.78, 0.5]],
  G: [[1, 0.14, 0.72, 0], [0.72, 0, 0.28, 0], [0.28, 0, 0, 0.28], [0, 0.28, 0, 0.72], [0, 0.72, 0.28, 1], [0.28, 1, 0.72, 1], [0.72, 1, 1, 0.78], [1, 0.78, 1, 0.55], [1, 0.55, 0.55, 0.55]],
  H: [[0, 0, 0, 1], [1, 0, 1, 1], [0, 0.5, 1, 0.5]],
  I: [[0.5, 0, 0.5, 1], [0.16, 0, 0.84, 0], [0.16, 1, 0.84, 1]],
  J: [[0.85, 0, 0.85, 0.74], [0.85, 0.74, 0.6, 1], [0.6, 1, 0.28, 1], [0.28, 1, 0.05, 0.78]],
  K: [[0, 0, 0, 1], [0.95, 0, 0.08, 0.55], [0.08, 0.55, 1, 1]],
  L: [[0, 0, 0, 1], [0, 1, 1, 1]],
  M: [[0, 1, 0, 0], [0, 0, 0.5, 0.6], [0.5, 0.6, 1, 0], [1, 0, 1, 1]],
  N: [[0, 1, 0, 0], [0, 0, 1, 1], [1, 1, 1, 0]],
  O: [[0.28, 0, 0.72, 0], [0.72, 0, 1, 0.28], [1, 0.28, 1, 0.72], [1, 0.72, 0.72, 1], [0.72, 1, 0.28, 1], [0.28, 1, 0, 0.72], [0, 0.72, 0, 0.28], [0, 0.28, 0.28, 0]],
  P: [[0, 1, 0, 0], [0, 0, 0.75, 0], [0.75, 0, 0.98, 0.22], [0.98, 0.22, 0.98, 0.36], [0.98, 0.36, 0.75, 0.58], [0.75, 0.58, 0, 0.58]],
  Q: [[0.28, 0, 0.72, 0], [0.72, 0, 1, 0.28], [1, 0.28, 1, 0.72], [1, 0.72, 0.72, 1], [0.72, 1, 0.28, 1], [0.28, 1, 0, 0.72], [0, 0.72, 0, 0.28], [0, 0.28, 0.28, 0], [0.62, 0.7, 1, 1.05]],
  R: [[0, 1, 0, 0], [0, 0, 0.75, 0], [0.75, 0, 0.98, 0.22], [0.98, 0.22, 0.98, 0.36], [0.98, 0.36, 0.75, 0.58], [0.75, 0.58, 0, 0.58], [0.5, 0.58, 1, 1]],
  S: [[1, 0.14, 0.7, 0], [0.7, 0, 0.24, 0], [0.24, 0, 0, 0.22], [0, 0.22, 0.06, 0.42], [0.06, 0.42, 0.8, 0.58], [0.8, 0.58, 1, 0.76], [1, 0.76, 0.78, 1], [0.78, 1, 0.26, 1], [0.26, 1, 0, 0.86]],
  T: [[0, 0, 1, 0], [0.5, 0, 0.5, 1]],
  U: [[0, 0, 0, 0.72], [0, 0.72, 0.28, 1], [0.28, 1, 0.72, 1], [0.72, 1, 1, 0.72], [1, 0.72, 1, 0]],
  V: [[0, 0, 0.5, 1], [0.5, 1, 1, 0]],
  W: [[0, 0, 0.22, 1], [0.22, 1, 0.5, 0.32], [0.5, 0.32, 0.78, 1], [0.78, 1, 1, 0]],
  X: [[0, 0, 1, 1], [1, 0, 0, 1]],
  Y: [[0, 0, 0.5, 0.5], [1, 0, 0.5, 0.5], [0.5, 0.5, 0.5, 1]],
  Z: [[0, 0, 1, 0], [1, 0, 0, 1], [0, 1, 1, 1]],
  '0': [[0.28, 0, 0.72, 0], [0.72, 0, 1, 0.28], [1, 0.28, 1, 0.72], [1, 0.72, 0.72, 1], [0.72, 1, 0.28, 1], [0.28, 1, 0, 0.72], [0, 0.72, 0, 0.28], [0, 0.28, 0.28, 0]],
  '1': [[0.24, 0.18, 0.5, 0], [0.5, 0, 0.5, 1], [0.2, 1, 0.8, 1]],
  '2': [[0, 0.22, 0.28, 0], [0.28, 0, 0.72, 0], [0.72, 0, 1, 0.26], [1, 0.26, 0, 1], [0, 1, 1, 1]],
  '3': [[0, 0.1, 0.3, 0], [0.3, 0, 0.75, 0], [0.75, 0, 0.95, 0.26], [0.95, 0.26, 0.6, 0.5], [0.6, 0.5, 1, 0.72], [1, 0.72, 0.76, 1], [0.76, 1, 0.26, 1], [0.26, 1, 0, 0.88]],
  '4': [[0.72, 0, 0, 0.72], [0, 0.72, 1, 0.72], [0.72, 0, 0.72, 1]],
  '5': [[1, 0, 0.1, 0], [0.1, 0, 0.03, 0.44], [0.03, 0.44, 0.66, 0.44], [0.66, 0.44, 1, 0.7], [1, 0.7, 0.76, 1], [0.76, 1, 0.24, 1], [0.24, 1, 0, 0.88]],
  '6': [[0.92, 0.06, 0.44, 0], [0.44, 0, 0.06, 0.36], [0.06, 0.36, 0, 0.74], [0, 0.74, 0.28, 1], [0.28, 1, 0.7, 1], [0.7, 1, 0.98, 0.74], [0.98, 0.74, 0.7, 0.48], [0.7, 0.48, 0.2, 0.5]],
  '7': [[0, 0, 1, 0], [1, 0, 0.34, 1]],
  '8': [[0.3, 0, 0.7, 0], [0.7, 0, 0.94, 0.24], [0.94, 0.24, 0.62, 0.48], [0.62, 0.48, 0.34, 0.48], [0.34, 0.48, 0.06, 0.24], [0.06, 0.24, 0.3, 0], [0.34, 0.48, 0.02, 0.74], [0.02, 0.74, 0.28, 1], [0.28, 1, 0.72, 1], [0.72, 1, 0.98, 0.74], [0.98, 0.74, 0.62, 0.48]],
  '9': [[0.08, 0.94, 0.56, 1], [0.56, 1, 0.94, 0.64], [0.94, 0.64, 1, 0.26], [1, 0.26, 0.72, 0], [0.72, 0, 0.3, 0], [0.3, 0, 0.02, 0.26], [0.02, 0.26, 0.3, 0.52], [0.3, 0.52, 0.8, 0.5]],
  '.': [[0.5, 0.97, 0.5, 1]],
  '·': [[0.5, 0.48, 0.5, 0.52]],
  '-': [[0.1, 0.5, 0.9, 0.5]],
  ' ': []
};

function drawText(canvas, text, { x, y, size, tracking, thickness, color, aspect = 0.82 }) {
  const glyphWidth = size * aspect;
  let cursor = x;
  for (const rawChar of text) {
    const char = rawChar.toUpperCase();
    const glyph = GLYPHS[char];
    if (glyph) {
      for (const [ax, ay, bx, by] of glyph) {
        drawSegment(canvas, cursor + ax * glyphWidth, y + ay * size, cursor + bx * glyphWidth, y + by * size, thickness, color);
      }
    }
    cursor += glyphWidth + tracking;
  }
  return cursor - tracking - x;
}

function measureText(text, size, tracking, aspect = 0.82) {
  return text.length * (size * aspect + tracking) - tracking;
}

/* -------------------------------------------------------------- encoding -- */

function crc32(buffer) {
  let crc = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i];
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, payload) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(payload.length);
  const typeAndData = Buffer.concat([Buffer.from(type, 'latin1'), payload]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData));
  return Buffer.concat([length, typeAndData, crc]);
}

function encodePng(canvas) {
  const { width, height, data } = canvas;
  const raw = Buffer.alloc(height * (width * 3 + 1));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      raw[offset++] = Math.max(0, Math.min(255, Math.round(data[i])));
      raw[offset++] = Math.max(0, Math.min(255, Math.round(data[i + 1])));
      raw[offset++] = Math.max(0, Math.min(255, Math.round(data[i + 2])));
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolor
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0))
  ]);
}

/** PNG gömülü tek boyutlu ICO (tüm modern tarayıcılar destekler). */
function encodeIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry[0] = size >= 256 ? 0 : size;
  entry[1] = size >= 256 ? 0 : size;
  entry[2] = 0; // palette
  entry[3] = 0;
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bit depth
  entry.writeUInt32BE(0, 8);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

/* ---------------------------------------------------------------- artwork -- */

/** Kare marka ikonu: koyu zemin üzerinde altın "K" pusula işareti. */
function renderIcon(size) {
  const canvas = createCanvas(size, size, BG);
  const unit = size / 100;

  drawRoundedRect(canvas, 0, 0, size, size, size * 0.22, [16, 16, 16]);
  drawGlow(canvas, size * 0.5, size * 0.42, size * 0.55, GOLD, 0.16);

  const thickness = Math.max(1.5, unit * 9);
  const left = size * 0.3;
  const top = size * 0.26;
  const bottom = size * 0.74;
  const right = size * 0.74;

  drawSegment(canvas, left, top, left, bottom, thickness, GOLD_LIGHT);
  drawSegment(canvas, right, top, left + thickness * 0.15, size * 0.53, thickness, GOLD);
  drawSegment(canvas, left + thickness * 0.15, size * 0.53, right, bottom, thickness, GOLD);

  // Pusula noktası
  drawGlow(canvas, right, top, unit * 7, GOLD_LIGHT, 0.9);

  return canvas;
}

/** 1200x630 Open Graph görseli. */
function renderOpenGraph() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height, BG);

  drawGlow(canvas, width * 0.5, height * 0.34, 620, GOLD, 0.13);
  drawGlow(canvas, width * 0.08, height * 1.05, 420, GOLD, 0.07);

  const wordmarkSize = 116;
  const tracking = 26;
  const wordmark = 'KAPTAN';
  const wordmarkWidth = measureText(wordmark, wordmarkSize, tracking);
  drawText(canvas, wordmark, {
    x: (width - wordmarkWidth) / 2,
    y: height * 0.28,
    size: wordmarkSize,
    tracking,
    thickness: 9,
    color: GOLD
  });

  drawSegment(canvas, width * 0.5 - 70, height * 0.63, width * 0.5 + 70, height * 0.63, 3, GOLD);

  const taglineSize = 30;
  const taglineTracking = 12;
  const tagline = 'SEO · GEO · WEB · ADS · VIDEO';
  const taglineWidth = measureText(tagline, taglineSize, taglineTracking);
  drawText(canvas, tagline, {
    x: (width - taglineWidth) / 2,
    y: height * 0.71,
    size: taglineSize,
    tracking: taglineTracking,
    thickness: 3,
    color: [235, 235, 235]
  });

  const domainSize = 21;
  const domainTracking = 9;
  const domain = 'KAPTANTECHDIGITAL.COM';
  const domainWidth = measureText(domain, domainSize, domainTracking);
  drawText(canvas, domain, {
    x: (width - domainWidth) / 2,
    y: height * 0.845,
    size: domainSize,
    tracking: domainTracking,
    thickness: 2.4,
    color: [150, 150, 150]
  });

  return canvas;
}

/* ------------------------------------------------------------------ main -- */

mkdirSync(PUBLIC, { recursive: true });

const outputs = [
  ['favicon-32x32.png', renderIcon(32)],
  ['favicon-16x16.png', renderIcon(16)],
  ['apple-touch-icon.png', renderIcon(180)],
  ['icon-192.png', renderIcon(192)],
  ['icon-512.png', renderIcon(512)],
  ['og-image.png', renderOpenGraph()]
];

for (const [name, canvas] of outputs) {
  const png = encodePng(canvas);
  writeFileSync(resolve(PUBLIC, name), png);
  console.log(`[+] public/${name} (${(png.length / 1024).toFixed(1)} KB)`);
}

const icoSource = encodePng(renderIcon(32));
writeFileSync(resolve(PUBLIC, 'favicon.ico'), encodeIco(icoSource, 32));
console.log('[+] public/favicon.ico');
