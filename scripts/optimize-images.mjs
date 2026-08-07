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

/** Foto original → nombre con el que la importa `src/data/products.js`. */
const IMAGES = [
  ['Samantha (3).jpeg', 'samantha-satin-azul'],
  ['Samantha.jpeg', 'samantha-satin-blanco'],
  ['Sanantha animal.jpeg', 'samantha-satin-animal'],
  ['Samantha (2).jpeg', 'samantha-algodon-lineas'],
  ['Geraldine.jpeg', 'geraldine-azul'],
  ['Geraldine (2).jpeg', 'geraldine-rosado'],
]

const MAX_SIZE = 1080
const QUALITY = 80

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`

await mkdir(OUTPUT_DIR, { recursive: true })

let before = 0
let after = 0

for (const [source, name] of IMAGES) {
  const input = join(SOURCE_DIR, source)
  const output = join(OUTPUT_DIR, `${name}.webp`)

  const { size: inputSize } = await stat(input)
  await sharp(input)
    .resize(MAX_SIZE, MAX_SIZE, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(output)
  const { size: outputSize } = await stat(output)

  before += inputSize
  after += outputSize

  const saved = Math.round((1 - outputSize / inputSize) * 100)
  console.log(`${name.padEnd(26)} ${kb(inputSize).padStart(9)} → ${kb(outputSize).padStart(8)}  (-${saved}%)`)
}

console.log(`\nTotal ${kb(before)} → ${kb(after)} (-${Math.round((1 - after / before) * 100)}%)`)

// Limpia los .jpeg que este script reemplaza, para no dejar duplicados sin usar.
const stale = (await readdir(OUTPUT_DIR)).filter((file) => file.endsWith('.jpeg'))
for (const file of stale) {
  await unlink(join(OUTPUT_DIR, file))
  console.log(`Eliminado duplicado ${file}`)
}
