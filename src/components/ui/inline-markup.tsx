import Link from 'next/link'
import * as React from 'react'

import { cn } from '@/lib/utils'

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/

export interface InlineMarkupProps {
  /** Text mit **fett** und [Linktext](/pfad) */
  text: string
  linkClassName?: string
}

/**
 * Setzt kurze Redaktionstexte mit Auszeichnung um, wie Figma sie in Fließtexten
 * nutzt (z. B. Cards / MegaCard): **fett** → <strong>, [Text](href) → Link
 * (fett + unterstrichen). Interne Pfade laufen über next/link, externe öffnen
 * einen neuen Tab. Alles andere bleibt reiner Text, kein HTML.
 */
export function InlineMarkup({ text, linkClassName }: InlineMarkupProps) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (!part) return null
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-bold">
              {part.slice(2, -2)}
            </strong>
          )
        }
        const link = LINK.exec(part)
        if (link) {
          const [, label, href] = link as unknown as [string, string, string]
          const className = cn(
            'font-bold underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
            linkClassName,
          )
          return href.startsWith('/') || href.startsWith('#') ? (
            <Link key={i} href={href} className={className}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={className}>
              {label}
            </a>
          )
        }
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}
