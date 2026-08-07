import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { EASE } from '../lib/motion'
import { photoIndexFor, SIZES, TYPES } from '../data/products'
import { getPrice, hasSurcharge } from '../lib/pricing'
import { orderOnWhatsapp } from '../lib/whatsapp'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { IMAGE_SIZES } from '../lib/images'
import AnimatedPrice from './AnimatedPrice'
import { CloseIcon, WhatsappIcon } from './Icons'

export default function ProductModal({ product, onClose }) {
  const [type, setType] = useState('short')
  const [size, setSize] = useState('S')
  const [variantIndex, setVariantIndex] = useState(0)
  const [photoIndex, setPhotoIndex] = useState(0)
  const dragControls = useDragControls()

  const variant = product.variants[variantIndex]
  const currentImage = variant.photos[photoIndex]
  const matchesType = currentImage.garment === type

  /** Al cambiar el tipo, salta a una foto de esa prenda dentro del mismo color. */
  function selectType(nextType) {
    setType(nextType)
    setPhotoIndex(photoIndexFor(variant, nextType))
  }

  /** Al cambiar de color, muestra la foto que mejor encaja con el tipo elegido. */
  function selectVariant(index) {
    setVariantIndex(index)
    setPhotoIndex(photoIndexFor(product.variants[index], type))
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
      className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-8"
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

      {/* En móvil entra como hoja inferior arrastrable; en escritorio, diálogo centrado. */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[1.75rem] bg-cream shadow-2xl md:max-h-[90vh] md:grid-cols-2 md:rounded-[1.75rem]"
        initial={{ opacity: 0, y: '18%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '12%' }}
        transition={{ duration: 0.45, ease: EASE }}
        drag="y"
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 550) onClose()
        }}
      >
        {/* Asa de arrastre (sólo móvil). El drag va atado al asa y no al panel
            entero para no secuestrar el scroll del contenido. */}
        <div
          onPointerDown={(event) => dragControls.start(event)}
          className="sticky top-0 z-20 flex touch-none justify-center bg-gradient-to-b from-cream via-cream to-transparent pt-3 pb-3 md:hidden"
        >
          <span className="h-1.5 w-11 rounded-full bg-wine/25" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-30 hidden h-11 w-11 items-center justify-center rounded-full bg-cream/85 text-wine backdrop-blur-sm transition-transform hover:scale-110 md:flex"
        >
          <CloseIcon />
        </button>

        {/* Galería. En md la capa interna se posiciona en absoluto para que la
            columna mande sobre el tamaño y no la razón de aspecto. */}
        <div className="relative bg-mist md:min-h-[34rem]">
          <div className="relative aspect-square w-full overflow-hidden md:absolute md:inset-0 md:aspect-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${variantIndex}-${photoIndex}`}
                src={currentImage.src}
                srcSet={currentImage.srcSet}
                sizes={IMAGE_SIZES.modal}
                alt={`Pijama ${product.name} — ${variant.label}`}
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

          <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-2.5 px-4">
            {/* Fotos del color actual */}
            {variant.photos.length > 1 && (
              <div className="flex gap-1.5 rounded-full bg-cream/80 px-2.5 py-2 backdrop-blur-md">
                {variant.photos.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setPhotoIndex(i)}
                    aria-label={`Foto ${i + 1} de ${variant.label}`}
                    aria-current={photoIndex === i}
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-400 ${
                        photoIndex === i ? 'w-5 bg-wine' : 'w-1.5 bg-wine/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Diseños de tela */}
            {product.variants.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2">
                {product.variants.map((option, i) => (
                  <motion.button
                    key={option.label}
                    type="button"
                    onClick={() => selectVariant(i)}
                    whileTap={{ scale: 0.94 }}
                    className={`relative rounded-full px-3.5 py-2.5 text-[0.6rem] uppercase tracking-[0.16em] backdrop-blur-md transition-colors duration-300 ${
                      i === variantIndex ? 'text-nude' : 'bg-cream/80 text-wine hover:bg-cream'
                    }`}
                  >
                    {i === variantIndex && (
                      <motion.span
                        layoutId={`variant-${product.id}`}
                        className="absolute inset-0 rounded-full bg-wine"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detalle */}
        {/* Sin padding inferior: lo aporta la barra fija para que quede a ras. */}
        <motion.div
          className="px-7 pt-7 pb-0 md:px-9 md:pt-9"
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
                    className={`relative min-h-12 flex-1 rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
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
                    className={`h-12 min-w-12 rounded-full border px-4 text-sm font-medium transition-colors duration-300 md:h-11 md:min-w-11 md:px-3 ${
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

            {/* En móvil queda fijo al fondo de la hoja: el precio y el CTA
                siempre visibles aunque se desplace el detalle. */}
            {/* Fijo al fondo del panel en todos los anchos: en pantallas medianas
                el detalle también supera el alto disponible. */}
            <div className="sticky bottom-0 -mx-7 flex items-center justify-between gap-4 border-t border-wine/10 bg-cream px-7 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:-mx-9 md:px-9 md:pb-5">
              <AnimatedPrice
                value={price}
                className="font-display text-3xl text-wine tabular-nums md:text-4xl"
              />
              <motion.button
                type="button"
                onClick={() => orderOnWhatsapp(product, type, size, variant.label)}
                className="inline-flex min-h-14 items-center gap-2.5 rounded-full bg-wine px-6 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-nude"
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
