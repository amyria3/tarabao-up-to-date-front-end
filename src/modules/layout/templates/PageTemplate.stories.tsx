import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PageTemplate } from '@modules/layout/templates/page-template'
import { ContentBasic } from '@/components/LexicalRenderers/ContentBasic'
import { Section } from '@/components/ui/section'
import { CART, FOOTER, NAV_GROUPS, PROMO } from '@/lib/fixtures'
import { categoryBreadcrumb, findCategory } from '@/lib/shop/catalog'
import { LOREM } from '@/lib/shop/content'

const meta = {
  title: 'Components/PageTemplate',
  component: PageTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          'Figma: Templates / Page (8358:53818). Sticky header, main with the optional PageBreadcrumb and up to ten section slots, footer. The top layer is overlay/ADDED TO CARD (AddedToCartOverlay, fixed).',
      },
      // Each page renders in its own frame, so the sticky header, the scroll behaviour and the overlay stay in it.
      story: { inline: false, iframeHeight: '40rem' },
    },
  },
  args: {
    header: { navGroups: NAV_GROUPS, promo: PROMO, cartCount: 1, loggedIn: true },
    footer: FOOTER,
    breadcrumb: categoryBreadcrumb(findCategory('pflanzendrink-pulver')!, 'de-de'),
    children: (
      <Section aria-label="Section-Slot">
        <ContentBasic headline="Section-Slot" paragraphs={[LOREM]} />
      </Section>
    ),
  },
} satisfies Meta<typeof PageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutBreadcrumb: Story = {
  args: { breadcrumb: undefined },
  parameters: { docs: { description: { story: 'Pages without a breadcrumb (e.g. home page, cart).' } } },
}

export const AddedToCart: Story = {
  args: { addedToCart: { productTitle: CART.items[0]!.title, priceLabel: CART.items[0]!.totalLabel } },
  parameters: { docs: { description: { story: 'overlay/ADDED TO CARD is open after „In den Warenkorb“.' } } },
}
