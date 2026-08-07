import { motion } from 'framer-motion'
import { EASE, viewport } from '../lib/motion'

/** Entrada suave al entrar en viewport. */
export default function Reveal({
  children,
  delay = 0,
  y = 30,
  className = '',
  as = 'div',
  ...rest
}) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Titular que se revela palabra por palabra. */
export function SplitHeading({ text, className = '', delay = 0, as: Tag = 'h2' }) {
  const MotionTag = motion[Tag] ?? motion.h2
  const words = text.split(' ')

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      style={{ perspective: 800 }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0, rotate: 4 },
              show: {
                y: '0%',
                opacity: 1,
                rotate: 0,
                transition: { duration: 0.85, ease: EASE },
              },
            }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
