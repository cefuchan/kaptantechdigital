#!/usr/bin/env python3
"""
KAPTANTECH - Otomatik blog ekleme botu.

Yeni bir yazı eklendiğinde üç yeri birden günceller:
  1. src/content/blog/<slug>.html   -> yazının gövdesi (ayrı dosya, talebe göre yüklenir)
  2. src/data/blog.ts               -> yazının meta verisi (ISO tarih dahil)
  3. public/sitemap.xml             -> yeni URL + <lastmod> tarihi

Eski sürümde içerik doğrudan BlogPost.tsx içindeki dev switch-case bloğuna
yazılıyordu; artık her yazı kendi dosyasında durur ve sayfa bileşeni
değiştirilmez.

Kullanım:
    python add_blog.py                 # etkileşimli
    python add_blog.py --sitemap-only  # yalnızca site haritasını yeniden üret
"""

import datetime
import os
import re
import subprocess
import sys
import unicodedata

ROOT = os.path.dirname(os.path.abspath(__file__))
CONTENT_DIR = os.path.join(ROOT, "src", "content", "blog")
BLOG_DATA = os.path.join(ROOT, "src", "data", "blog.ts")
SITEMAP = os.path.join(ROOT, "public", "sitemap.xml")
SITE_URL = "https://kaptantechdigital.com"

MONTHS = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
]

BLOCK_TAGS = (
    "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li",
    "table", "thead", "tbody", "tr", "td", "th", "blockquote",
    "figure", "div", "section", "hr", "img",
)


def slugify(text: str) -> str:
    """Türkçe başlığı URL'de kullanılabilir bir slug'a çevirir."""
    replacements = {
        "ı": "i", "İ": "i", "ş": "s", "Ş": "s", "ğ": "g", "Ğ": "g",
        "ü": "u", "Ü": "u", "ö": "o", "Ö": "o", "ç": "c", "Ç": "c",
    }
    for source, target in replacements.items():
        text = text.replace(source, target)
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("utf-8")
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    return re.sub(r"[-\s]+", "-", text).strip("-")


def js_string(value: str) -> str:
    """Değeri güvenli bir JS/TS string literaline çevirir."""
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    escaped = escaped.replace("\n", "\\n").replace("\r", "")
    return f'"{escaped}"'


def normalize_content(raw: str) -> str:
    """Etiketsiz düz metin satırlarını <p> ile sarar, boş satırları temizler."""
    lines = []
    for line in raw.replace("\r\n", "\n").split("\n"):
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith("<"):
            lines.append(stripped)
        else:
            lines.append(f"<p>{stripped}</p>")
    return "\n".join(lines)


def word_count(html: str) -> int:
    return len(re.sub(r"<[^>]+>", " ", html).split())


def read_multiline(prompt: str) -> str:
    print(prompt)
    collected = []
    while True:
        try:
            line = input()
        except EOFError:
            break
        if line.strip().upper() in ("BİTİR", "BITIR"):
            break
        collected.append(line)
    return "\n".join(collected)


def insert_post_metadata(slug, title, category, date_str, iso_date, read_time, excerpt) -> bool:
    """Yeni yazıyı src/data/blog.ts içindeki blogPosts dizisinin başına ekler."""
    if not os.path.exists(BLOG_DATA):
        print(f"Hata: {BLOG_DATA} bulunamadı.")
        return False

    with open(BLOG_DATA, "r", encoding="utf-8") as handle:
        source = handle.read()

    if f'slug: "{slug}"' in source:
        print(f"Hata: '{slug}' zaten kayıtlı. Farklı bir başlık kullanın.")
        return False

    anchor = "export const blogPosts: BlogPostMeta[] = [\n"
    index = source.find(anchor)
    if index == -1:
        print("Hata: blogPosts dizisi bulunamadı. src/data/blog.ts biçimi değişmiş olabilir.")
        return False

    entry = (
        "  {\n"
        f"    slug: {js_string(slug)},\n"
        f"    title: {js_string(title)},\n"
        f"    category: {js_string(category)},\n"
        f"    date: {js_string(date_str)},\n"
        f"    datePublished: {js_string(iso_date)},\n"
        f"    readTime: {js_string(read_time)},\n"
        f"    excerpt: {js_string(excerpt)}\n"
        "  },\n"
    )

    cut = index + len(anchor)
    with open(BLOG_DATA, "w", encoding="utf-8") as handle:
        handle.write(source[:cut] + entry + source[cut:])

    print(f"[+] {os.path.relpath(BLOG_DATA, ROOT)} güncellendi.")
    return True


