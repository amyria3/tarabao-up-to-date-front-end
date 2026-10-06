'use client'

import * as React from 'react'

import { CarouselNav } from '@/components/ui/carousel-nav'
import { ProductImage } from '@modules/products/components/product-image'
import type { ImageModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface ProductGalleryProps {
  images: ImageModel[]
  title: string
  /** Schnellbutton unten links auf dem Hauptbild (Components / AddToBasket / Mobile), siehe Sections / ProductHeader */
  addToCart?: React.ReactNode
  className?: string
}

/**
 * Figma: Visuals / Product / Image (2531:2860) · Variant=Default, in Sections / ProductHeader.
 * Spalte gap 12, 240–504 px breit (Product Page/Img/min-w, max-w): in base und md der Produkttitel
 * (ProductPage/ProductTitle, Figma visible-md-down; ab lg steht er in der BuyBox), das quadratische
 * Hauptbild mit Buttons / CarouselNav · SM (zurück, weiter) unten rechts und dem Schnellbutton
 * `addToCart` unten links, darunter Vorschaubilder 128 × 128 (gap-sm). Bilder sind Platzhalterflächen
 * (surface-placeholder), bis Medusa echte Bilder liefert.
 */
export function ProductGallery({ images, title, addToCart, className }: ProductGalleryProps) {
  const [index, setIndex] = React.useState(0)
  const count = images.length
  const go = (step: number) => setIndex((i) => (i + step + count) % count)
  return (
    <div
      data-slot="product-gallery"
      role="group"
      aria-roledescription="Bildergalerie"
      aria-label={title}
      className={cn('flex w-full min-w-product-img-min max-w-product-img-max flex-col gap-md-sm', className)}
    >
      <p aria-hidden className="w-full type-product-page-product-title lg:hidden">
        {title}
      </p>
      <div className="relative aspect-square w-full">
        <ProductImage image={images[index]} sizes="(min-width: 64rem) 31.5rem, 100vw" priority />
        {addToCart ? <div className="absolute bottom-2.5 left-2.5 flex">{addToCart}</div> : null}
        {count > 1 ? (
          <div className="absolute right-2.5 bottom-2.5 flex items-end gap-2">
            <CarouselNav size="sm" direction="left" aria-label="Vorheriges Bild" onClick={() => go(-1)} />
            <CarouselNav size="sm" direction="right" aria-label="Nächstes Bild" onClick={() => go(1)} />
          </div>
        ) : null}
        <p className="sr-only" aria-live="polite">
          Bild {index + 1} von {count}
        </p>
      </div>
      {count > 1 ? (
        <ul className="flex h-32 w-full min-w-block-inline-min gap-sm overflow-x-auto">
          {images.map((image, i) => (
            <li key={i} className="h-full w-32 shrink-0">
              <button
                type="button"
                aria-label={`Bild ${i + 1} zeigen`}
                aria-current={i === index || undefined}
                onClick={() => setIndex(i)}
                className="block size-full cursor-pointer outline-offset-2 focus-visible:outline-2 focus-visible:outline-btn-primary-bg aria-[current]:outline-1 aria-[current]:outline-content-text"
              >
                <ProductImage image={image} sizes="8rem" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
