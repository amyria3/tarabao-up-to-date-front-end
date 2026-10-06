import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { HighlightedInformationRow } from '@/components/ui/highlighted-information'
import { EmailLinkSent, RESEND_COOLDOWN_MS } from '@modules/account/components/email-link-sent'
import { SetPassword } from '@modules/checkout/components/set-password'
import { SubscriptionReminder } from '@modules/email/components/subscription-reminder'
import { CUSTOMER, SUBSCRIPTION_REMINDER, SUSTAINABILITY_CONTENT } from '@/lib/fixtures'

afterEach(() => {
  vi.useRealTimers()
})

describe('Components / Checkout / SetPassword', () => {
  it('meldet ungleiche Passwörter erst nach dem Absenden am zweiten Feld', () => {
    const onSubmit = vi.fn()
    render(<SetPassword email={CUSTOMER.email} onSubmit={onSubmit} />)
    fireEvent.change(screen.getByLabelText(/^Neues Passwort/), { target: { value: 'Cashew2026' } })
    fireEvent.change(screen.getByLabelText(/^Passwort wiederholen/), { target: { value: 'Cashew2025' } })
    expect(screen.queryByText('Die Passwörter stimmen nicht überein')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /Passwort speichern/ }))
    expect(screen.getByText('Die Passwörter stimmen nicht überein')).toBeTruthy()
    expect(screen.getByLabelText(/^Passwort wiederholen/).getAttribute('aria-invalid')).toBe('true')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('speichert gleiche Passwörter ab 8 Zeichen', () => {
    const onSubmit = vi.fn()
    const { container } = render(<SetPassword variant="new-account" email={CUSTOMER.email} onSubmit={onSubmit} />)
    const field = (name: string) => container.querySelector(`input[name="${name}"]`) as HTMLInputElement
    fireEvent.change(field('password'), { target: { value: 'Cashew2026' } })
    fireEvent.change(field('password-repeat'), { target: { value: 'Cashew2026' } })
    fireEvent.click(screen.getByRole('button', { name: /Passwort speichern/ }))
    expect(onSubmit).toHaveBeenCalledWith('Cashew2026')
  })

  it('zeigt nach dem Speichern den Button zum Check-out nur mit returnTo', () => {
    const { rerender } = render(<SetPassword email={CUSTOMER.email} completed />)
    expect(screen.getByRole('heading', { name: 'Dein neues Passwort ist gespeichert' })).toBeTruthy()
    expect(screen.queryByRole('link')).toBeNull()
    rerender(
      <SetPassword
        email={CUSTOMER.email}
        completed
        returnTo={{ label: 'Weiter zum Versand', href: '/de-de/checkout?step=delivery' }}
      />,
    )
    expect(screen.getByRole('link', { name: /Weiter zum Versand/ }).getAttribute('href')).toBe(
      '/de-de/checkout?step=delivery',
    )
  })
})

describe('Components / Account / EmailLinkSent', () => {
  it('sperrt „Erneut senden“ nach dem Klick für 30 s', () => {
    vi.useFakeTimers()
    const onResend = vi.fn()
    render(<EmailLinkSent variant="magic-link" email={CUSTOMER.email} onResend={onResend} />)
    const button = screen.getByRole('button', { name: /Erneut senden/ }) as HTMLButtonElement
    fireEvent.click(button)
    expect(onResend).toHaveBeenCalledTimes(1)
    expect(button.disabled).toBe(true)
    act(() => {
      vi.advanceTimersByTime(RESEND_COOLDOWN_MS)
    })
    expect(button.disabled).toBe(false)
  })
})

describe('Components / Email / SubscriptionReminder', () => {
  it('nennt Termin und Produkte und verlinkt das Abo', () => {
    render(<SubscriptionReminder {...SUBSCRIPTION_REMINDER} />)
    expect(screen.getByText(/Am 14\. Oktober schicken wir Dir Dein Nuss-Abo/)).toBeTruthy()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByRole('link', { name: /Zu Deinem Abo/ }).getAttribute('href')).toBe('/de-de/account')
  })
})

describe('Components / HighlightedInformation', () => {
  it('zeigt eine Form je Angabe', () => {
    const { container } = render(<HighlightedInformationRow items={SUSTAINABILITY_CONTENT.highlights} />)
    expect(container.querySelectorAll('[data-slot=highlighted-information]')).toHaveLength(4)
  })
})
