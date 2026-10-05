import type { BreadcrumbProps } from '@modules/common/components/breadcrumbs'
import { PageBreadcrumb } from '@modules/common/components/breadcrumbs/page-breadcrumb'
import { CategoryCardSm } from '@modules/categories/components/category-card'
import { ProductCard } from '@modules/products/components/product-card'
import { HeadlineH1 } from '@/components/ui/typography'
import { CardsOrder } from '@/components/ui/cards-order'
import { Section } from '@/components/ui/section'
import type { CategoryCardModel, ProductCardModel } from '@/lib/view-models'

/**
 * Figma: Unterkategorie Würzige Snacks (Templates / Page 9681:35335), Breadcrumb „Nüsse > Würzige Snacks“:
 * Templates / Section mit H1 und Templates / Cards Order (Tiles) aus Cards / ProductCard / CompactSize
 * und Cards / CategoryCard / SM. Dieselbe Seite zeigt {Alle Kategorien} mit CategoryCard MD und SM.
 */
export function SubcategoryPage({
  breadcrumb,
  title,
  products,
  categories = [],
}: {
  breadcrumb?: BreadcrumbProps
  title: string
  products: ProductCardModel[]
  categories?: CategoryCardModel[]
}) {
  return (
    <>
      {breadcrumb ? <PageBreadcrumb {...breadcrumb} className="pt-md-l" /> : null}
      <Section aria-label={title}>
        <HeadlineH1>{title}</HeadlineH1>
        <CardsOrder variant="tiles" className="gap-md">
          {products.map((p) => (
            <li key={p.id} className="w-64">
              <ProductCard product={p} size="compact" />
            </li>
          ))}
          {categories.map((c) => (
            <li key={c.id} className="w-64">
              <CategoryCardSm category={c} />
            </li>
          ))}
        </CardsOrder>
      </Section>
    </>
  )
}
