'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

import { SegmentControlButton } from '@/components/design-system/buttons/segment-control-button'
import { cn } from '@/lib/utils'

/**
 * shadcn/ui Tabs, auf das Tarabao-Vokabular umgestellt.
 * TabsList = Figma Buttons / XS / TabBar (3970:22955): Zeile mit Umbruch,
 * pb-md-l und Linie unten in segmented-label.
 * TabsTrigger = Buttons / XS / SegmentControlButton (Selected?=True ↔ data-state=active).
 */
function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-md', className)} {...props} />
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('flex w-full flex-wrap items-center border-b border-segmented-label pb-md-l', className)}
      {...props}
    />
  )
}

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  icon?: React.ReactNode
  forceHover?: boolean
}

function TabsTrigger({ className, children, icon, forceHover, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger data-slot="tabs-trigger" asChild {...props}>
      <SegmentControlButton className={className} icon={icon} forceHover={forceHover}>
        {children}
      </SegmentControlButton>
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('outline-none focus-visible:outline-2 focus-visible:outline-btn-primary-bg', className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
