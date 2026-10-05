import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ContactForm } from '@/components/LexicalRenderers/ContactForm'
import { ContentBasic } from '@/components/LexicalRenderers/ContentBasic'
import { ContentCta } from '@/components/LexicalRenderers/ContentCta'
import { CustomContentWithImg } from '@/components/LexicalRenderers/CustomContentWithImg'

/** Example texts from the library entry (Figma default texts). */
const HEADLINE = 'Ein wichtiger Text - interessant für unsere Kundinnen und Kunden'
const LOREM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
const COMPANY =
  'Dieses Unternehmen zeichnet sich durch besonderen Ehrgeiz aus, wenn es um faire Arbeitsbedingungen und nachhaltigen Anbau geht. Unternehmen, die sich sozial besonders engagieren möchten, wählen wir bevorzugt aus.'

const meta = {
  title: 'Components/LexicalRenderers/CustomContentWithImg',
  component: CustomContentWithImg,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: ContentModules / CMS / CustomContentWithImg (7660:20273). Wrapping row with one content module (slot LeftColumn) and the image area (placeholder).',
      },
    },
  },
  argTypes: { children: { control: false } },
  args: {
    children: <ContentBasic headline={HEADLINE} headlineType="h1" headingLevel="h3" paragraphs={[LOREM]} />,
  },
} satisfies Meta<typeof CustomContentWithImg>

export default meta
type Story = StoryObj<typeof meta>

/** LeftColumnSlotVariant=Basic · H1 / Default */
export const Default: Story = {}

export const WithCta: Story = {
  args: {
    children: (
      <ContentCta
        title="Wir haben noch mehr krasse Produkte"
        text={COMPANY}
        actionLabel="Call To Action"
        href="/de-de/store"
      />
    ),
  },
  parameters: { docs: { description: { story: 'Figma: LeftColumnSlotVariant=CTA.' } } },
}

export const WithCtaAndProductBenefits: Story = {
  args: {
    children: (
      <ContentCta
        title="We PROMISE - unsere PISTAZIENCRéME direkt aus der MANUFAKTUR"
        benefits={[
          'Benefit',
          'Keine künstlichen Zusatzstoffe oder Aromen',
          'Benefit',
          'Schokolade aus Kooperative Anamnese',
          'Vegan & Bio',
        ]}
        rating={{ value: 5, label: 'Gekauft von 30493 Menschen' }}
        actionLabel="Call To Action"
        href="/de-de/store"
      />
    ),
  },
  parameters: { docs: { description: { story: 'Figma: LeftColumnSlotVariant=CTA & ProductBenefits.' } } },
}

export const WithContactForm: Story = {
  args: { children: <ContactForm /> },
  parameters: { docs: { description: { story: 'Figma: LeftColumnSlotVariant=ContactForm.' } } },
}

export const ImageFirst: Story = {
  args: { imageFirst: true },
  parameters: { docs: { description: { story: 'Image on the left, for alternating CMS sections.' } } },
}
