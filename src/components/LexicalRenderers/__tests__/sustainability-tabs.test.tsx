import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SustainabilityTabs } from '@/components/LexicalRenderers/SustainabilityTabs'
import { SUSTAINABILITY_CONTENT } from '@/lib/fixtures'

// Figma ContentModules / SustainabilityTabs (10020:52037): Engagement 4, Umwelt 3, Fairness 3, No Plane 1 Baustein.
describe('SustainabilityTabs', () => {
  it('Engagement: vier Bausteine, der erste offen mit Siegeln', () => {
    render(<SustainabilityTabs content={SUSTAINABILITY_CONTENT.tabs} />)
    const toggles = screen.getAllByRole('button', { expanded: false })
    expect(screen.getByRole('button', { name: /Zertifizierungen & Standards/, expanded: true })).toBeTruthy()
    expect(toggles.map((b) => b.textContent)).toEqual([
      'Code of Conduct',
      'Herkunft & Produktionsform',
      'Beitrag zur Chancengleichheit',
    ])
    expect(screen.getByRole('list', { name: 'Zertifizierungen' }).querySelectorAll('li')).toHaveLength(3)
  })

  it('zeigt Lieferantendaten und Ergänzungen erst im offenen Baustein, zeilenweise', () => {
    render(<SustainabilityTabs content={SUSTAINABILITY_CONTENT.tabs} />)
    expect(screen.queryByText('Frauenanteil: [A.4-b Frauenanteil]')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Beitrag zur Chancengleichheit' }))
    expect(screen.getByText('Frauenanteil: [A.4-b Frauenanteil]').tagName).toBe('SPAN')
    expect(screen.getByText(/Krankenstation/)).toBeTruthy()
    // Nur ein Baustein ist offen.
    expect(screen.getByRole('button', { name: /Zertifizierungen & Standards/, expanded: false })).toBeTruthy()
  })

  it('No Plane: ein Baustein ohne Accordion, Daten sichtbar', () => {
    render(<SustainabilityTabs content={SUSTAINABILITY_CONTENT.tabs} defaultCategory="transportation" />)
    const panel = screen.getByRole('tabpanel')
    expect(panel.querySelector('button')).toBeNull()
    expect(panel.querySelector('h3')?.textContent).toBe('Kein Lufttransport')
    expect(screen.getByText('Transportweg: [D.1-a Transportweg]')).toBeTruthy()
  })

  it('Umwelt und Fairness haben je drei Bausteine', () => {
    const { unmount } = render(
      <SustainabilityTabs content={SUSTAINABILITY_CONTENT.tabs} defaultCategory="cultivation-environment" />,
    )
    expect(screen.getByRole('tabpanel').querySelectorAll('[data-slot="basic-with-disclosure"]')).toHaveLength(3)
    unmount()
    render(<SustainabilityTabs content={SUSTAINABILITY_CONTENT.tabs} defaultCategory="supply-chain-fairness" />)
    expect(screen.getByRole('tabpanel').querySelectorAll('[data-slot="basic-with-disclosure"]')).toHaveLength(3)
  })
})
