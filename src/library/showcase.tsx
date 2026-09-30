import type { ReactNode } from 'react'

import { ThemeScope } from '@/components/ui/theme-scope'
import { GLOBAL_THEMES, type GlobalTheme } from '@/lib/design-system/themes'
import { cn } from '@/lib/utils'

const FIGMA_FILE = 'https://www.figma.com/design/rLwATluwV4CSS5rXceLptH/B2C-und-CI'

export function figmaUrl(nodeId: string) {
  return `${FIGMA_FILE}?node-id=${nodeId.replace(':', '-')}&m=dev`
}

/** Kopf eines Bibliothekseintrags: Figma-Name, Link, Code-Name. */
export function EntryHeader({
  figma,
  nodeId,
  code,
  note,
}: {
  figma: string
  nodeId?: string
  code: string
  note?: ReactNode
}) {
  return (
    <header className="flex flex-col gap-xxs">
      <h2 className="type-h3 text-content-loud-headline">{figma}</h2>
      <p className="type-default-text-s text-content-weak">
        <code className="font-body">{code}</code>
        {nodeId ? (
          <>
            {' · '}
            <a className="underline" href={figmaUrl(nodeId)} target="_blank" rel="noreferrer">
              Figma {nodeId}
            </a>
          </>
        ) : null}
      </p>
      {note ? <div className="type-default-text-md text-content-text">{note}</div> : null}
    </header>
  )
}

/** Ein Zustand oder eine Variante mit Beschriftung. */
export function Specimen({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <figure className={cn('flex min-w-zero flex-col gap-xs', className)}>
      <figcaption className="type-default-text-s text-content-weak">{label}</figcaption>
      <div className="flex min-w-zero flex-wrap items-center gap-sm">{children}</div>
    </figure>
  )
}

/** Rendert denselben Inhalt in allen vier Farbmodi (Clrs / Color Modes). */
export function ThemeMatrix({
  children,
  themes = GLOBAL_THEMES,
  columns = 4,
  columnClassName,
}: {
  children: (theme: GlobalTheme) => ReactNode
  themes?: readonly GlobalTheme[]
  /** Spalten ab lg: 4 (Standard), 2 für breite Komponenten, 1 für volle Breite. */
  columns?: 1 | 2 | 4
  columnClassName?: string
}) {
  const grid = { 1: 'grid-cols-1', 2: 'grid-cols-1 lg:grid-cols-2', 4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' }[
    columns
  ]
  return (
    <div className={cn('grid gap-sm', grid)}>
      {themes.map((theme) => (
        <ThemeScope key={theme} theme={theme} className={cn('flex flex-col gap-md rounded-sm p-md', columnClassName)}>
          <p className="type-navigation-endpoint text-content-weak">{theme}</p>
          {children(theme)}
        </ThemeScope>
      ))}
    </div>
  )
}

/** Rahmen eines Eintrags auf der Bibliotheksseite. */
export function Entry({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-xl flex-col gap-md border-t border-content-weak/20 pt-lg">
      {children}
    </section>
  )
}
