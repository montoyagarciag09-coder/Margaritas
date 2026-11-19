import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/**
 * Logotipo de Margaritas.
 *
 * El isotipo es una margarita de doce pétalos, alternando largos y cortos para
 * que se sienta dibujada a mano y no geométrica. El centro lleva un anillo de
 * puntitos (el polen) que a tamaños pequeños se funde en un botón sólido.
 *
 * Los archivos estáticos equivalentes viven en `public/brand/`.
 */

const CX = 60
const CY = 60
export const PETAL =
  'M60 52C53.5 45 51 31 53.6 18.5c1.4-7 11.4-7 12.8 0C69 31 66.5 45 60 52z'

const PETALS = Array.from({ length: 12 }, (_, i) => ({
  angle: i * 30,
  scale: i % 2 ? 0.8 : 1,
}))

const POLLEN = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2
  return [CX + Math.cos(a) * 6.4, CY + Math.sin(a) * 6.4]
})

/**
 * Isotipo. `animated` hace que los pétalos florezcan uno a uno al montarse.
 * `spin` lo pone a girar muy lento.
 */
export function LogoMark({
  className = 'h-10 w-10',
  petal = 'currentColor',
  center = 'currentColor',
  pollen = '#F1D9D6',
  outline = false,
  animated = false,
  spin = false,
  delay = 0,
}) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 40, repeat: Infinity, ease: 'linear' } : undefined}
    >
      <g>
        {PETALS.map(({ angle, scale }, i) => (
          <g key={angle} transform={`rotate(${angle} ${CX} ${CY})`}>
            <motion.path
              d={PETAL}
              fill={outline ? 'none' : petal}
              stroke={outline ? petal : 'none'}
              strokeWidth={outline ? 1.6 : 0}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              initial={animated ? { scale: 0, opacity: 0 } : { scale }}
              animate={{ scale, opacity: 1 }}
              transition={
                animated
                  ? { duration: 0.9, ease: EASE, delay: delay + (i % 2 ? 0.25 : 0) + i * 0.035 }
                  : { duration: 0 }
              }
            />
          </g>
        ))}
      </g>
      <motion.circle
        cx={CX}
        cy={CY}
        r="11"
        fill={center}
        initial={animated ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: delay + 0.55 }}
      />
      {POLLEN.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill={pollen} opacity="0.85" />
      ))}
    </motion.svg>
  )
}

/** Logotipo horizontal: isotipo + wordmark (+ descriptor opcional). */
export default function Logo({
  className = '',
  markClassName = 'h-8 w-8',
  textClassName = 'text-xl',
  tagline = false,
  tone = 'wine',
  animated = false,
}) {
  const light = tone === 'light'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark
        className={`${markClassName} shrink-0 ${light ? 'text-nude' : 'text-wine'}`}
        center={light ? '#F1D9D6' : '#7D5255'}
        pollen={light ? '#461B14' : '#F1D9D6'}
        animated={animated}
      />
      <span className="flex flex-col leading-none">
        <span className={`wordmark font-semibold ${textClassName} ${light ? 'text-nude' : 'text-wine'}`}>
          MARGARITAS
        </span>
        {tagline && (
          <span
            className={`mt-1.5 text-[0.5rem] uppercase tracking-[0.5em] ${light ? 'text-nude/60' : 'text-rose'}`}
          >
            Pijamas · Colombia
          </span>
        )}
      </span>
    </span>
  )
}
