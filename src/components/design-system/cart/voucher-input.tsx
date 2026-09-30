'use client'

import * as React from 'react'

import { FormField } from '@/components/design-system/inputs/form-field'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface VoucherInputProps {
  /** Figma „Gutschein“-Hinweis über dem Feld (Farbmodus purple-tint-surface-warm) */
  note?: string
  label?: string
  actionLabel?: string
  error?: string
  onRedeem?: (code: string) => void
  className?: string
}

/**
 * Figma: Components / Cart / VoucherInput (3325:5910) · Variant=Static|Dynamic.
 * Static: Hinweisfläche (surface-color im Modus purple-tint-surface-warm, p-2.5, Manrope Light 12
 * in input-label-focused) und Input / Component · Gutschein mit Buttons / XXS / PrimaryButton
 * (inaktiv, solange das Feld leer ist). Dynamic blendet beides aus, bis der Warenkorb es braucht.
 */
export function VoucherInput({
  note,
  label = 'Gutschein',
  actionLabel = 'Einlösen',
  error,
  onRedeem,
  className,
}: VoucherInputProps) {
  const [code, setCode] = React.useState('')
  return (
    <div data-slot="voucher-input" className={cn('flex w-full max-w-block-max flex-col gap-sm', className)}>
      {note ? (
        <div data-theme="purple-tint-surface-warm" className="flex w-full flex-col items-center bg-surface p-2.5">
          <p className="w-full font-body text-12 font-light text-input-label-focused">{note}</p>
        </div>
      ) : null}
      <FormField
        label={label}
        name="voucher"
        autoComplete="off"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={error}
        action={
          <Button intent="primary" size="xxs" disabled={code.trim() === ''} onClick={() => onRedeem?.(code.trim())}>
            {actionLabel}
          </Button>
        }
      />
    </div>
  )
}
