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
          'Figma: Primitives / Breadcrumb (3155:5202). Path as in the storefront: the first item (home page) appears as dots with a link, the last item is the current page without a link.',
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
