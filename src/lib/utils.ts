import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge kennt die Namen aus app.css nicht von selbst. Ohne diese
 * Liste hielte es z. B. `text-16` für eine Farbe und `px-md px-lg` nicht für
 * einen Konflikt. Die Werte spiegeln §4 von app.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['10', '11', '12', '13', '14', '16', '18', '20', '22', '24', '26', '30', '32', '34', '40', '48', '60'],
      spacing: ['zero', 'xxxs', 'xxs', 'xs', 'sm', 'md-sm', 'md', 'md-l', 'lg', 'xl', 'xxl', 'xxxl'],
      container: [
        'block-double-max',
        'block-inline-min',
        'block-max',
        'block-min',
        'btn-max',
        'btn-min',
        'btn-payment-max',
        'card-compact-img-max',
        'card-compact-max',
        'card-compact-min',
        'card-discovery-max',
        'card-img-max',
        'card-max',
        'card-min',
        'card-small-min',
        'fieldset-min',
        'footer-header-max',
        'icon-counter-min',
        'impact-scale-max',
        'impact-scale-min',
        'list-item-img-min',
        'megacard-max',
        'megacard-min',
        'nav-block-max',
        'nav-block-min',
        'overlay-message-max',
        'overlay-message-min',
        'panel-max',
        'panel-min',
        'product-page-column-min',
        'search-max',
      ],
      leading: ['tighter', 'tight', 'heading', 'body', 'relaxed'],
      tracking: ['tight', 'normal', 'wide'],
      font: ['display', 'accent-one', 'accent-two', 'body'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
