import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SearchField } from '@modules/search/components/search-field'

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Search / Input (2339:2155). Magnifier and input; with input a cross clears the field. Hover?=True and Active?=True follow pointer and focus; with input (Eingabe?) the active surface stays.',
      },
    },
  },
} satisfies Meta<typeof SearchField>

export default meta
type Story = StoryObj<typeof meta>

/** Hover?=False, Active?=False, Input?=False */
export const Default: Story = {}

/** Active?=True, Eingabe?=True */
export const Filled: Story = {
  args: { defaultValue: 'ungeschälte irgendwas' },
}
