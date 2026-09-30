import Image from 'next/image'

import type { ImageModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface ProductImageProps {
  image?: ImageModel
  /** next/image sizes, z. B. "(min-width: 64rem) 24rem, 100vw" */
  sizes?: string
  priority?: boolean
  className?: string
}

/**
 * Figma: Visuals / Product / Image (205:579, 2531:2860) — Bildfläche mit
 * object-fit: cover. Ohne Bild zeigt sie surface-placeholder wie in Figma.
 * Die Bibliothek lädt keine Bilder aus Figma (nur Platzhalter). Leeres src → Platzhalter.
 */
export function ProductImage({
  image,
  sizes = '(min-width: 64rem) 24rem, 100vw',
  priority,
  className,
}: ProductImageProps) {
  return (
    <div
      data-slot="product-image"
      className={cn('relative size-full overflow-hidden bg-surface-placeholder', className)}
    >
      {image?.src ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : null}
    </div>
  )
}
