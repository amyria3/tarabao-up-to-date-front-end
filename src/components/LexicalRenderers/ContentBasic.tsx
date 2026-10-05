'use client'

import * as React from 'react'
import { ModuleHeadline, type ModuleHeadlineType } from '@/components/LexicalRenderers/ModuleHeadline'
import { DefaultParagraph } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export interface ContentBasicProps {
  headline?: React.ReactNode
  headlineType?: ModuleHeadlineType
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4'
  /** höchstens 3 Absätze (Figma-Beschreibung) */
  paragraphs: React.ReactNode[]
  paragraphSize?: 'lg' | 'md'
  className?: string
}

/**
 * Figma: ContentModules / Basic (7715:19490) · TypeOfHeadline, TypeOfParagraph, Has Headline?.
 * Spalte gap-md-l, min/max block: Slot „Headline“ (höchstens 1) und Slot „Paragraph“
 * (Primitives / DefaultParagraph LG oder MD, höchstens 3). Die Slots bekommen kein Element,
 * die Inhalte folgen direkt in der Spalte.
 */
export function ContentBasic({
  headline,
  headlineType = 'h2',
  headingLevel,
  paragraphs,
  paragraphSize = 'lg',
  className,
}: ContentBasicProps) {
  return (
    <div
      data-slot="content-basic"
      className={cn('flex w-full min-w-block-min max-w-block-max flex-col gap-md-l', className)}
    >
      {headline ? (
        <ModuleHeadline type={headlineType} as={headingLevel}>
          {headline}
        </ModuleHeadline>
      ) : null}
      {paragraphs.slice(0, 3).map((p, i) => (
        <DefaultParagraph key={i} size={paragraphSize}>
          {p}
        </DefaultParagraph>
      ))}
    </div>
  )
}

/* ---- ContentModules / CTA ---- */
