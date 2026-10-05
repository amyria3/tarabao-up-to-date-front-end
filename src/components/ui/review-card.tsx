import { ReactionCounter } from '@/components/ui/reaction-counter'
import { ReviewStars } from '@/components/ui/review-stars'
import { HeadlineH3 } from '@/components/ui/typography'
import { ProductImage } from '@modules/products/components/product-image'
import type { ReviewModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

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
      data-theme="purple-tint-surface-snow"
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
