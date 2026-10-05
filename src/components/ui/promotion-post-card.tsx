import Link from 'next/link'
import { IconCartEmpty } from '@/components/icons/figma-icons'
import { ProductImage } from '@modules/products/components/product-image'
import { Button } from '@/components/ui/button'
import type { TeaserModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { CARD_THEME } from '@/components/ui/card-chrome'

/**
 * Figma: Cards / PromotionPostCard (3912:19740).
 * Bild mit 12-px-Rand, darunter Titel Cards/ProductTitle, Text Cards/Light
 * und Buttons / SM / Button-Card; py md-sm/md-l, px-xl.
 */
export function PromotionPostCard({
  teaser,
  actionLabel = 'Call to action',
  className,
}: {
  teaser: TeaserModel
  actionLabel?: string
  className?: string
}) {
  return (
    <article
      data-slot="promotion-post-card"
      {...CARD_THEME}
      className={cn(
        'flex h-95 w-full min-w-card-small-min max-w-card-max flex-col bg-card-surface shadow-card text-card-content-text',
        className,
      )}
    >
      <div className="min-h-zero w-full flex-1 border-12 border-card-surface">
        <ProductImage image={teaser.image} />
      </div>
      <div className="flex flex-col items-center gap-md-sm px-xl pt-md-sm pb-md-l">
        <h3 className="w-full type-cards-product-title">{teaser.title}</h3>
        {teaser.body ? <p className="w-full type-cards-light">{teaser.body}</p> : null}
        <Button
          asChild={Boolean(teaser.href)}
          intent="card"
          size="sm"
          icon={<IconCartEmpty aria-hidden className="size-5" />}
        >
          {teaser.href ? <Link href={teaser.href}>{actionLabel}</Link> : actionLabel}
        </Button>
      </div>
    </article>
  )
}
