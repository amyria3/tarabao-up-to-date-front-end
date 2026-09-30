/**
 * Typisierte Beispieldaten für Bibliothek, Storybook und Tests.
 * Texte stammen aus den Figma-Komponenten; wo Figma Platzhalter zeigt,
 * steht ein neutraler Beispieltext. Bilder: keine (Platzhalterfläche).
 */
import type {
  AddressModel,
  CartModel,
  CategoryCardModel,
  FooterModel,
  ImageCardModel,
  IngredientModel,
  MegaCardModel,
  NavGroupModel,
  NavLinkModel,
  NutmixerCategoryModel,
  NutmixerProductModel,
  PaymentMethodModel,
  PickupPointModel,
  ProductDetailModel,
  PromoModel,
  ProductCardModel,
  PurchaseModel,
  RecipeStepModel,
  ReviewModel,
  ShippingOptionModel,
  TeaserModel,
  VoucherModel,
} from '@/lib/view-models'

export const PRODUCTS: ProductCardModel[] = [
  {
    id: 'prod_himbeeren',
    title: 'Schokolierte Himbeeren',
    href: '/de-de/products/schokolierte-himbeeren',
    priceLabel: 'ab 19,99 €',
    unitPriceLabel: '(ab 39,98 €/kg)',
    rating: 5,
    reviewCountLabel: 'Gekauft von 30493 Menschen',
  },
  {
    id: 'prod_kurz',
    title: 'Anderer Name kurz',
    href: '/de-de/products/anderer-name-kurz',
    priceLabel: 'ab 12,60 €',
    unitPriceLabel: '(ab 24,20 €/kg)',
    rating: 4,
  },
  {
    id: 'prod_lang',
    title: 'Dritter Name lässt sich nicht kürzen',
    href: '/de-de/products/dritter-name',
    priceLabel: 'ab 5 €',
    unitPriceLabel: '(ab 10 €/kg)',
    rating: 5,
  },
]

export const COMPACT_PRODUCT: ProductCardModel = {
  id: 'prod_compact',
  title: 'Schokolierte Himbeeren',
  href: '/de-de/products/schokolierte-himbeeren',
  priceLabel: '3,90 € / 75 gr',
}

export const CATEGORIES_SAMPLE: CategoryCardModel[] = [
  { id: 'cat_manufaktur', title: 'Aus unserer Manufaktur', href: '/de-de/categories/manufaktur' },
  { id: 'cat_nuesse', title: 'Nüsse pur', href: '/de-de/categories/nuesse-pur' },
  { id: 'cat_andere', title: 'Andere Kategorie', href: '/de-de/categories/andere' },
]

export const VOUCHER: VoucherModel = {
  code: 'GEBURTSTAG45',
  conditions:
    'Ab 30,- Einkaufswert, ausgenommen Neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit',
}

/** Figma-Texte je Variante von Cards / MegaCard (2143:2061); CTA-Label = Figma-Platzhalter. */
export const MEGA_CARDS: Record<'orange-black' | 'blue-green' | 'happy-yellow' | 'purple-black', MegaCardModel> = {
  'orange-black': {
    titleLines: ['Wenn einfach ALLES', 'stimmt'],
    body: 'Manchmal trifft man Menschen oder Unternehmen, die einfach alles haben: Werte, Vision und den Willen, die Welt ein kleines Stück besser zu machen. Genau so ging es uns mit [Amanase](/de-de/blog/amanase), unserem Partner in Sachen [fairer Schokolade](/de-de/collections/suesse-snacks). Warum wir soooooooo begeistert sind?',
    ctaLabel: 'default label',
    href: '/de-de/blog/amanase',
  },
  'purple-black': {
    titleLines: ['Wir achten', 'auf Verpackung'],
    body: 'Wir nutzen **Pfandeimer**, **Pfandgläser**, **Großgebinde**, und **Papiertüten** als Verpackungsarten und optimieren unsere Verpackungen stetig: Nachhaltigkeit war und bleibt unser wichtigstes Anliegen',
    ctaLabel: 'default label',
    href: '/de-de/nachhaltigkeit/verpackung',
  },
  'blue-green': {
    titleLines: ['Wir achten', 'auf Verpackung'],
    body: 'Wir nutzen **Pfandeimer**, **Pfandgläser**, **Großgebinde**, und **Papiertüten** als Verpackungsarten und optimieren unsere Verpackungen stetig: Nachhaltigkeit war und bleibt unser wichtigstes Anliegen',
    ctaLabel: 'default label',
    href: '/de-de/nachhaltigkeit/verpackung',
  },
  'happy-yellow': {
    titleLines: ['Der Charme', 'selbstgemachter', 'Geschenke'],
    body: 'Jetzt wird’s lecker! Unsere Geschenkidee sind **Cookie-Zutaten in der Flasche**: Die perfekte Lösung für alle, die ihren Liebsten eine süße Überraschung bereiten möchten, ohne dabei selbst stundenlang in der Küche zu stehen. Du verschenkst dabei **alle benötigten “trockenen” Zutaten** für ein saftiges Cookie-Rezept.',
    ctaLabel: 'default label',
    href: '/de-de/geschenke',
  },
}

