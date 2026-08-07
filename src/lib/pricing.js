import { OVERSIZE_SIZES, OVERSIZE_SURCHARGE } from '../data/products'

/**
 * Precio final de una referencia según tipo y talla.
 * Las tallas XL y XXL suman un recargo fijo.
 */
export function getPrice(product, type, size) {
  const base = product.prices[type]
  return OVERSIZE_SIZES.includes(size) ? base + OVERSIZE_SURCHARGE : base
}

export function formatCOP(value) {
  return `$${value.toLocaleString('es-CO')}`
}

export function hasSurcharge(size) {
  return OVERSIZE_SIZES.includes(size)
}
