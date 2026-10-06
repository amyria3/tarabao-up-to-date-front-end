'use client'

import Link from 'next/link'
import * as React from 'react'

import { IconCart } from '@/components/icons/figma-icons'
import { ArrowUpOrDown } from '@/components/ui/arrow-up-or-down'
import { ReviewStars } from '@/components/ui/review-stars'
import { ShippingCostsInfo } from '@/components/ui/shipping-costs-info'
import { SustainabilityCategoryTags } from '@/components/ui/sustainability-category-tag'
import { BulletedList } from '@/components/ui/typography'
import { SizeAndPrice } from '@modules/products/components/size-and-price'
import { Choice } from '@modules/products/components/choice'
import { Button } from '@/components/ui/button'
import type { ProductDetailModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type AddToCartRequest = { productId: string; variantId: string; subscription: boolean }
export type BuyBoxSelection = { variantId: string; subscription: boolean }

export interface BuyBoxProps {
  product: ProductDetailModel
  defaultVariantId?: string
  shippingHref?: string
  pending?: boolean
  onAddToCart?: (request: AddToCartRequest) => void
  /** Meldet jede Änderung von Größe oder Einmalkauf/Abo, z. B. für den Schnellbutton in Sections / ProductHeader */
  onSelectionChange?: (selection: BuyBoxSelection) => void
  className?: string
}

/**
 * Figma: Components / Product / BuyBox (3164:4829). Spalte gap-sm, min/max block:
 * Titel ProductPage/ProductTitle mit ReviewStars und „Zu Bewertungen“ (DefaultText S, Pfeil),
 * Primitives / BulletedList, SustainabilityCategoryTags, „Menge, Verpackung und Preis*:“
 * (ProductPage/Hightlighted, rechts) mit Primitives / ShippingCostsInfo (Hover zeigt die
 * Versandkosten), Components / Product / SizeAndPrice (Chips Pack, Multipack, Bulk mit Preis je
 * Größe), darunter Choice (Einmalkauf oder Abo) und Buttons / MD / PrimaryButton „In den Warenkorb“.
 */
export function BuyBox({
  product,
  defaultVariantId,
  shippingHref = '/de-de/page/versandrichtlinien',
  pending,
  onAddToCart,
  onSelectionChange,
  className,
}: BuyBoxProps) {
  const [variantId, setVariantId] = React.useState(defaultVariantId ?? product.variants[0]?.id ?? '')
  const [subscription, setSubscription] = React.useState(false)
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]
  const changeVariant = (id: string) => {
    setVariantId(id)
    onSelectionChange?.({ variantId: id, subscription })
  }
  const changeSubscription = (next: boolean) => {
    setSubscription(next)
    if (variant) onSelectionChange?.({ variantId: variant.id, subscription: next })
  }
  return (
    <div
      data-slot="buy-box"
      className={cn('flex w-full min-w-block-min max-w-block-max flex-col gap-sm text-content-text', className)}
    >
      <div className="flex w-full flex-col gap-md-sm pb-md-l">
        {/* Figma visible-lg-up: Unter lg steht der Titel sichtbar über der Galerie (ProductGallery); die
            Überschrift bleibt hier für Screenreader. */}
        <h1 className="sr-only w-full type-product-page-product-title lg:not-sr-only">{product.title}</h1>
        {product.rating !== undefined ? (
          <div className="flex items-center gap-5">
            <ReviewStars rating={product.rating} className="w-auto" />
            <span className="sr-only">{product.rating} von 5 Sternen</span>
            {product.reviewsHref ? (
              <Link
                href={product.reviewsHref}
                className="flex items-center gap-1.25 type-default-text-s hover:underline focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
              >
                Zu Bewertungen
                <ArrowUpOrDown variant="down" size={14} />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
      <BulletedList items={product.highlights} />
      {product.sustainability?.length ? <SustainabilityCategoryTags categories={product.sustainability} /> : null}
      <div className="flex w-full flex-col gap-md-l">
        <div className="flex w-full flex-col items-end gap-xxxs text-right">
          <p className="type-product-page-hightlighted">Menge, Verpackung und Preis*:</p>
          <ShippingCostsInfo href={shippingHref} />
        </div>
        <SizeAndPrice variants={product.variants} value={variantId} onValueChange={changeVariant} />
      </div>
      <div className="flex w-full flex-col gap-sm pt-md">
        <Choice subscription={subscription} onSubscriptionChange={changeSubscription} />
        <div className="flex w-full flex-col items-end">
          {/* Figma: Buttons / LG / PrimaryButton · Mega Card?=False (Farben von MD / PrimaryButton, Maße von LG) */}
          <Button
            intent="primary"
            size="lg"
            megaCard={false}
            className="w-full"
            disabled={pending || !variant}
            icon={<IconCart aria-hidden className="h-btn-lg-icon w-auto" />}
            onClick={() => variant && onAddToCart?.({ productId: product.id, variantId: variant.id, subscription })}
          >
            In den Warenkorb
          </Button>
        </div>
      </div>
    </div>
  )
}
