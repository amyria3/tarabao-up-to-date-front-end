import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CompanyPage } from '@modules/pages/templates/company-page'
import { LegalPage } from '@modules/pages/templates/legal-page'
import { STATIC_PAGES } from '@/lib/shop/content'
import { LIBRARY_SLUG } from '@/lib/shop/routes'
import { LibraryCategoryPage, LibraryOverviewPage, libraryCategoryFromSlug } from '@/library/pages'
import { CATEGORIES } from '@/library/types'

type Params = Promise<{ countryCode: string; slug: string }>

export function generateStaticParams() {
  return [
    ...Object.keys(STATIC_PAGES).map((slug) => ({ slug })),
    { slug: LIBRARY_SLUG },
    ...CATEGORIES.map((c) => ({ slug: `${LIBRARY_SLUG}-${c.key}` })),
  ]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  if (slug === LIBRARY_SLUG) return { title: 'Komponenten-Bibliothek' }
  const category = libraryCategoryFromSlug(slug)
  if (category) return { title: category.title }
  return { title: STATIC_PAGES[slug]?.title ?? 'Seite' }
}

/**
 * Statische Seiten wie `/page/[slug]` in der Storefront (dort aus Payload), ohne Breadcrumb:
 * Rechtstexte, Unternehmensseiten und, nur in Front-End Complete, die Komponenten-Bibliothek.
 * So steht die Übersicht aller Komponenten auf derselben Ebene wie „Über uns“.
 */
export default async function StaticPageRoute({ params }: { params: Params }) {
  const { countryCode, slug } = await params
  if (slug === LIBRARY_SLUG) return <LibraryOverviewPage countryCode={countryCode} />
  const category = libraryCategoryFromSlug(slug)
  if (category) return <LibraryCategoryPage countryCode={countryCode} category={category.key} />

  const page = STATIC_PAGES[slug]
  if (!page) notFound()
  if (page.kind === 'legal') return <LegalPage title={page.title} align={page.align} blocks={page.blocks} />
  return <CompanyPage {...page} />
}
