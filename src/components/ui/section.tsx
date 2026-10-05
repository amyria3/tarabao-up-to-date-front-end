import * as React from 'react'

import type { GlobalTheme } from '@/lib/design-system/themes'
import { cn } from '@/lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Figma: Modus-Pin „Clrs / Color Modes“ an der Section-Instanz */
  theme?: GlobalTheme
  /** Figma Display Breadcrumps?: steht vor dem ersten Slot */
  breadcrumb?: React.ReactNode
  as?: 'section' | 'div'
}

/**
 * Figma: Templates / Section (8308:40715) · Number of Sections=6|12.
 * Fläche surface-color, py-xl; innen Wrapper [max-w-content] mit px-md-l und gap-md-l.
 * Slots bekommen im Code kein Element (2.7 Layout): Die Inhalte folgen direkt im Wrapper.
 * Da die Figma-Slots ihren Inhalt waagerecht zentrieren, zentriert der Wrapper (items-center).
 * Min-Höhe und Fläche leerer Slots sind nur Figma-Platzhalter. Kein overflow-hidden, damit
 * Dropdowns und Sticky-Elemente nicht abgeschnitten werden.
 */
export function Section({ theme, breadcrumb, as: Tag = 'section', className, children, ...props }: SectionProps) {
  return (
    <Tag
      data-slot="section"
      {...(theme ? { 'data-theme': theme } : {})}
      className={cn('flex w-full flex-col items-center bg-surface py-xl text-content-text', className)}
      {...props}
    >
      <div className="flex w-full max-w-content flex-col items-center gap-md-l px-md-l">
        {breadcrumb}
        {children}
      </div>
    </Tag>
  )
}
