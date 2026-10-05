import { CheckoutPage } from '@/components/design-system/pages/shop-pages'
import { CART } from '@/lib/fixtures'
import { CATALOG, productCard } from '@/lib/shop/catalog'
import { chrome } from '@/lib/shop/chrome'
import { localize } from '@/lib/shop/routes'

export const metadata = { title: 'Kasse' }

/** Figma {Check-Out Workflow} 06-01: Wer gibt die Bestellung auf? Weitere Schritte unter /checkout/[step]. */
export default async function CheckoutRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  return (
    <CheckoutPage
      chrome={chrome(countryCode)}
      cart={localize(CART, countryCode)}
      recommendations={[
        { title: 'Für Dich Empfohlen:', products: CATALOG.slice(4, 8).map((p) => productCard(p, countryCode)) },
      ]}
    />
  )
}
