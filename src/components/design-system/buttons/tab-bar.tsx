'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PRODUCT_TABS, type TabBarItem } from '@/lib/design-system/tabs'
import { cn } from '@/lib/utils'

export { PRODUCT_TABS, type TabBarItem }

export interface TabBarProps {
  items: TabBarItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Inhalte je Tab; ohne children rendert TabBar nur die Leiste. */
  children?: React.ReactNode
  className?: string
  'aria-label'?: string
}

/**
 * Figma: Buttons / XS / TabBar (3970:22955).
 * HTML-Rolle tablist, Kinder role=tab (SegmentControlButton). Nur für
 * Tab-Umschaltung, keine generische Button-Gruppe.
 */
export function TabBar({ items, value, defaultValue, onValueChange, children, className, ...aria }: TabBarProps) {
  return (
    <Tabs
      value={value}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={onValueChange}
      className={cn('w-full', className)}
    >
      <TabsList aria-label={aria['aria-label']}>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}
