import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FilterChip } from '@modules/search/components/filter-chip'
import { FILTER_OPTIONS } from '@/lib/fixtures'

const meta = {
  title: 'Components/FilterChip',
  component: FilterChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Figma: Components / Filter / FilterChip (2165:2011). Toggle with aria-pressed; selected it shows a cross (Icons / close 6). Clrs / Filter Panel has only one mode.',
      },
    },
  },
  args: { label: FILTER_OPTIONS[1]!.label, selected: false, forceHover: false },
} satisfies Meta<typeof FilterChip>

export default meta
type Story = StoryObj<typeof meta>

/** State=Default */
export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}

/** State=Selected */
export const Selected: Story = {
  args: { label: FILTER_OPTIONS[6]!.label, selected: true },
}

export const SelectedHover: Story = {
  args: { label: FILTER_OPTIONS[6]!.label, selected: true, forceHover: true },
}
