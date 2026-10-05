'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { TWO_COLUMNS } from '@/components/LexicalRenderers/contentModuleShared'

/**
 * Figma: ContentModules / CMS / CustomContentWithText (7988:22954) · LeftColumnSlotVariant=Basic|
 * ContactForm, RightColumnSlotVariant=DefaultParagraph|CTA|Ingredients|BulletList.
 * Zeile mit Umbruch, gap-xl, max-w-block-double-max, zwei Spalten min/max block.
 */
export function CustomContentWithText({
  left,
  right,
  className,
}: {
  /** je genau ein Element (Slots LeftColumn, RightColumn) */
  left: React.ReactNode
  right: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="custom-content-with-text" className={cn(TWO_COLUMNS, className)}>
      {left}
      {right}
    </div>
  )
}

/* ---- ContentModules / CMS / Editorial ---- */
