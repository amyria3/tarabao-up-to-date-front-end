import { Footer } from '@modules/layout/templates/footer'
import { Header } from '@modules/layout/components/header'
import { NavBar } from '@modules/layout/components/nav-bar'
import { NavBlock, NavMenu } from '@modules/layout/components/nav-block'
import { SearchAndFilter } from '@modules/search/components/search-and-filter'
import { FILTER_OPTIONS, FOOTER, NAV_GROUPS, PRODUCTS, PROMO } from '@/lib/fixtures'
import { Specimen, ThemeMatrix } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

export const navigationEntries: LibraryEntry[] = [
  {
    id: 'navigation-nav-blocks',
    figma: 'Navigation / NavBlocks',
    nodeId: '3164:5344',
    code: '<NavBlock group={group} />',
    note: 'Ohne Titel stehen die Links im Stil MainCategory (Figma „Andere“, „ALLE PRODUKTE“). Hover: unterstrichen (in Figma nicht festgelegt).',
    render: () => (
      <ThemeMatrix>
        {() => (
          <div className="flex flex-col gap-md-l">
            <NavBlock group={NAV_GROUPS[0]!} />
            <NavBlock group={NAV_GROUPS[8]!} />
            <NavBlock group={NAV_GROUPS[9]!} />
          </div>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'navigation-nav',
    figma: 'Navigation / Nav',
    nodeId: '2761:6772',
    code: '<NavMenu groups={groups} />',
    note: 'Raster base 2, md 3, lg 4 Spalten. Die Zeilenhöhe folgt dem Inhalt.',
    render: () => <NavMenu groups={NAV_GROUPS} />,
  },
  {
    id: 'navigation-nav-bar',
    figma: 'Navigation / NavBar',
    nodeId: '3175:6184',
    code: '<NavBar cartCount={1} loggedIn />',
    note: 'Icons / Tools: Lupe, Burger (offen: Kreuz), Konto (angemeldet oder abgemeldet), Warenkorb (Icons / CartLive mit der Summe der Mengen: leer, 1 bis 9, „9+“).',
    render: () => (
      <div className="flex flex-col gap-md">
        <Specimen label="Default · Warenkorb 1 · angemeldet">
          <NavBar cartCount={1} loggedIn />
        </Specimen>
        <Specimen label="Menü offen · Warenkorb leer">
          <NavBar menuOpen />
        </Specimen>
        <Specimen label="Suche offen · Warenkorb 2">
          <NavBar searchOpen cartCount={2} />
        </Specimen>
        <Specimen label="Warenkorb 12 → „9+“ · abgemeldet">
          <NavBar cartCount={12} />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'navigation-header',
    figma: 'Navigation / Header',
    nodeId: '3175:9316',
    code: '<Header navGroups={groups} promo={promo} cartCount={1} loggedIn />',
    note: 'Klick auf Burger oder Lupe öffnet Menü bzw. Suche, Escape schließt. Im Shop liegt das Menü als Overlay über dem Inhalt; hier im Fluss.',
    render: () => (
      <div className="flex flex-col gap-xl">
        <Specimen label="State=Default">
          <Header navGroups={NAV_GROUPS} promo={PROMO} cartCount={1} loggedIn overlay={false} />
        </Specimen>
        <Specimen label="State=Full">
          <Header navGroups={NAV_GROUPS} promo={PROMO} cartCount={1} loggedIn defaultState="menu" overlay={false} />
        </Specimen>
        <Specimen label="State=Search">
          <Header
            navGroups={NAV_GROUPS}
            promo={PROMO}
            cartCount={1}
            loggedIn
            defaultState="search"
            overlay={false}
            search={<SearchAndFilter filterOptions={FILTER_OPTIONS} products={PRODUCTS} />}
          />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'navigation-footer',
    figma: 'Navigation / Footer',
    nodeId: '6315:16206',
    code: '<Footer footer={footer} />',
    note: 'Platzierung der Gruppen je Breakpoint wie in Figma. Figma md: Kontakt und Bezahlen überlappen; hier bestimmt der Inhalt die Zeilenhöhe.',
    render: () => <Footer footer={FOOTER} />,
  },
]
