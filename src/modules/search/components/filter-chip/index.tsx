'use client'

import * as React from 'react'

import { IconClose6 } from '@/components/icons/figma-icons'
import { cn } from '@/lib/utils'

export interface FilterChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  label: string
  selected?: boolean
  onSelectedChange?: (selected: boolean) => void
  /** Bibliothek: Hover?=True statisch */
  forceHover?: boolean
}

/**
 * Figma: Components / Filter / FilterChip (2165:2011) · State=Default|Selected, Hover?, Variant=1|2.
 * h9 (36 px), px-4, gap-sm, innere Kontur filter-panel-stroke 2 px (Hover 3 px) und Schatten
 * „Filter-Chips on-hover“. Label Label/default in filter-chip-label; gewählt Label/Selected
 * auf filter-chip-bg-selected mit Kreuz (Icons / close 6). Umsetzung als Umschalter (aria-pressed).
 */
export function FilterChip({
  label,
  selected = false,
  onSelectedChange,
  forceHover,
  className,
  onClick,
  ...props
}: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-state={selected ? 'on' : 'off'}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) onSelectedChange?.(!selected)
      }}
      className={cn(
        'inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-sm overflow-hidden px-4 whitespace-nowrap',
        'bg-filter-chip-bg type-label-default text-filter-chip-label inset-ring-2 inset-ring-filter-panel-stroke',
        'hovered:bg-filter-chip-bg-hover hovered:text-filter-chip-label-hover hovered:shadow-filter-hover hovered:inset-ring-3',
        'selected:bg-filter-chip-bg-selected selected:type-label-selected selected:text-filter-chip-label-selected',
        'selected:hovered:bg-filter-chip-bg-selected-hover selected:hovered:text-filter-chip-label-selected-hover',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
      {...props}
    >
      <span>{label}</span>
      {selected ? <IconClose6 aria-hidden className="size-3 shrink-0" /> : null}
    </button>
  )
}
