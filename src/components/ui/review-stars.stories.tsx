import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ReviewStars } from '@/components/ui/review-stars'
import { PRODUCTS } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/ReviewStars',
  component: ReviewStars,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Primitives / ReviewStars (8118:22969). Five stars with the label „Gekauft von … Menschen“ below. Align=Align-left|align-center; Cards / ReviewCard hides the empty stars (emptyStars="hidden").',
      },
    },
  },
  args: { rating: 5, label: PRODUCTS[0]!.reviewCountLabel },
} satisfies Meta<typeof ReviewStars>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AlignCenter: Story = {
  args: { rating: 4, align: 'center' },
}

export const EmptyStarsHidden: Story = {
  args: { rating: 4, emptyStars: 'hidden', label: undefined },
}
