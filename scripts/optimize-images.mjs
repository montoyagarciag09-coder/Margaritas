/**
 * Convierte las fotos originales de `pijamas/` en WebP optimizados dentro de
 * `src/assets/`. Las originales son la fuente de verdad: no se tocan.
 *
 *   node scripts/optimize-images.mjs
 */
import { mkdir, readdir, stat, unlink } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_DIR = join(root, 'pijamas')
const OUTPUT_DIR = join(root, 'src', 'assets')

/**
 * Foto original → nombre con el que la usa `src/data/products.js`.
 * El sufijo indica la prenda retratada cuando un mismo color tiene varias fotos.
 */
const IMAGES = [
  ['Samantha (3).png', 'samantha-satin-azul'],
  ['Samantha.png', 'samantha-satin-blanco'],
  ['Sanantha animal.png', 'samantha-satin-animal-short'],
  ['Sanantha animal (2).png', 'samantha-satin-animal-pantalon'],
  ['Samantha (2).png', 'samantha-algodon-lineas'],
  ['Geraldine.png', 'geraldine-azul-pantalon'],
  ['Geraldine (3)1.jpeg', 'geraldine-azul-blusa'],
  ['Geraldine (3)2.jpeg', 'geraldine-azul-short'],
  ['Geraldine (2).png', 'geraldine-rosado-pantalon'],
]

/** Anchos generados para el `srcset`. El navegador elige según el dispositivo. */
const WIDTHS = [400, 700, 1080]
const QUALITY = 80

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`

await mkdir(OUTPUT_DIR, { recursive: true })

// Empieza limpio: si cambian los anchos, no quedan variantes viejas sueltas.
for (const file of await readdir(OUTPUT_DIR)) {
  if (file.endsWith('.webp') || file.endsWith('.jpeg')) {
    await unlink(join(OUTPUT_DIR, file))
  }
}

let before = 0
let after = 0

for (const [source, name] of IMAGES) {
  const input = join(SOURCE_DIR, source)
  const { size: inputSize } = await stat(input)
  before += inputSize

  const generated = []
  for (const width of WIDTHS) {
    const output = join(OUTPUT_DIR, `${name}-${width}.webp`)
    await sharp(input)
      .resize(width, width, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(output)
    const { size } = await stat(output)
    after += size
    generated.push(`${width}px ${kb(size)}`)
  }

  console.log(`${name.padEnd(26)} ${kb(inputSize).padStart(9)} → ${generated.join('  ')}`)
}

console.log(`\nOriginales ${kb(before)} → variantes ${kb(after)}`)
console.log('El navegador descarga una sola variante por imagen.')
