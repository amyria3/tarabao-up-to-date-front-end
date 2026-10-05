import type * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Gemeinsamer Rahmen der Checkout-Schritte (Figma Components / Checkout / Identification,
 * DeliveryAddress, Payment, FinalCheckout): Fläche surface-color, pt/px lg, pb-7,
 * min-w-block-min, max-w-block-max. Abstand der Kinder je Schritt (gap-md oder gap-xl).
 */
export function CheckoutBlock({
  gap = 'md',
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { gap?: 'md' | 'md-l' | 'xl' }) {
  return (
    <section
      data-slot="checkout-block"
      className={cn(
        'flex w-full min-w-block-min max-w-block-max flex-col bg-surface px-lg pt-lg pb-7 text-content-text',
        { md: 'gap-md', 'md-l': 'gap-md-l', xl: 'gap-xl' }[gap],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

/** ShoppingCart & Checkout/MainHeadline, max-w-128 */
export function CheckoutHeadline({
  as: Tag = 'h2',
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' }) {
  return (
    <Tag
      className={cn('w-full max-w-128 type-shopping-cart-checkout-main-headline text-content-text', className)}
      {...props}
    />
  )
}
