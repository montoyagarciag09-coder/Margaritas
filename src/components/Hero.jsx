import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import HeroBloom from './home/HeroBloom'
import { Heart } from './Icons'
import { LogoMark } from './Logo'

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
})

/**
 * Inicio: el titular de la marca y la margarita del logo animada; el botón a
 * la tienda va justo debajo de las cintas. En celular el texto va primero; en escritorio, lado a lado.
 */
export default function Hero() {
  return (
    <section id="inicio" className="relative bg-pearl pt-32 pb-14 md:pt-28 md:pb-0">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 md:min-h-[calc(100svh-7rem)] md:grid-cols-2 md:items-center md:gap-12 md:px-10 md:pb-12">
        {/* Animación del logo */}
        <HeroBloom className="order-2 mx-auto hidden w-full max-w-[20rem] md:block lg:max-w-[24rem]" />

        {/* Texto */}
        <div className="order-1 text-wine">
          <motion.div
            className="inline-flex items-center gap-3 rounded-full border border-wine/15 bg-pearl/70 py-1.5 pr-4 pl-1.5"
            {...rise(0.2)}
          >
            <span className="flex h-7 items-center gap-1 rounded-full bg-wine px-3 text-[0.6rem] uppercase tracking-[0.2em] text-nude">
              <Heart className="h-2.5 w-2.5" /> Nuevo
            </span>
            <span className="eyebrow whitespace-nowrap !tracking-[0.24em] text-wine/70 md:!tracking-[0.36em]">Elegancia & Comodidad</span>
          </motion.div>

          {/* Envoltura del titular: en celular la margarita animada va a la derecha */}
          <div className="relative">
          <motion.h1
            className="relative mt-5 font-display text-[2.9rem] leading-[0.95] tracking-[-0.02em] sm:text-6xl md:mt-7 md:text-7xl lg:text-[5.5rem]"
            {...rise(0.3)}
          >
            Un instante
            <br />
            <span className="italic">
              para{' '}
              <span className="relative inline-block">
                volver
                {/* Trazo a mano bajo "volver" */}
                <svg
                  aria-hidden
                  viewBox="0 0 300 40"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.08em] left-[-4%] h-[0.26em] w-[108%] overflow-visible text-rose/70"
                >
                  <motion.path
                    d="M4 26C60 10 130 6 196 14c34 4 64 10 96 4M210 30c28-6 56-8 84-14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 1 }}
                  />
                </svg>
              </span>
              <br />
              <span className="inline-flex items-center gap-[0.12em]">
                a ti.
                <LogoMark
                  className="hidden h-[0.62em] w-[0.62em] text-rose/80 md:block"
                  center="#461B14"
                  pollen="#F1D9D6"
                  animated
                  spin
                  delay={1.2}
                />
              </span>
            </span>
            <motion.span
              aria-hidden
              className="script pointer-events-none absolute right-0 bottom-[-0.1em] text-[0.4em] leading-none text-rose md:right-[8%]"
              initial={{ opacity: 0, rotate: -14, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -8, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 1.3 }}
            >
              con amor
            </motion.span>
          </motion.h1>
            <div className="pointer-events-none absolute right-[-0.75rem] bottom-[1.4rem] w-[7.6rem] sm:w-[9rem] md:hidden">
              <HeroBloom compact className="w-full" />
            </div>
          </div>

          <motion.p
            className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-wine/65 md:mt-8 md:text-lg"
            {...rise(0.45)}
          >
            Pijamas colombianas que envuelven con suavidad, como un gesto de cuidado propio. Satín,
            algodón y telas ligeras para tus noches más bonitas.
          </motion.p>


          <motion.p className="mt-7 text-xs leading-snug text-wine/60 md:mt-10" {...rise(0.75)}>
            <span className="font-display text-base italic text-wine">3 referencias</span>
            {' · '}Tallas S a XXL · Envíos nacionales
          </motion.p>
        </div>
      </div>
    </section>
  )
}
