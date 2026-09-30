import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CategoryEntries } from '@/library/category-view'

/** Bibliothek · Inputs: alle Einträge wie unter /de-de/library/inputs. */
const meta = {
  title: 'Bibliothek/12 Inputs',
  component: CategoryEntries,
  args: { category: 'inputs' },
  parameters: { docs: { description: { component: 'Figma-Komponenten der Kategorie Inputs in allen Farbmodi.' } } },
} satisfies Meta<typeof CategoryEntries>

export default meta
type Story = StoryObj<typeof meta>

export const Alle: Story = {}
