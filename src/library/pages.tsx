import Link from 'next/link'

import { CategoryEntries } from '@/library/category-view'
import { LIBRARY } from '@/library/registry'
import { CATEGORIES, type CategoryKey } from '@/library/types'
import { LIBRARY_SLUG, routes } from '@/lib/shop/routes'

/**
 * Seiten der Komponenten-Bibliothek. Sie gibt es nur in Front-End Complete. Sie liegen wie die
 * statischen Seiten unter `/page/[slug]`: die Übersicht unter `/page/komponenten`, jede Figma-Kategorie
 * unter `/page/komponenten-<kategorie>`.
 */

/** Liefert die Bibliothekskategorie zu einem Slug wie `komponenten-buttons`, sonst undefined. */
export function libraryCategoryFromSlug(slug: string) {
  const prefix = `${LIBRARY_SLUG}-`
  return slug.startsWith(prefix) ? CATEGORIES.find((c) => c.key === slug.slice(prefix.length)) : undefined
}

/** Übersicht aller Komponenten: eine Kachel je Figma-Kategorie. */
export function LibraryOverviewPage({ countryCode }: { countryCode: string }) {
  const r = routes(countryCode)
  return (
    <div className="mx-auto flex w-full max-w-content flex-col gap-xl px-md-l py-xl">
      <header className="flex flex-col gap-sm">
        <h1 className="hyphens-auto break-words type-h1 text-content-loud-headline">Komponenten-Bibliothek</h1>
        <p className="type-default-text-lg">
          Designsystem und vollständige Komponenten-Bibliothek aus Figma „B2C und CI“, gebaut auf shadcn/ui und
          kompatibel mit apps/medusa-storefront. Die Seiten des Shops erreichst Du über den{' '}
          <Link href={r.categories} className="underline">
            Shop
          </Link>{' '}
          und seine Navigation.
        </p>
      </header>
      <ul className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <li key={c.key}>
            <Link
              href={r.libraryCategory(c.key)}
              className="flex h-full flex-col gap-xs bg-card-surface p-md text-card-content-text hover:bg-card-surface-hover"
            >
              <span className="type-h3">{c.title}</span>
              <span className="type-default-text-md">{c.description}</span>
              <span className="type-default-text-s text-content-weak">{LIBRARY[c.key].length} Einträge</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Eine Figma-Kategorie mit allen Einträgen und Sprungmarken. */
export function LibraryCategoryPage({ countryCode, category }: { countryCode: string; category: CategoryKey }) {
  const cat = CATEGORIES.find((c) => c.key === category)!
  const entries = LIBRARY[category]
  return (
    <div className="mx-auto flex w-full max-w-content flex-col gap-xl px-md-l py-xl">
      <header className="flex flex-col gap-sm">
        <Link href={routes(countryCode).library} className="type-navigation-route text-content-weak underline">
          Alle Komponenten
        </Link>
        <h1 className="hyphens-auto break-words type-h1 text-content-loud-headline">{cat.title}</h1>
        <p className="type-default-text-lg">{cat.description}</p>
        <ul className="flex flex-wrap gap-x-md gap-y-xxs type-default-text-s">
          {entries.map((e) => (
            <li key={e.id}>
              <a className="underline" href={`#${e.id}`}>
                {e.figma}
              </a>
            </li>
          ))}
        </ul>
      </header>
      <CategoryEntries category={category} />
    </div>
  )
}
