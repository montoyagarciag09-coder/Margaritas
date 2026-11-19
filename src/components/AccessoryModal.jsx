import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { EASE } from '../lib/motion'
import { SHIPPING_NOTICE } from '../data/products'
import { formatCOP } from '../lib/pricing'
import { useCart } from '../cart/CartContext'
import { BagIcon } from '../cart/CartUI'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { LogoMark } from './Logo'
import { CloseIcon, Sparkle } from './Icons'

/**
 * Pila de fotos que se baraja: la de arriba se puede arrastrar a un lado o
 * tocar para pasar a la siguiente, y avanza sola mientras está a la vista.
 */
function PhotoStack({ photos }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const [order, setOrder] = useState(() => photos.map((_, i) => i))
  const [paused, setPaused] = useState(false)

  const next = () => setOrder((o) => [...o.slice(1), o[0]])

  useEffect(() => {
    if (!inView || paused || photos.length < 2) return
    const t = setInterval(next, 3800)
    return () => clearInterval(t)
  }, [inView, paused, photos.length])

  if (photos.length === 0) {
    return (
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[2rem] bg-sand">
        <div className="lace absolute inset-0 opacity-60" />
        <div className="relative text-center">
          <LogoMark className="mx-auto h-20 w-20 text-wine" center="#7D5255" spin />
          <p className="script mt-4 text-3xl text-rose">foto muy pronto</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {order
        .slice()
        .reverse()
        .map((index) => {
          const depth = order.indexOf(index)
          const photo = photos[index]
          const top = depth === 0
          return (
            <motion.button
              type="button"
              key={photo.src}
              aria-label={top ? 'Ver la siguiente foto' : undefined}
              tabIndex={top ? 0 : -1}
              onClick={top ? next : undefined}
              data-cursor={top && photos.length > 1 ? 'Otra' : undefined}
              className="absolute inset-0 overflow-hidden rounded-[2rem] border-[6px] border-pearl bg-nude shadow-[0_30px_60px_-35px_rgba(70,27,20,0.75)]"
              style={{ zIndex: photos.length - depth }}
              animate={{
                rotate: depth === 0 ? 0 : depth % 2 ? 6 : -6,
                x: depth * 14,
                y: depth * -10,
                scale: 1 - depth * 0.05,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              drag={top && photos.length > 1 ? 'x' : false}
              dragSnapToOrigin
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500) next()
              }}
              whileTap={top ? { scale: 0.98 } : undefined}
            >
              <img
                src={photo.src}
                srcSet={photo.srcSet}
                sizes="(min-width: 768px) 30vw, 80vw"
                alt={photo.alt}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </motion.button>
          )
        })}

      {photos.length > 1 && (
        <div className="absolute -bottom-9 left-1/2 flex -translate-x-1/2 gap-1.5">
          {photos.map((photo, i) => (
            <span
              key={photo.src}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                order[0] === i ? 'w-6 bg-wine/70' : 'w-1.5 bg-wine/25'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function Stepper({ value, onChange }) {
  return (
    <div className="flex items-center rounded-full bg-pearl p-1">
      <button
        type="button"
        aria-label="Quitar uno"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-wine transition-colors hover:bg-petal"
      >
        −
      </button>
      <span className="relative w-8 overflow-hidden text-center font-display text-xl tabular-nums text-wine">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            className="block"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <button
        type="button"
        aria-label="Añadir uno"
        onClick={() => onChange(Math.min(20, value + 1))}
        className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-wine transition-colors hover:bg-petal"
      >
        +
      </button>
    </div>
  )
}

/** Vista de detalle de un accesorio: fotos, beneficios, cantidad y pedido. */
export default function AccessoryModal({ item, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState('')
  useLockBodyScroll(true)
  const cart = useCart()

  /** Agrega la cantidad elegida; "Comprar ahora" además abre el carrito. */
  function addToCart(checkout) {
    cart.add({ kind: 'accessory', id: item.id, color: item.colorChoice ? color.trim() : '' }, quantity)
    onClose()
    if (checkout) cart.setOpen(true)
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="absolute inset-0 bg-wine/50 backdrop-blur-lg" onClick={onClose} aria-hidden />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[2.5rem] bg-pearl shadow-2xl md:max-h-[90vh] md:grid-cols-2 md:rounded-[2.5rem]"
        initial={{ opacity: 0, y: '18%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '12%' }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-pearl/85 text-wine backdrop-blur-sm transition-transform hover:scale-110"
        >
          <CloseIcon />
        </button>

        <div className="bg-mist px-10 pt-14 pb-16 md:px-12 md:py-14">
          <PhotoStack photos={item.photos} />
        </div>

        <div className="flex flex-col px-7 pt-8 pb-0 md:px-9 md:pt-10">
          <span className="eyebrow inline-flex items-center gap-2 text-rose">
            <Sparkle className="h-3 w-3" />
            {item.tagline}
          </span>
          <h3 className="mt-3 font-display text-4xl italic leading-tight text-wine md:text-5xl">{item.name}</h3>
          <p className="mt-4 text-sm leading-relaxed text-wine/65">{item.description}</p>

          <ul className="mt-6 space-y-2.5">
            {item.benefits.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-wine/75">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-6 rounded-2xl bg-petal/60 px-4 py-3 text-xs italic leading-relaxed text-wine/75">
            {item.note}
          </p>

          {item.colorChoice && (
            <label className="mt-5 block">
              <span className="eyebrow text-wine/45">Color que prefieres</span>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Ej.: negro, rosado, champaña…"
                maxLength={40}
                className="mt-2 w-full rounded-full border border-wine/15 bg-white px-5 py-3 text-sm text-wine placeholder:text-wine/35 focus:border-wine/40 focus:outline-none"
              />
            </label>
          )}

          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="eyebrow text-wine/45">Cantidad</span>
            <Stepper value={quantity} onChange={setQuantity} />
          </div>

          <p className="mt-4 text-[0.7rem] text-wine/55">{SHIPPING_NOTICE}</p>

          <div className="sticky bottom-0 -mx-7 mt-6 flex items-center justify-between gap-4 border-t border-wine/10 bg-pearl px-7 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:-mx-9 md:px-9 md:pb-5">
            <span className="flex flex-col">
              <span className="font-display text-2xl italic tabular-nums text-wine md:text-3xl">
                {formatCOP(item.price * quantity)}
              </span>
              {quantity > 1 && (
                <span className="text-[0.68rem] text-wine/50">
                  {quantity} × {formatCOP(item.price)}
                </span>
              )}
            </span>
            <div className="flex flex-col items-end gap-1.5">
              <motion.button
                type="button"
                onClick={() => addToCart(false)}
                className="inline-flex min-h-14 items-center gap-2.5 rounded-full bg-wine px-6 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-nude"
                whileHover={{ scale: 1.04, backgroundColor: '#7D5255' }}
                whileTap={{ scale: 0.96 }}
              >
                <BagIcon className="h-4 w-4" />
                Agregar al carrito
              </motion.button>
              <button
                type="button"
                onClick={() => addToCart(true)}
                className="px-2 text-[0.65rem] uppercase tracking-[0.18em] text-wine/60 underline-offset-4 hover:text-wine hover:underline"
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
