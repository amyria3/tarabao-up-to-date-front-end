import { AllCategoriesPage } from '@modules/categories/templates/all-categories-page'
import { CATEGORY_TREE, categoryCard } from '@/lib/shop/catalog'

type Params = Promise<{ countryCode: string }>

/** Startseite = {Alle Kategorien}: Figma hat noch keine Startseite (offene Punkte 34). */
export default async function HomePage({ params }: { params: Params }) {
  const { countryCode } = await params
  return (
    <AllCategoriesPage
      categories={CATEGORY_TREE.map((c) => categoryCard(c, countryCode))}
      subcategories={CATEGORY_TREE.flatMap((c) => c.children.slice(0, 2).map((s) => categoryCard(s, countryCode, c)))}
    />
  )
}
