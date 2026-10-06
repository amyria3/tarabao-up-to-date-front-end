/**
 * View-Modelle der Bibliothek. Komponenten kennen nur diese Typen, nie
 * @medusajs/* (ADR 0002). src/lib/medusa/mapper.ts übersetzt Medusa-Daten
 * hierher; die Bibliothek nutzt typisierte Beispieldaten (src/lib/fixtures).
 */

import type { SustainabilityCategory } from '@/lib/design-system/sustainability'

export type ImageModel = {
  src: string
  alt: string
  width?: number
  height?: number
}

export type ProductCardModel = {
  id: string
  title: string
  /** Kurzname für Cards / ProductCard / CompactSize (Figma Item-Short-Name), z. B. „Tamari-Cashews“ */
  shortTitle?: string
  href: string
  /** Formatierter Preis, z. B. „ab 19,99 €“ */
  priceLabel: string
  /** Grundpreis, z. B. „(ab 39,98 €/kg)“ */
  unitPriceLabel?: string
  /**
   * Preis je Packung für Cards / ProductCard / CompactSize (Figma Item-Product-Price und Item-Weight),
   * z. B. „5,49 € / 130 g“
   */
  packPriceLabel?: string
  image?: ImageModel
  /** Durchschnittliche Bewertung 0–5 (Cards / ProductCardWithReviews) */
  rating?: number
  reviewCountLabel?: string
}

export type CategoryCardModel = {
  id: string
  title: string
  href: string
  image?: ImageModel
}

export type VoucherModel = {
  code: string
  conditions: string
}

export type ReviewModel = {
  id: string
  rating: number
  author: string
  dateLabel: string
  title: string
  body: string
  image?: ImageModel
  likes?: number
}

export type TeaserModel = {
  id: string
  title: string
  subtitle?: string
  body?: string
  href?: string
  linkLabel?: string
  image?: ImageModel
  /** FeaturedCard Variant=BlogPost */
  author?: string
  dateLabel?: string
  /** DiscoveryCard Hover: Fragen und Antworten */
  facts?: { question: string; answer: string }[]
}

export type MegaCardModel = {
  /** eine Zeile je Titel-Banner */
  titleLines: string[]
  /** Fließtext mit **fett** und [Linktext](/pfad) (siehe InlineMarkup) */
  body: string
  ctaLabel: string
  href: string
  image?: ImageModel
}

export type MoneyLabel = string

export type OrderStatus = 'sent' | 'arrived'

/** Figma Components / PurchaseSummary */
export type PurchaseSummaryModel = {
  orderNumber: string
  itemCountLabel: string
  totalLabel: string
  orderedAtLabel: string
  shippedAtLabel?: string
  arrivedAtLabel?: string
  invoiceHref?: string
  trackingHref?: string
}

export type PurchaseModel = {
  id: string
  status: OrderStatus
  statusLabel: string
  images: ImageModel[]
  summary: PurchaseSummaryModel
  ctaLabel: string
}

/* ---- Navigation ---- */

export type NavLinkModel = {
  label: string
  /** ohne href: reiner Text (z. B. Zahlungsarten im Footer) */
  href?: string
}

/** Figma Navigation / NavBlocks: Überschrift + Links, oder nur Hauptlinks (title leer) */
export type NavGroupModel = {
  id: string
  title?: string
  links: NavLinkModel[]
}

export type PromoModel = {
  /** md/lg: Langtext */
  text: string
  /** base: Kurztext */
  shortText?: string
}

export type FooterModel = {
  /** md/lg: Slogan unter dem Logo */
  slogan: string
  /** base: Slogan von Logo & Slogan (Zeilenumbruch mit \n) */
  sloganCompact?: string
  about: NavGroupModel
  payment: NavGroupModel
  service: NavGroupModel
  contact: NavGroupModel
  legal: NavGroupModel
}

/* ---- Warenkorb ---- */

export type CartItemModel = {
  id: string
  title: string
  href?: string
  image?: ImageModel
  /** z. B. „39.98 €/ kg“ */
  unitPriceLabel?: string
  /** z. B. „0.5kg“ */
  variantLabel?: string
  quantity: number
  /** Preis je Stück, z. B. „19,90 €“ */
  itemPriceLabel?: string
  /** Zeilensumme, z. B. „19,90 €“ */
  totalLabel: string
  /** Bestellart (Figma: Block „Wiederkehrende Lieferungen“ vs. „Einmalige Lieferungen“) */
  subscription?: boolean
}

export type CartTotalsModel = {
  subtotalLabel: string
  shippingLabel: string
  depositLabel?: string
  totalLabel: string
}

export type CartModel = {
  id: string
  items: CartItemModel[]
  totals: CartTotalsModel
}

/* ---- Checkout ---- */

export type AddressModel = {
  firstName: string
  lastName: string
  address1: string
  address2?: string
  postalCode: string
  city: string
  countryLabel?: string
  phone?: string
}

export type ShippingOptionModel = { id: string; label: string; description?: string; priceLabel?: string }

export type PickupPointModel = { id: string; name: string; addressLabel: string }

export type PaymentMethodModel = { id: string; label: string; description?: string }

/* ---- Produktseite ---- */

export type ProductVariantModel = {
  id: string
  /** z. B. „0.5 kg“ */
  label: string
  /** z. B. „19.99€“ */
  priceLabel: string
  /** z. B. „39.98€/ kg“ */
  unitPriceLabel?: string
}

export type SupplierModel = {
  /** z. B. „Firmenname ([Produkt] / [Zutat])*“ */
  name: string
  note?: string
  facts: { question: string; answer: string }[]
}

export type ProductDetailModel = {
  id: string
  title: string
  rating?: number
  reviewsHref?: string
  images: ImageModel[]
  highlights: string[]
  sustainability?: SustainabilityCategory[]
  variants: ProductVariantModel[]
  ingredients?: { text: string; footnotes?: string[] }
  nutrition?: { head: [string, string]; rows: [string, string][] }
  suppliers?: SupplierModel[]
}

/* ---- Nussmixer ---- */

export type NutmixerProductModel = ProductCardModel & {
  categoryId: string
  /** Gramm je Schritt, z. B. 75 */
  stepGrams: number
  /** Preis je Schritt, z. B. „3,60 € / 75 kg“ (Figma-Text) */
  stepPriceLabel: string
}

export type NutmixerCategoryModel = { id: string; label: string }

/* ---- Rezept (Components / Recipe, ContentModules / CMS / RecipeStep, Sections / ImageCarousel) ---- */

export type IngredientModel =
  | { kind?: 'ingredient'; id: string; amount: number | null; unit?: string; name: string }
  | { kind: 'group'; id: string; title: string }

export type RecipeStepModel = { id: string; label: string; meta?: string; text: string; image?: ImageModel }

export type ImageCardModel = { id: string; image?: ImageModel; caption: string }
