/**
 * Routen des Shops, aufgebaut wie in apps/medusa-storefront: alles unter `/[countryCode]/…`.
 * Die Beispieldaten in `src/lib/fixtures` nennen Links mit dem Präfix `/de-de/`;
 * `localizeHref` setzt das aktuelle Länderkürzel ein.
 */
export const DEFAULT_COUNTRY_CODE = 'de-de'

export const COUNTRY_CODES = ['de-de', 'en-de'] as const

export function routes(countryCode: string = DEFAULT_COUNTRY_CODE) {
  const base = `/${countryCode}`
  return {
    home: base,
    store: `${base}/store`,
    category: (...slugs: string[]) => `${base}/categories/${slugs.join('/')}`,
    product: (handle: string) => `${base}/products/${handle}`,
    nutmixer: `${base}/nussmixer`,
    cart: `${base}/cart`,
    checkout: (step?: string) => (step ? `${base}/checkout?step=${step}` : `${base}/checkout`),
    orderConfirmation: `${base}/checkout/confirmation`,
    account: `${base}/account`,
    login: `${base}/account/login`,
    blog: `${base}/blog`,
    post: (slug: string) => `${base}/blog/${slug}`,
    page: (slug: string) => `${base}/${slug}`,
    library: `${base}/library`,
    libraryCategory: (key: string) => `${base}/library/${key}`,
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

/** URL-Slug aus einem Label, z. B. „Würzige Snacks“ → „wuerzige-snacks“. */
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
