import Link from 'next/link'
import { ProductImage } from '@modules/products/components/product-image'
import type { TeaserModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { CARD_THEME, type HoverProps, CARD_FRAME } from '@/components/ui/card-chrome'

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
      {...CARD_THEME}
      data-expandable={expandable || undefined}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card relative flex h-122 w-full min-w-card-min max-w-card-max gap-lg bg-surface px-lg pt-md-l pb-lg text-card-content-text motion-long',
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
