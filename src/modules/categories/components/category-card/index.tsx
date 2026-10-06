import Link from 'next/link'

import { IconCartEmpty } from '@/components/icons/figma-icons'
import { ProductImage } from '@modules/products/components/product-image'
import { Button } from '@/components/ui/button'
import type { CategoryCardModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { CARD_THEME } from '@/components/ui/card-chrome'

export interface CategoryCardProps {
  category: CategoryCardModel
  forceHover?: boolean
  className?: string
}

/**
 * Figma: Cards / CategoryCard / SM (2628:2698) · State=Default|Hover, Variant=Default|Nüsse Pur.
 * 240 px hoch (Cards/CategoryCard/SM/fix-h), Breite 164 · 240 · 240 bis 256 px. Der Bildrand ist das
 * Padding der Karte (frame 12 px, unten 0) und hat die Farbe der Karte. Titel unten rechts
 * (Cards/ProductTitle). Hover: Der Titel weicht Buttons / SM / Button-Card, das Bild wird kürzer.
 * Die ganze Karte ist ein Link, der Button deshalb nur Darstellung (span).
 */
export function CategoryCardSm({
  category,
  forceHover,
  actionLabel = 'Call to action',
  className,
}: CategoryCardProps & { actionLabel?: string }) {
  return (
    <Link
      href={category.href}
      data-slot="category-card-sm"
      {...CARD_THEME}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card flex h-card-category-sm w-full min-w-card-category-sm-min max-w-card-category-sm-max flex-col items-end justify-end gap-card-category-sm-content bg-card-surface px-card-category-sm-frame pt-card-category-sm-frame shadow-card',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
    >
      <span className="block min-h-zero w-full flex-1">
        <ProductImage image={category.image} />
      </span>
      {/* Figma: Titelzeile 1.3125rem (Titel 0.8125rem + unten 0.5rem), beim Hover Button 2.25rem + unten 0.5rem. */}
      <span className="relative block h-[1.3125rem] w-full overflow-hidden motion-hover group-hover/card:h-11 group-data-hovered/card:h-11">
        <span className="flex h-full items-start justify-end pb-card-category-sm-content type-cards-product-title text-content-text motion-hover group-hover/card:opacity-0 group-data-hovered/card:opacity-0">
          {category.title}
        </span>
        <span className="absolute inset-0 flex items-end bg-card-surface-hover pb-card-category-sm-content opacity-0 motion-hover group-hover/card:opacity-100 group-data-hovered/card:opacity-100">
          <Button
            asChild
            intent="card"
            size="sm"
            className="min-w-zero"
            icon={<IconCartEmpty aria-hidden className="h-btn-sm-icon w-auto" />}
          >
            <span aria-hidden>{actionLabel}</span>
          </Button>
        </span>
      </span>
    </Link>
  )
}

/**
 * Figma: Cards / CategoryCard / MD (2638:2654) · Hover?=False|True.
 * 248 px hoch (Cards/CategoryCard/MD/fix-h), Breite 208 · 240 · 240 bis 272 · 288 · 288 px. Der Bildrand
 * ist das Padding der Karte (frame 12 px) und hat die Farbe der Karte. Titel Cards/ProductTitle mit
 * 8 px oben und unten (content). Hover: Fläche card-surface-hover, unten kein Rand, Buttons / MD /
 * Button-Card mit 8 px darunter (Label in Figma „Call to action“), das Bild wird kürzer.
 * Bildgrund in Figma #ffffff ohne Token → bg-white.
 */
export function CategoryCardMd({
  category,
  forceHover,
  actionLabel = 'Call to action',
  className,
}: CategoryCardProps & { actionLabel?: string }) {
  return (
    <article
      data-slot="category-card-md"
      {...CARD_THEME}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card relative flex h-card-category-md w-full min-w-card-category-md-min max-w-card-category-md-max flex-col gap-card-category-md-frame border border-card-btn-hover-click bg-card-surface p-card-category-md-frame shadow-card hover:shadow-card-hover data-hovered:shadow-card-hover motion-hover',
        'hover:bg-card-surface-hover hover:pb-zero data-hovered:bg-card-surface-hover data-hovered:pb-zero',
        className,
      )}
    >
      <span className="block min-h-zero w-full flex-1">
        <ProductImage image={category.image} className="bg-white" />
      </span>
      {/* Figma flex-col: 1.8125rem (Titel 0.8125rem + 0.5rem oben und unten), beim Hover Button 2.5rem + unten 0.5rem. */}
      <div className="relative h-[1.8125rem] w-full overflow-hidden motion-hover group-hover/card:h-12 group-data-hovered/card:h-12">
        <h3 className="flex items-end justify-center py-card-category-md-content text-center type-cards-product-title text-content-text motion-hover group-hover/card:opacity-0 group-data-hovered/card:opacity-0">
          <Link
            href={category.href}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
          >
            {category.title}
          </Link>
        </h3>
        {/* Der Button ist ein eigener Link mit eigenem Hover (Buttons / MD / Button-Card); für die Tastatur
            reicht der Titel-Link, deshalb tabIndex -1. */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-card-surface-hover pb-card-category-md-content opacity-0 motion-hover group-hover/card:opacity-100 group-data-hovered/card:opacity-100">
          <Button
            asChild
            intent="card"
            size="md"
            className="pointer-events-auto"
            icon={<IconCartEmpty aria-hidden className="h-icon-btn w-auto" />}
          >
            <Link href={category.href} tabIndex={-1} aria-hidden>
              {actionLabel}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
