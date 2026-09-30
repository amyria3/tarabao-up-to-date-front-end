import Link from 'next/link'

import { IconCheckout, IconDelivery, IconDot } from '@/components/design-system/icons/figma-icons'
import { Button } from '@/components/ui/button'
import type { PurchaseSummaryModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

/**
 * Figma: Components / PurchaseSummary (6794:18851) · Status=Order Received|Order Arrived.
 * 256 px, ShoppingCart & Checkout/Subtle: Zeilen aus Icon (14 px), Angabe, Datum und
 * Buttons / XXXS / Inline — „# Bestellnummer · 7 Artikel“, Kasse „Betrag · Datum · Rechnung“,
 * Lieferung „Abgeschickt · Datum · Verfolgen“ und bei Order Arrived Punkt „Angekommen · Datum“.
 */
export function PurchaseSummary({
  summary,
  invoiceLabel = 'Rechnung',
  trackingLabel = 'Verfolgen',
  className,
}: {
  summary: PurchaseSummaryModel
  invoiceLabel?: string
  trackingLabel?: string
  className?: string
}) {
  const icon = 'flex size-3.5 items-center justify-center text-content-text [&_svg]:size-3'
  const action = (href: string | undefined, label: string) =>
    href ? (
      <Button asChild intent="inline" size="xxxs">
        <Link href={href}>{label}</Link>
      </Button>
    ) : (
      <span />
    )
  return (
    <dl
      data-slot="purchase-summary"
      className={cn(
        'grid w-64 grid-cols-[0.875rem_1fr_auto_auto] items-center gap-x-xxs gap-y-xxs type-shopping-cart-checkout-subtle text-content-text',
        className,
      )}
    >
      <dt className={icon}>#</dt>
      <dd>
        <span className="sr-only">Bestellnummer </span>
        {summary.orderNumber}
      </dd>
      <dd className="col-span-2 text-right">{summary.itemCountLabel}</dd>

      <dt className={icon}>
        <IconCheckout aria-hidden />
        <span className="sr-only">Betrag</span>
      </dt>
      <dd>{summary.totalLabel}</dd>
      <dd className="text-right">{summary.orderedAtLabel}</dd>
      <dd className="justify-self-end">{action(summary.invoiceHref, invoiceLabel)}</dd>

      {summary.shippedAtLabel ? (
        <>
          <dt className={icon}>
            <IconDelivery aria-hidden />
          </dt>
          <dd>Abgeschickt</dd>
          <dd className="text-right">{summary.shippedAtLabel}</dd>
          <dd className="justify-self-end">{action(summary.trackingHref, trackingLabel)}</dd>
        </>
      ) : null}
      {summary.arrivedAtLabel ? (
        <>
          <dt className={icon}>
            <IconDot aria-hidden />
          </dt>
          <dd>Angekommen</dd>
          <dd className="text-right">{summary.arrivedAtLabel}</dd>
          <dd />
        </>
      ) : null}
    </dl>
  )
}
