import Link from 'next/link'
import { IconCartEmpty } from '@/components/icons/figma-icons'
import { ProductImage } from '@modules/products/components/product-image'
import { Button } from '@/components/ui/button'
import type { TeaserModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { CARD_THEME } from '@/components/ui/card-chrome'

/**
 * Figma: Cards / PromotionPostCard (3912:19740).
 * 380 px hoch, 256–384 px breit (Cards/PromotionPostCard/…). Der Bildrand ist das Padding der Karte
 * (frame 12 px, unten 0). Darunter Titel Cards/ProductTitle, Text Cards/Light und Buttons / MD /
 * Button-Card mit 12 px Abstand (content), Innenabstand 12 oben, 24 seitlich, 20 unten.
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
        'flex h-card-promotion w-full min-w-card-promotion-min max-w-card-promotion-max flex-col gap-card-promotion-frame bg-card-surface px-card-promotion-frame pt-card-promotion-frame shadow-card text-card-content-text',
        className,
      )}
    >
      <div className="min-h-zero w-full flex-1">
        <ProductImage image={teaser.image} />
      </div>
      <div className="flex flex-col items-center gap-card-promotion-content px-6 pt-card-promotion-content pb-md-l">
        <h3 className="w-full type-cards-product-title">{teaser.title}</h3>
        {teaser.body ? <p className="w-full type-cards-light">{teaser.body}</p> : null}
        <Button
          asChild={Boolean(teaser.href)}
          intent="card"
          size="md"
          icon={<IconCartEmpty aria-hidden className="h-icon-btn w-auto" />}
        >
          {teaser.href ? <Link href={teaser.href}>{actionLabel}</Link> : actionLabel}
        </Button>
      </div>
    </article>
  )
}
