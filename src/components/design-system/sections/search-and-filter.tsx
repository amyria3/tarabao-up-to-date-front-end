'use client'

import * as React from 'react'

import { ProductCard } from '@/components/design-system/cards/product-card'
import { FilterPanel, type FilterOption, type FilterState } from '@/components/design-system/filter/filter-panel'
import { QueryState } from '@/components/design-system/search/query-state'
import { SearchField } from '@/components/design-system/search/search-field'
import { CardsOrder } from '@/components/design-system/templates/cards-order'
import { Section } from '@/components/design-system/templates/section'
import type { ProductCardModel } from '@/lib/view-models'

export type SearchRequest = { query: string; filters: FilterState }

export interface SearchAndFilterProps {
  filterOptions: FilterOption[]
  /** Liefert die Treffer; null heißt „noch keine Anfrage“. Standard: Suche im Titel von `products`. */
  search?: (request: SearchRequest) => ProductCardModel[] | null
  /** Datenbasis für die Standardsuche (Bibliothek, Storybook) */
  products?: ProductCardModel[]
  defaultQuery?: string
  className?: string
}

function isEmpty({ query, filters }: SearchRequest) {
  return (
    query.trim() === '' &&
    filters.selected.length === 0 &&
    filters.price.min === undefined &&
    filters.price.max === undefined
  )
}

function localSearch(products: ProductCardModel[]) {
  return (request: SearchRequest) => {
    if (isEmpty(request)) return null
    const q = request.query.trim().toLowerCase()
    return products.filter((p) => p.title.toLowerCase().includes(q))
  }
}

/**
 * Figma: Sections / Search & Filter (8945:29843) · State=Default|Results.
 * Zwei Templates / Section: oben Components / Search / Input und Filter / FilterPanel,
 * darunter (Farbmodus purple-tint-surface-snow) Components / Search / QueryState mit den
 * Treffern als Kartenkacheln. Laut Figma nutzt die Section selbst kein Section-Template.
 */
export function SearchAndFilter({
  filterOptions,
  search,
  products = [],
  defaultQuery = '',
  className,
}: SearchAndFilterProps) {
  const [query, setQuery] = React.useState(defaultQuery)
  const [filters, setFilters] = React.useState<FilterState>({ selected: [], price: {} })
  const run = React.useMemo(() => search ?? localSearch(products), [search, products])
  const results = run({ query, filters })
  const state = results === null ? 'idle' : results.length === 0 ? 'empty' : 'results'
  return (
    <div data-slot="search-and-filter" className={className}>
      <Section as="div" role="search" aria-label="Produktsuche">
        <SearchField value={query} onValueChange={setQuery} />
        <FilterPanel options={filterOptions} value={filters} onValueChange={setFilters} />
      </Section>
      <Section as="div" theme="purple-tint-surface-snow">
        <QueryState state={state} resultsText={results ? `${results.length} Treffer` : undefined}>
          <CardsOrder variant="tiles">
            {(results ?? []).map((product) => (
              <li key={product.id} className="w-full max-w-card-max min-w-card-min flex-1">
                <ProductCard product={product} />
              </li>
            ))}
          </CardsOrder>
        </QueryState>
      </Section>
    </div>
  )
}
