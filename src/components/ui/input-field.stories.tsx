import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { InputField } from '@/components/ui/input-field'

const EMAIL = 'medina.wagenrode@example.org'

const COUNTRIES = [
  { value: 'DE', label: 'Deutschland' },
  { value: 'AT', label: 'Österreich' },
  { value: 'CH', label: 'Schweiz' },
]

const MESSAGE_LABEL = 'Deine Nachricht oder Frage hier'

const meta = {
  title: 'Components/UI/InputField',
  component: InputField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Input / Field (9563:39197). Axes Type (Text, Password, Select, Textarea) and State (Default, Focus, Filled, Valid, Missing, Invalid, Disabled). The state follows from focus, input and error; forceActive shows Focus statically. Missing = required field empty, Invalid = wrong input.',
      },
    },
  },
  args: { label: 'E-Mail', type: 'email', required: true },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Focus: Story = {
  args: { defaultValue: 'med', forceActive: true },
}

export const Filled: Story = {
  args: { defaultValue: EMAIL },
}

export const Valid: Story = {
  args: { defaultValue: EMAIL, valid: true },
}

export const Missing: Story = {
  args: { error: 'Wir brauchen Deine E-Mail-Adresse' },
}

export const Invalid: Story = {
  args: { defaultValue: 'medina.wagenrode.example.org', error: 'Ungültige E-Mail: muss @ enthalten' },
}

export const Disabled: Story = {
  args: { defaultValue: EMAIL, disabled: true },
}

export const WithPrefix: Story = {
  args: { label: 'Bestellnummer (nach #)', type: 'text', prefix: '#', inputMode: 'numeric', defaultValue: '489443' },
}

export const Password: Story = {
  args: { label: 'Passwort', type: 'password', defaultValue: 'geheim1234' },
}

export const PasswordInvalid: Story = {
  args: {
    label: 'Passwort',
    type: 'password',
    defaultValue: 'geheim',
    error: 'Das Passwort braucht mindestens 8 Zeichen',
  },
}

export const Select: Story = {
  args: { label: 'Land', type: 'select', options: COUNTRIES, defaultValue: 'DE' },
}

export const SelectMissing: Story = {
  args: { label: 'Land', type: 'select', options: COUNTRIES, error: 'Bitte wähle ein Land' },
}

export const Textarea: Story = {
  args: { label: MESSAGE_LABEL, type: 'textarea' },
}

export const TextareaFilled: Story = {
  args: {
    label: MESSAGE_LABEL,
    type: 'textarea',
    defaultValue:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
  },
}

export const TextareaInvalid: Story = {
  args: { label: MESSAGE_LABEL, type: 'textarea', defaultValue: 'Hi', error: 'Bitte schreib uns ein paar Worte mehr' },
}

export const WithoutMessage: Story = {
  args: { error: 'Ungültige E-Mail', showMessage: false },
}