def regenerate_sitemap() -> bool:
    """Site haritasını rota listesinden yeniden üretir (tercih edilen yol)."""
    try:
        result = subprocess.run(
            ["node", os.path.join("scripts", "generate-sitemap.mjs")],
            cwd=ROOT,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
    except FileNotFoundError:
        return False

    if result.returncode != 0:
        print("[!] Site haritası üreteci hata verdi:")
        print((result.stderr or result.stdout).strip())
        return False

    print((result.stdout or "").strip())
    return True


def append_sitemap_url(slug: str, iso_date: str) -> None:
    """Node çalıştırılamazsa yeni URL'i doğrudan sitemap.xml'e ekler."""
    if not os.path.exists(SITEMAP):
        print(f"[!] {SITEMAP} bulunamadı, site haritası güncellenemedi.")
        return

    with open(SITEMAP, "r", encoding="utf-8") as handle:
        xml = handle.read()

    loc = f"{SITE_URL}/blog/{slug}"
    if loc in xml:
        print("[=] URL zaten site haritasında.")
        return

    entry = (
        "  <url>\n"
        f"    <loc>{loc}</loc>\n"
        f"    <lastmod>{iso_date}</lastmod>\n"
        "    <changefreq>monthly</changefreq>\n"
        "    <priority>0.7</priority>\n"
        "  </url>\n"
    )

    xml = xml.replace("</urlset>", entry + "</urlset>")
    with open(SITEMAP, "w", encoding="utf-8") as handle:
        handle.write(xml)

    print(f"[+] {os.path.relpath(SITEMAP, ROOT)} güncellendi (lastmod: {iso_date}).")


def main() -> int:
    if "--sitemap-only" in sys.argv:
        if not regenerate_sitemap():
            print("Hata: site haritası üretilemedi (node bulunamadı mı?).")
            return 1
        return 0

    print("=" * 44)
    print(" KAPTANTECH - OTOMATİK BLOG EKLEME BOTU ")
    print("=" * 44)

    title = input("1. Blog Başlığı: ").strip()
    category = input("2. Kategori (SEO, GEO, Web, Reklam, Video, Eğitim...): ").strip()
    excerpt = input("3. Kısa Açıklama (Google'da ve kartta görünür, 120-160 karakter): ").strip()
    content = read_multiline(
        "4. Blog Metni (HTML kullanabilirsiniz; düz satırlar otomatik <p> ile sarılır.\n"
        "   Bitirmek için boş bir satırda 'BİTİR' yazıp Enter'a basın):"
    )

    if not title or not content.strip():
        print("Hata: Başlık ve içerik boş olamaz!")
        return 1
    if not category:
        category = "Genel"
    if not excerpt:
        excerpt = title

    slug = slugify(title)
    if not slug:
        print("Hata: Başlıktan geçerli bir slug üretilemedi.")
        return 1

    now = datetime.datetime.now()
    date_str = f"{now.day:02d} {MONTHS[now.month - 1]} {now.year}"
    iso_date = now.strftime("%Y-%m-%d")

    html = normalize_content(content)
    read_time = f"{max(1, round(word_count(html) / 200))} dk okuma"

    # 1. İçerik dosyası
    os.makedirs(CONTENT_DIR, exist_ok=True)
    content_path = os.path.join(CONTENT_DIR, f"{slug}.html")
    if os.path.exists(content_path):
        print(f"Hata: {content_path} zaten var. Farklı bir başlık kullanın.")
        return 1
    with open(content_path, "w", encoding="utf-8") as handle:
        handle.write(html + "\n")
    print(f"\n[+] {os.path.relpath(content_path, ROOT)} oluşturuldu.")

    # 2. Meta veri
    if not insert_post_metadata(slug, title, category, date_str, iso_date, read_time, excerpt):
        os.remove(content_path)
        return 1

    # 3. Site haritası
    if not regenerate_sitemap():
        append_sitemap_url(slug, iso_date)

    print(f"\n🎉 '{title}' yayına hazır.")
    print(f"   Link      : /blog/{slug}")
    print(f"   Okuma     : {read_time}")
    print("   Sonraki adım: npm run build (statik HTML ve site haritası yenilenir)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
