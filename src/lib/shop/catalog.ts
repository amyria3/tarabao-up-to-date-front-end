import type { BreadcrumbItem, BreadcrumbProps } from '@modules/common/components/breadcrumbs'
import { NAV_GROUPS, PRODUCT_DETAIL, PRODUCTS } from '@/lib/fixtures'
import { routes, slugify } from '@/lib/shop/routes'
import type { CategoryCardModel, ProductCardModel, ProductDetailModel } from '@/lib/view-models'

/**
 * Katalog mit Beispieldaten: feste Kategorien und Unterkategorien aus Navigation / NavBlocks
 * (2.9 Content-Struktur), Produkte je Handle. Im Shop kommen dieselben Daten aus Medusa
 * (Kategorien, Produkte, Varianten); die Seiten kennen nur die View-Modelle.
 */

export type ShopCategory = {
  /** Handle wie in Medusa: aus dem Namen gebildet, flach und eindeutig */
  slug: string
  title: string
  /** Unterkategorien; die erste Nav-Zeile „Alle“ ist die Kategorie selbst */
  children: ShopCategory[]
}

export const CATEGORY_TREE: ShopCategory[] = NAV_GROUPS.filter((g) => g.title).map((g) => ({
  slug: slugify(g.title!),
  title: g.title!,
  children: g.links
    .filter((l) => l.label !== 'Alle')
    .map((l) => ({ slug: slugify(l.label), title: l.label, children: [] })),
}))

const handles = CATEGORY_TREE.flatMap((c) => [c.slug, ...c.children.map((s) => s.slug)])
const duplicate = handles.find((h, i) => handles.indexOf(h) !== i)
if (duplicate) throw new Error(`Kategorie-Handle doppelt: ${duplicate}`)

/** Sucht eine Kategorie oder Unterkategorie über ihren Handle. */
export function findCategory(handle: string): { category: ShopCategory; parent?: ShopCategory } | undefined {
  for (const category of CATEGORY_TREE) {
    if (category.slug === handle) return { category }
    const child = category.children.find((c) => c.slug === handle)
    if (child) return { category: child, parent: category }
  }
  return undefined
}

export function categoryCard(category: ShopCategory, countryCode: string, parent?: ShopCategory): CategoryCardModel {
  return {
    id: `cat_${parent ? `${parent.slug}_` : ''}${category.slug}`,
    title: category.title,
    href: routes(countryCode).category(category.slug),
  }
}

/* ---- Breadcrumb wie in der Storefront: Startseite → Shop → Oberkategorie → Kategorie (→ Produkt) ---- */

export function shopTrail(countryCode: string): BreadcrumbItem[] {
  const r = routes(countryCode)
  return [
    { label: 'Startseite', href: r.home },
    { label: 'Shop', href: r.categories },
  ]
}

function categoryTrail(found: { category: ShopCategory; parent?: ShopCategory }, countryCode: string) {
  const r = routes(countryCode)
  return [...(found.parent ? [found.parent] : []), found.category].map((c) => ({
    label: c.title,
    href: r.category(c.slug),
  }))
}

export function categoryBreadcrumb(
  found: { category: ShopCategory; parent?: ShopCategory },
  countryCode: string,
): BreadcrumbProps {
  const trail = categoryTrail(found, countryCode)
  return { items: [...shopTrail(countryCode), ...trail.slice(0, -1), { label: found.category.title }] }
}

/* ---- Produkte ---- */

type CatalogProduct = {
  handle: string
  card: Omit<ProductCardModel, 'href' | 'id'>
  detail?: Partial<ProductDetailModel>
  /** [Kategorie, Unterkategorie] als Handles */
  category: [string, string]
}

/** Ober- und Unterkategorie zum Handle einer Unterkategorie. */
function inCategory(handle: string): [string, string] {
  const found = findCategory(handle)
  if (!found?.parent) throw new Error(`Unterkategorie fehlt: ${handle}`)
  return [found.parent.slug, found.category.slug]
}

