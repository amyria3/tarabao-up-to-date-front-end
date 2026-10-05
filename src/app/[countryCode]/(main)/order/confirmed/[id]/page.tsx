import { notFound } from 'next/navigation'

import { OrderConfirmationPage } from '@modules/order/templates/order-confirmation-page'
import { SAMPLE_ORDER_ID } from '@/lib/shop/routes'

export const metadata = { title: 'Bestellbestätigung' }

export function generateStaticParams() {
  return [{ id: SAMPLE_ORDER_ID }]
}

/** Bestellbestätigung wie `/order/confirmed/[id]` in der Storefront (Figma 06-17), mit der Beispielbestellung. */
export default async function OrderConfirmedRoute({
  params,
}: {
  params: Promise<{ countryCode: string; id: string }>
}) {
  const { id } = await params
  if (id !== SAMPLE_ORDER_ID) notFound()
  return <OrderConfirmationPage deliveryDateLabel="10.11.2026" />
}
