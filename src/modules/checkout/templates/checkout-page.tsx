import type * as React from 'react'
import { CheckoutCartOverview } from '@modules/cart/templates/cart-page'
import { CheckoutContact } from '@modules/checkout/components/checkout-contact'
import { CheckoutIdentification } from '@modules/checkout/components/checkout-identification'
import { ProductCardRow } from '@/components/LexicalRenderers/CardRow'
import { Section } from '@/components/ui/section'
import type { CartModel, ProductCardModel } from '@/lib/view-models'

/**
 * Figma: Check-Out Workflow (06-01 … 06-17). Oben CartPage · Checkout (Bestellübersicht), dann
 * der Schritt in einer Templates / Section und zwei CardRows mit Empfehlungen.
 */
export function CheckoutPage({
  cart,
  step,
  recommendations = [],
}: {
  cart: CartModel
  /** aktueller Schritt; Standard: Identification (06-01) */
  step?: React.ReactNode
  recommendations?: { title: string; products: ProductCardModel[] }[]
}) {
  return (
    <>
      <CheckoutCartOverview cart={cart} />
      <Section aria-label="Kasse">
        {step ?? <CheckoutIdentification />}
        <CheckoutContact />
      </Section>
      {recommendations.map((r) => (
        <ProductCardRow key={r.title} title={r.title} products={r.products} />
      ))}
    </>
  )
}
