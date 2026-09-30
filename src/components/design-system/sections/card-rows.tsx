import type * as React from 'react'

import { BlogCard, FeaturedCard, ReviewCard } from '@/components/design-system/cards/content-cards'
import { DiscoveryCardRow } from '@/components/design-system/cards/discovery-card-row'
import { ProductCard, ProductCardWithReviews } from '@/components/design-system/cards/product-card'
import { HeadlineH2 } from '@/components/design-system/primitives/typography'
import { CardsOrder } from '@/components/design-system/templates/cards-order'
import { Section } from '@/components/design-system/templates/section'
import type { ProductCardModel, ReviewModel, TeaserModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface CardRowProps {
  title: React.ReactNode
  /** Figma Horizontal Scroll?=True: eine Zeile, die waagerecht scrollt (Titel mittig) */
  scroll?: boolean
  /** Kinder sind <li>-Elemente mit je einer Karte */
  children: React.ReactNode
  className?: string
}

/**
 * Figma: Sections / CardRow (6604:17026) · Horizontal Scroll?, Variable Card-Hight?,
 * Type Of Card=Unspecific|Featured|Discovery. Templates / Section: Slot 00 H2 (mittig bei
 * Scroll, sonst links), Slot 01 Templates / Cards Order (Row: gap-4, verteilt; Tiles: gap-md).
 */
export function CardRow({ title, scroll = false, children, className }: CardRowProps) {
  return (
    <Section className={className} aria-label={typeof title === 'string' ? title : undefined}>
      <HeadlineH2 align={scroll ? 'center' : 'left'}>{title}</HeadlineH2>
      <CardsOrder variant={scroll ? 'row' : 'tiles'} className={scroll ? 'justify-between gap-4' : 'gap-md'}>
        {children}
      </CardsOrder>
    </Section>
  )
}

/** CardRow · Unspecific mit Cards / ProductCard (z. B. „Für Dich ausgewählt“) */
export function ProductCardRow({
  title,
  products,
  scroll,
  className,
}: {
  title: React.ReactNode
  products: ProductCardModel[]
  scroll?: boolean
  className?: string
}) {
  return (
    <CardRow title={title} scroll={scroll} className={className}>
      {products.map((p) => (
        <li key={p.id} className="w-64">
          <ProductCard product={p} />
        </li>
      ))}
    </CardRow>
  )
}

/** CardRow · Featured, Variable Card-Hight?=True */
export function FeaturedCardRow({
  title,
  teasers,
  className,
}: {
  title: React.ReactNode
  teasers: TeaserModel[]
  className?: string
}) {
  return (
    <CardRow title={title} className={className}>
      {teasers.map((t) => (
        <li key={t.id}>
          <FeaturedCard teaser={t} />
        </li>
      ))}
    </CardRow>
  )
}

/**
 * CardRow · Discovery, Variable Card-Hight?=True (Figma: Cards Order · Tiles). Die Karten stehen in
 * Reihen zu höchstens drei, da drei Karten mit card-max genau die Inhaltsbreite füllen. Jede Reihe ist
 * eine DiscoveryCardRow: Wächst die Karte ganz links, rücken die Nachbarn nach rechts; ganz rechts
 * rückt der Inhalt nach links; dazwischen rücken die Nachbarn zu beiden Seiten.
 */
export function DiscoveryCardSection({
  title,
  teasers,
  perRow = 3,
  className,
}: {
  title: React.ReactNode
  teasers: TeaserModel[]
  perRow?: number
  className?: string
}) {
  const rows: TeaserModel[][] = []
  for (let i = 0; i < teasers.length; i += perRow) rows.push(teasers.slice(i, i + perRow))
  return (
    <Section className={className} aria-label={typeof title === 'string' ? title : undefined}>
      <HeadlineH2>{title}</HeadlineH2>
      <div className="flex w-full flex-col gap-md">
        {rows.map((row, i) => (
          <DiscoveryCardRow key={i} teasers={row} />
        ))}
      </div>
    </Section>
  )
}

/**
 * Figma: Sections / BlogCards (6605:16723). H2 „Rezepte und Blogbeiträge“ und eine scrollende
 * Reihe Cards / BlogCard. Die Auswahl (Tag des Produkts oder Sammlung) liefert das CMS.
 */
export function BlogCardsSection({
  title = 'Rezepte und Blogbeiträge',
  posts,
  className,
}: {
  title?: React.ReactNode
  posts: TeaserModel[]
  className?: string
}) {
  return (
    <CardRow title={title} scroll className={className}>
      {posts.map((p) => (
        <li key={p.id} className="w-80">
          <BlogCard post={p} />
        </li>
      ))}
    </CardRow>
  )
}

/**
 * Figma: Sections / CustomerReviews (7472:20901). H2 links „Das sagen unsere Kund*innen“ und eine
 * scrollende Reihe Cards / ReviewCard (gap-4).
 */
export function CustomerReviewsSection({
  title = 'Das sagen unsere Kund*innen',
  reviews,
  className,
}: {
  title?: React.ReactNode
  reviews: ReviewModel[]
  className?: string
}) {
  return (
    <Section className={className} aria-label={typeof title === 'string' ? title : undefined}>
      <HeadlineH2>{title}</HeadlineH2>
      <CardsOrder variant="row" className="justify-between gap-4">
        {reviews.map((r) => (
          <li key={r.id} className="w-72">
            <ReviewCard review={r} />
          </li>
        ))}
      </CardsOrder>
    </Section>
  )
}

/**
 * Figma: Sections / CustomerReviewedProducts (8118:22771). Wie CustomerReviews, mit
 * Cards / ProductCardWithReviews.
 */
export function CustomerReviewedProductsSection({
  title = 'Das sagen unsere Kund*innen',
  products,
  className,
}: {
  title?: React.ReactNode
  products: ProductCardModel[]
  className?: string
}) {
  return (
    <Section className={className} aria-label={typeof title === 'string' ? title : undefined}>
      <HeadlineH2>{title}</HeadlineH2>
      <CardsOrder variant="row" className="justify-between gap-4">
        {products.map((p) => (
          <li key={p.id} className="w-64">
            <ProductCardWithReviews product={p} />
          </li>
        ))}
      </CardsOrder>
    </Section>
  )
}

/**
 * Figma: Sections / ReviewCards (7472:20772), laut Figma derzeit nicht gebraucht.
 * Spalte aus Cards / ReviewCard, max-w-block-max.
 */
export function ReviewCardsColumn({ reviews, className }: { reviews: ReviewModel[]; className?: string }) {
  return (
    <ul className={cn('flex w-full max-w-block-max flex-col gap-md', className)}>
      {reviews.map((r) => (
        <li key={r.id}>
          <ReviewCard review={r} />
        </li>
      ))}
    </ul>
  )
}
