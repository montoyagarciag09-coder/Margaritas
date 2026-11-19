import { image, optionalImage } from '../lib/images'

export const WHATSAPP_NUMBER = '573008310528'
export const INSTAGRAM_URL = 'https://www.instagram.com/margaritas___col/'

/** Recargo aplicado a las tallas grandes (COP). */
export const OVERSIZE_SURCHARGE = 10000
export const OVERSIZE_SIZES = ['XL', 'XXL']

/** Aviso de tiempos de despacho, visible en la cinta superior y junto a los pedidos. */
export const SHIPPING_NOTICE = 'Despachamos en máximo 7 días hábiles, o antes según disponibilidad.'

/** Las pijamas se pueden pedir en cualquier color escribiendo por WhatsApp. */
export const COLOR_NOTICE = 'Pide tu pijama en el color que quieras por WhatsApp.'

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
    prices: { short: 84900, pantalon: 89900 },
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
    prices: { short: 74900, pantalon: 84900 },
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
    prices: { short: 74900, pantalon: 84900 },
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

/**
 * Accesorios: no tienen tipo ni talla. Los colores no se eligen; se despachan
 * los tonos disponibles, así que las fotos sólo muestran la variedad.
 * `price` es por unidad; `priceUnit` añade la etiqueta (p. ej. «c/u»).
 */
export const accessories = [
  {
    id: 'scrunchies',
    kind: 'accessory',
    name: 'Scrunchies de satín',
    tagline: 'Nuevo · Accesorio',
    description:
      'Nuestros scrunchies están elaborados en tela de satín, un material suave y delicado con tu cabello.',
    benefits: [
      'Ayudan a reducir la fricción',
      'Evitan marcas pronunciadas',
      'Conservan tus peinados por más tiempo',
    ],
    note: 'No se reciben solicitudes de colores específicos: los pedidos se realizan únicamente con los tonos disponibles.',
    photos: [
      { ...image('scrunchies-crema-animal-azul'), alt: 'Scrunchies de satín crema, animal print y azul' },
      { ...image('scrunchies-vino-rosado'), alt: 'Scrunchies de satín vino y rosado' },
      { ...image('scrunchies-negro-lila-celeste'), alt: 'Scrunchies de satín negro, lila y celeste' },
    ],
    price: 2900,
    priceUnit: 'c/u',
    colorChoice: false,
  },
  {
    id: 'gorro',
    kind: 'accessory',
    name: 'Gorro de satín',
    tagline: 'Nuevo · Accesorio',
    description:
      'Nuestros gorros están elaborados en tela de satín, un material suave y delicado. Son ideales para proteger tu cabello mientras duermes y mantenerlo suave, organizado y con una apariencia saludable.',
    benefits: [
      'Reduce la fricción durante la noche',
      'Disminuye el frizz',
      'Evita enredos',
      'Conserva tus peinados por más tiempo',
    ],
    note: 'Puedes elegir el color que más te guste.',
    // La foto se añade al guardar `pijamas/Gorro (1).jpg` y ejecutar `npm run optimize:images`.
    photos: [optionalImage('gorro-negro')]
      .filter(Boolean)
      .map((photo) => ({ ...photo, alt: 'Gorro de satín negro' })),
    price: 24900,
    colorChoice: true,
  },
]
