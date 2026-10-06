import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CategoryCardMd, CategoryCardSm } from '@modules/categories/components/category-card'
import { CATEGORIES_SAMPLE } from '@/lib/fixtures'

// Figma Cards / CategoryCard / SM + MD: Button-Card „Erkunden“ (All Button Labels/Erkunden) mit Icons / Eye.
describe('CategoryCard', () => {
  it.each([
    ['SM', CategoryCardSm],
    ['MD', CategoryCardMd],
  ] as const)('%s zeigt im Hover-Button „Erkunden“ mit dem Auge', (_, Card) => {
    const { container } = render(<Card category={CATEGORIES_SAMPLE[0]!} forceHover />)
    expect(container.textContent).toContain('Erkunden')
    expect(container.textContent).not.toContain('Call to action')
    // Icons / Eye hat als einziges Icon der Karte die viewBox 0 0 20 20 (Warenkorb: 0 0 30 30).
    expect(container.querySelector('svg[viewBox="0 0 20 20"]')).toBeTruthy()
    expect(container.querySelector('svg[viewBox="0 0 30 30"]')).toBeNull()
  })
})
