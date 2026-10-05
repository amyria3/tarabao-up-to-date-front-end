import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MixBar } from '@modules/nutmixer/components/mix-bar'

describe('MixBar', () => {
  it('zeigt den Füllstand, öffnet das Sheet mit der Mischung und schließt es wieder', () => {
    const { container } = render(
      <MixBar fillPercent={60}>
        <p>Inhalt der Mischung</p>
      </MixBar>,
    )
    expect(screen.getByText('60 % voll')).toBeTruthy()
    const dialog = container.querySelector('dialog')!
    expect(dialog.hasAttribute('open')).toBe(false)
    expect(screen.queryByText('Inhalt der Mischung')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Ansehen' }))
    expect(dialog.hasAttribute('open')).toBe(true)
    expect(screen.getByText('Inhalt der Mischung')).toBeTruthy()
    expect(document.documentElement.style.overflow).toBe('hidden')

    fireEvent.click(screen.getByRole('button', { name: 'Schließen', hidden: true }))
    expect(dialog.hasAttribute('open')).toBe(false)
    expect(document.documentElement.style.overflow).toBe('')
  })
})
