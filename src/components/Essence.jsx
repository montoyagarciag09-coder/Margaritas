import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE, viewport } from '../lib/motion'
import Reveal, { SplitHeading } from './Reveal'
import ScrollText from './ScrollText'
import { Bow, Sparkle } from './Icons'
import { image, IMAGE_SIZES } from '../lib/images'

const mainImage = image('samantha-satin-blanco')
const detailImage = image('geraldine-azul-blusa')

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

export default function Essence() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const detailY = useTransform(scrollYProgress, [0, 1], ['40%', '-40%'])
  const bigY = useTransform(scrollYProgress, [0, 1], ['20%', '-30%'])

  return (
    <section id="historia" ref={ref} className="relative overflow-hidden bg-pearl px-6 pt-36 pb-28 md:pt-48 md:pb-40">
      {/* Palabra gigante de fondo */}
      <motion.span
        aria-hidden
        style={{ y: bigY }}
        className="script pointer-events-none absolute -left-4 top-24 select-none text-[34vw] leading-none text-petal/50 md:text-[22vw]"
      >
        Esencia
      </motion.span>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <Reveal>
            <span className="eyebrow text-rose">(01) — Nuestra esencia</span>
          </Reveal>
          <motion.span
            className="h-px flex-1 origin-left bg-wine/15"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </div>

        <ScrollText
          text={MANIFESTO}
          className="mt-10 font-display text-[1.75rem] leading-[1.25] text-wine md:text-5xl md:leading-[1.15]"
        />

        <div className="mt-20 grid items-center gap-16 md:mt-28 md:grid-cols-12 md:gap-10">
          {/* Imagen en arco con revelado por clip-path */}
          {/* El observador va en el contenedor sin recortar: el clip-path del
              propio elemento haría que nunca se considerara visible. */}
          <motion.div
            className="relative md:col-span-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="relative h-[28rem] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-nude md:h-[38rem]"
              variants={{
                hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.5, ease: EASE } },
              }}
              data-cursor="Suave"
            >
              <motion.img
                src={mainImage.src}
                srcSet={mainImage.srcSet}
                sizes={IMAGE_SIZES.essence}
                alt="Pijama Margaritas en satín blanco"
                loading="lazy"
                decoding="async"
                style={{ y: imageY, scale: 1.2 }}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-4 rounded-t-full rounded-b-[2rem] border border-pearl/60" />
            </motion.div>

            <motion.div
              style={{ y: detailY }}
              className="absolute -right-2 bottom-10 w-36 overflow-hidden rounded-[999px] border-[6px] border-pearl shadow-[0_30px_60px_-30px_rgba(70,27,20,0.6)] md:-right-12 md:w-48"
            >
              <img
                src={detailImage.src}
                srcSet={detailImage.srcSet}
                sizes="200px"
                alt="Detalle de la blusa Geraldine"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute -top-6 left-6 text-rose"
              initial={{ rotate: -40, scale: 0 }}
              whileInView={{ rotate: -12, scale: 1 }}
              viewport={viewport}
              transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.6 }}
            >
              <Bow className="h-14 w-20" strokeWidth={1.2} />
            </motion.div>
          </motion.div>

          <div className="md:col-span-5 md:col-start-8">
            <SplitHeading
              text="Cuando el día termina, comienza lo esencial."
              className="font-display text-4xl leading-[1.05] text-wine md:text-[3.4rem]"
            />

            <Reveal delay={0.15} as="p" className="mt-8 text-[0.98rem] leading-relaxed text-wine/65">
              {PARAGRAPH}
            </Reveal>

            <Reveal delay={0.3} className="relative mt-12 rounded-[2rem] bg-petal/60 p-8">
              <Sparkle className="absolute -top-3 -left-3 h-7 w-7 text-rose" />
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
