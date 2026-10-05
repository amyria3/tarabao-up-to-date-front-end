/**
 * Routen des Shops, aufgebaut wie in apps/medusa-storefront: alles unter `/[countryCode]/…`.
 * Die Beispieldaten in `src/lib/fixtures` nennen Links mit dem Präfix `/de-de/`;
 * `localizeHref` setzt das aktuelle Länderkürzel ein.
 */
export const DEFAULT_COUNTRY_CODE = 'de-de'

export const COUNTRY_CODES = ['de-de', 'en-de'] as const

/** Slug der Komponenten-Bibliothek unter `/page/…` (nur in Front-End Complete). */
export const LIBRARY_SLUG = 'komponenten'

/** Schritte der Kasse wie in der Storefront (`/checkout?step=…`). */
export const CHECKOUT_STEPS = ['email', 'delivery', 'payment', 'review'] as const
export type CheckoutStep = (typeof CHECKOUT_STEPS)[number]

/** Bestellnummer der Beispielbestellung (Bestellbestätigung, Konto). */
export const SAMPLE_ORDER_ID = '12493954'

export function routes(countryCode: string = DEFAULT_COUNTRY_CODE) {
  const base = `/${countryCode}`
  return {
    home: base,
    /** Shop: Übersicht aller Kategorien wie `/categories` in der Storefront */
    categories: `${base}/categories`,
    /** Kategorie oder Unterkategorie über ihren flachen Handle wie in Medusa */
    category: (handle: string) => `${base}/categories/${handle}`,
    /** Figma {Alle Produkte}; die Storefront hat dafür keine eigene Seite */
    store: `${base}/store`,
    product: (handle: string) => `${base}/products/${handle}`,
    /** Figma Nuss-Mixer; die Storefront hat dafür keine eigene Seite */
    nutmixer: `${base}/nussmixer`,
    cart: `${base}/cart`,
    checkout: (step?: CheckoutStep) => (step ? `${base}/checkout?step=${step}` : `${base}/checkout`),
    orderConfirmed: (id: string = SAMPLE_ORDER_ID) => `${base}/order/confirmed/${id}`,
    account: `${base}/account`,
    /** Figma {Dein Account / Nicht angemeldet}; die Storefront zeigt die Anmeldung unter `/account` */
    login: `${base}/account/login`,
    withdrawal: `${base}/withdrawal`,
    /** Figma {Unser Blog}; die Storefront hat keinen Blog */
    blog: `${base}/blog`,
    post: (slug: string) => `${base}/blog/${slug}`,
    /** Statische Seiten wie die CMS-Seiten der Storefront */
    page: (slug: string) => `${base}/page/${slug}`,
    library: `${base}/page/${LIBRARY_SLUG}`,
    libraryCategory: (key: string) => `${base}/page/${LIBRARY_SLUG}-${key}`,
  }
}

export type ShopRoutes = ReturnType<typeof routes>

/** Ersetzt das feste `/de-de/` der Beispieldaten durch das aktuelle Länderkürzel. */
export function localizeHref<T extends string | undefined>(href: T, countryCode: string): T {
  if (!href || countryCode === DEFAULT_COUNTRY_CODE) return href
  if (href.startsWith(`/${DEFAULT_COUNTRY_CODE}/`))
    return href.replace(`/${DEFAULT_COUNTRY_CODE}/`, `/${countryCode}/`) as T
  if (href === `/${DEFAULT_COUNTRY_CODE}`) return `/${countryCode}` as T
  return href
}

/** Lokalisiert alle `href`-Felder eines Beispieldaten-Objekts (rekursiv). */
export function localize<T>(value: T, countryCode: string): T {
  if (countryCode === DEFAULT_COUNTRY_CODE) return value
  if (Array.isArray(value)) return value.map((v) => localize(v, countryCode)) as T
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = k === 'href' && typeof v === 'string' ? localizeHref(v, countryCode) : localize(v, countryCode)
    }
    return out as T
  }
  return value
}

/**
 * URL-Slug aus einem Label wie die Handles in Medusa, z. B. „Würzige Snacks“ → „wuerzige-snacks“,
 * „Gehackt & gemahlen“ → „gehackt-und-gemahlen“.
 */
export function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/&/g, 'und')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
