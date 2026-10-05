import { ContactForm } from '@/components/LexicalRenderers/ContactForm'
import { Editorial } from '@/components/LexicalRenderers/Editorial'
import { DefaultParagraph, HeadlineH1 } from '@/components/ui/typography'
import { Section } from '@/components/ui/section'

/**
 * Figma: Unternehmensseiten (B2B, Tarabao für Dein Team, Über uns, Unser Team, Unser Ansatz, Partnerschaften,
 * Nachhaltigkeit, Verpackungen, Karriere): Templates / Page mit ContentModules (Editorial, MediaText,
 * CustomContentWithText, CTA, ContactForm) in Sections / CMS(CustomSection).
 */
export function CompanyPage({
  title,
  intro,
  sections,
  contact = false,
}: {
  title: string
  intro: string
  sections: { headline: string; text: string }[]
  contact?: boolean
}) {
  return (
    <>
      <Section aria-label={title}>
        <HeadlineH1>{title}</HeadlineH1>
        <DefaultParagraph size="lg">{intro}</DefaultParagraph>
        {sections.map((s) => (
          <Editorial key={s.headline} headline={s.headline} headlineType="h2" columns={[s.text]} />
        ))}
        {contact ? <ContactForm /> : null}
      </Section>
    </>
  )
}
