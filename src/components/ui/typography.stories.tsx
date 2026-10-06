import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  BulletedList as BulletedListComponent,
  DefaultParagraph as DefaultParagraphComponent,
  Footnote as FootnoteComponent,
  HeadlineH1,
  HeadlineH2 as HeadlineH2Component,
  HeadlineH3 as HeadlineH3Component,
  InlineQuestion as InlineQuestionComponent,
  UserMessageExplanation as UserMessageExplanationComponent,
} from '@/components/ui/typography'
import { PRODUCT_TABS_CONTENT } from '@/lib/fixtures'

const HEADLINE = 'Nährwerte & Inhalt'
const SUBTITLE = PRODUCT_TABS_CONTENT.about.headline
const PARAGRAPH =
  'Dieser Absatz charakterisiert den Snack, erzählt etwas über seine Geschichte, wie es in unser Sortiment kommt, erwähnt soziale / ökologische Benefits und lobt die geschmacklichen Qualitäten des Snacks.'

const meta = {
  title: 'Components/UI/Typography',
  component: HeadlineH1,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Primitives / Headline / H1 (7565:23672). Style=Default|Sbtile, Align=Left|Center; Default renders an <h1> with pb-md, Subtitle a <p>. The further stories show the other text primitives of typography.tsx.',
      },
    },
  },
  args: { children: HEADLINE },
} satisfies Meta<typeof HeadlineH1>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Subtitle: Story = {
  args: { variant: 'subtitle', children: SUBTITLE },
}

export const Center: Story = {
  args: { align: 'center' },
}

export const HeadlineH2: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Primitives / Headline / H2 (7565:23679). Style=Default, Alternative (looks like H3), Sbtile; Align=Center; Hug content?=True.',
      },
    },
  },
  render: () => (
    <div className="flex w-full flex-col gap-md">
      <HeadlineH2Component>{HEADLINE}</HeadlineH2Component>
      <HeadlineH2Component variant="alternative">{HEADLINE}</HeadlineH2Component>
      <HeadlineH2Component variant="subtitle">{SUBTITLE}</HeadlineH2Component>
      <HeadlineH2Component align="center">{HEADLINE}</HeadlineH2Component>
      <HeadlineH2Component width="hug" className="bg-surface-placeholder">
        {HEADLINE}
      </HeadlineH2Component>
    </div>
  ),
}

export const HeadlineH3: Story = {
  parameters: {
    docs: {
      description: { story: 'Figma: Primitives / Headline / H3 (7715:20573). Style=Default, Sbtile; Align?=Center.' },
    },
  },
  render: () => (
    <div className="flex w-full flex-col gap-md">
      <HeadlineH3Component>{HEADLINE}</HeadlineH3Component>
      <HeadlineH3Component variant="subtitle">{SUBTITLE}</HeadlineH3Component>
      <HeadlineH3Component align="center">{HEADLINE}</HeadlineH3Component>
    </div>
  ),
}

export const DefaultParagraph: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Primitives / DefaultParagraph (7565:23423). size=lg · minWidth=block, size=md, size=s · minWidth=inline. In Figma FontSize=LG with min-w=x-SM uses DefaultText S; here size and minimum width are separate props.',
      },
    },
  },
  render: () => (
    <div className="flex w-full flex-col gap-md">
      <DefaultParagraphComponent>{PARAGRAPH}</DefaultParagraphComponent>
      <DefaultParagraphComponent size="md">{PARAGRAPH}</DefaultParagraphComponent>
      <DefaultParagraphComponent size="s" minWidth="inline">
        {PARAGRAPH}
      </DefaultParagraphComponent>
    </div>
  ),
}

export const Footnote: Story = {
  parameters: {
    docs: {
      description: { story: 'Figma: Primitives / Paragraphs / Footnote (7565:23645). DefaultText S, centered.' },
    },
  },
  render: () => <FootnoteComponent>*Hier mehr über unsere Nachhaltigkeitsskala erfahren</FootnoteComponent>,
}

export const BulletedList: Story = {
  parameters: {
    docs: { description: { story: 'Figma: Primitives / BulletedList (4221:27964).' } },
  },
  render: () => <BulletedListComponent items={PRODUCT_TABS_CONTENT.manufacture.highlights} />,
}

export const UserMessageExplanation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Primitives / UserMessage & Explanation (6811:20757). Title H2 Alternative, text UserMessage/X-LG.',
      },
    },
  },
  render: () => (
    <UserMessageExplanationComponent title="Danke Für Deine Zahlung!">
      Deine Bestellung kommt voraussichtlich am 10.11.2025.
    </UserMessageExplanationComponent>
  ),
}

export const InlineQuestion: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Figma: Primitives / Inline Question & Button (6072:33346). Question and Buttons / XXS / Inline.',
      },
    },
  },
  render: () => <InlineQuestionComponent question="Adresse manuell eingeben?" action="Manuell eingeben" />,
}
