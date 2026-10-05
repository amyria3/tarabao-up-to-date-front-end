import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MegaSwitch } from '@/components/ui/mega-switch'

const meta = {
  title: 'Components/UI/MegaSwitch',
  component: MegaSwitch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Switches / MegaSwitch (8847:23405). Switch between one-time purchase and subscription (role=switch, Radix Switch) · Switched?=False|True, State=Default|Hover.',
      },
    },
  },
  args: { 'aria-label': 'Bestellart' },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'xxsm'] },
  },
} satisfies Meta<typeof MegaSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Switched: Story = {
  args: { defaultChecked: true },
}

export const Hover: Story = {
  args: { forceHover: true },
}

export const SwitchedHover: Story = {
  args: { defaultChecked: true, forceHover: true },
}

export const Xxsm: Story = {
  args: { size: 'xxsm' },
  parameters: {
    docs: {
      description: {
        story: 'Figma: Switches / MegaSwitch / XXSM (9481:45126). Used in Components / Cart / ProductItem.',
      },
    },
  },
}

export const XxsmSwitched: Story = {
  args: { size: 'xxsm', defaultChecked: true },
  parameters: {
    docs: { description: { story: 'Figma: Switches / MegaSwitch / XXSM (9481:45126) · Switched?=True.' } },
  },
}
