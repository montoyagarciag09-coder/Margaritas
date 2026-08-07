import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { EASE } from '../lib/motion'
import { WHATSAPP_NUMBER } from '../data/products'
import { WhatsappIcon } from './Icons'

/** Botón flotante que aparece tras el hero. */
export default function FloatingWhatsapp() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 700))

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Escríbenos por WhatsApp"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-wine text-nude shadow-[0_18px_40px_-15px_rgba(70,27,20,0.8)]"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.45, ease: EASE }}
          whileHover={{ scale: 1.1, backgroundColor: '#7D5255' }}
          whileTap={{ scale: 0.93 }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-wine/30" />
          <WhatsappIcon className="relative h-6 w-6" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
