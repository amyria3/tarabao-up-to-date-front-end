import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite'

import { IconDelivery } from '@/components/icons/figma-icons'
import {
  BUTTON_FAMILIES,
  BUTTON_FIGMA_NAMES,
  Button,
  buttonFamilyProps,
  type ButtonFamily,
} from '@/components/ui/button'
import { ThemeScope } from '@/components/ui/theme-scope'
import { LIVELY_THEMES, type LivelyTheme } from '@/lib/design-system/themes'

/** Figma node of each button family (Buttons / LG … XXXS). */
const NODE_IDS: Record<ButtonFamily, string> = {
  'primary-lg': '509:1251',
  'primary-lg-plain': '509:1251',
  'inline-lg': '2342:2047',
  'primary-md': '2310:2156',
  'secondary-md': '2342:2052',
  'primary-md-oval': '10197:52492',
  'secondary-md-oval': '10197:54714',
  'card-md': '10131:52168',
  'primary-sm': '2342:2053',
  'inline-sm': '2359:3245',
  'card-sm': '7932:33160',
  'primary-xxs': '2328:2172',
  'secondary-xxs': '3911:18672',
  'inline-xxs': '3517:8568',
  'inline-xxxs': '6799:20185',
}

const figma = (family: ButtonFamily) => `${BUTTON_FIGMA_NAMES[family]} (${NODE_IDS[family]})`

/** One story per Figma family: intent and size from the family key. */
function familyStory(family: ButtonFamily): Story {
  const { intent, size, megaCard } = buttonFamilyProps(family)
  return {
    args: { intent, size, ...(megaCard === false ? { megaCard } : {}) },
    parameters: { docs: { description: { story: `Figma: ${figma(family)}.` } } },
  }
}

/**
 * LG buttons use the tokens of Clrs / Mega Cards and follow data-lively-theme.
 * The campaign comes from the toolbar; without one the first campaign is pinned.
 */
const livelyTheme: Decorator = (Story, context) => {
  const lively = context.globals.lively as LivelyTheme | '—' | undefined
  return (
    <ThemeScope livelyTheme={lively && lively !== '—' ? lively : LIVELY_THEMES[0]} className="p-md">
      <Story />
    </ThemeScope>
  )
}

const meta = {
  title: 'Components/UI/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Figma: ${figma('primary-md')}. Valid families (intent-size): ${BUTTON_FAMILIES.map(
          (f) => `${f} = ${figma(f)}`,
        ).join(
          ', ',
        )}. Other combinations fall back to the nearest Figma size. LG buttons follow data-lively-theme (Clrs / Mega Cards).`,
      },
    },
  },
  args: { intent: 'primary', size: 'md', children: 'In den Warenkorb' },
  argTypes: {
    intent: { control: 'inline-radio', options: ['primary', 'secondary', 'inline', 'card'] },
    size: { control: 'inline-radio', options: ['lg', 'md', 'sm', 'xxs', 'xxxs'] },
    width: { control: 'inline-radio', options: [undefined, 'fill', 'hug'] },
    shape: { control: 'select', options: [undefined, 'oblong', 'oval', 'very-oval', 'very-oval-turned'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = familyStory('primary-md')

export const Hover: Story = {
  args: { forceHover: true },
  parameters: { docs: { description: { story: `Figma: ${figma('primary-md')} · Hover?=True.` } } },
}

export const Disabled: Story = {
  args: { disabled: true },
  parameters: { docs: { description: { story: `Figma: ${figma('primary-md')} · Inactive?=True.` } } },
}

export const WithIcon: Story = {
  args: { icon: <IconDelivery aria-hidden className="size-6" /> },
  parameters: { docs: { description: { story: `Figma: ${figma('primary-md')} · Show Icon?=True.` } } },
}

export const HugContent: Story = {
  args: { intent: 'primary', size: 'md-oval', width: 'hug', children: 'Kündigung zurücknehmen' },
  parameters: { docs: { description: { story: `Figma: ${figma('primary-md-oval')} · Hug content?=True.` } } },
}

export const PrimaryLg: Story = { ...familyStory('primary-lg'), decorators: [livelyTheme] }

export const InlineLg: Story = { ...familyStory('inline-lg'), decorators: [livelyTheme] }

export const SecondaryMd: Story = familyStory('secondary-md')

export const PrimarySm: Story = familyStory('primary-sm')

export const PrimaryLgPlain: Story = familyStory('primary-lg-plain')

export const PrimaryMdOval: Story = familyStory('primary-md-oval')

export const SecondaryMdOval: Story = familyStory('secondary-md-oval')

export const CardMd: Story = {
  ...familyStory('card-md'),
  args: { intent: 'card', size: 'md', children: 'Call to action' },
}

export const InlineSm: Story = familyStory('inline-sm')

export const CardSm: Story = {
  ...familyStory('card-sm'),
  args: { intent: 'card', size: 'sm', children: 'Call to action' },
}

export const PrimaryXxs: Story = familyStory('primary-xxs')

export const SecondaryXxs: Story = familyStory('secondary-xxs')

export const InlineXxs: Story = familyStory('inline-xxs')

export const InlineXxxs: Story = familyStory('inline-xxxs')
