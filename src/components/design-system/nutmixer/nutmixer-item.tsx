'use client'

import { Counter } from '@/components/design-system/buttons/counter'
import { cn } from '@/lib/utils'

export interface NutmixerItemProps {
  title: string
  /** z. B. „3,60 € / 75 kg“ */
  stepPriceLabel: string
  /** Schritte à stepGrams */
  quantity: number
  stepGrams: number
  /** höchste Schrittzahl, damit die Packung nicht überläuft */
  max?: number
  onQuantityChange?: (quantity: number) => void
  className?: string
}

/**
 * Figma: Components / Nutmixer / Item (8562:28599) · Show Image?=False.
 * Zeile gap-md-sm, max-w-block-max: Name (ShoppingCart & Checkout/Headline) und Preis je Schritt
 * (Subtle), rechts Buttons / Counter und Gewicht (Body) mit gap-xs. Menge 0 entfernt die Zutat.
 */
export function NutmixerItem({
  title,
  stepPriceLabel,
  quantity,
  stepGrams,
  max,
  onQuantityChange,
  className,
}: NutmixerItemProps) {
  return (
    <div data-slot="nutmixer-item" className={cn('flex w-full max-w-block-max gap-md-sm text-content-text', className)}>
      <div className="flex min-w-zero flex-1 flex-col gap-xxs">
        <p className="w-full type-shopping-cart-checkout-headline">{title}</p>
        <p className="min-w-list-item-img-min pb-xxxs type-shopping-cart-checkout-subtle">{stepPriceLabel}</p>
      </div>
      <div className="flex items-center gap-xs">
        <Counter value={quantity} min={0} max={max} onValueChange={onQuantityChange} aria-label={`Menge ${title}`} />
        <p className="w-12 text-right type-shopping-cart-checkout-body">
          {quantity * stepGrams}
          <span>gr</span>
        </p>
      </div>
    </div>
  )
}
