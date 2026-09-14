import { getCollection } from 'astro:content';

export const serviceOrder = ['yritysjuridiikka','asuntokauppariidat','perhe-ja-perintooikeus','riidanratkaisu','tyo-ja-virkamiesoikeus','sopimusoikeus','kuntaoikeus','kuntajuristi','insolvenssioikeus','rikosoikeus','julkiset-hankinnat','tietosuoja-asiat','immateriaalioikeus','yhdistys-ja-saatiooikeus','ymparistooikeus'];
export const introductions: Record<string,string> = {
  yritysjuridiikka: 'Autamme yritystäsi perustamisesta kasvuun ja muutoksiin. Saat tukea sopimuksiin ja arjen oikeudellisiin kysymyksiin.',
  asuntokauppariidat: 'Autamme asunto- ja kiinteistökaupan sekä rakentamisen erimielisyyksissä. Selvitämme tilanteesi ja etenemisvaihtoehdot.',
  'perhe-ja-perintooikeus': 'Olemme tukenasi perintöön, jäämistösuunnitteluun ja perheen oikeudellisiin asioihin liittyvissä kysymyksissä.',
  riidanratkaisu: 'Kun näkemykset eroavat, autamme löytämään tien eteenpäin. Selvitämme vaihtoehdot ja pidämme puoliasi neuvotteluissa ja oikeudessa.',
  'tyo-ja-virkamiesoikeus': 'Selkeää tukea työelämän kysymyksiin. Autamme työntekijöitä, työnantajia ja virkasuhteessa toimivia.',
  sopimusoikeus: 'Hyvä sopimus tuo varmuutta. Autamme sopimusten laatimisessa, arvioinnissa ja sopimuserimielisyyksissä.',
  kuntaoikeus: 'Oikeudellista tukea kuntien ja muiden julkisyhteisöjen päätöksentekoon ja arkeen.',
  kuntajuristi: 'Oikeudellista tukea kuntien ja muiden julkisyhteisöjen päätöksentekoon ja arkeen.',
  insolvenssioikeus: 'Kun maksuvaikeudet koskettavat yritystä, autamme selvittämään vaihtoehdot ja seuraavat askeleet.',
  rikosoikeus: 'Asiantuntevaa apua rikosasian eri vaiheisiin. Autamme sinua ymmärtämään oikeutesi ja asian etenemisen.',
  'julkiset-hankinnat': 'Autamme hankintayksiköitä ja tarjoajia julkisten hankintojen suunnittelussa, kilpailutuksissa ja erimielisyyksissä.',
  'tietosuoja-asiat': 'Käytännönläheistä neuvontaa tietosuojaan. Autamme organisaatiotasi käsittelemään henkilötietoja asianmukaisesti.',
  immateriaalioikeus: 'Pidä huolta yrityksesi osaamisesta ja oikeuksista. Autamme aineettoman omaisuuden suojaamisessa ja siihen liittyvissä sopimuksissa.',
  'yhdistys-ja-saatiooikeus': 'Oikeudellista tukea yhdistysten ja säätiöiden toimintaan, hallintoon ja päätöksentekoon.',
  ymparistooikeus: 'Autamme ympäristöön, rakentamiseen ja maankäyttöön liittyvissä oikeudellisissa kysymyksissä.',
};
export function slug(route:string) { return route.split('/').filter(Boolean).at(-1) || ''; }
export function phoneHref(phone:string) { return 'tel:' + phone.replace(/[^+\d]/g,''); }
export function dateLabel(date:string) { return new Intl.DateTimeFormat('fi-FI', { day:'numeric', month:'numeric', year:'numeric', timeZone:'UTC' }).format(new Date(date)); }
export async function offices() { return (await getCollection('offices')).sort((a,b)=>a.data.order-b.data.order); }
export async function services() { return (await getCollection('services')).sort((a,b)=>serviceOrder.indexOf(slug(a.data.route))-serviceOrder.indexOf(slug(b.data.route))); }
export async function news() { return (await getCollection('news')).sort((a,b)=>(b.data.date||'').localeCompare(a.data.date||'')); }
export const peopleOrder=['harri-kontturi','pirjo-makela','matti-tolvanen','jyrki-piiparinen','niina-kukkonen','tatu-hirvonen','hillevi-kontturi','anniina-korjus','samuli-myller','janika-raty','janika-pelkonen','veikko-haimila','helmi-helotie','rasmus-ruokonen','siiri-klubb','heidi-hamalainen','nina-huikuri','sanni-hiltunen','paivystava-lakimies'];
export async function people(){return (await getCollection('people')).sort((a,b)=>peopleOrder.indexOf(slug(a.data.route))-peopleOrder.indexOf(slug(b.data.route)));}
