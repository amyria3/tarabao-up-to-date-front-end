import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  HighlightedInformation,
  HighlightedInformationRow as HighlightedInformationRowComponent,
} from '@/components/ui/highlighted-information'
import { SUSTAINABILITY_CONTENT } from '@/lib/fixtures'

const meta = {
  title: 'Components/UI/HighlightedInformation',
  component: HighlightedInformation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / HighlightedInformation (10325:56341). Highlighted supplier fact (CMS text) on the shape Very oval with a dashed outline, text Label/default, 84 px wide.',
      },
    },
  },
  args: { children: SUSTAINABILITY_CONTENT.highlights[0] },
} satisfies Meta<typeof HighlightedInformation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HighlightedInformationRow: Story = {
  render: () => <HighlightedInformationRowComponent items={SUSTAINABILITY_CONTENT.highlights} />,
  parameters: {
    docs: {
      description: {
        story: 'Row in Sections / Sustainability (ContentSlot 05), centered, gap-md-sm, wraps on small screens.',
      },
    },
  },
}
