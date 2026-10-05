import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BasicWithDisclosure } from '@/components/LexicalRenderers/BasicWithDisclosure'

/** Example texts from the library entry (Figma default texts). */
const HEADLINE = 'Ein wichtiger Text - interessant für unsere Kundinnen und Kunden'
const COMPANY =
  'Dieses Unternehmen zeichnet sich durch besonderen Ehrgeiz aus, wenn es um faire Arbeitsbedingungen und nachhaltigen Anbau geht. Unternehmen, die sich sozial besonders engagieren möchten, wählen wir bevorzugt aus.'

const meta = {
  title: 'Components/LexicalRenderers/BasicWithDisclosure',
  component: BasicWithDisclosure,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: ContentModules / BasicWithDisclosure (8141:22208). H3 with disclosure arrow; closed, the paragraph is clamped to three lines, open, it shows the full text and the certification signets.',
      },
    },
  },
  args: { title: HEADLINE, text: COMPANY, signets: 4 },
} satisfies Meta<typeof BasicWithDisclosure>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = {
  args: { defaultOpen: true },
}

export const OpenWithoutSignets: Story = {
  args: { defaultOpen: true, signets: undefined },
  parameters: { docs: { description: { story: 'Figma: Show Slot Signets=False.' } } },
}
