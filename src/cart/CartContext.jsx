import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { accessories, products, TYPES } from '../data/products'
import { getPrice } from '../lib/pricing'

/**
 * Carrito de compras.
 *
 * Se guarda en el navegador (localStorage) para que sobreviva al pasar de la
 * landing a la tienda o al recargar. Sólo se guardan referencias (id, diseño,
 * tipo, talla, color y cantidad): el precio se recalcula siempre desde
 * `src/data/products.js`, así un cambio de precios nunca deja carritos viejos
 * con valores desactualizados.
 */

const STORAGE_KEY = 'margaritas-cart-v1'
const MAX_QTY = 20

const CartContext = createContext(null)

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function save(lines) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    // Modo privado o almacenamiento bloqueado: el carrito sigue funcionando en memoria.
  }
}

/** Identifica una línea: misma referencia + mismas opciones = misma línea. */
const lineKey = (l) =>
  [l.kind, l.id, l.variant ?? '', l.type ?? '', l.size ?? '', (l.color ?? '').trim().toLowerCase()].join('|')

/**
 * Convierte una línea guardada en una línea "viva" con nombre, foto y precio
 * actuales. Devuelve null si la referencia ya no existe en el catálogo.
 */
export function resolveLine(line) {
  if (line.kind === 'accessory') {
    const item = accessories.find((a) => a.id === line.id)
    if (!item) return null
    return {
      ...line,
      name: item.name,
      photo: item.photos[0] ?? null,
      unitPrice: item.price,
      details: [
        item.colorChoice
          ? `Color: ${line.color?.trim() || 'por definir'}`
          : 'Colores: tonos disponibles',
      ],
    }
  }

  const product = products.find((p) => p.id === line.id)
  if (!product) return null
  const variant = product.variants.find((v) => v.label === line.variant) ?? product.variants[0]
  const typeLabel = TYPES.find((t) => t.value === line.type)?.label ?? line.type
  return {
    ...line,
    variant: variant.label,
    name: product.name,
    photo: variant.photos[0],
    unitPrice: getPrice(product, line.type, line.size),
    typeLabel,
    details: [
      product.variants.length > 1 ? `Diseño: ${variant.label}` : null,
      `Tipo: ${typeLabel}`,
      `Talla: ${line.size}`,
    ].filter(Boolean),
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load)
  const [open, setOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => save(lines), [lines])

  // Sincroniza entre pestañas (p. ej. landing y tienda abiertas a la vez).
  useEffect(() => {
    const onStorage = (e) => e.key === STORAGE_KEY && setLines(load())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const add = useCallback((line, qty = 1) => {
    const key = lineKey(line)
    setLines((prev) => {
      const existing = prev.find((l) => lineKey(l) === key)
      if (existing) {
        return prev.map((l) =>
          lineKey(l) === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
        )
      }
      return [...prev, { ...line, qty: Math.min(MAX_QTY, qty) }]
    })
    setLastAdded({ ...line, qty, at: Date.now() })
  }, [])

  const setQty = useCallback((key, qty) => {
    setLines((prev) =>
      prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l)),
    )
  }, [])

  const remove = useCallback((key) => {
    setLines((prev) => prev.filter((l) => lineKey(l) !== key))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo(() => {
    const items = lines
      .map((l) => {
        const resolved = resolveLine(l)
        return resolved && { ...resolved, key: lineKey(l), lineTotal: resolved.unitPrice * l.qty }
      })
      .filter(Boolean)
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.lineTotal, 0),
      add,
      setQty,
      remove,
      clear,
      open,
      setOpen,
      lastAdded,
      dismissToast: () => setLastAdded(null),
      maxQty: MAX_QTY,
    }
  }, [lines, add, setQty, remove, clear, open, lastAdded])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
