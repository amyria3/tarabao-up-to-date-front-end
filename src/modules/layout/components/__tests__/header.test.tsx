import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Header } from '@modules/layout/components/header'
import { NAV_GROUPS, PROMO } from '@/lib/fixtures'

const nav = vi.hoisted(() => ({ pathname: '/de-de' }))
vi.mock('next/navigation', () => ({ usePathname: () => nav.pathname }))

describe('Header', () => {
  beforeEach(() => {
    nav.pathname = '/de-de'
  })

  it('schließt das Mega-Menü beim Klick auf einen Link, aber nicht bei Klick mit Zusatztaste', () => {
    render(<Header navGroups={NAV_GROUPS} />)
    fireEvent.click(screen.getByRole('button', { name: 'Navigation öffnen' }))
    const link = screen.getByRole('link', { name: 'Naturbelassen' })
    // jsdom kann nicht navigieren; next/link verhindert die Standardaktion ebenfalls.
    link.addEventListener('click', (e) => e.preventDefault())

    fireEvent.click(link, { metaKey: true })
    expect(screen.getByRole('link', { name: 'Naturbelassen' })).toBeTruthy()

    fireEvent.click(link)
    expect(screen.queryByRole('link', { name: 'Naturbelassen' })).toBeNull()
  })

  it('schließt Menü und Suche nach einem Seitenwechsel', () => {
    const { rerender } = render(<Header navGroups={NAV_GROUPS} search={<p>Suchbereich</p>} />)
    fireEvent.click(screen.getByRole('button', { name: 'Navigation öffnen' }))
    expect(screen.getByRole('link', { name: 'Naturbelassen' })).toBeTruthy()

    nav.pathname = '/de-de/categories/nuesse'
    rerender(<Header navGroups={NAV_GROUPS} search={<p>Suchbereich</p>} />)
    expect(screen.queryByRole('link', { name: 'Naturbelassen' })).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Suche öffnen' }))
    expect(screen.getByText('Suchbereich')).toBeTruthy()
    nav.pathname = '/de-de/products/curry-cashews'
    rerender(<Header navGroups={NAV_GROUPS} search={<p>Suchbereich</p>} />)
    expect(screen.queryByText('Suchbereich')).toBeNull()
  })

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
