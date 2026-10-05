import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ContentBasic } from '@/components/LexicalRenderers/ContentBasic'

/** Example texts from the library entry (Figma default texts). */
const HEADLINE = 'Ein wichtiger Text - interessant für unsere Kundinnen und Kunden'
const LOREM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
const COMPANY =
  'Dieses Unternehmen zeichnet sich durch besonderen Ehrgeiz aus, wenn es um faire Arbeitsbedingungen und nachhaltigen Anbau geht. Unternehmen, die sich sozial besonders engagieren möchten, wählen wir bevorzugt aus.'

const meta = {
  title: 'Components/LexicalRenderers/ContentBasic',
  component: ContentBasic,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: ContentModules / Basic (7715:19490). At most one headline (TypeOfHeadline) and three paragraphs (TypeOfParagraph LG or MD).',
      },
    },
  },
  args: { headline: HEADLINE, headlineType: 'h2', paragraphs: [LOREM], paragraphSize: 'lg' },
} satisfies Meta<typeof ContentBasic>

export default meta
type Story = StoryObj<typeof meta>

/** TypeOfHeadline=H2 / Default · TypeOfParagraph=LG */
export const Default: Story = {}

export const H1: Story = {
  args: { headlineType: 'h1' },
}

export const H1Subtle: Story = {
  args: { headlineType: 'h1-subtle' },
}

export const H2Alternative: Story = {
  args: { headlineType: 'h2-alternative', paragraphs: [COMPANY], paragraphSize: 'md' },
}

export const H2Subtle: Story = {
  args: { headlineType: 'h2-subtle', paragraphs: [COMPANY], paragraphSize: 'md' },
}

export const H3: Story = {
  args: { headlineType: 'h3', paragraphs: [COMPANY], paragraphSize: 'md' },
}

export const WithoutHeadline: Story = {
  args: { headline: undefined },
  parameters: { docs: { description: { story: 'Figma: Has Headline?=False.' } } },
}
