import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { InlineMarkup } from '@/components/ui/inline-markup'
import { MEGA_CARDS } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/InlineMarkup',
  component: InlineMarkup,
  decorators: [
    (Story) => (
      <p className="w-full max-w-block-max type-default-text-lg text-content-text">
        <Story />
      </p>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Cards / MegaCard (2143:2061), body text. No Figma component of its own: renders editorial text with **bold** as <strong> and [label](href) as a bold, underlined link. Internal paths use next/link, external links open a new tab. Everything else stays plain text, no HTML.',
      },
    },
  },
  args: { text: MEGA_CARDS['purple-black'].body },
} satisfies Meta<typeof InlineMarkup>

export default meta
type Story = StoryObj<typeof meta>

export const Bold: Story = {}

export const Links: Story = {
  args: { text: MEGA_CARDS['orange-black'].body },
}
