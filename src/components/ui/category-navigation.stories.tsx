import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  NutmixerCategoryNavigation,
  NutmixerInfoTag as NutmixerInfoTagComponent,
  NutmixerTab as NutmixerTabComponent,
  SustainabilityCategoryButton as SustainabilityCategoryButtonComponent,
  SustainabilityCategoryNavigation as SustainabilityCategoryNavigationComponent,
} from '@/components/ui/category-navigation'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { NUTMIXER_CATEGORIES } from '@/lib/design-system/nutmixer'
import { SUSTAINABILITY_CATEGORIES } from '@/lib/design-system/sustainability'

const meta = {
  title: 'Components/UI/CategoryNavigation',
  component: NutmixerCategoryNavigation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Switches / NutmixerCategoryNavigation (8555:24862). Wrapping tablist of NutmixerTabs · Selected=Nüsse|Beeren|Obst. Needs a surrounding <Tabs> that holds the value; the same file holds the sustainability navigation.',
      },
    },
  },
} satisfies Meta<typeof NutmixerCategoryNavigation>

export default meta
type Story = StoryObj<typeof meta>

/** The navigation only works inside <Tabs>, which holds the selected category. */
export const Default: Story = {
  decorators: [
    (Story) => (
      <Tabs defaultValue="nuesse" className="w-full">
        <Story />
        {NUTMIXER_CATEGORIES.map((c) => (
          <TabsContent key={c.value} value={c.value} className="type-default-text-s text-content-weak">
            Inhalt {c.label}
          </TabsContent>
        ))}
      </Tabs>
    ),
  ],
}

export const NutmixerTab: Story = {
  render: () => <NutmixerTabComponent>Nüsse</NutmixerTabComponent>,
  parameters: {
    docs: { description: { story: 'Figma: NutmixerTabs (8557:28249) · Variant=Navigtion, SelectedTab?=False.' } },
  },
}

export const NutmixerTabSelected: Story = {
  render: () => <NutmixerTabComponent selected>Nüsse</NutmixerTabComponent>,
  parameters: { docs: { description: { story: 'Figma: NutmixerTabs (8557:28249) · SelectedTab?=True.' } } },
}

export const NutmixerTabWithIcon: Story = {
  render: () => (
    <NutmixerTabComponent selected showIcon>
      Nüsse
    </NutmixerTabComponent>
  ),
  parameters: {
    docs: { description: { story: 'Figma: NutmixerTabs (8557:28249) · SelectedTab?=True, Show Icon?=True.' } },
  },
}

export const NutmixerInfoTag: Story = {
  render: () => <NutmixerInfoTagComponent>Nüsse 30%</NutmixerInfoTagComponent>,
  parameters: {
    docs: {
      description: {
        story: 'Figma: NutmixerTabs (8557:28249) · Variant=Information. Shows the shares in the Nutmixer.',
      },
    },
  },
}

export const SustainabilityCategoryNavigation: Story = {
  render: () => (
    <Tabs defaultValue="transportation" className="w-full">
      <SustainabilityCategoryNavigationComponent />
      {SUSTAINABILITY_CATEGORIES.map((c) => (
        <TabsContent key={c.key} value={c.key} className="pt-md type-default-text-s text-content-weak">
          Inhalt {c.label}
        </TabsContent>
      ))}
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Switches / SustainabilitCategoryNavigation (8126:25292) · Selected=No Plane|Umwelt|Fairness|Engagement. Tab values are the category keys.',
      },
    },
  },
}

export const SustainabilityCategoryButton: Story = {
  render: () => (
    <div className="flex flex-wrap gap-md-sm">
      {SUSTAINABILITY_CATEGORIES.map((c) => (
        <SustainabilityCategoryButtonComponent key={c.key} category={c.key}>
          {c.label}
        </SustainabilityCategoryButtonComponent>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Figma: SustainabilitCategoryNavigationButton (8125:24713) · SelectedTab?=False, one per category.',
      },
    },
  },
}

export const SustainabilityCategoryButtonHover: Story = {
  render: () => (
    <div className="flex flex-wrap gap-md-sm">
      {SUSTAINABILITY_CATEGORIES.map((c) => (
        <SustainabilityCategoryButtonComponent key={c.key} category={c.key} forceHover>
          {c.label}
        </SustainabilityCategoryButtonComponent>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Figma: SustainabilitCategoryNavigationButton (8125:24713) · Hover.' } },
  },
}

export const SustainabilityCategoryButtonSelected: Story = {
  render: () => (
    <div className="flex flex-wrap gap-md-sm">
      {SUSTAINABILITY_CATEGORIES.map((c) => (
        <SustainabilityCategoryButtonComponent key={c.key} category={c.key} selected>
          {c.label}
        </SustainabilityCategoryButtonComponent>
      ))}
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Figma: SustainabilitCategoryNavigationButton (8125:24713) · SelectedTab?=True.' } },
  },
}
