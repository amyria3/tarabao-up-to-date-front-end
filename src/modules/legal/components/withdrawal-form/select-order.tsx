'use client'

import * as React from 'react'

import { RadioField } from '@/components/ui/radio-field'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type CancellableOrder = { id: string; label: string; number: string; cancellable?: boolean }

/**
 * Figma: Components / Cancellation / SelectOrder (6811:20517) · State=NoSelection|OrderSelected.
 * Switches / Radio mit den Bestellungen (nicht mehr widerrufbare: State=Inactive), Buttons / MD /
 * PrimaryButton „Weiter zum Widerruf“ (inaktiv ohne Auswahl) und Hinweis (UserMessage & Explanation).
 */
export function SelectOrder({
  orders,
  onSubmit,
  className,
}: {
  orders: CancellableOrder[]
  onSubmit?: (orderId: string) => void
  className?: string
}) {
  const [value, setValue] = React.useState<string>('')
  return (
    <div data-slot="select-order" className={cn('flex w-full max-w-block-max flex-col gap-md-l', className)}>
      <RadioField
        aria-label="Bestellung"
        value={value}
        onValueChange={setValue}
        className="gap-md-l"
        options={orders.map((o) => ({
          value: o.id,
          label: o.label,
          description: `#${o.number}`,
          state: o.cancellable === false ? 'inactive' : 'default',
        }))}
      />
      <Button intent="primary" size="md" className="w-full" disabled={!value} onClick={() => onSubmit?.(value)}>
        Weiter zum Widerruf
      </Button>
      <p className="w-full text-center type-user-message-x-lg text-content-text">
        Du kannst im nächsten Schritt die komplette Bestellung oder den Kauf einzelner Produkte widerrufen :)
      </p>
    </div>
  )
}
