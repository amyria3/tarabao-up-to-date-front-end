import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ButtonShape } from '@/components/ui/button-shape'

const meta = {
  title: 'Components/UI/ButtonShape',
  component: ButtonShape,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Button-Shape (7932:33229). Background shape of all buttons: absolute behind the label, stretches like the Figma vector, color via currentColor.',
      },
    },
  },
  args: { shape: 'oblong' },
  argTypes: {
    shape: { control: 'inline-radio', options: ['oblong', 'oval', 'very-oval', 'very-oval-turned'] },
  },
  decorators: [
    (Story) => (
      <span className="relative block h-btn-md w-full max-w-btn-max text-btn-primary-bg">
        <Story />
      </span>
    ),
  ],
} satisfies Meta<typeof ButtonShape>

export default meta
type Story = StoryObj<typeof meta>

export const Oblong: Story = {
  parameters: { docs: { description: { story: 'Figma: Shape=Oblong.' } } },
}

export const Oval: Story = {
  args: { shape: 'oval' },
  parameters: { docs: { description: { story: 'Figma: Shape=Oval.' } } },
}

export const VeryOval: Story = {
  args: { shape: 'very-oval' },
  parameters: { docs: { description: { story: 'Figma: Shape=Very oval.' } } },
}

export const VeryOvalTurned: Story = {
  args: { shape: 'very-oval-turned' },
  parameters: { docs: { description: { story: 'Figma: Shape=Very oval, Turned over?=True.' } } },
}

export const WithOutline: Story = {
  args: { className: 'text-btn-secondary-bg', outlineClassName: 'text-btn-secondary-label' },
  parameters: {
    docs: { description: { story: 'Stroke on Button-Shape (INSIDE), as in Buttons / MD / SecondaryButton.' } },
  },
}
