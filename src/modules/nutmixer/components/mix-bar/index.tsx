'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { NutmixerInfoTag } from '@/components/ui/category-navigation'
import { IconButton } from '@/components/ui/icon-button'
import { cn } from '@/lib/utils'

export interface MixBarProps {
  /** Füllstand der Packung in Prozent */
  fillPercent: number
  /** Inhalt des Bottom Sheets: die Mischung (Anteile, Mengen, Hinweis zum Preis, Bestellen) */
  children: React.ReactNode
  /** Klassen für die Leiste, z. B. sticky bottom-zero md:hidden im Nussmixer */
  className?: string
}

/** Wischen nach unten ab dieser Strecke (px) schließt das Sheet. */
const SWIPE_CLOSE = 80

/**
 * Figma: Components / Nutmixer / MixBar (10039:83453) · Open?=False|True, nur im Nussmixer auf dem Handy.
 * Open?=False: Leiste mit „Meine Nussmischung“ (Label/default), dem Füllstand (NutmixerTabs · Information)
 * und Buttons / XXS / PrimaryButton „Ansehen“; px-md-l py-md-sm, oben eine Linie in cole-tint-60.
 * Der Nussmixer setzt sie an sein Ende. Dort klebt sie unten am Bildschirm (sticky bottom-zero, md:hidden).
 * Open?=True: Bottom Sheet als modaler <dialog> (fixed unten, max-h-[90dvh], scrollt in sich) mit Griff,
 * „Schließen“ und der Mischung. Kreuz, Escape, Tippen auf den Hintergrund oder Wischen nach unten am Griff
 * schließen es. Solange das Sheet offen ist, scrollt die Seite nicht.
 */
export function MixBar({ fillPercent, children, className }: MixBarProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const [open, setOpen] = React.useState(false)
  const [drag, setDrag] = React.useState(0)
  const startY = React.useRef<number | null>(null)

  const show = () => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    if (typeof dialog.showModal === 'function') dialog.showModal()
    else dialog.setAttribute('open', '')
    setOpen(true)
  }
  const close = () => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (typeof dialog.close === 'function') dialog.close()
    else dialog.removeAttribute('open')
    setOpen(false)
  }

  // Die Seite hinter dem Sheet scrollt nicht mit.
  React.useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [open])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startY.current = e.clientY
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startY.current === null) return
    setDrag(Math.max(0, e.clientY - startY.current))
  }
  const onPointerEnd = () => {
    if (startY.current === null) return
    startY.current = null
    if (drag > SWIPE_CLOSE) close()
    setDrag(0)
  }

  return (
    <>
      <div
        data-slot="mix-bar"
        className={cn(
          'flex w-full flex-col border-t-[0.046875rem] border-(color:--cole-tint-60) bg-surface px-md-l py-md-sm text-content-text',
          className,
        )}
      >
        <div className="flex w-full items-center gap-md">
          <div className="flex min-w-zero flex-1 flex-col items-start gap-xxs">
            <p className="type-label-default">Meine Nussmischung</p>
            <NutmixerInfoTag>{fillPercent} % voll</NutmixerInfoTag>
          </div>
          <Button intent="primary" size="xxs" aria-haspopup="dialog" aria-expanded={open} onClick={show}>
            Ansehen
          </Button>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        data-slot="mix-sheet"
        aria-label="Meine Nussmischung"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        style={drag ? { translate: `0 ${drag}px` } : undefined}
        className={cn(
          'fixed inset-x-zero top-auto bottom-zero m-zero max-h-[90dvh] w-full max-w-none overflow-y-auto overscroll-contain',
          'border-t-[0.046875rem] border-(color:--cole-tint-60) bg-surface p-zero text-content-text backdrop:bg-content-text/40',
          !drag && 'motion-resize',
        )}
      >
        <div className="flex w-full flex-col gap-md-l px-md-l pt-md-sm pb-md-l">
          <div
            aria-hidden
            className="flex w-full cursor-grab touch-none justify-center py-xxs"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
          >
            <span className="h-1 w-10 rounded-full bg-content-weak" />
          </div>
          <div className="flex w-full justify-end">
            <IconButton label="Schließen" onClick={close} />
          </div>
          {open ? children : null}
        </div>
      </dialog>
    </>
  )
}
