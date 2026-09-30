export type TabBarItem = { value: string; label: string }

/** Tabs aus Figma Buttons / XS / TabBar (Produktseite). */
export const PRODUCT_TABS: TabBarItem[] = [
  { value: 'about', label: 'Über dieses Produkt' },
  { value: 'origin', label: 'Herkunft & Impact' },
  { value: 'packaging', label: 'Verpackung & Aufbewahrung' },
  { value: 'nutrition', label: 'Inhalt & Nährwerte' },
  { value: 'manufacture', label: 'Herstellung in unserer Manufaktur' },
  { value: 'reviews', label: 'Bewertungen' },
]
