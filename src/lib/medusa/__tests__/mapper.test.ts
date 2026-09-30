import { describe, expect, it } from 'vitest'

import { formatMoney, toCart, toProductCard } from '@/lib/medusa/mapper'

type ProductArg = Parameters<typeof toProductCard>[0]
type CartArg = Parameters<typeof toCart>[0]

const variant = (id: string, amount: number, weight: number) => ({
  id,
  title: `${weight / 1000} kg`,
  weight,
  calculated_price: { id: `ps_${id}`, calculated_amount: amount },
})

describe('mapper', () => {
  it('formatiert Beträge in Euro', () => {
    expect(formatMoney(19.9, { currencyCode: 'eur' })).toBe('19,90 €')
  })

  it('baut eine ProductCard aus der günstigsten Variante mit Grundpreis', () => {
    const product = {
      id: 'prod_1',
      title: 'Schokolierte Himbeeren',
      handle: 'schokolierte-himbeeren',
      thumbnail: null,
      weight: null,
      variants: [variant('v2', 37.99, 1000), variant('v1', 19.99, 500)],
    } as unknown as ProductArg
    const card = toProductCard(product, { countryCode: 'de-de', currencyCode: 'eur' })
    expect(card.href).toBe('/de-de/products/schokolierte-himbeeren')
    expect(card.priceLabel).toBe('ab 19,99 €')
    expect(card.unitPriceLabel).toBe('(ab 39,98 €/kg)')
    expect(card.image).toBeUndefined()
  })

  it('baut den Warenkorb mit Artikeln und Summen', () => {
    const cart = {
      id: 'cart_1',
      currency_code: 'eur',
      item_subtotal: 19.9,
      shipping_total: 4.99,
      total: 24.89,
      items: [
        {
          id: 'li_1',
          title: '0.5kg',
          product_title: 'Himbeeren',
          product_handle: 'himbeeren',
          quantity: 1,
          unit_price: 19.9,
          total: 19.9,
          variant_title: '0.5kg',
        },
      ],
    } as unknown as CartArg
    const model = toCart(cart, { countryCode: 'de-de' })
    expect(model.items[0]!.title).toBe('Himbeeren')
    expect(model.items[0]!.href).toBe('/de-de/products/himbeeren')
    expect(model.totals.totalLabel).toBe('24,89 €')
  })
})
