'use client'

import * as React from 'react'

import { FilterChip } from '@/components/design-system/filter/filter-chip'
import { PriceRange, type PriceRangeValue } from '@/components/design-system/filter/price-range'
import { cn } from '@/lib/utils'

export type FilterOption = { id: string; label: string }

export type FilterState = { selected: string[]; price: PriceRangeValue }

export interface FilterPanelProps {
  options: FilterOption[]
  value?: FilterState
  onValueChange?: (value: FilterState) => void
  priceLabel?: string
  className?: string
}

/**
 * Figma: Components / Filter / FilterPanel (2211:2165) · Filtering?, Unfolded?.
 * Spalte gap-xxs, max-w-block-double-max: FilterChips (Umbruch, gap-1) und darunter
 * Filter / PriceRange. Ohne aktiven Filter stehen die Chips mittig, mit Filter linksbündig
 * (Filtering?=True). Die eingeklappte Variante (Unfolded?=False) ist nicht umgesetzt.
 */
export function FilterPanel({ options, value: controlled, onValueChange, priceLabel, className }: FilterPanelProps) {
  const [inner, setInner] = React.useState<FilterState>({ selected: [], price: {} })
  const value = controlled ?? inner
  const setValue = (next: FilterState) => {
    if (controlled === undefined) setInner(next)
    onValueChange?.(next)
  }
  const filtering = value.selected.length > 0 || value.price.min !== undefined || value.price.max !== undefined
  return (
    <div
      data-slot="filter-panel"
      data-filtering={filtering || undefined}
      role="group"
      aria-label="Filter"
      className={cn('flex w-full max-w-block-double-max flex-col items-center gap-xxs', className)}
    >
      <div className={cn('flex w-full flex-wrap gap-1', filtering ? 'justify-start' : 'justify-center')}>
        {options.map((option) => {
          const selected = value.selected.includes(option.id)
          return (
            <FilterChip
              key={option.id}
              label={option.label}
              selected={selected}
              onSelectedChange={(on) =>
                setValue({
                  ...value,
                  selected: on ? [...value.selected, option.id] : value.selected.filter((id) => id !== option.id),
                })
              }
            />
          )
        })}
      </div>
      <PriceRange label={priceLabel} value={value.price} onValueChange={(price) => setValue({ ...value, price })} />
    </div>
  )
}
