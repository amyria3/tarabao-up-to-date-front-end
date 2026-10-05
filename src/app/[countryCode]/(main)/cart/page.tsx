import { CartPage } from '@modules/cart/templates/cart-page'
import { CART } from '@/lib/fixtures'
import { CATALOG, productCard } from '@/lib/shop/catalog'
import { localize, routes } from '@/lib/shop/routes'

export const metadata = { title: 'Warenkorb' }

/** Warenkorb wie `/cart` in der Storefront. Figma {Warenkorb} 9250:36914: Components / Cart / CartPage. */
export default async function CartRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  const r = routes(countryCode)
  return (
    <CartPage
      cart={localize(CART, countryCode)}
      loggedIn
      checkoutHref={r.checkout()}
      infoHref={r.page('versandrichtlinien')}
      recommendations={[
        { title: 'Deine Favoriten:', products: CATALOG.slice(0, 4).map((p) => productCard(p, countryCode)) },
      ]}
    />
  )
}
