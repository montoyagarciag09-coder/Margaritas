/**
 * Recoge las variantes de ancho que genera `npm run optimize:images` y arma el
 * `srcset` de cada foto, para que el móvil no descargue la versión de 1080px.
 *
 * Los archivos se llaman `<nombre>-<ancho>.webp`.
 */
const modules = import.meta.glob('../assets/*.webp', { eager: true, import: 'default' })

const catalog = {}

for (const [path, url] of Object.entries(modules)) {
  const match = path.match(/\/([^/]+)-(\d+)\.webp$/)
  if (!match) continue
  const [, name, width] = match
  catalog[name] ??= []
  catalog[name].push({ url, width: Number(width) })
}

for (const variants of Object.values(catalog)) {
  variants.sort((a, b) => a.width - b.width)
}

/** Devuelve `{ src, srcSet }` listos para un <img>. */
export function image(name) {
  const variants = catalog[name]
  if (!variants?.length) {
    throw new Error(
      `No hay variantes para "${name}". Ejecuta: npm run optimize:images`,
    )
  }

  return {
    src: variants[variants.length - 1].url,
    srcSet: variants.map((v) => `${v.url} ${v.width}w`).join(', '),
  }
}

/** Atributo `sizes` según dónde se muestre la foto (no confundir con tallas). */
export const IMAGE_SIZES = {
  card: '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw',
  hero: '(min-width: 640px) 30vw, 70vw',
  modal: '(min-width: 768px) 45vw, 100vw',
  essence: '(min-width: 768px) 45vw, 90vw',
}
