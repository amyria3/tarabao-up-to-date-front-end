import { describe, expect, it } from 'vitest'

import { NAV_GROUPS } from '@/lib/fixtures'
import {
  CATALOG,
  CATEGORY_TREE,
  categoryBreadcrumb,
  findCategory,
  findProduct,
  productBreadcrumb,
} from '@/lib/shop/catalog'
import { routes } from '@/lib/shop/routes'

describe('Katalog wie in der Storefront', () => {
  it('führt jeden Kategorie-Link der Navigation zu einem flachen Handle', () => {
    const hrefs = NAV_GROUPS.flatMap((g) => g.links.map((l) => l.href)).filter((h): h is string =>
      Boolean(h?.includes('/categories/')),
    )
    expect(hrefs.length).toBeGreaterThan(0)
    for (const href of hrefs) {
      const handle = href.split('/categories/')[1]
      expect(handle).not.toContain('/')
      expect(findCategory(handle), href).toBeDefined()
    }
  })

  it('vergibt jeden Handle nur einmal', () => {
    const handles = CATEGORY_TREE.flatMap((c) => [c.slug, ...c.children.map((s) => s.slug)])
    expect(new Set(handles).size).toBe(handles.length)
  })

  it('baut die Breadcrumb einer Unterkategorie: Startseite → Shop → Oberkategorie → Kategorie', () => {
    const found = findCategory('pflanzendrink-pulver')!
    const { items } = categoryBreadcrumb(found, 'de-de')
    expect(items.map((i) => i.label)).toEqual(['Startseite', 'Shop', 'Pulver & Süßungsmittel', 'Pflanzendrink-Pulver'])
    expect(items[1].href).toBe(routes('de-de').categories)
    expect(items[2].href).toBe('/de-de/categories/pulver-und-suessungsmittel')
    expect(items[3].href).toBeUndefined()
  })

  it('baut die Breadcrumb eines Produkts bis zum Produkt', () => {
    const product = findProduct('jancys-curry-cashews')!
    const { items } = productBreadcrumb(product, 'de-de')
    expect(items.map((i) => i.label)).toEqual(['Startseite', 'Shop', 'Nüsse', 'Würzige Snacks', 'Jancys Curry-Cashews'])
    expect(items[3].href).toBe('/de-de/categories/wuerzige-snacks')
  })

  it('ordnet jedes Produkt einer bekannten Unterkategorie zu', () => {
    for (const p of CATALOG) expect(findCategory(p.category[1])?.parent?.slug, p.handle).toBe(p.category[0])
  })
})
