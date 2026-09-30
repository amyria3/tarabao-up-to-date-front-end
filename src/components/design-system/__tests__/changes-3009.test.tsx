import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SelectProducts } from '@/components/design-system/cancellation/select-products'
import { CartSummary, cartQuantity } from '@/components/design-system/cart/cart-summary'
import { ContactForm } from '@/components/design-system/content-modules/content-modules'
import { InputField } from '@/components/design-system/inputs/input-field'
import { NavBar } from '@/components/design-system/navigation/nav-bar'
import { PortionCalculator, RecipeStep } from '@/components/design-system/recipe/recipe'
import { CART, RECIPE_FACTS, RECIPE_INGREDIENTS, RETURNABLE_ITEMS } from '@/lib/fixtures'

describe('Input / Field', () => {
  it('meldet einen Fehler über aria-invalid und die Meldung', () => {
    render(<InputField label="E-Mail" type="email" error="Ungültige E-Mail" />)
    const input = screen.getByLabelText(/E-Mail/) as HTMLInputElement
    expect(input.getAttribute('aria-invalid')).toBe('true')
    const message = screen.getByRole('alert')
    expect(message.textContent).toContain('Ungültige E-Mail')
    expect(input.getAttribute('aria-describedby')).toContain(message.id)
  })
  it('rendert Textarea und Select nach Type', () => {
    render(
      <>
        <InputField label="Nachricht" type="textarea" />
        <InputField label="Land" type="select" options={[{ value: 'DE', label: 'Deutschland' }]} />
      </>,
    )
    expect(screen.getByLabelText('Nachricht').tagName).toBe('TEXTAREA')
    expect(screen.getByLabelText('Land').tagName).toBe('SELECT')
  })
})

describe('Warenkorb', () => {
  it('teilt die Artikel nach Bestellart in zwei Blöcke', () => {
    render(<CartSummary cart={CART} />)
    expect(screen.getByRole('heading', { name: 'Wiederkehrende Lieferungen' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Einmalige Lieferungen' })).toBeTruthy()
  })
  it('lässt einen Block weg, wenn er keine Artikel hat', () => {
    const oneTime = { ...CART, items: CART.items.map((i) => ({ ...i, subscription: false })) }
    render(<CartSummary cart={oneTime} />)
    expect(screen.queryByRole('heading', { name: 'Wiederkehrende Lieferungen' })).toBeNull()
  })
  it('zeigt im Symbol die Summe der Mengen, ab 10 „9+“', () => {
    expect(
      cartQuantity({
        items: [
          { ...CART.items[0]!, quantity: 3 },
          { ...CART.items[1]!, quantity: 2 },
        ],
      }),
    ).toBe(5)
    const { rerender } = render(<NavBar cartCount={5} />)
    expect(screen.getByText('5')).toBeTruthy()
    rerender(<NavBar cartCount={12} />)
    expect(screen.getByText('9+')).toBeTruthy()
  })
})

describe('Widerruf · SelectProducts', () => {
  it('zeigt ohne Auswahl die Meldung statt eines inaktiven Buttons', () => {
    const onSubmit = vi.fn()
    render(<SelectProducts items={RETURNABLE_ITEMS} onSubmit={onSubmit} />)
    const submit = screen.getByRole('button', { name: 'Zahlungspflichtig widerrufen' }) as HTMLButtonElement
    expect(submit.disabled).toBe(false)
    fireEvent.click(submit)
    expect(screen.getByRole('alert')).toBeTruthy()
    expect(onSubmit).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: RETURNABLE_ITEMS[0]!.title }))
    expect(screen.queryByRole('alert')).toBeNull()
    fireEvent.click(submit)
    expect(onSubmit).toHaveBeenCalledWith([RETURNABLE_ITEMS[0]!.id])
  })
})

describe('ContactForm', () => {
  it('wechselt nach dem Absenden zu Success und zurück', async () => {
    render(<ContactForm onSubmit={() => undefined} />)
    fireEvent.submit(screen.getByRole('button', { name: 'Nachricht abschicken' }).closest('form')!)
    expect(await screen.findByText('Danke für Deine Nachricht!')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Neue Nachricht schreiben' }))
    expect(screen.getByRole('button', { name: 'Nachricht abschicken' })).toBeTruthy()
  })
})

describe('Rezept', () => {
  it('rechnet die Mengen auf die Portionen um', () => {
    render(<PortionCalculator facts={RECIPE_FACTS} ingredients={RECIPE_INGREDIENTS} />)
    expect(screen.getByText('50 g')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Mehr' }))
    expect(screen.getByText('100 g')).toBeTruthy()
  })
  it('klappt einen Schritt zu und wieder auf', () => {
    render(
      <RecipeStep label="Schritt 1" meta="ca. 10 Min">
        Text des Schritts
      </RecipeStep>,
    )
    expect(screen.getByText('Text des Schritts')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /zuklappen/ }))
    expect(screen.queryByText('Text des Schritts')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /aufklappen/ }))
    expect(screen.getByText('Text des Schritts')).toBeTruthy()
  })
})
