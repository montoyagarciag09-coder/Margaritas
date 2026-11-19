import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { EASE } from '../lib/motion'
import { LogoMark } from './Logo'

const LETTERS = 'MARGARITAS'.split('')

/**
 * Cortina de apertura: la margarita del logo florece, el wordmark sube letra a letra y
 * un contador llega a 100. Al salir, la cortina se abre en dos mitades.
 */
export default function Preloader() {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))

  useEffect(() => {
    const controls = animate(count, 100, { duration: 1.6, ease: [0.65, 0, 0.35, 1] })
    return () => controls.stop()
  }, [count])

  const half = {
    initial: { y: 0 },
    transition: { duration: 1, ease: EASE, delay: 0.1 },
  }

  return (
    <motion.div className="fixed inset-0 z-[100]" exit={{ opacity: 1, transition: { duration: 1.2 } }}>
      {/* Mitades de cortina */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-wine"
        {...half}
        exit={{ y: '-100%', transition: half.transition }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-wine"
        {...half}
        exit={{ y: '100%', transition: half.transition }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-nude"
        exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.35 } }}
      >
        <LogoMark
          className="h-20 w-20 text-nude md:h-24 md:w-24"
          center="#F1D9D6"
          pollen="#461B14"
          animated
          delay={0.05}
        />

        <motion.div
          className="wordmark mt-6 flex overflow-hidden text-[8vw] leading-none sm:text-5xl md:text-6xl"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } } }}
        >
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 0.8, ease: EASE } },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="script mt-4 text-3xl text-petal/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          un instante para volver a ti
        </motion.p>

        <div className="absolute inset-x-6 bottom-8 flex items-end justify-between text-nude/60 md:inset-x-10">
          <span className="eyebrow">Pijamas · Colombia</span>
          <motion.span className="font-display text-4xl italic tabular-nums text-nude md:text-6xl">
            {rounded}
          </motion.span>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-petal"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        />
      </motion.div>
    </motion.div>
  )
}
