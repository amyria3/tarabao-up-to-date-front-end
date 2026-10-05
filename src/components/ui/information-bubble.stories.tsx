import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { InformationBubble } from '@/components/ui/information-bubble'
import { RECIPE_FACTS } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/InformationBubble',
  component: InformationBubble,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Information Bubble (8817:23243). Non-interactive hint on the shape Very oval in surface-highlighted · Fill?, Show Icon, Property 1=Default|Badge.',
      },
    },
  },
  args: { children: 'Vorteil bei Versandkosten Erklärung' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'badge'] },
  },
} satisfies Meta<typeof InformationBubble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hug: Story = {
  args: { fill: false },
}

export const WithoutIcon: Story = {
  args: { fill: false, showIcon: false, children: 'Erklärung Kündigung' },
}

export const Badge: Story = {
  args: { variant: 'badge', children: RECIPE_FACTS[0] },
  parameters: {
    docs: {
      description: {
        story: 'Figma: Property 1=Badge (9321:70265). Hug without icon for recipe facts and step numbers.',
      },
    },
  },
}
