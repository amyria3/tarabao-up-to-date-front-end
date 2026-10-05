import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { IconFlag30 } from '@/components/icons/figma-icons'
import { SegmentControlButton } from '@/components/ui/segment-control-button'

const meta = {
  title: 'Components/UI/SegmentControlButton',
  component: SegmentControlButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / XS / SegmentControlButton (3925:20314). Button with the shape Oblong and segmented-* tokens · State=Default|Hover, Selected?. Tab of TabBar and option of Switches / ToggleGroup.',
      },
    },
  },
  args: { children: 'Über dieses Produkt' },
  argTypes: {
    width: { control: 'inline-radio', options: ['hug', 'fill'] },
  },
} satisfies Meta<typeof SegmentControlButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}

export const Selected: Story = {
  args: { selected: true },
}

export const Fill: Story = {
  args: { width: 'fill' },
  decorators: [
    (Story) => (
      <div className="w-full max-w-btn-max">
        <Story />
      </div>
    ),
  ],
  parameters: { docs: { description: { story: 'Fill width, as inside Switches / ToggleGroup.' } } },
}

export const WithIcon: Story = {
  args: { icon: <IconFlag30 aria-hidden /> },
  parameters: { docs: { description: { story: 'Figma: hidden instance Icons / Flag / 30 behind the label.' } } },
}
