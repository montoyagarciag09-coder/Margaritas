import { image } from '../lib/images'

export const WHATSAPP_NUMBER = '573008310528'
export const INSTAGRAM_URL = 'https://www.instagram.com/margaritas___col/'

/** Recargo aplicado a las tallas grandes (COP). */
export const OVERSIZE_SURCHARGE = 10000
export const OVERSIZE_SIZES = ['XL', 'XXL']

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

export const TYPES = [
  { value: 'short', label: 'Short' },
  { value: 'pantalon', label: 'Pantalón' },
]

/**
 * Cada referencia tiene `variants`: un diseño de tela con una o varias fotos.
 * Las fotos del mismo diseño viven juntas para que se muestren en la misma
 * sección de color. `garment` dice qué prenda aparece retratada, y la galería
 * lo usa para preferir la foto que coincide con el tipo elegido.
 */
export const products = [
  {
    id: 'samantha-satin',
    name: 'Samantha Satín',
    tagline: 'Satín premium',
    description:
      'Elegancia pura en tela satinada. Perfecta para noches de lujo y suavidad absoluta.',
    details: [
      'Satín con caída fluida y brillo suave',
      'Camisa con solapa y ribete en contraste',
      'Disponible en tres diseños de tela',
    ],
    variants: [
      {
        label: 'Azul marino',
        photos: [{ ...image('samantha-satin-azul'), garment: 'short' }],
      },
      {
        label: 'Blanco',
        photos: [{ ...image('samantha-satin-blanco'), garment: 'short' }],
      },
      {
        label: 'Animal print',
        photos: [
          { ...image('samantha-satin-animal-short'), garment: 'short' },
          { ...image('samantha-satin-animal-pantalon'), garment: 'pantalon' },
        ],
      },
    ],
    prices: { short: 90000, pantalon: 95000 },
    accent: '#2C3E6B',
  },
  {
    id: 'samantha-algodon',
    name: 'Samantha Algodón',
    tagline: 'Algodón fresco',
    description:
      'Clásicas líneas en algodón fresco. Comodidad diaria para estar en casa o salir a lo esencial.',
    details: [
      'Algodón transpirable de líneas clásicas',
      'Corte relajado que no aprieta',
      'Ideal para el uso diario',
    ],
    variants: [
      {
        label: 'Lila con líneas',
        photos: [{ ...image('samantha-algodon-lineas'), garment: 'short' }],
      },
    ],
    prices: { short: 80000, pantalon: 90000 },
    accent: '#7D5255',
  },
  {
    id: 'geraldine',
    name: 'Geraldine',
    tagline: 'Tela ligera',
    description:
      'Tela delgada, fluida y muy fresca. Diseñada para los climas cálidos y el descanso ligero.',
    details: [
      'Tejido delgado y muy fresco',
      'Blusa cruzada con lazos al frente',
      'Pensada para clima cálido',
    ],
    variants: [
      {
        label: 'Azul cielo',
        photos: [
          { ...image('geraldine-azul-pantalon'), garment: 'pantalon' },
          { ...image('geraldine-azul-blusa'), garment: 'short' },
          { ...image('geraldine-azul-short'), garment: 'short' },
        ],
      },
      {
        label: 'Rosado',
        photos: [{ ...image('geraldine-rosado-pantalon'), garment: 'pantalon' }],
      },
    ],
    prices: { short: 80000, pantalon: 90000 },
    accent: '#B08968',
  },
]

/** Foto de portada de una referencia (tarjeta y vitrina del hero). */
export function coverPhoto(product) {
  return product.variants[0].photos[0]
}

/** Índice de la primera foto del diseño que retrata `type`; 0 si no hay. */
export function photoIndexFor(variant, type) {
  const match = variant.photos.findIndex((photo) => photo.garment === type)
  return match === -1 ? 0 : match
}
