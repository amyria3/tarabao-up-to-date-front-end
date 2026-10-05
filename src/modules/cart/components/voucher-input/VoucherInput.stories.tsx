import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { VoucherInput } from '@modules/cart/components/voucher-input'

/** Figma text of the voucher note above the field. */
const VOUCHER_NOTE =
  'Es ist Ostern, und weil Alica und Julia aus unserem Marketing-Team so gern Marmelade kochen, packen wir Dir ab einem Einkaufswert von 70,- gern ein Mehrwegglas als kleines Geschenk ein :)'

const meta = {
  title: 'Components/VoucherInput',
  component: VoucherInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Cart / VoucherInput (3325:5910). Voucher note and voucher field; „Einlösen“ stays inactive while the field is empty.',
      },
    },
  },
  args: { note: VOUCHER_NOTE },
} satisfies Meta<typeof VoucherInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Figma: Variant=Static.' } } },
}

export const WithoutNote: Story = {
  args: { note: undefined },
  parameters: { docs: { description: { story: 'Voucher field without the note.' } } },
}

export const Error: Story = {
  args: { error: 'Dieser Gutschein Code existiert nicht (mehr)' },
  parameters: { docs: { description: { story: 'Field with error message.' } } },
}
