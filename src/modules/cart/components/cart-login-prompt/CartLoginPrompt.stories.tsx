import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CartLoginPrompt } from '@modules/cart/components/cart-login-prompt'

const meta = {
  title: 'Components/CartLoginPrompt',
  component: CartLoginPrompt,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / CartLoginPrompt (3220:18844). Hint to log in, primary button „Anmelden“ and inline link „Weiter einkaufen“.',
      },
    },
  },
} satisfies Meta<typeof CartLoginPrompt>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Figma: Logged In?=False.' } } },
}
