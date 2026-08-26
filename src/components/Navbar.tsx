import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  // Mobil menü açıkken sayfa kaydırmasını kilitle
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // Escape ile mobil menüyü kapat
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  const navLinks = [
    { name: 'Anasayfa', path: '/' },
    { name: 'Hizmetler', path: '/hizmetler', hasDropdown: true },
    { name: 'Referanslar', path: '/referanslar' },
    { name: 'Vaka Çalışmaları', path: '/vaka-calismalari' },
    { name: 'Blog', path: '/blog' },
    { name: 'İletişim', path: '/iletisim' },
  ];

  const services = [
    { name: 'SEO', path: '/hizmetler/seo' },
    { name: 'Ankara SEO', path: '/ankara-seo' },
    { name: 'Ankara Web Tasarım', path: '/ankara-web-tasarim' },
    { name: 'GEO / Yapay Zekâ Aramaları', path: '/hizmetler/geo' },
    { name: 'Web Tasarım', path: '/hizmetler/web-tasarim' },
    { name: 'Google & Meta Reklam Yönetimi', path: '/hizmetler/reklam' },
    { name: 'Video Prodüksiyon', path: '/hizmetler/video-produksiyon' },
    { name: 'Siteler Dijital Hizmetleri', path: '/siteler' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300`}>
      <nav className={`relative flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-3 py-2 transition-shadow duration-300 ${scrolled ? 'shadow-md shadow-black/50' : ''}`}>

        <Link to="/" className="flex items-center group mr-4 transition-transform hover:scale-105">
          <span className="font-logo text-xl md:text-2xl text-gold group-hover:text-gold-light tracking-[0.15em] leading-none uppercase">KAPTAN</span>
        </Link>

        <div className="w-px h-5 bg-stroke mx-1 hidden md:block" />

        <ul className="hidden md:flex items-center space-x-1 mx-2">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              {link.hasDropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      location.pathname.startsWith('/hizmetler')
                        ? 'text-text-primary bg-stroke/50'
                        : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
                  </Link>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-surface border border-white/10 rounded-2xl shadow-xl overflow-hidden py-2"
                      >
                        {services.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              location.pathname === service.path
                                ? 'text-gold bg-stroke/50'
                                : 'text-muted hover:text-text-primary hover:bg-stroke/30'
                            }`}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors block ${
                    location.pathname === link.path
                      ? 'text-text-primary bg-stroke/50'
                      : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="w-px h-5 bg-stroke mx-1 hidden md:block" />

        <Link
          to="/iletisim"
          className="ml-2 group relative hidden sm:flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium text-surface bg-text-primary hover:bg-surface hover:text-gold transition-colors overflow-hidden border border-transparent hover:border-gold"
        >
          <span className="relative z-10 flex items-center">
            Teklif Al
            <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="md:hidden ml-2 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-text-primary hover:text-gold hover:border-gold transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileOpen && (
            <div
              onClick={() => setMobileOpen(false)}
              className="mobile-menu-fade md:hidden fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm"
            />
      )}

      {mobileOpen && (
            <div
              id="mobile-menu"
              className="mobile-menu-in md:hidden fixed left-4 right-4 top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border border-white/10 bg-surface/95 backdrop-blur-md shadow-xl shadow-black/50 p-3"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.hasDropdown ? (
                      <>
                        <div className="flex items-center">
                          <Link
                            to={link.path}
                            className={`flex-1 px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                              location.pathname.startsWith('/hizmetler')
                                ? 'text-text-primary bg-stroke/50'
                                : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                            }`}
                          >
                            {link.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen((open) => !open)}
                            aria-label={mobileServicesOpen ? 'Hizmetleri gizle' : 'Hizmetleri göster'}
                            aria-expanded={mobileServicesOpen}
                            className="flex items-center justify-center w-10 h-10 rounded-full text-muted hover:text-text-primary hover:bg-stroke/50 transition-colors"
                          >
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </div>

                        {mobileServicesOpen && (
                            <ul className="mobile-menu-fade overflow-hidden ml-3 border-l border-stroke pl-2">
                              {services.map((service) => (
                                <li key={service.path}>
                                  <Link
                                    to={service.path}
                                    className={`block px-4 py-2.5 rounded-2xl text-sm transition-colors ${
                                      location.pathname === service.path
                                        ? 'text-gold bg-stroke/50'
                                        : 'text-muted hover:text-text-primary hover:bg-stroke/30'
                                    }`}
                                  >
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                          location.pathname === link.path
                            ? 'text-text-primary bg-stroke/50'
                            : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <Link
                to="/iletisim"
                className="mt-3 group flex items-center justify-center px-5 py-3 rounded-full text-base font-medium text-surface bg-text-primary hover:bg-surface hover:text-gold transition-colors border border-transparent hover:border-gold"
              >
                Teklif Al
                <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
      )}
    </header>
  );
}
