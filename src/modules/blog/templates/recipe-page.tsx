import type { BreadcrumbProps } from '@modules/common/components/breadcrumbs'
import { PageBreadcrumb } from '@modules/common/components/breadcrumbs/page-breadcrumb'
import { DefaultParagraph, HeadlineH1, HeadlineH2 } from '@/components/ui/typography'
import { PortionCalculator, type PortionCalculatorProps, RecipeStep } from '@modules/blog/components/recipe'
import { ImageCarouselSection } from '@/components/LexicalRenderers/ImageCarousel'
import { Section } from '@/components/ui/section'
import type { ImageCardModel, RecipeStepModel } from '@/lib/view-models'

/**
 * Figma: Rezeptseite {Blog / Recipe} (Templates / Page 9618:28958): Templates / Section mit H1,
 * Primitives / DefaultParagraph (Intro), Components / Recipe / PortionCalculator, H2 „Zubereitung“ und
 * je Schritt ContentModules / CMS / RecipeStep; darunter Sections / ImageCarousel.
 */
export function RecipePage({
  breadcrumb,
  title,
  intro,
  calculator,
  steps,
  images,
  stepsTitle = 'Zubereitung',
  imagesTitle = 'Bilder zum Rezept',
}: {
  breadcrumb?: BreadcrumbProps
  title: string
  intro: string
  calculator: PortionCalculatorProps
  steps: RecipeStepModel[]
  images: ImageCardModel[]
  stepsTitle?: string
  imagesTitle?: string
}) {
  return (
    <>
      {breadcrumb ? <PageBreadcrumb {...breadcrumb} className="pt-md-l" /> : null}
      <Section aria-label={title}>
        <HeadlineH1>{title}</HeadlineH1>
        <DefaultParagraph size="lg">{intro}</DefaultParagraph>
        <PortionCalculator {...calculator} />
        <HeadlineH2>{stepsTitle}</HeadlineH2>
        {steps.map((step) => (
          <RecipeStep key={step.id} label={step.label} meta={step.meta} image={step.image}>
            {step.text}
          </RecipeStep>
        ))}
      </Section>
      <ImageCarouselSection title={imagesTitle} cards={images} />
    </>
  )
}
