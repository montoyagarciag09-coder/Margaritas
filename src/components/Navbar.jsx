import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { EASE } from '../lib/motion'
import { WHATSAPP_NUMBER } from '../data/products'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { WhatsappIcon } from './Icons'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#historia', label: 'Nuestra Esencia' },
  { href: '#tienda', label: 'Colección' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 40))
  useLockBodyScroll(open)

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'border-b border-wine/10 bg-cream/80 shadow-[0_8px_30px_-20px_rgba(70,27,20,0.5)] backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
            <a
              href="#inicio"
              className="wordmark text-xl font-semibold text-wine transition-opacity hover:opacity-70 md:text-2xl"
            >
              MARGARITAS
            </a>

            <ul className="hidden items-center gap-9 lg:flex">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative block text-[0.7rem] uppercase tracking-[0.22em] text-wine/80 transition-colors hover:text-wine"
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-wine transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-full bg-wine px-5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-nude lg:inline-flex"
                whileHover={{ scale: 1.04, backgroundColor: '#7D5255' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <WhatsappIcon className="h-3.5 w-3.5" />
                Escríbenos
              </motion.a>

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Abrir menú"
                aria-expanded={open}
                className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-wine/15 text-wine lg:hidden"
              >
                <motion.span
                  className="block h-px w-4 bg-wine"
                  animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
                <motion.span
                  className="block h-px w-4 bg-wine"
                  animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </button>
            </div>
          </nav>
        </div>

        {/* Barra de progreso de lectura */}
        <motion.div
          className="h-[2px] origin-left bg-gradient-to-r from-nude via-rose to-wine"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-cream px-8 lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <motion.ul
              className="space-y-2"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            >
              {LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-wine/10 py-4 font-display text-3xl italic text-wine"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-wine px-6 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-nude"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
            >
              <WhatsappIcon className="h-4 w-4" />
              Chat WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
