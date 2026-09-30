'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * shadcn/ui ToggleGroup ohne eigene Optik: die Items rendern per asChild eine
 * Tarabao-Komponente (SegmentControlButton, OptionSelectionButton, …).
 * Radix setzt data-state=on/off und bei type="single" role="radio" + aria-checked;
 * die Varianten selected / group-selected in globals.css greifen darauf.
 */
function ToggleGroup({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn('flex', className)} {...props} />
}

function ToggleGroupItem({ ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return <ToggleGroupPrimitive.Item data-slot="toggle-group-item" {...props} />
}

/**
 * Einfachauswahl, die nie leer wird: Radix erlaubt bei type="single" das
 * Abwählen des aktiven Items (Wert ""). Figma-Gruppen haben immer eine Auswahl.
 */
function useSingleSelection(
  value: string | undefined,
  defaultValue: string | undefined,
  onValueChange?: (v: string) => void,
) {
  const [inner, setInner] = React.useState(defaultValue ?? '')
  const current = value ?? inner
  const set = React.useCallback(
    (next: string) => {
      if (!next) return
      if (value === undefined) setInner(next)
      onValueChange?.(next)
    },
    [value, onValueChange],
  )
  return [current, set] as const
}

export { ToggleGroup, ToggleGroupItem, useSingleSelection }
