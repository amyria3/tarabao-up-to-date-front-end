import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SelectProducts } from '@modules/legal/components/withdrawal-form/select-products'
import { RETURNABLE_ITEMS } from '@/lib/fixtures'

const meta = {
  title: 'Components/SelectProducts',
  component: SelectProducts,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Cancellation / SelectProducts (6810:20264). Selectable product images (Primitives / ProductImg), inline question, warning and primary button.',
      },
    },
  },
  args: { items: RETURNABLE_ITEMS },
} satisfies Meta<typeof SelectProducts>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'No item selected (ProductImg State=Default).' } } },
}

export const AllItemsSelected: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Hier clicken' }))
  },
  parameters: {
    docs: {
      description: { story: 'Figma: AllItemsSelected?=True. The play function clicks „Hier clicken“.' },
    },
  },
}

export const NoItemSelected: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Zahlungspflichtig widerrufen' }))
  },
  parameters: {
    docs: {
      description: {
        story: 'Layer error-no-item-selected: submitting without a selection shows the warning above the button.',
      },
    },
  },
}
