import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Editorial } from '@/components/LexicalRenderers/Editorial'

/** Example texts from the library entry (Figma default texts). */
const LOREM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
const COMPANY =
  'Dieses Unternehmen zeichnet sich durch besonderen Ehrgeiz aus, wenn es um faire Arbeitsbedingungen und nachhaltigen Anbau geht. Unternehmen, die sich sozial besonders engagieren möchten, wählen wir bevorzugt aus.'

const meta = {
  title: 'Components/LexicalRenderers/Editorial',
  component: Editorial,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: ContentModules / CMS / Editorial (3164:4506). Headline (H1, H2 or H3), one or two paragraph columns (LG or MD) and an optional footnote.',
      },
    },
  },
  args: {
    headline: 'Unser Nachhaltigkeitsranking',
    columns: [LOREM, LOREM],
    footnote: '*Hier mehr über unsere Nachhaltigkeitsskala erfahren',
  },
} satisfies Meta<typeof Editorial>

export default meta
type Story = StoryObj<typeof meta>

/** TypeOfHeadline=H1 · TypeOfParagraph=LG · Display Second Column · Display Footnote */
export const Default: Story = {}

export const HeadlineH2: Story = {
  args: { headlineType: 'h2' },
}

export const HeadlineH3: Story = {
  args: { headlineType: 'h3', paragraphSize: 'md', columns: [COMPANY, COMPANY], footnote: undefined },
  parameters: { docs: { description: { story: 'Figma: TypeOfHeadline=H3 · TypeOfParagraph=MD.' } } },
}

export const SingleColumn: Story = {
  args: { columns: [LOREM] },
  parameters: { docs: { description: { story: 'Figma: Display Second Column=False.' } } },
}

export const WithoutHeadline: Story = {
  args: { headline: undefined },
  parameters: { docs: { description: { story: 'Figma: DisplayHeadline?=False.' } } },
}

export const WithoutFootnote: Story = {
  args: { footnote: undefined },
  parameters: { docs: { description: { story: 'Figma: Display Footnote=False.' } } },
}
