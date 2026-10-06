import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ButtonCardRound } from '@/components/ui/button-card-round'

const meta = {
  title: 'Components/UI/ButtonCardRound',
  component: ButtonCardRound,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / LG / Button-Card-Round (10250:54012). Round quick button on product cards below md (viewport-range=base): plus icon on the shape Very oval in card-btn-hover-click, hover btn-icon-bg-hover. No visible label, so aria-label is required.',
      },
    },
  },
  args: { 'aria-label': 'In den Warenkorb: Curry-Cashews' },
} satisfies Meta<typeof ButtonCardRound>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}
