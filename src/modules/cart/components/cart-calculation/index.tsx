import type { CartTotalsModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface CartCalculationProps {
  totals: CartTotalsModel
  /** Figma-Text der ersten Zeile; in CartPage · Checkout „Produkte Gesamt:“ */
  subtotalText?: string
  shippingText?: string
  depositText?: string
  className?: string
}

/**
 * Figma: Components / Cart / Calculation (2260:4084).
 * Spalte gap-xxs: Produkte (Hightlighted), Versand innerhalb Deutschlands und Pfand (Body),
 * Linie content-text, Summe rechtsbündig (Hightlighted).
 */
export function CartCalculation({
  totals,
  subtotalText = 'Produkte:',
  shippingText = 'Versand innerhalb Deutschlands:',
  depositText = 'Pfand:',
  className,
}: CartCalculationProps) {
  return (
    <dl data-slot="cart-calculation" className={cn('flex w-full flex-col gap-xxs text-content-text', className)}>
      <div className="flex justify-between gap-md type-shopping-cart-checkout-hightlighted">
        <dt>{subtotalText}</dt>
        <dd>{totals.subtotalLabel}</dd>
      </div>
      <div className="flex justify-between gap-md type-shopping-cart-checkout-body">
        <dt>{shippingText}</dt>
        <dd>{totals.shippingLabel}</dd>
      </div>
      {totals.depositLabel ? (
        <div className="flex justify-between gap-md type-shopping-cart-checkout-body">
          <dt>{depositText}</dt>
          <dd>{totals.depositLabel}</dd>
        </div>
      ) : null}
      <div className="flex justify-end border-t border-content-text pt-xxs type-shopping-cart-checkout-hightlighted">
        <dt className="sr-only">Summe</dt>
        <dd>{totals.totalLabel}</dd>
      </div>
    </dl>
  )
}
