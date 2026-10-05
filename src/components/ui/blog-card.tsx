import Link from 'next/link'
import { ProductImage } from '@modules/products/components/product-image'
import type { TeaserModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'
import { CARD_THEME, type HoverProps } from '@/components/ui/card-chrome'

/**
 * Figma: Cards / BlogCard (380:881) · Variant=Blog|Default, State=Default|Hover.
 * h113 (452 px), p-md-l, Fläche surface-color, eigener Schatten (BlogCard).
 * Bild füllt den Rahmen, Titel Cards/Blog/Title: Variant=Blog zentriert, Default linksbündig.
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
        'group/card flex h-113 w-full min-w-card-min max-w-card-max flex-col items-center justify-center gap-[1.875rem] border border-card-btn-hover-click bg-surface p-md-l shadow-card-blog motion-hover',
        'hover:bg-card-surface-hover hover:shadow-card-blog-hover data-hovered:bg-card-surface-hover data-hovered:shadow-card-blog-hover focus-visible:outline-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
    >
      <span className="block min-h-zero w-full flex-1">
        <ProductImage image={post.image} />
      </span>
      <span
        className={cn(
          'w-full type-cards-blog-title text-content-text group-hover/card:underline group-data-hovered/card:underline',
          variant === 'blog' && 'text-center',
        )}
      >
        {post.title}
      </span>
    </Link>
  )
}
