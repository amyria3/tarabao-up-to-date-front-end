import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Switches: alle Einträge wie unter /de-de/library/switches. */
const meta = {
  title: 'Bibliothek/11 Switches',
  component: CategoryEntries,
  args: { category: 'switches' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Switches in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
