import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ProductGallery } from '@modules/products/components/product-gallery'
import { PRODUCT_DETAIL } from '@/lib/fixtures'

const meta = {
  title: 'Components/ProductGallery',
  component: ProductGallery,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Visuals / Product / Image · Variant=Default (2531:2860). Main image with Buttons / CarouselNav · SM (previous, next) and thumbnails below; part of Sections / ProductHeader. Images are placeholder surfaces (surface-placeholder) until Medusa delivers real images.',
      },
    },
  },
  args: { images: PRODUCT_DETAIL.images, title: PRODUCT_DETAIL.title },
} satisfies Meta<typeof ProductGallery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** With a single image the gallery hides the carousel navigation and the thumbnails. */
export const SingleImage: Story = {
  args: { images: PRODUCT_DETAIL.images.slice(0, 1) },
}
