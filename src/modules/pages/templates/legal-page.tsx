import type * as React from 'react'
import { ContentBasic } from '@/components/LexicalRenderers/ContentBasic'
import { HeadlineH1 } from '@/components/ui/typography'
import { Section } from '@/components/ui/section'

export type LegalBlock = { headline: string; text: string }

/**
 * Figma: Rechtstexte und Infoseiten (Impressum, AGB, Datenschutzerklärung, Widerrufsrecht,
 * Versandrichtlinien, Barrierefreiheitserklärung …, Templates / Page 9242:32057 ff.).
 * Templates / Section · 12 Slots: H1 (links oder mittig) und je Abschnitt ContentModules / Basic
 * (H2 Default, DefaultParagraph LG).
 */
export function LegalPage({
  title,
  align = 'left',
  blocks,
  children,
}: {
  title: string
  align?: 'left' | 'center'
  blocks: LegalBlock[]
  /** weitere Inhalte, z. B. Components / SearchPurchase im Widerrufsformular */
  children?: React.ReactNode
}) {
  return (
    <>
      <Section aria-label={title}>
        <HeadlineH1 align={align}>{title}</HeadlineH1>
        {blocks.map((b) => (
          <ContentBasic
            key={b.headline}
            headline={b.headline}
            paragraphs={[b.text]}
            className="max-w-block-double-max"
          />
        ))}
        {children}
      </Section>
    </>
  )
}
