/**
 * İş ve Hizmet Talebi sayfası — içerik modeli.
 *
 * Sayfanın gerçekte yaptığı iş: ziyaretçi formu doldurur, talep KAPTAN'a
 * ulaşır, ekip WhatsApp veya telefondan geri döner. Hizmet veren havuzu,
 * otomatik teklif toplama veya ilan yayını YOKTUR — metinler bu gerçeğe göre
 * yazıldı. (bkz. src/components/JobPostForm.tsx)
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
      'Web sitesi, e-ticaret, mobil uygulama, logo ve kurumsal kimlik işleri. Kendi uzmanlık alanımız olduğu için bu kategoride talebe genelde aynı gün dönüyoruz.',
    examples: ['Kurumsal web sitesi', 'E-ticaret altyapısı', 'Logo ve kurumsal kimlik', 'SEO ve dijital reklam']
  },
  {
    id: 'tadilat',
    name: 'Ev Tadilat & Usta',
    description:
      'Boya, elektrik, tesisat, mobilya montajı ve tadilat işleri. Metrekare, oda sayısı ve malzemenin kime ait olduğunu yazmak fiyat farkını en çok azaltan detaydır.',
    examples: ['3+1 daire boyama', 'Banyo tadilatı', 'Elektrik tesisatı', 'Mutfak dolabı montajı']
  },
  {
    id: 'nakliyat',
    name: 'Nakliyat & Taşımacılık',
    description:
      'Ev ve ofis taşıma, parça eşya nakliyesi. Kat bilgisi, asansör durumu ve taşınma tarihi fiyatı doğrudan belirler.',
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
      'Yukarıdaki başlıklara girmeyen işler. Bu kategoride başlığı olabildiğince açık yazmak, doğru kişiye ulaşmanın tek yolu.',
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
      'İşin başlığını, kategorisini, konumunu, bütçe aralığını ve detaylarını girin. Zorunlu alanlar başlık, detay, isim ve telefon; konum ile bütçe isteğe bağlıdır.'
  },
  {
    title: 'Talep bize ulaşsın',
    body:
      'Formu gönderdiğinizde talebiniz doğrudan bize düşer. Üyelik, şifre veya e-posta doğrulaması istenmez; ilan hiçbir yerde herkese açık yayınlanmaz.'
  },
  {
    title: 'Sizi arayalım',
    body:
      'Talebi inceleyip WhatsApp veya telefon üzerinden geri dönüyoruz. İşi ister biz yaparız, ister tanıdığımız doğru ekibe yönlendiririz — her iki durumda da sizden komisyon alınmaz.'
  }
];

export interface JobTip {
  title: string;
  body: string;
}

/**
 * Talep yazma rehberi — sayfanın asıl arama karşılığı olan bölüm.
 * Genel geçer tavsiye değil; gelen fiyatların tutarlılığını gerçekten
 * etkileyen noktalar.
 */
export const jobTips: JobTip[] = [
  {
    title: 'Başlığa işin kendisini yazın, sıfat yazmayın',
    body:
      '“Acil, kaliteli iş arıyorum” hiçbir şey anlatmaz. “3+1 daire iç cephe boyama, Çankaya” yazan talep, doğru ustadan doğru fiyatı alır.'
  },
  {
    title: 'Ölçü verin',
    body:
      'Metrekare, oda sayısı, kat, adet, süre. Sayı içeren talepler hem daha hızlı yanıtlanır hem de gelen fiyatların birbirine yakın çıkmasını sağlar.'
  },
  {
    title: 'Malzeme kime ait, açıkça belirtin',
    body:
      'Tadilat ve temizlik işlerinde fiyat farkının en büyük sebebi budur. “Malzeme bize ait” tek cümlesi pazarlığı baştan kısaltır.'
  },
  {
    title: 'Bütçeyi aralık olarak yazın',
    body:
      'Bütçe alanını boş bırakmak dönüşü yavaşlatır. Bir aralık vermek, bütçenizin çok altında ya da çok üstünde çalışan kişilerle vakit kaybetmenizi önler.'
  },
  {
    title: 'Ne zaman başlanacağını söyleyin',
    body:
      '“Bu hafta” ile “önümüzdeki ay” arasında fiyat farkı vardır. Tarihi detay alanına yazmak, uygun olmayan seçenekleri baştan eler.'
  }
];

export const jobFaqs: Array<{ question: string; answer: string }> = [
  {
    question: 'Talep oluşturmak ücretli mi?',
    answer:
      'Hayır. Talep oluşturmak ve fiyat öğrenmek tamamen ücretsizdir. Üyelik ücreti, ilan ücreti veya teklif başına komisyon yoktur.'
  },
  {
    question: 'Üye olmam gerekiyor mu?',
    answer:
      'Hayır. Kayıt, şifre ya da e-posta doğrulaması istemiyoruz. Formu doldurup göndermeniz yeterli; iletişim için yalnızca isim ve telefon numarası gerekiyor.'
  },
  {
    question: 'Talebim herkese açık bir yerde yayınlanıyor mu?',
    answer:
      'Hayır. Talebiniz herkese açık bir ilan panosunda yayınlanmaz; doğrudan bize ulaşır. Numaranız arama sonuçlarında veya bir ilan listesinde görünmez.'
  },
  {
    question: 'Ne kadar sürede dönüş yapıyorsunuz?',
    answer:
      'Talepleri hafta içi 09:00–18:00 arası, cumartesi dâhil olmak üzere gün içinde inceliyoruz. Yazılım ve tasarım taleplerine genellikle aynı gün, diğer kategorilerde ise doğru ekibi bulduğumuzda dönüş yapıyoruz.'
  },
  {
    question: 'Hangi şehirlerde hizmet veriyorsunuz?',
    answer:
      'Merkezimiz Ankara’da; tadilat, nakliyat ve temizlik gibi yerinde yapılan işlerde Ankara ve çevresine odaklanıyoruz. Web sitesi, e-ticaret, SEO ve tasarım gibi dijital işleri Türkiye’nin her yerinden uzaktan yürütebiliyoruz.'
  },
  {
    question: 'Bu bir hizmet veren pazaryeri mi?',
    answer:
      'Hayır. Binlerce hizmet vereni listeleyen bir pazaryeri değiliz; talebinizi alıp size tek tek dönen küçük bir ekibiz. İşi ya kendimiz yaparız ya da daha önce birlikte çalıştığımız güvendiğimiz bir ekibe yönlendiririz. Aracılık için sizden ücret talep etmiyoruz.'
  },
  {
    question: 'Verdiğim bilgiler ne oluyor?',
    answer:
      'Form verileri yalnızca talebinizi değerlendirmek ve size dönüş yapmak için kullanılır. Numaranız pazarlama listelerine eklenmez, üçüncü taraflara satılmaz.'
  }
];
