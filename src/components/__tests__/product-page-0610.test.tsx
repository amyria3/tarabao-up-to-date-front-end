import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ProductCard } from '@modules/products/components/product-card'
import { BuyBox } from '@modules/products/components/buy-box'
import { MegaSwitch } from '@/components/ui/mega-switch'
import { PRODUCT_DETAIL } from '@/lib/fixtures'

const DOYPACK = {
  id: 'prod_tamari',
  title: 'Tamari-Sesam-Cashews',
  shortTitle: 'Tamari-Cashews',
  href: '/de-de/products/tamari-sesam-cashews',
  priceLabel: 'ab 5,49 €',
  unitPriceLabel: '(ab 42,23 €/kg)',
  packPriceLabel: '5,49 € / 130 g',
}

describe('Cards / ProductCard / CompactSize', () => {
  it('zeigt Kurzname und Preis je Packung, aber keinen Grundpreis', () => {
    render(<ProductCard product={DOYPACK} size="compact" />)
    expect(screen.getByRole('link', { name: 'Tamari-Cashews' })).toBeTruthy()
    expect(screen.getByText('5,49 € / 130 g')).toBeTruthy()
    expect(screen.queryByText('(ab 42,23 €/kg)')).toBeNull()
  })
  it('hat den runden Schnell-Button, der die Sorte in den Warenkorb legt', () => {
    const onAddToCart = vi.fn()
    const { container } = render(<ProductCard product={DOYPACK} size="compact" onAddToCart={onAddToCart} />)
    const round = container.querySelector('[data-slot=button-card-round]') as HTMLButtonElement
    expect(round.getAttribute('aria-label')).toBe('Rein in den Korb: Tamari-Sesam-Cashews')
    expect(round.className).toContain('md:hidden')
    fireEvent.click(round)
    expect(onAddToCart).toHaveBeenCalledWith('prod_tamari')
  })
  it('DefaultSize bleibt beim vollen Namen mit Grundpreis', () => {
    render(<ProductCard product={DOYPACK} />)
    expect(screen.getByRole('link', { name: 'Tamari-Sesam-Cashews' })).toBeTruthy()
    expect(screen.getByText('(ab 42,23 €/kg)')).toBeTruthy()
  })
})

describe('BuyBox', () => {
  it('setzt w-full am versteckten Titel erst ab lg, damit die Seite unter lg nicht breiter wird', () => {
    render(<BuyBox product={PRODUCT_DETAIL} />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.className).toContain('sr-only')
    expect(h1.className).toContain('lg:w-full')
    expect(h1.className.split(' ')).not.toContain('w-full')
  })
  it('zeigt Preis und Grundpreis in einer Zeile', () => {
    const { container } = render(<BuyBox product={PRODUCT_DETAIL} />)
    const price = container.querySelector('[data-slot=size-and-price] p') as HTMLElement
    expect(price.className).toContain('items-baseline')
    expect(price.className).not.toContain('flex-col')
  })
})

describe('Switches / MegaSwitch', () => {
  it('beschriftet die linke Hälfte wie Figma (Texts & Headlines/Abo/Order once)', () => {
    render(<MegaSwitch aria-label="Bestellart" />)
    expect(screen.getByText('einmal bestellen')).toBeTruthy()
  })
})
