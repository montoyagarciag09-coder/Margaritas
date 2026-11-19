import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { EASE } from '../lib/motion'
import { COLOR_NOTICE, SHIPPING_NOTICE, WHATSAPP_NUMBER } from '../data/products'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { WhatsappIcon } from './Icons'
import Logo from './Logo'
import Magnetic from './Magnetic'
import { CartButton } from '../cart/CartUI'

/**
 * Enlaces por página. Los que empiezan por "#" son secciones de la página
 * actual (y se resaltan al hacer scroll); el resto navegan a otra página.
 */
const LINKS = {
  home: [
    { key: 'tienda', href: 'tienda/', label: 'Tienda' },
    { key: 'historia', href: '#historia', label: 'Esencia' },
    { key: 'como-pedir', href: '#como-pedir', label: 'Cómo pedir' },
    { key: 'contacto', href: '#contacto', label: 'Contacto' },
  ],
  shop: [
    { key: 'tienda', href: '#catalogo', label: 'Tienda' },
    { key: 'historia', href: '../#historia', label: 'Esencia' },
    { key: 'como-pedir', href: '../#como-pedir', label: 'Cómo pedir' },
    { key: 'contacto', href: '#contacto', label: 'Contacto' },
  ],
}

/** Sección visible ahora mismo, para la píldora activa del menú. */
function useActiveSection(links, fallback) {
  const [active, setActive] = useState(fallback)
  useEffect(() => {
    const byId = new Map(
      links.filter((l) => l.href.startsWith('#')).map((l) => [l.href.slice(1), l.key]),
    )
    const sections = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(byId.get(entry.target.id))
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [links])
  return active
}

export default function Navbar({ page = 'home' }) {
  const links = LINKS[page]
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const { scrollY, scrollYProgress } = useScroll()
  const active = useActiveSection(links, page === 'shop' ? 'tienda' : null)

  // Se esconde al bajar y reaparece al subir: menos ruido al leer.
  useMotionValueEvent(scrollY, 'change', (value) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(value > 40)
    setHidden(value > prev && value > 400)
  })
  useLockBodyScroll(open)

  const highlighted = hover ?? active

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: '-100%' }}
        animate={{ y: hidden && !open ? '-100%' : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {/* Aviso de despacho */}
        <div className="overflow-hidden bg-wine text-nude">
          <motion.p
            className="flex w-max items-center gap-10 whitespace-nowrap py-2 text-[0.6rem] uppercase tracking-[0.26em]"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-10">
                <span>{i % 2 ? COLOR_NOTICE : SHIPPING_NOTICE}</span>
                <span className="text-petal">✿</span>
              </span>
            ))}
          </motion.p>
        </div>

        <div className="px-3 pt-3 md:px-6 md:pt-4">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pr-2 pl-5 transition-all duration-500 md:pl-7 ${
            scrolled
              ? 'border border-wine/10 bg-pearl/75 shadow-[0_20px_50px_-30px_rgba(70,27,20,0.45)] backdrop-blur-xl'
              : 'border border-wine/10 bg-pearl/70 backdrop-blur-xl'
          }`}
        >
          <a href={page === 'shop' ? '../' : '#inicio'} aria-label="Margaritas, inicio" className="group inline-flex min-h-11 items-center">
            <Logo
              animated
              markClassName="h-8 w-8 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[90deg]"
              textClassName="text-lg md:text-xl"
            />
          </a>

          <ul
            className="hidden items-center rounded-full bg-cream/60 p-1 lg:flex"
            onMouseLeave={() => setHover(null)}
          >
            {links.map((link) => (
              <li key={link.key} className="relative">
                <a
                  href={link.href}
                  onMouseEnter={() => setHover(link.key)}
                  className={`relative z-10 block rounded-full px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    highlighted === link.key ? 'text-nude' : 'text-wine/70'
                  }`}
                >
                  {link.label}
                </a>
                {highlighted === link.key && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-wine"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <CartButton />
            <Magnetic className="hidden lg:block">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-wine px-5 py-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-nude"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-rose transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <WhatsappIcon className="relative h-3.5 w-3.5" />
                <span className="relative">Escríbenos</span>
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full bg-wine text-nude lg:hidden"
            >
              <motion.span
                className="block h-px w-4 bg-nude"
                animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <motion.span
                className="block h-px w-4 bg-nude"
                animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </button>
          </div>
        </nav>

        <motion.div
          className="mx-auto mt-2 h-[2px] max-w-6xl origin-left rounded-full bg-gradient-to-r from-petal via-rose to-wine"
          style={{ scaleX: scrollYProgress }}
        />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lace fixed inset-0 z-40 flex flex-col justify-between bg-pearl px-7 pt-28 pb-10 lg:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
            >
              {links.map((link, i) => (
                <li key={link.key} className="overflow-hidden border-b border-wine/10">
                  <motion.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 font-display text-4xl italic text-wine"
                    variants={{
                      hidden: { y: '110%' },
                      show: { y: '0%', transition: { duration: 0.7, ease: EASE } },
                    }}
                  >
                    <span className="font-sans text-[0.65rem] not-italic tracking-[0.3em] text-rose">
                      0{i + 1}
                    </span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
            >
              <p className="script mb-5 text-3xl text-rose">con cariño, Margaritas</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-wine px-6 py-4 text-[0.7rem] uppercase tracking-[0.24em] text-nude"
              >
                <WhatsappIcon className="h-4 w-4" />
                Chat WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
