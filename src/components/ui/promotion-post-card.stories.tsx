import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PromotionPostCard } from '@/components/ui/promotion-post-card'
import { PROMOTION } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/PromotionPostCard',
  component: PromotionPostCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Cards / PromotionPostCard (3912:19740). Framed image, title, text and Buttons / SM / Button-Card. With teaser.href the button links to the promotion.',
      },
    },
  },
  args: { teaser: PROMOTION },
} satisfies Meta<typeof PromotionPostCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
