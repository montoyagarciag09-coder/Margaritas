import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { EASE } from '../lib/motion'
import { formatCOP } from '../lib/pricing'

/** Precio que cuenta hasta su nuevo valor al cambiar tipo o talla. */
export default function AnimatedPrice({ value, className = '' }) {
  const count = useMotionValue(value)
  const display = useTransform(count, (v) => formatCOP(Math.round(v / 100) * 100))

  useEffect(() => {
    const controls = animate(count, value, { duration: 0.55, ease: EASE })
    return () => controls.stop()
  }, [count, value])

  return <motion.span className={className}>{display}</motion.span>
}
