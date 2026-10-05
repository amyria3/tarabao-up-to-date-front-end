import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CartMessage } from '@modules/cart/components/cart-message'

/** Figma texts of Components / Cart / Message (Variant=Huge) and the voucher note (Variant=Small). */
const MESSAGE = 'Schön, dass Du wieder vorbeikommst! Wir haben *** Gutschein für Dich :)'
const VOUCHER_NOTE =
  'Es ist Ostern, und weil Alica und Julia aus unserem Marketing-Team so gern Marmelade kochen, packen wir Dir ab einem Einkaufswert von 70,- gern ein Mehrwegglas als kleines Geschenk ein :)'

const meta = {
  title: 'Components/CartMessage',
  component: CartMessage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Cart / Message (3480:19750). Message card in the cart; Visible?=False means the caller does not render it.',
      },
    },
  },
  args: { children: MESSAGE },
} satisfies Meta<typeof CartMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Huge: Story = {
  args: { actionLabel: 'In den Warenkorb', closable: true },
  parameters: {
    docs: { description: { story: 'Figma: Variant=Huge. Close button, centered message and inline button.' } },
  },
}

export const Small: Story = {
  args: { variant: 'small', children: VOUCHER_NOTE },
  parameters: { docs: { description: { story: 'Figma: Variant=Small. DefaultParagraph MD.' } } },
}
