import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PriceChip as PriceChipComponent, PriceRange } from '@modules/search/components/price-range'

const meta = {
  title: 'Components/PriceRange',
  component: PriceRange,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Figma: Components / Filter / PriceRange (2605:2931). Built from Drop Down Button (2829:2901), PriceFilterInput (2849:1395) and PriceRange / Chip(s). Minimum and maximum take the value on blur or Enter; open, each limit shows a chip that removes it.',
      },
    },
  },
} satisfies Meta<typeof PriceRange>

export default meta
type Story = StoryObj<typeof meta>

/** Open?=False, Filter is On?=False */
export const Default: Story = {}

/** Open?=True, Filter is On?=False */
export const Open: Story = {
  args: { defaultOpen: true },
}

/** Open?=False, Filter is On?=True (fixed value, the story does not update it) */
export const FilterOn: Story = {
  args: { value: { min: 5, max: 15 } },
}

/** Open?=True, Filter is On?=True: input with the chips "ab … Euro" and "bis … Euro" */
export const OpenFilterOn: Story = {
  args: { defaultOpen: true, value: { min: 5, max: 15 } },
}

export const PriceChip: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Components / Filter / PriceRange / Chip (6093:25636) · Min? and Max?. A click removes the limit.',
      },
    },
  },
  render: () => (
    <div className="flex gap-xxs">
      <PriceChipComponent label="ab 5 Euro" />
      <PriceChipComponent label="bis 15 Euro" />
    </div>
  ),
}
