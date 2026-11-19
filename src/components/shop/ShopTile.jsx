import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../../lib/motion'
import { IMAGE_SIZES } from '../../lib/images'
import { formatCOP } from '../../lib/pricing'
import { LogoMark } from '../Logo'
import { ArrowIcon } from '../Icons'

/** Datos comunes de una ficha, sea pijama o accesorio. */
export function tileData(item) {
  if (item.kind === 'accessory') {
    return {
      photos: item.photos,
      title: item.name,
      subtitle: item.tagline.replace('Nuevo · ', ''),
      price: `${formatCOP(item.price)}${item.priceUnit ? ` ${item.priceUnit}` : ''}`,
      badge: 'Nuevo',
      meta: item.colorChoice ? 'Elige tu color' : 'Tonos disponibles',
      swatches: [],
    }
  }
  const photos = item.variants.flatMap((v) => v.photos)
  const from = Math.min(...Object.values(item.prices))
  return {
    photos,
    title: item.name,
    subtitle: item.tagline,
    price: `Desde ${formatCOP(from)}`,
    badge: item.variants.length > 1 ? `${item.variants.length} diseños` : null,
    meta: 'Short o pantalón · S a XXL',
    swatches: item.variants.map((v) => ({ label: v.label, src: v.photos[0].src })),
  }
}

/**
 * Ficha de catálogo limpia: foto 4:5, nombre, precio y muestras de tela.
 * Con `href` es un enlace (vitrina de la landing); si no, un botón.
 */
export default function ShopTile({ item, onOpen, href, index = 0 }) {
  const [hovered, setHovered] = useState(false)
  const data = tileData(item)
  const cover = data.photos[0]
  const shown = hovered && data.photos[1] ? data.photos[1] : cover
  const Tag = href ? motion.a : motion.button

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
    >
      <Tag
        {...(href ? { href } : { type: 'button', onClick: () => onOpen(item) })}
        className="group block w-full text-left"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor="Ver"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-mist">
          {cover ? (
            <AnimatePresence initial={false}>
              <motion.img
                key={shown.src}
                src={shown.src}
                srcSet={shown.srcSet}
                sizes={IMAGE_SIZES.card}
                alt={shown.alt ?? `${data.title}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-sand">
              <LogoMark className="h-16 w-16 text-wine" center="#7D5255" />
              <span className="script mt-3 text-2xl text-rose">foto muy pronto</span>
            </div>
          )}

          {data.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-pearl/90 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-wine backdrop-blur-sm">
              {data.badge}
            </span>
          )}

          <span className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-pearl/90 text-wine opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45 group-hover:opacity-100 max-md:opacity-100">
            <ArrowIcon className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3 px-0.5">
          <div className="min-w-0">
            <h3 className="font-display text-base leading-tight text-wine sm:text-lg md:text-xl">{data.title}</h3>
            <p className="mt-0.5 text-xs text-wine/50">{data.meta}</p>
          </div>
          {data.swatches.length > 1 && (
            <div className="mt-1 hidden shrink-0 -space-x-1.5 sm:flex">
              {data.swatches.map((s) => (
                <img
                  key={s.label}
                  src={s.src}
                  alt=""
                  title={s.label}
                  className="h-5 w-5 rounded-full border-2 border-pearl object-cover"
                />
              ))}
            </div>
          )}
        </div>
        <p className="mt-2 px-0.5 text-sm font-medium text-wine">{data.price}</p>
      </Tag>
    </motion.div>
  )
}
