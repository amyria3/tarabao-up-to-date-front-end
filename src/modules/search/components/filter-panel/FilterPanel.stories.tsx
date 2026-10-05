import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FilterPanel } from '@modules/search/components/filter-panel'
import { FILTER_OPTIONS } from '@/lib/fixtures'

const meta = {
  title: 'Components/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Filter / FilterPanel (2211:2165). FilterChips (wrapping) and Filter / PriceRange below. Without an active filter the chips are centred, with a filter they move to the left (Filtering?=True). The folded variant (Unfolded?=False) is not implemented.',
      },
    },
  },
  args: { options: FILTER_OPTIONS },
} satisfies Meta<typeof FilterPanel>

export default meta
type Story = StoryObj<typeof meta>

/** Filtering?=False */
export const Default: Story = {}

/** Filtering?=True: two chips and a price range selected (fixed value, the story does not update it). */
export const Filtering: Story = {
  args: {
    value: { selected: [FILTER_OPTIONS[1]!.id, FILTER_OPTIONS[6]!.id], price: { min: 5, max: 15 } },
  },
}
