import os
import re
import datetime
import unicodedata

def slugify(text):
    # Türkçe karakterleri İngilizce'ye çevir ve slug formatına getir
    text = text.replace('ı', 'i').replace('İ', 'i').replace('ş', 's').replace('Ş', 's')
    text = text.replace('ğ', 'g').replace('Ğ', 'g').replace('ü', 'u').replace('Ü', 'u')
    text = text.replace('ö', 'o').replace('Ö', 'o').replace('ç', 'c').replace('Ç', 'c')
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text).strip('-')
    return text

def main():
    print("="*40)
    print(" KAPTANTECH - OTOMATİK BLOG EKLEME BOTU ")
    print("="*40)
    
    title = input("1. Blog Başlığı: ").strip()
    category = input("2. Kategori (Örn: SEO, Web, Eğitim vb.): ").strip()
    excerpt = input("3. Kısa Açıklama (Google'da ve kartta görünecek): ").strip()
    print("4. Blog Metni (İçeriği yazın veya yapıştırın. Birden fazla paragraf için <p> kullanabilirsiniz. Bitirmek için boş bir satırda 'BİTİR' yazıp Enter'a basın):")
    
    content_lines = []
    while True:
        try:
            line = input()
        except EOFError:
            break
        if line.strip() == "BİTİR":
            break
        content_lines.append(line)
        
    content = "\n".join(content_lines)
    
    if not title or not content:
        print("Hata: Başlık ve içerik boş olamaz!")
        return

    slug = slugify(title)
    
    # İçerikteki ters bölü ve backtick karakterlerini escape et (JS template literal patlamasını önlemek için)
    content = content.replace('`', r'\`').replace('${', r'\${')
    
    # Tarihi Türkçe formatta al
    months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
    now = datetime.datetime.now()
    date_str = f"{now.day:02d} {months[now.month-1]} {now.year}"
    
    # Okuma süresini kabaca hesapla
    word_count = len(content.split())
    read_time = str(max(1, word_count // 200)) + " dk okuma"

    blog_tsx_path = os.path.join("src", "pages", "Blog.tsx")
    blog_post_tsx_path = os.path.join("src", "pages", "BlogPost.tsx")

    # 1. Blog.tsx Güncellemesi
    if not os.path.exists(blog_tsx_path):
        print(f"Hata: {blog_tsx_path} bulunamadı. Lütfen scripti proje ana dizininde çalıştırın.")
        return

    with open(blog_tsx_path, "r", encoding="utf-8") as f:
        blog_content = f.read()

    new_post_obj = f"""  {{
    slug: "{slug}",
    title: "{title}",
    category: "{category}",
    date: "{date_str}",
    readTime: "{read_time}",
    excerpt: "{excerpt}"
  }}"""

    # array sonundaki '];' ifadesini bularak araya yeni objeyi ekle (esnek boşluk kontrolüyle)
    if re.search(r'\]\s*;', blog_content):
        blog_content = re.sub(r'(\s*)\}(\s*)\]\s*;', r'\1},\n' + new_post_obj + r'\n];', blog_content, count=1)
        
        with open(blog_tsx_path, "w", encoding="utf-8") as f:
            f.write(blog_content)
        print(f"\n[+] {blog_tsx_path} başarıyla güncellendi.")
    else:
        print("Hata: Blog.tsx içinde array sonu (];) bulunamadı.")

    # 2. BlogPost.tsx Güncellemesi
    if not os.path.exists(blog_post_tsx_path):
        print(f"Hata: {blog_post_tsx_path} bulunamadı.")
        return
        
    with open(blog_post_tsx_path, "r", encoding="utf-8") as f:
        post_content = f.read()
        
    new_case = f"""    case '{slug}':
      return (
        <>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{{{ __html: `{content}` }}}} />
        </>
      );
"""

    # 'default:' ifadesini esnek boşluk ve regex ile bulup hemen önüne ekleyelim
    if re.search(r'default\s*:', post_content):
        post_content = re.sub(r'(\s*)(default\s*:)', r'\1' + new_case + r'\1\2', post_content, count=1)
        with open(blog_post_tsx_path, "w", encoding="utf-8") as f:
            f.write(post_content)
        print(f"[+] {blog_post_tsx_path} başarıyla güncellendi.")
    else:
        print("Hata: BlogPost.tsx içinde 'default:' bulunamadı.")

    print(f"\n🎉 İşlem tamamlandı! '{title}' isimli blog yazısı eklendi.")
    print(f"Oluşturulan link: /blog/{slug}")

if __name__ == "__main__":
    main()