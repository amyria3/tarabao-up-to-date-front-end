'use client'

import { CheckoutHeadline } from '@modules/checkout/components/checkout-block'
import { RadioField } from '@/components/ui/radio-field'
import type { ShippingOptionModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

/**
 * Figma: Components / Checkout / DeliveryMethodRadioGroup (3674:12469) · Express?.
 * Spalte gap-md, max-w-block-max: Frage (MainHeadline) und Switches / Radio mit den Versandarten
 * (Label und Beschreibung).
 */
export function DeliveryMethodRadioGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  title = 'Wie möchtest Du Deine Lieferung versenden lassen?',
  className,
}: {
  options: ShippingOptionModel[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  title?: string
  className?: string
}) {
  return (
    <div
      data-slot="delivery-method-radio-group"
      className={cn('flex w-full max-w-block-max flex-col gap-md', className)}
    >
      <CheckoutHeadline as="h3">{title}</CheckoutHeadline>
      <RadioField
        aria-label={title}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        className="gap-md-l"
        options={options.map((o) => ({
          value: o.id,
          label: o.priceLabel ? `${o.label} · ${o.priceLabel}` : o.label,
          description: o.description,
        }))}
      />
    </div>
  )
}
