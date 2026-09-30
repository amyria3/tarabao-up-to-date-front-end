import { PromoBar } from '@/components/design-system/navigation/promo-bar'
import { PROMO } from '@/lib/fixtures'
import type { LibraryEntry } from '@/library/types'

export const layoutEntries: LibraryEntry[] = [
  {
    id: 'layout-promo-bar',
    figma: 'Layout / PromoBar',
    nodeId: '8882:27232',
    code: '<PromoBar promo={promo} />',
    note: 'Clrs / Special ist auf lilac gepinnt. base zeigt den Kurztext, md/lg den Langtext (Fenster schmaler ziehen).',
    render: () => <PromoBar promo={PROMO} />,
  },
]
