'use client'

import { i18n, type Messages } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import * as React from 'react'

import type { Locale } from '@/lib/i18n/locales'

/** Lingui-Provider für Client-Komponenten. Kataloge liefert das Root-Layout. */
export function LinguiClientProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale
  messages: Messages
  children: React.ReactNode
}) {
  React.useState(() => {
    i18n.loadAndActivate({ locale, messages })
    return null
  })
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}
