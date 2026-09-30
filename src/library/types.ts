import type { ReactNode } from 'react'

/** Kategorien wie in 2-tarabao/2.2-komponenten-liste.md (groß → klein). */
export const CATEGORIES = [
  {
    key: 'foundations',
    title: 'Grundlagen',
    description: 'Farben je Modus, Textstile, Abstände, Breiten, Höhen, Icons',
  },
  { key: 'pages', title: 'Pages', description: 'Komplette Seiten aus Templates, Sections und Komponenten' },
  { key: 'templates', title: 'Templates', description: 'Seitenrahmen, Section-Vorlage und Karten-Anordnung' },
  { key: 'sections', title: 'Sections', description: 'Seitenabschnitte auf Basis von Templates / Section' },
  { key: 'layout', title: 'Layout', description: 'Aktionsleiste über dem Header' },
  { key: 'navigation', title: 'Navigation', description: 'Header, NavBar, Nav, NavBlocks, Footer' },
  {
    key: 'components',
    title: 'Components',
    description: 'Warenkorb, Filter & Suche, Checkout, Konto, Nussmixer, Produkt',
  },
  { key: 'content-modules', title: 'ContentModules', description: 'Inhaltsbausteine für CMS und Custom-Seiten' },
  { key: 'cards', title: 'Cards', description: 'Produkt-, Kategorie-, Kampagnen- und Inhaltskarten' },
  { key: 'buttons', title: 'Buttons', description: 'Alle Button-Familien mit Form, Zuständen und Farbmodi' },
  { key: 'switches', title: 'Switches', description: 'Umschalter, Auswahlgruppen, Radio und Tabs' },
  { key: 'inputs', title: 'Inputs', description: 'Eingabefelder mit allen Feldtypen' },
  {
    key: 'primitives',
    title: 'Primitives',
    description: 'Überschriften, Absätze, Listen, Tabellen und kleine Bausteine',
  },
] as const

export type CategoryKey = (typeof CATEGORIES)[number]['key']

export type LibraryEntry = {
  /** Anker-ID, z. B. buttons-md-primary */
  id: string
  /** Figma-Name wie in 2.2, z. B. „Buttons / MD / PrimaryButton“ */
  figma: string
  nodeId?: string
  /** Code-Name, z. B. „<Button intent="primary" size="md" />“ */
  code: string
  note?: ReactNode
  render: () => ReactNode
}
