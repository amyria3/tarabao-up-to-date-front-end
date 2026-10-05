import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ReactionCounter } from '@/components/ui/reaction-counter'
import { REVIEW, REVIEW_LIKED } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/ReactionCounter',
  component: ReactionCounter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / ReactionCounter (2070:1506). Heart (helpful) with count and flag (report) · Variant=1 (outline heart, no reaction) | 2 (filled heart with count).',
      },
    },
  },
  args: { likes: REVIEW.likes },
} satisfies Meta<typeof ReactionCounter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Liked: Story = {
  args: { likes: REVIEW_LIKED.likes },
}

export const Reported: Story = {
  args: { likes: REVIEW_LIKED.likes, reported: true },
}

export const WithoutReport: Story = {
  args: { showReport: false },
}
