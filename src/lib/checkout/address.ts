import type { AddressModel } from '@/lib/view-models'

/** Zeilen einer Adresse wie in Figma SummaryDataset: (Land), Name, Straße, PLZ + Ort, Telefon */
export function addressLines(address: AddressModel, withCountry = false): string[][] {
  return [
    ...(withCountry && address.countryLabel ? [[address.countryLabel]] : []),
    [address.firstName, address.lastName],
    [address.address1, ...(address.address2 ? [address.address2] : [])],
    [address.postalCode, address.city],
    ...(address.phone ? [[address.phone]] : []),
  ]
}
