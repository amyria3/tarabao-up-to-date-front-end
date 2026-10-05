import { notFound } from 'next/navigation'

import { CheckoutDelivery } from '@modules/checkout/components/checkout-delivery'
import { CheckoutIdentification } from '@modules/checkout/components/checkout-identification'
import { CheckoutPayment } from '@modules/checkout/components/checkout-payment'
import { FinalCheckout } from '@modules/checkout/components/final-checkout'
import { CheckoutPage } from '@modules/checkout/templates/checkout-page'
import { ADDRESS, CART, CUSTOMER, PAYMENT_METHODS, PICKUP_POINTS, SHIPPING_OPTIONS } from '@/lib/fixtures'
import { CATALOG, productCard } from '@/lib/shop/catalog'
import { CHECKOUT_STEPS, type CheckoutStep, localize } from '@/lib/shop/routes'

export const metadata = { title: 'Kasse' }

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ step?: string }>
}

/**
 * Kasse wie `/checkout` in der Storefront: eine Route, der Schritt steht in `?step=`.
 * Ohne Schritt zeigt sie Figma 06-01 „Wer gibt die Bestellung auf?“. Die Schritte sind
 * Momentaufnahmen mit Beispieldaten (Figma 06-03 … 06-16): email = Anmeldung, delivery = Lieferung,
 * payment = Zahlung, review = Prüfen & kaufen.
 */
export default async function CheckoutRoute({ params, searchParams }: Props) {
  const [{ countryCode }, { step }] = await Promise.all([params, searchParams])
  const cart = localize(CART, countryCode)

  if (!step) {
    return (
      <CheckoutPage
        cart={cart}
        recommendations={[
          { title: 'Für Dich Empfohlen:', products: CATALOG.slice(4, 8).map((p) => productCard(p, countryCode)) },
        ]}
      />
    )
  }

  if (!(CHECKOUT_STEPS as readonly string[]).includes(step)) notFound()
  const stepView = {
    email: <CheckoutIdentification variant="returning" defaultEmail={CUSTOMER.email} />,
    delivery: <CheckoutDelivery shippingOptions={SHIPPING_OPTIONS} pickupPoints={PICKUP_POINTS} address={ADDRESS} />,
    payment: <CheckoutPayment shippingAddress={ADDRESS} paymentMethods={PAYMENT_METHODS} />,
    review: <FinalCheckout cart={cart} />,
  }[step as CheckoutStep]
  return <CheckoutPage cart={cart} step={stepView} />
}
