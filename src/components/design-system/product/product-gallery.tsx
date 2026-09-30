'use client'

import * as React from 'react'

import { CarouselNav } from '@/components/design-system/buttons/carousel-nav'
import { ProductImage } from '@/components/design-system/visuals/product-image'
import type { ImageModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface ProductGalleryProps {
  images: ImageModel[]
  title: string
  className?: string
}

/**
 * Figma: Visuals / Product / Image (2531:2860) · Variant=Default, in Sections / ProductHeader.
 * Spalte gap-3, min-w-card-min, max-w-block-max: Hauptbild h-87.5 mit Buttons / CarouselNav · SM
 * (zurück, weiter) unten rechts, darunter Vorschaubilder 128 × 128 (gap-sm). Bilder sind
 * Platzhalterflächen (surface-placeholder), bis Medusa echte Bilder liefert.
 */
export function ProductGallery({ images, title, className }: ProductGalleryProps) {
  const [index, setIndex] = React.useState(0)
  const count = images.length
  const go = (step: number) => setIndex((i) => (i + step + count) % count)
  return (
    <div
      data-slot="product-gallery"
      role="group"
      aria-roledescription="Bildergalerie"
      aria-label={title}
      className={cn('flex w-full min-w-card-min max-w-block-max flex-col gap-3', className)}
    >
      <div className="relative h-87.5 w-full">
        <ProductImage image={images[index]} sizes="(min-width: 64rem) 32rem, 100vw" priority />
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
