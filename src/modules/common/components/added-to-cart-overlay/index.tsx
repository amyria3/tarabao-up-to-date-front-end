'use client'

import * as React from 'react'

import {
  AddedToCartMessage,
  type AddedToCartMessageProps,
} from '@modules/common/components/added-to-cart-overlay/added-to-cart-message'
import { cn } from '@/lib/utils'

export type AddedToCartItem = Pick<AddedToCartMessageProps, 'productTitle' | 'priceLabel'>

export interface AddedToCartOverlayProps extends Omit<
  AddedToCartMessageProps,
  'productTitle' | 'priceLabel' | 'onClose'
> {
  /** Zuletzt hinzugefügter Artikel; `null` blendet das Overlay aus. */
  item: AddedToCartItem | null
  onClose?: () => void
  className?: string
}

/**
 * Figma: overlay/ADDED TO CARD (9110:26544) in Templates / Page (2.7, Punkt 8 und 10): oberste Ebene der
 * Seite, fixiert, erscheint nach „In den Warenkorb“ direkt auf der Produktseite. Der KI-Agent / der
 * Entwickler baut es als Dialog auf Seitenebene mit position: fixed; „Weiterstöbern“, „Schließen“ und
 * „Prüfen & kaufen“ schließen es. Die Variable `cart-overlay-visible` steuert nur den Figma-Prototyp.
 */
export function AddedToCartOverlay({
  item,
  onClose: onCloseProp,
  onContinue,
  className,
  ...props
}: AddedToCartOverlayProps) {
  const ref = React.useRef<HTMLDialogElement>(null)
  // Ohne onClose (z. B. Bibliothek) schließt der Dialog sich selbst.
  const [dismissed, setDismissed] = React.useState(false)
  React.useEffect(() => setDismissed(false), [item])
  const onClose = onCloseProp ?? (() => setDismissed(true))
  const open = item !== null && !dismissed
  React.useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      data-slot="added-to-cart-overlay"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className={cn(
        'fixed inset-zero m-auto w-full max-w-overlay-message-max bg-transparent p-md-l backdrop:bg-content-text/40',
        className,
      )}
    >
      {item ? (
        <AddedToCartMessage
          {...props}
          productTitle={item.productTitle}
          priceLabel={item.priceLabel}
          onClose={onClose}
          onContinue={() => {
            onContinue?.()
            onClose()
          }}
        />
      ) : null}
    </dialog>
  )
}

/** Hält den zuletzt hinzugefügten Artikel für das Overlay der Seite. */
export function useAddedToCart() {
  const [item, setItem] = React.useState<AddedToCartItem | null>(null)
  return { item, show: setItem, close: () => setItem(null) }
}
