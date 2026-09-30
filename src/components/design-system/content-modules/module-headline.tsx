import type * as React from 'react'

import { HeadlineH1, HeadlineH2, HeadlineH3 } from '@/components/design-system/primitives/typography'

/** Figma TypeOfHeadline in ContentModules / Basic, CustomContentWithImg, Editorial */
export type ModuleHeadlineType = 'h1' | 'h1-subtle' | 'h2' | 'h2-alternative' | 'h2-subtle' | 'h3'

export interface ModuleHeadlineProps {
  type?: ModuleHeadlineType
  /** Semantische Ebene; Standard folgt dem Typ (Subtle bleibt eine Überschrift) */
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  align?: 'left' | 'center'
  className?: string
  children: React.ReactNode
}

/** Wählt Primitives / Headline / H1 · H2 · H3 mit Style wie der Figma-Slot „Headline“. */
export function ModuleHeadline({ type = 'h2', as, align, className, children }: ModuleHeadlineProps) {
  const level = as ?? (type.startsWith('h1') ? 'h1' : type.startsWith('h2') ? 'h2' : 'h3')
  switch (type) {
    case 'h1':
      return (
        <HeadlineH1 as={level} align={align} className={className}>
          {children}
        </HeadlineH1>
      )
    case 'h1-subtle':
      return (
        <HeadlineH1 variant="subtitle" as={level} align={align} className={className}>
          {children}
        </HeadlineH1>
      )
    case 'h2-alternative':
      return (
        <HeadlineH2 variant="alternative" as={level} align={align} className={className}>
          {children}
        </HeadlineH2>
      )
    case 'h2-subtle':
      return (
        <HeadlineH2 variant="subtitle" as={level} align={align} className={className}>
          {children}
        </HeadlineH2>
      )
    case 'h3':
      return (
        <HeadlineH3 as={level} align={align} className={className}>
          {children}
        </HeadlineH3>
      )
    default:
      return (
        <HeadlineH2 as={level} align={align} className={className}>
          {children}
        </HeadlineH2>
      )
  }
}