export const MEGA_CARD: MegaCardModel = MEGA_CARDS['orange-black']

export const BLOG_POST: TeaserModel = {
  id: 'blog_wandern',
  title: 'Reaction: Perfekter Snack fürs Wandern',
  href: '/de-de/blog/wandern',
}

/** Figma Cards / ReviewCard: Reactions?=False */
export const REVIEW: ReviewModel = {
  id: 'rev_1',
  rating: 3,
  author: 'Peter Unbekannt',
  dateLabel: 'vor einem Jahr',
  title: 'Kein Titel',
  body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  likes: 0,
  image: { src: '', alt: '' },
}

/** Figma Cards / ReviewCard: Reactions?=True */
export const REVIEW_LIKED: ReviewModel = {
  ...REVIEW,
  id: 'rev_2',
  rating: 5,
  author: 'Kati L.,',
  dateLabel: 'vor drei Wochen',
  title: 'Kommt täglich ins Müsli',
  likes: 2,
}

export const FEATURED: TeaserModel = {
  id: 'feat_unverpackt',
  title: 'Für Bio- und Unverpackt Läden',
  body: 'Verkauf von Nüssen, Trockenfrüchten, Snacks und vielem mehr – unverpackt oder verpackt.',
  href: '/de-de/b2b',
  linkLabel: 'Mehr erfahren',
}

export const FEATURED_BLOG_POST: TeaserModel = {
  ...FEATURED,
  id: 'feat_blog',
  author: 'Alica',
  dateLabel: '01.01.1989',
}

export const DISCOVERY: TeaserModel = {
  id: 'disc_1',
  title: 'Interessanter Name',
  subtitle: 'Feature, Titel oder Benefit',
  href: '/de-de/entdecken',
  facts: [
    {
      question: 'Was verbindet Dich mit Tarabao?',
      answer:
        'Verkauf von Nüssen, Trockenfrüchten, Snacks und vielem mehr – unverpackt oder verpackt. Verkauf von Nüssen, Trockenfrüchten, Snacks und vielem mehr – unverpackt oder verpackt. Hallo!',
    },
    {
      question: 'Was sind Deine Lieblingsprodukte?',
      answer: 'Dies und jenes und alles Mögliche, let me alone omg omg die Lerche singt.',
    },
  ],
}

/** Beispielreihe für DiscoveryCardRow (Figma Sections / CardRow · Discovery) */
export const DISCOVERY_ROW: TeaserModel[] = [1, 2, 3].map((n) => ({ ...DISCOVERY, id: `disc_${n}` }))

export const PROMOTION: TeaserModel = {
  id: 'promo_winter',
  title: 'Winteraktion',
  body: 'Ab 30,- Einkaufswert, ausgenommen Neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit',
}

