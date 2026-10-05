import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Section } from '@/components/ui/section'
import { HeadlineH2 } from '@/components/ui/typography'
import { Breadcrumb } from '@modules/common/components/breadcrumbs'

const meta = {
  title: 'Components/UI/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Templates / Section (8308:40715). Page section with a centered wrapper (max-w-content). Slots get no element of their own: the content follows directly in the wrapper. theme pins the color mode, breadcrumb stands before the first slot (Display Breadcrumps?).',
      },
    },
  },
  args: {
    children: (
      <>
        <HeadlineH2>Überschrift im ersten Slot</HeadlineH2>
        <p className="type-default-text-lg">Inhalt im zweiten Slot</p>
      </>
    ),
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithTheme: Story = {
  args: { theme: 'purple-tint-surface-snow' },
}

export const WithBreadcrumb: Story = {
  args: {
    breadcrumb: (
      <Breadcrumb
        items={[
          { label: 'Startseite', href: '#' },
          { label: 'Bereich der Webseite', href: '#' },
          { label: 'Überkategorie', href: '#' },
          { label: 'Your current destination' },
        ]}
      />
    ),
  },
}
