import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

const LETTERS = 'MARGARITAS'.split('')

/** Cortina de apertura con el logotipo de la marca. */
export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-wine"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 1, ease: EASE, delay: 0.15 } }}
    >
      <motion.div
        className="wordmark flex text-nude text-[7vw] leading-none sm:text-4xl md:text-6xl"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } } }}
      >
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: 40, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 h-px w-40 origin-left bg-nude/40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.15, ease: EASE, delay: 0.35 }}
      />

      <motion.p
        className="eyebrow mt-6 text-nude/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Un instante para volver a ti
      </motion.p>
    </motion.div>
  )
}
