import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ModuleHeadline } from '@/components/LexicalRenderers/ModuleHeadline'

/** Example text from the library entry (Figma default text). */
const HEADLINE = 'Ein wichtiger Text - interessant für unsere Kundinnen und Kunden'

const meta = {
  title: 'Components/LexicalRenderers/ModuleHeadline',
  component: ModuleHeadline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: ContentModules / Basic · Slot Headline (7715:19490). Picks Primitives / Headline / H1, H2 or H3 with the style of the Figma property TypeOfHeadline (also used in CustomContentWithImg and Editorial).',
      },
    },
  },
  args: { type: 'h2', children: HEADLINE },
} satisfies Meta<typeof ModuleHeadline>

export default meta
type Story = StoryObj<typeof meta>

/** TypeOfHeadline=H2 / Default */
export const Default: Story = {}

export const H1: Story = {
  args: { type: 'h1' },
}

export const H1Subtle: Story = {
  args: { type: 'h1-subtle' },
}

export const H2Alternative: Story = {
  args: { type: 'h2-alternative' },
}

export const H2Subtle: Story = {
  args: { type: 'h2-subtle' },
}

export const H3: Story = {
  args: { type: 'h3' },
}

export const Centered: Story = {
  args: { align: 'center' },
}
