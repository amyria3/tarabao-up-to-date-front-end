import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CartLogIn } from '@modules/cart/components/cart-login'

const meta = {
  title: 'Components/CartLogIn',
  component: CartLogIn,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Cart / LogIn (3238:10265). E-mail and password fields, optional warning and primary button „Anmelden“.',
      },
    },
  },
} satisfies Meta<typeof CartLogIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Figma: State=Default.' } } },
}

export const Error: Story = {
  args: { error: 'E-Mail oder Passwort falsch' },
  parameters: { docs: { description: { story: 'Figma: Error?=True.' } } },
}
