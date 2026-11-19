import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Tarjeta con inclinación 3D y brillo que sigue al cursor.
 * En táctil no se inclina (sólo ratón).
 */
export default function Tilt({ children, className = '', max = 8, glare = true, ...rest }) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 180, damping: 20 })
  const sy = useSpring(py, { stiffness: 180, damping: 20 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(sx, (v) => `${v * 100}%`)
  const gy = useTransform(sy, (v) => `${v * 100}%`)
  const background = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(255,255,255,0.45), transparent 45%)`

  function onMove(e) {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...rest}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
          style={{ background }}
        />
      )}
    </motion.div>
  )
}
