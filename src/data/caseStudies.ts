/**
 * Vaka çalışması verisi. Sayfa bileşeninden ayrıldı; site haritası ve
 * ön render bu listeyi doğrudan okur.
 */
export interface CaseStudy {
  id: string;
  client: string;
  service: string;
  metric: string;
  description: string;
  tags: string[];
  /** Sektör — vaka sayfasının Article şemasındaki `about` alanı. */
  industry?: string;
  /** Çalışmanın yürütüldüğü dönem, örn. "2024". */
  period?: string;
  /**
   * Anlatı bölümleri. Üçü birden doldurulduğunda vaka sayfası tam içerikli
   * ve indekslenebilir olur; eksikse sayfa `noindex` yayınlanır.
   */
  narrative?: {
    challenge: string;
    approach: string;
    result: string;
  };
}

/**
 * Öne çıkan sonuç metni her zaman "%300" gibi kısa olmuyor; sayısal karşılığı
 * olmayan projelerde cümleye yakın bir ifade kullanılıyor. Metin uzunluğuna
 * göre punto düşürerek dev başlığın taşmasını önlüyoruz.
 */
export function metricSizeClass(metric: string, scale: 'card' | 'hero'): string {
  const long = metric.length > 14;
  const medium = metric.length > 8;

  if (scale === 'hero') {
    if (long) return 'text-3xl md:text-5xl';
    if (medium) return 'text-4xl md:text-6xl';
    return 'text-6xl md:text-8xl';
  }

  if (long) return 'text-2xl';
  if (medium) return 'text-3xl';
  return 'text-5xl';
}

