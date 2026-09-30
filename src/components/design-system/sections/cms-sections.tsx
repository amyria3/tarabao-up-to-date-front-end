import type * as React from 'react'

import { CustomContentWithText, Editorial } from '@/components/design-system/content-modules/content-modules'
import {
  SustainabilityTabs,
  type SustainabilityModule,
} from '@/components/design-system/content-modules/sustainability-tabs'
import { Section } from '@/components/design-system/templates/section'
import type { SustainabilityCategory } from '@/lib/design-system/sustainability'

/**
 * Figma: Sections / CMS(CustomSection) (7988:23735, Default 8945:32900). Templates / Section mit
 * 12 Slots. Laut Figma lassen sich alle ContentModules in beliebiger Reihenfolge und Zahl stapeln
 * („wie ein riesiger Legoturm“). Die Module folgen direkt im Wrapper, Slots bekommen kein Element.
 */
export function CmsSection({ children, label }: { children: React.ReactNode; label?: string }) {
  return <Section aria-label={label}>{children}</Section>
}

export interface SustainabilitySectionProps {
  intro: { headline: string; columns: React.ReactNode[] }
  supplier: { left: React.ReactNode; right: React.ReactNode }
  tabs: Partial<Record<SustainabilityCategory, SustainabilityModule[]>>
}

/**
 * Figma: Sections / Sustainability (8130:21717). HTML-Rolle <section>: Slot 1 CMS / Editorial
 * (Einleitung, Datenherkunft), Slot 2 CMS / CustomContentWithText (Lieferant und Medien),
 * Slot 3 ContentModules / SustainabilityTabs als Tab-Widget.
 */
export function SustainabilitySection({ intro, supplier, tabs }: SustainabilitySectionProps) {
  return (
    <Section aria-label={intro.headline}>
      <Editorial headline={intro.headline} headlineType="h1" columns={intro.columns} />
      <CustomContentWithText left={supplier.left} right={supplier.right} />
      <SustainabilityTabs content={tabs} />
    </Section>
  )
}
