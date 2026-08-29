/**
 * KaloHeal — Devrimsel Yapay Zekâ Destekli Klinik Beslenme Platformu.
 *
 * "Sakin bir diyetisyen. Her gün yanında."
 * Quiet Luxury, sıfır suçluluk, sıfır panik, saf denge felsefesi.
 */

export const kalohealStore = {
  appStore: '',
  googlePlay: '',
  /** Erken erişim kayıtlarının düşeceği SheetDB sekmesi. */
  waitlistEndpoint: 'https://sheetdb.io/api/v1/4fptt41pnlx4a?sheet=KaloHeal'
};

export interface KalohealFeature {
  id: string;
  badge: string;
  title: string;
  body: string;
  highlight: string;
}

export const kalohealFeatures: KalohealFeature[] = [
  {
    id: 'plate',
    badge: 'GÖRSEL & BAĞLAMSAL MOTOR',
    title: 'Görsel & Bağlamsal Beslenme Motoru',
    body:
      'Fotoğraf, ses veya metinle analiz. Lahmacun, iskender, ev yemekleri ve tencere yemeklerindeki gizli yağ oranlarını milimetrik hassasiyetle hesaplar.',
    highlight: 'Türk Mutfağı & Ev Yemekleri Uzmanı'
  },
  {
    id: 'shield',
    badge: 'SIFIR SUÇLULUK SİSTEMİ',
    title: 'Kaçamak Kalkanı (Cheat Shield)',
    body:
      'Denge bozulduğunda panik yok, kırmızı alarm yok. Kalkanı devreye sok; serini kırmadan ertesi gün temiz bir sayfayla nazikçe dengelen.',
    highlight: 'Dengeyi bulduk, yarın temiz sayfa'
  },
  {
    id: 'menu',
    badge: 'DIŞARIDA BESLENME',
    title: 'Akıllı Menü & Süpermarket Asistanı',
    body:
      'Restoran menüsünü veya market barkodunu kameraya göster. Günlük kalan makrolarına en uygun 3 lezzeti yargılamadan önersin.',
    highlight: 'Menü Okuma & Barkod Analizi'
  },
  {
    id: 'clinical-ai',
    badge: 'KLİNİK DİYETİSYEN ZEKA',
    title: '10+ Yıl Deneyimli Klinik Zeka',
    body:
      'Her mesajında sakin, saygılı ve bilimsel. Suçluluk hissettirmeden, kan tahlili ve yaşam tarzına göre seni dinleyen gerçek bir yol arkadaşı.',
    highlight: 'Sıfır Yargılama · Saf Bilgelik'
  }
];

/** Felsefe karşılaştırması — Klasik Diyet vs. KaloHeal */
export const philosophyRows: Array<{ old: string; kaloheal: string }> = [
  {
    old: '"Günlük kalori limitini aştın!" (Kırmızı Uyarı)',
    kaloheal: 'Bugün biraz yoğun geçmiş. Akşam hafif bir çorba dengeyi tamamlar.'
  },
  {
    old: 'Kırmızı ünlem, alarm sesi, suçluluk baskısı',
    kaloheal: 'Sakin bir bildirim, tek cümlelik şefkatli yönlendirme.'
  },
  {
    old: 'Serin bozuldu, her şeye sıfırdan başla',
    kaloheal: 'Kaçamak Kalkanı devrede. Serin ve motivasyonun korundu.'
  },
  {
    old: 'Yasak listesi: 47 yiyecek kesinlikle yasak',
    kaloheal: 'Yasak yok. Porsiyon farkındalığı ve akıllı denge var.'
  },
  {
    old: 'Her öğün için 12 karmaşık form alanı doldur',
    kaloheal: 'Tabağın fotoğrafını çek; porsiyon ve gizli yağı o anlasın.'
  }
];

export interface KalohealPricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  recommended?: boolean;
  features: string[];
  cta: string;
}

export const kalohealPricing: KalohealPricingPlan[] = [
  {
    id: 'starter',
    name: 'Başlangıç',
    tagline: 'Farkındalık kazanmak isteyenler için',
    price: 'Ücretsiz',
    period: 'İlk 7 Gün',
    features: [
      'Günlük 5 AI Fotoğraf Analizi',
      'Temel Kalori ve Makro Dağılımı',
      'Kaçamak Kalkanı (Haftalık 1 Hak)',
      'Sakin Günlük Bildirimler'
    ],
    cta: 'Ücretsiz Dene'
  },
  {
    id: 'pro',
    name: 'Klinik Pro',
    tagline: 'Tam kapsamlı sakin diyetisyen deneyimi',
    price: '₺199',
    period: '/ ay (veya ₺1.490/yıl)',
    recommended: true,
    features: [
      'Sınırsız AI Tabak ve Fotoğraf Analizi',
      'Gelişmiş Türk Mutfağı Gizli Yağ Analizi',
      'Sınırsız Kaçamak Kalkanı Koruması',
      'Kamera ile Restoran Menüsü Okuma',
      'Klinik Diyetisyen ile 7/24 Sakin Sohbet',
      'Haftalık Metabolik Denge Raporu'
    ],
    cta: 'Pro ile Başla'
  },
  {
    id: 'lifetime',
    name: 'Kurucu Üyelik',
    tagline: 'Ömür boyu sınırsız quiet luxury',
    price: '₺2.490',
    period: 'Tek Seferlik',
    features: [
      'Ömür Boyu Tüm Pro Özellikler',
      'Gelecek Tüm AI Modellerine Ücretsiz Erişim',
      'Özel Titanyum Kurucu Rozeti',
      'Öncelikli Yeni Özellik Testleri',
      'Doğrudan Ürün Ekibiyle Geri Bildirim Hattı'
    ],
    cta: 'Kurucu Üye Ol'
  }
];

