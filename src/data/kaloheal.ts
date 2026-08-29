/**
 * KaloHeal — yapay zekâ destekli beslenme ve yaşam tarzı asistanı.
 *
 * KAPTAN sitesinde barınan, kendi marka kimliğine sahip ürün açılış sayfasının
 * içerik modeli. Metinler sayfa bileşeninden ayrıldı ki kopya güncellemesi
 * koda dokunmadan yapılabilsin.
 */

/**
 * Mağaza bağlantıları.
 *
 * Boş bırakıldığı sürece indirme butonları "yakında" durumunda kalır ve
 * sayfa içindeki kayıt bölümüne yönlenir — çalışmayan bir mağaza linki
 * yayınlanmaz. Uygulama yayınlandığında bu iki alanı doldurmak yeterli.
 */
export const kalohealStore = {
  appStore: '',
  googlePlay: '',
  /** Erken erişim kayıtlarının düşeceği SheetDB sekmesi. */
  waitlistEndpoint: 'https://sheetdb.io/api/v1/4fptt41pnlx4a?sheet=KaloHeal'
};

export interface KalohealFeature {
  id: string;
  title: string;
  body: string;
}

export const kalohealFeatures: KalohealFeature[] = [
  {
    id: 'plate',
    title: 'Fotoğraftan Tabak Analizi',
    body:
      'Lahmacun mu, karnıyarık mı? Sadece fotoğrafını çek. KaloHeal, Türk mutfağının en zor tabaklarını bile saniyeler içinde milimetrik analiz eder.'
  },
  {
    id: 'shield',
    title: 'Kaçamak Kalkanı',
    body:
      'Diyeti bozdun diye her şey bitmedi. Stres yok. Kalkanı kullan, serini bozmadan yarın sabah yepyeni bir sayfa aç.'
  },
  {
    id: 'menu',
    title: 'Akıllı Süpermarket & Menü Asistanı',
    body:
      'Restorandasın ve ne yiyeceğini bilmiyorsun. Menüyü okut, KaloHeal günlük kalan kalorine en uygun 3 lezzeti sana önersin.'
  }
];

/** Felsefe bölümü — eski yaklaşım / KaloHeal yaklaşımı karşılaştırması. */
export const philosophyRows: Array<{ old: string; kaloheal: string }> = [
  {
    old: '"Günlük limitini aştın!"',
    kaloheal: 'Bugün biraz yoğun geçmiş. Akşam hafif bir şey yeter.'
  },
  {
    old: 'Kırmızı uyarı, ünlem, alarm sesi',
    kaloheal: 'Sakin bir bildirim, tek cümlelik yönlendirme'
  },
  {
    old: 'Serin bozuldu, sıfırdan başla',
    kaloheal: 'Kalkanını kullandın. Seri devam ediyor.'
  },
  {
    old: 'Yasak listesi: 47 yiyecek',
    kaloheal: 'Yasak yok. Denge var.'
  },
  {
    old: 'Her öğün için 12 alan doldur',
    kaloheal: 'Fotoğrafı çek. Gerisini biz hallederiz.'
  }
];

export interface KalohealTrophy {
  name: string;
  tier: 'titanium' | 'platinum' | 'gold' | 'sapphire' | 'emerald';
  detail: string;
}

/** Oyunlaştırma kupaları — kayan şeritte gösterilir. */
export const kalohealTrophies: KalohealTrophy[] = [
  { name: 'İlk Adım', tier: 'emerald', detail: 'İlk tabak analizi' },
  { name: 'Yedi Gün', tier: 'gold', detail: '7 günlük seri' },
  { name: 'Denge Ustası', tier: 'sapphire', detail: '30 gün makro dengesi' },
  { name: 'Kalkan Sahibi', tier: 'platinum', detail: 'Kaçamak sonrası dönüş' },
  { name: 'Sessiz Disiplin', tier: 'titanium', detail: '90 günlük süreklilik' },
  { name: 'Menü Kaşifi', tier: 'gold', detail: '25 restoran menüsü' },
  { name: 'Mutfak Yerlisi', tier: 'emerald', detail: '100 Türk yemeği' },
  { name: 'Yıl Dönümü', tier: 'titanium', detail: '365 gün' }
];

export const trophyTiers: Record<KalohealTrophy['tier'], { label: string; from: string; to: string }> = {
  titanium: { label: 'Titanium', from: '#E8EAED', to: '#8E9199' },
  platinum: { label: 'Platinum', from: '#D6E4F0', to: '#8FA6BD' },
  gold: { label: 'Gold', from: '#F5D67A', to: '#C79A2E' },
  sapphire: { label: 'Sapphire', from: '#7BB8FF', to: '#1E5FCC' },
  emerald: { label: 'Emerald', from: '#7BE8A8', to: '#1E9E5A' }
};

export const kalohealFaqs: Array<{ question: string; answer: string }> = [
  {
    question: 'KaloHeal kalori saydırıyor mu?',
    answer:
      'Arka planda hesaplıyor ama sizi sayı girmeye zorlamıyor. Tabağın fotoğrafını çekiyorsunuz; porsiyon tahmini, makro dağılımı ve günlük dengeye etkisi otomatik çıkarılıyor.'
  },
  {
    question: 'Türk mutfağını gerçekten tanıyor mu?',
    answer:
      'Model Türk mutfağı odaklı eğitildi. Karnıyarık ile imambayıldı, lahmacun ile pide arasındaki farkı; zeytinyağlı ile etli dolmanın kalori farkını ayırt edecek şekilde çalışıyor.'
  },
  {
    question: 'Kaçamak Kalkanı nasıl çalışıyor?',
    answer:
      'Diyetin bozulduğu günlerde seriyi koruyan bir hak. Kalkanı kullandığınızda o gün seriyi kırmıyor; uygulama ertesi gün için hafif bir denge planı öneriyor. Suçluluk üretmek yerine devam etmeyi kolaylaştırıyor.'
  },
  {
    question: 'Verilerim ne oluyor?',
    answer:
      'Tabak fotoğrafları analiz için işleniyor ve hesabınıza bağlı kalıyor. Üçüncü taraflarla paylaşılmıyor. [DOĞRULANMALI — gizlilik politikası metni hazırlandığında bu cevap kesinleştirilecek]'
  },
  {
    question: 'Ücretsiz mi?',
    answer:
      'İlk 7 gün ücretsiz deneme sunuluyor. Sonrasındaki plan ve fiyatlandırma yayın öncesinde duyurulacak.'
  }
];
