import { BlogOverviewPage } from '@/components/design-system/pages/shop-pages'
import { FEATURED_BLOG_POST } from '@/lib/fixtures'
import { chrome } from '@/lib/shop/chrome'
import { BLOG_POSTS } from '@/lib/shop/content'
import { routes } from '@/lib/shop/routes'

export const metadata = { title: 'Unser Blog' }

/** Figma {Unser Blog} 8927:28029: die erste Kachel führt zur Rezeptseite, die übrigen sind Platzhalter. */
export default async function BlogRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  const r = routes(countryCode)
  const posts = [
    ...BLOG_POSTS.map((p) => ({ ...FEATURED_BLOG_POST, id: p.slug, title: p.title, href: r.post(p.slug) })),
    ...[1, 2, 3, 4, 5].map((n) => ({ ...FEATURED_BLOG_POST, id: `placeholder_${n}`, href: r.blog })),
  ]
  return <BlogOverviewPage chrome={chrome(countryCode)} posts={posts} />
}
