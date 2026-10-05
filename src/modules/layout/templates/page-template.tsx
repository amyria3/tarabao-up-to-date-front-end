import type * as React from 'react'

import type { HeaderProps } from '@modules/layout/components/header'
import { Nav } from '@modules/layout/templates/nav'
import { Footer } from '@modules/layout/templates/footer'
import type { BreadcrumbProps } from '@modules/common/components/breadcrumbs'
import { AddedToCartOverlay, type AddedToCartItem } from '@modules/common/components/added-to-cart-overlay'
import { PageBreadcrumb } from '@modules/common/components/breadcrumbs/page-breadcrumb'
import type { FooterModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface PageTemplateProps {
  header: HeaderProps
  footer: FooterModel
  /** Figma Primitives / Breadcrumb unter dem Header (Produkt- und Kategorieseiten) */
  breadcrumb?: BreadcrumbProps
  /** Section-Slots 1–10: Sections untereinander */
  children: React.ReactNode
  /**
   * Figma overlay/ADDED TO CARD: oberste Ebene der Seite, fixiert, erscheint nach „In den Warenkorb“.
   * `null` blendet es aus; der Aufrufer setzt den Artikel nach dem Hinzufügen.
   */
  addedToCart?: AddedToCartItem | null
  onAddedToCartClose?: () => void
  className?: string
}

/**
 * Figma: Templates / Page (8358:53818), Aufbau nach 2.7 Layout: Header (sticky), main und Footer
 * sind Geschwister. In main folgen optional PageBreadcrumb (klebt unter dem Header, weicht beim
 * Scrollen nach unten aus) und die Sections direkt,
 * ohne Element für den Section-Slot. main.flex-1 hält den Footer bei kurzem Inhalt unten.
 * Die Höhe kommt nicht aus Figma (min-h-dvh); nur der Bildschirm scrollt. Oberste Ebene ist
 * overlay/ADDED TO CARD als fixierter Dialog (AddedToCartOverlay).
 */
export function PageTemplate({
  header,
  footer,
  breadcrumb,
  children,
  addedToCart = null,
  onAddedToCartClose,
  className,
}: PageTemplateProps) {
  return (
    <div
      data-slot="page"
      className={cn(
        'flex min-h-dvh w-full min-w-content flex-col items-center bg-surface text-content-text',
        className,
      )}
    >
      <Nav {...header} className={cn('sticky top-0 z-50', header.className)} />
      <main id="inhalt" className="flex w-full flex-1 flex-col items-center">
        {breadcrumb ? <PageBreadcrumb {...breadcrumb} className="pt-md-l" /> : null}
        {children}
      </main>
      <Footer footer={footer} />
      <AddedToCartOverlay item={addedToCart} onClose={onAddedToCartClose} />
    </div>
  )
}
