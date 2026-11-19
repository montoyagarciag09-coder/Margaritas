import { motion } from 'framer-motion'
import { EASE, viewport } from '../../lib/motion'
import { LogoMark } from '../Logo'

/** Espaciado vertical común a todas las secciones de la landing. */
export const SECTION_Y = 'py-20 md:py-28'

/**
 * Encabezado único para todas las secciones: antetítulo con la margarita,
 * título y, a la derecha en escritorio, un texto corto o un enlace.
 */
export default function SectionHeader({ eyebrow, title, text, link, dark = false }) {
  return (
    <motion.header
      className="grid gap-5 md:grid-cols-12 md:items-end md:gap-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="md:col-span-7">
        <p className={`eyebrow flex items-center gap-2.5 ${dark ? 'text-petal/80' : 'text-rose'}`}>
          <LogoMark
            className="h-4 w-4"
            center={dark ? '#F1D9D6' : '#461B14'}
            pollen={dark ? '#461B14' : '#F1D9D6'}
          />
          {eyebrow}
        </p>
        <h2
          className={`mt-4 font-display text-4xl leading-[1.05] md:text-6xl ${dark ? 'text-nude' : 'text-wine'}`}
        >
          {title}
        </h2>
      </div>

      {(text || link) && (
        <div className="md:col-span-5 md:pb-2">
          {text && (
            <p className={`text-sm leading-relaxed ${dark ? 'text-nude/70' : 'text-wine/60'}`}>{text}</p>
          )}
          {link && (
            <a
              href={link.href}
              className={`mt-3 inline-block text-[0.68rem] uppercase tracking-[0.2em] underline underline-offset-8 ${
                dark ? 'text-petal hover:text-pearl' : 'text-wine/70 hover:text-wine'
              }`}
            >
              {link.label}
            </a>
          )}
        </div>
      )}
    </motion.header>
  )
}
