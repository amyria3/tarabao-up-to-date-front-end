'use client'

import * as React from 'react'
import { FormField } from '@/components/ui/form-field'
import { HeadlineH2, UserMessageExplanation } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ContactRequest = { message: string; name: string; email: string }

/**
 * Figma: ContentModules / ContactForm (7988:22598) · State=Default|Success. Spalte gap-md, min/max
 * block: H2 „Schreib uns!“. Default: Input / Field Type=Textarea „Deine Nachricht oder Frage hier“,
 * „Name“, „E-Mail“ (gap-2.5) und Buttons / MD / PrimaryButton „Nachricht abschicken“.
 * Success (Zustand nach dem Absenden, keine Prop): Primitives / UserMessage & Explanation
 * „Danke für Deine Nachricht!“ und Buttons / SM / SecondaryButton „Neue Nachricht schreiben“.
 */
export function ContactForm({
  title = 'Schreib uns!',
  submitLabel = 'Nachricht abschicken',
  successTitle = 'Danke für Deine Nachricht!',
  successText = 'Wir antworten in der Regel am Montag und Donnerstag.',
  resetLabel = 'Neue Nachricht schreiben',
  defaultSent = false,
  onSubmit,
  className,
}: {
  title?: string
  submitLabel?: string
  successTitle?: string
  successText?: string
  resetLabel?: string
  /** Zeigt State=Success statisch (Bibliothek, Storybook). */
  defaultSent?: boolean
  onSubmit?: (request: ContactRequest) => void | Promise<void>
  className?: string
}) {
  const [sent, setSent] = React.useState(defaultSent)
  const root = cn('flex w-full min-w-block-min max-w-block-max flex-col gap-md', className)
  if (sent) {
    return (
      <div data-slot="contact-form" data-state="success" className={root}>
        <HeadlineH2>{title}</HeadlineH2>
        <div role="status" className="flex w-full flex-col items-center gap-sm pt-md-l text-center">
          <UserMessageExplanation title={successTitle} as="h3" className="text-center">
            {successText}
          </UserMessageExplanation>
          <Button intent="secondary" size="sm" className="w-full" onClick={() => setSent(false)}>
            {resetLabel}
          </Button>
        </div>
      </div>
    )
  }
  return (
    <form
      data-slot="contact-form"
      data-state="default"
      className={root}
      onSubmit={async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        await onSubmit?.({
          message: String(data.get('message') ?? ''),
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
        })
        setSent(true)
      }}
    >
      <HeadlineH2>{title}</HeadlineH2>
      <div className="flex w-full flex-col gap-md-sm">
        <div className="flex w-full flex-col gap-2.5">
          <FormField label="Deine Nachricht oder Frage hier" name="message" type="textarea" required />
          <FormField label="Name" name="name" autoComplete="name" required />
          <FormField label="E-Mail" name="email" type="email" autoComplete="email" required />
        </div>
        <Button type="submit" intent="primary" size="md" className="w-full min-w-btn-min max-w-btn-max">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

/* ---- ContentModules / BasicWithDisclosure ---- */
