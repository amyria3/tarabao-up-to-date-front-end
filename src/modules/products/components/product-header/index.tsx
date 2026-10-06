'use client'

import * as React from 'react'

import { AddToBasketMobile } from '@modules/products/components/add-to-basket-mobile'
import { BuyBox, type AddToCartRequest, type BuyBoxSelection } from '@modules/products/components/buy-box'
import { ProductGallery } from '@modules/products/components/product-gallery'
import { Section } from '@/components/ui/section'
import type { ProductDetailModel } from '@/lib/view-models'

/**
 * Misst, ob das zweite Kind der Zeile (BuyBox) unter dem ersten (Galerie) liegt.
 * null bis zur ersten Messung im Browser.
 */
function useRowWrapped(row: React.RefObject<HTMLDivElement | null>) {
  const [wrapped, setWrapped] = React.useState<boolean | null>(null)
  React.useEffect(() => {
    const node = row.current
    if (!node || typeof ResizeObserver === 'undefined') return
    const measure = () => {
      const [first, second] = Array.from(node.children) as HTMLElement[]
      if (first && second) setWrapped(second.offsetTop > first.offsetTop)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [row])
  return wrapped
}

/**
 * Figma: Sections / ProductHeader (4221:28723). Templates / Section (py-xl) mit einer Zeile
 * (Umbruch, gap-lg, mittig): Visuals / Product / Image (Galerie) und Components / Product / BuyBox,
 * beide flex-1 bis max-w-block-max.
 *
 * Bricht die BuyBox unter die Galerie um, liegt „In den Warenkorb“ weit unten. Dann zeigt die
 * Galerie unten links den Schnellbutton Components / AddToBasket / Mobile. Er legt die aktuelle
 * Auswahl der BuyBox (Größe, Einmalkauf oder Abo) in den Warenkorb, genau wie „In den Warenkorb“.
 * Figma zeigt ihn über die Variable visible-base-only nur in base; der Code misst den Umbruch
 * selbst. Bis zur ersten Messung gilt die Figma-Regel (md:hidden).
 */
export function ProductHeader({
  product,
  breadcrumb,
  cartCount = 0,
  onAddToCart,
}: {
  product: ProductDetailModel
  breadcrumb?: React.ReactNode
  /** Artikel im Warenkorb, für das Symbol im Schnellbutton */
  cartCount?: number
  onAddToCart?: (request: AddToCartRequest) => void
}) {
  const row = React.useRef<HTMLDivElement>(null)
  const wrapped = useRowWrapped(row)
  const [selection, setSelection] = React.useState<BuyBoxSelection>({
    variantId: product.variants[0]?.id ?? '',
    subscription: false,
  })
  const quickAdd = (
    <AddToBasketMobile
      count={cartCount}
      disabled={!selection.variantId}
      className={wrapped === null ? 'md:hidden' : wrapped ? undefined : 'hidden'}
      onClick={() => onAddToCart?.({ productId: product.id, ...selection })}
    />
  )
  return (
    <Section breadcrumb={breadcrumb} aria-label={product.title}>
      <div ref={row} className="flex w-full flex-wrap items-start justify-center gap-lg">
        <ProductGallery images={product.images} title={product.title} addToCart={quickAdd} className="flex-1" />
        <BuyBox product={product} onAddToCart={onAddToCart} onSelectionChange={setSelection} className="flex-1" />
      </div>
    </Section>
  )
}
