'use client'

import type * as React from 'react'

import {
  IconCartEmpty,
  IconCartOneItem,
  IconCartOneItemAdded,
  IconCartTwoItems,
  IconCartTwoItemsAdded,
} from '@/components/design-system/icons/figma-icons'
import { cn } from '@/lib/utils'

export interface AddToBasketMobileProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Artikel im Warenkorb: 0, 1 oder mehr (Figma Zero/One/Two Items?) */
  count?: number
  /** Figma Icons / CartLive · Add to cart?=True: kurz nach dem Hinzufügen */
  justAdded?: boolean
  forceHover?: boolean
}

function CartIcon({ count, justAdded }: { count: number; justAdded: boolean }) {
  if (count <= 0) return <IconCartEmpty aria-hidden />
  if (count === 1) return justAdded ? <IconCartOneItemAdded aria-hidden /> : <IconCartOneItem aria-hidden />
  return justAdded ? <IconCartTwoItemsAdded aria-hidden /> : <IconCartTwoItems aria-hidden />
}

/**
 * Figma: Components / AddToBasket / Mobile (3986:23589) · Hover?, Zero/One/Two Items?.
 * Fläche 65 × 60 (card-btn, Hover card-btn-hover-click), Icons / CartLive und „+ 1“
 * (UserMessage/LG in card-content-text). „+ 1“ zeigt Figma bei leerem Warenkorb und bei Hover.
 * Hover hebt den Inhalt um xxs an (Polster wandert von oben nach unten).
 */
export function AddToBasketMobile({
  count = 0,
  justAdded = false,
  forceHover,
  className,
  type = 'button',
  'aria-label': ariaLabel = 'In den Warenkorb',
  ...props
}: AddToBasketMobileProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group relative inline-flex h-15 w-16.25 cursor-pointer items-end justify-center bg-card-btn pt-xxs text-card-content-text',
        'hovered:bg-card-btn-hover-click hovered:pt-zero hovered:pb-xxs hovered:text-card-content-text-hover',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
      {...props}
    >
      <span className="absolute inset-0 flex items-center justify-center gap-xxs">
        <CartIcon count={count} justAdded={justAdded} />
        <span aria-hidden className={cn('type-user-message-lg', count > 0 && 'hidden group-hovered:inline')}>
          + 1
        </span>
      </span>
    </button>
  )
}
