import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { OptionSelectionButton } from '@/components/ui/option-selection-button'

const meta = {
  title: 'Components/UI/OptionSelectionButton',
  component: OptionSelectionButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / XS / OptionSelectionButton (272:2159). Packaging size button with the shape Very oval and Icons / PaperBag · State=Default|Hover|Selected. Grouped by Switches / OptionSelection.',
      },
    },
  },
  args: { children: '130 g' },
} satisfies Meta<typeof OptionSelectionButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}

export const Selected: Story = {
  args: { selected: true },
}

export const WithoutIcon: Story = {
  args: { showIcon: false, children: '1 kg' },
}
