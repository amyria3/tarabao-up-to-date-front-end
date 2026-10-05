import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Header } from '@modules/layout/components/header'
import { DefaultParagraph, HeadlineH2 } from '@/components/ui/typography'
import { PageBreadcrumb, type PageBreadcrumbProps } from '@modules/common/components/breadcrumbs/page-breadcrumb'
import { NAV_GROUPS, PROMO } from '@/lib/fixtures'
import { categoryBreadcrumb, findCategory } from '@/lib/shop/catalog'

const PARAGRAPH =
  'Dieser Absatz füllt die Seite, damit sie scrollt. Scrollst Du nach unten, gleitet die Breadcrumb unter den Header. Scrollst Du nach oben, erscheint sie wieder.'

/** Scrollable page with a sticky header, the breadcrumb as first child of <main> and six sections. */
function ScrollPage(props: PageBreadcrumbProps) {
  return (
    <div className="flex min-h-dvh min-w-content flex-col items-center bg-surface">
      <Header navGroups={NAV_GROUPS} promo={PROMO} className="sticky top-0 z-50" />
      <main className="flex w-full flex-1 flex-col items-center">
        <PageBreadcrumb {...props} />
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

const meta = {
  title: 'Components/PageBreadcrumb',
  component: PageBreadcrumb,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component:
          'Figma: Breadcrumb in Templates / Page (8947:37169), annotation „Scroll-Verhalten (nur im Code)“. Visible on load. Scrolling down slides it under the sticky header, scrolling up shows it again directly below the header. It stays visible while a link has focus. Figma does not show this behaviour.',
      },
      story: { inline: false, iframeHeight: '40rem' },
    },
  },
  args: categoryBreadcrumb(findCategory('pflanzendrink-pulver')!, 'de-de'),
  render: (args) => <ScrollPage {...args} />,
} satisfies Meta<typeof PageBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/** Scroll the page to see the breadcrumb hide and reappear. */
export const Default: Story = {}
