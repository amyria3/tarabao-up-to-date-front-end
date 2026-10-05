import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { NewsletterForm } from '@modules/layout/components/newsletter-form'

const meta = {
  title: 'Components/NewsletterForm',
  component: NewsletterForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / BlockElement (7797:22472), form part of Variant=Newsletter. Input / Input Field plain (e-mail, required) and Buttons / MD / PrimaryButton at full width. The caller connects the subscription through onSubscribe(email).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-block-max">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NewsletterForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
