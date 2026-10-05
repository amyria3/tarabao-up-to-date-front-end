import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as React from 'react'

import {
  ImageCard as ImageCardComponent,
  ImageCarouselSection,
  ImageOverlay as ImageOverlayComponent,
} from '@/components/LexicalRenderers/ImageCarousel'
import { RECIPE_IMAGES } from '@/lib/fixtures'

const meta = {
  title: 'Components/LexicalRenderers/ImageCarousel',
  component: ImageCarouselSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Sections / ImageCarousel (9334:47556). H2, scrolling row of Cards / ImageCard and Primitives / CarouselPagination; a click on a card opens Components / OverlayComponents / Image.',
      },
    },
  },
  args: { title: 'Bilder zum Rezept', cards: RECIPE_IMAGES },
} satisfies Meta<typeof ImageCarouselSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ImageCard: Story = {
  render: () => <ImageCardComponent card={RECIPE_IMAGES[0]!} />,
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Figma: Cards / ImageCard (9324:45224). Image 240 × 144 with caption.' } },
  },
}

export const ImageCardHover: Story = {
  render: () => <ImageCardComponent card={RECIPE_IMAGES[1]!} forceHover />,
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Figma: Cards / ImageCard · Hover. The eye icon covers the image.' } },
  },
}

export const ImageOverlay: Story = {
  render: function Render() {
    const [index, setIndex] = React.useState<number | null>(0)
    return (
      <>
        <ImageCardComponent card={RECIPE_IMAGES[0]!} onClick={() => setIndex(0)} />
        <ImageOverlayComponent cards={RECIPE_IMAGES} index={index} onIndexChange={setIndex} />
      </>
    )
  },
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, height: '48rem' },
      description: {
        story:
          'Figma: Components / OverlayComponents / Image (9325:70380). Modal dialog with caption, close button, large image and pagination; opens on load, the card reopens it.',
      },
    },
  },
}
