import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CartSummary } from '@modules/cart/components/cart-summary'
import { BasicWithDisclosure } from '@/components/LexicalRenderers/BasicWithDisclosure'
import { Nutmixer } from '@modules/nutmixer/components/nutmixer'
import { BuyBox } from '@modules/products/components/buy-box'
import { Disclosure } from '@modules/products/components/disclosure'
import { CollapsibleSection } from '@modules/account/components/account-sections'
import { DiscoveryCardSection } from '@/components/LexicalRenderers/CardRow'
import {
  CART,
  DISCOVERY_ROW,
  EMPTY_CART,
  NUTMIXER_CATEGORIES_DEMO,
  NUTMIXER_PRODUCTS,
  PRODUCT_DETAIL,
} from '@/lib/fixtures'

describe('Disclosure', () => {
  it('klappt auf und meldet den Zustand über aria-expanded', () => {
    render(
      <Disclosure title="Inhaltsstoffe">
        <p>Kakaomasse</p>
      </Disclosure>,
    )
    const button = screen.getByRole('button', { name: 'Inhaltsstoffe' })
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(screen.getByText('Kakaomasse').closest('[role=region]')!.hasAttribute('hidden')).toBe(true)
    fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText('Kakaomasse').closest('[role=region]')!.hasAttribute('hidden')).toBe(false)
  })

  it('öffnet im Overlay-Zustand nichts selbst', () => {
    render(<Disclosure title="Ladensuche" overlay />)
    const button = screen.getByRole('button', { name: 'Ladensuche' })
    expect(button.hasAttribute('aria-expanded')).toBe(false)
    expect(button.getAttribute('aria-haspopup')).toBe('dialog')
  })
})

describe('BuyBox', () => {
  it('zeigt den Preis der gewählten Packungsgröße', () => {
    render(<BuyBox product={PRODUCT_DETAIL} />)
    expect(screen.getByText('5,49 €')).toBeTruthy()
    fireEvent.click(screen.getByRole('radio', { name: '8 × 130 g' }))
    expect(screen.getByText('41,75 €')).toBeTruthy()
    fireEvent.click(screen.getByRole('radio', { name: '0,5 kg' }))
    expect(screen.getByText('16,95 €')).toBeTruthy()
  })
})

describe('Nutmixer', () => {
  it('aktiviert „Nussmix bestellen“ erst, wenn die Packung voll ist', () => {
    render(<Nutmixer categories={NUTMIXER_CATEGORIES_DEMO} products={NUTMIXER_PRODUCTS} capacityGrams={150} />)
    const order = screen.getByRole('button', { name: 'Nussmix bestellen' }) as HTMLButtonElement
    expect(order.disabled).toBe(true)
    // Jede Karte hat zwei Buttons mit diesem Namen: den runden Schnell-Button (unter md) und den
    // Hover-Button (ab md). Das CSS blendet je einen aus, jsdom kennt kein CSS. Deshalb zählt hier
    // nur der Hover-Button, ein Button je Karte.
    const add = screen
      .getAllByRole('button', { name: /Zur Mischung: Nussname/ })
      .filter((b) => b.dataset.slot !== 'button-card-round')
    fireEvent.click(add[0]!)
    expect(order.disabled).toBe(true)
    fireEvent.click(add[1]!)
    expect(order.disabled).toBe(false)
    // Voll: weitere Zutaten passen nicht mehr hinein
    fireEvent.click(add[2]!)
    expect(screen.getAllByText(/^Nussname$/, { selector: 'p' }).length).toBe(2)
  })
})

describe('DiscoveryCardSection', () => {
  it('legt die Karten in Reihen zu höchstens drei', () => {
    const teasers = [...DISCOVERY_ROW, { ...DISCOVERY_ROW[0]!, id: 'x4' }, { ...DISCOVERY_ROW[1]!, id: 'x5' }]
    const { container } = render(<DiscoveryCardSection title="Partnerinnen" teasers={teasers} />)
    const rows = container.querySelectorAll('[data-slot=discovery-card-row]')
    expect(rows.length).toBe(2)
    expect(within(rows[0] as HTMLElement).getAllByRole('listitem').length).toBe(3)
    expect(within(rows[1] as HTMLElement).getAllByRole('listitem').length).toBe(2)
  })
})

describe('CollapsibleSection', () => {
  it('zeigt den Inhalt erst nach dem Aufklappen', () => {
    render(
      <CollapsibleSection title="Deine Daten">
        <p>Profil</p>
      </CollapsibleSection>,
    )
    expect(screen.queryByText('Profil')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Deine Daten' }))
    expect(screen.getByText('Profil')).toBeTruthy()
  })
})

describe('BasicWithDisclosure', () => {
  it('zeigt Siegel nur im offenen Zustand', () => {
    render(<BasicWithDisclosure title="Zertifizierungen" text="Text" signets={2} />)
    expect(screen.queryByRole('list', { name: 'Zertifizierungen' })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Zertifizierungen' }))
    expect(screen.getByRole('list', { name: 'Zertifizierungen' })).toBeTruthy()
  })
})

describe('CartSummary', () => {
  it('zeigt den leeren Warenkorb und sonst Artikel und Summe', () => {
    const { rerender } = render(<CartSummary cart={EMPTY_CART} />)
    expect(screen.getByText('Warenkorb ist noch leer :)')).toBeTruthy()
    rerender(<CartSummary cart={CART} />)
    expect(screen.getByRole('heading', { name: 'Dein Warenkorb' })).toBeTruthy()
    expect(screen.getByText(CART.totals.totalLabel)).toBeTruthy()
  })
})
