import { motion } from 'framer-motion'
import { Daisy } from './Icons'

/**
 * Margaritas decorativas de fondo. Giran muy lento y a baja opacidad, así que
 * dan textura sin competir con el contenido. Siempre detrás y sin eventos.
 */
export default function DaisyField({ items }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item, i) => (
        <motion.div
          key={i}
          // En móvil sólo se dejan las dos primeras de cada grupo: menos
          // elementos animados y menos ruido en pantalla pequeña.
          className={`absolute ${i > 1 ? 'hidden sm:block' : ''}`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
          animate={{
            rotate: item.reverse ? -360 : 360,
            y: item.drift ? [0, -18, 0] : 0,
          }}
          transition={{
            rotate: { duration: item.duration ?? 70, repeat: Infinity, ease: 'linear' },
            y: { duration: item.drift ?? 12, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Daisy className={item.className} petals={item.petals ?? 8} />
        </motion.div>
      ))}
    </div>
  )
}
