import type { CategoryKey, LibraryEntry } from './types'
import { buttonEntries } from './entries/buttons'
import { accountEntries } from './entries/account'
import { cardEntries } from './entries/cards'
import { cartEntries } from './entries/cart'
import { checkoutEntries } from './entries/checkout'
import { nutmixerEntries } from './entries/nutmixer'
import { pageEntries, pageTemplateEntry } from './entries/pages'
import { productEntries } from './entries/product'
import { componentEntries } from './entries/components'
import { contentModuleEntries } from './entries/content-modules'
import { foundationEntries } from './entries/foundations'
import { inputEntries } from './entries/inputs'
import { layoutEntries } from './entries/layout'
import { navigationEntries } from './entries/navigation'
import { primitiveEntries } from './entries/primitives'
import { sectionEntries } from './entries/sections'
import { switchEntries } from './entries/switches'
import { templateEntries } from './entries/templates'

/** Bibliothek je Kategorie. Neue Einträge kommen in src/library/entries/*. */
export const LIBRARY: Record<CategoryKey, LibraryEntry[]> = {
  foundations: foundationEntries,
  pages: pageEntries,
  templates: [...templateEntries, pageTemplateEntry],
  sections: sectionEntries,
  layout: layoutEntries,
  navigation: navigationEntries,
  components: [
    ...componentEntries,
    ...productEntries,
    ...nutmixerEntries,
    ...cartEntries,
    ...checkoutEntries,
    ...accountEntries,
  ],
  'content-modules': contentModuleEntries,
  cards: cardEntries,
  buttons: buttonEntries,
  switches: switchEntries,
  inputs: inputEntries,
  primitives: primitiveEntries,
}
