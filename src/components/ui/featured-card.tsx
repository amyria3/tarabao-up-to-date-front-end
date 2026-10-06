import Link from 'next/link'
import { ProductImage } from '@modules/products/components/product-image'
import type { TeaserModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { CARD_THEME, type HoverProps, CARD_FRAME, CARD_HOVER } from '@/components/ui/card-chrome'

/**
 * Figma: Cards / FeaturedCard (6704:18568) · State=Default|Hover, Variant=Default|BlogPost.
 * Breite 180–288 px, Höhe 288–504 px (Cards/FeaturedCard/…). Rand oben 16 px (gap), sonst 20 px
 * (frame). Die Karte verteilt ihren Inhalt mit justify-between: oben Titel, Bild und Text mit 16 px
 * Abstand, unten der Link „Mehr erfahren“. So stehen die Links einer Reihe auf einer Linie, wenn die
 * Reihe alle Karten gleich hoch zieht (items-stretch). Titel Cards/Featured/Title mit 8 px oben
 * (BlogPost: darunter Autorin und Datum, DefaultText S), Bild 164 px hoch, Text DefaultText S in
 * einem 4rem-Block (höchstens vier Zeilen). Hover: card-surface-hover, card-content-text-hover und
 * Schatten „Cards on-hover“.
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
        'group/card relative flex w-full min-w-card-featured-min max-w-card-featured-max min-h-card-featured max-h-card-featured flex-col justify-between bg-card-surface px-card-featured-frame pt-card-featured-frame-top pb-card-featured-frame text-card-content-text',
        CARD_FRAME,
        CARD_HOVER,
        'hover:text-card-content-text-hover data-hovered:text-card-content-text-hover',
        className,
      )}
    >
      <div className="flex flex-col gap-card-featured-gap">
        <div className="flex flex-col gap-card-featured-content-gap pt-sm">
          <h3 className="type-cards-featured-title">{teaser.title}</h3>
          {meta ? (
            <p className="flex gap-2.5 type-default-text-s">
              {teaser.author ? <span>{teaser.author}</span> : null}
              {teaser.dateLabel ? <span>{teaser.dateLabel}</span> : null}
            </p>
          ) : null}
        </div>
        <div className="h-card-featured-img w-full">
          <ProductImage image={teaser.image} />
        </div>
        {teaser.body ? (
          <div className="h-16 w-full">
            <p className="line-clamp-4 type-default-text-s">{teaser.body}</p>
          </div>
        ) : null}
      </div>
      {teaser.href ? (
        <div className="pt-card-featured-content-gap">
          <div className="flex h-7 items-end">
            <Link
              href={teaser.href}
              className="type-link after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
            >
              {teaser.linkLabel ?? 'Mehr erfahren'}
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  )
}
