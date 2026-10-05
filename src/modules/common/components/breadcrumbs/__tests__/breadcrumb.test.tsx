import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Breadcrumb, hiddenStationCount } from '@modules/common/components/breadcrumbs'

const ITEMS = [
  { label: 'Startseite', href: '/de-de' },
  { label: 'Shop', href: '/de-de/categories' },
  { label: 'Pulver & Süßungsmittel', href: '/de-de/categories/pulver-und-suessungsmittel' },
  { label: 'Pflanzendrink-Pulver' },
]

/** Breiten wie gemessen: „Du bist hier:“ 70, Dots 16, Startseite 60, danach je Station mit Pfeil. */
const WIDTHS = { gap: 12, lead: 70, dots: 16, first: 60, steps: [50, 150, 120] }
/** Ganzer Pfad: 70 + 12 + 60 + (12 + 50) + (12 + 150) + (12 + 120) = 498 */
const FULL = 498

describe('Breadcrumb', () => {
  it('zeigt die Startseite als Text mit Link, solange der Pfad passt', () => {
    render(<Breadcrumb items={ITEMS} />)
    const nav = screen.getByRole('navigation', { name: 'Brotkrumen' })
    const home = within(nav).getByRole('link', { name: 'Startseite' })
    expect(home.getAttribute('href')).toBe('/de-de')
    expect(home.textContent).toBe('Startseite')
    expect(within(nav).getAllByRole('listitem')).toHaveLength(ITEMS.length + 1)
  })

  it('verlinkt die Ebenen dazwischen und markiert die aktuelle Seite', () => {
    render(<Breadcrumb items={ITEMS} />)
    const nav = screen.getByRole('navigation', { name: 'Brotkrumen' })
    expect(within(nav).getByRole('link', { name: 'Shop' }).getAttribute('href')).toBe('/de-de/categories')
    expect(within(nav).getByRole('link', { name: 'Pulver & Süßungsmittel' })).toBeTruthy()
    const current = nav.querySelector('[aria-current="page"]')
    expect(current?.textContent).toBe('Pflanzendrink-Pulver')
    expect(within(nav).queryByRole('link', { name: 'Pflanzendrink-Pulver' })).toBeNull()
  })
})

describe('hiddenStationCount', () => {
  it('blendet keine Station aus, wenn der ganze Pfad passt', () => {
    expect(hiddenStationCount({ ...WIDTHS, available: FULL })).toBe(0)
  })

  it('ersetzt zuerst die Startseite durch die Dots', () => {
    // Dots statt Startseite: 70 + 12 + 16 + 62 + 162 + 132 = 454
    expect(hiddenStationCount({ ...WIDTHS, available: FULL - 1 })).toBe(1)
    expect(hiddenStationCount({ ...WIDTHS, available: 454 })).toBe(1)
  })

  it('verdeckt weitere Stationen von vorn, bis die Zeile passt', () => {
    // ohne Shop: 70 + 12 + 16 + 162 + 132 = 392
    expect(hiddenStationCount({ ...WIDTHS, available: 453 })).toBe(2)
    expect(hiddenStationCount({ ...WIDTHS, available: 392 })).toBe(2)
  })

  it('lässt zuletzt nur die aktuelle Seite stehen', () => {
    expect(hiddenStationCount({ ...WIDTHS, available: 391 })).toBe(3)
    expect(hiddenStationCount({ ...WIDTHS, available: 100 })).toBe(3)
  })
})
