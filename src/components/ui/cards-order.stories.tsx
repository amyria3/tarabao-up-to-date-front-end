import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BlogCard } from '@/components/ui/blog-card'
import { CardsOrder } from '@/components/ui/cards-order'
import { ProductCard } from '@modules/products/components/product-card'
import { BLOG_POST, PRODUCTS } from '@/lib/fixtures'

const TILES = PRODUCTS.map((product) => (
  <li key={product.id} className="w-full max-w-card-default-max min-w-card-default-min flex-1">
    <ProductCard product={product} />
  </li>
))

const ROW = [1, 2, 3, 4, 5].map((n) => (
  <li key={n} className="w-96">
    <BlogCard post={{ ...BLOG_POST, id: `b${n}` }} variant="blog" />
  </li>
))

const meta = {
  title: 'Components/UI/CardsOrder',
  component: CardsOrder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Templates / Cards Order (8308:37439). List of cards, each in an <li>. Variant=CardsTiles wraps and centers the cards, Variant=CardsRow keeps them in one row that scrolls horizontally.',
      },
    },
  },
  args: { variant: 'tiles', children: TILES },
} satisfies Meta<typeof CardsOrder>

export default meta
type Story = StoryObj<typeof meta>

export const Tiles: Story = {}

export const Row: Story = {
  args: { variant: 'row', children: ROW },
}
