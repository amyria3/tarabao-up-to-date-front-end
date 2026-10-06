'use client'

import Link from 'next/link'
import * as React from 'react'

import { IconCartEmpty } from '@/components/icons/figma-icons'
import { ButtonCardRound } from '@/components/ui/button-card-round'
import { ReviewStars } from '@/components/ui/review-stars'
import { ProductImage } from '@modules/products/components/product-image'
import { Button } from '@/components/ui/button'
import type { ProductCardModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { CARD_THEME } from '@/components/ui/card-chrome'

export type ProductCardSize = 'default' | 'compact'

/** Figma: Wurzel mit Breiten, Höhe und Bildrand je Größe (Cards/ProductCard/DefaultSize|CompactSize/…). */
const DEFAULT_ROOT =
  'h-card-default min-w-card-default-min max-w-card-default-max gap-card-default-frame px-card-default-frame pt-card-default-frame'
const COMPACT_ROOT =
  'h-card-compact min-w-card-compact-min max-w-card-compact-max gap-card-compact-frame p-card-compact-frame'
/** Figma flex-col im Ruhezustand: DefaultSize gap 12 · unten 8, CompactSize unten bündig, gap und oben/unten 6. */
const DEFAULT_INFO = 'gap-card-default-content-gap pb-card-default-content'
const COMPACT_INFO = 'justify-end gap-card-compact-content py-card-compact-content'

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
 * Karte mit Rahmen card-btn-hover-click und Schatten „Cards default“. Der Bildrand ist das Padding der
 * Karte (Cards/ProductCard/…/frame, DefaultSize 6 px ohne Rand unten, CompactSize 6 px rundum) und hat
 * damit immer die Farbe der Karte. Beim Hover wird die Fläche card-surface-hover, der Infobereich
 * schrumpft auf Buttons / MD / Button-Card, und das Bild wächst nach (Smart Animate).
 * Titel und Bild verlinken auf das Produkt; die Warenkorb-Aktion ist ein
 * eigener Button (Tastatur: nach dem Titel erreichbar, blendet sich bei Fokus ein).
 * CompactSize zeigt den Kurznamen (`shortTitle`, Figma Item-Short-Name) und eine Preiszeile
 * „5,49 € / 130 g“ (`packPriceLabel`) ohne Grundpreis.
 * Unter md (viewport-range=base) hat die Karte keinen Hover. Dort sitzt der runde Schnell-Button
 * Buttons / LG / Button-Card-Round mit seinem Zentrum auf der unteren rechten Bildecke (md:hidden),
 * der Hover-Button erscheint erst ab md (hidden md:flex). Alle Hover-Klassen tragen deshalb md:.
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
        {...CARD_THEME}
        data-product="placeholder"
        aria-hidden
        className={cn(
          'relative flex w-full flex-col border border-card-btn-hover-click bg-card-surface shadow-card',
          compact ? COMPACT_ROOT : DEFAULT_ROOT,
          className,
        )}
      >
        <div className="relative min-h-zero w-full flex-1">
          <ProductImage image={undefined} />
          <ButtonCardRound
            aria-label="Produkt"
            tabIndex={-1}
            className="pointer-events-none absolute right-zero bottom-zero translate-x-1/2 translate-y-1/2 md:hidden"
          />
        </div>
        <div
          className={cn(
            'flex w-full flex-col items-center text-center text-card-content-text',
            compact ? COMPACT_INFO : DEFAULT_INFO,
          )}
        >
          <p
            className={cn(
              'flex w-full items-end justify-center type-cards-product-title',
              !compact && 'h-card-default-title',
            )}
          >
            Produktname
          </p>
          {compact ? (
            // Figma CompactSize · Product=Placeholder: „0,00 € / 000 g“
            <p className="type-cards-md">0,00 € / 000 g</p>
          ) : (
            <p className="flex flex-wrap items-center justify-center gap-x-md-sm">
              <span className="type-cards-md">ab 0,00 €</span>
              <span className="type-cards-light">(ab 0,00 €/kg)</span>
            </p>
          )}
        </div>
      </article>
    )
  }
  return (
    <article
      data-slot="product-card"
      {...CARD_THEME}
      data-context={context}
      data-product={context === 'nutmixer' ? 'lose-ware' : 'doypack'}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card relative flex w-full flex-col border border-card-btn-hover-click bg-card-surface shadow-card motion-hover',
        'md:hover:bg-card-surface-hover md:hover:shadow-card-hover md:data-hovered:bg-card-surface-hover md:data-hovered:shadow-card-hover',
        compact ? COMPACT_ROOT : DEFAULT_ROOT,
        className,
      )}
    >
      {/* Der runde Button sitzt im relative-Wrapper um das Bild, nicht im overflow-hidden des Bildes. So schneidet das Bild ihn nicht ab. */}
      <div className="relative min-h-zero w-full flex-1">
        <Link href={product.href} tabIndex={-1} aria-hidden className="block size-full">
          <ProductImage image={product.image} sizes="(min-width: 64rem) 18rem, 50vw" />
        </Link>
        <ButtonCardRound
          aria-label={`${label}: ${product.title}`}
          onClick={() => onAddToCart?.(product.id)}
          className="absolute right-zero bottom-zero z-10 translate-x-1/2 translate-y-1/2 md:hidden"
        />
      </div>
      <div
        className={cn(
          // Figma: Infobereich HUG. Die Höhen stehen hier fest, damit der Wechsel animiert (motion-hover):
          // DefaultSize 4.625rem (Titel 2rem + Abstand 0.75rem + Preis 1.375rem + unten 0.5rem), beim Hover
          // 2.875rem (Button 2.5rem + unten 0.375rem); CompactSize 3.3125rem (oben 0.375rem + Titel 0.8125rem
          // + Abstand 0.375rem + Preis 1.375rem + unten 0.375rem), beim Hover 2.5rem (nur der Button).
          'relative w-full overflow-hidden motion-hover',
          compact
            ? 'h-[3.3125rem] md:group-hover/card:h-10 md:group-data-hovered/card:h-10 md:group-has-[[data-slot=card-action]:focus-within]/card:h-10'
            : 'h-[4.625rem] md:group-hover/card:h-[2.875rem] md:group-data-hovered/card:h-[2.875rem] md:group-has-[[data-slot=card-action]:focus-within]/card:h-[2.875rem]',
        )}
      >
        <div
          className={cn(
            'flex h-full w-full flex-col items-center text-center text-card-content-text motion-hover',
            'md:group-hover/card:opacity-0 md:group-data-hovered/card:opacity-0 md:group-has-[[data-slot=card-action]:focus-within]/card:opacity-0',
            compact ? COMPACT_INFO : DEFAULT_INFO,
          )}
        >
          <Heading className={cn('flex w-full items-end justify-center', !compact && 'h-card-default-title')}>
            <Link
              href={product.href}
              // DefaultSize: zwei Zeilen (Title/fix-h 2rem). CompactSize hat keine Titelhöhe; der Infobereich
              // hat für die Animation eine feste Höhe. Deshalb kürzt die CompactSize den Titel auf eine Zeile.
              className={cn(
                'type-cards-product-title focus-visible:outline-2 focus-visible:outline-btn-primary-bg',
                compact ? 'line-clamp-1' : 'line-clamp-2',
              )}
            >
              {compact ? (product.shortTitle ?? product.title) : product.title}
            </Link>
          </Heading>
          {compact ? (
            // Figma CompactSize: eine Preiszeile „Preis € / Gewicht g“ (Item-Product-Price, Item-Weight), kein Grundpreis.
            <p className="type-cards-md">{product.packPriceLabel ?? product.priceLabel}</p>
          ) : (
            <p className="flex flex-wrap items-center justify-center gap-x-md-sm">
              <span className="type-cards-md">{product.priceLabel}</span>
              {product.unitPriceLabel ? <span className="type-cards-light">{product.unitPriceLabel}</span> : null}
            </p>
          )}
        </div>
        <div
          data-slot="card-action"
          className={cn(
            'absolute inset-0 hidden items-end justify-center bg-card-surface-hover opacity-0 motion-hover md:flex',
            'md:group-hover/card:opacity-100 md:group-data-hovered/card:opacity-100 md:focus-within:opacity-100',
            // Figma flex-col beim Hover: DefaultSize unten 6 px (frame), CompactSize ohne Abstand (unten wirkt der Rand der Karte).
            !compact && 'pb-card-default-frame',
          )}
        >
          <Button
            intent="card"
            size="md"
            // Figma Context=Nutmixer: „Rein in den Mix!“ ohne Icon (Show Icon?=False).
            icon={context === 'shop' ? <IconCartEmpty aria-hidden className="h-icon-btn w-auto" /> : undefined}
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
 * Spalte pt 12 · gap 20 (Cards/ProductCardWithReviews/frame-top, gap): ReviewStars (zentriert) über der ProductCard.
 */
export function ProductCardWithReviews({ product, ...props }: ProductCardProps) {
  return (
    <div className="flex w-full min-w-card-default-min max-w-card-default-max flex-col gap-card-with-reviews-gap pt-card-with-reviews-frame-top">
      <ReviewStars rating={product.rating ?? 5} align="center" label={product.reviewCountLabel} />
      <ProductCard product={product} {...props} />
    </div>
  )
}
