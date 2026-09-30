import Link from 'next/link'
import * as React from 'react'

import { PurchaseSummary } from '@/components/design-system/account/purchase-summary'
import { ReactionCounter } from '@/components/design-system/buttons/reaction-counter'
import { IconCartEmpty } from '@/components/design-system/icons/figma-icons'
import { ReviewStars } from '@/components/design-system/primitives/review-stars'
import { HeadlineH3 } from '@/components/design-system/primitives/typography'
import { ProductImage } from '@/components/design-system/visuals/product-image'
import { Button } from '@/components/ui/button'
import type { PurchaseModel, ReviewModel, TeaserModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

type HoverProps = { forceHover?: boolean; className?: string }

const CARD_FRAME = 'border border-card-btn-hover-click shadow-card'
const CARD_HOVER =
  'hover:bg-card-surface-hover hover:shadow-card-hover data-hovered:bg-card-surface-hover data-hovered:shadow-card-hover'

/**
 * Figma: Cards / BlogCard (380:881) · Variant=Blog|Default, State=Default|Hover.
 * h113 (452 px), p-md-l, Fläche surface-color, eigener Schatten (BlogCard).
 * Bild füllt den Rahmen, Titel Cards/Blog/Title: Variant=Blog zentriert, Default linksbündig.
 * Ganze Karte verlinkt.
 */
export function BlogCard({
  post,
  variant = 'default',
  forceHover,
  className,
}: { post: TeaserModel; variant?: 'blog' | 'default' } & HoverProps) {
  return (
    <Link
      href={post.href ?? '#'}
      data-slot="blog-card"
      data-variant={variant}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card flex h-113 w-full min-w-card-min max-w-card-max flex-col items-center justify-center gap-[1.875rem] border border-card-btn-hover-click bg-surface p-md-l shadow-card-blog',
        'hover:bg-card-surface-hover hover:shadow-card-blog-hover data-hovered:bg-card-surface-hover data-hovered:shadow-card-blog-hover focus-visible:outline-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
    >
      <span className="block min-h-zero w-full flex-1">
        <ProductImage image={post.image} />
      </span>
      <span
        className={cn(
          'w-full type-cards-blog-title text-content-text group-hover/card:underline group-data-hovered/card:underline',
          variant === 'blog' && 'text-center',
        )}
      >
        {post.title}
      </span>
    </Link>
  )
}

/**
 * Figma: Cards / ReviewCard (2194:1982) · Reactions?=True|False, State?=Default|Open.
 * Kopf pt-lg px-md-l, zentrierte Sterne (nur vergebene), Name + Datum (Comment),
 * Titel H3, Text Comment/BodyText (zweizeilig, h 44; aufgeklappt ganz), Bildfläche
 * h154 bzw. aufgeklappt h216, darunter Buttons / ReactionCounter
 * (Reactions?=False → Variant=1, Herz als Kontur; True → Variant=2 mit Zahl).
 * In Figma zeigt State?=Open den gekürzten und State?=Default den vollen Text;
 * hier öffnet ein Klick auf den Text die ganze Bewertung (<details>, defaultOpen).
 */
export function ReviewCard({
  review,
  defaultOpen = false,
  className,
}: {
  review: ReviewModel
  defaultOpen?: boolean
  className?: string
}) {
  return (
    <article
      data-slot="review-card"
      className={cn(
        'group/review relative flex w-full max-w-card-max flex-col border border-card-btn-hover-click bg-card-surface pb-md text-card-content-text',
        className,
      )}
    >
      <div className="flex w-full flex-col items-center gap-sm px-md-l pt-lg pb-md-l">
        <div className="pb-2.5">
          <ReviewStars rating={review.rating} emptyStars="hidden" className="text-card-content-text" />
        </div>
        <div className="flex w-full flex-col pb-xxs">
          <p className="flex items-center gap-xxs type-comment">
            <span>{review.author}</span>
            <span>{review.dateLabel}</span>
          </p>
          <div className="flex flex-col gap-[0.9375rem] pt-sm">
            <HeadlineH3 as="h3">{review.title}</HeadlineH3>
            <details open={defaultOpen} className="group/details">
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="line-clamp-2 type-comment-body-text group-open/details:line-clamp-none">
                  {review.body}
                </span>
                <span className="sr-only group-open/details:hidden">Ganze Bewertung anzeigen</span>
              </summary>
            </details>
          </div>
        </div>
        {review.image ? (
          <div className="h-[9.625rem] w-full group-has-[details[open]]/review:h-54">
            <ProductImage image={review.image} className="[&_img]:opacity-40" />
          </div>
        ) : null}
      </div>
      <div className="flex w-full justify-end px-md pt-md-sm">
        <ReactionCounter likes={review.likes ?? 0} className="w-auto pt-zero" />
      </div>
    </article>
  )
}

/**
 * Figma: Cards / FeaturedCard (6704:18568) · State=Default|Hover, Variant=Default|BlogPost.
 * pt-md-l px-lg pb-lg gap-md-l, min/max card, min-h 96, max-h 168 (twuc).
 * Titel Cards/Featured/Title (BlogPost: darunter Autorin und Datum, DefaultText S),
 * Bild h219 px, Text DefaultText S, Link „Mehr erfahren“. Hover: card-surface-hover,
 * card-content-text-hover und Schatten „Cards on-hover“.
 */
export function FeaturedCard({
  teaser,
  variant = 'default',
  forceHover,
  className,
}: { teaser: TeaserModel; variant?: 'default' | 'blog-post' } & HoverProps) {
  const meta = variant === 'blog-post' && (teaser.author || teaser.dateLabel)
  return (
    <article
      data-slot="featured-card"
      data-variant={variant}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card relative flex w-full min-w-card-min max-w-card-max min-h-96 max-h-168 flex-col gap-md-l bg-card-surface px-lg pt-md-l pb-lg text-card-content-text',
        CARD_FRAME,
        CARD_HOVER,
        'hover:text-card-content-text-hover data-hovered:text-card-content-text-hover',
        className,
      )}
    >
      <div className="flex flex-col gap-xs">
        <h3 className="pt-md-sm type-cards-featured-title">{teaser.title}</h3>
        {meta ? (
          <p className="flex gap-2.5 type-default-text-s">
            {teaser.author ? <span>{teaser.author}</span> : null}
            {teaser.dateLabel ? <span>{teaser.dateLabel}</span> : null}
          </p>
        ) : null}
      </div>
      <div className="h-[13.6875rem] w-full">
        <ProductImage image={teaser.image} />
      </div>
      <div className="flex flex-col gap-md-sm">
        {teaser.body ? <p className="type-default-text-s">{teaser.body}</p> : null}
        {teaser.href ? (
          <Link
            href={teaser.href}
            className="type-link after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
          >
            {teaser.linkLabel ?? 'Mehr erfahren'}
          </Link>
        ) : null}
      </div>
    </article>
  )
}

