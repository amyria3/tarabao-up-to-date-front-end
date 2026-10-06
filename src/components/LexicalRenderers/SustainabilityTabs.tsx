'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

import { BasicWithDisclosure } from '@/components/LexicalRenderers/BasicWithDisclosure'
import { SustainabilityCategoryNavigation } from '@/components/ui/category-navigation'
import type { SustainabilityCategory } from '@/lib/design-system/sustainability'
import { cn } from '@/lib/utils'

/**
 * Ein Baustein der Lieferanten-Selbstauskunft (Figma z. B. „[B.1 Preise]“).
 * text = Absatz 1 (Festtext), supplierData = Absatz 2 (Antworten aus dem Lieferantenfragebogen, je Zeile
 * „Bezeichnung: Wert“), supplierNote = Absatz 3 (Ergänzungen, CMS lieferantenspezifisch),
 * signets = Siegel (Anzahl Platzhalter oder Namen).
 */
export type SustainabilityModule = {
  title: string
  text: string
  supplierData?: string[]
  supplierNote?: string
  signets?: number | string[]
}

export interface SustainabilityTabsProps {
  content: Partial<Record<SustainabilityCategory, SustainabilityModule[]>>
  defaultCategory?: SustainabilityCategory
  className?: string
}

/**
 * Figma: ContentModules / SustainabilityTabs (10020:52037) · Selected=Engagement|Umwelt|Fairness|No Plane.
 * Kein <section>, sondern ein Tab-Widget: Switches / SustainabilityCategoryNavigation (tablist) und je
 * Kategorie ein tabpanel mit ContentModules / BasicWithDisclosure (Umbruch, gap-md). Nur ein Baustein
 * ist offen, beim Tabwechsel der erste. Ein Tab mit nur einem Baustein (No Plane) zeigt ihn ohne
 * Accordion (Figma ContentModules / Basic).
 */
export function SustainabilityTabs({
  content,
  defaultCategory = 'social-commitment',
  className,
}: SustainabilityTabsProps) {
  const [openIndex, setOpenIndex] = React.useState(0)
  return (
    <TabsPrimitive.Root
      data-slot="sustainability-tabs"
      defaultValue={defaultCategory}
      onValueChange={() => setOpenIndex(0)}
      className={cn('flex w-full flex-col gap-md-l pt-md-l', className)}
    >
      <SustainabilityCategoryNavigation />
      {Object.entries(content).map(([category, modules]) => (
        <TabsPrimitive.Content
          key={category}
          value={category}
          className="flex w-full flex-wrap items-start justify-center gap-md focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
        >
          {modules?.map((m, i) => (
            <BasicWithDisclosure
              key={m.title}
              title={m.title}
              text={m.text}
              supplierData={m.supplierData}
              supplierNote={m.supplierNote}
              signets={m.signets}
              collapsible={modules.length > 1}
              open={openIndex === i}
              onOpenChange={(open) => setOpenIndex(open ? i : -1)}
              className="flex-1"
            />
          ))}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