export const PURCHASE: PurchaseModel = {
  id: 'order_489443',
  status: 'sent',
  statusLabel: 'Deine Sendung Unterwegs zu dir!',
  images: Array.from({ length: 5 }, (_, i) => ({ src: '', alt: `Produkt ${i + 1}` })),
  // Werte aus Figma Components / PurchaseSummary (Status=Order Received)
  summary: {
    orderNumber: '12493954',
    itemCountLabel: '7 Artikel',
    totalLabel: '32,56€',
    orderedAtLabel: '29. Juni 2026',
    shippedAtLabel: '31. Juni 2026',
    invoiceHref: '/de-de/account/orders/12493954/invoice',
    trackingHref: '/de-de/account/orders/12493954/tracking',
  },
  ctaLabel: 'default label',
}

export const PURCHASE_ARRIVED: PurchaseModel = {
  ...PURCHASE,
  id: 'order_arrived',
  status: 'arrived',
  statusLabel: 'Deine Sendung ist an Deiner Adresse angekommen',
  summary: { ...PURCHASE.summary, arrivedAtLabel: '2. Juli 2026' },
}

/* ---- Navigation (Figma-Texte aus Navigation / NavBlocks, Layout / PromoBar, Navigation / Footer) ---- */

const cat = (slug: string) => `/de-de/categories/${slug}`
const links = (base: string, labels: string[]): NavLinkModel[] =>
  labels.map((label, i) => ({ label, href: i === 0 ? cat(base) : `${cat(base)}#${i}` }))

/** Reihenfolge wie im Figma-Raster (Navigation / Nav, Zeile für Zeile) */
export const NAV_GROUPS: NavGroupModel[] = [
  {
    id: 'nuesse',
    title: 'Nüsse',
    links: links('nuesse', [
      'Alle',
      'Naturbelassen',
      'Aktiviert',
      'Geröstet',
      'Gehackt & gemahlen',
      'Frucht & Nuss Mischungen',
      'Würzige Snacks',
    ]),
  },
  { id: 'nussmus', title: 'Nussmus & Nusscremes', links: links('nussmus', ['Alle', 'Nussmus', 'Nusscreme']) },
  {
    id: 'schokolade',
    title: 'Schokolade & Süße Kreationen',
    links: links('schokolade', [
      'Alle',
      'Tafelschokolade',
      'Schokodrops',
      'Schokolierte Früchte & Nüsse',
      'Pralinen',
      'Gezuckerte Nüsse',
      'Ravellis Kürbiskerne',
    ]),
  },
  {
    id: 'trockenobst',
    title: 'Trockenobst',
    links: links('trockenobst', [
      'Alle',
      'Gefriergetrocknete Früchte',
      'Getrocknete Früchte',
      'Gezuckerte Snacks',
      'Fruchtcubes',
    ]),
  },
  {
    id: 'getreide',
    title: 'Getreide, Saaten & Müsli',
    links: links('getreide', ['Alle', 'Saaten', 'Hülsenfrüchte', 'Getreide & Pseudo-Getreide', 'Müsli & Granola']),
  },
  {
    id: 'feinkost',
    title: 'Feinkost von silver leaf',
    links: links('feinkost', ['Alle', 'Olivenöl', 'Oliven & Tomaten', 'Pasten', 'Meersalz']),
  },
  { id: 'aufbewahrung', title: 'Aufbewahrung', links: links('aufbewahrung', ['Alle']) },
  {
    id: 'pulver',
    title: 'Pulver & Süßungsmittel',
    links: links('pulver', ['Alle', 'Pflanzendrink-Pulver', 'Proteinpulver', 'Süßungsmittel']),
  },
  {
    id: 'andere',
    links: [
      { label: 'B2B Shop', href: '/de-de/b2b' },
      { label: 'Teams & Büros', href: '/de-de/teams' },
      { label: 'Tarabao Blog', href: '/de-de/blog' },
      { label: 'Über uns', href: '/de-de/ueber-uns' },
    ],
  },
  // Figma Navigation / NavBlocks: eine Variante je Hauptkategorie, dazu Andere, Nussmixer und Alle Produkte
  { id: 'nussmixer', links: [{ label: 'Nussmixer', href: '/de-de/nussmixer' }] },
  { id: 'alle', links: [{ label: 'Alle Produkte', href: '/de-de/store' }] },
]

