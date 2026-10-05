import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DiscoveryCardRow } from '@/components/ui/discovery-card-row'
import { DISCOVERY_ROW } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/DiscoveryCardRow',
  component: DiscoveryCardRow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Sections / CardRow · Type Of Card=Discovery (6708:16614). Row of Cards / DiscoveryCard. From lg a hovered or focused card grows and its neighbours move aside: the first card pushes them right, the last one left, a middle card to both sides. Below lg the cards wrap and do not grow.',
      },
    },
  },
  args: { teasers: DISCOVERY_ROW },
} satisfies Meta<typeof DiscoveryCardRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HoverFirst: Story = {
  args: { forceHoverIndex: 0 },
}

export const HoverMiddle: Story = {
  args: { forceHoverIndex: 1 },
}

export const HoverLast: Story = {
  args: { forceHoverIndex: 2 },
}
