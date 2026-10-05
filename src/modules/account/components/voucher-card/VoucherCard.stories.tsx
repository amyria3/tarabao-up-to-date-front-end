import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { VoucherCard } from '@modules/account/components/voucher-card'
import { VOUCHER } from '@/lib/fixtures'

const meta = {
  title: 'Components/VoucherCard',
  component: VoucherCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Cards / VoucherCard (3912:19811). Voucher code, conditions and card button; the code surface follows data-special-theme (forest | lilac).',
      },
    },
  },
  args: { voucher: VOUCHER },
} satisfies Meta<typeof VoucherCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Figma: Hover?=False.' } } },
}

export const Hover: Story = {
  args: { forceHover: true },
  parameters: { docs: { description: { story: 'Figma: Hover?=True.' } } },
}

export const Lilac: Story = {
  args: { specialTheme: 'lilac' },
  parameters: { docs: { description: { story: 'Clrs / Special: lilac.' } } },
}
