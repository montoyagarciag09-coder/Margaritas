import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../lib/motion'
import { formatCOP } from '../lib/pricing'
import { sendOrderOnWhatsapp } from '../lib/whatsapp'
import { SHIPPING_NOTICE } from '../data/products'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { LogoMark } from '../components/Logo'
import { CloseIcon, WhatsappIcon } from '../components/Icons'
import { useCart } from './CartContext'

export function BagIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 8h14l-1.2 11.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8L5 8z" />
      <path d="M9 10V6.5a3 3 0 016 0V10" />
    </svg>
  )
}

/** Botón del menú con el número de productos; rebota al agregar. */
export function CartButton({ className = '' }) {
  const { count, setOpen, lastAdded } = useCart()
  return (
    <motion.button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Abrir carrito, ${count} ${count === 1 ? 'producto' : 'productos'}`}
      className={`relative flex h-11 w-11 items-center justify-center rounded-full border border-wine/15 bg-pearl text-wine transition-colors hover:bg-petal ${className}`}
      animate={lastAdded ? { scale: [1, 1.18, 1] } : undefined}
      key={lastAdded?.at}
      transition={{ duration: 0.45 }}
    >
      <BagIcon />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose px-1 text-[0.6rem] font-semibold text-pearl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function QtyControl({ value, onChange, max }) {
  return (
    <div className="flex items-center rounded-full border border-wine/12 bg-pearl">
      <button
        type="button"
        aria-label="Quitar uno"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-wine transition-colors hover:bg-petal disabled:opacity-30"
      >
        −
      </button>
      <span className="w-6 text-center text-sm tabular-nums text-wine">{value}</span>
      <button
        type="button"
        aria-label="Añadir uno"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-wine transition-colors hover:bg-petal disabled:opacity-30"
      >
        +
      </button>
    </div>
  )
}

const field =
  'w-full rounded-2xl border border-wine/12 bg-pearl px-4 py-3 text-sm text-wine placeholder:text-wine/35 focus:border-wine/40 focus:outline-none'

/** Panel lateral del carrito con resumen y envío del pedido por WhatsApp. */
export function CartDrawer() {
  const { items, count, total, setQty, remove, clear, open, setOpen, maxQty } = useCart()
  const [customer, setCustomer] = useState({ name: '', city: '', notes: '' })
  const [sent, setSent] = useState(false)
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  useEffect(() => {
    if (!open) setSent(false)
  }, [open])

  function send() {
    sendOrderOnWhatsapp(items, customer)
    setSent(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-wine/45 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-pearl shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {/* Cabecera */}
            <header className="flex items-center justify-between border-b border-wine/10 px-6 py-5">
              <div>
                <h2 className="font-display text-2xl italic text-wine">Tu carrito</h2>
                <p className="text-xs text-wine/50">
                  {count} {count === 1 ? 'producto' : 'productos'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar carrito"
                className="flex h-11 w-11 items-center justify-center rounded-full text-wine transition-colors hover:bg-petal"
              >
                <CloseIcon />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <LogoMark className="h-16 w-16 text-nude" center="#7D5255" spin />
                <p className="mt-6 font-display text-2xl italic text-wine">Tu carrito está vacío</p>
                <p className="mt-2 text-sm text-wine/55">Elige tus favoritos y aquí armamos tu pedido.</p>
                <a
                  href={window.location.pathname.includes('/tienda') ? '#catalogo' : 'tienda/'}
                  onClick={() => setOpen(false)}
                  className="mt-8 rounded-full bg-wine px-7 py-3.5 text-[0.65rem] uppercase tracking-[0.22em] text-nude"
                >
                  Ir a la tienda
                </a>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6">
                  {/* Productos */}
                  <ul>
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.li
                          key={item.key}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30, height: 0, paddingTop: 0, paddingBottom: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="flex gap-4 overflow-hidden border-b border-wine/8 py-5"
                        >
                          <div className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-mist">
                            {item.photo ? (
                              <img src={item.photo.src} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <LogoMark className="h-8 w-8 text-wine/40" center="#7D5255" />
                              </div>
                            )}
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-display text-lg leading-tight text-wine">{item.name}</h3>
                              <button
                                type="button"
                                onClick={() => remove(item.key)}
                                aria-label={`Quitar ${item.name}`}
                                className="-mt-1 -mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-wine/40 transition-colors hover:bg-petal hover:text-wine"
                              >
                                <CloseIcon className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-wine/55">{item.details.join(' · ')}</p>
                            <div className="mt-auto flex items-end justify-between pt-3">
                              <QtyControl value={item.qty} max={maxQty} onChange={(q) => setQty(item.key, q)} />
                              <div className="text-right">
                                <p className="text-sm font-medium tabular-nums text-wine">{formatCOP(item.lineTotal)}</p>
                                {item.qty > 1 && (
                                  <p className="text-[0.65rem] tabular-nums text-wine/45">{formatCOP(item.unitPrice)} c/u</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  <button
                    type="button"
                    onClick={clear}
                    className="mt-3 text-xs text-wine/45 underline-offset-4 hover:text-wine hover:underline"
                  >
                    Vaciar carrito
                  </button>

                  {/* Datos opcionales para el mensaje */}
                  <fieldset className="mt-8 space-y-3 pb-6">
                    <legend className="eyebrow mb-3 text-wine/45">Tus datos (opcional)</legend>
                    <input
                      className={field}
                      placeholder="Nombre"
                      autoComplete="name"
                      value={customer.name}
                      maxLength={60}
                      onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                    />
                    <input
                      className={field}
                      placeholder="Ciudad"
                      autoComplete="address-level2"
                      value={customer.city}
                      maxLength={60}
                      onChange={(e) => setCustomer((c) => ({ ...c, city: e.target.value }))}
                    />
                    <textarea
                      className={`${field} resize-none`}
                      rows={2}
                      placeholder="Nota para tu pedido"
                      value={customer.notes}
                      maxLength={240}
                      onChange={(e) => setCustomer((c) => ({ ...c, notes: e.target.value }))}
                    />
                  </fieldset>
                </div>

                {/* Resumen y envío */}
                <footer className="border-t border-wine/10 bg-mist/60 px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-wine/60">
                      <dt>Subtotal</dt>
                      <dd className="tabular-nums">{formatCOP(total)}</dd>
                    </div>
                    <div className="flex justify-between text-wine/60">
                      <dt>Envío</dt>
                      <dd>Se confirma por WhatsApp</dd>
                    </div>
                    <div className="flex items-baseline justify-between pt-2">
                      <dt className="font-display text-lg text-wine">Total</dt>
                      <dd className="font-display text-3xl italic tabular-nums text-wine">{formatCOP(total)}</dd>
                    </div>
                  </dl>

                  <motion.button
                    type="button"
                    onClick={send}
                    className="mt-4 flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-wine text-[0.68rem] font-medium uppercase tracking-[0.2em] text-nude"
                    whileHover={{ backgroundColor: '#7D5255' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <WhatsappIcon className="h-4 w-4" />
                    Enviar pedido por WhatsApp
                  </motion.button>

                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.p
                        key="sent"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 text-center text-xs text-wine/70"
                      >
                        Te abrimos WhatsApp con tu pedido. ¿Ya lo enviaste?{' '}
                        <button type="button" onClick={() => { clear(); setOpen(false) }} className="font-medium text-rose underline underline-offset-4">
                          Vaciar carrito
                        </button>
                      </motion.p>
                    ) : (
                      <motion.p key="notice" className="mt-3 text-center text-[0.68rem] leading-snug text-wine/50">
                        No pagas aquí: te escribimos para confirmar el pago y el envío. {SHIPPING_NOTICE}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Aviso breve al agregar un producto, con acceso directo al carrito. */
export function CartToast() {
  const { lastAdded, dismissToast, setOpen, open, items } = useCart()

  useEffect(() => {
    if (!lastAdded) return
    const t = setTimeout(dismissToast, 3200)
    return () => clearTimeout(t)
  }, [lastAdded, dismissToast])

  const item = lastAdded && items.find((i) => i.id === lastAdded.id)

  return (
    <AnimatePresence>
      {lastAdded && item && !open && (
        <motion.div
          key={lastAdded.at}
          role="status"
          className="fixed inset-x-3 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[75] mx-auto flex max-w-sm items-center gap-3 rounded-[1.5rem] bg-wine p-3 pr-4 text-nude shadow-2xl md:right-6 md:left-auto md:mx-0"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        >
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-nude">
            {item.photo && <img src={item.photo.src} alt="" className="h-full w-full object-cover" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-petal">Agregado al carrito</p>
            <p className="truncate font-display text-base italic">{item.name}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              dismissToast()
              setOpen(true)
            }}
            className="shrink-0 rounded-full bg-petal px-4 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-wine"
          >
            Ver carrito
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
