import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { site, socialProfiles } from '../data/site';

/** Alt menü sütunları — her sayfadan tüm hizmet ve bölge sayfalarına statik link. */
const footerNav = [
  {
    title: 'Hizmetler',
    links: [
      { label: 'SEO', path: '/hizmetler/seo' },
      { label: 'GEO / Yapay Zekâ Aramaları', path: '/hizmetler/geo' },
      { label: 'Web Tasarım', path: '/hizmetler/web-tasarim' },
      { label: 'Google & Meta Reklam', path: '/hizmetler/reklam' },
      { label: 'Video Prodüksiyon', path: '/hizmetler/video-produksiyon' }
    ]
  },
  {
    title: 'Bölge & Sektör',
    links: [
      { label: 'Ankara SEO', path: '/ankara-seo' },
      { label: 'Ankara Web Tasarım', path: '/ankara-web-tasarim' },
      { label: 'Ankara Video Prodüksiyon', path: '/ankara-video-produksiyon' },
      { label: 'OSTİM & İvedik OSB', path: '/ostim-ivedik' },
      { label: 'Siteler', path: '/siteler' },
      { label: 'Sağlık Turizmi SEO', path: '/saglik-turizmi-seo' }
    ]
  },
  {
    title: 'Kurumsal',
    links: [
      { label: 'Hakkımızda', path: '/hakkimizda' },
      { label: 'Vaka Çalışmaları', path: '/vaka-calismalari' },
      { label: 'Referanslar', path: '/referanslar' },
      { label: 'İçgörüler & Blog', path: '/blog' },
      { label: 'İletişim', path: '/iletisim' }
    ]
  },
  {
    title: 'Araçlar',
    links: [
      { label: 'İş Talebi Oluştur', path: '/is-talebi' },
      { label: 'Altındağ Garaj', path: '/ankara-gizli-ozellik' },
      { label: 'Batarya SoH Testi', path: '/ankara-gizli-ozellik/ev-batarya-soh' }
    ]
  }
];

export function Footer() {
  /**
   * Profil bağlantıları site.ts'ten gelir; aynı liste JSON-LD'deki sameAs
   * alanını da besler. rel="me" ile bağlantı, varlık doğrulaması için
   * "bu profil bize ait" beyanı taşır.
   */
  const profiles = [
    ...socialProfiles,
    { label: 'WhatsApp', url: `https://wa.me/${site.whatsapp}` }
  ];

  return (
    <footer className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="w-full h-full bg-surface scale-y-[-1] opacity-50" />
      </div>

      <div className="relative z-10">
        {/* GSAP Marquee - CSS implementation for simplicity if GSAP not strictly needed for this, but requested GSAP. Will use a CSS marquee for now or we can use Framer Motion */}
        <div className="flex overflow-hidden whitespace-nowrap mb-16 py-4 border-y border-white/5 bg-black/20">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex font-display font-semibold text-2xl md:text-4xl text-muted tracking-widest"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-4">
                ŞANSA DEĞİL ROTAYA •
              </span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <a
            href="mailto:merhaba@kaptantechdigital.com"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-medium border border-white/20 hover:border-gold transition-colors mb-20 group relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 accent-gradient transition-opacity" />
            Bize Ulaşın
          </a>

          {/*
            Alt menü — hizmet ve bölge sayfalarına statik bağlantı.
            Navbar'daki hizmet menüsü yalnızca fare üzerine gelince açıldığı için
            o bağlantılar ön render edilmiş HTML'de bulunmuyor; tarayıcı botları
            ve dil modelleri sayfalara buradan ulaşıyor.
          */}
          <nav
            aria-label="Alt menü"
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-white/10 pt-12 mb-16"
          >
            {footerNav.map((column) => (
              <div key={column.title}>
                <h2 className="text-xs font-mono uppercase tracking-widest text-gold mb-4">
                  {column.title}
                </h2>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-sm text-muted hover:text-text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer Lockup */}
          <div className="w-full flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-12">
            <div className="text-left space-y-4 mb-8 md:mb-0">
              <div className="flex items-baseline space-x-1">
                <span className="font-logo text-4xl md:text-6xl tracking-[0.15em] text-gold uppercase">KAPTAN</span>
              </div>
              <p className="text-gold tracking-widest text-xs md:text-sm">SEO · GEO · WEB · ADS · VIDEO PRODUCTION</p>
              <div className="text-muted text-sm space-y-1 mt-6">
                <p>0551 136 76 34</p>
                <p>merhaba@kaptantechdigital.com</p>
                <p>Güneşevler 71. Cadde No:1, Ankara</p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block text-left">
                <p className="text-gold font-bold tracking-widest mb-1 text-sm">ROTA</p>
                <p className="text-muted font-mono text-xs">N 39.97067346786774</p>
                <p className="text-muted font-mono text-xs">E 32.893593472347014</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-white/5 text-sm">
            <nav aria-label="Sosyal medya" className="flex flex-wrap gap-x-6 gap-y-2 text-muted mb-4 md:mb-0">
              {profiles.map((profile) => (
                <a
                  key={profile.label}
                  href={profile.url}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  {profile.label}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center text-muted">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-dot" />
              Yeni Projelere Açığız
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
