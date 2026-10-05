import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SearchPurchase } from '@modules/legal/components/withdrawal-form/search-purchase'

const meta = {
  title: 'Components/SearchPurchase',
  component: SearchPurchase,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / SearchPurchase (6955:21898). Order number (with #) and e-mail fields, primary button „Bestellung aufrufen“.',
      },
    },
  },
} satisfies Meta<typeof SearchPurchase>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
