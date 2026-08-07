import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, viewport } from '../lib/motion'
import { coverPhoto, SIZES, TYPES } from '../data/products'
import { IMAGE_SIZES } from '../lib/images'
import { getPrice, hasSurcharge } from '../lib/pricing'
import { orderOnWhatsapp } from '../lib/whatsapp'
import AnimatedPrice from './AnimatedPrice'
import { ArrowIcon, WhatsappIcon } from './Icons'

export default function ProductCard({ product, index, onQuickView }) {
  const [type, setType] = useState('short')
  const [size, setSize] = useState('S')

  const price = getPrice(product, type, size)

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-wine/8 bg-white shadow-[0_20px_50px_-40px_rgba(70,27,20,0.55)]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.12 }}
      whileHover={{ y: -10 }}
    >
      {/* Halo de color al pasar el cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 30px 70px -45px ${product.accent}` }}
      />

      <div className="relative aspect-square overflow-hidden bg-mist">
        <motion.img
          src={coverPhoto(product).src}
          srcSet={coverPhoto(product).srcSet}
          sizes={IMAGE_SIZES.card}
          alt={`Pijama ${product.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1, ease: EASE }}
        />

        <span
          className="absolute left-4 top-4 rounded-full bg-cream/85 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-wine backdrop-blur-sm"
          style={{ boxShadow: `inset 0 0 0 1px ${product.accent}33` }}
        >
          {product.tagline}
        </span>

        {product.variants.length > 1 && (
          <span className="absolute right-4 top-4 rounded-full bg-wine/85 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-nude backdrop-blur-sm">
            {product.variants.length} diseños
          </span>
        )}

        {/* Visible siempre en táctil; en desktop aparece con el hover de la tarjeta */}
        <motion.button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-x-4 bottom-4 flex min-h-11 items-center justify-center gap-2 rounded-full bg-cream/90 text-[0.62rem] uppercase tracking-[0.22em] text-wine backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Vista rápida
          <ArrowIcon className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-wine">{product.name}</h3>
        <p className="mt-2 flex-grow text-sm leading-relaxed text-wine/55">{product.description}</p>

        <div className="mt-6 space-y-5 border-t border-wine/8 pt-6">
          {/* Tipo — control segmentado con indicador deslizante */}
          <div>
            <span className="eyebrow text-wine/45">Tipo</span>
            <div className="mt-2.5 flex rounded-full bg-mist p-1">
              {TYPES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setType(option.value)}
                  className={`relative min-h-11 flex-1 rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
                    type === option.value ? 'text-nude' : 'text-wine/60 hover:text-wine'
                  }`}
                >
                  {type === option.value && (
                    <motion.span
                      layoutId={`type-${product.id}`}
                      className="absolute inset-0 rounded-full bg-wine"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Talla — píldoras */}
          <div>
            <span className="eyebrow text-wine/45">Talla</span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {SIZES.map((option) => (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  whileTap={{ scale: 0.92 }}
                  className={`relative h-11 min-w-11 rounded-full border px-3.5 text-sm font-medium transition-colors duration-300 ${
                    size === option
                      ? 'border-wine bg-wine text-nude'
                      : 'border-wine/15 text-wine/65 hover:border-wine/45 hover:text-wine'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            <motion.p
              className="mt-2 h-4 text-[0.68rem] italic text-rose"
              animate={{ opacity: hasSurcharge(size) ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Talla especial · +$10.000
            </motion.p>
          </div>

          <div className="flex items-end justify-between gap-3 pt-1">
            <div>
              <span className="eyebrow block text-wine/40">Precio</span>
              <AnimatedPrice
                value={price}
                className="mt-1 block font-display text-3xl text-wine tabular-nums"
              />
            </div>

            <motion.button
              type="button"
              onClick={() => orderOnWhatsapp(product, type, size)}
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-wine px-5 py-3.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-nude"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <span className="absolute inset-0 -translate-x-full bg-rose transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0" />
              <WhatsappIcon className="relative h-4 w-4" />
              <span className="relative">Pedir</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
