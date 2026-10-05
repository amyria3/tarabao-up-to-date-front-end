'use client'

import * as React from 'react'
import { ProductImage } from '@modules/products/components/product-image'
import type { ImageModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { TWO_COLUMNS } from '@/components/LexicalRenderers/contentModuleShared'

/**
 * Figma: ContentModules / CMS / CustomContentWithImg (7660:20273) · LeftColumnSlotVariant=Basic|CTA|
 * CTA & ProductBenefits|ContactForm. Zeile mit Umbruch, gap-xl, max-w-block-double-max: links das
 * ContentModule, rechts die Bildfläche h-96 (Platzhalter), beide min/max block.
 */
export function CustomContentWithImg({
  children,
  image,
  imageFirst = false,
  className,
}: {
  /** genau ein ContentModule (Slot LeftColumn) */
  children: React.ReactNode
  image?: ImageModel
  /** Bild links (für abwechselnde CMS-Abschnitte) */
  imageFirst?: boolean
  className?: string
}) {
  return (
    <div data-slot="custom-content-with-img" className={cn(TWO_COLUMNS, className)}>
      {children}
      <div className={cn('h-96', imageFirst && 'order-first')}>
        <ProductImage image={image} sizes="(min-width: 64rem) 32rem, 100vw" />
      </div>
    </div>
  )
}
