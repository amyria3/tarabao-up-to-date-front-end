import Link from 'next/link'

import { LIBRARY } from '@/library/registry'
import { CATEGORIES } from '@/library/types'
import { routes } from '@/lib/shop/routes'

export const metadata = { title: 'Bibliothek' }

export default async function LibraryIndex({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  const r = routes(countryCode)
  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-xl px-md-l py-xl">
      <nav className="type-navigation-route text-content-weak">
        <Link href={r.home}>Shop</Link> / Bibliothek
      </nav>
      <header className="flex flex-col gap-sm">
        <h1 className="hyphens-auto break-words type-h1 text-content-loud-headline">Bibliothek</h1>
        <p className="type-default-text-lg">
          Designsystem und vollständige Komponenten-Bibliothek aus Figma „B2C und CI“, gebaut auf shadcn/ui und
          kompatibel mit apps/medusa-storefront. Die Seiten des Shops erreichst Du über den{' '}
          <Link href={r.home} className="underline">
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
    </main>
  )
}
