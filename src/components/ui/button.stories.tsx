import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { IconCartEmpty } from '@/components/design-system/icons/figma-icons'
import { BUTTON_FAMILIES, BUTTON_FIGMA_NAMES, Button } from '@/components/ui/button'

/** Figma: Buttons / LG … XXXS. Steuerung über intent, size, width und Zustände. */
const meta = {
  title: 'Komponenten/Button',
  component: Button,
  args: { intent: 'primary', size: 'md', children: 'In den Warenkorb', forceHover: false, disabled: false },
  argTypes: {
    intent: { control: 'inline-radio', options: ['primary', 'secondary', 'inline', 'card'] },
    size: { control: 'inline-radio', options: ['lg', 'md', 'sm', 'xxs', 'xxxs'] },
    width: { control: 'inline-radio', options: [undefined, 'fill', 'hug'] },
    shape: { control: 'select', options: [undefined, 'oblong', 'oval', 'very-oval', 'very-oval-turned'] },
  },
  parameters: {
    docs: {
      description: {
        component: `Gültige Kombinationen: ${BUTTON_FAMILIES.map((f) => `${f} (${BUTTON_FIGMA_NAMES[f]})`).join(', ')}.`,
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const MitIcon: Story = { args: { icon: <IconCartEmpty aria-hidden className="size-6" /> } }
export const Hover: Story = { args: { forceHover: true } }
export const Inaktiv: Story = { args: { disabled: true } }
export const SecondarySm: Story = { args: { intent: 'secondary', size: 'sm' } }
export const InlineXxs: Story = { args: { intent: 'inline', size: 'xxs' } }
