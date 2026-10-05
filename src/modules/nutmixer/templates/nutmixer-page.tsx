import { Nutmixer, type NutmixerProps } from '@modules/nutmixer/components/nutmixer'

/** Figma: Nuss-Mixer (Templates / Page 8555:22265, „Produktseite“). Ein Section-Slot: Components / Nutmixer. */
export function NutmixerPage(nutmixer: NutmixerProps) {
  return (
    <>
      <Nutmixer {...nutmixer} />
    </>
  )
}
