import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CardsOrder } from '@/components/ui/cards-order'
import { ProductCard } from '@modules/products/components/product-card'
import { QueryState } from '@modules/search/components/query-state'
import { PRODUCTS } from '@/lib/fixtures'

const meta = {
  title: 'Components/QueryState',
  component: QueryState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Search / QueryState (2216:2060). Message (UserMessage/LG) without a request or without results; with results the card tiles follow. The message sits in a live region so screen readers announce the change.',
      },
    },
  },
  args: { state: 'idle' },
} satisfies Meta<typeof QueryState>

export default meta
type Story = StoryObj<typeof meta>

/** Search-Request or Filter?=False */
export const Default: Story = {}

/** Search-Request or Filter?=True, Results?=False */
export const Empty: Story = {
  args: { state: 'empty' },
}

/** Search-Request or Filter?=True, Results?=True */
export const Results: Story = {
  args: {
    state: 'results',
    resultsText: `${PRODUCTS.length} Treffer`,
    children: (
      <CardsOrder variant="tiles">
        {PRODUCTS.map((product) => (
          <li key={product.id} className="w-full max-w-card-default-max min-w-card-default-min flex-1">
            <ProductCard product={product} />
          </li>
        ))}
      </CardsOrder>
    ),
  },
}
