import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryCardMd as CategoryCardMdComponent, CategoryCardSm } from '@modules/categories/components/category-card'
import { CATEGORIES_SAMPLE } from '@/lib/fixtures'

const meta = {
  title: 'Components/CategoryCard',
  component: CategoryCardSm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Cards / CategoryCard / SM (2628:2698). State=Default|Hover, Variant=Default|Nüsse Pur. The whole card is a link; the image frame uses the card colour (card-surface-&-img-stroke-color-default).',
      },
    },
  },
  args: { category: CATEGORIES_SAMPLE[0]! },
} satisfies Meta<typeof CategoryCardSm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}

export const NuessePur: Story = {
  args: { category: CATEGORIES_SAMPLE[1]! },
  parameters: { docs: { description: { story: 'Variant=Nüsse Pur.' } } },
}

export const CategoryCardMd: Story = {
  render: () => <CategoryCardMdComponent category={CATEGORIES_SAMPLE[2]!} />,
  parameters: {
    docs: {
      description: {
        story: 'Figma: Cards / CategoryCard / MD (2638:2654). Hover?=False. Image on white, title Cards/ProductTitle.',
      },
    },
  },
}

export const CategoryCardMdHover: Story = {
  render: () => <CategoryCardMdComponent category={CATEGORIES_SAMPLE[2]!} forceHover />,
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Cards / CategoryCard / MD (2638:2654). Hover?=True: surface card-surface-hover and the card button.',
      },
    },
  },
}
