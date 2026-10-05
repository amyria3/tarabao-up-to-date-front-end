import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { OptionSelection, PACKAGING_OPTIONS } from '@/components/ui/option-selection'

const meta = {
  title: 'Components/UI/OptionSelection',
  component: OptionSelection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Switches / OptionSelection (8087:20747). Row of OptionSelectionButtons with exactly one selected (Radix ToggleGroup) · Selected=Pack|Multipack|Bulk.',
      },
    },
  },
  args: { options: PACKAGING_OPTIONS },
} satisfies Meta<typeof OptionSelection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Multipack: Story = {
  args: { defaultValue: 'multipack' },
}

export const Bulk: Story = {
  args: { defaultValue: 'bulk' },
}
