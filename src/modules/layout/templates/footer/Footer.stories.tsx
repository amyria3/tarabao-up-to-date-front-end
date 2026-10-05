import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Footer } from '@modules/layout/templates/footer'
import { FOOTER } from '@/lib/fixtures'

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Navigation / Footer (6315:16206). viewport-range=base|md|lg. Line on top, then a grid with logo and slogan, the link groups (Navigation/SideNavigation) and Components / BlockElement Newsletter and Widerruf. Columns: base 2, md 3, lg 4; the placement per breakpoint follows Figma.',
      },
    },
  },
  args: { footer: FOOTER },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
