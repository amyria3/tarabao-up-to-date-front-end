import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'

import { DefaultParagraph } from '@/components/ui/typography'
import { Ingredients, NutritionTable } from '@modules/products/components/product-info'
import {
  AccordionSection as AccordionSectionComponent,
  ProductTabsSection,
  SectionTabsAsAccordion as SectionTabsAsAccordionComponent,
  SectionTabsOverlay as SectionTabsOverlayComponent,
  ShiftBetweenContent as ShiftBetweenContentComponent,
} from '@modules/products/components/product-tabs'
import { PRODUCT_TABS } from '@/lib/design-system/tabs'
import { PRODUCT_DETAIL, PRODUCT_TABS_CONTENT, REVIEW, REVIEW_LIKED } from '@/lib/fixtures'
import { LOREM } from '@/lib/shop/content'

const REVIEWS = [REVIEW, REVIEW_LIKED, { ...REVIEW, id: 'rev_3' }, { ...REVIEW_LIKED, id: 'rev_4' }]
const NUTRITION_TAB = PRODUCT_TABS.find((tab) => tab.value === 'nutrition')!
const ACCORDION_ITEMS = [
  { title: 'Herkunft', content: <DefaultParagraph size="lg">{LOREM}</DefaultParagraph> },
  { title: 'Aufbewahrung', content: <DefaultParagraph size="lg">{LOREM}</DefaultParagraph> },
  { title: 'Inhaltsstoffe', content: <Ingredients ingredients={PRODUCT_DETAIL.ingredients!} /> },
  { title: 'Nährwerte', content: <NutritionTable nutrition={PRODUCT_DETAIL.nutrition!} /> },
]

const meta = {
  title: 'Components/ProductTabsSection',
  component: ProductTabsSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Sections / Tabs / SectionTabsAndContent (8945:32929). Not configurable in Figma: fixed tabs (Buttons / XS / TabBar) with content from product and CMS: about this product, packaging & storage, ingredients & nutrition, manufacture, reviews. One story per Selected? tab.',
      },
    },
  },
  args: { product: PRODUCT_DETAIL, content: PRODUCT_TABS_CONTENT, reviews: REVIEWS },
} satisfies Meta<typeof ProductTabsSection>

export default meta
type Story = StoryObj<typeof meta>

/** Selected?=Über dieses Produkt */
export const Default: Story = {}

export const Packaging: Story = {
  args: { defaultTab: 'packaging' },
}

export const Nutrition: Story = {
  args: { defaultTab: 'nutrition' },
}

export const Manufacture: Story = {
  args: { defaultTab: 'manufacture' },
}

export const Reviews: Story = {
  args: { defaultTab: 'reviews' },
}

export const SectionTabsAsAccordion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Sections / Tabs / SectionTabsAsAccordion (9361:46117). Replaces the tabs in base: one Components / Disclosure (State=Overlay) per tab; a click opens Sections / Tabs / SectionTabsOverlay with that tab.',
      },
    },
  },
  render: () => (
    <SectionTabsAsAccordionComponent product={PRODUCT_DETAIL} content={PRODUCT_TABS_CONTENT} reviews={REVIEWS} />
  ),
}

export const SectionTabsOverlay: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Sections / Tabs / SectionTabsOverlay (9355:45830). Full-screen dialog with back arrow, title and the content of one tab, shown open with "Inhalt & Nährwerte". The docs page renders it in an iframe because the dialog is modal.',
      },
      story: { inline: false, height: '40rem' },
    },
  },
  render: () => (
    <SectionTabsOverlayComponent
      open
      onClose={fn()}
      panel={{
        ...NUTRITION_TAB,
        content: (
          <div className="flex w-full flex-col">
            <Ingredients ingredients={PRODUCT_DETAIL.ingredients!} />
            <NutritionTable nutrition={PRODUCT_DETAIL.nutrition!} />
          </div>
        ),
      }}
    />
  ),
}

export const ShiftBetweenContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Sections / Tabs / ShiftBetweenContent (9417:44116) · viewport-range=lg|md|base. From md SectionTabsAndContent, below SectionTabsAsAccordion; the selected tab persists across the switch. Resize the viewport to switch.',
      },
    },
  },
  render: () => (
    <ShiftBetweenContentComponent product={PRODUCT_DETAIL} content={PRODUCT_TABS_CONTENT} reviews={REVIEWS} />
  ),
}

/** viewport-range=base: the accordion list replaces the tabs. */
export const ShiftBetweenContentBase: Story = {
  globals: { viewport: { value: 'mobile2', isRotated: false } },
  render: () => (
    <ShiftBetweenContentComponent product={PRODUCT_DETAIL} content={PRODUCT_TABS_CONTENT} reviews={REVIEWS} />
  ),
}

export const AccordionSection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Sections / Accordion (6604:17023) · ContainsText?=True. H2, then CMS / Editorial (H3) and Components / Disclosure rows.',
      },
    },
  },
  render: () => (
    <AccordionSectionComponent
      title="Herkunft, Aufbewahrung & Nährwerte"
      intro={{ headline: 'Unser Nachhaltigkeitsranking', columns: [LOREM, LOREM] }}
      items={ACCORDION_ITEMS}
    />
  ),
}

/** Sections / Accordion · ContainsText?=False */
export const AccordionSectionWithoutText: Story = {
  render: () => <AccordionSectionComponent title="Herkunft, Aufbewahrung & Nährwerte" items={ACCORDION_ITEMS} />,
}