export const PROMO: PromoModel = {
  text: 'Versand innerhalb Deutschlands nur 2,90€ - Versandkostenfrei ab 49€',
  shortText: 'Versand 2,90 € · ab 49 € gratis',
}

const page = (slug: string) => `/de-de/${slug}`
export const FOOTER: FooterModel = {
  slogan: 'Die besten Snacks - für Dich!',
  sloganCompact: 'Hier kommt die\nSnackrevolution',
  about: {
    id: 'about',
    title: 'Wer wir sind und was wir verkaufen',
    links: [
      { label: 'Unser Team', href: page('team') },
      { label: 'Unser Team', href: page('team') },
      { label: 'Unsre Partnerschaften', href: page('partnerschaften') },
      { label: 'Item', href: '#' },
      { label: 'Item', href: '#' },
    ],
  },
  payment: {
    id: 'payment',
    title: 'Bezahlen mit',
    links: [{ label: 'Item' }, { label: 'Item' }, { label: 'Item' }, { label: 'Item' }],
  },
  service: {
    id: 'service',
    title: 'Kundenservice',
    links: [
      { label: 'Versandrichtlinien', href: page('versand') },
      { label: 'Hilfebereich', href: page('hilfe') },
      { label: 'B2B Bereich', href: page('b2b') },
    ],
  },
  contact: {
    id: 'contact',
    title: 'Kontakt',
    links: [
      { label: 'Kontakt', href: page('kontakt') },
      { label: 'Instagram', href: 'https://www.instagram.com/' },
      { label: 'B2B Bereich', href: page('b2b') },
      { label: 'Hilfebereich', href: page('hilfe') },
    ],
  },
  legal: {
    id: 'legal',
    title: 'Rechtlich relevante Informationen',
    links: [
      { label: 'Versandrichtlinien', href: page('versand') },
      { label: 'Hilfebereich', href: page('hilfe') },
      { label: 'B2B Bereich', href: page('b2b') },
      { label: 'Impressum', href: page('impressum') },
      { label: 'Widerrufsrecht', href: page('widerruf') },
      { label: 'Allgemeine Geschäftsbedingungen', href: page('agb') },
      { label: 'Datenschutzerklärung', href: page('datenschutz') },
    ],
  },
}

/** Figma Components / Filter / FilterPanel: Texte der Chips */
export const FILTER_OPTIONS = [
  { id: 'glutenfrei', label: 'Glutenfrei' },
  { id: 'muesli', label: 'Müsli' },
  { id: 'ohne-zucker', label: 'Ohne Zucker' },
  { id: 'neu', label: 'Neu im Sortiment' },
  { id: 'ohne-nuesse', label: 'Ohne Nüsse' },
  { id: 'gewuerzt', label: 'Gewürzt' },
  { id: 'direkt', label: 'nur Direktlieferungen' },
]

/* ---- Warenkorb (Figma Components / Cart / ProductItem, Calculation) ---- */

export const CART: CartModel = {
  id: 'cart_demo',
  // Figma-Beispiel (Components / Cart / Summary): Ananasstücke schokoliert im Abo, Jancys Curry-Cashews einmalig
  items: [
    {
      id: 'item_schoko_ananas',
      title: 'Ananasstücke schokoliert',
      href: '/de-de/products/ananasstuecke-schokoliert',
      image: { src: '', alt: '' },
      unitPriceLabel: '54,90 €/ kg',
      variantLabel: '100 g',
      quantity: 1,
      itemPriceLabel: '5,49 €',
      totalLabel: '5,49 €',
      subscription: true,
    },
    {
      id: 'item_curry_cashews',
      title: 'Jancys Curry-Cashews',
      href: '/de-de/products/jancys-curry-cashews',
      image: { src: '', alt: '' },
      unitPriceLabel: '42,23 €/ kg',
      variantLabel: '130 g',
      quantity: 1,
      itemPriceLabel: '5,49 €',
      totalLabel: '5,49 €',
    },
  ],
  // Figma zeigt 0 € und blendet Beispielwerte aus; hier die ausgeblendeten Werte
  totals: { subtotalLabel: '10,98 €', shippingLabel: '3,90 €', depositLabel: '0,00 €', totalLabel: '14,88 €' },
}

