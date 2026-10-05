import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ValidationSign } from '@/components/ui/validation-sign'

const meta = {
  title: 'Components/UI/ValidationSign',
  component: ValidationSign,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Figma: Primitives / ValidationSign (2406:1344). 20 × 20 sign: error = Valid?=False, Error?=True (error-content), valid = Valid?=True (success-content), clear = X?=True (content-text). The color follows currentColor.',
      },
    },
  },
  args: { variant: 'error' },
} satisfies Meta<typeof ValidationSign>

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {}

export const Valid: Story = {
  args: { variant: 'valid' },
}

export const Clear: Story = {
  args: { variant: 'clear' },
}
