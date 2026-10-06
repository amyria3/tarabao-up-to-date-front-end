'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'

import { IconButton } from '@/components/ui/icon-button'
import { NavMenu } from '@modules/layout/components/nav-block'
import { NavBar, type NavBarProps } from '@modules/layout/components/nav-bar'
import { PromoBar } from '@modules/layout/components/promo-bar'
import type { NavGroupModel, PromoModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type HeaderState = 'default' | 'menu' | 'search'

export interface HeaderProps extends Pick<
  NavBarProps,
  'homeHref' | 'accountHref' | 'cartHref' | 'cartCount' | 'loggedIn'
> {
  navGroups: NavGroupModel[]
  promo?: PromoModel
  /** Figma Sections / Search & Filter; erscheint bei State=Search */
  search?: React.ReactNode
  /** Startzustand (Bibliothek, Storybook): Figma State=Default | Full | Search */
  defaultState?: HeaderState
  /**
   * true (Standard): Das Menü liegt als Overlay unter der NavBar (position absolute),
   * wie die Figma-Beschreibung von Navigation / Nav es verlangt. false: im Fluss (Bibliothek).
   */
  overlay?: boolean
  className?: string
}

/**
 * Figma: Navigation / Header (3175:9316) · State=Default|Full|Search.
 * Oben Layout / PromoBar, darunter die NavBar in max-w-content (px-5).
 * Full: IconButton „Navigation schließen“ und Navigation / Nav (Mega-Menü) — beides bleibt
 * Teil der <nav>. Search: IconButton „Suche schließen“ und Sections / Search & Filter —
 * außerhalb der <nav>, da es ein Inhalts-Overlay ist. Escape schließt beides.
 * Ein Klick auf einen Link im Menü oder in der Suche schließt beides sofort. Jeder Seitenwechsel
 * schließt beides ebenfalls, auch Zurück und Vor im Browser.
 */
export function Header({
  navGroups,
  promo,
  search,
  defaultState = 'default',
  overlay = true,
  className,
  ...navBar
}: HeaderProps) {
  const [state, setState] = React.useState<HeaderState>(defaultState)
  const menuId = React.useId()
  const searchId = React.useId()
  const menuToggleRef = React.useRef<HTMLDivElement>(null)

  const close = React.useCallback(() => setState('default'), [])

  // Seitenwechsel: Der Header bleibt im Layout stehen, deshalb setzt der neue Pfad den Zustand zurück
  // (State beim Rendern anpassen statt in einem Effekt).
  const pathname = usePathname()
  const [lastPathname, setLastPathname] = React.useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setState('default')
  }

  // Link im Menü oder in der Suche: sofort schließen, auch wenn er zur aktuellen Seite führt.
  // Klicks mit Zusatztaste öffnen einen neuen Tab, dann bleibt das Menü offen.
  const closeOnLinkClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as HTMLElement).closest('a[href]')
      if (!link || link.getAttribute('target') === '_blank') return
      close()
    },
    [close],
  )

  React.useEffect(() => {
    if (state === 'default') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      close()
      menuToggleRef.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [state, close])

  const menuOpen = state === 'menu'
  const searchOpen = state === 'search'

  return (
    <header
      data-slot="header"
      data-state={state}
      className={cn('relative w-full bg-surface text-content-text', className)}
    >
      {promo ? <PromoBar promo={promo} /> : null}
      <div className="mx-auto flex w-full max-w-content flex-col px-5">
        <nav aria-label="Hauptnavigation">
          <div ref={menuToggleRef}>
            <NavBar
              {...navBar}
              menuOpen={menuOpen}
              searchOpen={searchOpen}
              menuId={menuId}
              searchId={searchId}
              onToggleMenu={() => setState(menuOpen ? 'default' : 'menu')}
              onToggleSearch={() => setState(searchOpen ? 'default' : 'search')}
            />
          </div>
          {menuOpen ? (
            <div
              id={menuId}
              onClick={closeOnLinkClick}
              className={cn(
                'flex flex-col bg-surface',
                overlay && 'absolute inset-x-0 top-full z-40 items-center px-5 pb-md-l',
              )}
            >
              <div className={cn('flex w-full flex-col', overlay && 'max-w-content')}>
                <IconButton label="Navigation schließen" className="self-start" onClick={close} />
                <NavMenu groups={navGroups} />
              </div>
            </div>
          ) : null}
        </nav>
        {searchOpen ? (
          // Der Header klebt oben. Damit lange Trefferlisten erreichbar bleiben, scrollt der offene
          // Suchbereich in sich, sobald er höher als drei Viertel des Bildschirms wird.
          <div
            id={searchId}
            onClick={closeOnLinkClick}
            className="flex max-h-[75dvh] flex-col gap-md overflow-y-auto overscroll-contain pb-md-l"
          >
            <IconButton label="Suche schließen" className="self-start" onClick={close} />
            {search}
          </div>
        ) : null}
      </div>
    </header>
  )
}