/**
 * Figma: Cards / DiscoveryCard (6708:16673) · State=Default|Hover.
 * h122 (488 px), Fläche surface-color, Bild mit innerem Schatten „Img-inner-shadow strong“,
 * Titel Cards/Featured/Title, Untertitel H2 Subtitle. Hover (ab lg, auch bei Fokus): Karte
 * wächst bis card-discovery-max (672 px), das Bild schrumpft auf h256 und rechts erscheinen
 * Fragen und Antworten (DefaultText S). Die Antworten bleiben für Screenreader immer lesbar.
 * In einer Reihe regelt DiscoveryCardRow, in welche Richtung die Nachbarn ausweichen.
 */
export function DiscoveryCard({ teaser, forceHover, className }: { teaser: TeaserModel } & HoverProps) {
  const expandable = (teaser.facts?.length ?? 0) > 0
  return (
    <article
      data-slot="discovery-card"
      data-expandable={expandable || undefined}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card relative flex h-122 w-full min-w-card-min max-w-card-max gap-lg bg-surface px-lg pt-md-l pb-lg text-card-content-text transition-[max-width] duration-300',
        CARD_FRAME,
        'hover:shadow-card-hover data-hovered:shadow-card-hover',
        expandable &&
          'lg:data-hovered:max-w-card-discovery-max lg:focus-within:max-w-card-discovery-max lg:hover:max-w-card-discovery-max',
        className,
      )}
    >
      <div className="flex h-full min-w-card-small-min flex-1 flex-col gap-lg">
        <div
          className={cn(
            'relative min-h-zero w-full max-w-block-max flex-1 after:pointer-events-none after:absolute after:inset-0 after:inset-shadow-img-strong',
            expandable &&
              'lg:group-data-hovered/card:h-64 lg:group-data-hovered/card:flex-none lg:group-focus-within/card:h-64 lg:group-focus-within/card:flex-none lg:group-hover/card:h-64 lg:group-hover/card:flex-none',
          )}
        >
          <ProductImage image={teaser.image} />
        </div>
        <div className="flex flex-col gap-md-sm pb-sm">
          <h3 className="type-cards-featured-title">
            {teaser.href ? (
              <Link
                href={teaser.href}
                className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
              >
                {teaser.title}
              </Link>
            ) : (
              teaser.title
            )}
          </h3>
          {teaser.subtitle ? <p className="type-h2-subtitle">{teaser.subtitle}</p> : null}
        </div>
      </div>
      {expandable ? (
        <dl
          className={cn(
            'sr-only flex flex-1 flex-col gap-md-sm overflow-hidden',
            'lg:group-data-hovered/card:not-sr-only lg:group-focus-within/card:not-sr-only lg:group-hover/card:not-sr-only',
          )}
        >
          {teaser.facts!.map((fact) => (
            <div key={fact.question} className="flex flex-col gap-xs">
              <dt className="type-default-text-s font-bold">{fact.question}</dt>
              <dd className="type-default-text-s">{fact.answer}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  )
}

/**
 * Figma: Cards / PromotionPostCard (3912:19740).
 * Bild mit 12-px-Rand, darunter Titel Cards/ProductTitle, Text Cards/Light
 * und Buttons / SM / Button-Card; py md-sm/md-l, px-xl.
 */
export function PromotionPostCard({
  teaser,
  actionLabel = 'Call to action',
  className,
}: {
  teaser: TeaserModel
  actionLabel?: string
  className?: string
}) {
  return (
    <article
      data-slot="promotion-post-card"
      className={cn(
        'flex h-95 w-full min-w-card-small-min max-w-card-max flex-col bg-card-surface shadow-card text-card-content-text',
        className,
      )}
    >
      <div className="min-h-zero w-full flex-1 border-12 border-card-surface">
        <ProductImage image={teaser.image} />
      </div>
      <div className="flex flex-col items-center gap-md-sm px-xl pt-md-sm pb-md-l">
        <h3 className="w-full type-cards-product-title">{teaser.title}</h3>
        {teaser.body ? <p className="w-full type-cards-light">{teaser.body}</p> : null}
        <Button
          asChild={Boolean(teaser.href)}
          intent="card"
          size="sm"
          icon={<IconCartEmpty aria-hidden className="size-5" />}
        >
          {teaser.href ? <Link href={teaser.href}>{actionLabel}</Link> : actionLabel}
        </Button>
      </div>
    </article>
  )
}

/**
 * Figma: Cards / PurchaseCard (6748:17300) · Status=Sent|Arrived.
 * p-md-sm gap-md, max-w-panel-max: Status (Sent: UserMessage/X-LG in 228 px,
 * Arrived: UserMessage/LG), Produktbilder (Umbruch, 4-px-Rand surface-color),
 * Zusammenfassung (Components / PurchaseSummary) und Buttons / SM / SecondaryButton
 * (Hug content?=True). Die Sorte jedes Produktbilds kommt aus den Bestelldaten.
 */
export function PurchaseCard({
  purchase,
  summary,
  className,
}: {
  purchase: PurchaseModel
  /** Eigener Inhalt statt Components / PurchaseSummary */
  summary?: React.ReactNode
  className?: string
}) {
  const sent = purchase.status === 'sent'
  return (
    <article
      data-slot="purchase-card"
      data-status={purchase.status}
      className={cn(
        'flex w-full max-w-panel-max flex-col gap-md bg-surface p-md-sm text-content-text',
        CARD_FRAME,
        className,
      )}
    >
      <p className={sent ? 'max-w-57 type-user-message-x-lg' : 'type-user-message-lg'}>{purchase.statusLabel}</p>
      <ul className="flex w-full min-w-card-small-min max-w-panel-max flex-wrap gap-sm">
        {purchase.images.map((image, i) => (
          <li
            key={i}
            className="h-[8.875rem] min-h-24 w-full min-w-block-inline-min max-w-card-img-max flex-1 border-4 border-surface"
          >
            <ProductImage image={image} sizes="13rem" />
          </li>
        ))}
      </ul>
      <div className="flex w-full flex-wrap items-end gap-sm px-xxs">
        <div className="w-64">{summary ?? <PurchaseSummary summary={purchase.summary} />}</div>
        <div className="flex flex-1 flex-col items-end gap-xxxs">
          <Button intent="secondary" size="sm" width="hug">
            {purchase.ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  )
}
