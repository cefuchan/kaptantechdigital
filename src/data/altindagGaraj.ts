/**
 * Altındağ Garaj — Ankara Gizli Özellik & EV Kodlama Merkezi
 *
 * KAPTAN sitesinin içinde barınan, kendi kimliğine sahip bağımsız bir
 * açılış sayfasının içerik modeli. Sayfa bileşeninden ayrı tutuldu ki
 * marka/model listeleri koda dokunmadan güncellenebilsin.
 */

/**
 * İletişim bilgileri.
 *
 * `whatsapp` boş bırakıldığı sürece tüm WhatsApp çağrıları sayfa içindeki
 * randevu formuna yönlenir — çalışmayan bir wa.me bağlantısı yayınlanmaz.
 * Numarayı girdiğiniz anda butonlar otomatik olarak WhatsApp'a bağlanır.
 * Biçim: ülke koduyla, yalnızca rakam. Örn: '905XXXXXXXXX'
 */
export const garageContact = {
  whatsapp: '905511367634',
  phoneDisplay: '0551 136 76 34',
  instagram: 'https://instagram.com/ankaragizliozellikgaraj',
  instagramHandle: '@ankaragizliozellikgaraj',
  district: 'Altındağ',
  city: 'Ankara',
  /** Açık sokak adresi girildiğinde LocalBusiness şemasına da yansır. */
  streetAddress: 'Güneşevler 71. Cadde No:1',
  openingHours: 'Mo-Sa 09:00-19:00',
  /** Randevu formunun gönderileceği ücretsiz form servisi. */
  formEndpoint: 'https://formspree.io/f/xaqrbqyl'
};

export interface VehicleGroup {
  id: string;
  brand: string;
  models: string;
  /** Seçiciyi renklendiren kısa etiket. */
  tag: string;
  features: string[];
}

/**
 * Marka/model bazlı açılabilir özellikler.
 *
 * Listeler işletmenin beyanına dayanır; araç donanım seviyesine ve model
 * yılına göre değişebilir. Yeni model eklerken buraya bir grup ekleyin.
 */
export const vehicleGroups: VehicleGroup[] = [
  {
    id: 'fiat-egea',
    brand: 'Fiat',
    models: 'Egea (Sedan · HB · Cross)',
    tag: 'En çok tercih edilen',
    features: [
      'Kadran karşılama (selamlama) animasyonu',
      'Viraj aydınlatma (kornering) aktivasyonu',
      'Anlık tork ve güç göstergesi',
      'Emniyet kemeri ikaz sesi iptali',
      'Yol bilgisayarı ek gösterge sayfaları',
      'Menü dili ve birim ayarlarının açılması'
    ]
  },
  {
    id: 'renault',
    brand: 'Renault',
    models: 'Megane 4 · Clio 5',
    tag: 'Multimedya odaklı',
    features: [
      'Kablosuz Apple CarPlay ve Android Auto',
      'Hareket hâlinde video oynatma',
      'Karşılama (welcome) ışıkları',
      'Ayna otomatik katlama ayarı',
      'Gündüz farı (DRL) davranış ayarı'
    ]
  },
  {
    id: 'dacia-duster',
    brand: 'Dacia',
    models: 'Duster',
    tag: 'Off-road paketi',
    features: [
      '4x4 eğim ve yatış açısı göstergesi',
      'Yol bilgisayarı aktivasyonu',
      'Harici sıcaklık göstergesi',
      'Lastik basıncı uyarı eşiği ayarı'
    ]
  },
  {
    id: 'chery',
    brand: 'Chery',
    models: 'Omoda 5 · Tiggo 7 · Tiggo 8',
    tag: 'Tak-çalıştır',
    features: [
      'Kablosuz Android Box kurulumu',
      'YouTube, Netflix ve Spotify ekleme',
      'Trim sökmeden Type-C kurulum',
      'Ekran yansıtma (screen mirroring)'
    ]
  },
  {
    id: 'vag-group',
    brand: 'VAG Grubu',
    models: 'VW Golf · Passat · Polo · Seat Leon · Skoda Octavia',
    tag: 'Geniş kodlama menüsü',
    features: [
      'Kadran selamlama ve lap timer aktivasyonu',
      'Amerikan park ve ayna altı karşılama aydınlatması',
      'Sinyal ile zıt yanan gündüz farları (Strobe DRL)',
      'Geri viteste sağ aynanın otomatik aşağı inmesi',
      'Alarm korna onay sesi ve konfor sinyal sayısı artırma',
      'Klima profil hızı ve menü ek göstergeleri'
    ]
  },
  {
    id: 'elektrikli',
    brand: 'Elektrikli Araçlar',
    models: 'Togg · Tesla · MG · Renault Zoe',
    tag: 'Batarya ekspertizi',
    features: [
      'SoH (State of Health) batarya sağlık raporu',
      'Hücre voltaj dengesi analizi',
      'Gerçek menzil ve tüketim analizi',
      'Şarj döngüsü geçmişi',
      'Alım-satım öncesi bağımsız ekspertiz raporu'
    ]
  }
];