export const EMPTY_CART: CartModel = {
  id: 'cart_empty',
  items: [],
  totals: { subtotalLabel: '0 €', shippingLabel: '0 €', depositLabel: '0 €', totalLabel: '0 €' },
}

/* ---- Checkout (Figma Components / Checkout / …) ---- */

export const CUSTOMER = { firstName: 'Medina', email: 'melina.wagen@gmail.com' }

export const ADDRESS: AddressModel = {
  firstName: 'Medina',
  lastName: 'Wagenrode',
  address1: 'Berliner Str. 01',
  postalCode: '02853',
  city: 'Paddelberg',
  countryLabel: 'Deutschland',
  phone: '0175 9393384',
}

export const SHIPPING_OPTIONS: ShippingOptionModel[] = [
  { id: 'standard', label: 'Normalversand', description: 'Content' },
  { id: 'express', label: 'Expressversand', description: 'Content' },
]

export const PICKUP_POINTS: PickupPointModel[] = [
  { id: 'pp1', name: 'Name der Abholstelle', addressLabel: 'Ahornstraße 56, 05823 München' },
  { id: 'pp2', name: 'Name eines anderen Ladens', addressLabel: 'Grassistr. 56, 58412 Ulm' },
]

export const PAYMENT_METHODS: PaymentMethodModel[] = [
  { id: 'card', label: 'Bankkarte' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'klarna', label: 'Klarna' },
  { id: 'credit', label: 'Kreditkarte' },
]

export const VALID_VOUCHERS = ['EICHHÖRNCHEN25', 'AUCHGÜLTIG26']

/* ---- Konto, Abo, Widerruf (Figma Components / Account / …, OrderCancellation) ---- */

export const CANCELLABLE_ORDERS = [
  { id: 'o1', label: 'Bestellung vom 15. Juni 2026', number: '489443' },
  { id: 'o2', label: 'Bestellung vom 9. Dezember 2025', number: '48983485', cancellable: false },
]

export const RETURNABLE_ITEMS = [1, 2, 3, 4].map((n) => ({
  id: `r${n}`,
  title: `Artikel ${n}`,
  image: { src: '', alt: '' },
}))

export const SUBSCRIPTION_ITEMS = [1, 2, 3].map((n) => ({ ...CART.items[0]!, id: `sub_${n}` }))

/* ---- Produktseite (Figma Components / Product / BuyBox, Disclosure, ContentModules) ---- */

