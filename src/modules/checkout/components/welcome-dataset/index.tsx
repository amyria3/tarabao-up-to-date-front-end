'use client'

import { SummaryDataset } from '@modules/checkout/components/summary-dataset'
import { cn } from '@/lib/utils'

/**
 * Figma: Components / Checkout / WelcomeDataset (3501:6526) · Logged In?.
 * „Hallo, {Name}“ und „Schön, dass Du da bist!“ (MainHeadline, Umbruch, gap-3), darunter
 * SummaryDataset „E-Mail:“. Ohne Anmeldung steht „GAST!“ als Name.
 */
export function WelcomeDataset({
  name,
  email,
  onEdit,
  className,
}: {
  name?: string
  email: string
  onEdit?: () => void
  className?: string
}) {
  return (
    <div data-slot="welcome-dataset" className={cn('flex w-full max-w-block-max flex-col gap-md', className)}>
      <p className="flex w-full flex-wrap gap-3 type-shopping-cart-checkout-main-headline text-content-text">
        <span>Hallo,</span>
        <span>{name ?? 'Gast!'}</span>
        <span>Schön, dass Du da bist!</span>
      </p>
      <SummaryDataset label="E-Mail:" lines={[[email]]} onEdit={onEdit} />
    </div>
  )
}
