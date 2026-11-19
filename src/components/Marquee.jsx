import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { Bow, Sparkle } from './Icons'

const WORDS = [
  'Satín premium',
  'Algodón fresco',
  'Hecho en Colombia',
  'Tallas S a XXL',
  'Envíos nacionales',
  'Un instante para volver a ti',
]

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/**
 * Cinta infinita cuya velocidad responde al scroll: acelera al desplazarse
 * rápido y cambia de sentido al subir.
 */
function Ribbon({ baseVelocity, className, itemClass, Icon }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  const items = [...WORDS, ...WORDS, ...WORDS, ...WORDS]

  return (
    <div className={`overflow-hidden py-4 ${className}`}>
      <motion.div className="flex w-max items-center gap-8 whitespace-nowrap" style={{ x }}>
        {items.map((word, i) => (
          <span key={i} className={`flex items-center gap-8 ${itemClass}`}>
            <span className={i % 2 ? 'font-display italic' : 'script text-[1.35em]'}>{word}</span>
            <Icon />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="relative z-10 -my-6 overflow-x-clip py-10" aria-hidden>
      <Ribbon
        baseVelocity={-2.2}
        className="relative z-10 -mx-10 -rotate-2 bg-wine shadow-[0_20px_40px_-25px_rgba(70,27,20,0.8)]"
        itemClass="text-xl text-nude md:text-3xl"
        Icon={() => <Bow className="h-5 w-7 shrink-0 text-petal" />}
      />
      <Ribbon
        baseVelocity={1.6}
        className="absolute -inset-x-10 top-1/2 -translate-y-1/2 rotate-[1.5deg] border-y border-wine/10 bg-petal"
        itemClass="text-lg text-wine/80 md:text-2xl"
        Icon={() => <Sparkle className="h-3.5 w-3.5 shrink-0 text-rose" />}
      />
    </div>
  )
}
