'use client'

import Link from 'next/link'

import { Counter } from '@/components/design-system/buttons/counter'
import { IconBin, IconHeartFilled, IconHeartOutline } from '@/components/design-system/icons/figma-icons'
import { MegaSwitch } from '@/components/design-system/switches/mega-switch'
import { ProductImage } from '@/components/design-system/visuals/product-image'
import type { CartItemModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface CartProductItemProps {
  item: CartItemModel
  /** Figma Editable?=True: Entfernen, Merken, Menge ändern, Bestellart wechseln */
  editable?: boolean
  favorite?: boolean
  /** Figma Buttons / Counter im Warenkorb zählt 1 bis 9. */
  maxQuantity?: number
  onQuantityChange?: (quantity: number) => void
  onRemove?: () => void
  onToggleFavorite?: () => void
  /** Figma Switches / MegaSwitch / XXSM: einmal bestellen ↔ im Abo; der Artikel wandert in den anderen Block. */
  onSubscriptionChange?: (subscription: boolean) => void
  className?: string
}

const ICON_BTN =
  'inline-flex size-5 shrink-0 cursor-pointer items-center justify-center text-content-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg'

/**
 * Figma: Components / Cart / ProductItem (3280:9437) · Editable?, viewport-range=lg|md|base.
 * Zeile gap-md-l, max-w-block-max: Bild 80 × 80, Text-Spalte mit zwei Zeilen.
 * Editierbar: oben Titel (ShoppingCart & Checkout/Headline) mit Mülleimer, Merken, Buttons / Counter
 * (1–9) und Zeilensumme (Body); unten Grundpreis und „Einheit 130 g“ (Subtle, Wrap) und rechts
 * Switches / MegaSwitch / XXSM (einmal bestellen | im Abo). Nur lesen: Einheit, „Menge und Preis: 1 @ 5,49 €“
 * und die Zeilensumme (Subtle) rechts; base kürzt die Zeile „Menge und Preis“ per Truncate.
 */
export function CartProductItem({
  item,
  editable = true,
  favorite = false,
  maxQuantity = 9,
  onQuantityChange,
  onRemove,
  onToggleFavorite,
  onSubscriptionChange,
  className,
}: CartProductItemProps) {
  const title = item.href ? (
    <Link href={item.href} className="hover:underline focus-visible:outline-2 focus-visible:outline-btn-primary-bg">
      {item.title}
    </Link>
  ) : (
    item.title
  )
  return (
    <div
      data-slot="cart-product-item"
      data-editable={editable || undefined}
      data-subscription={item.subscription || undefined}
      className={cn('flex w-full max-w-block-max gap-md-l text-content-text', className)}
    >
      <div className="size-20 shrink-0 self-start">
        <ProductImage image={item.image} sizes="5rem" />
      </div>
      <div className="flex min-w-zero flex-1 flex-col justify-between gap-sm">
        {editable ? (
          <>
            <div className="flex w-full flex-wrap items-center gap-sm">
              <p className="min-w-zero flex-1 type-shopping-cart-checkout-headline">{title}</p>
              <div className="flex flex-wrap items-center justify-end gap-sm">
                <div className="flex items-center gap-xxs">
                  <button type="button" className={ICON_BTN} aria-label={`${item.title} entfernen`} onClick={onRemove}>
                    <IconBin aria-hidden className="size-5" />
                  </button>
                  <button
                    type="button"
                    className={ICON_BTN}
                    aria-label={`${item.title} merken`}
                    aria-pressed={favorite}
                    onClick={onToggleFavorite}
                  >
                    {favorite ? <IconHeartFilled aria-hidden /> : <IconHeartOutline aria-hidden />}
                  </button>
                </div>
                <div className="flex items-center gap-md-sm">
                  <Counter
                    value={item.quantity}
                    max={maxQuantity}
                    onValueChange={onQuantityChange}
                    aria-label={`Menge ${item.title}`}
                  />
                  <p className="text-right whitespace-nowrap type-shopping-cart-checkout-body">{item.totalLabel}</p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-end justify-end gap-sm">
              <dl className="flex min-w-list-item-img-min flex-1 flex-wrap gap-xxxs pb-xxxs type-shopping-cart-checkout-subtle">
                {item.unitPriceLabel ? (
                  <div className="flex min-w-list-item-img-min gap-xxs">
                    <dt className="sr-only">Grundpreis</dt>
                    <dd>{item.unitPriceLabel}</dd>
                  </div>
                ) : null}
                {item.variantLabel ? (
                  <div className="flex min-w-list-item-img-min gap-xxs">
                    <dt>Einheit</dt>
                    <dd>{item.variantLabel}</dd>
                  </div>
                ) : null}
              </dl>
              <MegaSwitch
                size="xxsm"
                checked={Boolean(item.subscription)}
                onCheckedChange={(checked) => onSubscriptionChange?.(checked)}
                aria-label={`Bestellart ${item.title}`}
                className="w-60 max-w-full"
              />
            </div>
          </>
        ) : (
          <>
            <p className="min-h-7 type-shopping-cart-checkout-headline">{title}</p>
            <div className="flex w-full flex-col gap-xxxs type-shopping-cart-checkout-subtle">
              <dl className="flex w-full min-w-zero flex-col gap-xxxs">
                {item.variantLabel ? (
                  <div className="flex gap-xxs">
                    <dt>Einheit</dt>
                    <dd>{item.variantLabel}</dd>
                  </div>
                ) : null}
                <div className="flex w-full min-w-zero gap-xxs">
                  <dt className="min-w-zero max-md:max-w-22 max-md:truncate">Menge und Preis:</dt>
                  <dd className="whitespace-nowrap">
                    {item.quantity} @ {item.itemPriceLabel ?? item.totalLabel}
                  </dd>
                </div>
              </dl>
              <p className="flex justify-end gap-sm whitespace-nowrap">
                <span>Gesamt:</span>
                <span>{item.totalLabel}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
