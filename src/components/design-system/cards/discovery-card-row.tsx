import type * as React from 'react'

import { DiscoveryCard } from '@/components/design-system/cards/content-cards'
import type { TeaserModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface DiscoveryCardRowProps {
  teasers: TeaserModel[]
  /** Bibliothek: zeigt den Hover-Zustand der Karte an dieser Stelle */
  forceHoverIndex?: number
  className?: string
}

// Ausweichen der Nachbarn: Die Reihe steht mittig. Wächst eine Karte, wächst die Reihe zu beiden
// Seiten. Bei der ersten Karte verschiebt die Reihe sich um die halbe Differenz nach rechts,
// bei der letzten nach links. So bleibt die äußere Kante der Randkarte stehen.
// Klassen stehen ausgeschrieben, damit Tailwind sie beim Scannen findet.
const SHIFT = [
  'lg:has-[>li[data-expandable]:first-child:hover]:translate-x-(--shift)',
  'lg:has-[>li[data-expandable]:first-child:focus-within]:translate-x-(--shift)',
  'lg:has-[>li[data-expandable][data-hovered]:first-child]:translate-x-(--shift)',
  'lg:has-[>li[data-expandable]:last-child:hover]:-translate-x-(--shift)',
  'lg:has-[>li[data-expandable]:last-child:focus-within]:-translate-x-(--shift)',
  'lg:has-[>li[data-expandable][data-hovered]:last-child]:-translate-x-(--shift)',
]

/**
 * Reihe aus Cards / DiscoveryCard (Figma: Sections / CardRow · Type Of Card=Discovery, 6708:16614).
 * Ab lg stehen die Karten ohne Umbruch nebeneinander und teilen sich die Breite (max card-max).
 * Wächst eine Karte bei Hover oder Fokus auf card-discovery-max, weichen die Nachbarn aus:
 * Die erste Karte schiebt die Nachbarn nach rechts, die letzte nach links, eine mittlere zu
 * beiden Seiten. Was über den Rand der Reihe hinausragt, schneidet die Reihe ab (wie
 * Templates / Section in Figma). Unter lg brechen die Karten um und wachsen nicht.
 */
export function DiscoveryCardRow({ teasers, forceHoverIndex, className }: DiscoveryCardRowProps) {
  const count = teasers.length
  const style = {
    '--cols': count,
    // Nie schmaler als die Karte laut Figma sein darf: Inhalt min card-small-min plus px-lg.
    '--card-w':
      'clamp(calc(var(--container-card-small-min) + 2 * var(--spacing-lg)), calc((100cqw - (var(--cols) - 1) * var(--spacing-md-l)) / var(--cols)), var(--container-card-max))',
    '--shift': 'calc((var(--container-card-discovery-max) - var(--card-w)) / 2)',
  } as React.CSSProperties
  return (
    <div
      data-slot="discovery-card-row"
      className={cn('@container flex w-full justify-center overflow-x-clip', className)}
      style={style}
    >
      <ul
        className={cn(
          'flex w-full flex-wrap justify-center gap-md-l',
          'lg:w-max lg:flex-nowrap lg:transition-transform lg:duration-300',
          count > 1 && SHIFT,
        )}
      >
        {teasers.map((teaser, i) => {
          const expandable = (teaser.facts?.length ?? 0) > 0
          const hovered = forceHoverIndex === i
          return (
            <li
              key={teaser.id}
              data-expandable={expandable || undefined}
              {...(hovered ? { 'data-hovered': '' } : {})}
              className={cn(
                'flex w-full max-w-card-max justify-center',
                'lg:w-(--card-w) lg:max-w-none lg:flex-none lg:transition-[width] lg:duration-300',
                expandable &&
                  'lg:hover:w-card-discovery-max lg:focus-within:w-card-discovery-max lg:data-hovered:w-card-discovery-max',
              )}
            >
              <DiscoveryCard teaser={teaser} forceHover={hovered} className="lg:max-w-none" />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
