import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Buttons: alle Einträge wie unter /de-de/library/buttons. */
const meta = {
  title: 'Bibliothek/10 Buttons',
  component: CategoryEntries,
  args: { category: 'buttons' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Buttons in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
