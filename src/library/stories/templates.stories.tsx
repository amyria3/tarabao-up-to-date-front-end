import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Templates: alle Einträge wie unter /de-de/library/templates. */
const meta = {
  title: 'Bibliothek/03 Templates',
  component: CategoryEntries,
  args: { category: 'templates' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Templates in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
