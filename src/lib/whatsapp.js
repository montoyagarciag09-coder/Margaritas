import { TYPES, WHATSAPP_NUMBER } from '../data/products'
import { formatCOP, getPrice } from './pricing'

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Abre WhatsApp con el pedido prellenado.
 * `variant` es el diseño de tela elegido; sólo se envía desde la vista rápida,
 * donde la clienta puede verlos todos.
 */
export function orderOnWhatsapp(product, type, size, variant) {
  const typeLabel = TYPES.find((t) => t.value === type)?.label ?? type
  const message = `¡Hola Margaritas! ✨ Me interesa la pijama:
🌸 Referencia: ${product.name}${variant ? `\n🎨 Diseño: ${variant}` : ''}
📏 Talla: ${size}
👗 Tipo: ${typeLabel}
💰 Precio: ${formatCOP(getPrice(product, type, size))}

¿Me podrías dar más información sobre disponibilidad y envío?`

  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
}
