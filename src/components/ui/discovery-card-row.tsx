import type * as React from 'react'

import { DiscoveryCard } from '@/components/ui/discovery-card'
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
 * Ab lg stehen die Karten ohne Umbruch nebeneinander und teilen sich die Breite (max card-discovery-max).
 * Wächst eine Karte bei Hover oder Fokus auf card-discovery-hover-max, weichen die Nachbarn aus:
 * Die erste Karte schiebt die Nachbarn nach rechts, die letzte nach links, eine mittlere zu
 * beiden Seiten. Was über den Rand der Reihe hinausragt, schneidet die Reihe ab (wie
 * Templates / Section in Figma). Unter lg brechen die Karten um und wachsen nicht.
 */
export function DiscoveryCardRow({ teasers, forceHoverIndex, className }: DiscoveryCardRowProps) {
  const count = teasers.length
  const style = {
    '--cols': count,
    // Zwischen min- und max-Breite der Karte laut Figma (Cards/DiscoveryCard/min-w, max-w).
    '--card-w':
      'clamp(var(--container-card-discovery-min), calc((100cqw - (var(--cols) - 1) * var(--spacing-md-l)) / var(--cols)), var(--container-card-discovery-max))',
    '--shift': 'calc((var(--container-card-discovery-hover-max) - var(--card-w)) / 2)',
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
          'lg:w-max lg:flex-nowrap lg:motion-long',
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
                'flex w-full max-w-card-discovery-max justify-center',
                'lg:w-(--card-w) lg:max-w-none lg:flex-none lg:motion-long',
                expandable &&
                  'lg:hover:w-card-discovery-hover-max lg:focus-within:w-card-discovery-hover-max lg:data-hovered:w-card-discovery-hover-max',
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
