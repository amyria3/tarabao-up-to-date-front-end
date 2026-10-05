import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CarouselPagination, PaginationDot as PaginationDotComponent } from '@/components/ui/carousel-pagination'

const meta = {
  title: 'Components/UI/CarouselPagination',
  component: CarouselPagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Figma: Primitives / CarouselPagination (9324:45197). Back and forward buttons (Buttons / CarouselNav SM) around one Primitives / PaginationDot per page; Active?=True marks the visible page. Without loop the buttons are disabled at the ends.',
      },
    },
  },
  args: { pages: 3, page: 0 },
} satisfies Meta<typeof CarouselPagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SecondPage: Story = {
  args: { page: 1 },
}

export const LastPage: Story = {
  args: { page: 2 },
}

export const Loop: Story = {
  args: { loop: true },
}

export const PaginationDot: Story = {
  parameters: {
    docs: { description: { story: 'Figma: Primitives / PaginationDot (9321:70281). Active?=True and Active?=False.' } },
  },
  render: () => (
    <div className="flex items-center gap-sm">
      <PaginationDotComponent active />
      <PaginationDotComponent />
    </div>
  ),
}
