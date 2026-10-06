'use client'

import * as React from 'react'

import { OptionSelection } from '@/components/ui/option-selection'
import type { ProductVariantModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface SizeAndPriceProps {
  /** Packungsgrößen: Pack, Multipack, Bulk (Figma-Achse Size). Label, Preis und Kilopreis je Größe. */
  variants: ProductVariantModel[]
  value?: string
  defaultValue?: string
  onValueChange?: (variantId: string) => void
  className?: string
}

/**
 * Figma: Components / Product / SizeAndPrice (9473:50567). Wrap-Reihe, unten bündig, gap-sm:
 * Switches / OptionSelection (Chips „130 g“, „8 × 130 g“, „0,5 kg“), Spacer (Fill, px 0,625rem) und
 * rechts der Preis: eine Zeile (Umbruch, gap-sm, Grundlinie) aus Preis (Cards/MD) und Grundpreis
 * (DefaultText S in content-weak). Reicht die Breite nicht (base), bricht der Preis unter die Chips
 * und steht links. Ein Klick auf einen Chip wechselt die Größe, Preis und Kilopreis folgen. Im Code
 * liefern die `variants` die Werte je Größe.
 */
export function SizeAndPrice({ variants, value, defaultValue, onValueChange, className }: SizeAndPriceProps) {
  const [inner, setInner] = React.useState(defaultValue ?? variants[0]?.id ?? '')
  const current = value ?? inner
  const variant = variants.find((v) => v.id === current) ?? variants[0]
  const set = (id: string) => {
    if (!id) return
    if (value === undefined) setInner(id)
    onValueChange?.(id)
  }
  return (
    <div data-slot="size-and-price" className={cn('flex w-full flex-wrap items-end gap-sm', className)}>
      <OptionSelection
        aria-label="Menge und Verpackung"
        options={variants.map((v) => ({ value: v.id, label: v.label }))}
        value={current}
        onValueChange={set}
        className="w-auto gap-sm"
      />
      <span aria-hidden className="h-11.5 min-w-zero flex-1 px-2.5" />
      {variant ? (
        <p className="flex flex-wrap items-baseline gap-x-sm text-content-text" aria-live="polite">
          <span className="type-cards-md">{variant.priceLabel}</span>
          {variant.unitPriceLabel ? (
            <span className="type-default-text-s text-content-weak">{variant.unitPriceLabel}</span>
          ) : null}
        </p>
      ) : null}
    </div>
  )
}
