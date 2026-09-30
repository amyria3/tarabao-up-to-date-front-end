import Link from 'next/link'
import * as React from 'react'

import { IconChevronRight14, IconDots } from '@/components/design-system/icons/figma-icons'
import { cn } from '@/lib/utils'

export type BreadcrumbItem = { label: string; href?: string }

export interface BreadcrumbProps {
  /** Pfad ohne aktuelle Seite */
  items: BreadcrumbItem[]
  /** Aktuelle Seite (Navigation/Endpoint, content-weak) */
  current: string
  /** Figma zeigt Icons / Dots für ausgelassene Ebenen */
  collapsed?: boolean
  className?: string
}

/**
 * Figma: Primitives / Breadcrumb (3155:5202).
 * Zeile h20 px-md-l, rechtsbündig, max-w-content: „Du bist hier:“, Dots,
 * je Ebene Pfeil (arrow right 14) + Navigation/Route, zuletzt Navigation/Endpoint.
 */
export function Breadcrumb({ items, current, collapsed = true, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Brotkrumen" className={cn('flex w-full px-md-l', className)}>
      <ol className="flex w-full max-w-content flex-wrap items-center justify-end gap-md-sm">
        <li className="type-navigation-endpoint text-content-weak">Du bist hier:</li>
        {collapsed ? (
          <li aria-hidden className="flex h-5 w-4 items-center justify-center text-content-text">
            <IconDots />
          </li>
        ) : null}
        {items.map((item) => (
          <li key={item.label} className="flex h-5 items-center gap-sm">
            <IconChevronRight14 aria-hidden className="text-content-text" />
            {item.href ? (
              <Link href={item.href} className="type-navigation-route text-content-text">
                {item.label}
              </Link>
            ) : (
              <span className="type-navigation-route text-content-text">{item.label}</span>
            )}
          </li>
        ))}
        <li className="flex h-5 items-center gap-sm">
          <IconChevronRight14 aria-hidden className="text-content-text" />
          <span aria-current="page" className="type-navigation-endpoint text-content-weak">
            {current}
          </span>
        </li>
      </ol>
    </nav>
  )
}
