import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE } from '../lib/motion'
import { SplitHeading } from './Reveal'
import { ArrowIcon, Daisy } from './Icons'
import DaisyField from './DaisyField'
import { coverPhoto, products } from '../data/products'
import { IMAGE_SIZES } from '../lib/images'
import { useAutoCarousel } from '../hooks/useAutoCarousel'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Ambos bloques se desplazan en la misma dirección a distinta velocidad: si se
  // movieran uno hacia el otro, la vitrina acabaría tapando los botones del hero.
  const carousel = useAutoCarousel({ interval: 3600 })

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const showcaseY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])

  return (
    <section
      id="inicio"
      ref={ref}
      className="grain relative overflow-hidden bg-gradient-to-b from-blush via-mist to-cream pt-36 pb-24 md:pt-44"
    >
      {/* Halos difusos en tonos de marca */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-nude/50 blur-[110px] animate-float"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-[24rem] w-[24rem] rounded-full bg-rose/25 blur-[120px] animate-float"
        style={{ animationDelay: '3s' }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-28 hidden text-wine/15 lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <Daisy className="h-24 w-24" />
      </motion.div>

      <DaisyField
        items={[
          { top: '18%', left: '4%', className: 'h-40 w-40 text-wine/[0.07]', duration: 90, drift: 14 },
          { top: '52%', right: '6%', className: 'h-24 w-24 text-rose/[0.09]', reverse: true, duration: 64 },
          { top: '8%', left: '38%', className: 'h-16 w-16 text-wine/[0.06]', duration: 52, petals: 6 },
          { bottom: '12%', left: '16%', className: 'h-28 w-28 text-wine/[0.05]', reverse: true, duration: 78, drift: 16 },
        ]}
      />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.span
          className="eyebrow inline-block rounded-full border border-wine/15 bg-cream/60 px-5 py-2 text-wine/70 backdrop-blur-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          Elegancia & Comodidad
        </motion.span>

        <SplitHeading
          as="h1"
          text="Un instante para volver a ti."
          delay={0.25}
          className="mt-7 font-display text-[13vw] italic leading-[0.95] text-gradient-wine sm:text-6xl md:text-[5.5rem]"
        />

        <motion.p
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-wine/65 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
        >
          Cada prenda envuelve con suavidad, como un gesto de cuidado propio.
        </motion.p>

        <motion.div
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
        >
          <motion.a
            href="#tienda"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-wine px-9 py-4 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-nude"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <span className="absolute inset-0 -translate-x-full bg-rose transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            <span className="relative">Explorar Colección</span>
            <ArrowIcon className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            href="#historia"
            className="inline-flex items-center gap-2 rounded-full border border-wine/20 px-8 py-4 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-wine/80"
            whileHover={{ scale: 1.04, borderColor: 'rgba(70,27,20,0.5)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            Nuestra Esencia
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Vitrina en arco. En móvil es un carrusel con scroll-snap: tres columnas
          en 375px dejaban las fotos en 95px de ancho, ilegibles. */}
      <motion.div style={{ y: showcaseY }} className="relative z-0 mt-24 md:mt-32">
        <div
          ref={carousel.ref}
          className="mx-auto flex max-w-5xl snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, i) => (
            <motion.figure
              key={product.id}
              className={`relative w-[68vw] shrink-0 snap-center overflow-hidden rounded-t-[999px] bg-nude/40 shadow-[0_30px_60px_-40px_rgba(70,27,20,0.6)] sm:w-auto ${
                i === 1 ? 'aspect-[3/4.2] sm:-mt-10' : 'aspect-[3/4]'
              }`}
              initial={{ opacity: 0, y: 70, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 1 + i * 0.13 }}
              whileHover={{ y: -10 }}
            >
              <img
                src={coverPhoto(product).src}
                srcSet={coverPhoto(product).srcSet}
                sizes={IMAGE_SIZES.hero}
                alt={`Pijama ${product.name}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wine/85 to-transparent p-4 pt-10 text-center">
                <span className="font-display text-sm italic text-nude md:text-base">
                  {product.name}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Indicadores de posición (sustituyen al texto "desliza", que se
            duplicaba con la señal de scroll de más abajo). */}
        <div className="mt-2 flex justify-center gap-2 sm:hidden">
          {products.map((product, i) => (
            <button
              key={product.id}
              type="button"
              onClick={() => carousel.goTo(i)}
              aria-label={`Ver ${product.name}`}
              aria-current={carousel.active === i}
              className="flex h-11 w-6 items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  carousel.active === i ? 'w-6 bg-wine/70' : 'w-1.5 bg-wine/25'
                }`}
              />
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-16 flex flex-col items-center gap-3 text-wine/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="eyebrow text-[0.6rem]">Desliza</span>
        <motion.span
          className="h-10 w-px bg-gradient-to-b from-wine/50 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
