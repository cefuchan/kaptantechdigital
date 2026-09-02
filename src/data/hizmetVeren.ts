/**
 * Hizmet veren (usta / freelancer) tarafı için sayfa içeriği.
 *
 * Bu sayfa gruba atılan kalıcı linktir. Üç işi birden görür:
 *  1. Ağın nasıl çalıştığını anlatır (her yeni katılana tekrar anlatmamak için)
 *  2. /is-talebi formunun İŞVERENLER için olduğunu net söyler — freelancer'lar
 *     o formu kendini tanıtmak için dolduruyordu
 *  3. Veri politikasını özetler ve /kvkk sayfasına bağlar
 *
 * Metinler bugün gerçekten yapılabilen işi anlatır. Teklif formu, panel veya
 * otomatik eşleştirme YOK; teklifler WhatsApp üzerinden alınıyor.
 */
import { RETENTION_DAYS } from './kvkk';

export interface ProviderStep {
  title: string;
  body: string;
}

export const providerSteps: ProviderStep[] = [
  {
    title: 'Ağa katılın',
    body:
      'WhatsApp’tan yazın; uzmanlık alanınızı ve çalıştığınız ilçeleri iletin. Kayıt formu, üyelik ücreti veya sözleşme yok. Kategorinize uyan talepler geldiğinde sizinle paylaşılır.'
  },
  {
    title: 'Talepleri görün',
    body:
      'İşveren bir talep oluşturduğunda, kategorisine uyan hizmet verenlerle paylaşırız. Talepte işin ne olduğu, konumu, bütçe aralığı ve detayları yer alır.'
  },
  {
    title: 'İlgilendiğinize teklif verin',
    body:
      'Fiyatınızı ve ne zaman başlayabileceğinizi yazıp mesajı yanıtlayın. Teklif vermek zorunlu değil; ilgilenmediğiniz işi geçersiniz. Teklif başına ücret alınmaz.'
  },
  {
    title: 'Doğrudan anlaşın',
    body:
      'Talep sahibi teklifleri değerlendirir ve seçtiği kişiyle iletişime geçer. Anlaşma doğrudan sizinle işveren arasındadır; araya girmez, komisyon almayız.'
  }
];

export const providerFaqs: Array<{ question: string; answer: string }> = [
  {
    question: 'Gerçekten komisyon yok mu? Peki bu iş nasıl sürüyor?',
    answer:
      'Komisyon yok, üyelik ücreti yok, teklif başına ücret yok. Sürdürülebilir olmasının sebebi iyi niyet değil, basit bir gerçek: KAPTAN bir dijital büyüme stüdyosu. Ağa gelen web sitesi, e-ticaret, SEO ve reklam işlerini kendimiz yapıyoruz. Diğer kategorileri komisyonsuz dağıtmak bize daha büyük ve daha nitelikli bir işveren havuzu kazandırıyor. Yani kazancımız sizden değil, ağın büyümesinden geliyor — bu yüzden kapanmaz.'
  },
  {
    question: 'Sitedeki iş talebi formunu ben de doldurmalı mıyım?',
    answer:
      'Hayır. O form iş yaptırmak isteyenler içindir; doldurduğunuzda size iş gelmez, sistemde "usta arıyorum" diyen biri olarak görünürsünüz. Hizmet veren olarak ağa katılmanın tek yolu WhatsApp’tan yazmaktır. Formun linkini ise çevrenizde iş yaptıracak kişilere iletebilirsiniz — havuz büyüdükçe hepimize daha çok iş düşer.'
  },
  {
    question: 'Talep sahibinin bilgilerini neden göremiyorum?',
    answer:
      'İşverenin adı ve numarası varsayılan olarak paylaşılmaz. Sebebi sizi kısıtlamak değil: bilgileri açık olsaydı her talep sahibi onlarca soğuk aramaya boğulur ve bir daha talep açmazdı. Talep sahibi açıkça onay verirse bilgileri ilanda yer alır; vermezse gelen teklifler arasından seçtiği kişiye kendisi ulaşır.'
  },
  {
    question: '“Talep doğrulandı” ne demek?',
    answer:
      'Bu satırı taşıyan ilanlarda firmayı bizzat teyit ettik — web sitesi, telefon görüşmesi veya unvan kontrolüyle. Satır yoksa teyit edilmemiş demektir; teklif verirken bunu göz önünde bulundurun. Rozeti her ilana koymuyoruz, çünkü öyle olsaydı hiçbir anlamı kalmazdı.'
  },
  {
    question: 'Verdiğim teklif ve bilgilerim ne oluyor?',
    answer:
      `Teklifiniz ve iletişim bilginiz yalnızca o talebi oluşturan kişiyle paylaşılır. Başka hizmet verenlerle, üçüncü taraflarla veya herkese açık bir yerde paylaşılmaz. Talep sonuçlandıktan sonra kayıtlarınız en geç ${RETENTION_DAYS} gün içinde silinir; istediğiniz an silinmesini talep edebilirsiniz.`
  },
  {
    question: 'Her işe teklif vermek zorunda mıyım?',
    answer:
      'Hayır. Talepler bilgi amaçlı paylaşılır; ilgilenmediğinizi geçersiniz. Teklif vermemenin bir yaptırımı yok, sonraki talepleri almaya devam edersiniz.'
  },
  {
    question: 'Hangi şehirlerde iş çıkıyor?',
    answer:
      'Merkezimiz Ankara’da; tadilat, nakliyat ve temizlik gibi yerinde yapılan işler ağırlıklı olarak Ankara ve çevresinden geliyor. Yazılım, tasarım ve dijital pazarlama işleri ise uzaktan yürütülebildiği için Türkiye’nin her yerinden gelebiliyor.'
  },
  {
    question: 'Ağdan çıkmak istersem?',
    answer:
      'Gruptan çıkmanız yeterli, bir işlem gerekmiyor. Kayıtlarınızın da silinmesini istiyorsanız yazmanız yeterli; aynı gün siliyoruz ve ücret talep etmiyoruz.'
  }
];

/** Ağın kategorileri — /is-talebi ile aynı liste. */
export const providerCategories = [
  'Yazılım & Tasarım',
  'Ev Tadilat & Usta',
  'Nakliyat & Taşımacılık',
  'Temizlik',
  'Diğer'
];
