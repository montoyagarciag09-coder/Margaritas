import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE, viewport } from '../../lib/motion'
import { formatCOP } from '../../lib/pricing'
import { OVERSIZE_SURCHARGE, SHIPPING_NOTICE, WHATSAPP_NUMBER } from '../../data/products'
import { LogoMark } from '../Logo'
import { WhatsappIcon } from '../Icons'
import ColorRequest from '../ColorRequest'

/** Encabezado de la tienda: miga de pan, título y aviso de despacho. */
export function ShopHeader() {
  return (
    <header className="px-6 pt-40 pb-12 md:pt-48 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Ruta" className="text-[0.65rem] uppercase tracking-[0.24em] text-wine/45">
          <a href="../" className="transition-colors hover:text-wine">
            Inicio
          </a>
          <span className="mx-2">/</span>
          <span className="text-wine">Tienda</span>
        </nav>

        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-6xl leading-[0.9] text-wine md:text-8xl">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              >
                La <span className="italic">tienda</span>
              </motion.span>
            </span>
          </h1>
          <motion.p
            className="max-w-sm text-sm leading-relaxed text-wine/60"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          >
            Pijamas y accesorios en satín y algodón. Elige, ajusta tu talla y envía tu pedido por
            WhatsApp en un toque.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          className="mt-8 max-w-xl"
        >
          <ColorRequest />
        </motion.div>
      </div>
    </header>
  )
}

const PERKS = [
  {
    title: 'Despacho en 7 días hábiles',
    text: 'O antes, según disponibilidad.',
    icon: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />,
  },
  {
    title: 'Envíos nacionales',
    text: 'Llegamos a toda Colombia.',
    icon: <path d="M12 21s-7-6.1-7-11.5A7 7 0 0119 9.5C19 14.9 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  },
  {
    title: 'Tallas S a XXL',
    text: `XL y XXL con recargo de ${formatCOP(OVERSIZE_SURCHARGE)}.`,
    icon: <path d="M4 8h16M4 16h16M8 4v16M16 4v16" />,
  },
  {
    title: 'Pedido por WhatsApp',
    text: 'Tu mensaje llega armado y listo.',
    icon: <path d="M4 5h16v11H8l-4 4V5z" />,
  },
]

/** Franja de garantías de compra. */
export function ShopPerks() {
  return (
    <section className="border-y border-wine/10 bg-mist/70 py-6 md:py-12">
      <motion.ul
        className="mx-auto flex max-w-7xl snap-x gap-6 overflow-x-auto scroll-px-6 px-6 [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-8 md:overflow-visible lg:px-10 [&::-webkit-scrollbar]:hidden"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {PERKS.map((p) => (
          <motion.li
            key={p.title}
            className="flex w-[64vw] shrink-0 snap-start items-start gap-3 sm:w-[40vw] md:w-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pearl text-wine md:h-11 md:w-11">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                {p.icon}
              </svg>
            </span>
            <span>
              <span className="block font-display text-base text-wine">{p.title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-wine/55">{p.text}</span>
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

const FAQ = [
  {
    q: '¿Cuánto tarda mi pedido?',
    a: `${SHIPPING_NOTICE} Hacemos envíos a todo el país.`,
  },
  {
    q: '¿Cómo hago mi pedido?',
    a: 'Abre el producto, elige el diseño, el tipo y la talla, y toca «Pedir por WhatsApp». El mensaje llega con todo listo para que solo lo envíes.',
  },
  {
    q: '¿Las tallas XL y XXL tienen otro precio?',
    a: `Sí, las tallas XL y XXL tienen un recargo de ${formatCOP(OVERSIZE_SURCHARGE)}. El precio se ajusta solo al elegir la talla.`,
  },
  {
    q: '¿Puedo pedir mi pijama en otro color?',
    a: 'Sí. Escríbenos por WhatsApp y pide tu pijama en el color que quieras; te confirmamos disponibilidad y tiempos.',
  },
  {
    q: '¿Puedo elegir el color de los scrunchies?',
    a: 'No se reciben solicitudes de colores específicos: los pedidos se realizan únicamente con los tonos disponibles.',
  },
  {
    q: '¿Y el color del gorro?',
    a: 'Sí, el gorro lo puedes pedir en el color que más te guste. Escríbelo al hacer tu pedido.',
  },
]

/** Preguntas frecuentes en acordeón. */
export function ShopFaq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <LogoMark className="h-12 w-12 text-wine" center="#7D5255" spin />
          <h2 className="mt-6 font-display text-4xl leading-tight text-wine md:text-5xl">
            Preguntas <span className="italic">frecuentes</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-wine/60">
            ¿Te queda alguna duda? Escríbenos y te respondemos con gusto.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-wine/20 px-5 text-[0.65rem] uppercase tracking-[0.2em] text-wine transition-colors hover:bg-wine hover:text-nude"
          >
            <WhatsappIcon className="h-4 w-4" />
            Escríbenos
          </a>
        </div>

        <ul className="md:col-span-7 md:col-start-6">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q} className="border-b border-wine/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg text-wine md:text-xl">{item.q}</span>
                  <motion.span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-wine/15 text-wine"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-sm leading-relaxed text-wine/65">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
