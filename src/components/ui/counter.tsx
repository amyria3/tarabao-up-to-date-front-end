'use client'

import * as React from 'react'

import { CounterShape } from '@/components/icons/figma-shapes'
import { cn } from '@/lib/utils'

export interface CounterProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  onValueChange?: (value: number) => void
  /** Zeigt einen Hover-Zustand statisch: Figma-Varianten Minus-Hover? / Plus-Hover? */
  forceHover?: 'minus' | 'plus'
  className?: string
  'aria-label'?: string
}

/**
 * Figma: Buttons / Counter (2442:2491). Mengenzähler 83 × 38 mit handgezeichnetem
 * Rahmen, drei Felder −, Wert, +. Hover füllt das Feld mit counter-bg-hover-click.
 */
export function Counter({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onValueChange,
  forceHover,
  className,
  'aria-label': ariaLabel = 'Menge',
}: CounterProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next))
    if (value === undefined) setInner(clamped)
    onValueChange?.(clamped)
  }
  const segment =
    'flex h-full flex-1 cursor-pointer items-center justify-center px-sm py-xs hover:bg-counter-bg-hover-click data-[hovered]:bg-counter-bg-hover-click disabled:cursor-not-allowed disabled:opacity-60'
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'relative inline-flex h-[2.375rem] w-[5.1875rem] items-stretch overflow-hidden bg-counter-bg type-default-text-lg text-counter-label',
        className,
      )}
    >
      <CounterShape className="pointer-events-none absolute inset-0 size-full text-counter-label" />
      <button
        type="button"
        className={segment}
        aria-label="Weniger"
        disabled={current <= min}
        onClick={() => set(current - 1)}
        {...(forceHover === 'minus' ? { 'data-hovered': '' } : {})}
      >
        −
      </button>
      <output className="flex flex-1 items-center justify-center px-sm py-xs" aria-live="polite">
        {current}
      </output>
      <button
        type="button"
        className={segment}
        aria-label="Mehr"
        disabled={current >= max}
        onClick={() => set(current + 1)}
        {...(forceHover === 'plus' ? { 'data-hovered': '' } : {})}
      >
        +
      </button>
    </div>
  )
}
