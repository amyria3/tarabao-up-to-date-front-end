import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Header } from '@modules/layout/components/header'
import { NAV_GROUPS, PROMO } from '@/lib/fixtures'

describe('Header', () => {
  it('öffnet das Mega-Menü in der <nav> und schließt es mit Escape', () => {
    render(<Header navGroups={NAV_GROUPS} promo={PROMO} />)
    const nav = screen.getByRole('navigation', { name: 'Hauptnavigation' })
    const toggle = screen.getByRole('button', { name: 'Navigation öffnen' })
    expect(toggle.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(toggle)
    const opened = screen.getAllByRole('button', { name: 'Navigation schließen' })[0]!
    expect(opened.getAttribute('aria-expanded')).toBe('true')
    const panel = document.getElementById(opened.getAttribute('aria-controls')!)
    expect(panel).not.toBeNull()
    expect(nav.contains(panel)).toBe(true)
    expect(screen.getByRole('link', { name: 'Naturbelassen' })).toBeTruthy()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('link', { name: 'Naturbelassen' })).toBeNull()
  })

  it('legt die Suche außerhalb der <nav> ab', () => {
    render(<Header navGroups={NAV_GROUPS} search={<p>Suchbereich</p>} />)
    fireEvent.click(screen.getByRole('button', { name: 'Suche öffnen' }))
    const nav = screen.getByRole('navigation', { name: 'Hauptnavigation' })
    const search = screen.getByText('Suchbereich')
    expect(nav.contains(search)).toBe(false)
  })

  it('wählt das Warenkorb-Icon nach Anzahl und nennt sie im Label', () => {
    render(<Header navGroups={NAV_GROUPS} cartCount={2} />)
    expect(screen.getByRole('link', { name: 'Warenkorb, 2 Artikel' })).toBeTruthy()
  })
})
