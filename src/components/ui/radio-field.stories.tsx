import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { InlineFeedbackElement } from '@/components/ui/inline-feedback-element'
import { RadioField, RadioOption as RadioOptionComponent } from '@/components/ui/radio-field'
import { RadioGroup } from '@/components/ui/radio-group'
import { addressLines } from '@/lib/checkout/address'
import { ADDRESS, SHIPPING_OPTIONS } from '@/lib/fixtures'

const SHIPPING = SHIPPING_OPTIONS.map((o) => ({ value: o.id, label: o.label, description: o.description }))

const meta = {
  title: 'Components/UI/RadioField',
  component: RadioField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Switches / Radio (3795:12348). Column of RadioButtonGroup options (Radix RadioGroup) · Option 1?|Option 2?.',
      },
    },
  },
  args: { options: SHIPPING, 'aria-label': 'Versandmethode' },
} satisfies Meta<typeof RadioField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SecondOptionSelected: Story = {
  args: { defaultValue: 'express' },
}

export const WithAddress: Story = {
  args: {
    'aria-label': 'Adresse',
    options: [
      {
        value: 'home',
        label: 'Lieferadresse',
        children: (
          <div className="flex flex-col type-data-blocks-summary-item-content text-content-text">
            {addressLines(ADDRESS).map((parts, i) => (
              <p key={i} className="flex flex-wrap gap-x-sm">
                {parts.map((p, j) => (
                  <span key={j}>{p}</span>
                ))}
              </p>
            ))}
          </div>
        ),
      },
    ],
  },
  parameters: { docs: { description: { story: 'Figma: Components / RadioButtonGroup · Content=Address.' } } },
}

export const RadioOption: Story = {
  render: () => (
    <RadioGroup aria-label="Beispiel" defaultValue="x">
      <RadioOptionComponent value="x" label="Label" description="Content" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Figma: Components / RadioButtonGroup (3793:15664). One option · Content=Plain Text, State=Selected.',
      },
    },
  },
}

export const RadioOptionInactive: Story = {
  render: () => (
    <RadioGroup aria-label="Beispiel">
      <RadioOptionComponent value="x" label="Label" description="Content" state="inactive" />
    </RadioGroup>
  ),
  parameters: { docs: { description: { story: 'Figma: Components / RadioButtonGroup · State=Inactive.' } } },
}

export const RadioOptionError: Story = {
  render: () => (
    <RadioGroup aria-label="Beispiel">
      <RadioOptionComponent
        value="x"
        label="Label"
        description="Content"
        state="error"
        feedback={
          <InlineFeedbackElement tone="warning">Diese Bestellung kann nicht ausgewählt werden.</InlineFeedbackElement>
        }
      />
    </RadioGroup>
  ),
  parameters: { docs: { description: { story: 'Figma: Components / RadioButtonGroup · State=Error.' } } },
}
