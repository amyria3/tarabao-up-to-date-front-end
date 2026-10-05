import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AddToBasketMobile } from '@modules/products/components/add-to-basket-mobile'

const meta = {
  title: 'Components/AddToBasketMobile',
  component: AddToBasketMobile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Figma: Components / AddToBasket / Mobile (3986:23589). Mobile cart button with Icons / CartLive for zero, one or more items; "+ 1" shows with an empty cart and on hover. `justAdded` maps Add to cart?=True.',
      },
    },
  },
  args: { count: 0, justAdded: false, forceHover: false },
} satisfies Meta<typeof AddToBasketMobile>

export default meta
type Story = StoryObj<typeof meta>

/** Zero Items? */
export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}

export const OneItem: Story = {
  args: { count: 1 },
}

export const OneItemHover: Story = {
  args: { count: 1, forceHover: true },
}

export const OneItemJustAdded: Story = {
  args: { count: 1, justAdded: true },
}

export const TwoItems: Story = {
  args: { count: 2 },
}

export const TwoItemsJustAdded: Story = {
  args: { count: 2, justAdded: true },
}
