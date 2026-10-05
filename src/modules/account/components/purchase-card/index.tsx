import * as React from 'react'
import { PurchaseSummary } from '@modules/account/components/purchase-summary'
import { ProductImage } from '@modules/products/components/product-image'
import { Button } from '@/components/ui/button'
import type { PurchaseModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { CARD_THEME, CARD_FRAME } from '@/components/ui/card-chrome'

/**
 * Figma: Cards / PurchaseCard (6748:17300) · Status=Sent|Arrived.
 * p-md-sm gap-md, max-w-panel-max: Status (Sent: UserMessage/X-LG in 228 px,
 * Arrived: UserMessage/LG), Produktbilder (Umbruch, 4-px-Rand surface-color),
 * Zusammenfassung (Components / PurchaseSummary) und Buttons / SM / SecondaryButton
 * (Hug content?=True). Die Sorte jedes Produktbilds kommt aus den Bestelldaten.
 */
export function PurchaseCard({
  purchase,
  summary,
  className,
}: {
  purchase: PurchaseModel
  /** Eigener Inhalt statt Components / PurchaseSummary */
  summary?: React.ReactNode
  className?: string
}) {
  const sent = purchase.status === 'sent'
  return (
    <article
      data-slot="purchase-card"
      {...CARD_THEME}
      data-status={purchase.status}
      className={cn(
        'flex w-full max-w-panel-max flex-col gap-md bg-surface p-md-sm text-content-text',
        CARD_FRAME,
        className,
      )}
    >
      <p className={sent ? 'max-w-57 type-user-message-x-lg' : 'type-user-message-lg'}>{purchase.statusLabel}</p>
      <ul className="flex w-full min-w-card-small-min max-w-panel-max flex-wrap gap-sm">
        {purchase.images.map((image, i) => (
          <li
            key={i}
            className="h-[8.875rem] min-h-24 w-full min-w-block-inline-min max-w-card-img-max flex-1 border-4 border-surface"
          >
            <ProductImage image={image} sizes="13rem" />
          </li>
        ))}
      </ul>
      <div className="flex w-full flex-wrap items-end gap-sm px-xxs">
        <div className="w-64">{summary ?? <PurchaseSummary summary={purchase.summary} />}</div>
        <div className="flex flex-1 flex-col items-end gap-xxxs">
          <Button intent="secondary" size="sm" width="hug">
            {purchase.ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  )
}
