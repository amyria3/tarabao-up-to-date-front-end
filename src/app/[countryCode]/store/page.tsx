import { SubcategoryPage } from '@/components/design-system/pages/shop-pages'
import { CATALOG, CATEGORY_TREE, categoryCard, productCard } from '@/lib/shop/catalog'
import { chrome } from '@/lib/shop/chrome'
import { routes } from '@/lib/shop/routes'

export const metadata = { title: 'Alle Produkte' }

export default async function StorePage({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  const r = routes(countryCode)
  return (
    <SubcategoryPage
      chrome={chrome(countryCode, {
        breadcrumb: { items: [{ label: 'Shop', href: r.home }], current: 'Alle Produkte' },
      })}
      title="Alle Produkte"
      products={CATALOG.slice(0, 12).map((p) => productCard(p, countryCode))}
      categories={CATEGORY_TREE.map((c) => categoryCard(c, countryCode))}
    />
  )
}
