'use client'

import Link from 'next/link'
import * as React from 'react'

import { IconCartEmpty } from '@/components/design-system/icons/figma-icons'
import { ReviewStars } from '@/components/design-system/primitives/review-stars'
import { ProductImage } from '@/components/design-system/visuals/product-image'
import { Button } from '@/components/ui/button'
import type { ProductCardModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type ProductCardSize = 'default' | 'compact'

export interface ProductCardProps {
  product: ProductCardModel
  /** Figma: DefaultSize (2356:2667) oder CompactSize (8555:27280) */
  size?: ProductCardSize
  /**
   * Figma Context=Shop|Nutmixer (CompactSize): dieselbe Karte, im Nutmixer mit dem Preis je 75 g
   * (Item-Mix-Price aus __Products / Lose Ware) statt dem Kilopreis; der Preis kommt aus `product`.
   */
  context?: 'shop' | 'nutmixer'
  /**
   * Figma Product=Placeholder: Karte ohne echtes Produkt mit festen Platzhaltern und ohne Interaktion.
   * Product=Doypack bzw. Lose Ware liefern die Inhalte aus den Produktdaten (`product`).
   */
  placeholder?: boolean
  onAddToCart?: (id: string) => void
  addLabel?: string
  /** Zeigt Hover?=True statisch (Bibliothek). */
  forceHover?: boolean
  headingLevel?: 'h2' | 'h3' | 'h4'
  className?: string
}

/**
 * Figma: Cards / ProductCard / DefaultSize · CompactSize · Achsen Product (Placeholder, Doypack, Lose Ware),
 * Context (Shop, Nutmixer) und Hover?. Im Code liefern die Produktdaten die Inhalte; Placeholder ist
 * eine Karte ohne Produkt und ohne Interaktion. „Rein in den Korb“ (CompactSize) bzw. „In den Warenkorb“
 * legt die Sorte der Karte einmalig in den Warenkorb (Produkt-ID an den Warenkorb).
 * Karte mit Rahmen card-btn-hover-click, Schatten „Cards default“, Bild mit
 * 8-px-Rand in card-surface. Beim Hover wird die Fläche card-surface-hover,
 * der Infobereich schrumpft (88 → 60) und zeigt Buttons / SM / Button-Card.
 * Titel und Bild verlinken auf das Produkt; die Warenkorb-Aktion ist ein
 * eigener Button (Tastatur: nach dem Titel erreichbar, blendet sich bei Fokus ein).
 */
export function ProductCard({
  product,
  size = 'default',
  context = 'shop',
  placeholder = false,
  onAddToCart,
  addLabel,
  forceHover,
  headingLevel: Heading = 'h3',
  className,
}: ProductCardProps) {
  const compact = size === 'compact'
  const label = addLabel ?? (compact ? 'Rein in den Korb' : 'In den Warenkorb')
  if (placeholder) {
    return (
      <article
        data-slot="product-card"
        data-product="placeholder"
        aria-hidden
        className={cn(
          'relative flex w-full min-w-card-min max-w-card-max flex-col border border-card-btn-hover-click bg-card-surface shadow-card',
          compact ? 'h-64' : 'h-96',
          className,
        )}
      >
        <div className="min-h-zero flex-1 border-8 border-card-surface">
          <ProductImage image={undefined} />
        </div>
        <div
          className={cn(
            'flex w-full flex-col items-center px-sm text-center text-card-content-text',
            compact ? 'h-[5.5rem] justify-end gap-sm pb-[0.875rem]' : 'h-[5.5rem] gap-md pb-md-l',
          )}
        >
          <p className="flex h-10 w-full items-end justify-center type-cards-product-title">Produktname</p>
          <p className="flex flex-wrap items-center justify-center gap-x-md-sm">
            <span className="type-cards-md">ab 0,00 €</span>
            <span className="type-cards-light">(ab 0,00 €/kg)</span>
          </p>
        </div>
      </article>
    )
  }
  return (
    <article
      data-slot="product-card"
      data-context={context}
      data-product={context === 'nutmixer' ? 'lose-ware' : 'doypack'}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card relative flex w-full min-w-card-min max-w-card-max flex-col border border-card-btn-hover-click bg-card-surface shadow-card hover:shadow-card-hover data-hovered:shadow-card-hover',
        'hover:bg-card-surface-hover data-hovered:bg-card-surface-hover',
        compact ? 'h-64' : 'h-96',
        className,
      )}
    >
      <Link
        href={product.href}
        tabIndex={-1}
        aria-hidden
        className={cn(
          'min-h-zero flex-1 border-8 border-card-surface',
          'group-hover/card:border-card-surface-hover group-data-hovered/card:border-card-surface-hover',
        )}
      >
        <ProductImage image={product.image} sizes="(min-width: 64rem) 24rem, 50vw" />
      </Link>
      <div
        className={cn(
          'relative w-full overflow-hidden transition-[height] duration-150 motion-reduce:transition-none',
          compact ? 'h-[5.5rem]' : 'h-[5.5rem] group-hover/card:h-[3.75rem] group-data-hovered/card:h-[3.75rem]',
          compact && 'group-hover/card:h-12 group-data-hovered/card:h-12',
        )}
      >
        <div
          className={cn(
            'flex h-full w-full flex-col items-center px-sm text-center text-card-content-text',
            'group-hover/card:opacity-0 group-data-hovered/card:opacity-0 group-has-[[data-slot=card-action]:focus-within]/card:opacity-0',
            compact ? 'justify-end gap-sm pb-[0.875rem]' : 'gap-md pb-md-l',
          )}
        >
          <Heading className="flex h-10 w-full items-end justify-center">
            <Link
              href={product.href}
              className="line-clamp-2 type-cards-product-title focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
            >
              {product.title}
            </Link>
          </Heading>
          <p className="flex flex-wrap items-center justify-center gap-x-md-sm">
            <span className="type-cards-md">{product.priceLabel}</span>
            {product.unitPriceLabel ? <span className="type-cards-light">{product.unitPriceLabel}</span> : null}
          </p>
        </div>
        <div
          data-slot="card-action"
          className={cn(
            'absolute inset-0 flex items-end justify-center bg-card-surface-hover opacity-0 transition-opacity duration-150',
            'group-hover/card:opacity-100 group-data-hovered/card:opacity-100 focus-within:opacity-100 motion-reduce:transition-none',
            compact ? 'py-xxxs' : 'pb-[0.375rem]',
          )}
        >
          <Button
            intent="card"
            size="sm"
            icon={<IconCartEmpty aria-hidden className="size-5" />}
            onClick={() => onAddToCart?.(product.id)}
            aria-label={`${label}: ${product.title}`}
          >
            {label}
          </Button>
        </div>
      </div>
    </article>
  )
}

/**
 * Figma: Cards / ProductCardWithReviews (8308:32238).
 * Spalte pt-md-sm gap-md-l: ReviewStars (zentriert) über der ProductCard.
 */
export function ProductCardWithReviews({ product, ...props }: ProductCardProps) {
  return (
    <div className="flex w-full min-w-card-min max-w-card-max flex-col gap-md-l pt-md-sm">
      <ReviewStars rating={product.rating ?? 5} align="center" label={product.reviewCountLabel} />
      <ProductCard product={product} {...props} />
    </div>
  )
}
