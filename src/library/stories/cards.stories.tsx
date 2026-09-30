import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Cards: alle Einträge wie unter /de-de/library/cards. */
const meta = {
  title: 'Bibliothek/09 Cards',
  component: CategoryEntries,
  args: { category: 'cards' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Cards in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
