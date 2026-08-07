// WebP generados por `npm run optimize:images` desde las fotos de `pijamas/`.
import samanthaSatinAzul from '../assets/samantha-satin-azul.webp'
import samanthaSatinBlanco from '../assets/samantha-satin-blanco.webp'
import samanthaSatinAnimal from '../assets/samantha-satin-animal.webp'
import samanthaAlgodon from '../assets/samantha-algodon-lineas.webp'
import geraldineAzul from '../assets/geraldine-azul.webp'
import geraldineRosado from '../assets/geraldine-rosado.webp'

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
 * Cada foto declara en `garment` la prenda que aparece retratada. No todas las
 * referencias tienen foto de las dos versiones, así que la galería la usa para
 * preferir la que coincide con el tipo elegido y para avisar cuando no coincide.
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
    images: [
      { src: samanthaSatinAzul, label: 'Azul marino', garment: 'short' },
      { src: samanthaSatinBlanco, label: 'Blanco', garment: 'short' },
      { src: samanthaSatinAnimal, label: 'Animal print', garment: 'short' },
    ],
    prices: { short: 75000, pantalon: 80000 },
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
    images: [{ src: samanthaAlgodon, label: 'Lila con líneas', garment: 'short' }],
    prices: { short: 65000, pantalon: 75000 },
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
    images: [
      { src: geraldineAzul, label: 'Azul cielo', garment: 'short' },
      { src: geraldineRosado, label: 'Rosado', garment: 'pantalon' },
    ],
    prices: { short: 65000, pantalon: 75000 },
    accent: '#B08968',
  },
]
