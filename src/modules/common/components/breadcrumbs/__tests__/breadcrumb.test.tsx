import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Breadcrumb } from '@modules/common/components/breadcrumbs'

const ITEMS = [
  { label: 'Startseite', href: '/de-de' },
  { label: 'Shop', href: '/de-de/categories' },
  { label: 'Pulver & Süßungsmittel', href: '/de-de/categories/pulver-und-suessungsmittel' },
  { label: 'Pflanzendrink-Pulver' },
]

describe('Breadcrumb', () => {
  it('zeigt die Startseite als Dots mit Link und Namen', () => {
    render(<Breadcrumb items={ITEMS} />)
    const nav = screen.getByRole('navigation', { name: 'Brotkrumen' })
    const home = within(nav).getByRole('link', { name: 'Startseite' })
    expect(home.getAttribute('href')).toBe('/de-de')
    expect(home.textContent).toBe('')
  })

  it('verlinkt die Ebenen dazwischen und markiert die aktuelle Seite', () => {
    render(<Breadcrumb items={ITEMS} />)
    const nav = screen.getByRole('navigation', { name: 'Brotkrumen' })
    expect(within(nav).getByRole('link', { name: 'Shop' }).getAttribute('href')).toBe('/de-de/categories')
    expect(within(nav).getByRole('link', { name: 'Pulver & Süßungsmittel' })).toBeTruthy()
    const current = within(nav).getByText('Pflanzendrink-Pulver')
    expect(current.getAttribute('aria-current')).toBe('page')
    expect(within(nav).queryByRole('link', { name: 'Pflanzendrink-Pulver' })).toBeNull()
  })
})
