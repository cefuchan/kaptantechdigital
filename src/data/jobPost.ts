/**
 * İş ve Hizmet Talebi sayfası — içerik modeli.
 *
 * İşleyiş: ziyaretçi talebini yazar, talep bize ulaşır, kategorisine uyan
 * hizmet verenlerden oluşan WhatsApp ağımızda paylaşılır, gelen teklifler
 * talep sahibine iletilir. İki taraf da ücret ödemez.
 *
 * DİKKAT — metinler bugün gerçekten yapılabilen işi anlatır. Teklifler şu an
 * bize gelip talep sahibine iletiliyor; müşterinin teklifleri kendi başına
 * gördüğü bir panel HENÜZ YOK. O altyapı kurulunca buradaki "teklifleri size
 * iletiyoruz" ifadeleri panel diline çevrilmeli.
 */

export interface JobCategory {
  id: string;
  name: string;
  description: string;
  examples: string[];
}

/** JobPostForm'daki CATEGORIES dizisiyle birebir eşleşir. */
export const jobCategories: JobCategory[] = [
  {
    id: 'yazilim',
    name: 'Yazılım & Tasarım',
    description:
      'Web sitesi, e-ticaret, mobil uygulama, logo ve kurumsal kimlik işleri. Bu bizim kendi uzmanlık alanımız; talebe çoğu zaman doğrudan biz dönüyoruz.',
    examples: ['Kurumsal web sitesi', 'E-ticaret altyapısı', 'Logo ve kurumsal kimlik', 'SEO ve dijital reklam']
  },
  {
    id: 'tadilat',
    name: 'Ev Tadilat & Usta',
    description:
      'Boya, elektrik, tesisat, mobilya montajı ve tadilat işleri. Metrekare, oda sayısı ve malzemenin kime ait olduğunu yazmak, gelen teklifler arasındaki farkı en çok azaltan detaydır.',
    examples: ['3+1 daire boyama', 'Banyo tadilatı', 'Elektrik tesisatı', 'Mutfak dolabı montajı']
  },
  {
    id: 'nakliyat',
    name: 'Nakliyat & Taşımacılık',
    description:
      'Ev ve ofis taşıma, parça eşya nakliyesi. Kat bilgisi, asansör durumu ve taşınma tarihi teklifi doğrudan belirler; üçünü de yazın.',
    examples: ['Şehir içi ev taşıma', 'Ofis taşıma', 'Parça eşya nakliyesi', 'Asansörlü taşıma']
  },
  {
    id: 'temizlik',
    name: 'Temizlik',
    description:
      'Ev, ofis, inşaat sonrası ve detaylı temizlik. Alanın büyüklüğü ile temizliğin kapsamını ayrı ayrı yazmak gerekir.',
    examples: ['Detaylı ev temizliği', 'İnşaat sonrası temizlik', 'Düzenli ofis temizliği', 'Cam temizliği']
  },
  {
    id: 'diger',
    name: 'Diğer',
    description:
      'Yukarıdaki başlıklara girmeyen işler. Bu kategoride başlığı olabildiğince açık yazmak, talebin doğru kişiye ulaşmasının tek yolu.',
    examples: ['Fotoğraf ve video çekimi', 'Organizasyon', 'Danışmanlık', 'Özel ders']
  }
];

export interface JobStep {
  title: string;
  body: string;
}

/** "Nasıl çalışır" adımları — HowTo şemasını da besler. */
export const jobSteps: JobStep[] = [
  {
    title: 'Talebinizi yazın',
    body:
      'İşin başlığını, kategorisini, konumunu, bütçe aralığını ve detaylarını girin. Zorunlu alanlar başlık, detay, isim ve telefon; konum ile bütçe isteğe bağlıdır. Üyelik veya şifre istenmez.'
  },
  {
    title: 'Talebi hizmet veren ağımıza iletelim',
    body:
      'Talebiniz, kategorisine uyan hizmet verenlerden oluşan WhatsApp ağımızda paylaşılır. Herkese açık bir ilan panosunda yayınlanmaz ve telefon numaranız bu paylaşımda yer almaz — hizmet verenler yalnızca işin kendisini görür.'
  },
  {
    title: 'Teklifler size ulaşsın',
    body:
      'İlgilenen hizmet verenler fiyatlarını ve ne zaman başlayabileceklerini bildirir. Gelen teklifleri derleyip WhatsApp veya telefon üzerinden size iletiyoruz.'
  },
  {
    title: 'İstediğinizle anlaşın',
    body:
      'Teklifleri karşılaştırıp beğendiğinizle doğrudan görüşürsünüz. Hiçbir teklifi kabul etmek zorunda değilsiniz; anlaşsanız da anlaşmasanız da sizden komisyon alınmaz.'
  }
];

export interface JobTip {
  title: string;
  body: string;
}

/**
 * Talep yazma rehberi — sayfanın asıl arama karşılığı olan bölüm.
 * Genel geçer tavsiye değil; gelen tekliflerin tutarlılığını gerçekten
 * etkileyen noktalar.
 */
