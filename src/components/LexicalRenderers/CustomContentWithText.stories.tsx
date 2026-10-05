import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ContactForm } from '@/components/LexicalRenderers/ContactForm'
import { ContentBasic } from '@/components/LexicalRenderers/ContentBasic'
import { ContentCta } from '@/components/LexicalRenderers/ContentCta'
import { CustomContentWithText } from '@/components/LexicalRenderers/CustomContentWithText'
import { BulletedList, DefaultParagraph } from '@/components/ui/typography'
import { Ingredients } from '@modules/products/components/product-info'
import { PRODUCT_DETAIL } from '@/lib/fixtures'

/** Example texts from the library entry (Figma default texts). */
const HEADLINE = 'Ein wichtiger Text - interessant für unsere Kundinnen und Kunden'
const LOREM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
const COMPANY =
  'Dieses Unternehmen zeichnet sich durch besonderen Ehrgeiz aus, wenn es um faire Arbeitsbedingungen und nachhaltigen Anbau geht. Unternehmen, die sich sozial besonders engagieren möchten, wählen wir bevorzugt aus.'

const BASIC = <ContentBasic headline={HEADLINE} headingLevel="h3" paragraphs={[LOREM]} />

const meta = {
  title: 'Components/LexicalRenderers/CustomContentWithText',
  component: CustomContentWithText,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: ContentModules / CMS / CustomContentWithText (7988:22954). Wrapping row with two columns (slots LeftColumn and RightColumn), one element each.',
      },
    },
  },
  argTypes: { left: { control: false }, right: { control: false } },
  args: {
    left: BASIC,
    right: <Ingredients ingredients={PRODUCT_DETAIL.ingredients!} />,
  },
} satisfies Meta<typeof CustomContentWithText>

export default meta
type Story = StoryObj<typeof meta>

/** LeftColumnSlotVariant=Basic · RightColumnSlotVariant=Ingredients */
export const Default: Story = {}

export const BasicWithBulletList: Story = {
  args: {
    right: (
      <BulletedList
        items={[
          'Dieses Unternehmen hat ... Mitarbeiter:innen',
          'Keine künstlichen Zusatzstoffe oder Aromen',
          'Publikumsliebling',
          'Verpackung: vollständig recyclebar oder Pfand',
          'Schokolade aus Kooperative Anamnese',
          'Vegan & Bio',
        ]}
      />
    ),
  },
  parameters: {
    docs: { description: { story: 'Figma: LeftColumnSlotVariant=Basic · RightColumnSlotVariant=BulletList.' } },
  },
}

export const BasicWithCta: Story = {
  args: {
    right: (
      <ContentCta
        title="Wir haben noch mehr krasse Produkte"
        text={COMPANY}
        actionLabel="Call To Action"
        href="/de-de/store"
      />
    ),
  },
  parameters: {
    docs: { description: { story: 'Figma: LeftColumnSlotVariant=Basic · RightColumnSlotVariant=CTA.' } },
  },
}

export const ContactFormWithParagraph: Story = {
  args: {
    left: <ContactForm />,
    right: (
      <DefaultParagraph size="lg">
        Dieser Absatz charakterisiert den Snack, erzählt etwas über die Herkunft.
      </DefaultParagraph>
    ),
  },
  parameters: {
    docs: {
      description: { story: 'Figma: LeftColumnSlotVariant=ContactForm · RightColumnSlotVariant=DefaultParagraph.' },
    },
  },
}
