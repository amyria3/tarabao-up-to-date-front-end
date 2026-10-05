import { SubcategoryPage } from '@modules/categories/templates/subcategory-page'
import { CATALOG, CATEGORY_TREE, categoryCard, productCard, shopTrail } from '@/lib/shop/catalog'

export const metadata = { title: 'Alle Produkte' }

/**
 * Figma {Alle Produkte}. Die Storefront hat dafür keine eigene Seite (siehe docs/ABWEICHUNGEN.md).
 * Breadcrumb wie die Katalogseiten: Startseite → Shop → Alle Produkte.
 */
export default async function StorePage({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  return (
    <SubcategoryPage
      breadcrumb={{ items: [...shopTrail(countryCode), { label: 'Alle Produkte' }] }}
      title="Alle Produkte"
      products={CATALOG.slice(0, 12).map((p) => productCard(p, countryCode))}
      categories={CATEGORY_TREE.map((c) => categoryCard(c, countryCode))}
    />
  )
}
