-- Cloudflare D1 şeması.
--
-- Kurulum (bir kez):
--   npx wrangler d1 create kaptan-isler
--   npx wrangler d1 execute kaptan-isler --remote --file=./schema.sql
--
-- Tasarım notları:
--
-- 1) Her işin İKİ ayrı anahtarı var:
--      public_id   -> hizmet verenlere giden link (/is/<public_id>)
--      owner_token -> yalnızca talep sahibine giden link (/talep/<owner_token>)
--    İkisi de tahmin edilemez olmalı. Sıralı id kullanılsaydı biri sayarak
--    bütün talepleri dökebilirdi; "kimse toplu iş göremesin" kuralı bunu
--    yasaklıyor.
--
-- 2) İletişim bilgisi (musteri, telefon) yalnızca owner_token ucundan ve
--    paylasim_onayi = 1 ise public uçtan döner. Bunun kontrolü API
--    katmanındadır; şema veriyi tutar, kararı vermez.
--
-- 3) expires_at, KVKK'da ve gruba verilen sözde geçen 30 günlük saklama
--    süresidir. Temizlik işi bu alana bakarak kişisel veri sütunlarını
--    boşaltır (satırı silmez — anonim kalan iş verisi fiyat içeriği için
--    değerli ve kişisel veri taşımaz).

CREATE TABLE IF NOT EXISTS jobs (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id       TEXT NOT NULL UNIQUE,
  owner_token     TEXT NOT NULL UNIQUE,

  -- herkese açık kısım (hizmet verenler bunu görür)
  baslik          TEXT NOT NULL,
  kategori        TEXT NOT NULL,
  konum           TEXT,
  butce           TEXT,
  detaylar        TEXT NOT NULL,

  -- kişisel veri — imha sırasında bu üçü boşaltılır
  musteri         TEXT,
  telefon         TEXT,
  eposta          TEXT,

  paylasim_onayi  INTEGER NOT NULL DEFAULT 0,  -- 1 ise iletişim ilanda görünür
  kvkk_onayi      INTEGER NOT NULL DEFAULT 0,
  dogrulandi      INTEGER NOT NULL DEFAULT 0,  -- "Talep doğrulandı" rozeti

  durum           TEXT NOT NULL DEFAULT 'acik', -- acik | kapali
  created_at      TEXT NOT NULL,
  expires_at      TEXT NOT NULL,
  purged_at       TEXT                          -- kişisel veri ne zaman silindi
);

CREATE INDEX IF NOT EXISTS idx_jobs_public  ON jobs (public_id);
CREATE INDEX IF NOT EXISTS idx_jobs_owner   ON jobs (owner_token);
CREATE INDEX IF NOT EXISTS idx_jobs_expires ON jobs (expires_at) WHERE purged_at IS NULL;

CREATE TABLE IF NOT EXISTS bids (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id       INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,

  ad           TEXT NOT NULL,
  telefon      TEXT NOT NULL,
  fiyat        TEXT,
  baslama      TEXT,
  not_metni    TEXT,

  -- Talep sahibi bu teklifle ilerlemeye karar verdi mi? Numara ancak bu
  -- 1 olduktan sonra açılır; aynı zamanda tek geri besleme kaydımız.
  secildi      INTEGER NOT NULL DEFAULT 0,

  created_at   TEXT NOT NULL,

  -- Aynı numara bir işe tek teklif verir; tekrar gönderirse günceller.
  UNIQUE (job_id, telefon)
);

CREATE INDEX IF NOT EXISTS idx_bids_job ON bids (job_id);

-- Hizmet veren allowlist'i. Teklif verebilmek için numara burada olmalı;
-- link gruptan dışarı sızsa bile yabancı teklif veremez.
CREATE TABLE IF NOT EXISTS providers (
  telefon     TEXT PRIMARY KEY,          -- normalize: 905XXXXXXXXX
  ad          TEXT NOT NULL,
  kategoriler TEXT NOT NULL DEFAULT '',  -- virgülle ayrık
  aktif       INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL
);
