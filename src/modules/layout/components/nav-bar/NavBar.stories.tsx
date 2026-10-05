import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { NavBar } from '@modules/layout/components/nav-bar'

const meta = {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Navigation / NavBar (3175:6184). viewport-range=base|md|lg. Logo on the left, Icons / Tools on the right: search, burger (open: cross), account (logged in or out) and cart (Icons / CartLive with the total quantity: empty, 1 to 9, „9+“).',
      },
    },
  },
} satisfies Meta<typeof NavBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { cartCount: 1, loggedIn: true },
}

export const MenuOpen: Story = {
  args: { menuOpen: true },
  parameters: { docs: { description: { story: 'Menu open (cross instead of burger), empty cart, logged out.' } } },
}

export const SearchOpen: Story = {
  args: { searchOpen: true, cartCount: 2 },
  parameters: { docs: { description: { story: 'Search open (cross instead of magnifier), two items in the cart.' } } },
}

export const CartOverNine: Story = {
  args: { cartCount: 12 },
  parameters: { docs: { description: { story: 'Twelve items show „9+“; logged out.' } } },
}
