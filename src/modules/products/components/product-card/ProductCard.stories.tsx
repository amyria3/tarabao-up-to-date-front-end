import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  ProductCard,
  ProductCardWithReviews as ProductCardWithReviewsComponent,
} from '@modules/products/components/product-card'
import { COMPACT_PRODUCT, PRODUCTS } from '@/lib/fixtures'

const meta = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Cards / ProductCard / DefaultSize (2356:2667). CompactSize (8555:27280) via `size="compact"`. Product data fills the card; Hover?=True shows Buttons / SM / Button-Card, which puts the product into the cart once. Product=Placeholder is a card without product and without interaction. Images are placeholder surfaces (surface-placeholder).',
      },
    },
  },
  args: { product: PRODUCTS[0]!, size: 'default', forceHover: false },
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

/** DefaultSize · Variant=1 */
export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}

/** DefaultSize · Variant=3: title that cannot be shortened */
export const LongTitle: Story = {
  args: { product: PRODUCTS[2]! },
}

/** DefaultSize · Product=Placeholder */
export const Placeholder: Story = {
  args: { placeholder: true },
}

/** CompactSize · Context=Shop */
export const Compact: Story = {
  args: { size: 'compact', product: COMPACT_PRODUCT },
}

export const CompactHover: Story = {
  args: { size: 'compact', product: COMPACT_PRODUCT, forceHover: true },
}

/** CompactSize · Context=Nutmixer · Hover */
export const CompactNutmixer: Story = {
  args: { size: 'compact', product: COMPACT_PRODUCT, context: 'nutmixer', forceHover: true },
}

/** CompactSize · Product=Placeholder */
export const CompactPlaceholder: Story = {
  args: { size: 'compact', product: COMPACT_PRODUCT, placeholder: true },
}

export const ProductCardWithReviews: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Figma: Cards / ProductCardWithReviews (8308:32238). ReviewStars (centred) above the ProductCard.',
      },
    },
  },
  render: () => <ProductCardWithReviewsComponent product={PRODUCTS[0]!} />,
}
