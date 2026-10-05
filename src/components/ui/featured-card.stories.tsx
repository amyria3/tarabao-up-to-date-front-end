import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FeaturedCard } from '@/components/ui/featured-card'
import { FEATURED, FEATURED_BLOG_POST } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/FeaturedCard',
  component: FeaturedCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Cards / FeaturedCard (6704:18568). Title, image, text and the link „Mehr erfahren“. Variant=BlogPost adds author and date below the title.',
      },
    },
  },
  args: { teaser: FEATURED },
} satisfies Meta<typeof FeaturedCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}

export const BlogPost: Story = {
  args: { teaser: FEATURED_BLOG_POST, variant: 'blog-post' },
}
