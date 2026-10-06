import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SustainabilityTabs } from '@/components/LexicalRenderers/SustainabilityTabs'
import { SUSTAINABILITY_CONTENT } from '@/lib/fixtures'

const meta = {
  title: 'Components/LexicalRenderers/SustainabilityTabs',
  component: SustainabilityTabs,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: ContentModules / SustainabilityTabs (10020:52037). Tab widget without <section>: SustainabilityCategoryNavigation as tablist and one tabpanel of BasicWithDisclosure modules per category (Engagement 4, Umwelt 3, Fairness 3, No Plane 1). Only one module is open; a tab with a single module shows it without accordion.',
      },
    },
  },
  args: { content: SUSTAINABILITY_CONTENT.tabs },
} satisfies Meta<typeof SustainabilityTabs>

export default meta
type Story = StoryObj<typeof meta>

/** Category social-commitment selected */
export const Default: Story = {}

export const Transportation: Story = {
  args: { defaultCategory: 'transportation' },
  parameters: { docs: { description: { story: 'Category transportation (No Plane) selected, one module.' } } },
}
