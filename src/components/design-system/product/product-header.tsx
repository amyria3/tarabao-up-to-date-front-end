'use client'

import type * as React from 'react'

import { BuyBox, type AddToCartRequest } from '@/components/design-system/product/buy-box'
import { ProductGallery } from '@/components/design-system/product/product-gallery'
import { Section } from '@/components/design-system/templates/section'
import type { ProductDetailModel } from '@/lib/view-models'

/**
 * Figma: Sections / ProductHeader (4221:28723). Templates / Section (py-xl) mit einer Zeile
 * (Umbruch, gap-lg, mittig): Visuals / Product / Image (Galerie) und Components / Product / BuyBox,
 * beide flex-1 bis max-w-block-max.
 */
export function ProductHeader({
  product,
  breadcrumb,
  onAddToCart,
}: {
  product: ProductDetailModel
  breadcrumb?: React.ReactNode
  onAddToCart?: (request: AddToCartRequest) => void
}) {
  return (
    <Section breadcrumb={breadcrumb} aria-label={product.title}>
      <div className="flex w-full flex-wrap items-start justify-center gap-lg">
        <ProductGallery images={product.images} title={product.title} className="flex-1" />
        <BuyBox product={product} onAddToCart={onAddToCart} className="flex-1" />
      </div>
    </Section>
  )
}
