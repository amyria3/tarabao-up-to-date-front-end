import { ProductImage } from '@/components/design-system/visuals/product-image'
import { cn } from '@/lib/utils'

export type ValueKey = 'bio' | 'honesty' | 'fresh' | 'packaging'

export const VALUES: { key: ValueKey; label: string; lines: [string, string?] }[] = [
  { key: 'bio', label: 'Voll Bio', lines: ['Voll', 'Bio'] },
  { key: 'honesty', label: 'Knallhart ehrlich', lines: ['Knallhart', 'ehrlich'] },
  { key: 'fresh', label: 'Immer Frisch', lines: ['Immer', 'Frisch'] },
  { key: 'packaging', label: 'Nachhaltig verpackt', lines: ['nachhaltig verpackt'] },
]

/**
 * Figma: Values (2672:2468) · Property 1=Fresh|Honesty|Packaging|Bio (160 × 199).
 * Illustration als Platzhalterfläche.
 */
export function ValueIllustration({ label, className }: { label: string; className?: string }) {
  return (
    <div role="img" aria-label={label} className={cn('h-50 w-40', className)}>
      <ProductImage />
    </div>
  )
}

/**
 * Figma: ImpactScale (2708:2435) · Property 1=Baum|Mittelding|Setzling|Welt (128 × 128).
 * Stufe der Nachhaltigkeitsskala als Platzhalterfläche.
 */
export function ImpactScale({
  level,
  className,
}: {
  level: 'tree' | 'medium' | 'seedling' | 'world'
  className?: string
}) {
  const label = { tree: 'Baum', medium: 'Mittelding', seedling: 'Setzling', world: 'Welt' }[level]
  return (
    <div role="img" aria-label={`Wirkung: ${label}`} className={cn('size-32', className)}>
      <ProductImage />
    </div>
  )
}

/**
 * Figma: ContentModules / CMS / Editorial (3164:4640). Zeile py-md-l gap-xl bis max-w-content,
 * innen Umbruch gap-md-l: je Wert Titel (H1 Subtitle, zwei Zeilen) über der Illustration (gap-7.5).
 */
export function EditorialValues({ values = VALUES, className }: { values?: typeof VALUES; className?: string }) {
  return (
    <div
      data-slot="editorial-values"
      className={cn('flex w-full max-w-content justify-center gap-xl py-md-l', className)}
    >
      <ul className="flex w-full flex-wrap justify-center gap-md-l">
        {values.map((v) => (
          <li key={v.key} className="flex flex-col gap-7.5">
            <p className="w-40 type-h1-subtitle text-content-text">
              {v.lines[0]}
              {v.lines[1] ? (
                <>
                  <br />
                  {v.lines[1]}
                </>
              ) : null}
            </p>
            <ValueIllustration label={v.label} />
          </li>
        ))}
      </ul>
    </div>
  )
}
