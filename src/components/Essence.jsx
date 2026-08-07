import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE, viewport } from '../lib/motion'
import Reveal, { SplitHeading } from './Reveal'
import { Daisy } from './Icons'
import DaisyField from './DaisyField'
import { image, IMAGE_SIZES } from '../lib/images'

const essenceImage = image('samantha-satin-blanco')

const PARAGRAPHS = [
  'Margaritas nace para acompañar esos momentos íntimos donde el ruido se apaga y solo queda lo que realmente importa: tu calma, tu cuerpo, tu forma de sentir.',
  'Texturas que acarician, siluetas que fluyen y un diseño que respira contigo, sin esfuerzo. Porque descansar no es solo dormir, es habitarte con delicadeza.',
]

export default function Essence() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.08])

  return (
    <section
      id="historia"
      ref={ref}
      className="grain relative overflow-hidden bg-cream px-6 py-28 md:py-36"
    >
      <DaisyField
        items={[
          { top: '6%', right: '10%', className: 'h-52 w-52 text-wine/[0.055]', duration: 96, drift: 15 },
          { bottom: '8%', left: '2%', className: 'h-32 w-32 text-rose/[0.07]', reverse: true, duration: 68 },
          { top: '44%', right: '2%', className: 'h-20 w-20 text-wine/[0.06]', duration: 54, petals: 6, drift: 11 },
        ]}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
        {/* Imagen en arco: cortina que sube al entrar en viewport */}
        <div className="relative">
          {/* El observador va en el contenedor sin transformar: si estuviera en
              la cortina, su propio desplazamiento la sacaría del viewport. */}
          <motion.div
            className="relative h-[26rem] overflow-hidden rounded-t-full rounded-b-3xl bg-nude md:h-[34rem]"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.div
              className="h-full w-full"
              variants={{
                hidden: { y: '101%' },
                show: { y: '0%', transition: { duration: 1.2, ease: EASE } },
              }}
            >
              <motion.img
                src={essenceImage.src}
                srcSet={essenceImage.srcSet}
                sizes={IMAGE_SIZES.essence}
                alt="Pijama Margaritas en satín"
                loading="lazy"
                decoding="async"
                style={{ y: imageY, scale: imageScale }}
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine/25 via-transparent to-nude/20" />
            <div className="pointer-events-none absolute inset-4 rounded-t-full rounded-b-2xl border border-cream/40" />
          </motion.div>

          <motion.div
            aria-hidden
            className="absolute -bottom-7 -right-4 text-nude md:-right-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          >
            <Daisy className="h-20 w-20 md:h-28 md:w-28" />
          </motion.div>
        </div>

        <div>
          <Reveal>
            <span className="eyebrow text-wine/50">Nuestra Esencia</span>
          </Reveal>

          <SplitHeading
            text="Cuando el día termina, comienza lo esencial."
            className="mt-5 font-display text-3xl leading-tight text-wine md:text-[2.9rem]"
          />

          <div className="mt-8 space-y-6 text-[0.98rem] leading-relaxed text-wine/70">
            {PARAGRAPHS.map((text, i) => (
              <Reveal key={i} delay={0.15 + i * 0.12} as="p">
                {text}
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.45} className="mt-9 border-l-2 border-nude pl-6">
            <p className="font-display text-xl italic leading-relaxed text-wine md:text-2xl">
              Margaritas es ese pequeño lujo cotidiano que te recuerda que mereces sentirte bien,
              incluso en silencio.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
