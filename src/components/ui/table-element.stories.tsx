import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { TableElement } from '@/components/ui/table-element'
import { PRODUCT_DETAIL } from '@/lib/fixtures'

const NUTRITION = PRODUCT_DETAIL.nutrition!

const meta = {
  title: 'Components/UI/TableElement',
  component: TableElement,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Primitives / TableElement (2040:1345). Table with a header row (Table/<th>) and content rows (Table/Cell); the first cell of each row is the row header. Without lines by default; lines draws them in content-text as in ContentModules / NutritionTable. Scrolls horizontally on narrow viewports.',
      },
    },
  },
  args: { caption: 'Nährwerte', head: NUTRITION.head, rows: NUTRITION.rows },
} satisfies Meta<typeof TableElement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLines: Story = {
  args: { lines: true },
}
