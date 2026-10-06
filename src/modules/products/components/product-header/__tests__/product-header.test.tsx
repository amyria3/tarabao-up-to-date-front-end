import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ProductHeader } from '@modules/products/components/product-header'
import { PRODUCT_DETAIL } from '@/lib/fixtures'

/** Der Schnellbutton steht in der Galerie vor der BuyBox, also zuerst im DOM. */
const quickButton = () => screen.getAllByRole('button', { name: 'In den Warenkorb' })[0]!

/** Simuliert die Zeile: liegt die BuyBox tiefer als die Galerie, ist die Zeile umgebrochen. */
function mockLayout(wrapped: boolean) {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    },
  )
  vi.spyOn(HTMLElement.prototype, 'offsetTop', 'get').mockImplementation(function (this: HTMLElement) {
    return wrapped && this.dataset.slot === 'buy-box' ? 500 : 0
  })
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('ProductHeader · Schnellbutton', () => {
  it('legt die aktuelle Auswahl der BuyBox in den Warenkorb', () => {
    mockLayout(true)
    const onAddToCart = vi.fn()
    render(<ProductHeader product={PRODUCT_DETAIL} onAddToCart={onAddToCart} />)
    fireEvent.click(screen.getByRole('radio', { name: '0,5 kg' }))
    fireEvent.click(screen.getByRole('switch', { name: 'Bestellart' }))
    fireEvent.click(quickButton())
    expect(onAddToCart).toHaveBeenCalledWith({ productId: PRODUCT_DETAIL.id, variantId: 'bulk', subscription: true })
  })

  it('zeigt sich, sobald die BuyBox unter die Galerie umbricht', () => {
    mockLayout(true)
    render(<ProductHeader product={PRODUCT_DETAIL} />)
    expect(quickButton().className).not.toMatch(/(^|\s)(md:)?hidden(\s|$)/)
  })

  it('bleibt verborgen, solange Galerie und BuyBox nebeneinander stehen', () => {
    mockLayout(false)
    render(<ProductHeader product={PRODUCT_DETAIL} />)
    expect(quickButton().className).toMatch(/(^|\s)hidden(\s|$)/)
  })

  it('folgt ohne Messung der Figma-Regel: nur unter md', () => {
    vi.stubGlobal('ResizeObserver', undefined)
    render(<ProductHeader product={PRODUCT_DETAIL} />)
    expect(quickButton().className).toMatch(/(^|\s)md:hidden(\s|$)/)
  })
})
