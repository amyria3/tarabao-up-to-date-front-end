import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MegaCardsSection } from '@/components/LexicalRenderers/MegaCards'
import { MEGA_CARDS } from '@/lib/fixtures'

const meta = {
  title: 'Components/LexicalRenderers/MegaCards',
  component: MegaCardsSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Sections / MegaCards (2156:4072). Carousel without section template, one Cards / MegaCard per slide across the full width; from lg two Buttons / CarouselNav · Huge at the bottom right. Each card sets its own data-lively-theme.',
      },
    },
  },
  args: {
    slides: (['orange-black', 'blue-green', 'purple-black', 'happy-yellow'] as const).map((variant) => ({
      variant,
      card: MEGA_CARDS[variant],
    })),
  },
} satisfies Meta<typeof MegaCardsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleSlide: Story = {
  args: { slides: [{ variant: 'happy-yellow', card: MEGA_CARDS['happy-yellow'] }] },
  parameters: { docs: { description: { story: 'One slide: no CarouselNav buttons.' } } },
}
