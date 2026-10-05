import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MegaCard } from '@/components/LexicalRenderers/MegaCard'
import { ThemeScope } from '@/components/ui/theme-scope'
import { MEGACARD_VARIANT_TO_LIVELY } from '@/lib/design-system/themes'
import { MEGA_CARDS } from '@/lib/fixtures'

const meta = {
  title: 'Components/LexicalRenderers/MegaCard',
  component: MegaCard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Cards / MegaCard (2143:2061). Variant sets data-lively-theme (Clrs / Mega Cards) and the layout. Min/Max: "max 1259" is the base state, "min 1260" applies from lg. Body text supports **bold** and [link](href).',
      },
    },
  },
  decorators: [
    (Story, { args }) => (
      <ThemeScope livelyTheme={MEGACARD_VARIANT_TO_LIVELY[args.variant ?? 'orange-black']}>
        <Story />
      </ThemeScope>
    ),
  ],
  args: { card: MEGA_CARDS['orange-black'], variant: 'orange-black' },
} satisfies Meta<typeof MegaCard>

export default meta
type Story = StoryObj<typeof meta>

export const OrangeBlack: Story = {}

export const BlueGreen: Story = {
  args: { card: MEGA_CARDS['blue-green'], variant: 'blue-green' },
}

export const HappyYellow: Story = {
  args: { card: MEGA_CARDS['happy-yellow'], variant: 'happy-yellow' },
}

export const PurpleBlack: Story = {
  args: { card: MEGA_CARDS['purple-black'], variant: 'purple-black' },
}
