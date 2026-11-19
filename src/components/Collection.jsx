import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE, viewport } from '../lib/motion'
import { accessories, products } from '../data/products'
import { formatCOP } from '../lib/pricing'
import Reveal, { SplitHeading } from './Reveal'
import ShopTile from './shop/ShopTile'
import Magnetic from './Magnetic'
import { ArrowIcon, Sparkle } from './Icons'

const scrunchies = accessories.find((a) => a.id === 'scrunchies')
const gorro = accessories.find((a) => a.id === 'gorro')

/**
 * Vitrina de la landing: adelanta las referencias y lleva a la tienda, donde
 * vive el catálogo completo con selección de talla y pedido.
 */
export default function Collection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const radius = useTransform(scrollYProgress, [0, 1], ['6rem', '0rem'])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])

  return (
    <section id="coleccion" ref={ref} className="relative bg-pearl">
      <motion.div
        style={{ borderTopLeftRadius: radius, borderTopRightRadius: radius, scale }}
        className="lace relative origin-top bg-mist px-6 py-28 md:py-36"
      >
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <Reveal>
                <span className="eyebrow text-rose">(04) — La colección</span>
              </Reveal>
              <SplitHeading
                text="Nuestras Referencias"
                className="mt-5 font-display text-5xl leading-[0.95] text-wine md:text-8xl"
              />
            </div>
            <Reveal delay={0.2} className="md:col-span-4">
              <p className="text-sm leading-relaxed text-wine/60">
                Tres pijamas pensadas para descansar bonito. Elige tu diseño, tipo y talla en la
                tienda y envía tu pedido por WhatsApp.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3">
            {products.map((product, i) => (
              <div key={product.id} className={i === 2 ? 'col-span-2 lg:col-span-1' : ''}>
                <ShopTile item={{ ...product, kind: 'pijama' }} index={i} href={`tienda/?p=${product.id}`} />
              </div>
            ))}
          </div>

          {/* Novedades: accesorios */}
          <motion.a
            href="tienda/#accesorios"
            className="group relative mt-20 grid overflow-hidden rounded-[2.5rem] bg-wine text-nude md:grid-cols-2"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 1, ease: EASE }}
            data-cursor="Ver"
          >
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="eyebrow inline-flex items-center gap-2 text-petal">
                <Sparkle className="h-3 w-3" /> Nuevo
              </span>
              <h3 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
                Scrunchies y <span className="italic">gorros</span> de satín
              </h3>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-nude/70">
                Protegen tu cabello mientras duermes: menos fricción, menos frizz y peinados que
                duran más.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs">
                <span className="rounded-full border border-nude/25 px-4 py-2">
                  Scrunchies · {formatCOP(scrunchies.price)} c/u
                </span>
                <span className="rounded-full border border-nude/25 px-4 py-2">
                  Gorro · {formatCOP(gorro.price)}
                </span>
              </div>
              <span className="mt-10 inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-petal">
                Ver accesorios
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-petal text-wine transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </span>
            </div>
            <div className="relative grid min-h-[22rem] grid-cols-2 gap-3 p-3 md:min-h-full">
              {scrunchies.photos.slice(0, 2).map((photo, i) => (
                <div
                  key={photo.src}
                  className={`overflow-hidden rounded-[2rem] ${i === 0 ? 'rounded-t-[999px]' : 'mt-12 rounded-b-[999px]'}`}
                >
                  <img
                    src={photo.src}
                    srcSet={photo.srcSet}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    alt={photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </motion.a>

          <div className="mt-16 flex justify-center">
            <Magnetic>
              <a
                href="tienda/"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-wine py-4 pr-4 pl-8 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-nude"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-rose transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative">Ir a la tienda</span>
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-nude text-wine transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
