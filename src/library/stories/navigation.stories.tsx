import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Navigation: alle Einträge wie unter /de-de/library/navigation. */
const meta = {
  title: 'Bibliothek/06 Navigation',
  component: CategoryEntries,
  args: { category: 'navigation' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Navigation in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
