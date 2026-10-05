import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ProductImage } from '@modules/products/components/product-image'

const meta = {
  title: 'Components/ProductImage',
  component: ProductImage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Visuals / Product / Image · Primitives / ProductImg (205:579). Image surface with object-fit cover; without an image (or with an empty src) it shows surface-placeholder as in Figma. It fills its container.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="aspect-square w-full max-w-card-max">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductImage>

export default meta
type Story = StoryObj<typeof meta>

/** Without image: placeholder surface */
export const Default: Story = {}
