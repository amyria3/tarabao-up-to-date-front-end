import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ContentCta } from '@/components/LexicalRenderers/ContentCta'

/** Example text from the library entry (Figma default text). */
const COMPANY =
  'Dieses Unternehmen zeichnet sich durch besonderen Ehrgeiz aus, wenn es um faire Arbeitsbedingungen und nachhaltigen Anbau geht. Unternehmen, die sich sozial besonders engagieren möchten, wählen wir bevorzugt aus.'

const meta = {
  title: 'Components/LexicalRenderers/ContentCta',
  component: ContentCta,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: ContentModules / CTA (7598:20727). H2, paragraph or bulleted list of benefits, primary button and, with benefits, the review stars.',
      },
    },
  },
  args: {
    title: 'Wir haben noch mehr krasse Produkte',
    text: COMPANY,
    actionLabel: 'Call To Action',
    href: '/de-de/store',
  },
} satisfies Meta<typeof ContentCta>

export default meta
type Story = StoryObj<typeof meta>

/** Product Benefits?=False */
export const Default: Story = {}

export const ProductBenefits: Story = {
  args: {
    title: 'We PROMISE - unsere PISTAZIENCRéME direkt aus der MANUFAKTUR',
    text: undefined,
    benefits: [
      'Benefit',
      'Keine künstlichen Zusatzstoffe oder Aromen',
      'Benefit',
      'Schokolade aus Kooperative Anamnese',
      'Vegan & Bio',
    ],
    rating: { value: 5, label: 'Gekauft von 30493 Menschen' },
  },
  parameters: { docs: { description: { story: 'Figma: Product Benefits?=True.' } } },
}
