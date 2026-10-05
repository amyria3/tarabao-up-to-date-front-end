import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DisclosureToggle } from '@/components/ui/disclosure-toggle'

const meta = {
  title: 'Components/UI/DisclosureToggle',
  component: DisclosureToggle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / DisclosureToggle (9734:30031). Smallest labelled button with ArrowUpOrDown 14 · Open?, State=Default|Hover. Carries aria-expanded; used by RecipeStep.',
      },
    },
  },
  args: { open: false },
} satisfies Meta<typeof DisclosureToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}

export const Open: Story = {
  args: { open: true },
}

export const OpenHover: Story = {
  args: { open: true, forceHover: true },
}
