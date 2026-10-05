import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { InlineMarkup } from '@/components/ui/inline-markup'

describe('InlineMarkup', () => {
  it('setzt **fett** als <strong> um', () => {
    const { container } = render(
      <p>
        <InlineMarkup text="Wir nutzen **Pfandeimer** und **Papiertüten**." />
      </p>,
    )
    expect([...container.querySelectorAll('strong')].map((n) => n.textContent)).toEqual(['Pfandeimer', 'Papiertüten'])
    expect(container.textContent).toBe('Wir nutzen Pfandeimer und Papiertüten.')
  })

  it('verlinkt interne Pfade im selben Tab und externe in einem neuen', () => {
    render(
      <p>
        <InlineMarkup text="Mit [Amanase](/de-de/blog/amanase) und [Tarabao](https://tarabao.bio)." />
      </p>,
    )
    const internal = screen.getByRole('link', { name: 'Amanase' })
    expect(internal.getAttribute('href')).toBe('/de-de/blog/amanase')
    expect(internal.getAttribute('target')).toBeNull()
    const external = screen.getByRole('link', { name: 'Tarabao' })
    expect(external.getAttribute('target')).toBe('_blank')
    expect(external.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it('lässt HTML als Text stehen', () => {
    const { container } = render(
      <p>
        <InlineMarkup text="<b>kein HTML</b>" />
      </p>,
    )
    expect(container.querySelector('b')).toBeNull()
    expect(container.textContent).toBe('<b>kein HTML</b>')
  })
})
