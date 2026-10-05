import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SearchInput } from '@/components/ui/search-input'

const meta = {
  title: 'Components/UI/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Primitives / SearchInput (2171:2737). Search field of Components / Search / Input. Input?=False shows the placeholder, Input?=True the text and the clear cross (Primitives / ValidationSign X?=True).',
      },
    },
  },
  args: { 'aria-label': 'Suche' },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Filled: Story = {
  args: { defaultValue: 'Cashew' },
}
