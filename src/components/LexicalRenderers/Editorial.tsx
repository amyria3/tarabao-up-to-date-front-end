'use client'

import * as React from 'react'
import { ModuleHeadline } from '@/components/LexicalRenderers/ModuleHeadline'
import { DefaultParagraph } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

/**
 * Figma: ContentModules / CMS / Editorial (3164:4506) · DisplayHeadline?, Display Footnote,
 * Display Second Column, TypeOfHeadline=H1|H2|H3, TypeOfParagraph=MD|LG. Spalte gap-md-l bis
 * block-double-max: Überschrift, zwei Spalten DefaultParagraph (Umbruch, gap-lg) und Footnote.
 */
export function Editorial({
  headline,
  headlineType = 'h1',
  align,
  columns,
  paragraphSize = 'lg',
  footnote,
  className,
}: {
  headline?: React.ReactNode
  headlineType?: 'h1' | 'h2' | 'h3'
  /** Figma-Achse Align der Headline; center = links bis md, ab md zentriert */
  align?: 'left' | 'center'
  /** eine oder zwei Spalten */
  columns: React.ReactNode[]
  paragraphSize?: 'lg' | 'md'
  footnote?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="editorial" className={cn('flex w-full max-w-block-double-max flex-col gap-md-l', className)}>
      {headline ? (
        <ModuleHeadline type={headlineType} align={align}>
          {headline}
        </ModuleHeadline>
      ) : null}
      <div className="flex w-full flex-wrap justify-center gap-lg">
        {columns.slice(0, 2).map((c, i) => (
          <DefaultParagraph key={i} size={paragraphSize} className="flex-1">
            {c}
          </DefaultParagraph>
        ))}
      </div>
      {footnote ? <p className="w-full text-center type-default-text-s text-content-text">{footnote}</p> : null}
    </div>
  )
}
