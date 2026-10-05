import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ArrowUpOrDown } from '@/components/ui/arrow-up-or-down'

const meta = {
  title: 'Components/UI/ArrowUpOrDown',
  component: ArrowUpOrDown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: ArrowUpOrDown (283:640). Arrow in content-text for disclosures and dropdowns · Variant=up|down, Size=6|14|22|30.',
      },
    },
  },
  args: { variant: 'up', size: 22 },
  argTypes: {
    variant: { control: 'inline-radio', options: ['up', 'down'] },
    size: { control: 'inline-radio', options: [30, 22, 14, 6] },
  },
} satisfies Meta<typeof ArrowUpOrDown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Down: Story = {
  args: { variant: 'down' },
}

export const Size30: Story = {
  args: { size: 30 },
}

export const Size14: Story = {
  args: { size: 14 },
}

export const Size6: Story = {
  args: { size: 6 },
}
