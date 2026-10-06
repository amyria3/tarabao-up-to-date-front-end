import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContentBasic } from '@/components/LexicalRenderers/ContentBasic'
import { BulletedList } from '@/components/ui/typography'
import { ProductPage } from '@modules/products/templates/product-page'
import { ProductImage } from '@modules/products/components/product-image'
import { BLOG_POST, PRODUCT_TABS_CONTENT, REVIEW, REVIEW_LIKED, SUSTAINABILITY_CONTENT } from '@/lib/fixtures'
import { CATALOG, findProduct, productBreadcrumb, productDetail, relatedProducts } from '@/lib/shop/catalog'
import { BLOG_POSTS } from '@/lib/shop/content'
import { routes } from '@/lib/shop/routes'

type Params = Promise<{ countryCode: string; handle: string }>

export function generateStaticParams() {
  return CATALOG.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { handle } = await params
  return { title: findProduct(handle)?.card.title ?? 'Produkt' }
}

const REVIEWS = [REVIEW, REVIEW_LIKED, { ...REVIEW, id: 'rev_3' }, { ...REVIEW_LIKED, id: 'rev_4' }]

/** Produktseiten (Figma 8232:25333, 9544:41166, 9544:42195, 9544:43207): eine Seite je Handle. */
export default async function ProductRoute({ params }: { params: Params }) {
  const { countryCode, handle } = await params
  const product = findProduct(handle)
  if (!product) notFound()
  const r = routes(countryCode)
  const sustainability = {
    intro: SUSTAINABILITY_CONTENT.intro,
    supplier: {
      left: (
        <ContentBasic
          headline={SUSTAINABILITY_CONTENT.supplier.headline}
          headingLevel="h2"
          align="center"
          paragraphs={[SUSTAINABILITY_CONTENT.supplier.text]}
        />
      ),
      right: (
        <div className="flex w-full flex-col gap-md-l">
          <BulletedList items={SUSTAINABILITY_CONTENT.supplier.facts} />
          <div className="h-48 w-full">
            <ProductImage />
          </div>
        </div>
      ),
    },
    tabs: SUSTAINABILITY_CONTENT.tabs,
    highlights: SUSTAINABILITY_CONTENT.highlights,
  }
  return (
    <ProductPage
      breadcrumb={productBreadcrumb(product, countryCode)}
      product={productDetail(product, countryCode)}
      tabs={PRODUCT_TABS_CONTENT}
      sustainability={sustainability}
      reviews={REVIEWS}
      blogPosts={BLOG_POSTS.map((post, i) => ({
        ...BLOG_POST,
        id: `blog_${i}`,
        title: post.title,
        href: r.post(post.slug),
      }))}
      related={relatedProducts(product, countryCode)}
    />
  )
}
