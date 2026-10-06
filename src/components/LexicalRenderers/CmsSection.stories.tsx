import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  CmsSection,
  SustainabilitySection as SustainabilitySectionComponent,
} from '@/components/LexicalRenderers/CmsSection'
import { ContactForm } from '@/components/LexicalRenderers/ContactForm'
import { ContentBasic } from '@/components/LexicalRenderers/ContentBasic'
import { ContentCta } from '@/components/LexicalRenderers/ContentCta'
import { Editorial } from '@/components/LexicalRenderers/Editorial'
import { MediaText } from '@/components/LexicalRenderers/MediaText'
import { BulletedList } from '@/components/ui/typography'
import { NutritionTable } from '@modules/products/components/product-info'
import { ProductImage } from '@modules/products/components/product-image'
import { PRODUCT_DETAIL, SUSTAINABILITY_CONTENT } from '@/lib/fixtures'

/** Example text from the library entry (Figma default text). */
const LOREM =
  'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'

const meta = {
  title: 'Components/LexicalRenderers/CmsSection',
  component: CmsSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Sections / CMS(CustomSection) (7988:23735). Section template with 12 slots: any content modules in any order and number, directly in the section wrapper.',
      },
    },
  },
  argTypes: { children: { control: false } },
  args: {
    label: 'CMS-Inhalt',
    children: (
      <>
        <MediaText
          title="Überschrift"
          text="Dieser Absatz charakterisiert den Snack, erzählt etwas über die Herkunft."
        />
        <ContentBasic headline="Überschrift" paragraphs={[LOREM]} />
        <NutritionTable nutrition={PRODUCT_DETAIL.nutrition!} />
        <ContentCta
          title="We PROMISE - unsere PISTAZIENCRéME direkt aus der MANUFAKTUR"
          benefits={PRODUCT_DETAIL.highlights}
          rating={{ value: 5, label: 'Gekauft von 30493 Menschen' }}
          actionLabel="Call To Action"
          href="/de-de/store"
        />
        <ContactForm />
        <Editorial headline="Unser Nachhaltigkeitsranking" headlineType="h2" columns={[LOREM, LOREM]} />
      </>
    ),
  },
} satisfies Meta<typeof CmsSection>

export default meta
type Story = StoryObj<typeof meta>

/** Figma: Sections / CMS(CustomSection) · Default (8945:32900) */
export const Default: Story = {}

export const SustainabilitySection: Story = {
  render: () => (
    <SustainabilitySectionComponent
      intro={SUSTAINABILITY_CONTENT.intro}
      supplier={{
        left: (
          <ContentBasic
            headline={SUSTAINABILITY_CONTENT.supplier.headline}
            headingLevel="h2"
            align="center"
            paragraphs={[SUSTAINABILITY_CONTENT.supplier.text]}
          />
        ),
        right: (
          <div className="flex w-full flex-col gap-md-l">
            <BulletedList items={SUSTAINABILITY_CONTENT.supplier.facts} />
            <div className="h-48 w-full">
              <ProductImage image={{ src: '', alt: 'Medien des Lieferanten' }} />
            </div>
          </div>
        ),
      }}
      tabs={SUSTAINABILITY_CONTENT.tabs}
      highlights={SUSTAINABILITY_CONTENT.highlights}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Sections / Sustainability (8130:21717). Slot 1 Editorial (intro), slot 2 CustomContentWithText (supplier and media), slot 3 SustainabilityTabs.',
      },
    },
  },
}
