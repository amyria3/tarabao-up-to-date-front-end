import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { VoucherList } from '@modules/checkout/components/voucher-list'
import { VALID_VOUCHERS } from '@/lib/fixtures'

const meta = {
  title: 'Components/VoucherList',
  component: VoucherList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / VoucherUIPattern (2406:2720). „Gültige Gutscheine:“ and one row per code with Icons / Delete · Small. Renders nothing without codes.',
      },
    },
  },
  args: { codes: VALID_VOUCHERS },
} satisfies Meta<typeof VoucherList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
