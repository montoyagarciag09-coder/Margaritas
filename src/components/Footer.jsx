import { motion } from 'framer-motion'
import { EASE, viewport } from '../lib/motion'
import Reveal, { SplitHeading } from './Reveal'
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from '../data/products'
import { InstagramIcon, WhatsappIcon, Daisy } from './Icons'
import DaisyField from './DaisyField'

const INFO_LINKS = ['Guía de Tallas', 'Cuidados de la Prenda', 'Envíos Nacionales']

export default function Footer() {
  return (
    <footer id="contacto" className="relative overflow-hidden bg-wine px-6 pt-24 pb-10 text-nude">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 text-nude/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        <Daisy className="h-64 w-64" />
      </motion.div>

      <DaisyField
        items={[
          { bottom: '6%', left: '4%', className: 'h-40 w-40 text-nude/[0.08]', duration: 92, drift: 15 },
          { top: '38%', left: '46%', className: 'h-24 w-24 text-nude/[0.06]', reverse: true, duration: 60, petals: 6 },
          { bottom: '30%', right: '12%', className: 'h-32 w-32 text-nude/[0.05]', duration: 76, drift: 12 },
        ]}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-nude/15 pb-14 md:grid-cols-3">
          <div>
            <Reveal>
              <span className="wordmark block text-3xl font-semibold uppercase">MARGARITAS</span>
            </Reveal>

            <Reveal delay={0.12} as="p" className="mt-6 max-w-sm text-sm leading-relaxed text-nude/70">
              Emprendimiento colombiano que une feminidad, comodidad y elegancia en cada puntada.
              Un instante para volver a ti.
            </Reveal>

            <Reveal delay={0.22}>
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-nude px-6 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-wine"
                whileHover={{ scale: 1.05, backgroundColor: '#FCFAFA' }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <WhatsappIcon className="h-4 w-4" />
                Chat WhatsApp
              </motion.a>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h4 className="eyebrow text-nude/60">Información</h4>
            </Reveal>
            <ul className="mt-6 space-y-3.5">
              {INFO_LINKS.map((label, i) => (
                <Reveal key={label} delay={0.08 * i} as="li">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `¡Hola Margaritas! Quisiera información sobre: ${label}`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex min-h-11 items-center gap-2 text-sm text-nude/70 transition-colors hover:text-cream"
                  >
                    <span className="h-px w-0 bg-nude transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-5" />
                    {label}
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <h4 className="eyebrow text-nude/60">Contacto</h4>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 items-center font-display text-2xl italic text-nude transition-opacity hover:opacity-75"
              >
                +57 300 831 0528
              </a>
            </Reveal>

            <motion.div
              className="mt-7 flex gap-3"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
            >
              {[
                { href: `https://wa.me/${WHATSAPP_NUMBER}`, label: 'WhatsApp', Icon: WhatsappIcon },
                { href: INSTAGRAM_URL, label: 'Instagram', Icon: InstagramIcon },
              ].map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-nude/25 text-nude"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                  whileHover={{ scale: 1.12, backgroundColor: '#E0CBB9', color: '#461B14' }}
                  whileTap={{ scale: 0.94 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="pt-14 pb-6 text-center">
          <SplitHeading
            text="Un instante para volver a ti"
            className="font-display text-[12vw] italic leading-[1.05] text-nude/15 xl:text-[9rem]"
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-3 text-[0.6rem] uppercase tracking-[0.24em] text-nude/40 md:flex-row">
          <span>&copy; {new Date().getFullYear()} Margaritas Colombia</span>
          <span>Hecho con cariño en Colombia</span>
        </div>
      </div>
    </footer>
  )
}
