import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ReviewCard } from '@/components/ui/review-card'
import { REVIEW, REVIEW_LIKED } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Cards / ReviewCard (2194:1982). Stars, author, date, title, shortened text, image and Buttons / ReactionCounter. Reactions? follows from review.likes. A click on the text opens the full review (<details>); in Figma the shortened state is called State?=Open.',
      },
    },
  },
  args: { review: REVIEW },
} satisfies Meta<typeof ReviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithReactions: Story = {
  args: { review: REVIEW_LIKED },
}

export const Open: Story = {
  args: { review: REVIEW_LIKED, defaultOpen: true },
}
