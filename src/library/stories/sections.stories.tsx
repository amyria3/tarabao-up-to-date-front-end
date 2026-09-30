import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Sections: alle Einträge wie unter /de-de/library/sections. */
const meta = {
  title: 'Bibliothek/04 Sections',
  component: CategoryEntries,
  args: { category: 'sections' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Sections in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
