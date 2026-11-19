import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {children}&nbsp;
    </motion.span>
  )
}

/** Párrafo que se "entinta" palabra por palabra al hacer scroll. */
export default function ScrollText({ text, className = '', as: Tag = 'p' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {word}
          </Word>
        )
      })}
    </Tag>
  )
}
