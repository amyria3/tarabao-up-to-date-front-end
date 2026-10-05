import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MediaText } from '@/components/LexicalRenderers/MediaText'

/** Example text from the library entry (Figma default text). */
const LOREM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'

const meta = {
  title: 'Components/LexicalRenderers/MediaText',
  component: MediaText,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: ContentModules / CMS / MediaText (7565:24424). H2, image area (placeholder) up to content width and a paragraph LG.',
      },
    },
  },
  args: { title: 'Unsere Partnerschaften - Wie wir Freundschaften schließen', text: LOREM },
} satisfies Meta<typeof MediaText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutText: Story = {
  args: { showText: false },
  parameters: { docs: { description: { story: 'Figma: DisplayText?=False.' } } },
}