export const PRODUCT_DETAIL: ProductDetailModel = {
  id: 'prod_himbeeren',
  title: 'Gefriergetrocknete Himbeeren in Zartbitterschokolade',
  rating: 5,
  reviewsHref: '#bewertungen',
  images: [1, 2, 3].map((n) => ({ src: '', alt: `Produktbild ${n}` })),
  highlights: [
    'Hergestellt in unserer hauseigenen Manufaktur',
    'Keine künstlichen Zusatzstoffe oder Aromen',
    'Publikumsliebling',
    'Verpackung: vollständig recyclebar oder Pfand',
    'Vegan & Bio',
  ],
  sustainability: ['social-commitment', 'cultivation-environment', 'supply-chain-fairness', 'transportation'],
  variants: [
    // Figma __Products / Doypacks: Pack, Multipack, Bulk (Components / Product / SizeAndPrice)
    { id: 'pack', label: '130 g', priceLabel: '5,49 €', unitPriceLabel: '42,23 €/ kg' },
    { id: 'multipack', label: '8 × 130 g', priceLabel: '41,75 €', unitPriceLabel: '40,14 €/ kg' },
    { id: 'bulk', label: '0,5 kg', priceLabel: '16,95 €', unitPriceLabel: '33,90 €/ kg' },
  ],
  ingredients: {
    text: 'Kakaomasse*, Rohrohrzucker*, Kakaobutter*, 6 % gefrier-getrocknete Himbeeren* **',
    footnotes: ['*Hier mehr über unsere Nachhaltigkeitsskala erfahren', 'aus kontrolliert biologischem Anbau'],
  },
  nutrition: {
    head: ['Durchschnittliche Nährwerte', 'Pro 100 Gramm'],
    rows: [
      ['Energie', '2361 kJ / 564 kcal'],
      ['Fett', '40,5 g'],
      ['davon gesättigte Fettsäuren', '25,5 g'],
      ['Kohlenhydrate', '36,8 g'],
      ['Davon Zucker', '0,0 g'],
      ['Ballaststoffe', '8,6 g'],
      ['Salz', '0 g'],
    ],
  },
  suppliers: [
    {
      name: 'Firmenname ([Produkt] / [Zutat])*',
      note: '*Wie das funktioniert? Unsere Partner*innen erzählen was über sich. Hier seht ihr, was sie uns an Informationen geben.',
      facts: [{ question: 'Wo produziert ihr?', answer: '[Ort der Produktionsstätte]' }],
    },
  ],
}

/* ---- Nussmixer (Figma Components / Nutmixer, Nutmixer / Item) ---- */

export const NUTMIXER_CATEGORIES_DEMO: NutmixerCategoryModel[] = [
  { id: 'nuesse', label: 'Nüsse' },
  { id: 'beeren', label: 'Beeren' },
  { id: 'fruechte', label: 'Früchte' },
]

const nut = (categoryId: string, n: number): NutmixerProductModel => ({
  id: `${categoryId}_${n}`,
  title: 'Nussname',
  href: `/de-de/products/${categoryId}-${n}`,
  priceLabel: '3,90€ / 19.99gr',
  categoryId,
  stepGrams: 75,
  stepPriceLabel: '3,60 € / 75 kg',
})

export const NUTMIXER_PRODUCTS: NutmixerProductModel[] = [
  ...[1, 2, 3, 4, 5, 6].map((n) => nut('nuesse', n)),
  ...[1, 2, 3, 4].map((n) => nut('beeren', n)),
  ...[1, 2, 3].map((n) => nut('fruechte', n)),
]

/* ---- Sections (Figma Sections / Tabs / SectionTabsAndContent, Sections / Sustainability) ---- */

export const PRODUCT_TABS_CONTENT = {
  about: {
    headline: 'Ein wichtiger Text - interessant für unsere Kundinnen und Kunden',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  },
  packaging: {
    batchNote: 'Die Charge [Charge] hat die MHD [Datum]',
    storage:
      'Wir lieben Gläser mit Holzdeckel, doch für die Aufbewahrung von Nüssen eignen sie sich am besten in geschlossenen Schränken.',
    packaging: 'Wir nutzen aus dem und dem Grund Papiertüten. Plastiktüten nutzen wir in diesem konkreten Fall nicht.',
  },
  manufacture: {
    highlights: [
      'Hergestellt in unserer hauseigenen Manufaktur',
      'Keine künstlichen Zusatzstoffe oder Aromen',
      'Publikumsliebling',
      'Verpackung: vollständig recyclebar oder Pfand',
      'Schokolade aus Kooperative Anamnese',
      'Vegan & Bio',
    ],
    headline: 'Ein wichtiger Text - interessant für unsere Kundinnen und Kunden',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  },
}

const COOP =
  'Dieses Unternehmen zeichnet sich durch besonderen Ehrgeiz aus: Es erfüllt nicht nur Kriterien zur ökologischen Landwirtschaft, sondern wirtschaftet als Kooperative. Das bedeutet, dass die Arbeiter*innen und ihre Kinder …'

