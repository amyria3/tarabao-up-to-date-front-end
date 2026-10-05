import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DefaultParagraph } from '@/components/ui/typography'
import { Disclosure } from '@modules/products/components/disclosure'
import { Ingredients, NutritionTable, SupplierInfo } from '@modules/products/components/product-info'
import { ProductImage } from '@modules/products/components/product-image'
import { PRODUCT_DETAIL } from '@/lib/fixtures'
import { LOREM } from '@/lib/shop/content'

const meta = {
  title: 'Components/Disclosure',
  component: Disclosure,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Disclosure (283:633). Header row with ProductPage/Dropdown/Summary and ArrowUpOrDown, content below and a divider. The content per Type (Text only, Inhaltsstoffe, Nährwerte-Tabelle, Lieferkette und Lieferanten, Ladensuche …) comes as children. State=Overlay opens an overlay instead of expanding (arrow points right).',
      },
    },
  },
  args: {
    title: 'Titel',
    children: <DefaultParagraph size="lg">{LOREM}</DefaultParagraph>,
  },
} satisfies Meta<typeof Disclosure>

export default meta
type Story = StoryObj<typeof meta>

/** State=Default, Type=Text only */
export const Default: Story = {}

/** State=Open, Type=Text only */
export const Open: Story = {
  args: { defaultOpen: true },
}

/** State=Overlay */
export const Overlay: Story = {
  args: { overlay: true, children: undefined },
}

/** Type=Inhaltsstoffe */
export const WithIngredients: Story = {
  args: {
    title: 'Inhaltsstoffe',
    defaultOpen: true,
    children: <Ingredients ingredients={PRODUCT_DETAIL.ingredients!} />,
  },
}

/** Type=Nährwerte-Tabelle */
export const WithNutritionTable: Story = {
  args: {
    title: 'Nährwerte',
    defaultOpen: true,
    children: <NutritionTable nutrition={PRODUCT_DETAIL.nutrition!} />,
  },
}

/** Type=Lieferkette und Lieferanten */
export const WithSupplierInfo: Story = {
  args: {
    title: 'Informationen zu den Lieferanten und der Lieferkette',
    defaultOpen: true,
    contentClassName: 'px-xl pt-md-l pb-xl',
    children: <SupplierInfo suppliers={PRODUCT_DETAIL.suppliers!} />,
  },
}

/** Type=Ladensuche (map as placeholder surface) */
export const WithStoreFinder: Story = {
  args: {
    title: 'Ladensuche',
    defaultOpen: true,
    children: (
      <div className="aspect-video w-full">
        <ProductImage />
      </div>
    ),
  },
}
