import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  Ingredients as IngredientsComponent,
  NutritionTable,
  SupplierInfo as SupplierInfoComponent,
} from '@modules/products/components/product-info'
import { PRODUCT_DETAIL } from '@/lib/fixtures'

const meta = {
  title: 'Components/NutritionTable',
  component: NutritionTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: ContentModules / NutritionTable (8493:148). Primitives / TableElement with the header "Durchschnittliche Nährwerte · Pro 100 Gramm" and lines in content-text.',
      },
    },
  },
  args: { nutrition: PRODUCT_DETAIL.nutrition! },
} satisfies Meta<typeof NutritionTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Ingredients: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma: ContentModules / Ingredients (8493:209). Primitives / DefaultParagraph LG and Primitives / Paragraphs / Footnote.',
      },
    },
  },
  render: () => <IngredientsComponent ingredients={PRODUCT_DETAIL.ingredients!} />,
}

export const SupplierInfo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Components / Disclosure · Type=Lieferkette und Lieferanten (283:633). Per partner: name, note and a table of question and answer.',
      },
    },
  },
  render: () => <SupplierInfoComponent suppliers={PRODUCT_DETAIL.suppliers!} />,
}