export interface GarageService {
  title: string;
  description: string;
  points: string[];
}

export const garageServices: GarageService[] = [
  {
    title: 'Gizli Özellik Aktivasyonu',
    description:
      'Aracın orijinal beyin yazılımı üzerinden, fabrikada kapalı bırakılmış donanım özelliklerini açıyoruz.',
    points: [
      'Kablo kesme veya ek modül yok',
      'Üretici arayüzü ve menü mantığı korunur',
      'İşlem öncesi orijinal yazılım yedeği alınır'
    ]
  },
  {
    title: 'Elektrikli Araç & Multimedya Çözümleri',
    description:
      'Garanti bozmayan, Type-C ile takılıp çalışan Android Box kutuları ve ekran çözümleri.',
    points: [
      'Trim sökülmeden kurulum',
      'Kablosuz CarPlay / Android Auto',
      'İstendiğinde iz bırakmadan sökülebilir'
    ]
  },
  {
    title: 'Mobil Batarya Sağlığı (SoH) Ekspertizi',
    description:
      'İkinci el elektrikli araç alım-satımında bataryanın gerçek durumunu ortaya koyan profesyonel teşhis.',
    points: [
      'Hücre bazında voltaj dengesi',
      'Kapasite kaybı ve gerçek menzil',
      'Yazılı sağlık raporu'
    ]
  },
  {
    title: 'Adrese Mobil Servis',
    description:
      'Ankara’nın tüm ilçelerine, aracınızın bulunduğu yere gelerek hizmet veriyoruz.',
    points: [
      'Ev, ofis veya otopark fark etmez',
      'Randevuyla planlı geliş',
      'İşlem ortalama 20 dakika'
    ]
  }
];

export const guaranteeFaqs: Array<{ question: string; answer: string }> = [
  {
    question: 'Gizli özellik açılan araç TÜVTÜRK muayenesinden geçer mi?',
    answer:
      'Evet, sorunsuz geçer. Yapılan işlemler aracın orijinal beyin yazılımında fabrika çıkışı mevcut olan konfor ve aydınlatma parametrelerini kapsar. Emisyon, fren, far yükseklik ayarı veya güvenlik ekipmanlarını olumsuz etkileyecek ağır kusur kapsamındaki hiçbir yapıya dokunulmaz.'
  },
  {
    question: 'Kodlama işlemi aracın garantisini bozar mı?',
    answer:
      'Bozmaz. İşlemler aracın kendi OBD soketi üzerinden, orijinal beyin yazılımının izin verdiği parametreler değiştirilerek yapılır. Kablo kesilmez, araca ek modül lehimlenmez ve donanım üzerinde kalıcı bir değişiklik bırakılmaz.'
  },
  {
    question: 'İşlem geri alınabiliyor mu?',
    answer:
      'Evet. Her işlem öncesinde aracın mevcut yazılım yapılandırmasının yedeği alınır. İstediğiniz zaman tek işlemle fabrika çıkışı ayarlarına geri dönülebilir; servise giderken bunu tercih eden müşterilerimiz oluyor.'
  },
  {
    question: 'İşlem ne kadar sürüyor?',
    answer:
      'Seçilen özellik sayısına göre değişmekle birlikte tipik bir kodlama seti ortalama 20 dakikada tamamlanır. Batarya sağlığı (SoH) ekspertizi ve raporlaması biraz daha uzun sürer.'
  },
  {
    question: 'Adrese servis nasıl işliyor?',
    answer:
      'Ankara genelinde, aracınızın bulunduğu adrese geliyoruz. Randevu sırasında marka, model ve yılını aldıktan sonra o araçta açılabilecek özelliklerin listesini ve süreyi önden paylaşıyoruz.'
  }
];

export const serviceDistricts = [
  'Altındağ',
  'Siteler',
  'Ulus',
  'Keçiören',
  'Çankaya',
  'Yenimahalle',
  'Batıkent',
  'Ostim',
  'Etimesgut',
  'Sincan',
  'Mamak',
  'Gölbaşı',
  'Pursaklar'
];

export interface GarageTestimonial {
  name: string;
  vehicle: string;
  text: string;
}

/**
 * Müşteri yorumları.
 *
 * Bilerek boş bırakıldı — uydurma yorum yayınlamıyoruz. Gerçek, izin alınmış
 * geri bildirimleri buraya ekleyin; bölüm ancak veri girildiğinde görünür.
 */
export const garageTestimonials: GarageTestimonial[] = [];

/** WhatsApp bağlantısı; numara tanımlı değilse null döner. */
export function whatsappLink(message: string): string | null {
  if (!garageContact.whatsapp) return null;
  return `https://wa.me/${garageContact.whatsapp}?text=${encodeURIComponent(message)}`;
}
