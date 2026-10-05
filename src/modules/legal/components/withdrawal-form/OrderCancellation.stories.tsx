import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { OrderCancellation } from '@modules/legal/components/withdrawal-form'
import { CANCELLABLE_ORDERS, RETURNABLE_ITEMS } from '@/lib/fixtures'

const meta = {
  title: 'Components/OrderCancellation',
  component: OrderCancellation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / OrderCancellation (6811:20710). Withdrawal in steps; the buttons move through the steps (example without server).',
      },
    },
  },
  args: { orders: CANCELLABLE_ORDERS, items: RETURNABLE_ITEMS },
} satisfies Meta<typeof OrderCancellation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Figma: State=Default. Intro with BlockElement · Widerruf.' } } },
}

export const OrderNumber: Story = {
  args: { defaultStep: 'order-number' },
  parameters: {
    docs: { description: { story: 'Figma: Bestellnummer?=True. SearchPurchase or log in.' } },
  },
}

export const LogIn: Story = {
  args: { defaultStep: 'login' },
  parameters: { docs: { description: { story: 'Figma: State=LogIn. Cart / LogIn.' } } },
}

export const SelectOrder: Story = {
  args: { defaultStep: 'select-order' },
  parameters: { docs: { description: { story: 'Figma: State=SelectOrder. Cancellation / SelectOrder.' } } },
}

export const SelectItems: Story = {
  args: { defaultStep: 'select-items' },
  parameters: {
    docs: { description: { story: 'Figma: State=SelectItems. Order number and Cancellation / SelectProducts.' } },
  },
}

export const Complete: Story = {
  args: { defaultStep: 'complete' },
  parameters: {
    docs: { description: { story: 'Figma: State=Complete. Confirmation with return address.' } },
  },
}