/** Anlatısı tamamlanmış vakalar indekslenir, diğerleri noindex kalır. */
export function isCaseStudyComplete(study: CaseStudy): boolean {
  return Boolean(
    study.narrative?.challenge?.trim() &&
      study.narrative?.approach?.trim() &&
      study.narrative?.result?.trim()
  );
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "dynomark",
    client: "Dynomark Ordu Oto Ekspertiz",
    service: "Google Ads",
    metric: "1.000 potansiyel müşteri",
    description:
      "Aylık 1.000 TL bütçeyle 3 müşteriye ulaşan Google Ads hesabını arama niyetine göre yeniden kurguladık; 1.500 TL bütçeyle 1.000 potansiyel müşteriye ulaşıldı.",
    industry: "Oto Ekspertiz",
    tags: ["Google Ads", "Performans Pazarlaması"],
    narrative: {
      challenge:
        "Dynomark bize geldiğinde aylık 1.000 TL'lik Google Ads bütçesiyle yalnızca 3 müşteriye ulaşabiliyordu. Harcamanın önemli bir bölümü, oto ekspertiz hizmetini gerçekten arayan kullanıcılara ulaşmayan aramalara gidiyordu.",
      approach:
        "Kampanyayı arama niyeti üzerine yeniden kurguladık. Doğru anahtar kelime seçimi ve yeniden düzenlenen kampanya stratejisiyle bütçeyi, hizmeti doğrudan arayan kullanıcılara yönlendirdik.",
      result:
        "Aylık 1.500 TL bütçeyle 1.000 potansiyel müşteriye ulaşıldı. Reklam harcaması %50 artarken, bütçenin ürettiği potansiyel müşteri sayısı bununla kıyaslanamayacak ölçüde büyüdü."
    }
  },
  {
    id: "bs-mimarlik",
    client: "BS Mimarlık",
    service: "Web Tasarım",
    metric: "Ayda 2.500 TL tasarruf",
    description:
      "Her yeni proje için ayda 2.500 TL baskı gideri çıkaran basılı portfolyo yerine, ekibin kendi güncellediği hızlı bir web sitesi kurduk.",
    industry: "İç Mimarlık",
    tags: ["Web Tasarım", "Portfolyo"],
    narrative: {
      challenge:
        "BS Mimarlık, tamamladığı her yeni proje için portfolyosunu güncellemek üzere basılı yayın hazırlatıyordu. Bu, ayda 2.500 TL'lik sabit bir baskı maliyeti anlamına geliyor ve yeni işlerin paylaşılmasını yavaşlatıyordu.",
      approach:
        "Portfolyoyu merkeze alan, hızlı açılan ve ekibin kendi başına yönetebileceği bir web sitesi kurduk.",
      result:
        "Aylık 2.500 TL'lik baskı gideri tamamen ortadan kalktı — yılda 30.000 TL. Yeni bir proje tamamlandığında portfolyo tek tuşla güncelleniyor ve site sürekli güncel kalıyor."
    }
  },
  {
    id: "trinvest",
    client: "TRNVEST",
    service: "Google Ads & Meta",
    metric: "2.5x",
    description: "Yeniden yapılandırılan kampanya mimarisi ve sürekli optimizasyonla reklam bütçesi aynı kalırken nitelikli lead sayısı 2.5 kat arttı.",
    industry: "Gayrimenkul",
    tags: ["Reklam", "Lead Generation"],
    narrative: {
      challenge:
        "Gayrimenkul ve yatırım projelerinde reklam maliyetleri yükselirken, gelen formların büyük kısmı alım gücü olmayan veya yanlış beklentiye sahip kullanıcılardan oluşuyordu. Reklam bütçesi verimsiz harcanıyordu.",
      approach:
        "Google Arama ve Meta reklamlarında hedef kitle filtrelerini sıkılaştırdık. Açılış sayfalarındaki formları nitelikli yatırımcıları filtreleyecek sorularla yeniden tasarladık ve arama terimlerini negatif anahtar kelimelerle arındırdık.",
      result:
        "Toplam reklam harcaması artırılmadan nitelikli müşteri adayı (lead) hacmi 2.5 katına çıktı. Satış ekibinin geri dönüş süresi ve satışa dönüşme oranı hissedilir şekilde yükseldi."
    }
  },
  {
    id: "mk-psikoloji",
    client: "MK Psikoloji",
    service: "Sosyal Medya & İçerik Prodüksiyon",
    metric: "30+ müşteri adayı",
    description:
      "Rastgele içerik üretimi yerine kurumsal odaklı bir sosyal medya planı kurduk; planlı akış 30'un üzerinde potansiyel müşteri adayı üretti.",
    industry: "Klinik Psikoloji",
    tags: ["Sosyal Medya", "İçerik Prodüksiyon"],
    narrative: {
      challenge:
        "Bizden önce içerikler düşük performanslı kameralarla ve bir plan olmadan üretiliyordu. Paylaşımlar birbirini desteklemediği için kurumsal bir algı oluşmuyor, üretilen içerik talebe dönüşmüyordu.",
      approach:
        "Kurumsal kimliğe uygun bir içerik planı çıkardık. Çekimleri profesyonel ekipmanla ve hedef kitleye yönelik bir kurguyla yaparak düzenli bir yayın akışı kurduk.",
      result:
        "Planlı ve hedefe yönelik içerik akışı, 30'un üzerinde potansiyel müşteri adayı üretti."
    }
  },
  {
    id: "torun-insaat",
    client: "Torun İnşaat",
    service: "Web Tasarım & Reklam",
    metric: "3x",
    description: "Kurumsal kimlikle uyumlu yeni web sitesi ve hedefli reklam kampanyalarıyla ilk ayda potansiyel müşteri formları katlanarak arttı.",
    industry: "İnşaat & Taahhüt",
    tags: ["Web Tasarım", "Reklam"],
    narrative: {
      challenge:
        "Torun İnşaat'ın eski web sitesi mobil uyumsuzdu ve tamamlanan konut/ticari projelerin prestijini yansıtmaktan uzaktı. Bölgesel aramalarda görünürlük düşüktü ve dijitalden yeni proje talebi gelmiyordu.",
      approach:
        "Projelerin görsel zenginliğini öne çıkaran, hızlı açılan ve doğrudan WhatsApp / form butonları içeren kurumsal bir web sitesi geliştirdik. Eş zamanlı olarak Ankara yerelinde hedefli Google Ads kampanyaları başlattık.",
      result:
        "Yeni web sitesi lansmanının ardından ilk 30 günde gelen proje ve daire teklif talepleri 3 katına çıktı. Ziyaretçilerin sitede geçirdiği ortalama süre %140 arttı."
    }
  },
  {
    id: "deccrane",
    client: "Deccrane",
    service: "Web Performans Optimizasyonu",
    metric: "10x hız",
    description:
      "Gereksiz eklentileri kaldırıp performans odaklı bir yapı kurarak siteyi yaklaşık 10 kat hızlandırdık.",
    industry: "Vinç & İmalat Sanayi",
    tags: ["Web Performansı", "Core Web Vitals"],
    narrative: {
      challenge:
        "Deccrane'in mevcut sitesi son derece yavaş açılıyordu. Ziyaretçinin sayfanın yüklenmesini beklemesi gerekiyor; bu da hem kullanıcı deneyimini hem de arama motoru performansını doğrudan olumsuz etkiliyordu.",
      approach:
        "Siteyi baştan inceledik, gereksiz eklentileri kaldırdık ve performans odaklı bir yapı kurduk.",
      result:
        "Site yaklaşık 10 kat hızlandı; sayfalar ziyaretçiyi bekletmeden açılır hâle geldi."
    }
  }
];

export const caseStudySlugs = caseStudiesData.map((study) => study.id);

export function findCaseStudy(slug?: string): CaseStudy | undefined {
  return caseStudiesData.find((study) => study.id === slug);
}
