import type * as React from 'react'

import { ButtonShape } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

/**
 * Figma: Components / HighlightedInformation (10325:56341). Hebt eine Angabe des Lieferanten hervor
 * (CMS-Text, z. B. eine Prämie für die Mitarbeiter*innen). Form Button-Shape „Very oval“ mit Fläche
 * nutmixer-tag-bg-default und gestrichelter Kontur (1 px, Strich und Lücke je 6 px) in
 * nutmixer-tag-label-&-stroke-default. Innenabstand md-sm, Text Label/default zentriert und 84 px breit.
 */
export function HighlightedInformation({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      data-slot="highlighted-information"
      className={cn('relative flex items-center justify-center p-md-sm', className)}
    >
      <ButtonShape
        shape="very-oval"
        className="text-nutmixer-tag-bg-default"
        outlineClassName="text-nutmixer-tag-label-stroke-default [&_path]:[stroke-dasharray:6_6]"
      />
      <p className="relative w-21 text-center type-label-default break-words text-nutmixer-tag-label-stroke-default">
        {children}
      </p>
    </div>
  )
}

/**
 * Figma: Reihe aus Components / HighlightedInformation in Sections / Sustainability (ContentSlot 05):
 * zentriert, gap-md-sm. Figma bricht nicht um; im Code bricht die Reihe auf schmalen Bildschirmen um,
 * damit keine Form aus dem Bildschirm ragt.
 */
export function HighlightedInformationRow({ items, className }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul
      data-slot="highlighted-information-row"
      className={cn('flex w-full flex-wrap items-center justify-center gap-md-sm', className)}
    >
      {items.map((item, i) => (
        <li key={i}>
          <HighlightedInformation>{item}</HighlightedInformation>
        </li>
      ))}
    </ul>
  )
}
