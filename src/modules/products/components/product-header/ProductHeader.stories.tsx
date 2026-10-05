import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ProductHeader } from '@modules/products/components/product-header'
import { PRODUCT_DETAIL } from '@/lib/fixtures'

const meta = {
  title: 'Components/ProductHeader',
  component: ProductHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Sections / ProductHeader (4221:28723). Templates / Section with one wrapping row: Visuals / Product / Image (gallery) and Components / Product / BuyBox.',
      },
    },
  },
  args: { product: PRODUCT_DETAIL },
} satisfies Meta<typeof ProductHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
