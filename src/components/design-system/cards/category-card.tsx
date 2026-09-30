import Link from 'next/link'

import { IconCartEmpty } from '@/components/design-system/icons/figma-icons'
import { ProductImage } from '@/components/design-system/visuals/product-image'
import { Button } from '@/components/ui/button'
import type { CategoryCardModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface CategoryCardProps {
  category: CategoryCardModel
  forceHover?: boolean
  className?: string
}

/**
 * Figma: Cards / CategoryCard / SM (2628:2698) · State=Default|Hover, Variant=Default|Nüsse Pur.
 * h60 (240 px), Bild mit 8-px-Rand, Titel unten rechts (Manrope Bold 18, versal).
 * Die ganze Karte ist ein Link.
 */
export function CategoryCardSm({ category, forceHover, className }: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      data-slot="category-card-sm"
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card flex h-60 w-full min-w-card-min max-w-card-max flex-col items-end justify-end bg-card-surface shadow-card',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
    >
      {/* Figma: Rand in purple-early-evening-sky-light (Primitive, kein semantisches Token) */}
      <span className="block min-h-zero w-full flex-1 border-8 border-(color:--purple-early-evening-sky-light)">
        <ProductImage image={category.image} />
      </span>
      <span className="flex items-center pr-sm pb-xxs pl-2 font-body text-18 font-bold uppercase text-content-text group-hover/card:underline group-data-hovered/card:underline">
        {category.title}
      </span>
    </Link>
  )
}

/**
 * Figma: Cards / CategoryCard / MD (2638:2654) · Hover?=False|True.
 * h82 (328 px), Bild auf Weiß mit 12-px-Rand, Titel Cards/ProductTitle.
 * Hover: Fläche card-surface-hover und Buttons / SM / Button-Card (Label in Figma „Call to action“).
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
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card relative flex h-82 w-full min-w-card-min max-w-card-max flex-col border border-card-btn-hover-click bg-card-surface shadow-card hover:shadow-card-hover data-hovered:shadow-card-hover',
        'hover:bg-card-surface-hover data-hovered:bg-card-surface-hover',
        className,
      )}
    >
      <span className="block min-h-zero flex-1 border-12 border-card-surface bg-white group-hover/card:border-surface group-data-hovered/card:border-surface">
        <ProductImage image={category.image} className="bg-transparent" />
      </span>
      <div className="relative h-[5.5rem] w-full overflow-hidden group-hover/card:h-[3.75rem] group-data-hovered/card:h-[3.75rem]">
        <h3 className="flex h-10 items-end justify-center px-sm text-center type-cards-product-title text-content-text group-hover/card:opacity-0 group-data-hovered/card:opacity-0">
          <Link
            href={category.href}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
          >
            {category.title}
          </Link>
        </h3>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-surface opacity-0 group-hover/card:opacity-100 group-data-hovered/card:opacity-100"
        >
          <Button intent="card" size="sm" tabIndex={-1} icon={<IconCartEmpty aria-hidden className="size-5" />}>
            {actionLabel}
          </Button>
        </div>
      </div>
    </article>
  )
}
