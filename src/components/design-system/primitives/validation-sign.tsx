import type { SVGProps } from 'react'

import { cn } from '@/lib/utils'

export type ValidationSignVariant = 'error' | 'valid' | 'clear'

type P = SVGProps<SVGSVGElement>

/** Figma: Primitives / ValidationSign · Valid?=False, Error?=True (2406:1336) — Ausrufezeichen in error-content */
function SignError(props: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M10 7.5V11.6667" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9.99609 14.1667H10.0036"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Figma: Primitives / ValidationSign · Valid?=True (2406:1285) — Häkchen in success-content */
function SignValid(props: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M6.45898 9.99994L8.81732 12.3583L13.5423 7.6416"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Figma: Primitives / ValidationSign · X?=True (6088:30548) — Löschen-Kreuz in currentColor */
function SignClear(props: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M6.68647 5.75658L6.805 5.79346C6.83493 5.80727 6.85486 5.81987 6.859 5.82243C6.88467 5.83821 6.91 5.85601 6.93012 5.87115C6.97138 5.90227 7.02039 5.94224 7.07236 5.98704C7.1782 6.07829 7.31764 6.20652 7.47931 6.3584C7.80363 6.66308 8.22913 7.07801 8.6778 7.53041L10.0159 8.88021L11.3922 7.51461L12.156 6.76399C12.3745 6.55308 12.5588 6.3802 12.7092 6.24383C12.8582 6.10875 12.9827 6.00297 13.0806 5.92909C13.1287 5.8928 13.1798 5.85585 13.2307 5.8277C13.2561 5.81364 13.2905 5.79778 13.3295 5.78424C13.3637 5.77238 13.4319 5.75164 13.5165 5.7579L13.6337 5.77634C13.6818 5.78869 13.7361 5.81022 13.7891 5.84481C13.9295 5.93645 14.0038 6.08803 13.9999 6.24778C13.9967 6.37014 13.9495 6.47168 13.9169 6.53091C13.8798 6.59832 13.8302 6.66724 13.7773 6.73502C13.6743 6.86672 13.5202 7.03889 13.3084 7.26045L12.4932 8.08613C12.1229 8.45438 11.7592 8.81953 11.4712 9.11198L10.9009 9.70193L10.8772 9.72695L11.1143 9.98243L11.6477 10.5355C11.8552 10.7458 12.0757 10.9655 12.2588 11.1426L12.8778 11.7655L13.4072 12.3383L13.4164 12.3488C13.7053 12.7074 13.7158 12.7184 13.7562 12.7584C13.7621 12.7624 13.7693 12.7683 13.7773 12.7742C13.8053 12.795 13.8389 12.8231 13.8721 12.8624L13.9511 12.9836L13.9893 13.0586L13.9933 13.1416C13.9974 13.2148 13.9946 13.3145 13.9551 13.4155C13.9099 13.5305 13.8281 13.6212 13.7233 13.6776C13.6327 13.7262 13.5431 13.7396 13.4902 13.7447C13.4359 13.7499 13.3793 13.75 13.3413 13.75C13.2037 13.7499 13.0952 13.6832 13.0621 13.6631C13.009 13.6307 12.9574 13.5913 12.912 13.5525C12.8658 13.5129 12.8172 13.4673 12.7698 13.4181L12.6302 13.2601C12.5613 13.1757 12.3525 12.9493 12.0704 12.653L11.0682 11.6219L10.0383 10.5777L9.77224 10.8318C9.62226 10.9748 9.38488 11.2066 9.12426 11.4652L8.33274 12.2606C7.84184 12.7597 7.45688 13.1266 7.17508 13.3563C7.0374 13.4685 6.90441 13.5639 6.78525 13.6236C6.72752 13.6525 6.6453 13.6867 6.55082 13.6973C6.47512 13.7057 6.36547 13.7002 6.26108 13.642L6.15967 13.5643C6.00589 13.4096 5.98604 13.2223 6.00689 13.0705C6.00772 13.0545 6.0065 13.0376 6.00821 13.0218C6.01122 12.9941 6.01839 12.9369 6.04245 12.8769L6.17415 12.6688C6.24588 12.5673 6.33664 12.474 6.44282 12.4002L6.4797 12.3686C6.50903 12.3433 6.54881 12.3083 6.59691 12.2646C6.693 12.1772 6.82097 12.0587 6.97095 11.9169C7.27071 11.6336 7.65661 11.2606 8.05617 10.8687L9.21514 9.73091L9.09002 9.61107C8.50329 9.05223 7.75199 8.28999 7.15401 7.65815C6.8551 7.3423 6.592 7.05518 6.40463 6.84169C6.31189 6.73601 6.23235 6.64362 6.17679 6.57173C6.15039 6.53757 6.12216 6.49778 6.09908 6.45979C6.08864 6.44257 6.06829 6.40888 6.05299 6.36761C6.04546 6.34727 6.03278 6.30803 6.02796 6.25831C6.02361 6.213 6.0217 6.10955 6.08723 6.00284L6.16098 5.91066C6.2398 5.83343 6.33133 5.79572 6.39014 5.77765C6.43592 5.76365 6.48513 5.75374 6.53501 5.75L6.68647 5.75658Z"
      />
    </svg>
  )
}

const SIGNS = { error: SignError, valid: SignValid, clear: SignClear } as const
const COLORS = { error: 'text-error-content', valid: 'text-success-content', clear: 'text-content-text' } as const

export type ValidationSignProps = P & { variant: ValidationSignVariant }

/**
 * Figma: Primitives / ValidationSign (2406:1344), 20×20.
 * error = Valid?=False, Error?=True · valid = Valid?=True · clear = X?=True.
 * Die Farbe folgt currentColor; Standardfarben wie in Figma.
 */
export function ValidationSign({ variant, className, ...props }: ValidationSignProps) {
  const Sign = SIGNS[variant]
  return <Sign className={cn('size-5 shrink-0', COLORS[variant], className)} {...props} />
}
