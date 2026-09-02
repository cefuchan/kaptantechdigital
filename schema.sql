CREATE TABLE IF NOT EXISTS jobs (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id       TEXT NOT NULL UNIQUE,
  owner_token     TEXT NOT NULL UNIQUE,
  baslik          TEXT NOT NULL,
  kategori        TEXT NOT NULL,
  konum           TEXT,
  butce           TEXT,
  detaylar        TEXT NOT NULL,
  musteri         TEXT,
  telefon         TEXT,
  eposta          TEXT,
  paylasim_onayi  INTEGER NOT NULL DEFAULT 0,
  kvkk_onayi      INTEGER NOT NULL DEFAULT 0,
  dogrulandi      INTEGER NOT NULL DEFAULT 0,
  durum           TEXT NOT NULL DEFAULT 'acik',
  created_at      TEXT NOT NULL,
  expires_at      TEXT NOT NULL,
  purged_at       TEXT
);

CREATE INDEX IF NOT EXISTS idx_jobs_public ON jobs (public_id);

CREATE INDEX IF NOT EXISTS idx_jobs_owner ON jobs (owner_token);

CREATE INDEX IF NOT EXISTS idx_jobs_expires ON jobs (expires_at) WHERE purged_at IS NULL;

CREATE TABLE IF NOT EXISTS bids (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id       INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  ad           TEXT NOT NULL,
  telefon      TEXT NOT NULL,
  fiyat        TEXT,
  baslama      TEXT,
  not_metni    TEXT,
  secildi      INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT NOT NULL,
  UNIQUE (job_id, telefon)
);

CREATE INDEX IF NOT EXISTS idx_bids_job ON bids (job_id);

CREATE TABLE IF NOT EXISTS providers (
  telefon     TEXT PRIMARY KEY,
  ad          TEXT NOT NULL,
  kategoriler TEXT NOT NULL DEFAULT '',
  aktif       INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL
);
