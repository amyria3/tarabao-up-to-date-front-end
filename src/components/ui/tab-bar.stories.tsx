import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { TabBar } from '@/components/ui/tab-bar'
import { TabsContent } from '@/components/ui/tabs'
import { PRODUCT_TABS } from '@/lib/design-system/tabs'

const meta = {
  title: 'Components/UI/TabBar',
  component: TabBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / XS / TabBar (3970:22955). Tab list (role=tablist, Radix Tabs) of SegmentControlButtons; arrow keys switch the tab. Only for tab switching.',
      },
    },
  },
  args: { items: PRODUCT_TABS, 'aria-label': 'Produktinformationen' },
} satisfies Meta<typeof TabBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithContent: Story = {
  args: { defaultValue: 'origin' },
  render: (args) => (
    <TabBar {...args}>
      {args.items.map((t) => (
        <TabsContent key={t.value} value={t.value} className="type-default-text-s text-content-weak">
          Inhalt {t.label}
        </TabsContent>
      ))}
    </TabBar>
  ),
}
