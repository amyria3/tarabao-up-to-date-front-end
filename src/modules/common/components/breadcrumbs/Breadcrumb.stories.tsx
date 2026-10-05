import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Breadcrumb } from '@modules/common/components/breadcrumbs'
import { categoryBreadcrumb, findCategory, findProduct, productBreadcrumb } from '@/lib/shop/catalog'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Primitives / Breadcrumb (3155:5202). Path as in the storefront: the first item is the home page, the last item is the current page without a link. Dots appear only when the row is too narrow for all items: they replace the leading items (home page first) and link to the last hidden one.',
      },
    },
  },
  args: categoryBreadcrumb(findCategory('pflanzendrink-pulver')!, 'de-de'),
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/** Category page: Startseite → Shop → Pulver & Süßungsmittel → Pflanzendrink-Pulver */
export const Default: Story = {}

/** Product page: Startseite → Shop → category → subcategory → product */
export const ProductPage: Story = {
  args: productBreadcrumb(findProduct('jancys-curry-cashews')!, 'de-de'),
}

/** Narrow row (base): dots replace the leading items until the path fits. */
export const Narrow: Story = {
  args: productBreadcrumb(findProduct('jancys-curry-cashews')!, 'de-de'),
  decorators: [
    (Story) => (
      <div className="w-[22.5rem]">
        <Story />
      </div>
    ),
  ],
}
