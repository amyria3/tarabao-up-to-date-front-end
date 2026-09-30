import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Grundlagen: alle Einträge wie unter /de-de/library/foundations. */
const meta = {
  title: 'Bibliothek/01 Grundlagen',
  component: CategoryEntries,
  args: { category: 'foundations' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Grundlagen in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
