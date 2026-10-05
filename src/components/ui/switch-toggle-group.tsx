'use client'

import { SegmentControlButton } from '@/components/ui/segment-control-button'
import { ToggleGroup as ToggleGroupRoot, ToggleGroupItem, useSingleSelection } from '@/components/ui/toggle-group'
import type { GlobalTheme } from '@/lib/design-system/themes'
import { cn } from '@/lib/utils'

export type ToggleOption = { value: string; label: string }

export interface SwitchToggleGroupProps {
  options: ToggleOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Figma pinnt die Komponente auf purple-tint-surface-warm. */
  theme?: GlobalTheme | null
  className?: string
  'aria-label'?: string
}

/**
 * Figma: Switches / ToggleGroup (3690:15429) · Selected Option?=1|2.
 * Spalte gap-xxxs, min-w-btn-min max-w-block-max, SegmentControlButton Fill.
 * Semantik: Einfachauswahl (Radix ToggleGroup type="single" → role=radio).
 */
export function SwitchToggleGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  theme = 'purple-tint-surface-warm',
  className,
  ...aria
}: SwitchToggleGroupProps) {
  const [current, set] = useSingleSelection(value, defaultValue ?? options[0]?.value, onValueChange)
  return (
    <ToggleGroupRoot
      type="single"
      value={current}
      onValueChange={set}
      aria-label={aria['aria-label']}
      {...(theme ? { 'data-theme': theme } : {})}
      className={cn('w-full min-w-btn-min max-w-block-max flex-col gap-xxxs overflow-clip bg-surface', className)}
    >
      {options.map((option) => (
        <ToggleGroupItem key={option.value} value={option.value} asChild>
          <SegmentControlButton width="fill">{option.label}</SegmentControlButton>
        </ToggleGroupItem>
      ))}
    </ToggleGroupRoot>
  )
}
