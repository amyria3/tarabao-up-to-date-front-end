import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BlockElement } from '@/components/ui/block-element'

const meta = {
  title: 'Components/UI/BlockElement',
  component: BlockElement,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / BlockElement (7797:22472). Centered block with title, paragraph and an action: the newsletter form (onSubscribe receives the e-mail) or a full-width link to the withdrawal page. Axes Variant, Padding? and min-w?.',
      },
    },
  },
  args: { variant: 'newsletter' },
} satisfies Meta<typeof BlockElement>

export default meta
type Story = StoryObj<typeof meta>

export const Newsletter: Story = {}

export const Withdrawal: Story = {
  args: { variant: 'widerruf' },
}

export const WithPadding: Story = {
  args: { padding: true },
}

export const WithoutMinWidth: Story = {
  args: { minWidth: false },
}
