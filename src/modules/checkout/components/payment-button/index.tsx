import * as React from 'react'

import { ButtonShape } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

export interface PaymentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Logo der Zahlungsart, z. B. <IconPayPal /> */
  logo?: React.ReactNode
  forceHover?: boolean
}

/**
 * Figma: Buttons / Payment (3230:22134) · Size=Mid, Type=PrimaryButton.
 * Wurzel Fill mit max-w-btn-payment-max, Label „Express zahlen“.
 */
export const PaymentButton = React.forwardRef<HTMLButtonElement, PaymentButtonProps>(function PaymentButton(
  { logo, forceHover, className, children = 'Express zahlen', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group relative flex w-full max-w-btn-payment-max cursor-pointer flex-col items-center justify-center',
        'pt-xxs pb-zero hovered:pt-zero hovered:pb-xxs motion-hover',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    >
      <ButtonShape shape="oblong" className="text-btn-primary-bg group-hovered:text-btn-primary-bg-hover" />
      <span className="relative flex h-btn-md w-full items-center justify-center gap-md-sm px-sm type-buttons-md text-btn-primary-label group-hovered:text-btn-primary-label-hover">
        <span>{children}</span>
        {logo}
      </span>
    </button>
  )
})
