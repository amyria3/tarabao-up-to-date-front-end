'use client'

import Link from 'next/link'

import { SegmentControlButton } from '@/components/ui/segment-control-button'
import { IconButton } from '@/components/ui/icon-button'
import { IconCheck30 } from '@/components/icons/figma-icons'
import { Button } from '@/components/ui/button'
import { ButtonShape } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

export interface AddedToCartMessageProps {
  productTitle: string
  priceLabel: string
  continueLabel?: string
  checkoutLabel?: string
  checkoutHref?: string
  onClose?: () => void
  onContinue?: () => void
  className?: string
}

/**
 * Figma: Components / OverlayComponents / Message (2784:3621) · Item added to cart?=True
 * (Rahmen overlay/ADDED TO CARD, 390 px). Farbmodus cole-tint-surface-snow, Form „Very oval“
 * in surface-highlighted, px-lg py-md-l gap-md-l: IconButton „Schließen“ rechts, Titel
 * „Deinem Warenkorb hinzugefügt“ (UserMessage/LG) mit grünem Häkchen (success-content),
 * Produkt und Preis (Cards/ProductTitle, Cards/MD), Buttons / SM / SecondaryButton
 * „Weiterstöbern“ und Buttons / XS / SegmentControlButton „Prüfen & kaufen“ (300 px).
 */
export function AddedToCartMessage({
  productTitle,
  priceLabel,
  continueLabel = 'Weiterstöbern',
  checkoutLabel = 'Prüfen & kaufen',
  checkoutHref = '/de-de/cart',
  onClose,
  onContinue,
  className,
}: AddedToCartMessageProps) {
  return (
    <div
      role="dialog"
      aria-label="Deinem Warenkorb hinzugefügt"
      data-slot="added-to-cart-message"
      data-theme="cole-tint-surface-snow"
      className={cn(
        'relative flex w-full max-w-overlay-message-max min-w-overlay-message-min flex-col items-center gap-md-l px-lg py-md-l text-content-text',
        className,
      )}
    >
      <ButtonShape shape="very-oval" className="text-surface-highlighted" />
      <div className="relative flex w-full flex-col items-end pb-md-l">
        <IconButton label="Schließen" onClick={onClose} />
      </div>
      <div className="relative flex w-full max-w-block-max flex-col items-center gap-xxs">
        <p className="flex w-full items-center justify-center gap-sm text-center type-user-message-lg">
          Deinem Warenkorb hinzugefügt
          <IconCheck30 aria-hidden className="size-7.5 text-success-content" />
        </p>
        <p className="flex items-center justify-center gap-2 text-center type-cards-product-title">
          <span>{productTitle}</span>
          <span aria-hidden>|</span>
          <span className="type-cards-md">{priceLabel}</span>
        </p>
      </div>
      <div className="relative flex flex-col gap-xxs">
        <Button intent="secondary" size="md-oval" className="w-75" onClick={onContinue ?? onClose}>
          {continueLabel}
        </Button>
        <SegmentControlButton asChild className="w-75">
          <Link href={checkoutHref}>{checkoutLabel}</Link>
        </SegmentControlButton>
      </div>
    </div>
  )
}
