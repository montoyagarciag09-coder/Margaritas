import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import { SIZES, TYPES } from '../data/products'
import { getPrice, hasSurcharge } from '../lib/pricing'
import { orderOnWhatsapp } from '../lib/whatsapp'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import AnimatedPrice from './AnimatedPrice'
import { CloseIcon, WhatsappIcon } from './Icons'

export default function ProductModal({ product, onClose }) {
  const [type, setType] = useState('short')
  const [size, setSize] = useState('S')
  const [imageIndex, setImageIndex] = useState(0)

  const currentImage = product.images[imageIndex]
  const matchesType = currentImage.garment === type

  /** Al cambiar el tipo, salta a una foto de esa prenda si la referencia la tiene. */
  function selectType(nextType) {
    setType(nextType)
    const match = product.images.findIndex((image) => image.garment === nextType)
    if (match !== -1) setImageIndex(match)
  }

  useLockBodyScroll(true)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const price = getPrice(product, type, size)

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div
        className="absolute inset-0 bg-wine/45 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[1.75rem] bg-cream shadow-2xl md:grid-cols-2"
        initial={{ opacity: 0, scale: 0.94, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/85 text-wine backdrop-blur-sm transition-transform hover:scale-110"
        >
          <CloseIcon />
        </button>

        {/* Galería. En md la capa interna se posiciona en absoluto para que la
            columna mande sobre el tamaño y no la razón de aspecto. */}
        <div className="relative bg-mist md:min-h-[34rem]">
          <div className="relative aspect-square w-full overflow-hidden md:absolute md:inset-0 md:aspect-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIndex}
                src={currentImage.src}
                alt={`Pijama ${product.name} — ${currentImage.label}`}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </AnimatePresence>

            {/* Aclara qué prenda aparece cuando no hay foto del tipo elegido. */}
            <AnimatePresence>
              {!matchesType && (
                <motion.p
                  className="absolute left-4 top-4 rounded-full bg-wine/85 px-3.5 py-2 text-[0.6rem] uppercase tracking-[0.16em] text-nude backdrop-blur-sm"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  En la foto: {currentImage.garment === 'short' ? 'short' : 'pantalón'}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {product.images.length > 1 && (
            <div className="absolute inset-x-0 bottom-4 flex flex-wrap justify-center gap-2 px-4">
              {product.images.map((image, i) => (
                <motion.button
                  key={image.label}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  whileTap={{ scale: 0.94 }}
                  className={`relative rounded-full px-3.5 py-2 text-[0.6rem] uppercase tracking-[0.16em] backdrop-blur-md transition-colors duration-300 ${
                    i === imageIndex ? 'text-nude' : 'bg-cream/80 text-wine hover:bg-cream'
                  }`}
                >
                  {i === imageIndex && (
                    <motion.span
                      layoutId={`variant-${product.id}`}
                      className="absolute inset-0 rounded-full bg-wine"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{image.label}</span>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Detalle */}
        <motion.div
          className="p-7 md:p-9"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
        >
          {[
            <span key="tag" className="eyebrow text-wine/50">
              {product.tagline}
            </span>,
            <h3 key="name" className="mt-3 font-display text-4xl italic text-wine">
              {product.name}
            </h3>,
            <p key="desc" className="mt-4 text-sm leading-relaxed text-wine/65">
              {product.description}
            </p>,
            <ul key="details" className="mt-6 space-y-2.5">
              {product.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-sm text-wine/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nude" />
                  {detail}
                </li>
              ))}
            </ul>,
          ].map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
            >
              {child}
            </motion.div>
          ))}

          <div className="mt-7 space-y-5 border-t border-wine/10 pt-6">
            <div>
              <span className="eyebrow text-wine/45">Tipo</span>
              <div className="mt-2.5 flex rounded-full bg-white p-1">
                {TYPES.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => selectType(option.value)}
                    className={`relative flex-1 rounded-full px-4 py-2.5 text-xs font-medium transition-colors duration-300 ${
                      type === option.value ? 'text-nude' : 'text-wine/60 hover:text-wine'
                    }`}
                  >
                    {type === option.value && (
                      <motion.span
                        layoutId={`modal-type-${product.id}`}
                        className="absolute inset-0 rounded-full bg-wine"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow text-wine/45">Talla</span>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {SIZES.map((option) => (
                  <motion.button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    whileTap={{ scale: 0.92 }}
                    className={`h-10 min-w-10 rounded-full border px-3.5 text-xs font-medium transition-colors duration-300 ${
                      size === option
                        ? 'border-wine bg-wine text-nude'
                        : 'border-wine/15 bg-white text-wine/65 hover:border-wine/45 hover:text-wine'
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

            <div className="flex items-center justify-between gap-4 pt-1">
              <AnimatedPrice
                value={price}
                className="font-display text-4xl text-wine tabular-nums"
              />
              <motion.button
                type="button"
                onClick={() =>
                  orderOnWhatsapp(product, type, size, product.images[imageIndex].label)
                }
                className="inline-flex items-center gap-2.5 rounded-full bg-wine px-6 py-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-nude"
                whileHover={{ scale: 1.04, backgroundColor: '#7D5255' }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <WhatsappIcon className="h-4 w-4" />
                Pedir por WhatsApp
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
