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
          'Figma: ContentModules / SustainabilityTabs (8144:22842). Tab widget without <section>: SustainabilityCategoryNavigation as tablist and one tabpanel of BasicWithDisclosure modules per category. Only one module is open.',
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
