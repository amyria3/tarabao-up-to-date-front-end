import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Primitives: alle Einträge wie unter /de-de/library/primitives. */
const meta = {
  title: 'Bibliothek/13 Primitives',
  component: CategoryEntries,
  args: { category: 'primitives' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Primitives in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
