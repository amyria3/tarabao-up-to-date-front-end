import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Layout: alle Einträge wie unter /de-de/library/layout. */
const meta = {
  title: 'Bibliothek/05 Layout',
  component: CategoryEntries,
  args: { category: 'layout' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Layout in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
