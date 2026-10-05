import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Checkbox } from '@/components/ui/checkbox'

const meta = {
  title: 'Components/UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / CheckBox (3517:8647). shadcn/ui Checkbox (Radix) · On?=False|True. Figma pins cole-tint-surface-snow; theme={null} inherits the color mode.',
      },
    },
  },
  args: { 'aria-label': 'Nicht gewählt' },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true, 'aria-label': 'Gewählt' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const InheritedTheme: Story = {
  args: { theme: null },
  parameters: {
    docs: { description: { story: 'theme={null}: no mode pin, the checkbox follows the color mode of the toolbar.' } },
  },
}
