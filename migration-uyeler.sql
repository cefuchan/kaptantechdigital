CREATE TABLE IF NOT EXISTS providers_yeni (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT NOT NULL UNIQUE,
  ad          TEXT NOT NULL,
  firma       TEXT,
  telefon     TEXT UNIQUE,
  eposta      TEXT,
  kategori    TEXT NOT NULL DEFAULT 'Diğer',
  hizmetler   TEXT NOT NULL DEFAULT '',
  linkedin    TEXT,
  instagram   TEXT,
  behance     TEXT,
  websitesi   TEXT,
  yayin_onayi INTEGER NOT NULL DEFAULT 0,
  kvkk_onayi  INTEGER NOT NULL DEFAULT 0,
  aktif       INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL,
  updated_at  TEXT
);

INSERT INTO providers_yeni (slug, ad, telefon, kategori, hizmetler, aktif, created_at)
SELECT 'uye-' || rowid, ad, telefon, 'Diğer', kategoriler, aktif, created_at
FROM providers;

DROP TABLE providers;

ALTER TABLE providers_yeni RENAME TO providers;

CREATE INDEX IF NOT EXISTS idx_providers_slug ON providers (slug);

CREATE INDEX IF NOT EXISTS idx_providers_telefon ON providers (telefon);

CREATE INDEX IF NOT EXISTS idx_providers_aktif ON providers (aktif, kategori);
