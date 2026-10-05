import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Counter } from '@/components/ui/counter'

const meta = {
  title: 'Components/UI/Counter',
  component: Counter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / Counter (2442:2491). Quantity counter with hand-drawn frame and the fields −, value, + · Minus-Hover?, Plus-Hover?.',
      },
    },
  },
  args: { defaultValue: 1 },
  argTypes: {
    forceHover: { control: 'inline-radio', options: [undefined, 'minus', 'plus'] },
  },
} satisfies Meta<typeof Counter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MinusHover: Story = {
  args: { defaultValue: 2, forceHover: 'minus' },
}

export const PlusHover: Story = {
  args: { defaultValue: 2, forceHover: 'plus' },
}
