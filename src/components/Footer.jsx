import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE, viewport } from '../lib/motion'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from '../data/products'
import { Bow, InstagramIcon, Sparkle, WhatsappIcon } from './Icons'
import Logo from './Logo'

const INFO_LINKS = ['Guía de Tallas', 'Cuidados de la Prenda', 'Envíos Nacionales']
const LETTERS = 'MARGARITAS'.split('')

// El observador va en el titular: las líneas parten fuera de su máscara y,
// recortadas por ella, nunca se considerarían visibles.
const lineUp = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE } },
}

export default function Footer({ eyebrow = '(05) — Hablemos' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const ctaScale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1])
  const bowRotate = useTransform(scrollYProgress, [0, 1], [-30, 20])

  return (
    <footer id="contacto" ref={ref} className="relative overflow-hidden bg-wine px-6 pt-28 pb-8 text-nude md:pt-36">
      {/* CTA principal */}
      <motion.div style={{ scale: ctaScale }} className="relative mx-auto max-w-6xl text-center">
        <Reveal>
          <span className="eyebrow text-petal/70">{eyebrow}</span>
        </Reveal>
        <motion.h2
          className="mt-6 font-display text-[13vw] leading-[0.9] md:text-[8.5rem]"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={lineUp}
            >
              ¿Lista para
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block italic"
              variants={lineUp}
            >
              descansar <span className="script text-petal">bonito?</span>
            </motion.span>
          </span>
        </motion.h2>

        <motion.div style={{ rotate: bowRotate }} className="absolute -top-4 right-2 text-petal/70 md:right-16">
          <Bow className="h-16 w-20 md:h-24 md:w-32" strokeWidth={1} />
        </motion.div>

        <div className="mt-14 flex justify-center">
          <Magnetic strength={0.45}>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-40 w-40 items-center justify-center rounded-full bg-petal text-wine md:h-48 md:w-48"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-pearl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-2 text-wine/70"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                aria-hidden
              >
                <defs>
                  <path id="cta-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
                </defs>
                <text className="fill-current text-[13px] uppercase tracking-[0.4em]">
                  <textPath href="#cta-circle">Escríbenos · Escríbenos · Escríbenos ·</textPath>
                </text>
              </motion.svg>
              <WhatsappIcon className="relative h-9 w-9" />
            </a>
          </Magnetic>
        </div>
      </motion.div>

      {/* Columnas */}
      <div className="relative mx-auto mt-28 grid max-w-7xl gap-12 border-t border-nude/15 pt-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo tone="light" tagline markClassName="h-12 w-12" textClassName="text-2xl" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-nude/65">
            Emprendimiento colombiano que une feminidad, comodidad y elegancia en cada puntada. Un
            instante para volver a ti.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="eyebrow text-petal/60">Información</h4>
          <ul className="mt-6 space-y-2">
            {INFO_LINKS.map((label) => (
              <li key={label}>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `¡Hola Margaritas! Quisiera información sobre: ${label}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-10 items-center gap-2 text-sm text-nude/70 transition-colors hover:text-pearl"
                >
                  <Sparkle className="h-2.5 w-0 text-petal opacity-0 transition-all duration-500 group-hover:w-2.5 group-hover:opacity-100" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="eyebrow text-petal/60">Contacto</h4>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-11 items-center font-display text-3xl italic text-nude transition-opacity hover:opacity-75"
          >
            +57 300 831 0528
          </a>
          <div className="mt-6 flex gap-3">
            {[
              { href: `https://wa.me/${WHATSAPP_NUMBER}`, label: 'WhatsApp', Icon: WhatsappIcon },
              { href: INSTAGRAM_URL, label: 'Instagram', Icon: InstagramIcon },
            ].map(({ href, label, Icon }) => (
              <Magnetic key={label}>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-nude/25 text-nude"
                  whileHover={{ backgroundColor: '#F1D9D6', color: '#461B14', borderColor: '#F1D9D6' }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>

      {/* Wordmark gigante */}
      <motion.div
        aria-hidden
        className="wordmark mt-20 flex justify-center overflow-hidden text-[8.6vw] leading-[0.85] font-semibold text-nude/10 select-none"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      >
        {LETTERS.map((l, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { y: '100%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 1, ease: EASE } },
            }}
          >
            {l}
          </motion.span>
        ))}
      </motion.div>

      <div className="mt-8 flex flex-col items-center justify-between gap-3 text-[0.6rem] uppercase tracking-[0.24em] text-nude/40 md:flex-row">
        <span>&copy; {new Date().getFullYear()} Margaritas Colombia</span>
        <span className="script text-lg normal-case tracking-normal text-petal/60">hecho con cariño en Colombia</span>
      </div>
    </footer>
  )
}