export const SUSTAINABILITY_CONTENT = {
  intro: {
    headline: 'Nachhaltigkeit für uns',
    columns: [
      'Nachhaltigkeit & Fairness sind für uns viel mehr als nur das Bio-Siegel. Sie sind auch kein Bonus oder Marketingtrick, sondern – auch wenn es ein wenig pathetisch klingen mag – unsere Mission.',
      'Damit Du weißt, was Du kaufst, bitten wir unsere Zulieferer, uns möglichst viele Informationen zur Verfügung zu stellen, und veröffentlichen sie nach einer minimalen redaktionellen Prüfung.',
    ],
  },
  supplier: {
    headline: 'Was unseren Lieferanten [#3 Firmenname] besonders macht',
    text: 'Bode Naturkost ist ein unabhängiger Bio-Großhändler mit Sitz in Hamburg. Das Unternehmen bezieht den Kakao direkt von der Kooperative La Esperanza in Peru – mit langfristigem Abnahmevertrag und regelmäßigen Besuchen vor Ort.',
    facts: [
      '[#6 Standort]',
      'Dieses Unternehmen hat [#5 Mitarbeitende] Mitarbeiter:innen',
      '[#7 Projekt] / [A.3 Herkunft des Produkts]',
    ],
  },
  tabs: {
    'social-commitment': [
      { title: 'Zertifizierungen & Standards', text: COOP, signets: 4 },
      { title: 'Code of Conduct', text: COOP },
      { title: 'Beitrag zur Chancengleichheit', text: COOP },
    ],
    'cultivation-environment': [{ title: 'Anbau & Umwelt', text: COOP }],
    'supply-chain-fairness': [{ title: 'Faire Lieferkette', text: COOP }],
    transportation: [{ title: 'Transport ohne Flugzeug', text: COOP }],
  },
}

/* ---- Rezeptseite (Figma {Blog / Recipe} 9618:28958, Components / Recipe, Sections / ImageCarousel) ---- */

export const RECIPE_FACTS = ['Arbeitszeit 15 Min.', 'Gesamtzeit 30 Min.', 'Schwierigkeit: einfach']

export const RECIPE_INGREDIENTS: IngredientModel[] = [
  { id: 'i1', amount: 50, unit: 'g', name: 'Haferflocken' },
  { id: 'i2', amount: 150, unit: 'ml', name: 'Hafermilch' },
  { id: 'i3', amount: 1, unit: 'EL', name: 'Mandelmus' },
  { id: 'i4', amount: 20, unit: 'g', name: 'Walnüsse, gehackt' },
  { id: 'i5', amount: 1, unit: 'TL', name: 'Zimt' },
  { id: 'i6', amount: null, unit: '1 Prise', name: 'Salz' },
]

const LOREM_SHORT =
  'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'

export const RECIPE_STEPS: RecipeStepModel[] = [
  { id: 's1', label: 'Schritt 1', meta: 'ca. 10 Min', text: LOREM_SHORT, image: { src: '', alt: '' } },
  { id: 's2', label: 'Schritt 2', meta: 'ca. 5 Min', text: LOREM_SHORT },
  { id: 's3', label: 'Schritt 3', meta: 'ca. 10 Min', text: LOREM_SHORT, image: { src: '', alt: '' } },
  { id: 's4', label: 'Schritt 4', meta: 'ca. 20 Min', text: LOREM_SHORT },
  { id: 's5', label: 'Schritt 5', meta: 'ca. 5 Min', text: LOREM_SHORT },
]

export const RECIPE_IMAGES: ImageCardModel[] = [
  'Pistazienschnecken ohne Hefe',
  'Pistaziencreme zum Backen',
  'Schnecken mit Pistazienfüllung',
  'Bio-Pistaziencreme vom Löffel',
  'Pistaziencreme auf Brot',
  'Pistaziencreme mit Pistazien',
  'Gehackte Bio-Pistazien',
  'Pistazien zum Bestreuen',
  'Geröstet und gehackt',
].map((caption, i) => ({ id: `img_${i + 1}`, caption, image: { src: '', alt: caption } }))
