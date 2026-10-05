import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ContactForm } from '@/components/LexicalRenderers/ContactForm'

const meta = {
  title: 'Components/LexicalRenderers/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: ContentModules / ContactForm (7988:22598). H2, textarea, name and e-mail fields and the submit button; after submitting, the success message with a button for a new message.',
      },
    },
  },
} satisfies Meta<typeof ContactForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = {
  args: { defaultSent: true },
  parameters: { docs: { description: { story: 'Figma: State=Success (state after submitting).' } } },
}
