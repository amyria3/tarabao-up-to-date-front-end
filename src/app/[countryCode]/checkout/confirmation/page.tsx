import { OrderConfirmationPage } from '@/components/design-system/pages/shop-pages'
import { chrome } from '@/lib/shop/chrome'

export const metadata = { title: 'Bestellbestätigung' }

/** Figma 06-17-Checkout-OrderConfirmation. */
export default async function ConfirmationRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  return <OrderConfirmationPage chrome={chrome(countryCode)} deliveryDateLabel="10.11.2026" />
}
