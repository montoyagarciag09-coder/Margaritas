import { WHATSAPP_NUMBER } from '../data/products'
import { formatCOP } from './pricing'

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Redacta el mensaje del pedido a partir de las líneas del carrito.
 *
 * Cada línea trae su precio ya calculado desde el catálogo (`resolveLine` en
 * `src/cart/CartContext.jsx`), así que el mensaje siempre usa los precios
 * vigentes, con el recargo de XL/XXL incluido.
 */
export function buildOrderMessage(items, customer = {}) {
  const total = items.reduce((n, i) => n + i.unitPrice * i.qty, 0)
  const units = items.reduce((n, i) => n + i.qty, 0)

  const lines = items.map((item, index) => {
    const details = item.details.length ? `\n   ${item.details.join(' · ')}` : ''
    return `${index + 1}. ${item.name}${details}\n   ${item.qty} × ${formatCOP(item.unitPrice)} = ${formatCOP(
      item.unitPrice * item.qty,
    )}`
  })

  const contact = [
    customer.name?.trim() && `👤 Nombre: ${customer.name.trim()}`,
    customer.city?.trim() && `📍 Ciudad: ${customer.city.trim()}`,
    customer.notes?.trim() && `📝 Nota: ${customer.notes.trim()}`,
  ].filter(Boolean)

  return [
    '¡Hola Margaritas! ✨ Quiero hacer este pedido:',
    '',
    lines.join('\n\n'),
    '',
    `🛍️ Productos: ${units}`,
    `💰 Total: ${formatCOP(total)}`,
    '(El valor del envío lo confirmamos por aquí)',
    ...(contact.length ? ['', ...contact] : []),
    '',
    '¿Me confirman disponibilidad y envío? ¡Gracias! 💕',
  ].join('\n')
}

/** Abre WhatsApp con el pedido redactado. */
export function sendOrderOnWhatsapp(items, customer) {
  window.open(whatsappLink(buildOrderMessage(items, customer)), '_blank', 'noopener,noreferrer')
}
