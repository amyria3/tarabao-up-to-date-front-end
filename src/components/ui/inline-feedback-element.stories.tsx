import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { InlineFeedbackElement } from '@/components/ui/inline-feedback-element'

const meta = {
  title: 'Components/UI/InlineFeedbackElement',
  component: InlineFeedbackElement,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Primitives / InlineFeedbackElement (2337:1353). Inline message with Success?=True (role="status") or Warning?=True (role="alert"). Close allowed?=True adds a close button; a click hides the element (Closed?=True), controlled via open and onOpenChange.',
      },
    },
  },
  args: { children: 'Content' },
} satisfies Meta<typeof InlineFeedbackElement>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {}

export const Warning: Story = {
  args: { tone: 'warning' },
}

export const Closable: Story = {
  args: { tone: 'warning', closable: true },
}
