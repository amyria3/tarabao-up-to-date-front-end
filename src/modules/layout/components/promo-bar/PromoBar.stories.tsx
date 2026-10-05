import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PromoBar } from '@modules/layout/components/promo-bar'
import { PROMO } from '@/lib/fixtures'

const meta = {
  title: 'Components/PromoBar',
  component: PromoBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Layout / PromoBar (8882:27232). viewport-range=base|md|lg. Shipping note above the header; Clrs / Special is pinned to lilac in the component. base shows the short text, md and lg the long text (narrow the viewport to compare).',
      },
    },
  },
  args: { promo: PROMO },
} satisfies Meta<typeof PromoBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
