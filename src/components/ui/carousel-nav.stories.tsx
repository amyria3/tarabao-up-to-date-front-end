import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CarouselNav } from '@/components/ui/carousel-nav'

const meta = {
  title: 'Components/UI/CarouselNav',
  component: CarouselNav,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / CarouselNav (2038:4884). Carousel arrow with its own shape · Size=Huge|SM, Direction=left|right, Hover?.',
      },
    },
  },
  args: { size: 'huge', direction: 'left' },
  argTypes: {
    size: { control: 'inline-radio', options: ['huge', 'sm'] },
    direction: { control: 'inline-radio', options: ['left', 'right'] },
  },
} satisfies Meta<typeof CarouselNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Right: Story = {
  args: { direction: 'right' },
}

export const Hover: Story = {
  args: { forceHover: true },
}

export const Sm: Story = {
  args: { size: 'sm' },
}

export const SmRight: Story = {
  args: { size: 'sm', direction: 'right' },
}

export const SmHover: Story = {
  args: { size: 'sm', forceHover: true },
}
