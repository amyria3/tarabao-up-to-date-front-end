import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Pages: alle Einträge wie unter /de-de/library/pages. */
const meta = {
  title: 'Bibliothek/02 Pages',
  component: CategoryEntries,
  args: { category: 'pages' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Pages in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
