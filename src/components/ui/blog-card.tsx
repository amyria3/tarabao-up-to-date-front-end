import Link from 'next/link'
import { ProductImage } from '@modules/products/components/product-image'
import type { TeaserModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { CARD_THEME, type HoverProps } from '@/components/ui/card-chrome'

/**
 * Figma: Cards / BlogCard (380:881) · Variant=Blog|Default, State=Default|Hover.
 * 288 × 344 px (Cards/BlogCard/max-w, fix-h), Rand 16 px (frame), Abstand Bild–Titel 24 px (gap),
 * Fläche surface-color, eigener Schatten (BlogCard). Bild füllt den Rahmen, Titel Cards/Blog/Title
 * in höchstens zwei Zeilen: Variant=Blog zentriert, Default linksbündig.
 * Ganze Karte verlinkt.
 */
export function BlogCard({
  post,
  variant = 'default',
  forceHover,
  className,
}: { post: TeaserModel; variant?: 'blog' | 'default' } & HoverProps) {
  return (
    <Link
      href={post.href ?? '#'}
      data-slot="blog-card"
      {...CARD_THEME}
      data-variant={variant}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card flex h-card-blog w-full min-w-card-blog-min max-w-card-blog-max flex-col items-center justify-center gap-card-blog-gap border border-card-btn-hover-click bg-surface p-card-blog-frame shadow-card motion-hover',
        'hover:bg-card-surface-hover hover:shadow-card-hover data-hovered:bg-card-surface-hover data-hovered:shadow-card-hover focus-visible:outline-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
    >
      <span className="block min-h-zero w-full flex-1">
        <ProductImage image={post.image} />
      </span>
      <span
        className={cn(
          'line-clamp-2 w-full type-cards-blog-title text-content-text group-hover/card:underline group-data-hovered/card:underline',
          variant === 'blog' && 'text-center',
        )}
      >
        {post.title}
      </span>
    </Link>
  )
}
