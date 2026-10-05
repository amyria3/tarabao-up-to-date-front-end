import { CategoryCardMd, CategoryCardSm } from '@modules/categories/components/category-card'
import { HeadlineH1 } from '@/components/ui/typography'
import { CardsOrder } from '@/components/ui/cards-order'
import { Section } from '@/components/ui/section'
import type { CategoryCardModel } from '@/lib/view-models'

/**
 * Figma: Alle Kategorien (Templates / Page 9250:35515): Templates / Section mit H1 und Templates / Cards Order
 * (Tiles) aus Cards / CategoryCard / MD (Hauptkategorien) und SM (Unterkategorien, Sammlungen).
 * Logo und „Zur Startseite“ führen hierher, solange es keine Startseite gibt (offene Punkte 34).
 */
export function AllCategoriesPage({
  title = 'Alle Kategorien',
  categories,
  subcategories = [],
}: {
  title?: string
  categories: CategoryCardModel[]
  subcategories?: CategoryCardModel[]
}) {
  return (
    <>
      <Section aria-label={title}>
        <HeadlineH1>{title}</HeadlineH1>
        <CardsOrder variant="tiles" className="gap-md">
          {categories.map((c) => (
            <li key={c.id} className="w-80">
              <CategoryCardMd category={c} actionLabel="Zur Kategorie" />
            </li>
          ))}
        </CardsOrder>
        {subcategories.length ? (
          <CardsOrder variant="tiles" className="gap-md">
            {subcategories.map((c) => (
              <li key={c.id} className="w-64">
                <CategoryCardSm category={c} />
              </li>
            ))}
          </CardsOrder>
        ) : null}
      </Section>
    </>
  )
}
