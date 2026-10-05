import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BlogCard } from '@/components/ui/blog-card'
import { BLOG_POST } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Cards / BlogCard (380:881). Linked card with image and title. Variant=Blog centers the title, Variant=Default aligns it left.',
      },
    },
  },
  args: { post: BLOG_POST },
} satisfies Meta<typeof BlogCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Blog: Story = {
  args: { variant: 'blog' },
}

export const Hover: Story = {
  args: { forceHover: true },
}
