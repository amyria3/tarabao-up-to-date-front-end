'use client'

import Link from 'next/link'

import { CartSummary } from '@modules/cart/components/cart-summary'
import { CheckoutBlock } from '@modules/checkout/components/checkout-block'
import { Button } from '@/components/ui/button'
import type { CartModel } from '@/lib/view-models'

/**
 * Figma: Components / Checkout / FinalCheckout (3807:19305) · Variant=Delivery.
 * Cart / Summary ohne Bearbeitung mit Titel „Gute Wahl!“, Hinweis zu Verkaufsbedingungen und
 * Datenschutz (Links), Buttons / MD / PrimaryButton „mit {Zahlart} kaufen“.
 */
export function FinalCheckout({
  cart,
  paymentLabel = 'PayPal',
  termsHref = '/de-de/page/agb',
  privacyHref = '/de-de/page/datenschutzerklaerung',
  pending,
  onPlaceOrder,
  className,
}: {
  cart: CartModel
  paymentLabel?: string
  termsHref?: string
  privacyHref?: string
  pending?: boolean
  onPlaceOrder?: () => void
  className?: string
}) {
  const link = 'underline focus-visible:outline-2 focus-visible:outline-btn-primary-bg'
  return (
    <CheckoutBlock gap="md-l" className={className} aria-label="Bestellung abschließen">
      <CartSummary cart={cart} editable={false} showTitle title="Gute Wahl!" />
      <p className="w-full type-default-text-s text-content-text">
        Mit dem Abschluss dieser Bestellung bestätigst du, dass du die{' '}
        <Link href={termsHref} className={link}>
          Verkaufsbedingungen
        </Link>{' '}
        gelesen hast und ihnen zustimmst. Bitte lies dir unsere{' '}
        <Link href={privacyHref} className={link}>
          Datenschutzerklärung
        </Link>{' '}
        durch, um zu erfahren, wie wir deine personenbezogenen Daten verarbeiten und wie du deine Datenschutzrechte
        ausüben kannst.
      </p>
      <div className="flex w-full flex-col gap-xxs">
        <Button intent="primary" size="md" className="w-full" disabled={pending} onClick={onPlaceOrder}>
          mit {paymentLabel} kaufen
        </Button>
      </div>
    </CheckoutBlock>
  )
}
