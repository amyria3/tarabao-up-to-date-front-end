import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ShippingCostsInfo } from '@/components/ui/shipping-costs-info'

const meta = {
  title: 'Components/UI/ShippingCostsInfo',
  component: ShippingCostsInfo,
  decorators: [
    (Story) => (
      <div className="pt-xxxl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Primitives / ShippingCostsInfo (9488:44712). „*inkl. MwSt. zzgl. Versandkosten“, right aligned. State=Hover shows the Information Bubble (Fill, without icon) above the link with the shipping costs; in code on hover and focus (role="tooltip").',
      },
    },
  },
} satisfies Meta<typeof ShippingCostsInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { forceOpen: true },
}
