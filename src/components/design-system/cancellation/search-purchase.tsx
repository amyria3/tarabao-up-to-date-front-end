'use client'

import { FormField } from '@/components/design-system/inputs/form-field'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Figma: Components / SearchPurchase (6955:21898). Spalte gap-md: Input / Component
 * „Bestellnummer (nach #)“ (Variante mit #), „E-Mail“, rechts Buttons / MD / PrimaryButton
 * „Bestellung aufrufen“ (240 px).
 */
export function SearchPurchase({
  onSubmit,
  className,
}: {
  onSubmit?: (request: { orderNumber: string; email: string }) => void
  className?: string
}) {
  return (
    <form
      data-slot="search-purchase"
      className={cn('flex w-full flex-col items-center gap-md', className)}
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        onSubmit?.({ orderNumber: String(data.get('orderNumber') ?? ''), email: String(data.get('email') ?? '') })
      }}
    >
      <FormField label="Bestellnummer (nach #)" prefix="#" inputMode="numeric" name="orderNumber" required />
      <FormField label="E-Mail" name="email" type="email" autoComplete="email" required />
      <div className="flex w-full max-w-block-max flex-col items-end">
        <Button type="submit" intent="primary" size="md" className="w-60">
          Bestellung aufrufen
        </Button>
      </div>
    </form>
  )
}
