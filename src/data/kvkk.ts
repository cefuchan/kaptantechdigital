/**
 * KVKK aydınlatma metni içeriği.
 *
 * Metinler, sistemin BUGÜN gerçekten yaptığı işi anlatır. Kurulmamış bir
 * mekanizmayı tarif etmek, aydınlatma metninde beyan edilen taahhüt olduğu
 * için normal pazarlama metninden daha ağır sonuç doğurur.
 *
 * Bir şey değiştiğinde (teklif formu eklenmesi, altyapı taşınması, yeni bir
 * hizmet sağlayıcı) bu dosya da güncellenmelidir.
 */

/** Saklama süresi — hem burada hem gruba verilen sözde aynı olmalı. */
export const RETENTION_DAYS = 30;

export interface KvkkSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export const kvkkSections: KvkkSection[] = [
  {
    id: 'veri-sorumlusu',
    heading: 'Veri sorumlusu kim?',
    paragraphs: [
      'Bu form ve bağlı hizmet, Ankara merkezli KAPTAN Dijital Büyüme Stüdyosu tarafından yürütülmektedir. 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla hareket eden taraf KAPTAN Dijital Büyüme Stüdyosu’dur.',
      'Her türlü talep, soru ve veri silme başvurusu için merhaba@kaptantechdigital.com adresine yazabilir veya sitede belirtilen telefon numarasından ulaşabilirsiniz.'
    ]
  },
  {
    id: 'hangi-veriler',
    heading: 'Hangi verileri topluyoruz?',
    paragraphs: [
      'İş ve hizmet talebi formunu doldurduğunuzda yalnızca şu bilgiler kaydedilir:'
    ],
    bullets: [
      'Ad, soyad veya şirket adı',
      'Telefon numarası',
      'Talebin başlığı, kategorisi, konumu, bütçe aralığı ve açıklaması',
      'Talebin oluşturulduğu tarih ve saat',
      'İletişim bilginizin hizmet verenlerle paylaşılmasına onay verip vermediğiniz'
    ]
  },
  {
    id: 'nasil-kullaniliyor',
    heading: 'Verileriniz ne için kullanılıyor?',
    paragraphs: [
      'Talebiniz, kategorisine uyan hizmet verenlerden oluşan WhatsApp ağımızda paylaşılır ve size teklif ulaştırılması amacıyla işlenir. Bunun dışında bir amaçla kullanılmaz.',
      'Verileriniz pazarlama listelerine eklenmez, reklam amacıyla kullanılmaz, üçüncü taraflara satılmaz ve devredilmez.'
    ]
  },
  {
    id: 'kiminle-paylasiliyor',
    heading: 'Kimlerle paylaşılıyor?',
    paragraphs: [
      'Hizmet veren ağına iletilen metinde yalnızca işin kendisi yer alır: başlık, kategori, konum, bütçe ve açıklama. Adınız ve telefon numaranız bu paylaşımda yer almaz.',
      'İletişim bilgileriniz iki durumda paylaşılır:'
    ],
    bullets: [
      'Formu doldururken “iletişim bilgilerim paylaşılabilir” kutusunu işaretlerseniz, bilgileriniz talebinizle birlikte hizmet verenlere iletilir.',
      'Bu kutuyu işaretlemezseniz bilgileriniz kimseyle paylaşılmaz; gelen teklifleri size biz ulaştırırız ve seçtiğiniz kişiye ulaşma kararı tamamen sizde kalır.'
    ]
  },
  {
    id: 'saklama',
    heading: 'Ne kadar süre saklanıyor?',
    paragraphs: [
      `Talebiniz sonuçlandığında veya siz talebi geri çektiğinizde, kişisel verileriniz en geç ${RETENTION_DAYS} gün içinde kayıtlarımızdan silinir. Silme işlemi düzenli aralıklarla ve toplu olarak yürütülür.`,
      'Şeffaf olmak adına bir noktayı belirtmek isteriz: WhatsApp ağımızda paylaşılan mesajlar WhatsApp’ın kendi sunucularında ve grup üyelerinin cihazlarında kalabilir. Bu mesajlarda adınız ve numaranız yer almadığı için kişisel veri taşımaz; ancak WhatsApp üzerindeki içerik teknik olarak bizim silme yetkimizin dışındadır.'
    ]
  },
  {
    id: 'nerede-tutuluyor',
    heading: 'Veriler nerede tutuluyor?',
    paragraphs: [
      'Form kayıtları, Google Sheets üzerinde tutulan ve SheetDB servisi aracılığıyla yazılan bir tabloda saklanır. Tabloya yalnızca KAPTAN yetkilisi erişebilir.',
      'Bu servisler yurt dışında sunucu kullanabilir; formu göndererek verilerinizin bu altyapılarda işlenmesine onay vermiş olursunuz.'
    ]
  },
  {
    id: 'haklariniz',
    heading: 'Haklarınız neler?',
    paragraphs: [
      'KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme ve işlenmesine itiraz etme haklarına sahipsiniz.',
      'Bu haklardan herhangi birini kullanmak için merhaba@kaptantechdigital.com adresine yazmanız yeterlidir. Talebiniz en geç 30 gün içinde sonuçlandırılır ve ücret talep edilmez.'
    ]
  }
];

/**
 * Hizmet veren (freelancer) tarafına gösterilecek kısa bilgilendirme.
 * Şu an teklifler WhatsApp üzerinden alındığı için bu metin grupta
 * sabitlenmek üzere hazırlandı; ileride bir teklif formu eklenirse
 * formun altına da konmalıdır.
 */
export const providerNotice = [
  'Bir talebe teklif verdiğinizde, teklifiniz ve iletişim bilgileriniz yalnızca o talebi oluşturan kişiyle paylaşılır.',
  'Teklifiniz başka hizmet verenlerle, üçüncü taraflarla veya herkese açık bir yerde paylaşılmaz.',
  `Talep sonuçlandıktan sonra teklif kayıtlarınız en geç ${RETENTION_DAYS} gün içinde silinir.`,
  'Ağa katılmak, teklif vermek ve iş almak ücretsizdir; hiçbir aşamada komisyon alınmaz.'
];