export interface KalohealTrophy {
  name: string;
  tier: 'titanium' | 'platinum' | 'gold' | 'sapphire' | 'emerald';
  detail: string;
}

export const kalohealTrophies: KalohealTrophy[] = [
  { name: 'İlk Adım', tier: 'emerald', detail: 'İlk tabak analizi' },
  { name: 'Yedi Günlük Uyum', tier: 'gold', detail: '7 gün sakin takip' },
  { name: 'Denge Ustası', tier: 'sapphire', detail: '30 gün makro dengesi' },
  { name: 'Kalkan Kardeşliği', tier: 'platinum', detail: 'Suçluluksuz kaçamak sonrası devam' },
  { name: 'Sessiz Disiplin', tier: 'titanium', detail: '90 gün kesintisiz sağlıklı yaşam' },
  { name: 'Menü Gurmesi', tier: 'gold', detail: '25 restoran menüsü analizi' },
  { name: 'Mutfak Yerlisi', tier: 'emerald', detail: '100 geleneksel yemek kaydı' },
  { name: 'Huzurlu Beden', tier: 'titanium', detail: '365 günlük yaşam tarzı' }
];

export const trophyTiers: Record<KalohealTrophy['tier'], { label: string; from: string; to: string }> = {
  titanium: { label: 'Titanium', from: '#E8EAED', to: '#8E9199' },
  platinum: { label: 'Platinum', from: '#D6E4F0', to: '#8FA6BD' },
  gold: { label: 'Gold', from: '#F5D67A', to: '#C79A2E' },
  sapphire: { label: 'Sapphire', from: '#7BB8FF', to: '#0A84FF' },
  emerald: { label: 'Emerald', from: '#30D158', to: '#1E9E5A' }
};

export const kalohealFaqs: Array<{ question: string; answer: string }> = [
  {
    question: 'KaloHeal klasik kalori sayma uygulamalarından nasıl ayrışır?',
    answer:
      'Geleneksel uygulamalar kırmızı uyarılar, alarm sesleri ve katı kısıtlamalarla kullanıcıda suçluluk ve stres yaratır. KaloHeal ise 10+ yıl deneyimli bir klinik diyetisyen gibi sakindir. Kırmızı alarm vermez; dengeyi kaçırdığınızda suçlamak yerine ertesi gün için nazik ve uygulanabilir bir dengeleme önerir.'
  },
  {
    question: 'Türk mutfağının karmaşık ve sulu yemeklerini nasıl tanıyor?',
    answer:
      'Modelimiz Türk mutfağının tencere yemekleri, zeytinyağlıları ve hamur işleri üzerine özel görsel veri kümeleriyle eğitildi. Karnıyarık ile imambayıldı arasındaki kıyma/yağ farkını, lahmacun hamurunun kalınlığını ve gizli pişirme yağını fotoğraftan yüksek doğrulukla tahmin eder.'
  },
  {
    question: 'Kaçamak Kalkanı (Cheat Shield) tam olarak nedir?',
    answer:
      'Diyet psikolojisindeki en büyük tuzak "bugün bozdum, artık hepsi bitti" hissidir. Kaçamak Kalkanı, plan dışı beslendiğiniz günlerde devreye girerek serinizi korur ve ertesi gün hafif bir detoks veya dengeli bir menüyle yolunuza devam etmenizi sağlar.'
  },
  {
    question: 'Restoranda veya davetteyken nasıl yardımcı olur?',
    answer:
      'Menünün fotoğrafını çektiğinizde veya yemek seçeneklerini belirttiğinizde, günün geri kalanındaki enerji ihtiyacınıza en uygun 3 tabağı saniyeler içinde önerir.'
  },
  {
    question: 'Ücretsiz deneme süresi ve taahhüt var mı?',
    answer:
      'KaloHeal’i 7 gün boyunca tüm Pro özellikleriyle ücretsiz deneyebilirsiniz. Kredi kartı zorunluluğu yoktur ve dilediğiniz an iptal edebilirsiniz.'
  }
];