/** Die vier Doypacks aus __Products / Doypacks (2.9) und Beispielprodukte je Unterkategorie. */
const DOYPACKS: CatalogProduct[] = [
  {
    handle: 'jancys-curry-cashews',
    card: { title: 'Jancys Curry-Cashews', priceLabel: 'ab 5,49 €', unitPriceLabel: '(ab 42,23 €/kg)', rating: 5 },
    category: inCategory('wuerzige-snacks'),
  },
  {
    handle: 'tamari-sesam-cashews',
    card: { title: 'Tamari-Sesam-Cashews', priceLabel: 'ab 5,49 €', unitPriceLabel: '(ab 42,23 €/kg)', rating: 5 },
    category: inCategory('wuerzige-snacks'),
  },
  {
    handle: 'macadamia-suess-salzig',
    card: { title: 'Macadamia süß-salzig', priceLabel: 'ab 7,49 €', unitPriceLabel: '(ab 57,62 €/kg)', rating: 4 },
    category: inCategory('gezuckerte-nuesse'),
  },
  {
    handle: 'ananasstuecke-schokoliert',
    card: { title: 'Ananasstücke schokoliert', priceLabel: 'ab 5,49 €', unitPriceLabel: '(ab 54,90 €/kg)', rating: 5 },
    category: inCategory('schokolierte-fruechte-und-nuesse'),
  },
]

/** Beispielprodukte für alle anderen Unterkategorien (Titel aus den Figma-Karten). */
function sampleProducts(category: string, sub: string): CatalogProduct[] {
  return PRODUCTS.map((p, i) => ({
    handle: `${sub}-${i + 1}`,
    card: { title: p.title, priceLabel: p.priceLabel, unitPriceLabel: p.unitPriceLabel, rating: p.rating },
    category: [category, sub],
  }))
}

export const CATALOG: CatalogProduct[] = [
  ...DOYPACKS,
  ...CATEGORY_TREE.flatMap((c) => c.children.flatMap((s) => sampleProducts(c.slug, s.slug))),
]

export function productCard(product: CatalogProduct, countryCode: string): ProductCardModel {
  return { id: `prod_${product.handle}`, href: routes(countryCode).product(product.handle), ...product.card }
}

export function productsIn(category: string, sub: string | undefined, countryCode: string): ProductCardModel[] {
  return CATALOG.filter((p) => p.category[0] === category && (!sub || p.category[1] === sub)).map((p) =>
    productCard(p, countryCode),
  )
}

export function findProduct(handle: string): CatalogProduct | undefined {
  return CATALOG.find((p) => p.handle === handle)
}

/** Produktdetail: die Figma-Produktseite (Fixture) mit Titel und Bewertung des Katalogprodukts. */
export function productDetail(product: CatalogProduct, countryCode: string): ProductDetailModel {
  return {
    ...PRODUCT_DETAIL,
    ...product.detail,
    id: `prod_${product.handle}`,
    title: product.card.title,
    rating: product.card.rating ?? PRODUCT_DETAIL.rating,
    reviewsHref: `${routes(countryCode).product(product.handle)}#bewertungen`,
  }
}

/** Die drei anderen Sorten bzw. Produkte derselben Unterkategorie („Das könnte Dich auch interessieren“). */
export function relatedProducts(product: CatalogProduct, countryCode: string): ProductCardModel[] {
  const doypack = DOYPACKS.some((d) => d.handle === product.handle)
  const pool = doypack ? DOYPACKS : CATALOG.filter((p) => p.category[1] === product.category[1])
  return pool.filter((p) => p.handle !== product.handle).map((p) => productCard(p, countryCode))
}

/** Wie die Produktseite der Storefront: Startseite → Shop → Oberkategorie → Kategorie → Produkt. */
export function productBreadcrumb(product: CatalogProduct, countryCode: string): BreadcrumbProps {
  const found = findCategory(product.category[1])
  return {
    items: [
      ...shopTrail(countryCode),
      ...(found ? categoryTrail(found, countryCode) : []),
      { label: product.card.title },
    ],
  }
}
