'use client'

import * as React from 'react'
import { DefaultParagraph, HeadlineH2 } from '@/components/ui/typography'
import { ProductImage } from '@modules/products/components/product-image'
import type { ImageModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

/**
 * Figma: ContentModules / CMS / MediaText (7565:24424) · DisplayText?. Spalte py-md-l gap-md-l,
 * max-w-content: H2, Bildfläche h-104.5 (Platzhalter) und DefaultParagraph LG bis block-double-max.
 */
export function MediaText({
  title,
  text,
  image,
  showText = true,
  className,
}: {
  title: React.ReactNode
  text?: React.ReactNode
  image?: ImageModel
  showText?: boolean
  className?: string
}) {
  return (
    <div data-slot="media-text" className={cn('flex w-full max-w-content flex-col gap-md-l py-md-l', className)}>
      <HeadlineH2>{title}</HeadlineH2>
      <div className="h-104.5 w-full">
        <ProductImage image={image} sizes="(min-width: 80rem) 80rem, 100vw" />
      </div>
      {showText && text ? (
        <DefaultParagraph size="lg" className="max-w-block-double-max">
          {text}
        </DefaultParagraph>
      ) : null}
    </div>
  )
}

/* ---- ContentModules / CMS / CustomContentWithImg · CustomContentWithText ---- */
