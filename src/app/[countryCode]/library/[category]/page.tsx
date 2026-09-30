import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { LIBRARY } from '@/library/registry'
import { CategoryEntries } from '@/library/category-view'
import { CATEGORIES, type CategoryKey } from '@/library/types'

type Params = { countryCode: string; category: string }

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.key }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORIES.find((c) => c.key === category)
  return { title: cat ? cat.title : 'Bibliothek' }
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { countryCode, category } = await params
  const cat = CATEGORIES.find((c) => c.key === category)
  if (!cat) notFound()
  const entries = LIBRARY[cat.key as CategoryKey]

  return (
    <main className="mx-auto flex w-full max-w-content flex-col gap-xl px-md-l py-xl">
      <nav className="type-navigation-route text-content-weak">
        <Link href={`/${countryCode}`}>Bibliothek</Link> / {cat.title}
      </nav>
      <header className="flex flex-col gap-sm">
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
      <CategoryEntries category={cat.key as CategoryKey} />
    </main>
  )
}
