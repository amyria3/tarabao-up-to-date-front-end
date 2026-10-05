import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ICON_REGISTRY } from '@/components/icons/figma-icons'
import {
  CarouselArrowHugeLeft,
  CarouselArrowHugeRight,
  CarouselArrowSmLeft,
  CarouselArrowSmRight,
  CarouselNavShapeHuge,
  CarouselNavShapeSm,
  CounterShape,
  IconChevronDown14,
  IconChevronDown6,
  IconChevronUp14,
  IconChevronUp6,
} from '@/components/icons/figma-shapes'

/**
 * Exports of figma-shapes.tsx. Shapes without their own size (preserveAspectRatio none)
 * get the box of the component that uses them (CarouselNav, Counter).
 */
const SHAPES = [
  {
    name: 'CarouselNavShapeHuge',
    figma: 'Buttons / CarouselNav · Size=Huge, Form (2038:4883)',
    Component: CarouselNavShapeHuge,
    className: 'h-[4.25rem] w-[4.625rem]',
  },
  {
    name: 'CarouselNavShapeSm',
    figma: 'Buttons / CarouselNav · Size=SM, Form (2531:3044)',
    Component: CarouselNavShapeSm,
    className: 'h-btn-md w-[2.875rem]',
  },
  {
    name: 'CarouselArrowHugeLeft',
    figma: 'Buttons / CarouselNav · Pfeil Seite SVG, Huge links',
    Component: CarouselArrowHugeLeft,
  },
  {
    name: 'CarouselArrowHugeRight',
    figma: 'Buttons / CarouselNav · Pfeil Seite SVG, Huge rechts',
    Component: CarouselArrowHugeRight,
  },
  {
    name: 'CarouselArrowSmLeft',
    figma: 'Buttons / CarouselNav · Pfeil Seite SVG, SM links',
    Component: CarouselArrowSmLeft,
  },
  {
    name: 'CarouselArrowSmRight',
    figma: 'Buttons / CarouselNav · Pfeil Seite SVG, SM rechts',
    Component: CarouselArrowSmRight,
  },
  {
    name: 'CounterShape',
    figma: 'Buttons / Counter · Rahmen (2442:2492)',
    Component: CounterShape,
    className: 'h-[2.375rem] w-[5.1875rem]',
  },
  {
    name: 'IconChevronDown14',
    figma: 'ArrowUpOrDown · Variant=down, Size=14 (2607:2589)',
    Component: IconChevronDown14,
  },
  { name: 'IconChevronUp14', figma: 'ArrowUpOrDown · Variant=up, Size=14 (2607:2592)', Component: IconChevronUp14 },
  { name: 'IconChevronDown6', figma: 'ArrowUpOrDown · Variant=down, Size=6 (2598:2491)', Component: IconChevronDown6 },
  { name: 'IconChevronUp6', figma: 'ArrowUpOrDown · Variant=up, Size=6 (2598:2839)', Component: IconChevronUp6 },
] as const

const meta = {
  title: 'Components/Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Figma: Icons (B2C und CI). ${ICON_REGISTRY.length} icons as React components from figma-icons.tsx, color via currentColor (text-*), plus the button shapes and arrows from figma-shapes.tsx.`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AllIcons: Story = {
  render: () => (
    <ul className="grid grid-cols-2 gap-sm md:grid-cols-4 lg:grid-cols-6">
      {ICON_REGISTRY.map(({ name, figma, nodeId, Component }) => (
        <li key={name} className="flex flex-col items-center gap-xs border border-content-weak/20 p-sm text-center">
          <span className="relative flex h-12 w-full items-center justify-center text-content-text">
            {/* Button-Shape vectors have no own size and stretch to the box. */}
            <Component className={name.startsWith('ButtonShape') ? 'h-btn-xx-sm w-full' : 'max-h-12 max-w-full'} />
          </span>
          <code className="type-default-text-s break-all">{name}</code>
          <span className="type-default-text-s text-content-weak">
            {figma} ({nodeId})
          </span>
        </li>
      ))}
    </ul>
  ),
}

export const Shapes: Story = {
  render: () => (
    <ul className="grid grid-cols-2 gap-sm md:grid-cols-4 lg:grid-cols-6">
      {SHAPES.map((shape) => (
        <li
          key={shape.name}
          className="flex flex-col items-center gap-xs border border-content-weak/20 p-sm text-center"
        >
          <span className="flex h-20 w-full items-center justify-center text-content-text">
            <shape.Component className={'className' in shape ? shape.className : undefined} />
          </span>
          <code className="type-default-text-s break-all">{shape.name}</code>
          <span className="type-default-text-s text-content-weak">{shape.figma}</span>
        </li>
      ))}
    </ul>
  ),
}
