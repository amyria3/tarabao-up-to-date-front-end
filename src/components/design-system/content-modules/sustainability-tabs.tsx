'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

import { BasicWithDisclosure } from '@/components/design-system/content-modules/content-modules'
import { SustainabilityCategoryNavigation } from '@/components/design-system/switches/category-navigation'
import type { SustainabilityCategory } from '@/lib/design-system/sustainability'
import { cn } from '@/lib/utils'

export type SustainabilityModule = { title: string; text: string; signets?: number }

export interface SustainabilityTabsProps {
  content: Partial<Record<SustainabilityCategory, SustainabilityModule[]>>
  defaultCategory?: SustainabilityCategory
  className?: string
}

/**
 * Figma: ContentModules / SustainabilityTabs (8144:22842). Kein <section>, sondern ein Tab-Widget:
 * Switches / SustainabilitCategoryNavigation (tablist) und je Kategorie ein tabpanel mit
 * ContentModules / BasicWithDisclosure (Umbruch, gap-md). Nur ein Modul ist offen.
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
              signets={m.signets}
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
