import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AccountSummaryItem } from '@modules/account/components/account-data-block'
import {
  AccountAddressEditor,
  AccountAddressItem,
  AccountPaymentEditor,
  AccountPaymentItem,
  splitStreet,
} from '@modules/account/components/account-editors'
import { addressLines } from '@/lib/checkout/address'
import { ADDRESS } from '@/lib/fixtures'

describe('AccountSummaryItem', () => {
  it('„Korrigieren“ öffnet die Felder der Adresse wie Figma Editing?=True', () => {
    render(
      <AccountSummaryItem
        label="Adresse 1:"
        lines={addressLines(ADDRESS)}
        editor={<AccountAddressEditor defaultValue={ADDRESS} legend="Adresse 1" />}
        deletable
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Korrigieren' }))
    expect(screen.getByRole('group', { name: 'Adresse 1' })).toBeInTheDocument()
    expect(screen.getByLabelText(/^Straße/)).toHaveValue('Berliner Str.')
    expect(screen.getByLabelText(/^Hausnummer/)).toHaveValue('01')
    expect(screen.queryByLabelText(/^Land/)).not.toBeInTheDocument()
  })

  it('„Löschen“ blendet den Eintrag aus', () => {
    render(<AccountSummaryItem label="Adresse 1:" lines={addressLines(ADDRESS)} deletable />)
    fireEvent.click(screen.getByRole('button', { name: 'Löschen' }))
    expect(screen.queryByText('Adresse 1:')).not.toBeInTheDocument()
  })

  it('Zahlungsart: Felder Zahlungsart, Kartennummer, Gültig bis', () => {
    render(
      <AccountSummaryItem
        label="Zahlungsart 1:"
        lines={[['Visa ****1234']]}
        editing
        editor={
          <AccountPaymentEditor defaultValue={{ brand: 'visa', number: '**** **** **** 1234', expiry: '06/2027' }} />
        }
      />,
    )
    expect(screen.getByLabelText(/^Kartennummer/)).toHaveValue('**** **** **** 1234')
    expect(screen.getByLabelText(/^Gültig bis/)).toHaveValue('06/2027')
  })
})

describe('Speichern', () => {
  it('Adresse: übernimmt die Eingaben und schließt die Felder', () => {
    render(<AccountAddressItem label="Adresse 1:" address={ADDRESS} />)
    fireEvent.click(screen.getByRole('button', { name: 'Korrigieren' }))
    fireEvent.change(screen.getByLabelText(/^Stadt/), { target: { value: 'Görlitz' } })
    fireEvent.change(screen.getByLabelText(/^Hausnummer/), { target: { value: '7b' } })
    fireEvent.click(screen.getByRole('button', { name: 'Speichern' }))
    expect(screen.queryByRole('button', { name: 'Speichern' })).not.toBeInTheDocument()
    expect(screen.getByText('Görlitz')).toBeInTheDocument()
    expect(screen.getByText('Berliner Str. 7b')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Korrigieren' }))
    expect(screen.getByLabelText(/^Stadt/)).toHaveValue('Görlitz')
  })

  it('Zahlungsart: zeigt die neuen letzten vier Ziffern und das Ablaufdatum', () => {
    render(
      <AccountPaymentItem
        label="Zahlungsart 1:"
        payment={{ brand: 'visa', number: '**** **** **** 1234', expiry: '06/2027' }}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Korrigieren' }))
    fireEvent.change(screen.getByLabelText(/^Kartennummer/), { target: { value: '4111 1111 1111 9876' } })
    fireEvent.change(screen.getByLabelText(/^Gültig bis/), { target: { value: '09/2029' } })
    fireEvent.click(screen.getByRole('button', { name: 'Speichern' }))
    expect(screen.getByText('Visa ****9876')).toBeInTheDocument()
    expect(screen.getByText('Expires 09/2029')).toBeInTheDocument()
  })
})

describe('splitStreet', () => {
  it('trennt die Hausnummer ab', () => {
    expect(splitStreet('Berliner Str. 01')).toEqual({ street: 'Berliner Str.', houseNumber: '01' })
    expect(splitStreet('Am Markt 12a')).toEqual({ street: 'Am Markt', houseNumber: '12a' })
    expect(splitStreet('Marktplatz')).toEqual({ street: 'Marktplatz', houseNumber: '' })
  })
})
