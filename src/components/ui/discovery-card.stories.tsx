import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DiscoveryCard } from '@/components/ui/discovery-card'
import { DISCOVERY } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/DiscoveryCard',
  component: DiscoveryCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Cards / DiscoveryCard (6708:16673). Image, title and subtitle. From lg, hover and focus widen the card to card-discovery-hover-max and show teaser.facts (questions and answers).',
      },
    },
  },
  args: { teaser: DISCOVERY },
} satisfies Meta<typeof DiscoveryCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}
