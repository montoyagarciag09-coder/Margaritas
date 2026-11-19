import { COLOR_NOTICE } from '../data/products'
import { whatsappLink } from '../lib/whatsapp'
import { WhatsappIcon } from './Icons'
import { LogoMark } from './Logo'

/**
 * Aviso de que la pijama se puede pedir en cualquier color. Abre WhatsApp con
 * un mensaje listo; si se pasa `product`, el mensaje nombra la referencia.
 */
export default function ColorRequest({ product, className = '' }) {
  const message = product
    ? `¡Hola Margaritas! ✨ Quisiera la pijama ${product.name} en otro color. ¿Me ayudan?`
    : '¡Hola Margaritas! ✨ Quisiera una pijama en un color especial. ¿Me ayudan?'

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer"
      className={`group flex items-center gap-3 rounded-2xl border border-rose/20 bg-petal/60 px-4 py-3 text-left text-wine transition-colors hover:bg-petal ${className}`}
    >
      <LogoMark className="h-7 w-7 shrink-0 text-rose" center="#461B14" pollen="#F1D9D6" />
      <span className="flex-1 text-xs leading-snug md:text-sm">
        <span className="font-medium">¿Otro color?</span> {COLOR_NOTICE}
      </span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wine text-nude transition-transform group-hover:scale-110">
        <WhatsappIcon className="h-3.5 w-3.5" />
      </span>
    </a>
  )
}
