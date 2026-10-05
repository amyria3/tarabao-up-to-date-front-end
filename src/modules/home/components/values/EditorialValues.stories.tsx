import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  EditorialValues,
  ImpactScale as ImpactScaleComponent,
  VALUES,
  ValueIllustration as ValueIllustrationComponent,
} from '@modules/home/components/values'

const IMPACT_LEVELS = ['tree', 'medium', 'seedling', 'world'] as const

const meta = {
  title: 'Components/EditorialValues',
  component: EditorialValues,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: ContentModules / CMS / Editorial (3164:4640). Values row: per value a two-line title (H1 Subtitle) above the illustration (placeholder).',
      },
    },
  },
} satisfies Meta<typeof EditorialValues>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ValueIllustration: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-md">
      {VALUES.map((v) => (
        <ValueIllustrationComponent key={v.key} label={v.label} />
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Figma: Values (2672:2468) · Property 1=Bio|Honesty|Fresh|Packaging. Illustration as placeholder area.',
      },
    },
  },
}

export const ImpactScale: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-md">
      {IMPACT_LEVELS.map((level) => (
        <ImpactScaleComponent key={level} level={level} />
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Figma: ImpactScale (2708:2435) · Property 1=Baum|Mittelding|Setzling|Welt. Sustainability scale levels as placeholder areas.',
      },
    },
  },
}
