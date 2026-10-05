import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  SustainabilityCategoryTag,
  SustainabilityCategoryTags as SustainabilityCategoryTagsComponent,
} from '@/components/ui/sustainability-category-tag'

const meta = {
  title: 'Components/UI/SustainabilityCategoryTag',
  component: SustainabilityCategoryTag,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: SustainabilityCategoryTag (8125:24718). Non-interactive tag in the „Very oval“ shape, colored per category, with a check mark (Show Icon?).',
      },
    },
  },
  args: { category: 'social-commitment' },
} satisfies Meta<typeof SustainabilityCategoryTag>

export default meta
type Story = StoryObj<typeof meta>

export const SocialCommitment: Story = {}

export const CultivationEnvironment: Story = {
  args: { category: 'cultivation-environment' },
}

export const SupplyChainFairness: Story = {
  args: { category: 'supply-chain-fairness' },
}

export const Transportation: Story = {
  args: { category: 'transportation' },
}

export const WithoutIcon: Story = {
  args: { category: 'transportation', showIcon: false },
}

export const SustainabilityCategoryTags: Story = {
  parameters: {
    docs: { description: { story: 'Figma: SustainabilityCategoryTag (8126:24742). Group of all four tags.' } },
  },
  render: () => <SustainabilityCategoryTagsComponent />,
}
