/**
 * Hizmet sayfalarının içerik modeli. Sayfa bileşeninden ayrıldı; böylece
 * site haritası ve ön render süreçleri de aynı kaynağı okuyabiliyor.
 */
export interface ServiceSection {
  heading: string;
  paragraphs: string[];
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceEntry {
  title: string;
  slogan: string;
  description: string;
  details?: string[];
  whatWeDo: string[];
  whyUs: string;
  outcomes?: string[];
  sections?: ServiceSection[];
  faqs?: ServiceFaq[];
}

export const serviceData: Record<string, ServiceEntry> = {
  "seo": {
    title: "SEO",
    slogan: "Arama Motoru Optimizasyonu",
    description: "Web sitenizin organik arama sonuçlarında üst sıralarda yer alması tesadüf değildir. Kapsamlı teknik denetimler, otorite inşası ve veri odaklı içerik stratejileriyle uzun vadeli büyüme rotanızı çiziyoruz.",
    details: [
      "SEO çalışmasını yalnızca anahtar kelime sıralaması olarak görmüyoruz. Teknik altyapıyı, kullanıcı niyetini, içerik kalitesini ve dönüşüm yolculuğunu birlikte değerlendirerek markanızın doğru aramalarda görünmesini hedefliyoruz.",
      "Ankara'da ve Türkiye genelinde rekabet eden işletmeler için yerel arama fırsatlarını da plana dahil ediyoruz. Google İşletme Profili, konum odaklı sayfalar ve güven sinyalleri; organik trafiği nitelikli teklif ve satış fırsatlarına dönüştürmek için birlikte ele alınır."
    ],
    whatWeDo: [
      "Kapsamlı Teknik SEO Denetimi ve İyileştirmesi",
      "Anahtar Kelime ve Rakip Analizi",
      "İçerik Stratejisi ve Optimizasyonu",
      "Yerel SEO (Google İşletme Profili) Yönetimi",
      "Site Hızı ve Core Web Vitals Optimizasyonu",
      "Backlink ve Otorite İnşası"
    ],
    whyUs: "Standart SEO paketleri sunmuyoruz. Her sektörün arama dinamiği farklıdır; iş hedeflerinize doğrudan etki edecek en kârlı anahtar kelimelere odaklanıyoruz.",
    outcomes: ["Arama niyetine uygun kalıcı organik görünürlük", "Daha hızlı ve taranabilir web sayfaları", "Yerel aramalardan nitelikli müşteri adayları"],
    sections: [
      { heading: "SEO stratejisi ve arama niyeti", paragraphs: ["SEO çalışmasını yalnızca anahtar kelime sıralaması olarak görmeyiz. Teknik altyapıyı, kullanıcı niyetini, içerik kalitesini ve ziyaretçinin teklif alma yolculuğunu birlikte analiz ederiz. Böylece her sayfa gerçek bir kullanıcı sorusuna yanıt verirken işletmenizin ticari hedeflerini de destekler.", "Başlangıçta mevcut görünürlüğü, teknik engelleri, rakipleri ve içerik boşluklarını inceleriz. Sonuçları; öncelikli teknik iyileştirmeler, yeni sayfalar, içerik kümeleri ve dönüşüm noktalarını kapsayan uygulanabilir bir yol haritasına dönüştürürüz."] },
      { heading: "Siteler bölgesinde yerel SEO", paragraphs: ["Siteler web tasarım, siteler reklam ve siteler dijital pazarlama gibi yerel sorgularda görünürlük; yalnızca bu ifadeleri sayfaya eklemekle kazanılmaz. Hizmet sayfaları, Google İşletme Profili, konum sinyalleri, referanslar ve faydalı bölgesel içerikler birbiriyle tutarlı olmalıdır.", "Doğru kategori, güncel iletişim bilgileri, düzenli görseller, doğal müşteri yorumları ve net hizmet açıklamaları; potansiyel müşterinin markanıza güvenmesini kolaylaştırır. Organik trafiği nitelikli telefon, form ve mesaj taleplerine dönüştürmek için bu kanalları birlikte ele alırız."] },
      { heading: "Ölçümleme ve sürdürülebilir büyüme", paragraphs: ["Arama sıralamaları, organik trafik, sayfa etkileşimleri, form talepleri ve telefon aramaları düzenli olarak takip edilir. Bu verilerle hangi içeriğin geliştirilmesi, hangi sayfanın hızlandırılması ve hangi fırsatın önceliklendirilmesi gerektiğine karar veririz.", "Hedefimiz rakamlardan ibaret bir rapor değildir. İşletmeniz için düzenli olarak fırsat üreten, değişen arama alışkanlıklarına uyum sağlayan ve uzun vadede değer oluşturan bir organik görünürlük sistemi kurarız."] }
    ]
  },
  "geo": {
    title: "GEO / Yapay Zekâ Aramaları",
    slogan: "Geleceğin Arama Alışkanlıklarına Hazırlanın",
    description: "Kullanıcılar artık sadece Google'da aramıyor, yapay zekâ asistanlarına danışıyor. Markanızın ChatGPT, Gemini, Perplexity gibi platformlarda referans gösterilmesini sağlıyoruz.",
    details: [
      "GEO, markanızın yapay zekâ destekli arama deneyimlerinde doğru bağlamla görünmesini hedefler. Ürün, hizmet ve uzmanlık bilgilerinizin tutarlı, anlaşılır ve doğrulanabilir bir yapı içinde sunulmasını sağlar.",
      "İçerik mimarisi, yapılandırılmış veri, sık sorulan sorular ve dijital itibar sinyalleri birlikte çalışır. Bu yaklaşımı klasik SEO yatırımınızı destekleyen ölçülebilir bir içerik ve otorite planına dönüştürüyoruz."
    ],
    whatWeDo: [
      "AI Motorları İçin Bilgi Grafiği Optimizasyonu",
      "Marka Mention ve Otorite Çalışmaları",
      "Soru-Cevap ve Niyet Odaklı İçerik Üretimi",
      "Semantik Ağ Geliştirme",
      "Büyük Dil Modelleri (LLM) İçin Veri Yapılandırması"
    ],
    whyUs: "Geleneksel SEO'nun ötesine geçerek, markanızın yeni nesil yapay zekâ destekli arama platformlarında bir otorite ve güvenilir kaynak olarak algılanmasını sağlıyoruz.",
    outcomes: ["Yapay zekâ sistemlerinin kolayca anlayacağı içerik yapısı", "Marka uzmanlığını destekleyen tutarlı dijital sinyaller", "SEO ile birlikte gelişen geleceğe hazır görünürlük"],
    sections: [
      { heading: "GEO neden önemlidir?", paragraphs: ["Kullanıcılar giderek daha uzun ve bağlamlı sorular soruyor; yapay zekâ sistemleri ise yanıt üretirken güvenilir, anlaşılır ve tutarlı kaynakları değerlendirmeye çalışıyor. GEO, markanızın uzmanlık alanlarını bu yeni keşif deneyiminde doğru biçimde temsil etmesi için içerik ve veri yapısını geliştirir.", "GEO, SEO'nun yerine geçmez. Sağlam teknik SEO, açık hizmet sayfaları ve faydalı içerikler güçlü bir temel oluşturur. Bu temeli soru-cevap yapıları, semantik bağlam, yapılandırılmış veri ve doğrulanabilir marka bilgileriyle zenginleştiririz."] },
      { heading: "Marka bilgisini düzenlemek", paragraphs: ["Hizmet kapsamı, uzmanlık alanları, çalışma biçimi ve referanslar; web sitesi ve işletme profillerinde tutarlı bir dille anlatılmalıdır. Bu tutarlılık, hem kullanıcıların hem de arama sistemlerinin markanızın ne yaptığını doğru anlamasına yardım eder.", "Özellikle siteler dijital pazarlama veya siteler web tasarım gibi yerel ve hizmet odaklı sorgularda, yüzeysel iddialar yerine süreçleri ve uzmanlığı açıklayan özgün içerikler önem taşır. Kullanıcının sorusunu doğrudan yanıtlayan içerikler kalıcı değer üretir."] },
      { heading: "Geleceğe hazır içerik mimarisi", paragraphs: ["Temel hizmet sayfaları, sık sorulan sorular, vaka örnekleri ve rehber içerikler birbirini destekleyen bir bilgi yapısı oluşturur. Bu mimari, markanızın hangi konuda yetkin olduğunu daha iyi ifade etmesini sağlar.", "Düzenli güncellemelerle yeni sorulara, hizmet değişikliklerine ve sektörel gelişmelere uyum sağlarız. Böylece dijital varlığınız yalnızca bugünün aramalarında değil, değişen yapay zekâ destekli arama deneyimlerinde de güçlü kalır."] }
    ],
    faqs: [
      { question: "GEO nedir?", answer: "GEO, Generative Engine Optimization'ın kısaltmasıdır. Markanızın yapay zekâ destekli arama deneyimlerinde doğru, tutarlı ve güvenilir bir kaynak olarak anlaşılmasını destekleyen içerik, veri ve otorite çalışmalarını kapsar." },
      { question: "GEO ile SEO arasındaki fark nedir?", answer: "SEO; arama motoru sonuçlarında görünürlüğü hedefler. GEO ise bu teknik ve içerik temelini; yapay zekâ sistemlerinin bağlam, uzmanlık ve marka bilgisini daha iyi değerlendirebilmesi için semantik yapı ve doğrulanabilir bilgilerle güçlendirir." },
      { question: "GEO çalışması hangi kanalları kapsar?", answer: "Web sitesi hizmet sayfaları, SSS içerikleri, yapılandırılmış veri, marka profilleri, kaynak niteliğindeki rehberler ve tutarlı dijital itibar sinyalleri birlikte değerlendirilir." },
      { question: "GEO sonuçları nasıl takip edilir?", answer: "Organik görünürlük, marka aramaları, kaynak içeriklerin performansı, ilgili sorgular ve dönüşüm verileri düzenli izlenir. Yapay zekâ cevaplarındaki görünürlük değişken olabildiğinden kesin yer alma vaadi yerine sürdürülebilir bilgi kalitesi ve otorite hedeflenir." }
    ]
  },
  "web-tasarim": {
    title: "Web Tasarım",
    slogan: "Kullanıcı Deneyimi ve Dönüşüm Odaklı Mimari",
    description: "Bir web sitesi sadece güzel görünmemeli, ziyaretçileri müşteriye dönüştürmelidir. Hızlı, güvenli, SEO uyumlu ve marka kimliğinizi yansıtan dijital deneyimler tasarlıyoruz.",
    details: [
      "Web tasarım sürecini görsel bir proje olarak değil, dijital satış ve iletişim altyapınız olarak ele alıyoruz. Hedef kitlenizin karar yolculuğunu inceler; mesaj hiyerarşisini, kullanıcı akışlarını ve teklif alma noktalarını buna göre tasarlarız.",
      "Mobil öncelikli, erişilebilir ve performans odaklı sayfalar geliştiriyoruz. Böylece web siteniz arama motorlarının teknik beklentilerine cevap verirken ziyaretçilerin markanıza güvenmesini ve harekete geçmesini de kolaylaştırır."
    ],
    whatWeDo: [
      "UX/UI Tasarım ve Prototipleme",
      "Modern ve Hızlı Ön-yüz (Frontend) Geliştirme",
      "Mobil Öncelikli (Mobile-First) Mimari",
      "Dönüşüm Oranı Optimizasyonu (CRO)",
      "Güvenli ve Ölçeklenebilir Altyapı Kurulumu",
      "Performans ve Hız Optimizasyonu"
    ],
    whyUs: "Hazır şablonlar kullanmak yerine, markanızın hikayesine ve hedeflerine özel, teknik olarak kusursuz, el yapımı dijital platformlar inşa ediyoruz.",
    outcomes: ["Marka kimliğinizle uyumlu güçlü ilk izlenim", "Her ekranda akıcı kullanıcı deneyimi", "SEO ve reklam çalışmalarını destekleyen dönüşüm altyapısı"],
    sections: [
      { heading: "Siteler web tasarım yaklaşımımız", paragraphs: ["Siteler web tasarım projesi, hazır bir şablona logo yerleştirmekle başlamaz. Markanızın hedef kitlesini, hizmetlerini, ürünlerini ve müşterinin karar sürecini analiz eder; site haritasını ve içerik hiyerarşisini buna göre oluştururuz.", "Mobilya, üretim, perakende ve kurumsal hizmet işletmeleri için ürün kalitesini, üretim kapasitesini ve güven unsurlarını dijitalde net biçimde anlatmak gerekir. Güçlü görselleri ayrıntılı bilgiler, referanslar ve kolay iletişim alanlarıyla destekleriz."] },
      { heading: "Tasarım, performans ve SEO", paragraphs: ["Güzel görünen ancak yavaş açılan veya mobilde zor kullanılan bir site, potansiyel müşteriyi kaybettirir. Tasarım kararlarını mobil performans, erişilebilirlik, okunabilirlik ve Core Web Vitals kriterleriyle birlikte ele alırız.", "Başlık yapısı, sayfa URL'leri, görsel optimizasyonu ve içerik mimarisi daha tasarım aşamasında planlanır. Böylece site yayınlandığında SEO çalışmalarına uygun ve reklam kampanyalarından gelen ziyaretçileri karşılayabilecek teknik temele sahip olur."] },
      { heading: "Dönüşüm odaklı dijital deneyim", paragraphs: ["Teklif formu, telefon, WhatsApp ve yönlendirici çağrı metinleri ziyaretçinin karar sürecine doğal biçimde yerleştirilmelidir. Gereksiz karmaşıklığı azaltır, ihtiyacı olan bilgiyi doğru zamanda sunar ve iletişime geçmeyi kolaylaştırırız.", "Yayın sonrasında hangi sayfaların talep ürettiğini ve ziyaretçilerin nerede ayrıldığını ölçeriz. Web siteniz statik bir broşür değil, iş hedeflerinizle birlikte gelişen bir dijital satış kanalı olur."] }
    ]
  },
  "reklam": {
    title: "Google & Meta Reklam Yönetimi",
    slogan: "Veriye Dayalı, Hedef Odaklı Kampanyalar",
    description: "Reklam bütçenizi boşa harcamayın. Doğru hedef kitleye, doğru zamanda, doğru mesajla ulaşarak maksimum dönüşüm ve kârlılık (ROAS) elde etmenizi sağlıyoruz.",
    details: ["Reklam yönetiminde amaç sadece daha fazla tıklama almak değildir. Bütçenizi telefon aramalarına, form taleplerine, mağaza ziyaretlerine ve satış fırsatlarına dönüştürecek kampanya yapısını kurarız.", "Google ve Meta kanallarını hedef kitlenizin davranışına göre konumlandırır; reklam metni, görsel, açılış sayfası ve ölçümleme altyapısının aynı hedefe hizmet etmesini sağlarız."],
    whatWeDo: [
      "Kapsamlı Kampanya Mimarisi Kurulumu",
      "Arama Ağı (Search) ve Görüntülü (Display) Reklamlar",
      "Meta (Facebook, Instagram) Reklam Stratejileri",
      "Dinamik Yeniden Pazarlama (Remarketing)",
      "A/B Testleri ve Sürekli Optimizasyon",
      "Gelişmiş Dönüşüm İzleme ve Raporlama"
    ],
    whyUs: "Reklam harcamalarını bir gider değil, yatırım olarak görüyoruz. Sürekli optimizasyon ve şeffaf raporlama ile bütçenizin tam kontrolünü sağlıyoruz.",
    outcomes: ["Hedef kitleye uygun net kampanya mesajları", "Ölçülebilir form, arama ve satış fırsatları", "Test edilerek iyileştirilen verimli bütçe kullanımı"],
    sections: [
      { heading: "Siteler reklam kampanyası nasıl planlanır?", paragraphs: ["Siteler reklam kampanyalarında konum, ürün veya hizmet grubu ve müşteri niyeti ayrı ayrı ele alınır. Google Arama reklamları anlık ihtiyaçla araştırma yapan kişilere ulaşırken Meta reklamları marka bilinirliği, ürün keşfi ve yeniden pazarlama için planlanır.", "Her kampanya için net bir teklif ve ölçülebilir hedef belirleriz. Reklamın yönlendirdiği sayfa, reklamdaki vaatle tutarlı olmalı; ziyaretçi telefon, form veya mesaj yoluyla kolayca bir sonraki adıma geçebilmelidir."] },
      { heading: "Siteler reklam çekimi ile yaratıcı güç", paragraphs: ["Etkili reklam, dikkat çeken bir fikri doğru hedefleme ve açık bir teklif ile birleştirir. Görsel, video ve metin varyasyonlarını hedef kitlenin beklentisine göre üretir; hangi mesajın daha yüksek etkileşim ve talep getirdiğini düzenli olarak test ederiz.", "Siteler reklam çekimi ihtiyacında ürününüzü, üretim sürecinizi veya hizmet deneyiminizi gösteren özgün içerikler planlarız. Bu içerikler yalnızca dikkat çekmek için değil; reklam mesajını somutlaştırmak ve markaya güven kazandırmak için kullanılır."] },
      { heading: "Raporlama ve bütçe optimizasyonu", paragraphs: ["Kampanyaları yayınlamak başlangıçtır. Arama terimleri, tıklama maliyetleri, dönüşüm oranları, form ve telefon talepleri düzenli olarak incelenir. İşe yaramayan hedeflemeler azaltılır; güçlü kampanya ve yaratıcılar kontrollü biçimde ölçeklenir.", "Anlaşılır raporlarla hangi kanalın ne sonuç ürettiğini görünür kılarız. Böylece siteler dijital pazarlama bütçeniz tahmine göre değil, ticari hedeflerinizle ilişkilendirilmiş verilere göre yönetilir."] }
    ]
  },
  "video-produksiyon": {
    title: "Video Prodüksiyon",
    slogan: "Markanızın Hikayesini Görselleştirin",
    description: "Etkileyici görsel anlatımla markanızın algısını yükseltin. Kurumsal tanıtım filmlerinden kısa sosyal medya içeriklerine kadar profesyonel prodüksiyon hizmetleri sunuyoruz.",
    details: ["Video prodüksiyonu, bir çekim gününden çok daha fazlasıdır. Hedef kitlenizi, kullanılacağı kanalları ve vermek istediğiniz mesajı belirleyerek senaryo, çekim ve kurgu sürecini markanızın iş hedefleriyle uyumlu biçimde yönetiriz.", "Kurumsal tanıtım, ürün videosu, sosyal medya içeriği ve reklam filmi ihtiyaçlarında güçlü görsel anlatımı performans pazarlaması ve marka iletişimiyle birleştiririz."],
    whatWeDo: [
      "Kurumsal Tanıtım Filmleri",
      "Sosyal Medya Video İçerikleri (Reels, Shorts)",
      "Ürün ve Hizmet Tanıtım Videoları",
      "Röportaj ve Belgesel Çekimleri",
      "Post-Prodüksiyon (Kurgu, Renk, Ses)",
      "Drone Çekimleri"
    ],
    whyUs: "Sinematik kaliteyi dijital pazarlama stratejisiyle birleştiriyoruz. Sadece güzel görünen değil, mesajınızı en etkili şekilde ileten videolar üretiyoruz.",
    outcomes: ["Markanın uzmanlığını görünür kılan güçlü hikâye", "Reklam ve sosyal medya için çok formatlı içerikler", "Güven ve etkileşimi artıran profesyonel görsel dil"],
    sections: [
      { heading: "Siteler reklam çekimi ile marka hikâyesi", paragraphs: ["Siteler reklam çekimi, üretiminizi, ürün detaylarınızı ve işçiliğinizi potansiyel müşteriye hissettiren etkili bir iletişim aracıdır. Çekim öncesinde ürünleri, mekânı, hedef kitleyi ve kullanım kanallarını değerlendirir; her sahnenin vermesi gereken mesajı belirleriz.", "Kurumsal film, ürün tanıtımı, sosyal medya Reels içeriği ve performans reklamı için farklı kurgu ihtiyaçları vardır. Tek bir çekim planını bu formatları destekleyecek biçimde tasarlayarak içerik yatırımınızın farklı kanallarda verimli kullanılmasını sağlarız."] },
      { heading: "Siteler drone çekimi ile güçlü perspektif", paragraphs: ["Siteler drone çekimi; showroom, tesis, üretim alanı, proje ve geniş mekânları etkileyici bir perspektifle göstermek için kullanılır. Havadan görüntüler anlatıya ölçek ve güven katar; izleyicinin markanızın çalışma ortamını daha hızlı kavramasına yardımcı olur.", "Drone görüntülerini tek başına bir efekt olarak değil, hikâyenin doğal bir parçası olarak kullanırız. Çekim planı, güvenlik koşulları, ışık, mekân akışı ve kurgu ritmi hedeflenen iletişim etkisine göre önceden hazırlanır."] },
      { heading: "Fikirden yayına uçtan uca prodüksiyon", paragraphs: ["Brief ve yaratıcı konseptle başlayan süreç; senaryo, çekim planı, ekipman, mekân koordinasyonu, çekim ve post-prodüksiyon aşamalarıyla ilerler. Kurgu, renk düzenleme, ses tasarımı ve altyazı seçenekleri videonun kullanılacağı platforma göre hazırlanır.", "Yayın sonrası içerikleri web siteniz, sosyal medya hesaplarınız ve reklam kampanyalarınızda nasıl değerlendirebileceğinizi de planlarız. Böylece video yalnızca izlenen bir içerik değil; marka bilinirliğini ve talep yaratma sürecini destekleyen ölçülebilir bir varlığa dönüşür."] }
    ]
  }
};

export const serviceSlugs = Object.keys(serviceData);

export function findService(slug?: string): ServiceEntry | undefined {
  return slug ? serviceData[slug] : undefined;
}
