import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryPreview } from '@modules/categories/components/category-preview'
import { CategoryCardSm } from '@modules/categories/components/category-card'
import { ProductCard } from '@modules/products/components/product-card'
import { CATEGORIES_SAMPLE, PRODUCTS } from '@/lib/fixtures'
import { routes } from '@/lib/shop/routes'

const r = routes()

const productCards = (count: number) =>
  PRODUCTS.slice(0, count).map((p) => (
    <li key={p.id} className="w-full min-w-card-min max-w-card-max flex-1">
      <ProductCard product={p} size="compact" />
    </li>
  ))

const meta = {
  title: 'Components/CategoryPreview',
  component: CategoryPreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Sections / CategoryPreview (9779:32594). State=Default|Hover, More products?. H2 with the inline button „Alle anzeigen“ and the Cards slot (Templates / Cards Order · CardsTiles). In State=Default the button keeps its place invisibly; hovering the preview shows it.',
      },
    },
  },
  args: {
    title: 'Würzige Snacks',
    href: r.category('wuerzige-snacks'),
    children: (
      <>
        {productCards(3)}
        <li className="w-full min-w-card-min max-w-card-max flex-1">
          <CategoryCardSm category={CATEGORIES_SAMPLE[0]!} />
        </li>
      </>
    ),
  },
} satisfies Meta<typeof CategoryPreview>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: {
    title: 'Naturbelassen',
    href: r.category('naturbelassen'),
    forceHover: true,
    children: productCards(3),
  },
  parameters: { docs: { description: { story: 'State=Hover: „Alle anzeigen“ is visible.' } } },
}

export const NoMoreProducts: Story = {
  args: {
    title: 'Nussmixer',
    href: r.nutmixer,
    moreProducts: false,
    children: productCards(2),
  },
  parameters: {
    docs: {
      description: { story: 'More products?=False: the category has no more products, so the button is left out.' },
    },
  },
}
