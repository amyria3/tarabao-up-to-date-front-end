import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AddedToCartOverlay, useAddedToCart } from '@modules/common/components/added-to-cart-overlay'
import { Button } from '@/components/ui/button'
import { CART } from '@/lib/fixtures'

const ITEM = { productTitle: CART.items[0]!.title, priceLabel: CART.items[0]!.totalLabel }

/** Product page flow: „In den Warenkorb“ opens the overlay, its buttons close it again. */
function AddToCartFlow() {
  const { item, show, close } = useAddedToCart()
  return (
    <div className="flex w-full justify-center p-md">
      <Button intent="primary" size="md" onClick={() => show(ITEM)}>
        In den Warenkorb
      </Button>
      <AddedToCartOverlay item={item} onClose={close} />
    </div>
  )
}

const meta = {
  title: 'Components/AddedToCartOverlay',
  component: AddedToCartOverlay,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: overlay/ADDED TO CARD (9110:26544). Top layer of Templates / Page: a fixed modal dialog that appears after „In den Warenkorb“. „Weiterstöbern“, „Schließen“ and „Prüfen & kaufen“ close it; `item: null` hides it.',
      },
      story: { inline: false, iframeHeight: '40rem' },
    },
  },
  args: { item: ITEM },
} satisfies Meta<typeof AddedToCartOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: () => <AddToCartFlow />,
  parameters: {
    docs: {
      description: {
        story: 'Opens with useAddedToCart after „In den Warenkorb“; Escape or a click on the backdrop closes it.',
      },
    },
  },
}
