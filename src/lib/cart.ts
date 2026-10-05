import type { CartModel } from '@/lib/view-models'

/** Summe der Mengen im Warenkorb (Figma: das Warenkorb-Symbol zeigt 1–9, ab 10 „9+“). */
export function cartQuantity(cart: Pick<CartModel, 'items'>): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0)
}
