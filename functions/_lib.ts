/**
 * Cloudflare Pages Functions için ortak yardımcılar.
 *
 * Bu dosya `_` ile başladığı için Pages tarafından rota olarak yayınlanmaz.
 */

export interface Env {
  DB: D1Database;
  /** Opsiyonel: talepler ayrıca Google Sheet'e de yazılsın diye. */
  SHEETDB_URL?: string;
}

/** Saklama süresi — src/data/kvkk.ts içindeki RETENTION_DAYS ile aynı olmalı. */
export const RETENTION_DAYS = 30;

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

/**
 * Tahmin edilemez kimlik üretir.
 *
 * Sıralı id kullanılamaz: biri sayarak bütün talepleri dökebilirdi.
 * 12 karakter x 56 harflik alfabe ≈ 69 bit; 32 karakter ≈ 186 bit.
 * Karıştırılabilir harfler (I, l, O, 0, 1) alfabede yok — link elle
 * yazılabilsin diye.
 */
export function randomId(length: number): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (const byte of bytes) out += ALPHABET[byte % ALPHABET.length];
  return out;
}

/** "0551 136 76 34" -> "905511367634". Boş dönerse numara geçersizdir. */
export function normalizePhone(raw: string): string {
  let digits = String(raw ?? '').replace(/\D/g, '');
  if (digits.startsWith('90')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = digits.slice(1);
  return digits.length === 10 && digits.startsWith('5') ? `90${digits}` : '';
}

/**
 * Tabloda gösterilecek okunaklı biçim: "905001112233" -> "0500 111 22 33".
 *
 * Boşluklar şart: "05001112233" gibi bitişik yazılırsa Google Sheets değeri
 * sayı sanıp baştaki sıfırı kırpıyor ve numara "5001112233" olarak kalıyor.
 * Boşluk içeren değeri metin olarak saklıyor.
 */
export function phoneForSheet(normalized: string): string {
  const d = normalized.replace(/^90/, '');
  if (d.length !== 10) return normalized;
  return `0${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Kişiye özel veri; ara katmanlarda önbelleklenmemeli.
      'Cache-Control': 'no-store',
      // Bu uçlar arama sonuçlarında yer almamalı.
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
}

export function bad(message: string, status = 400): Response {
  return json({ hata: message }, status);
}

/** Girdi metnini kırpar ve üst sınırı uygular. */
export function clean(value: unknown, max: number): string {
  return String(value ?? '').trim().slice(0, max);
}

/** ISO tarih, saniye hassasiyetinde. */
export function now(): string {
  return new Date().toISOString().slice(0, 19) + 'Z';
}

export function plusDays(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 19) + 'Z';
}

/**
 * Kaba oran sınırı: aynı IP'den kısa sürede çok kayıt açılmasını engeller.
 * D1 üzerinde sayım yapar; ayrı bir altyapı gerektirmez.
 */
export async function tooManyRecent(
  db: D1Database,
  table: 'jobs' | 'bids',
  minutes: number,
  limit: number
): Promise<boolean> {
  const since = new Date(Date.now() - minutes * 60_000).toISOString().slice(0, 19) + 'Z';
  const row = await db
    .prepare(`SELECT COUNT(*) AS n FROM ${table} WHERE created_at > ?`)
    .bind(since)
    .first<{ n: number }>();
  return (row?.n ?? 0) >= limit;
}
