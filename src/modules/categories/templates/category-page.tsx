import type { BreadcrumbProps } from '@modules/common/components/breadcrumbs'
import { PageBreadcrumb } from '@modules/common/components/breadcrumbs/page-breadcrumb'
import { CategoryCardSm } from '@modules/categories/components/category-card'
import { ProductCard } from '@modules/products/components/product-card'
import { HeadlineH1 } from '@/components/ui/typography'
import { CategoryPreview } from '@modules/categories/components/category-preview'
import { Section } from '@/components/ui/section'
import type { CategoryCardModel, ProductCardModel } from '@/lib/view-models'

export type CategoryPreviewModel = {
  id: string
  title: string
  href: string
  products: ProductCardModel[]
  /** Kategoriekarten (Cards / CategoryCard / SM) am Ende der Vorschau */
  categories?: CategoryCardModel[]
  /** Figma More products?: mehr Produkte als die Vorschau zeigt */
  moreProducts?: boolean
}

/**
 * Figma: Kategorieseite Nüsse (Templates / Page 9231:41043) mit Breadcrumb: Templates / Section mit H1,
 * dann je Unterkategorie Sections / CategoryPreview (Naturbelassen, Würzige Snacks …) mit
 * Cards / ProductCard / CompactSize und Cards / CategoryCard / SM in Templates / Cards Order.
 */
export function CategoryPage({
  breadcrumb,
  title,
  previews,
}: {
  breadcrumb?: BreadcrumbProps
  title: string
  previews: CategoryPreviewModel[]
}) {
  return (
    <>
      {breadcrumb ? <PageBreadcrumb {...breadcrumb} className="pt-md-l" /> : null}
      <Section aria-label={title} className="pb-zero">
        <HeadlineH1>{title}</HeadlineH1>
      </Section>
      {previews.map((preview) => (
        <CategoryPreview
          key={preview.id}
          title={preview.title}
          href={preview.href}
          moreProducts={preview.moreProducts ?? true}
        >
          {preview.products.map((p) => (
            <li key={p.id} className="w-64">
              <ProductCard product={p} size="compact" headingLevel="h3" />
            </li>
          ))}
          {preview.categories?.map((c) => (
            <li key={c.id} className="w-64">
              <CategoryCardSm category={c} />
            </li>
          ))}
        </CategoryPreview>
      ))}
    </>
  )
}
