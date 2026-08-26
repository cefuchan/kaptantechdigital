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
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "dynomark",
    client: "Dynomark Ordu Oto Ekspertiz",
    service: "SEO & GEO",
    metric: "1. Sıra",
    description: "3 ay içinde yerel arama sonuçlarında ilk sıraya yerleştik, organik trafik %180 arttı, Google Haritalar üzerinden gelen aramalar 4 kat büyüdü.",
    tags: ["SEO", "GEO", "Yerel Arama"]
  },
  {
    id: "bs-mimarlik",
    client: "BS Mimarlık",
    service: "SEO & Web Tasarım",
    metric: "%300",
    description: "Yeniden tasarlanan site ve teknik SEO çalışmasıyla hedef anahtar kelimelerin tamamında ilk sayfaya yerleşti, aylık teklif talepleri 3 kattan fazla arttı.",
    tags: ["SEO", "Web Tasarım"]
  },
  {
    id: "trinvest",
    client: "TRNVEST",
    service: "Google Ads & Meta",
    metric: "2.5x",
    description: "Yeniden yapılandırılan kampanya mimarisi ve sürekli optimizasyonla reklam bütçesi aynı kalırken nitelikli lead sayısı 2.5 kat arttı.",
    tags: ["Reklam", "Lead Generation"]
  },
  {
    id: "mk-psikoloji",
    client: "MK Psikoloji",
    service: "Yerel SEO & Reklam",
    metric: "%220",
    description: "Google Business profili optimizasyonu, yerel içerik stratejisi ve hedefli reklamlarla haftalık randevu talepleri iki katından fazla arttı.",
    tags: ["SEO", "GEO", "Reklam"]
  },
  {
    id: "torun-insaat",
    client: "Torun İnşaat",
    service: "Web Tasarım & Reklam",
    metric: "3x",
    description: "Kurumsal kimlikle uyumlu yeni web sitesi ve hedefli reklam kampanyalarıyla ilk ayda potansiyel müşteri formları katlanarak arttı.",
    tags: ["Web Tasarım", "Reklam"]
  },
  {
    id: "deccrane",
    client: "Deccrane",
    service: "SEO & İçerik",
    metric: "Top 8",
    description: "Endüstriyel B2B içerik stratejisiyle teknik arama terimlerinde görünürlük kazandı, sektör kelimelerinde ilk sayfada 8 pozisyon elde edildi.",
    tags: ["SEO", "İçerik Stratejisi"]
  }
];

export const caseStudySlugs = caseStudiesData.map((study) => study.id);

export function findCaseStudy(slug?: string): CaseStudy | undefined {
  return caseStudiesData.find((study) => study.id === slug);
}
