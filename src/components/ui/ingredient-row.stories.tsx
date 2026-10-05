import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite'

import { IngredientRow, IngredientTable as IngredientTableComponent } from '@/components/ui/ingredient-row'

/** IngredientRow renders a <tr>; a single row needs the table around it. */
const inTable: Decorator = (Story) => (
  <IngredientTableComponent>
    <Story />
  </IngredientTableComponent>
)

/**
 * The props are a union (Zutat | Gruppe), so meta.args cannot make them optional
 * for every story; each story therefore passes complete args.
 */
const INGREDIENT = { amount: '200 g', name: 'Haferflocken' }

const meta = {
  title: 'Components/UI/IngredientRow',
  component: IngredientRow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Primitives / IngredientRow (9559:38929). Row of the ingredient table in Components / Recipe / PortionCalculator. Variant=Zutat shows amount and ingredient, Variant=Gruppe a subheading across the full width. The lines come from the table surface (content-text) and 1 px spacing between cells.',
      },
    },
  },
  args: INGREDIENT,
} satisfies Meta<typeof IngredientRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: INGREDIENT,
  decorators: [inTable],
}

export const Group: Story = {
  args: { variant: 'group', title: 'Für den Teig' },
  decorators: [inTable],
}

export const IngredientTable: Story = {
  args: INGREDIENT,
  parameters: {
    docs: { description: { story: 'IngredientTable with groups and ingredients, as in the recipe page.' } },
  },
  render: () => (
    <IngredientTableComponent>
      <IngredientRow variant="group" title="Für den Teig" />
      <IngredientRow amount="200 g" name="Haferflocken" />
      <IngredientRow amount="150 ml" name="Hafermilch" />
      <IngredientRow variant="group" title="Zum Bestreuen" />
      <IngredientRow amount="20 g" name="Walnüsse, gehackt" />
    </IngredientTableComponent>
  ),
}
