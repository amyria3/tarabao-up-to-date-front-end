import type { BreadcrumbProps } from '@modules/common/components/breadcrumbs'
import { PageBreadcrumb } from '@modules/common/components/breadcrumbs/page-breadcrumb'
import { ProductHeader } from '@modules/products/components/product-header'
import { BlogCardsSection, CustomerReviewsSection, ProductCardRow } from '@/components/LexicalRenderers/CardRow'
import { SustainabilitySection, type SustainabilitySectionProps } from '@/components/LexicalRenderers/CmsSection'
import { ShiftBetweenContent, type ProductTabsContent } from '@modules/products/components/product-tabs'
import type { ProductCardModel, ProductDetailModel, ReviewModel, TeaserModel } from '@/lib/view-models'

/**
 * Figma: Produktseiten Jancys Curry-Cashews (8232:25333), Tamari-Sesam-Cashews (9544:41166),
 * Macadamia süß-salzig (9544:42195), Ananasstücke schokoliert (9544:43207): dieselbe Seite, die Sorte
 * wählt in Figma der Modus-Pin __Products / Doypacks, im Code `product`. Section-Slots: ProductHeader,
 * Tabs / ShiftBetweenContent (Tabs ab md, Liste mit Overlay in base), Sustainability, BlogCards,
 * CustomerReviews, CardRow („Das könnte Dich auch interessieren“, die drei anderen Sorten). Mit Breadcrumb.
 */
export function ProductPage({
  breadcrumb,
  product,
  tabs,
  sustainability,
  reviews,
  blogPosts,
  related,
}: {
  breadcrumb?: BreadcrumbProps
  product: ProductDetailModel
  tabs: ProductTabsContent
  sustainability: SustainabilitySectionProps
  reviews: ReviewModel[]
  blogPosts: TeaserModel[]
  related: ProductCardModel[]
}) {
  return (
    <>
      {breadcrumb ? <PageBreadcrumb {...breadcrumb} className="pt-md-l" /> : null}
      <ProductHeader product={product} />
      <ShiftBetweenContent product={product} content={tabs} reviews={reviews} />
      <SustainabilitySection {...sustainability} />
      <BlogCardsSection posts={blogPosts} />
      <CustomerReviewsSection reviews={reviews} />
      <ProductCardRow title="Das könnte Dich auch interessieren" products={related} />
    </>
  )
}
