import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { blogPosts } from './Blog';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-display">İçerik bulunamadı.</h1>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} | KAPTAN Blog`} 
        description={post.excerpt}
      />
      
      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        
        <article className="max-w-3xl mx-auto px-6">
          <HorizontalLine />
          <Link to="/blog" className="text-sm text-muted hover:text-white transition-colors mb-8 inline-block">
            ← Tüm İçgörüler
          </Link>

          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-xs text-gold font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-gold/30">
                {post.category}
              </span>
              <span className="text-sm text-muted">{post.date}</span>
              <span className="text-sm text-muted px-2">•</span>
              <span className="text-sm text-muted">{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight mb-8">
              {post.title}
            </h1>
          </header>

          {/* Hero Image Placeholder */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-white/5 bg-surface relative">
            <div className="absolute inset-0 bg-black/20 z-10" />
            <div className="w-full h-full object-cover grayscale opacity-70 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center" />
          </div>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:text-gold hover:prose-a:text-gold-light prose-p:text-muted">
            <p className="lead text-xl text-text-primary mb-8">
              {post.excerpt}
            </p>
            
            <p>
              Dijital dünyadaki algoritmalar sürekli değişirken, markaların görünürlük stratejileri de buna adapte olmak zorundadır. Sadece geleneksel SEO yöntemleriyle yetinmek, rakiplerinizin gerisinde kalmanıza neden olabilir.
            </p>

            <h2>Veri Odaklı Strateji</h2>
            <p>
              Kullanıcı niyetini (user intent) doğru okumak, içerik üretiminin temelidir. Hedef kitleniz ne arıyor? Hangi sorunlarına çözüm bulmak istiyor? Bu soruların cevabı, sizin dijital rotanızı belirler.
            </p>
            
            <blockquote>
              <p>"İşinizi şansa değil, rotaya bırakın. Optimizasyon, bir kerelik bir işlem değil, sürekli bir iyileştirme döngüsüdür."</p>
            </blockquote>

            <h3>Sıradaki Adımlar</h3>
            <ul>
              <li>Mevcut dijital varlıkların detaylı analizi</li>
              <li>Sektörel rakip ve fırsat haritası çıkarımı</li>
              <li>Uzun vadeli, sürdürülebilir büyüme planı oluşturulması</li>
            </ul>

            <p>
              Gelişmiş analitik araçları ve yapay zekâ destekli analizlerle, markanızın potansiyelini maksimize edecek adımları atabilirsiniz. Bu noktada profesyonel bir rehberliğin önemi yadsınamaz.
            </p>

            <hr className="my-12 border-white/10" />
            
            <div className="bg-surface p-8 rounded-2xl border border-white/5">
              <h4 className="text-xl font-display font-semibold mb-2">Bu stratejiyi markanıza nasıl uygularsınız?</h4>
              <p className="text-muted mb-6 text-base">
                İlgili hizmetimiz hakkında detaylı bilgi alın ve markanıza özel rotayı birlikte çizelim.
              </p>
              <Link to="/hizmetler" className="inline-block px-6 py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-bg transition-colors text-sm font-medium">
                Hizmetlerimizi İnceleyin
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
