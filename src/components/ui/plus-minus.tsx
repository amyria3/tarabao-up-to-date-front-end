import * as React from 'react'

import { cn } from '@/lib/utils'

export type PlusMinusVariant = 'plus' | 'min'
export type PlusMinusState = 'default' | 'active' | 'inactive'

export interface PlusMinusProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PlusMinusVariant
  state?: PlusMinusState
}

/**
 * Figma: Buttons / PlusMinus (2228:2503) · State Default | Active | Inactive,
 * Variant Min | Plus. Manrope SemiBold 22 px in content-text (Figma ohne Textstil).
 */
export const PlusMinus = React.forwardRef<HTMLButtonElement, PlusMinusProps>(function PlusMinus(
  { variant = 'plus', state = 'default', className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={variant === 'plus' ? 'Mehr' : 'Weniger'}
      disabled={state === 'inactive' || props.disabled}
      className={cn(
        'inline-flex h-[1.875rem] cursor-pointer items-center justify-center font-body text-22 leading-tight font-semibold',
        variant === 'plus' ? 'w-[0.8125rem]' : 'w-[0.625rem]',
        state === 'inactive'
          ? variant === 'plus'
            ? 'text-content-text opacity-60'
            : 'text-content-weak'
          : 'text-content-text',
        state === 'default' && variant === 'plus' && 'opacity-90',
        'disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {variant === 'plus' ? '+' : '-'}
    </button>
  )
})