export const jobTips: JobTip[] = [
  {
    title: 'Başlığa işin kendisini yazın, sıfat yazmayın',
    body:
      '“Acil, kaliteli iş arıyorum” hiçbir şey anlatmaz; kimse buna fiyat veremez. “3+1 daire iç cephe boyama, Çankaya” yazan talep, doğru ustadan doğru teklifi alır.'
  },
  {
    title: 'Ölçü verin',
    body:
      'Metrekare, oda sayısı, kat, adet, süre. Sayı içeren talepler hem daha çok teklif çeker hem de gelen fiyatların birbirine yakın çıkmasını sağlar.'
  },
  {
    title: 'Malzeme kime ait, açıkça belirtin',
    body:
      'Tadilat ve temizlik işlerinde teklifler arasındaki farkın en büyük sebebi budur. “Malzeme bize ait” tek cümlesi pazarlığı baştan kısaltır.'
  },
  {
    title: 'Bütçeyi aralık olarak yazın',
    body:
      'Bütçe alanını boş bırakmak teklif sayısını düşürür. Bir aralık vermek, bütçenizin çok altında ya da çok üstünde çalışan kişilerle vakit kaybetmenizi önler.'
  },
  {
    title: 'Ne zaman başlanacağını söyleyin',
    body:
      '“Bu hafta” ile “önümüzdeki ay” arasında fiyat farkı vardır. Tarihi detay alanına yazmak, o tarihte müsait olmayan hizmet verenleri baştan eler.'
  }
];

export const jobFaqs: Array<{ question: string; answer: string }> = [
  {
    question: 'Talep oluşturmak ve teklif almak ücretli mi?',
    answer:
      'Hayır. Talep oluşturmak da teklif almak da tamamen ücretsizdir. Üyelik ücreti, ilan ücreti veya iş başına komisyon yoktur — hizmet verenler de teklif vermek için ücret ödemez.'
  },
  {
    question: 'Üye olmam veya giriş yapmam gerekiyor mu?',
    answer:
      'Hayır. Kayıt, şifre ya da e-posta doğrulaması istemiyoruz. Formu doldurup göndermeniz yeterli; iletişim için yalnızca isim ve telefon numarası gerekiyor.'
  },
  {
    question: 'Talebim nerede paylaşılıyor?',
    answer:
      'Talebiniz herkese açık bir ilan panosunda yayınlanmaz ve arama sonuçlarında çıkmaz. Yalnızca kategorisine uyan hizmet verenlerden oluşan WhatsApp ağımızda paylaşılır.'
  },
  {
    question: 'Hizmet verenler telefon numaramı görüyor mu?',
    answer:
      'Hayır. Ağa iletilen metinde yalnızca işin başlığı, kategorisi, konumu, bütçesi ve detayları yer alır; isminiz ve numaranız yer almaz. İletişim bilgisi ancak siz bir teklifle ilerlemeye karar verdiğinizde paylaşılır.'
  },
  {
    question: 'Kaç teklif alırım, ne kadar sürede?',
    answer:
      'Bunu garanti edemeyiz; kategoriye, konuma ve talebin ne kadar net yazıldığına göre değişir. Ölçü ve bütçe aralığı içeren talepler belirgin şekilde daha çok teklif alıyor. Talepleri hafta içi ve cumartesi 09:00–18:00 arasında gün içinde işleme alıyoruz.'
  },
  {
    question: 'Gelen teklifi kabul etmek zorunda mıyım?',
    answer:
      'Hayır. Teklifler bağlayıcı değildir; hiçbirini beğenmezseniz süreci orada bırakabilirsiniz. Bunun için de herhangi bir ücret ödemezsiniz.'
  },
  {
    question: 'Hangi şehirlerde çalışıyorsunuz?',
    answer:
      'Merkezimiz Ankara’da; tadilat, nakliyat ve temizlik gibi yerinde yapılan işlerde Ankara ve çevresine odaklanıyoruz. Web sitesi, e-ticaret, SEO ve tasarım gibi dijital işleri Türkiye’nin her yerinden uzaktan yürütebiliyoruz.'
  },
  {
    question: 'Usta veya hizmet veren olarak teklif vermek istiyorum, nasıl katılırım?',
    answer:
      'WhatsApp üzerinden bize yazmanız yeterli. Uzmanlık alanınızı ve çalıştığınız ilçeleri iletin, kategorinize uyan talepler geldiğinde sizinle paylaşalım. Ağa katılmak ve teklif vermek ücretsizdir; işi aldığınızda da sizden komisyon almıyoruz.'
  },
  {
    question: 'Verdiğim bilgiler ne oluyor?',
    answer:
      'Form verileri yalnızca talebinizi hizmet verenlere iletmek ve size dönüş yapmak için kullanılır. Numaranız pazarlama listelerine eklenmez, üçüncü taraflara satılmaz.'
  }
];
