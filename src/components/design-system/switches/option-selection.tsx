'use client'

import { OptionSelectionButton } from '@/components/design-system/buttons/option-selection-button'
import { ToggleGroup, ToggleGroupItem, useSingleSelection } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

export type OptionSelectionOption = { value: string; label: string; showIcon?: boolean }

/** Packungsgrößen aus Figma Switches / OptionSelection (Selected=Pack|Multipack|Bulk, Labels aus __Products / Doypacks). */
export const PACKAGING_OPTIONS: OptionSelectionOption[] = [
  { value: 'pack', label: '130 g' },
  { value: 'multipack', label: '8 × 130 g' },
  { value: 'bulk', label: '0,5 kg' },
]

export interface OptionSelectionProps {
  options: OptionSelectionOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  'aria-label'?: string
}

/**
 * Figma: Switches / OptionSelection (8087:20747) · Selected=Pack|Multipack|Bulk.
 * Zeile gap-xs, genau ein OptionSelectionButton gewählt.
 */
export function OptionSelection({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  ...aria
}: OptionSelectionProps) {
  const [current, set] = useSingleSelection(value, defaultValue ?? options[0]?.value, onValueChange)
  return (
    <ToggleGroup
      type="single"
      value={current}
      onValueChange={set}
      aria-label={aria['aria-label'] ?? 'Packungsgröße'}
      className={cn('flex-row flex-wrap items-center gap-xs', className)}
    >
      {options.map((option) => (
        <ToggleGroupItem key={option.value} value={option.value} asChild>
          <OptionSelectionButton showIcon={option.showIcon}>{option.label}</OptionSelectionButton>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
