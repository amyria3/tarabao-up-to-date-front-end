import Link from 'next/link'
import { ProductImage } from '@modules/products/components/product-image'
import type { TeaserModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { CARD_THEME, type HoverProps, CARD_FRAME, CARD_HOVER } from '@/components/ui/card-chrome'

/**
 * Figma: Cards / FeaturedCard (6704:18568) · State=Default|Hover, Variant=Default|BlogPost.
 * pt-md-l px-lg pb-lg gap-md-l, min/max card, min-h 96, max-h 168 (twuc).
 * Titel Cards/Featured/Title (BlogPost: darunter Autorin und Datum, DefaultText S),
 * Bild h219 px, Text DefaultText S, Link „Mehr erfahren“. Hover: card-surface-hover,
 * card-content-text-hover und Schatten „Cards on-hover“.
 */
export function FeaturedCard({
  teaser,
  variant = 'default',
  forceHover,
  className,
}: { teaser: TeaserModel; variant?: 'default' | 'blog-post' } & HoverProps) {
  const meta = variant === 'blog-post' && (teaser.author || teaser.dateLabel)
  return (
    <article
      data-slot="featured-card"
      {...CARD_THEME}
      data-variant={variant}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card relative flex w-full min-w-card-min max-w-card-max min-h-96 max-h-168 flex-col gap-md-l bg-card-surface px-lg pt-md-l pb-lg text-card-content-text',
        CARD_FRAME,
        CARD_HOVER,
        'hover:text-card-content-text-hover data-hovered:text-card-content-text-hover',
        className,
      )}
    >
      <div className="flex flex-col gap-xs">
        <h3 className="pt-md-sm type-cards-featured-title">{teaser.title}</h3>
        {meta ? (
          <p className="flex gap-2.5 type-default-text-s">
            {teaser.author ? <span>{teaser.author}</span> : null}
            {teaser.dateLabel ? <span>{teaser.dateLabel}</span> : null}
          </p>
        ) : null}
      </div>
      <div className="h-[13.6875rem] w-full">
        <ProductImage image={teaser.image} />
      </div>
      <div className="flex flex-col gap-md-sm">
        {teaser.body ? <p className="type-default-text-s">{teaser.body}</p> : null}
        {teaser.href ? (
          <Link
            href={teaser.href}
            className="type-link after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
          >
            {teaser.linkLabel ?? 'Mehr erfahren'}
          </Link>
        ) : null}
      </div>
    </article>
  )
}
