import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PlusMinus } from '@/components/ui/plus-minus'

const meta = {
  title: 'Components/UI/PlusMinus',
  component: PlusMinus,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / PlusMinus (2228:2503). Plus or minus sign in content-text · Variant=Plus|Min, State=Default|Active|Inactive.',
      },
    },
  },
  args: { variant: 'plus', state: 'default' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['plus', 'min'] },
    state: { control: 'inline-radio', options: ['default', 'active', 'inactive'] },
  },
} satisfies Meta<typeof PlusMinus>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Active: Story = {
  args: { state: 'active' },
}

export const Inactive: Story = {
  args: { state: 'inactive' },
}

export const Minus: Story = {
  args: { variant: 'min' },
}

export const MinusActive: Story = {
  args: { variant: 'min', state: 'active' },
}

export const MinusInactive: Story = {
  args: { variant: 'min', state: 'inactive' },
}
