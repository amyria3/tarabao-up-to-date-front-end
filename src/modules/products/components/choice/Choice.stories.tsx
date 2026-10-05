import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Choice } from '@modules/products/components/choice'

const meta = {
  title: 'Components/Choice',
  component: Choice,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Choice (8819:23124). One-time purchase or subscription in the BuyBox: MegaSwitch, with subscription the benefits as Information Bubbles and the delivery interval. Figma pins the colour mode cole-tint-surface-warm; the component sets it itself (`theme`), so the toolbar mode does not change it. The Information Bubble texts are placeholders in Figma.',
      },
    },
  },
  args: { theme: 'cole-tint-surface-warm' },
} satisfies Meta<typeof Choice>

export default meta
type Story = StoryObj<typeof meta>

/** Default Variant choosen?=True (one-time purchase) */
export const Default: Story = {}

/** Default Variant choosen?=False (subscription) */
export const Subscription: Story = {
  args: { defaultSubscription: true },
}
