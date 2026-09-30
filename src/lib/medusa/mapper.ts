/**
 * Übersetzt Medusa-Store-Daten (@medusajs/types, HttpTypes) in die View-Modelle der Bibliothek.
 * Nur diese Datei (und **\/medusa*.ts) darf @medusajs/* importieren (ESLint, check:styles).
 * So bleiben alle Komponenten unabhängig von Medusa und laufen in Bibliothek und Storybook
 * mit Beispieldaten.
 */
import type { HttpTypes } from '@medusajs/types'

import type {
  AddressModel,
  CartItemModel,
  CartModel,
  ImageModel,
  ProductCardModel,
  ProductDetailModel,
  ProductVariantModel,
} from '@/lib/view-models'

export type MoneyFormat = { locale?: string; currencyCode: string }

/** Beträge in Medusa v2 sind Hauptwährungseinheiten (z. B. 19.9 = 19,90 €). */
export function formatMoney(amount: number | null | undefined, { locale = 'de-DE', currencyCode }: MoneyFormat) {
  if (amount === null || amount === undefined) return ''
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode.toUpperCase() }).format(amount)
}

const productHref = (countryCode: string, handle: string) => `/${countryCode}/products/${handle}`

function image(src: string | null | undefined, alt: string): ImageModel | undefined {
  return src ? { src, alt } : undefined
}

function cheapestVariant(product: HttpTypes.StoreProduct) {
  return [...(product.variants ?? [])]
    .filter(
      (v) => v.calculated_price?.calculated_amount !== null && v.calculated_price?.calculated_amount !== undefined,
    )
    .sort((a, b) => (a.calculated_price!.calculated_amount ?? 0) - (b.calculated_price!.calculated_amount ?? 0))[0]
}

/** Grundpreis je kg aus Variantengewicht (Gramm), z. B. „39,98 €/kg“. */
function unitPrice(amount: number | null | undefined, weightGrams: number | null | undefined, money: MoneyFormat) {
  if (!amount || !weightGrams) return undefined
  return `${formatMoney((amount / weightGrams) * 1000, money)}/kg`
}

/** StoreProduct → Cards / ProductCard */
export function toProductCard(
  product: HttpTypes.StoreProduct,
  { countryCode, currencyCode, locale }: { countryCode: string } & MoneyFormat,
): ProductCardModel {
  const money = { currencyCode, locale }
  const v = cheapestVariant(product)
  const amount = v?.calculated_price?.calculated_amount
  const multiple = (product.variants?.length ?? 0) > 1
  const unit = unitPrice(amount, v?.weight ?? product.weight, money)
  return {
    id: product.id,
    title: product.title,
    href: productHref(countryCode, product.handle),
    priceLabel: `${multiple ? 'ab ' : ''}${formatMoney(amount, money)}`,
    unitPriceLabel: unit ? `(${multiple ? 'ab ' : ''}${unit})` : undefined,
    image: image(product.thumbnail, product.title),
  }
}

/** StoreProductVariant → Packungsgröße der BuyBox */
export function toProductVariant(variant: HttpTypes.StoreProductVariant, money: MoneyFormat): ProductVariantModel {
  const amount = variant.calculated_price?.calculated_amount
  return {
    id: variant.id,
    label: variant.title ?? '',
    priceLabel: formatMoney(amount, money),
    unitPriceLabel: unitPrice(amount, variant.weight, money),
  }
}

/**
 * StoreProduct → Produktseite (BuyBox, Galerie, Tabs). Highlights, Nachhaltigkeit, Zutaten,
 * Nährwerte und Lieferanten liegen in Medusa als Metadaten (`metadata.highlights` usw.) oder
 * kommen aus dem CMS; fehlen sie, bleiben die Bereiche leer.
 */
export function toProductDetail(product: HttpTypes.StoreProduct, money: MoneyFormat): ProductDetailModel {
  const meta = (product.metadata ?? {}) as Record<string, unknown>
  const strings = (key: string) => (Array.isArray(meta[key]) ? (meta[key] as unknown[]).map(String) : [])
  return {
    id: product.id,
    title: product.title,
    images: (product.images ?? []).map((img, i) => ({ src: img.url, alt: `${product.title} · Bild ${i + 1}` })),
    highlights: strings('highlights'),
    sustainability: strings('sustainability') as ProductDetailModel['sustainability'],
    variants: (product.variants ?? []).map((v) => toProductVariant(v, money)),
    ingredients:
      typeof meta.ingredients === 'string'
        ? { text: meta.ingredients, footnotes: strings('ingredient_notes') }
        : undefined,
  }
}

/** StoreCartLineItem → Cart / ProductItem */
export function toCartItem(
  item: HttpTypes.StoreCartLineItem,
  money: MoneyFormat & { countryCode: string },
): CartItemModel {
  return {
    id: item.id,
    title: item.product_title ?? item.title,
    href: item.product_handle ? productHref(money.countryCode, item.product_handle) : undefined,
    image: image(item.thumbnail, item.product_title ?? item.title),
    variantLabel: item.variant_title,
    quantity: item.quantity,
    itemPriceLabel: formatMoney(item.unit_price, money),
    totalLabel: formatMoney(item.total ?? item.unit_price * item.quantity, money),
  }
}

/** StoreCart → Cart / Summary und Calculation */
export function toCart(
  cart: HttpTypes.StoreCart,
  { countryCode, locale }: { countryCode: string; locale?: string },
): CartModel {
  const money = { currencyCode: cart.currency_code, locale, countryCode }
  return {
    id: cart.id,
    items: (cart.items ?? []).map((i) => toCartItem(i, money)),
    totals: {
      subtotalLabel: formatMoney(cart.item_subtotal, money),
      shippingLabel: formatMoney(cart.shipping_total, money),
      totalLabel: formatMoney(cart.total, money),
    },
  }
}

/** StoreCartAddress → Adresse für SummaryDataset und AddressFieldset */
export function toAddress(address: HttpTypes.StoreCartAddress, countryLabel?: string): AddressModel {
  return {
    firstName: address.first_name ?? '',
    lastName: address.last_name ?? '',
    address1: address.address_1 ?? '',
    address2: address.address_2 || undefined,
    postalCode: address.postal_code ?? '',
    city: address.city ?? '',
    countryLabel,
    phone: address.phone || undefined,
  }
}
