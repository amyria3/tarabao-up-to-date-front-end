'use client'

import * as React from 'react'

import { IconClose6 } from '@/components/design-system/icons/figma-icons'
import { ArrowUpOrDown } from '@/components/design-system/primitives/arrow-up-or-down'
import { cn } from '@/lib/utils'

export type PriceRangeValue = { min?: number; max?: number }

const HOVER_BOX = 'hovered:shadow-filter-hover'

/**
 * Figma: Components / Filter / PriceFilterInputField (2810:2830).
 * Feld px-4 py-2 auf price-filter-bg, Kontur price-filter-label 1 px, Eingabe Input/InputText
 * mit „€“. Aktiv (Fokus): price-filter-bg-hover und price-filter-label-hover.
 */
function PriceField({
  id,
  label,
  value,
  onCommit,
}: {
  id: string
  label: string
  value?: number
  onCommit: (value: number | undefined) => void
}) {
  const [draft, setDraft] = React.useState(value === undefined ? '' : String(value))
  React.useEffect(() => setDraft(value === undefined ? '' : String(value)), [value])
  const commit = () => {
    const n = Number(draft.replace(',', '.'))
    onCommit(draft.trim() === '' || Number.isNaN(n) ? undefined : n)
  }
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor={id} className="type-price-range-filter-label text-price-filter-label">
        {label}
      </label>
      <div
        className={cn(
          'flex items-center gap-2.5 bg-price-filter-bg px-4 py-2 text-price-filter-label inset-ring inset-ring-price-filter-label',
          'focus-within:bg-price-filter-bg-hover focus-within:text-price-filter-label-hover focus-within:inset-ring-price-filter-label-hover',
        )}
      >
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit()
          }}
          className="w-7 bg-transparent text-right type-input-input-text outline-none"
        />
        <span aria-hidden className="type-input-input-text">
          €
        </span>
      </div>
    </div>
  )
}

export interface PriceRangeProps {
  value?: PriceRangeValue
  onValueChange?: (value: PriceRangeValue) => void
  label?: string
  defaultOpen?: boolean
  className?: string
}

/**
 * Figma: Components / Filter / PriceRange (2605:2931) · Open?, Filter is On?
 * mit Drop Down Button (2829:2901), PriceFilterInput (2849:1395) und PriceRange / Chip(s).
 * Button „Preisspanne“ (Label/default, px-md py-md-sm, gap-md-sm, ArrowUpOrDown 14) auf
 * price-dd-bg; bei aktivem Filter price-dd-bg-selected. Offen: Eingabe Minimum – Maximum
 * (p md-sm/md, price-filter-bg-hover) und je Grenze ein Chip „ab … Euro“ / „bis … Euro“ zum Entfernen.
 */
export function PriceRange({
  value: controlled,
  onValueChange,
  label = 'Preisspanne',
  defaultOpen = false,
  className,
}: PriceRangeProps) {
  const [inner, setInner] = React.useState<PriceRangeValue>({})
  const value = controlled ?? inner
  const setValue = (next: PriceRangeValue) => {
    if (controlled === undefined) setInner(next)
    onValueChange?.(next)
  }
  const [open, setOpen] = React.useState(defaultOpen)
  const panelId = React.useId()
  const on = value.min !== undefined || value.max !== undefined
  return (
    <div data-slot="price-range" className={cn('flex flex-col items-center gap-xxs', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        data-state={on ? 'on' : 'off'}
        onClick={() => setOpen(!open)}
        className={cn(
          'inline-flex cursor-pointer items-center gap-md-sm bg-price-dd-bg px-md py-md-sm type-label-default text-price-dd-label inset-ring-2 inset-ring-filter-panel-stroke',
          'hovered:bg-price-dd-bg-hover hovered:text-price-dd-label-hover hovered:inset-ring-4',
          'data-[state=on]:bg-price-dd-bg-selected data-[state=on]:type-label-selected data-[state=on]:text-price-dd-label-selected',
          'data-[state=on]:hovered:bg-price-dd-bg-selected-hover data-[state=on]:hovered:text-price-dd-label-selected-hover data-[state=on]:hovered:inset-ring-3',
          HOVER_BOX,
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        )}
      >
        {label}
        <ArrowUpOrDown variant={open ? 'up' : 'down'} size={14} aria-hidden className="text-current" />
      </button>
      {open ? (
        <div
          id={panelId}
          role="group"
          aria-label={label}
          className={cn(
            'group/panel flex items-end bg-price-filter-bg-hover px-md py-md-sm',
            'hover:bg-price-filter-bg hover:shadow-filter-hover hover:inset-ring-4 hover:inset-ring-filter-panel-stroke',
            'focus-within:bg-price-filter-bg focus-within:inset-ring-4 focus-within:inset-ring-filter-panel-stroke',
          )}
        >
          <PriceField
            id={`${panelId}-min`}
            label="Minimum"
            value={value.min}
            onCommit={(min) => setValue({ ...value, min })}
          />
          <span
            aria-hidden
            className="flex h-7.5 items-center p-1 type-price-range-filter-label text-price-filter-label"
          >
            -
          </span>
          <PriceField
            id={`${panelId}-max`}
            label="Maximum"
            value={value.max}
            onCommit={(max) => setValue({ ...value, max })}
          />
        </div>
      ) : null}
      {open && on ? (
        <div className="flex gap-1">
          {value.min !== undefined ? (
            <PriceChip label={`ab ${value.min} Euro`} onRemove={() => setValue({ ...value, min: undefined })} />
          ) : null}
          {value.max !== undefined ? (
            <PriceChip label={`bis ${value.max} Euro`} onRemove={() => setValue({ ...value, max: undefined })} />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

/**
 * Figma: Components / Filter / PriceRange / Chip (6093:25636) · Min?|Max?, State=Default|Hover.
 * h9, px-md py-sm, gap-sm auf price-filter-bg-hover, Label/default in filter-chip-label, Kreuz 6.
 */
export function PriceChip({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      aria-label={`${label} entfernen`}
      className={cn(
        'inline-flex h-9 cursor-pointer items-center gap-sm bg-price-filter-bg-hover px-md py-sm type-label-default text-filter-chip-label inset-ring-2 inset-ring-filter-panel-stroke',
        'hovered:bg-price-filter-bg hovered:text-filter-chip-label-hover hovered:shadow-filter-hover hovered:inset-ring-4',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
      )}
    >
      {label}
      <IconClose6 aria-hidden className="size-3" />
    </button>
  )
}
