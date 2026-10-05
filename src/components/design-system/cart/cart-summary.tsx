'use client'

import type * as React from 'react'

import { CartCalculation } from '@/components/design-system/cart/cart-calculation'
import { CartProductItem } from '@/components/design-system/cart/cart-product-item'
import { HeadlineH3 } from '@/components/design-system/primitives/typography'
import { InformationBubble } from '@/components/design-system/switches/information-bubble'
import type { CartItemModel, CartModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface CartSummaryProps {
  cart: CartModel
  /** Figma Logging In?=True: Titel „Log in“ und das Anmeldeformular statt der Artikel */
  login?: React.ReactNode
  editable?: boolean
  /** Titel auch ohne Bearbeitung zeigen (Checkout / FinalCheckout „Gute Wahl!“) */
  showTitle?: boolean
  title?: string
  emptyText?: string
  subtotalText?: string
  /** Hinweis unter dem Block „Wiederkehrende Lieferungen“ (Information Bubble). */
  subscriptionNote?: React.ReactNode
  onQuantityChange?: (itemId: string, quantity: number) => void
  onRemove?: (itemId: string) => void
  /** Der Schalter am Artikel verschiebt ihn in den anderen Block und nimmt die Menge mit. */
  onSubscriptionChange?: (itemId: string, subscription: boolean) => void
  headingLevel?: 'h1' | 'h2'
  className?: string
}

const SUBSCRIPTION_NOTE =
  'Der Betrag wird am Stichtag von Deiner gewählten Zahlungsmethode abgebucht. Bis zum Stichtag kannst Du das Abo jederzeit ohne Angabe von Gründen kündigen oder pausieren. Dein Widerrufsrecht bleibt vom Abo unberührt.'

/**
 * Figma: Components / Cart / Summary (3307:5882) · Cart is empty?, Logging In?.
 * Titel ShoppingCart & Checkout/MainHeadline, dann eine Wrap-Reihe (gap-md-l) aus zwei Blöcken
 * nach Bestellart: „Wiederkehrende Lieferungen“ (Abo-Artikel, mit Information Bubble) und
 * „Einmalige Lieferungen“. Jeder Block: H3, Artikel (Cart / ProductItem, gap-5), Block Element
 * min-w/max-w, ab lg nebeneinander. Ein Block existiert nur mit Artikeln seiner Bestellart.
 * Darunter Components / Cart / Calculation; Abstände gap-xl. Leer: UserMessage/LG.
 */
export function CartSummary({
  cart,
  login,
  editable = true,
  showTitle = editable,
  title = 'Dein Warenkorb',
  emptyText = 'Warenkorb ist noch leer :)',
  subtotalText,
  subscriptionNote = SUBSCRIPTION_NOTE,
  onQuantityChange,
  onRemove,
  onSubscriptionChange,
  headingLevel: Heading = 'h2',
  className,
}: CartSummaryProps) {
  const empty = cart.items.length === 0
  if (login) {
    return (
      <div data-slot="cart-summary" data-state="login" className={cn('flex w-full flex-col gap-xl', className)}>
        <Heading className="w-full type-shopping-cart-checkout-main-headline text-content-text">Log in</Heading>
        {login}
      </div>
    )
  }
  if (empty) {
    return (
      <div data-slot="cart-summary" data-state="empty" className={cn('flex w-full flex-col', className)}>
        <p className="w-full text-center type-user-message-lg text-content-text">{emptyText}</p>
      </div>
    )
  }
  const subscriptionItems = cart.items.filter((item) => item.subscription)
  const oneTimeItems = cart.items.filter((item) => !item.subscription)

  const renderItems = (items: CartItemModel[]) => (
    <ul className="flex w-full flex-col gap-5">
      {items.map((item) => (
        <li key={item.id}>
          <CartProductItem
            item={item}
            editable={editable}
            onQuantityChange={(q) => onQuantityChange?.(item.id, q)}
            onRemove={() => onRemove?.(item.id)}
            onSubscriptionChange={(next) => onSubscriptionChange?.(item.id, next)}
          />
        </li>
      ))}
    </ul>
  )

  return (
    <div data-slot="cart-summary" data-state="filled" className={cn('flex w-full flex-col gap-xl', className)}>
      {showTitle ? (
        <Heading className="w-full type-shopping-cart-checkout-main-headline text-content-text">{title}</Heading>
      ) : null}
      <div className="flex w-full flex-wrap items-start gap-md-l">
        {subscriptionItems.length > 0 ? (
          <section
            aria-labelledby="cart-subscription"
            data-slot="cart-block"
            className="flex min-w-block-min max-w-block-max flex-1 flex-col gap-md"
          >
            <HeadlineH3 id="cart-subscription">Wiederkehrende Lieferungen</HeadlineH3>
            {renderItems(subscriptionItems)}
            {subscriptionNote ? <InformationBubble showIcon={false}>{subscriptionNote}</InformationBubble> : null}
          </section>
        ) : null}
        {oneTimeItems.length > 0 ? (
          <section
            aria-labelledby="cart-one-time"
            data-slot="cart-block"
            className="flex min-w-block-min max-w-block-max flex-1 flex-col gap-md"
          >
            <HeadlineH3 id="cart-one-time">Einmalige Lieferungen</HeadlineH3>
            {renderItems(oneTimeItems)}
          </section>
        ) : null}
      </div>
      <CartCalculation totals={cart.totals} subtotalText={subtotalText} />
    </div>
  )
}
