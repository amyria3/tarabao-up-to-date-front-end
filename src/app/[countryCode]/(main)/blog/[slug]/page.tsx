import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RecipePage } from '@modules/blog/templates/recipe-page'
import { RECIPE_FACTS, RECIPE_IMAGES, RECIPE_INGREDIENTS, RECIPE_STEPS } from '@/lib/fixtures'
import { BLOG_POSTS } from '@/lib/shop/content'
import { routes } from '@/lib/shop/routes'

type Params = Promise<{ countryCode: string; slug: string }>

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  return { title: BLOG_POSTS.find((p) => p.slug === slug)?.title ?? 'Blog' }
}

/** Figma {Blog / Recipe} 9618:28958. */
export default async function PostRoute({ params }: { params: Params }) {
  const { countryCode, slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()
  const r = routes(countryCode)
  return (
    <RecipePage
      breadcrumb={{
        items: [{ label: 'Startseite', href: r.home }, { label: 'Unser Blog', href: r.blog }, { label: post.title }],
      }}
      title={post.title}
      intro={post.intro}
      calculator={{ facts: RECIPE_FACTS, ingredients: RECIPE_INGREDIENTS }}
      steps={RECIPE_STEPS}
      images={RECIPE_IMAGES}
    />
  )
}
