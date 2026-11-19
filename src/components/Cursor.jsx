import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Cursor acompañante (sólo escritorio con ratón). No reemplaza al cursor del
 * sistema: es un anillo que lo sigue con inercia y crece sobre elementos
 * interactivos. Si el elemento tiene `data-cursor="Ver"`, muestra ese texto.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    setEnabled(mq.matches)
    const onChange = () => setEnabled(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target.closest?.('a, button, [data-cursor]')
      setHovering(Boolean(target))
      setLabel(target?.getAttribute('data-cursor') ?? '')
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = label ? 84 : hovering ? 54 : 26

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95]"
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
          label ? 'bg-wine text-nude' : 'border border-wine/50'
        }`}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? '#461B14' : hovering ? 'rgba(241,217,214,0.45)' : 'rgba(241,217,214,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              className="script text-xl"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
