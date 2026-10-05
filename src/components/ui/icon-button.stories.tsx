import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { IconButton } from '@/components/ui/icon-button'

const meta = {
  title: 'Components/UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / IconButton (2588:2421). Close button with icon and label; hover shows the shape Very oval in card-btn-hover-click · Warenkorb?, Search?, Menu?.',
      },
    },
  },
  args: { label: 'Warenkorb schließen' },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}

export const Search: Story = {
  args: { label: 'Suche schließen' },
}

export const Menu: Story = {
  args: { label: 'Navigation schließen' },
}
