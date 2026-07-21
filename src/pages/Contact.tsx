import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../components/SEO';
import { VerticalLine, HorizontalLine } from '../components/Decorations';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xaqrbqyl', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('idle');
        alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      setFormState('idle');
      alert('Ağ hatası oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <>
      <SEO 
        title="İletişim | KAPTAN — Ankara Dijital Büyüme Stüdyosu" 
        description="Projeleriniz için teklif alın. Rotanızı birlikte çizelim."
        url="https://kaptantechdigital.com/iletisim"
      />
      <Helmet>
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "KAPTAN",
            "description": "Ankara merkezli dijital büyüme stüdyosu — SEO, GEO, Web Tasarım, Google & Meta Reklam Yönetimi ve Video Prodüksiyon.",
            "telephone": "+90 551 136 76 34",
            "email": "merhaba@kaptantechdigital.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Güneşevler 71. Cadde No:1",
              "addressLocality": "Ankara",
              "addressCountry": "TR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 39.97067346786774,
              "longitude": 32.893593472347014
            },
            "url": "https://kaptantechdigital.com",
            "sameAs": [
              "https://instagram.com/kaptantechdigital",
              "https://linkedin.com/company/kaptantechdigital"
            ]
          }
          `}
        </script>
      </Helmet>
      
      <div className="pt-32 pb-24 bg-bg relative min-h-screen">
        <VerticalLine />
        <div className="max-w-7xl mx-auto px-6">
          <HorizontalLine />
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">Rotanızı birlikte çizelim.</h1>
          <p className="text-muted max-w-2xl text-lg mb-16">
            Yeni bir proje başlatmak veya mevcut dijital varlıklarınızı optimize etmek için bizimle iletişime geçin.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-surface p-8 md:p-10 rounded-2xl border border-white/5">
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-2">Talebiniz Alındı</h3>
                  <p className="text-muted">En kısa sürede sizinle iletişime geçeceğiz. Rotaya güvenin.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="mt-8 px-6 py-2 border border-white/20 rounded-full text-sm hover:border-gold transition-colors"
                  >
                    Yeni Bir Mesaj Gönder
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-muted">Ad Soyad</label>
                      <input 
                        required
                        type="text" 
                        id="name"
                        name="name"
                        className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-muted">Telefon</label>
                      <input 
                        required
                        type="tel" 
                        id="phone"
                        name="phone"
                        className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                        placeholder="0555 555 55 55"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted">E-posta</label>
                    <input 
                      required
                      type="email" 
                      id="email"
                      name="email"
                      className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                      placeholder="ornek@sirket.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-muted">Proje Detayları</label>
                    <textarea 
                      required
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Nasıl yardımcı olabiliriz?"
                    />
                  </div>

                  <button 
                    disabled={formState === 'submitting'}
                    type="submit"
                    className="w-full py-4 bg-gold text-bg font-medium rounded-lg hover:bg-gold-light transition-colors disabled:opacity-70 flex justify-center"
                  >
                    {formState === 'submitting' ? 'Gönderiliyor...' : 'Teklif Al'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-white/5 text-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Telefon</p>
                    <a href="tel:+905511367634" className="text-lg font-medium hover:text-gold transition-colors">0551 136 76 34</a>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-white/5 text-gold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">E-posta</p>
                    <a href="mailto:merhaba@kaptantechdigital.com" className="text-lg font-medium hover:text-gold transition-colors break-all">merhaba@kaptantechdigital.com</a>
                  </div>
                </div>

                <div className="space-y-4 sm:col-span-2">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-white/5 text-gold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Adres</p>
                    <p className="text-lg font-medium">Güneşevler 71. Cadde No:1, Ankara, TR</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <a 
                  href="https://wa.me/905511367634" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/20 transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <MessageSquare className="w-6 h-6 text-[#25D366]" />
                    <span className="font-medium text-[#25D366]">WhatsApp'tan Hızlı İletişim</span>
                  </div>
                  <span className="text-[#25D366] group-hover:translate-x-1 transition-transform">→</span>
                </a>

                {/* Map Placeholder - Replace with actual iframe if needed */}
                <div className="w-full h-64 bg-surface rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=39.970673,32.893593&zoom=14&size=800x400&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x9c9c9c&style=feature:all|element:labels.text.stroke|color:0x000000|lightness:13&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x144b53|lightness:14|weight:1.4&style=feature:landscape|element:all|color:0x080808&style=feature:poi|element:geometry|color:0x0c4152|lightness:5&style=feature:road.highway|element:geometry.fill|color:0x000000&style=feature:road.highway|element:geometry.stroke|color:0x0b434f|lightness:25&style=feature:road.arterial|element:geometry.fill|color:0x000000&style=feature:road.arterial|element:geometry.stroke|color:0x0b3d51|lightness:16&style=feature:road.local|element:geometry|color:0x000000&style=feature:transit|element:all|color:0x146474&style=feature:water|element:all|color:0x021019')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="relative z-10 flex flex-col items-center">
                    <MapPin className="w-8 h-8 text-gold mb-2 drop-shadow-lg" />
                    <span className="text-sm font-medium bg-black/80 px-3 py-1 rounded-full border border-white/10">Haritada Gör</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
