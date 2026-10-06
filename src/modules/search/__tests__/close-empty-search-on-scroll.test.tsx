import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Header } from '@modules/layout/components/header'
import { SearchAndFilter } from '@modules/search/components/search-and-filter'
import { FILTER_OPTIONS, NAV_GROUPS, PRODUCTS } from '@/lib/fixtures'

vi.mock('next/navigation', () => ({ usePathname: () => '/de-de' }))

// Repo 2.7 · „So schließt sich die Suche beim Scrollen“
describe('Suche schließt sich beim Scrollversuch, solange sie leer ist', () => {
  let now = 0
  beforeEach(() => {
    now = 1000
    vi.spyOn(performance, 'now').mockImplementation(() => now)
  })
  afterEach(() => vi.restoreAllMocks())

  const openSearch = () => {
    render(
      <Header navGroups={NAV_GROUPS} search={<SearchAndFilter filterOptions={FILTER_OPTIONS} products={PRODUCTS} />} />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Suche öffnen' }))
  }
  const searchIsOpen = () => screen.queryByRole('search', { name: 'Produktsuche' }) !== null

  it('ignoriert Scrollversuche in den ersten 300 ms und schließt danach', () => {
    openSearch()
    now += 200
    fireEvent.wheel(window, { deltaY: 40 })
    expect(searchIsOpen()).toBe(true)

    now += 150
    fireEvent.wheel(window, { deltaY: 40 })
    expect(searchIsOpen()).toBe(false)
    expect(screen.getByRole('button', { name: 'Suche öffnen' })).toBeTruthy()
  })

  it('zählt nur senkrechte Bewegungen', () => {
    openSearch()
    now += 400
    fireEvent.wheel(window, { deltaX: 40, deltaY: 5 })
    expect(searchIsOpen()).toBe(true)

    fireEvent.touchStart(window, { touches: [{ clientX: 100, clientY: 100 }] })
    fireEvent.touchMove(window, { touches: [{ clientX: 106, clientY: 108 }] })
    expect(searchIsOpen()).toBe(true)
    fireEvent.touchMove(window, { touches: [{ clientX: 104, clientY: 130 }] })
    expect(searchIsOpen()).toBe(false)
  })

  it('schließt auch beim Scrollen über Tasten oder Scrollleiste', () => {
    openSearch()
    now += 400
    fireEvent.scroll(window)
    expect(searchIsOpen()).toBe(false)
  })

  it('bleibt mit Suchbegriff oder Filter offen', () => {
    openSearch()
    fireEvent.change(screen.getByRole('searchbox', { name: 'Suche' }), { target: { value: 'Cashew' } })
    now += 400
    fireEvent.wheel(window, { deltaY: 40 })
    expect(searchIsOpen()).toBe(true)

    fireEvent.change(screen.getByRole('searchbox', { name: 'Suche' }), { target: { value: '  ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Glutenfrei' }))
    now += 400
    fireEvent.wheel(window, { deltaY: 40 })
    expect(searchIsOpen()).toBe(true)
  })

  it('wartet nach dem Leeren wieder 300 ms', () => {
    openSearch()
    const input = screen.getByRole('searchbox', { name: 'Suche' })
    fireEvent.change(input, { target: { value: 'Cashew' } })
    now += 1000
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.scroll(window)
    expect(searchIsOpen()).toBe(true)

    now += 350
    fireEvent.scroll(window)
    expect(searchIsOpen()).toBe(false)
  })

  it('setzt den Fokus aus der Suche auf das Such-Symbol', () => {
    openSearch()
    screen.getByRole('searchbox', { name: 'Suche' }).focus()
    now += 400
    fireEvent.wheel(window, { deltaY: 40 })
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Suche öffnen' }))
  })

  it('schließt ohne Header nichts (Bibliothek, Storybook)', () => {
    render(<SearchAndFilter filterOptions={FILTER_OPTIONS} products={PRODUCTS} />)
    now += 400
    fireEvent.wheel(window, { deltaY: 40 })
    expect(searchIsOpen()).toBe(true)
  })
})
