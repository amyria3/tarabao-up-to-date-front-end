import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SwitchToggleGroup } from '@/components/ui/switch-toggle-group'
import { PRODUCT_TABS } from '@/lib/design-system/tabs'

const meta = {
  title: 'Components/UI/SwitchToggleGroup',
  component: SwitchToggleGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Switches / ToggleGroup (3690:15429). Single selection of fill SegmentControlButtons (Radix ToggleGroup, role=radio) · Selected Option?=1|2. Figma pins purple-tint-surface-warm; theme={null} inherits the color mode.',
      },
    },
  },
  args: { options: PRODUCT_TABS.slice(0, 2), 'aria-label': 'Produktinformationen' },
} satisfies Meta<typeof SwitchToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SecondOptionSelected: Story = {
  args: { defaultValue: 'origin' },
}

export const InheritedTheme: Story = {
  args: { theme: null },
  parameters: {
    docs: { description: { story: 'theme={null}: no mode pin, the group follows the color mode of the toolbar.' } },
  },
}
