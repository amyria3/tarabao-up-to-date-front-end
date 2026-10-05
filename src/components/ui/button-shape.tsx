import {
  ButtonShapeOblong,
  ButtonShapeOval,
  ButtonShapeVeryOval,
  ButtonShapeVeryOvalTurned,
} from '@/components/icons/figma-icons'
import { cn } from '@/lib/utils'

/** Figma: Button-Shape (7932:33229), Achsen Shape × Turned over? */
export type ButtonShapeKind = 'oblong' | 'oval' | 'very-oval' | 'very-oval-turned'

const SHAPES = {
  oblong: ButtonShapeOblong,
  oval: ButtonShapeOval,
  'very-oval': ButtonShapeVeryOval,
  'very-oval-turned': ButtonShapeVeryOvalTurned,
} as const satisfies Record<ButtonShapeKind, unknown>

export type ButtonShapeProps = {
  shape?: ButtonShapeKind
  /** Farbe der Form über text-* (die Form füllt mit currentColor). */
  className?: string
  /**
   * Kontur der Form (Figma: Stroke auf Button-Shape/Flattened, INSIDE).
   * Farbe über text-*, Stärke über [&_path]:stroke-* bzw. [stroke-width:…].
   * Die Kontur skaliert nicht mit (vector-effect: non-scaling-stroke).
   */
  outlineClassName?: string
}

/**
 * Hintergrundform aller Buttons. Sie misst nie mit, sie folgt: absolut hinter
 * dem Label, streckt sich wie der Figma-Vektor auf Fill/Fill (2.4 Buttons).
 */
export function ButtonShape({ shape = 'oblong', className, outlineClassName }: ButtonShapeProps) {
  const Shape = SHAPES[shape]
  return (
    <>
      <Shape className={cn('pointer-events-none absolute inset-0 size-full', className)} />
      {outlineClassName ? (
        <Shape
          className={cn(
            'pointer-events-none absolute inset-0 size-full [&_path]:fill-none [&_path]:stroke-current [&_path]:stroke-1 [&_path]:[vector-effect:non-scaling-stroke]',
            outlineClassName,
          )}
        />
      ) : null}
    </>
  )
}
