import { motion } from 'framer-motion'
import { EASE, viewport } from '../lib/motion'
import Reveal from './Reveal'
import SectionHeader, { SECTION_Y } from './home/SectionHeader'
import ScrollText from './ScrollText'
import { Bow, Sparkle } from './Icons'

const MANIFESTO =
  'Margaritas nace para acompañar esos momentos íntimos donde el ruido se apaga y solo queda lo que realmente importa: tu calma, tu cuerpo, tu forma de sentir.'

const PARAGRAPH =
  'Texturas que acarician, siluetas que fluyen y un diseño que respira contigo, sin esfuerzo. Porque descansar no es solo dormir, es habitarte con delicadeza.'

/** Collar de perlas que se dibuja al entrar en pantalla. */
function Pearls({ className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 300 80"
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      aria-hidden
    >
      {Array.from({ length: 15 }).map((_, i) => {
        const t = i / 14
        const x = 10 + t * 280
        const y = 12 + Math.sin(t * Math.PI) * 52
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={i % 2 ? 6 : 7.5}
            className="fill-pearl stroke-nude"
            strokeWidth="1.2"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: { scale: 1, opacity: 1, transition: { delay: 0.3 + i * 0.05, type: 'spring', stiffness: 260, damping: 14 } },
            }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          />
        )
      })}
    </motion.svg>
  )
}

/** Historia de marca: todos los textos, sin fotos (ya aparecen en otras secciones). */
export default function Essence() {
  return (
    <section id="historia" className={`relative scroll-mt-24 overflow-hidden bg-pearl px-6 lg:px-10 ${SECTION_Y}`}>
      <motion.span
        aria-hidden
        className="script pointer-events-none absolute -right-6 top-6 select-none text-[34vw] leading-none text-petal/30 md:text-[18vw]"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 1.4, ease: EASE }}
      >
        Esencia
      </motion.span>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Nuestra esencia"
          title={
            <>
              Cuando el día termina, <span className="italic">comienza lo esencial.</span>
            </>
          }
          text={PARAGRAPH}
        />

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-10">
          <ScrollText
            text={MANIFESTO}
            className="font-display text-[1.6rem] leading-[1.3] text-wine md:col-span-7 md:text-4xl md:leading-[1.2]"
          />

          <div className="md:col-span-5">
            <Reveal delay={0.15} className="relative rounded-[2rem] bg-petal/60 p-8">
              <Sparkle className="absolute -top-3 -left-3 h-7 w-7 text-rose" />
              <Bow className="absolute -top-5 right-6 h-10 w-14 text-rose" strokeWidth={1.2} />
              <p className="font-display text-xl italic leading-relaxed text-wine md:text-2xl">
                “Ese pequeño lujo cotidiano que te recuerda que mereces sentirte bien, incluso en
                silencio.”
              </p>
              <p className="script mt-4 text-right text-3xl text-rose">— Margaritas</p>
            </Reveal>
            <Pearls className="mt-6 w-56 md:w-72" />
          </div>
        </div>
      </div>
    </section>
  )
}
