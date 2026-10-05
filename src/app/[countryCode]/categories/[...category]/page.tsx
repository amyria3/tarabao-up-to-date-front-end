import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CategoryPage, SubcategoryPage } from '@/components/design-system/pages/shop-pages'
import { CATEGORY_TREE, categoryCard, findCategory, productsIn } from '@/lib/shop/catalog'
import { chrome } from '@/lib/shop/chrome'
import { routes } from '@/lib/shop/routes'

type Params = Promise<{ countryCode: string; category: string[] }>

export function generateStaticParams() {
  return CATEGORY_TREE.flatMap((c) => [
    { category: [c.slug] },
    ...c.children.map((s) => ({ category: [c.slug, s.slug] })),
  ])
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category } = await params
  return { title: findCategory(category)?.category.title ?? 'Kategorie' }
}

/**
 * Kategorieseite (Figma {Nüsse} 9231:41043): je Unterkategorie eine Sections / CategoryPreview.
 * Unterkategorie (Figma {Würzige Snacks} 9681:35335): alle Produkte als Kacheln.
 */
export default async function CategoryRoute({ params }: { params: Params }) {
  const { countryCode, category: slugs } = await params
  const found = findCategory(slugs)
  if (!found || slugs.length > 2) notFound()
  const r = routes(countryCode)
  const { category, parent } = found
  const shop = { label: 'Shop', href: r.home }

  if (!parent) {
    return (
      <CategoryPage
        chrome={chrome(countryCode, { breadcrumb: { items: [shop], current: category.title } })}
        title={category.title}
        previews={category.children.map((sub) => {
          const products = productsIn(category.slug, sub.slug, countryCode)
          return {
            id: sub.slug,
            title: sub.title,
            href: r.category(category.slug, sub.slug),
            products: products.slice(0, 3),
            categories: category.children
              .filter((c) => c.slug !== sub.slug)
              .slice(0, 1)
              .map((c) => categoryCard(c, countryCode, category)),
            moreProducts: products.length > 3,
          }
        })}
      />
    )
  }

  return (
    <SubcategoryPage
      chrome={chrome(countryCode, {
        breadcrumb: { items: [shop, { label: parent.title, href: r.category(parent.slug) }], current: category.title },
      })}
      title={category.title}
      products={productsIn(parent.slug, category.slug, countryCode)}
      categories={parent.children
        .filter((c) => c.slug !== category.slug)
        .map((c) => categoryCard(c, countryCode, parent))}
    />
  )
}
