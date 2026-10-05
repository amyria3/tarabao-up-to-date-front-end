import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SearchAndFilter } from '@modules/search/components/search-and-filter'
import { FILTER_OPTIONS, PRODUCTS } from '@/lib/fixtures'

const meta = {
  title: 'Components/SearchAndFilter',
  component: SearchAndFilter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Sections / Search & Filter (8945:29843). Search / Input and Filter / FilterPanel on top, Search / QueryState with the results as card tiles below (colour mode purple-tint-surface-snow). The stories search the product titles of the fixtures (e.g. "Name"); in the shop `search` returns the results from Medusa.',
      },
    },
  },
  args: { filterOptions: FILTER_OPTIONS, products: PRODUCTS },
} satisfies Meta<typeof SearchAndFilter>

export default meta
type Story = StoryObj<typeof meta>

/** State=Default: no request yet */
export const Default: Story = {}

/** State=Results */
export const Results: Story = {
  args: { defaultQuery: 'Name' },
}

/** Request without results */
export const NoResults: Story = {
  args: { defaultQuery: 'ungeschälte irgendwas' },
}
