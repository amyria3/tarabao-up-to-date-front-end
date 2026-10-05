import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CheckboxField } from '@modules/checkout/components/checkbox-field'

const meta = {
  title: 'Components/CheckboxField',
  component: CheckboxField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / CheckBox (3517:8647) with Primitives / DefaultParagraph MD. Row with gap-md (Checkout / Identification) or gap-sm (AddressFieldset).',
      },
    },
  },
  args: {
    label:
      'In unserem Newsletter schreiben wir über neue Produkte, informieren über befristete Aktionen und teilen unsere Lieblingsrezepte oder erzählen über unsere Partnerschaften.',
  },
} satisfies Meta<typeof CheckboxField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
  parameters: { docs: { description: { story: 'On?=True.' } } },
}

export const GapSm: Story = {
  args: { gap: 'sm', label: 'Adresse für später speichern', defaultChecked: true },
  parameters: { docs: { description: { story: 'Row with gap-sm as in the manual AddressFieldset.' } } },
}
