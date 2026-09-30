import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Header } from '@/components/design-system/navigation/header'
import { DefaultParagraph, HeadlineH2 } from '@/components/design-system/primitives/typography'
import { PageBreadcrumb } from '@/components/design-system/templates/page-breadcrumb'
import { NAV_GROUPS, PROMO } from '@/lib/fixtures'

const PARAGRAPH =
  'Dieser Absatz füllt die Seite, damit sie scrollt. Scrollst Du nach unten, gleitet die Breadcrumb unter den Header. Scrollst Du nach oben, erscheint sie wieder.'

function DemoPage() {
  return (
    <div className="flex min-h-dvh min-w-content flex-col items-center bg-surface">
      <Header navGroups={NAV_GROUPS} promo={PROMO} className="sticky top-0 z-50" />
      <main className="flex w-full flex-1 flex-col items-center">
        <PageBreadcrumb
          items={[{ label: 'Gefriergetrocknete Beeren', href: '#' }]}
          current="Gefriergetrocknete Himbeeren in Zartbitterschokolade"
          collapsed={false}
        />
        {Array.from({ length: 6 }, (_, i) => (
          <section key={i} className="flex w-full flex-col items-center bg-surface py-xl">
            <div className="flex w-full max-w-content flex-col gap-md-l px-md-l">
              <HeadlineH2>Abschnitt {i + 1}</HeadlineH2>
              <DefaultParagraph>{PARAGRAPH}</DefaultParagraph>
              <DefaultParagraph>{PARAGRAPH}</DefaultParagraph>
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

/** Templates / Page: Breadcrumb mit Scroll-Verhalten (Figma-Annotation an 8947:37169). */
const meta = {
  title: 'Verhalten/Breadcrumb beim Scrollen',
  component: DemoPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Beim Laden sichtbar. Beim Runterscrollen gleitet die Breadcrumb unter den Sticky-Header, beim Hochscrollen erscheint sie wieder. Figma bildet das Verhalten nicht ab.',
      },
    },
  },
} satisfies Meta<typeof DemoPage>

export default meta
type Story = StoryObj<typeof meta>

export const Seite: Story = {}
