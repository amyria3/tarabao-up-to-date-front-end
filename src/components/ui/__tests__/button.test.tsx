import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BUTTON_FAMILIES, Button, type ButtonIntent, type ButtonSize } from '@/components/ui/button'

describe('Button', () => {
  // LG / Inline hat keine Form, nur die Ebene „mark“.
  it.each(BUTTON_FAMILIES.filter((f) => f !== 'inline-lg'))('%s rendert Form hinter dem Label', (family) => {
    const [intent, size] = family.split('-') as [ButtonIntent, ButtonSize]
    render(
      <Button intent={intent} size={size}>
        {family}
      </Button>,
    )
    const button = screen.getByRole('button', { name: family })
    expect(button).toHaveAttribute('type', 'button')
    expect(button.querySelectorAll('svg').length).toBeGreaterThan(0)
  })

  // Browser schneiden ein <svg> an der viewBox ab; Form und Kontur reichen bis an den Rand.
  it.each(BUTTON_FAMILIES.filter((f) => f !== 'inline-lg'))('%s schneidet die Form nicht ab', (family) => {
    const [intent, size] = family.split('-') as [ButtonIntent, ButtonSize]
    render(
      <Button intent={intent} size={size}>
        {family}
      </Button>,
    )
    for (const svg of screen.getByRole('button', { name: family }).querySelectorAll('svg')) {
      expect(svg.getAttribute('class')).toMatch(/(^|\s)overflow-visible(\s|$)/)
    }
  })

  it('Fill setzt min/max aus den Container-Tokens', () => {
    render(<Button>Fill</Button>)
    expect(screen.getByRole('button', { name: 'Fill' }).className).toMatch(/min-w-btn-min.*max-w-btn-max/)
  })

  it('forceHover setzt data-hovered', () => {
    render(<Button forceHover>Hover</Button>)
    expect(screen.getByRole('button', { name: 'Hover' })).toHaveAttribute('data-hovered')
  })

  it('asChild rendert das Kind als Wurzel', () => {
    render(
      <Button asChild>
        <a href="/de-de">Link</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Link' })
    expect(link.tagName).toBe('A')
    expect(link.className).toContain('group')
  })
})
