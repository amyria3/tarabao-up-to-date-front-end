import { CartPage } from '@/components/design-system/cart/cart-page'
import { PageTemplate } from '@/components/design-system/templates/page'
import { CART } from '@/lib/fixtures'
import { CATALOG, productCard } from '@/lib/shop/catalog'
import { chrome } from '@/lib/shop/chrome'
import { localize, routes } from '@/lib/shop/routes'

export const metadata = { title: 'Warenkorb' }

/** Figma {Warenkorb} 9250:36914: Templates / Page mit Components / Cart / CartPage. */
export default async function CartRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  const r = routes(countryCode)
  return (
    <PageTemplate {...chrome(countryCode)}>
      <CartPage
        cart={localize(CART, countryCode)}
        loggedIn
        checkoutHref={r.checkout()}
        infoHref={r.page('versandrichtlinien')}
        recommendations={[
          { title: 'Deine Favoriten:', products: CATALOG.slice(0, 4).map((p) => productCard(p, countryCode)) },
        ]}
      />
    </PageTemplate>
  )
}
