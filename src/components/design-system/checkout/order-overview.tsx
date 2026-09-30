'use client'

import { ProductCard } from '@/components/design-system/cards/product-card'
import { CheckoutCartOverview } from '@/components/design-system/cart/cart-page'
import { CheckoutIdentification } from '@/components/design-system/checkout/checkout-identification'
import { HeadlineH2 } from '@/components/design-system/primitives/typography'
import { CardsOrder } from '@/components/design-system/templates/cards-order'
import type { CartModel, ProductCardModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type OrderOverviewRecommendation = { title: string; products: ProductCardModel[] }

/**
 * Figma: Components / Checkout / OrderOverview (3501:5794). Bestellübersicht in zwei Kontexten:
 * als Overlay unter der Navigation (role=dialog, im DOM außerhalb der <nav>) oder im Seitenfluss
 * der Checkout-Seite. Inhalt: Components / Cart / CartPage · Checkout (kompakt, aufklappbar),
 * Components / Checkout / Identification (Guest) und Empfehlungen mit Cards / ProductCard.
 */
export function OrderOverview({
  cart,
  recommendations = [],
  asDialog = false,
  className,
}: {
  cart: CartModel
  recommendations?: OrderOverviewRecommendation[]
  /** Overlay-Kontext: role=dialog mit Beschriftung */
  asDialog?: boolean
  className?: string
}) {
  return (
    <div
      data-slot="order-overview"
      {...(asDialog ? { role: 'dialog', 'aria-label': 'Bestellübersicht' } : {})}
      className={cn('flex w-full max-w-block-max flex-col bg-surface', className)}
    >
      <CheckoutCartOverview cart={cart} />
      <CheckoutIdentification />
      {recommendations.map((rec) => (
        <section key={rec.title} aria-label={rec.title} className="flex w-full flex-col gap-md-l px-5 py-xl">
          <HeadlineH2>{rec.title}</HeadlineH2>
          <CardsOrder variant="row" className="gap-3">
            {rec.products.map((p) => (
              <li key={p.id} className="w-64">
                <ProductCard product={p} />
              </li>
            ))}
          </CardsOrder>
        </section>
      ))}
    </div>
  )
}
