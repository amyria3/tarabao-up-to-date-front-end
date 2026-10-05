import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  PortionCalculator as PortionCalculatorComponent,
  RecipeHeader,
  RecipeStep as RecipeStepComponent,
} from '@modules/blog/components/recipe'
import { RECIPE_FACTS, RECIPE_INGREDIENTS, RECIPE_STEPS } from '@/lib/fixtures'

const meta = {
  title: 'Components/RecipeHeader',
  component: RecipeHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Recipe / RecipeHeader (9323:45095). Recipe facts as Information Bubble badges on the left, Buttons / XXS / Inline "Drucken" and "Weiterleiten" on the right; the buttons wrap to the next line when space runs out.',
      },
    },
  },
  args: { facts: RECIPE_FACTS },
} satisfies Meta<typeof RecipeHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const PortionCalculator: Story = {
  render: () => <PortionCalculatorComponent facts={RECIPE_FACTS} ingredients={RECIPE_INGREDIENTS} />,
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Components / Recipe / PortionCalculator (9323:45127). RecipeHeader, H3 "Zutaten" with Buttons / Counter and the ingredient rows; the counter scales the amounts (base: 1 portion).',
      },
    },
  },
}

export const RecipeStep: Story = {
  render: () => (
    <RecipeStepComponent label={RECIPE_STEPS[0]!.label} meta={RECIPE_STEPS[0]!.meta} image={RECIPE_STEPS[0]!.image}>
      {RECIPE_STEPS[0]!.text}
    </RecipeStepComponent>
  ),
  parameters: {
    docs: {
      description: { story: 'Figma: ContentModules / CMS / RecipeStep (9325:70427) · Has Img?=True · Open?=True.' },
    },
  },
}

export const RecipeStepWithoutImage: Story = {
  render: () => (
    <RecipeStepComponent label={RECIPE_STEPS[1]!.label} meta={RECIPE_STEPS[1]!.meta}>
      {RECIPE_STEPS[1]!.text}
    </RecipeStepComponent>
  ),
  parameters: {
    docs: { description: { story: 'Figma: ContentModules / CMS / RecipeStep · Has Img?=False · Open?=True.' } },
  },
}

export const RecipeStepClosed: Story = {
  render: () => (
    <RecipeStepComponent
      label={RECIPE_STEPS[2]!.label}
      meta={RECIPE_STEPS[2]!.meta}
      image={RECIPE_STEPS[2]!.image}
      defaultOpen={false}
    >
      {RECIPE_STEPS[2]!.text}
    </RecipeStepComponent>
  ),
  parameters: {
    docs: { description: { story: 'Figma: ContentModules / CMS / RecipeStep · Open?=False.' } },
  },
}
