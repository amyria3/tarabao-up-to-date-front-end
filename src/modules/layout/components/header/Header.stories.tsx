import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Header } from '@modules/layout/components/header'
import { SearchAndFilter } from '@modules/search/components/search-and-filter'
import { FILTER_OPTIONS, NAV_GROUPS, PRODUCTS, PROMO } from '@/lib/fixtures'

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          'Figma: Navigation / Header (3175:9316). State=Default|Full|Search. Layout / PromoBar above the NavBar. The burger opens the menu (Navigation / Nav), the magnifier opens Sections / Search & Filter; Escape closes both. In the shop the menu is an overlay below the NavBar.',
      },
    },
  },
  args: { navGroups: NAV_GROUPS, promo: PROMO, cartCount: 1, loggedIn: true },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Full: Story = {
  args: { defaultState: 'menu', overlay: false },
  parameters: {
    docs: {
      description: {
        story:
          'State=Full: open menu. `overlay: false` keeps the menu in the flow so the docs page does not cut it off.',
      },
    },
  },
}

export const Search: Story = {
  args: {
    defaultState: 'search',
    search: <SearchAndFilter filterOptions={FILTER_OPTIONS} products={PRODUCTS} />,
  },
  parameters: { docs: { description: { story: 'State=Search: open Sections / Search & Filter.' } } },
}
