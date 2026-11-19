import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { accessories, products } from '../../data/products'
import ShopTile from './ShopTile'
import ProductModal from '../ProductModal'
import AccessoryModal from '../AccessoryModal'

const ALL = [...products.map((p) => ({ ...p, kind: 'pijama' })), ...accessories]

const FILTERS = [
  { key: 'todo', label: 'Todo' },
  { key: 'pijama', label: 'Pijamas' },
  { key: 'accessory', label: 'Accesorios' },
]

const SORTS = [
  { key: 'destacados', label: 'Destacados' },
  { key: 'menor', label: 'Menor precio' },
  { key: 'mayor', label: 'Mayor precio' },
]

const minPrice = (item) => (item.kind === 'accessory' ? item.price : Math.min(...Object.values(item.prices)))

/** Lee `?p=<id>` y `#accesorios` para abrir un producto o filtrar al llegar. */
function initialState() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('p')
  const hash = window.location.hash.slice(1)
  return {
    selected: ALL.find((i) => i.id === id) ?? null,
    filter: hash === 'accesorios' ? 'accessory' : hash === 'pijamas' ? 'pijama' : 'todo',
  }
}

export default function Catalog() {
  const [{ selected: firstSelected, filter: firstFilter }] = useState(initialState)
  const [filter, setFilter] = useState(firstFilter)
  const [sort, setSort] = useState('destacados')
  const [selected, setSelected] = useState(firstSelected)

  const items = useMemo(() => {
    const list = ALL.filter((i) => filter === 'todo' || i.kind === filter)
    if (sort === 'menor') return [...list].sort((a, b) => minPrice(a) - minPrice(b))
    if (sort === 'mayor') return [...list].sort((a, b) => minPrice(b) - minPrice(a))
    return list
  }, [filter, sort])

  // Enlaces como `#accesorios` también filtran si se llega sin recargar.
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'accesorios') setFilter('accessory')
      else if (hash === 'pijamas') setFilter('pijama')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Mantiene la URL compartible con el producto abierto.
  useEffect(() => {
    const url = new URL(window.location.href)
    if (selected) url.searchParams.set('p', selected.id)
    else url.searchParams.delete('p')
    window.history.replaceState(null, '', url)
  }, [selected])

  const count = (key) => (key === 'todo' ? ALL.length : ALL.filter((i) => i.kind === key).length)

  return (
    <section id="catalogo" className="scroll-mt-28 px-6 pb-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Barra de filtros */}
        <div className="flex flex-col gap-4 border-y border-wine/10 py-4 sm:flex-row sm:items-center sm:justify-between">
          <LayoutGroup id="filters">
            <div role="tablist" aria-label="Filtrar productos" className="-mx-1 flex gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={filter === f.key}
                  onClick={() => setFilter(f.key)}
                  className={`relative flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-xs uppercase tracking-[0.18em] transition-colors ${
                    filter === f.key ? 'text-nude' : 'text-wine/60 hover:text-wine'
                  }`}
                >
                  {filter === f.key && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-wine"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f.label}</span>
                  <span className={`relative text-[0.6rem] ${filter === f.key ? 'text-nude/60' : 'text-wine/35'}`}>
                    {count(f.key)}
                  </span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          <label className="flex items-center gap-3 text-xs text-wine/55">
            Ordenar
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="min-h-10 rounded-full border border-wine/15 bg-pearl px-4 pr-8 text-xs text-wine focus:border-wine/40 focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Rejilla */}
        <motion.div layout className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {items.map((item, i) => (
              <ShopTile key={item.id} item={item} index={i} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected?.kind === 'accessory' && (
          <AccessoryModal key={selected.id} item={selected} onClose={() => setSelected(null)} />
        )}
        {selected?.kind === 'pijama' && (
          <ProductModal key={selected.id} product={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
