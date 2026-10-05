import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'

const REDEEM = (
  <Button intent="primary" size="xxs">
    Einlösen
  </Button>
)

const REDEEM_DISABLED = (
  <Button intent="primary" size="xxs" disabled>
    Einlösen
  </Button>
)

const meta = {
  title: 'Components/UI/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Felder mit Button · Components / Cart / VoucherInput · voucher-row (3325:5910). Input / Field with extras: an action to the right (bottom aligned), a server message above the field (remoteError) and a closable hint below it (warning) that does not mark the input as invalid.',
      },
    },
  },
  args: { label: 'Gutschein' },
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { action: REDEEM_DISABLED },
}

export const Invalid: Story = {
  args: { defaultValue: 'PA23', error: 'Mindestens 5 Zeichen', action: REDEEM_DISABLED },
}

export const RemoteError: Story = {
  args: { defaultValue: 'PALEO23', remoteError: 'Dieser Gutschein Code existiert nicht (mehr)', action: REDEEM },
}

export const Warning: Story = {
  args: {
    label: 'Nachname',
    required: true,
    defaultValue: 'Me',
    valid: true,
    warning: 'Hast Du Dich vertippt oder ist Dein Name besonders kurz?',
  },
}
