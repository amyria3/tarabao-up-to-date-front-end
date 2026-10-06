import { FeaturedCard } from '@/components/ui/featured-card'
import { HeadlineH1 } from '@/components/ui/typography'
import { CardsOrder } from '@/components/ui/cards-order'
import { Section } from '@/components/ui/section'
import type { TeaserModel } from '@/lib/view-models'

/**
 * Figma: Unser Blog (Templates / Page 8927:28029). Templates / Section: H1 „Unser Blog“ und
 * Templates / Cards Order · Tiles mit Cards / FeaturedCard · BlogPost.
 */
export function BlogOverviewPage({ posts }: { posts: TeaserModel[] }) {
  return (
    <>
      <Section aria-label="Unser Blog">
        <HeadlineH1>Unser Blog</HeadlineH1>
        <CardsOrder variant="tiles" className="items-stretch gap-md">
          {posts.map((p) => (
            <li key={p.id} className="flex">
              <FeaturedCard teaser={p} variant="blog-post" />
            </li>
          ))}
        </CardsOrder>
      </Section>
    </>
  )
}
