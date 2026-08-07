import { motion } from 'framer-motion'
import { Daisy } from './Icons'

const WORDS = [
  'Satín premium',
  'Algodón fresco',
  'Hecho en Colombia',
  'Tallas S a XXL',
  'Envíos nacionales',
  'Un instante para volver a ti',
]

/** Cinta infinita entre secciones. */
export default function Marquee() {
  const items = [...WORDS, ...WORDS]

  return (
    <div className="relative overflow-hidden border-y border-wine/10 bg-wine py-5">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((word, i) => (
          <span key={i} className="flex items-center gap-10 text-nude/85">
            <span className="font-display text-lg italic md:text-2xl">{word}</span>
            <Daisy className="h-4 w-4 shrink-0 text-nude/40" petals={6} />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
