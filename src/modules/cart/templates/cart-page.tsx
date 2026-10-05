'use client'

import Link from 'next/link'
import * as React from 'react'

import { IconButton } from '@/components/ui/icon-button'
import { ProductCard } from '@modules/products/components/product-card'
import { CartLogIn } from '@modules/cart/components/cart-login'
import { CartLoginPrompt } from '@modules/cart/components/cart-login-prompt'
import { CartMessage } from '@modules/cart/components/cart-message'
import { CartSummary } from '@modules/cart/components/cart-summary'
import { VoucherInput } from '@modules/cart/components/voucher-input'
import { IconArrowDown24, IconArrowLeft30, IconArrowUp24 } from '@/components/icons/figma-icons'
import { HeadlineH2 } from '@/components/ui/typography'
import { CardsOrder } from '@/components/ui/cards-order'
import { Button } from '@/components/ui/button'
import type { CartModel, ProductCardModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type CartRecommendation = { title: string; products: ProductCardModel[] }

export interface CartPageProps {
  cart: CartModel
  loggedIn?: boolean
  /** Figma Components / Cart / Message · Huge */
  message?: { text: string; actionLabel?: string; actionHref?: string }
  voucherNote?: string
  recommendations?: CartRecommendation[]
  checkoutHref?: string
  checkoutLabel?: string
  infoHref?: string
  onClose?: () => void
  onQuantityChange?: (itemId: string, quantity: number) => void
  onRemove?: (itemId: string) => void
  onLogin?: (credentials: { email: string; password: string }) => void | Promise<void>
  className?: string
}

/**
 * Figma: Components / Cart / CartPage (3155:6091) · Destination=Navigation.
 * Farbmodus cole-tint-surface-snow, min-h-168. Oben (sticky) IconButton „Warenkorb schließen“
 * mit Pfeil nach links. Darunter in 512 px Breite (py-xl px-md-l, gap-md): Cart / Summary,
 * CartLoginPrompt (nicht angemeldet; „Anmelden“ zeigt Cart / LogIn), VoucherInput und
 * „Zur Kasse“ (nur mit Artikeln), Cart / Message, Link „Versandinformation, Rücksendung & Umtausch“.
 * Danach Empfehlungen: Primitives / Headline / H2 und ProductCards (256 px) in einer scrollenden Reihe.
 */
export function CartPage({
  cart,
  loggedIn = false,
  message,
  voucherNote,
  recommendations = [],
  checkoutHref = '/de-de/checkout',
  checkoutLabel = 'Zur Kasse',
  infoHref = '/de-de/page/versandrichtlinien',
  onClose,
  onQuantityChange,
  onRemove,
  onLogin,
  className,
}: CartPageProps) {
  const [loggingIn, setLoggingIn] = React.useState(false)
  const [messageOpen, setMessageOpen] = React.useState(Boolean(message))
  const hasItems = cart.items.length > 0
  return (
    <div
      data-slot="cart-page"
      data-theme="cole-tint-surface-snow"
      className={cn('flex min-h-168 w-full flex-col bg-surface text-content-text', className)}
    >
      <div className="sticky top-0 z-10 flex w-full items-center bg-surface p-md-l">
        <IconButton
          label="Warenkorb schließen"
          icon={<IconArrowLeft30 aria-hidden className="h-3.5 w-auto" />}
          onClick={onClose}
        />
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full max-w-block-max flex-col items-center gap-md px-md-l py-xl">
          <CartSummary
            cart={cart}
            login={loggingIn ? <CartLogIn onSubmit={onLogin} /> : undefined}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
          {!loggedIn && !loggingIn ? <CartLoginPrompt onLogin={() => setLoggingIn(true)} /> : null}
          {hasItems ? <VoucherInput note={voucherNote} /> : null}
          {hasItems ? (
            <Button asChild intent="primary" size="md" className="w-full">
              <Link href={checkoutHref}>{checkoutLabel}</Link>
            </Button>
          ) : null}
          {message && messageOpen ? (
            <CartMessage
              actionLabel={message.actionLabel}
              actionHref={message.actionHref}
              onClose={() => setMessageOpen(false)}
            >
              {message.text}
            </CartMessage>
          ) : null}
          <div className="flex w-full flex-col items-center pt-md-l">
            <Button asChild intent="inline" size="xxs">
              <Link href={infoHref}>Versandinformation, Rücksendung & Umtausch</Link>
            </Button>
          </div>
        </div>
        {recommendations.length > 0 ? (
          <div className="flex w-full flex-col gap-xl bg-surface py-xl">
            {recommendations.map((rec) => (
              <section key={rec.title} className="flex w-full flex-col gap-md-l px-5" aria-label={rec.title}>
                <HeadlineH2>{rec.title}</HeadlineH2>
                <CardsOrder variant="row" className="gap-3">
                  {rec.products.map((p) => (
                    <li key={p.id} className="w-64">
                      <ProductCard product={p} />
                    </li>
                  ))}
                </CardsOrder>
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export interface CheckoutCartOverviewProps {
  cart: CartModel
  defaultOpen?: boolean
  title?: string
  className?: string
}

/**
 * Figma: Components / Cart / CartPage · Destination=Checkout, Compact?=True, Closed?=True|False.
 * Zeile „Bestellübersicht“ mit Summe und Pfeil (ShoppingCart & Checkout/Hightlighted), Linie
 * unten content-weak. Geöffnet folgt Cart / Summary ohne Bearbeitung mit „Produkte Gesamt:“.
 */
export function CheckoutCartOverview({
  cart,
  defaultOpen = false,
  title = 'Bestellübersicht',
  className,
}: CheckoutCartOverviewProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const panelId = React.useId()
  return (
    <div
      data-slot="checkout-cart-overview"
      data-state={open ? 'open' : 'closed'}
      data-theme="cole-tint-surface-snow"
      className={cn(
        'flex w-full flex-col items-center border-b border-content-weak bg-surface text-content-text',
        open ? 'py-xl' : 'p-md-l',
        className,
      )}
    >
      <div className="flex w-full max-w-block-max flex-col gap-xl">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          className="flex w-full cursor-pointer items-center justify-between gap-md-sm type-shopping-cart-checkout-hightlighted focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
        >
          <span>{title}</span>
          <span className="flex items-center gap-md-sm">
            {cart.totals.subtotalLabel}
            {open ? (
              <IconArrowUp24 aria-hidden className="h-2 w-5" />
            ) : (
              <IconArrowDown24 aria-hidden className="h-2 w-5" />
            )}
          </span>
        </button>
        {open ? (
          <div id={panelId}>
            <CartSummary cart={cart} editable={false} subtotalText="Produkte Gesamt:" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
