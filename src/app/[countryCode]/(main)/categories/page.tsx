import { AllCategoriesPage } from '@modules/categories/templates/all-categories-page'
import { CATEGORY_TREE, categoryCard } from '@/lib/shop/catalog'

export const metadata = { title: 'Shop' }

/**
 * Shop wie `/categories` in der Storefront: Übersicht aller Kategorien (Figma {Alle Kategorien}).
 * Die Breadcrumb aller Katalogseiten führt mit „Shop“ hierher.
 */
export default async function CategoriesRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  return (
    <AllCategoriesPage
      categories={CATEGORY_TREE.map((c) => categoryCard(c, countryCode))}
      subcategories={CATEGORY_TREE.flatMap((c) => c.children.slice(0, 2).map((s) => categoryCard(s, countryCode, c)))}
    />
  )
}
