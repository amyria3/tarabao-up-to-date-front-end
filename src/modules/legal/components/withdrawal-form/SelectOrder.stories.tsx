import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SelectOrder } from '@modules/legal/components/withdrawal-form/select-order'
import { CANCELLABLE_ORDERS } from '@/lib/fixtures'

const meta = {
  title: 'Components/SelectOrder',
  component: SelectOrder,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Cancellation / SelectOrder (6811:20517). Radio list of orders (orders no longer cancellable are inactive), primary button and hint.',
      },
    },
  },
  args: { orders: CANCELLABLE_ORDERS },
} satisfies Meta<typeof SelectOrder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Figma: State=NoSelection. „Weiter zum Widerruf“ is inactive.' } },
  },
}

export const OrderSelected: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText(CANCELLABLE_ORDERS[0]!.label))
  },
  parameters: {
    docs: { description: { story: 'Figma: State=OrderSelected. The play function selects the first order.' } },
  },
}
