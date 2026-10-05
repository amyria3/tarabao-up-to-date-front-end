import { notFound } from 'next/navigation'

import { CheckoutDelivery } from '@/components/design-system/checkout/checkout-delivery'
import { CheckoutIdentification } from '@/components/design-system/checkout/checkout-identification'
import { CheckoutPayment } from '@/components/design-system/checkout/checkout-payment'
import { FinalCheckout } from '@/components/design-system/checkout/final-checkout'
import { CheckoutPage } from '@/components/design-system/pages/shop-pages'
import { ADDRESS, CART, CUSTOMER, PAYMENT_METHODS, PICKUP_POINTS, SHIPPING_OPTIONS } from '@/lib/fixtures'
import { chrome } from '@/lib/shop/chrome'
import { localize } from '@/lib/shop/routes'

type Params = Promise<{ countryCode: string; step: string }>

/** Schritte des Check-Out-Workflows (Figma 06-01 … 06-16), als Momentaufnahmen mit Beispieldaten. */
export const CHECKOUT_STEPS = ['identification', 'delivery', 'payment', 'final'] as const

export function generateStaticParams() {
  return CHECKOUT_STEPS.map((step) => ({ step }))
}

export default async function CheckoutStepRoute({ params }: { params: Params }) {
  const { countryCode, step } = await params
  if (!(CHECKOUT_STEPS as readonly string[]).includes(step)) notFound()
  const stepView = {
    identification: <CheckoutIdentification variant="returning" defaultEmail={CUSTOMER.email} />,
    delivery: <CheckoutDelivery shippingOptions={SHIPPING_OPTIONS} pickupPoints={PICKUP_POINTS} address={ADDRESS} />,
    payment: <CheckoutPayment shippingAddress={ADDRESS} paymentMethods={PAYMENT_METHODS} />,
    final: <FinalCheckout cart={localize(CART, countryCode)} />,
  }[step as (typeof CHECKOUT_STEPS)[number]]
  return <CheckoutPage chrome={chrome(countryCode)} cart={localize(CART, countryCode)} step={stepView} />
}
