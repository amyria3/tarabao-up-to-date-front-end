import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Components: alle Einträge wie unter /de-de/library/components. */
const meta = {
  title: 'Bibliothek/07 Components',
  component: CategoryEntries,
  args: { category: 'components' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Components in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
