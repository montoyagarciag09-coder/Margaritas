import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { EASE } from '../lib/motion'
import { ArrowIcon, Heart, Sparkle } from './Icons'
import Magnetic from './Magnetic'
import { LogoMark } from './Logo'
import { coverPhoto, products } from '../data/products'
import { IMAGE_SIZES } from '../lib/images'

const [satin, algodon, geraldine] = products

/** Línea de titular que sube desde una máscara. */
function Line({ children, delay, className = '' }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '110%', rotate: 3 }}
        animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** Texto circular que gira alrededor de un moño. */
function RotatingBadge({ className = '' }) {
  const text = 'Hecho en Colombia · Pijamas con alma · '
  return (
    <div className={`relative ${className}`}>
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full text-wine"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      >
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current text-[15px] uppercase tracking-[0.32em]" style={{ fontFamily: 'Montserrat' }}>
          <textPath href="#badge-circle">{text + text}</textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-[27%] flex items-center justify-center rounded-full bg-wine">
        <LogoMark className="h-[70%] w-[70%] text-nude" center="#F1D9D6" pollen="#461B14" />
      </div>
    </div>
  )
}

/** Foto del collage con profundidad propia para el parallax del ratón. */
function Layer({ mx, my, depth, className, children, delay, initial }) {
  const x = useTransform(mx, (v) => v * depth)
  const y = useTransform(my, (v) => v * depth)
  return (
    <motion.div className={`absolute ${className}`} style={{ x, y }}>
      <motion.div
        className="h-full w-full"
        initial={initial ?? { opacity: 0, y: 80, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function Photo({ photo, alt, className = '', eager }) {
  return (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={IMAGE_SIZES.hero}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const mxRaw = useMotionValue(0)
  const myRaw = useMotionValue(0)
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 })
  const my = useSpring(myRaw, { stiffness: 60, damping: 18 })

  function onPointerMove(e) {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    mxRaw.set((e.clientX - r.left) / r.width - 0.5)
    myRaw.set((e.clientY - r.top) / r.height - 0.5)
  }

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const collageY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const collageRotate = useTransform(scrollYProgress, [0, 1], [0, -4])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={onPointerMove}
      className="lace relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-blush via-pearl to-pearl pt-32 pb-20 md:pt-40"
    >
      {/* Halos */}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-20 h-[34rem] w-[34rem] rounded-full bg-petal/70 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-nude/60 blur-[120px]" />

      {/* Destellos */}
      {[
        ['top-[22%] left-[46%]', 'h-4 w-4', '0s'],
        ['top-[70%] left-[8%]', 'h-3 w-3', '1.1s'],
        ['top-[16%] right-[6%]', 'h-5 w-5', '0.5s'],
        ['bottom-[14%] left-[52%]', 'h-3 w-3', '2s'],
      ].map(([pos, size, delay]) => (
        <span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute ${pos} animate-twinkle text-rose/60`}
          style={{ animationDelay: delay }}
        >
          <Sparkle className={size} />
        </span>
      ))}

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
        {/* Texto */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 lg:col-span-7">
          <motion.div
            className="inline-flex items-center gap-3 rounded-full border border-wine/15 bg-pearl/70 py-1.5 pr-4 pl-1.5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            <span className="flex h-7 items-center gap-1 rounded-full bg-wine px-3 text-[0.6rem] uppercase tracking-[0.2em] text-nude">
              <Heart className="h-2.5 w-2.5" /> Nuevo
            </span>
            <span className="eyebrow text-wine/70">Elegancia & Comodidad</span>
          </motion.div>

          <h1 className="relative mt-8 font-display text-[12.5vw] leading-[0.92] tracking-[-0.02em] text-wine sm:text-[10vw] lg:text-[4.5rem] xl:text-[5.8rem]">
            <Line delay={0.3}>Un instante</Line>
            <Line delay={0.42} className="sm:pl-[8%]">
              <span className="italic">
                para{' '}
                <span className="relative inline-block">
                  volver
                  {/* Trazo a mano bajo "volver", se dibuja tras el titular */}
                  <svg
                    aria-hidden
                    viewBox="0 0 300 40"
                    preserveAspectRatio="none"
                    className="absolute -bottom-[0.06em] left-[-4%] h-[0.28em] w-[108%] overflow-visible text-rose/70"
                  >
                    <motion.path
                      d="M4 26C60 10 130 6 196 14c34 4 64 10 96 4M210 30c28-6 56-8 84-14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 1.25 }}
                    />
                  </svg>
                </span>
              </span>
            </Line>
            <Line delay={0.54}>
              <span className="inline-flex items-center gap-[0.12em]">
                <span className="italic text-gradient-wine">a ti.</span>
                {/* La margarita del logo florece y gira al final del titular */}
                <LogoMark
                  className="h-[0.7em] w-[0.7em] text-rose/80"
                  center="#461B14"
                  pollen="#F1D9D6"
                  animated
                  spin
                  delay={1.5}
                />
              </span>
            </Line>

            <motion.span
              aria-hidden
              className="script pointer-events-none absolute right-[4%] bottom-[-0.15em] text-[0.42em] leading-none text-rose sm:right-[16%] lg:right-[6%]"
              initial={{ opacity: 0, rotate: -14, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -8, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 1.3 }}
            >
              con amor
            </motion.span>
          </h1>

          <motion.p
            className="mt-10 max-w-md text-base leading-relaxed text-wine/65 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          >
            Pijamas colombianas que envuelven con suavidad, como un gesto de cuidado propio. Satín,
            algodón y telas ligeras para tus noches más bonitas.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
          >
            <Magnetic>
              <a
                href="tienda/"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-wine py-4 pr-4 pl-8 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-nude"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-rose transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative">Explorar colección</span>
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-nude text-wine transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </a>
            </Magnetic>
            <a
              href="#historia"
              className="group inline-flex items-center gap-3 px-2 py-4 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-wine/80"
            >
              <span className="relative">
                Nuestra esencia
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-wine/40 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-0" />
              </span>
            </a>
          </motion.div>

          {/* Mini-prueba social con las referencias */}
          <motion.div
            className="mt-12 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <div className="flex -space-x-3">
              {products.map((p) => (
                <img
                  key={p.id}
                  src={coverPhoto(p).src}
                  alt=""
                  className="h-11 w-11 rounded-full border-2 border-pearl object-cover"
                />
              ))}
            </div>
            <p className="text-xs leading-snug text-wine/60">
              <span className="font-display text-base italic text-wine">3 referencias</span>
              <br />
              Tallas S a XXL · Envíos nacionales
            </p>
          </motion.div>
        </motion.div>

        {/* Collage */}
        <motion.div
          style={{ y: collageY, rotate: collageRotate }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[30rem] lg:col-span-5"
        >
          <Layer
            mx={mx}
            my={my}
            depth={-18}
            delay={0.5}
            className="inset-x-[12%] top-0 bottom-[8%]"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 }}
          >
            <div className="group relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-nude shadow-[0_50px_80px_-50px_rgba(70,27,20,0.7)]" data-cursor="Ver">
              <Photo
                photo={coverPhoto(satin)}
                alt={`Pijama ${satin.name}`}
                eager
                className="transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-3 rounded-t-[999px] rounded-b-[2rem] border border-pearl/50" />
              <a href={`tienda/?p=${satin.id}`} className="absolute inset-0" aria-label={`Ver ${satin.name}`} />
            </div>
          </Layer>

          <Layer
            mx={mx}
            my={my}
            depth={34}
            delay={0.85}
            className="bottom-0 -left-2 w-[42%] sm:-left-8"
            initial={{ opacity: 0, y: 60, rotate: -12 }}
          >
            <div className="aspect-[3/4] -rotate-6 overflow-hidden rounded-[999px] border-[6px] border-pearl bg-nude shadow-[0_30px_60px_-30px_rgba(70,27,20,0.6)]">
              <Photo photo={coverPhoto(geraldine)} alt={`Pijama ${geraldine.name}`} />
            </div>
          </Layer>

          <Layer
            mx={mx}
            my={my}
            depth={26}
            delay={1}
            className="top-[14%] -right-2 w-[34%] sm:-right-8"
            initial={{ opacity: 0, y: -40, rotate: 14 }}
          >
            <div className="aspect-square rotate-6 overflow-hidden rounded-[2rem] border-[6px] border-pearl bg-nude shadow-[0_30px_60px_-30px_rgba(70,27,20,0.6)]">
              <Photo photo={coverPhoto(algodon)} alt={`Pijama ${algodon.name}`} />
            </div>
          </Layer>

          <Layer
            mx={mx}
            my={my}
            depth={50}
            delay={1.25}
            className="-top-6 left-0 w-24 sm:w-28"
            initial={{ opacity: 0, scale: 0.4 }}
          >
            <RotatingBadge className="aspect-square w-full" />
          </Layer>

          <Layer
            mx={mx}
            my={my}
            depth={-40}
            delay={1.4}
            className="right-2 bottom-[18%]"
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          >
            <span className="flex items-center gap-2 rounded-full bg-pearl/90 px-4 py-2.5 text-[0.62rem] uppercase tracking-[0.2em] text-wine shadow-lg backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-rose" />
              Satín premium
            </span>
          </Layer>
        </motion.div>
      </div>

      {/* Señal de scroll */}
      <motion.a
        href="#historia"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-wine/45 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-label="Bajar a la siguiente sección"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-wine/25 pt-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-wine/60"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
