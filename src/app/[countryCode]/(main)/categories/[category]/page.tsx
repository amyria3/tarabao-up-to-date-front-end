import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CategoryPage } from '@modules/categories/templates/category-page'
import { SubcategoryPage } from '@modules/categories/templates/subcategory-page'
import { CATEGORY_TREE, categoryBreadcrumb, categoryCard, findCategory, productsIn } from '@/lib/shop/catalog'
import { routes } from '@/lib/shop/routes'

type Params = Promise<{ countryCode: string; category: string }>

/** Kategorien und Unterkategorien haben wie in Medusa je einen eigenen, flachen Handle. */
export function generateStaticParams() {
  return CATEGORY_TREE.flatMap((c) => [{ category: c.slug }, ...c.children.map((s) => ({ category: s.slug }))])
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category } = await params
  return { title: findCategory(category)?.category.title ?? 'Kategorie' }
}

/**
 * Kategorieseite wie `/categories/[category]` in der Storefront.
 * Oberkategorie (Figma {Nüsse} 9231:41043): je Unterkategorie eine Sections / CategoryPreview.
 * Unterkategorie (Figma {Würzige Snacks} 9681:35335): alle Produkte als Kacheln.
 * Breadcrumb wie in der Storefront: Startseite → Shop → Oberkategorie → Kategorie.
 */
export default async function CategoryRoute({ params }: { params: Params }) {
  const { countryCode, category: handle } = await params
  const found = findCategory(handle)
  if (!found) notFound()
  const r = routes(countryCode)
  const { category, parent } = found
  const breadcrumb = categoryBreadcrumb(found, countryCode)

  if (!parent) {
    return (
      <CategoryPage
        breadcrumb={breadcrumb}
        title={category.title}
        previews={category.children.map((sub) => {
          const products = productsIn(category.slug, sub.slug, countryCode)
          return {
            id: sub.slug,
            title: sub.title,
            href: r.category(sub.slug),
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
      breadcrumb={breadcrumb}
      title={category.title}
      products={productsIn(parent.slug, category.slug, countryCode)}
      categories={parent.children
        .filter((c) => c.slug !== category.slug)
        .map((c) => categoryCard(c, countryCode, parent))}
    />
  )
}
