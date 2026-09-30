import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { countryCode as rootCountryCode } from 'next/root-params'

import { DEFAULT_GLOBAL_THEME } from '@/lib/design-system/themes'
import { localeFromCountryCode, type Locale } from '@/lib/i18n/locales'
import { LinguiClientProvider } from '@/lib/i18n/provider'
import { messages as deMessages } from '@/locales/de/messages.po'
import { messages as enMessages } from '@/locales/en/messages.po'
import '@/styles/globals.css'

// Alle Schriften lokal. Die Storefront lädt Manrope über next/font/google.
// Hier liegt Manrope (OFL, @fontsource-variable/manrope 5.3.0) bei, damit
// Build und Storybook ohne Zugriff auf Google Fonts laufen.
const manrope = localFont({
  src: '../../styles/fonts/Manrope-Variable-latin.woff2',
  variable: '--font-manrope',
  weight: '200 800',
  display: 'swap',
})

const lumosky = localFont({
  src: '../../styles/fonts/LUMOSKY-Regular.otf',
  variable: '--font-lumosky',
  weight: '400',
  display: 'swap',
})

// Die Storefront setzt BROWN NOW TWO auch für accent-one ein. Figma nutzt für
// H2 Alternative, H3 und die Buttons BROWN NOW ONE, deshalb liegt sie hier bei.
const brownNowOne = localFont({
  src: '../../styles/fonts/BrownNowOne.otf',
  variable: '--font-brown-now-one',
  weight: '400',
  display: 'swap',
})

const brownNowTwo = localFont({
  src: '../../styles/fonts/BrownNowTwo.otf',
  variable: '--font-brown-now-two',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Tarabao Front-End Complete',
    default: 'Tarabao Front-End Complete',
  },
}

export async function generateStaticParams() {
  return [{ countryCode: 'de-de' }, { countryCode: 'en-de' }]
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const countryCode = (await rootCountryCode()) ?? 'de-de'
  const locale = localeFromCountryCode(countryCode)
  const catalogs: Record<Locale, typeof deMessages> = { de: deMessages, en: enMessages }

  return (
    <html
      lang={locale}
      data-theme={DEFAULT_GLOBAL_THEME}
      className={`${manrope.variable} ${lumosky.variable} ${brownNowOne.variable} ${brownNowTwo.variable}`}
    >
      <body className="font-body bg-surface text-content-text antialiased">
        <LinguiClientProvider locale={locale} messages={catalogs[locale]}>
          {props.children}
        </LinguiClientProvider>
      </body>
    </html>
  )
}
