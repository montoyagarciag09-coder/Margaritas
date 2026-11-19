import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { image } from '../lib/images'
import { Heart, Sparkle } from './Icons'
import { LogoMark } from './Logo'

const STEPS = [
  {
    n: '01',
    title: 'Elige tu referencia',
    text: 'Samantha Satín, Samantha Algodón o Geraldine: tres maneras de descansar bonito.',
    img: image('samantha-satin-azul'),
    shape: 'rounded-t-[999px] rounded-b-[2rem]',
    tone: 'bg-petal',
  },
  {
    n: '02',
    title: 'Tipo y talla',
    text: 'Short o pantalón, de la S a la XXL. El precio se ajusta solo mientras eliges.',
    img: image('samantha-satin-animal-pantalon'),
    shape: 'rounded-[999px]',
    tone: 'bg-nude',
  },
  {
    n: '03',
    title: 'Escríbenos',
    text: 'Tu pedido llega a WhatsApp ya armado. Sin formularios, sin esperas.',
    img: image('geraldine-azul-short'),
    shape: 'rounded-[2.5rem]',
    tone: 'bg-blush',
  },
  {
    n: '04',
    title: 'Recíbela en casa',
    text: 'Envíos nacionales a toda Colombia, empacada con el cariño de siempre.',
    img: image('samantha-algodon-lineas'),
    shape: 'rounded-b-[999px] rounded-t-[2rem]',
    tone: 'bg-sand',
  },
]

function StepCard({ step, index }) {
  return (
    <article
      className={`relative flex h-full w-[82vw] shrink-0 flex-col gap-5 overflow-hidden rounded-[2.5rem] p-6 sm:w-[64vw] md:w-[48rem] md:flex-row md:gap-8 md:p-8 ${step.tone}`}
    >
      <div
        className={`relative min-h-0 flex-1 overflow-hidden border-[6px] border-pearl shadow-[0_30px_50px_-30px_rgba(70,27,20,0.7)] md:w-[52%] md:flex-none ${step.shape}`}
      >
        <img
          src={step.img.src}
          srcSet={step.img.srcSet}
          sizes="(min-width: 768px) 26rem, 80vw"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between md:flex-1 md:py-2">
        <div className="flex items-start justify-between">
          <span className="text-outline-wine font-display text-6xl italic leading-none md:text-8xl">
            {step.n}
          </span>
          <motion.span
            className="text-rose"
            animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
          >
            {index % 2 ? <Heart className="h-6 w-6" /> : <Sparkle className="h-6 w-6" />}
          </motion.span>
        </div>
        <div className="mt-4">
          <h3 className="font-display text-3xl italic text-wine md:text-4xl">{step.title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-wine/65">{step.text}</p>
        </div>
      </div>
    </article>
  )
}

/**
 * Sección anclada: el scroll vertical desplaza en horizontal una fila de
 * tarjetas con los pasos de compra.
 */
export default function ComoPedir() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  const x = useTransform(smooth, (v) => -v * distance)
  const bowRotate = useTransform(smooth, [0, 1], [0, 360])

  return (
    <section
      id="como-pedir"
      ref={sectionRef}
      className="relative bg-wine text-nude"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-8 flex w-full max-w-7xl items-end justify-between gap-6 px-6 md:mb-12 lg:px-10">
          <div>
            <span className="eyebrow text-petal/70">(02) — Cómo pedir</span>
            <h2 className="mt-4 font-display text-4xl leading-none md:text-7xl">
              Así de <span className="script text-petal">fácil</span>
            </h2>
          </div>
          <motion.span style={{ rotate: bowRotate }} className="hidden md:block">
            <LogoMark className="h-20 w-20 text-petal" center="#E0CBB9" pollen="#461B14" />
          </motion.span>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex h-[62svh] min-h-[26rem] w-max gap-5 px-6 md:gap-8 lg:px-10">
          {STEPS.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
          <div className="flex w-[70vw] shrink-0 flex-col items-start justify-center gap-6 pr-10 md:w-[30rem]">
            <p className="font-display text-4xl italic leading-tight md:text-6xl">
              Lista para
              <br />
              <span className="script text-petal">consentirte</span>
            </p>
            <a
              href="tienda/"
              className="rounded-full bg-petal px-8 py-4 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-wine transition-colors hover:bg-pearl"
            >
              Ver colección
            </a>
          </div>
        </motion.div>

        {/* Progreso */}
        <div className="mx-auto mt-8 w-full max-w-7xl px-6 lg:px-10">
          <div className="h-px w-full bg-nude/20">
            <motion.div className="h-px origin-left bg-petal" style={{ scaleX: smooth }} />
          </div>
        </div>
      </div>
    </section>
  )
}
