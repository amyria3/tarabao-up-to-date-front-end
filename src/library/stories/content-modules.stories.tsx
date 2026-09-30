import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · ContentModules: alle Einträge wie unter /de-de/library/content-modules. */
const meta = {
  title: 'Bibliothek/08 ContentModules',
  component: CategoryEntries,
  args: { category: 'content-modules' },
  parameters: {
    docs: { description: { component: 'Figma-Komponenten der Kategorie ContentModules in allen Farbmodi.' } },
  },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
