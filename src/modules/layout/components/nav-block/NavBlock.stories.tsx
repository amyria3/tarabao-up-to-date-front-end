import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { NavBlock, NavMenu as NavMenuComponent } from '@modules/layout/components/nav-block'
import { NAV_GROUPS } from '@/lib/fixtures'

const meta = {
  title: 'Components/NavBlock',
  component: NavBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Navigation / NavBlocks (3164:5344). Link group in the <nav>: heading Navigation/FullScreen/MainCategory, links Navigation/FullScreen/SubCategory. Without a title (Figma „Andere“, „ALLE PRODUKTE“) the links themselves use MainCategory. Hover underlines (not defined in Figma).',
      },
    },
  },
  args: { group: NAV_GROUPS[0]! },
} satisfies Meta<typeof NavBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutTitle: Story = {
  args: { group: NAV_GROUPS[8]! },
  parameters: { docs: { description: { story: 'Figma „Andere“: links in the style MainCategory.' } } },
}

export const SingleLink: Story = {
  args: { group: NAV_GROUPS[9]! },
  parameters: { docs: { description: { story: 'Figma „Nussmixer“: a single link without a title.' } } },
}

export const NavMenu: Story = {
  render: () => <NavMenuComponent groups={NAV_GROUPS} />,
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Navigation / Nav (2761:6772). Grid of NavBlocks: base 2, md 3, lg 4 columns. Row height follows the content.',
      },
    },
  },
}
