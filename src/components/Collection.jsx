import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import Reveal, { SplitHeading } from './Reveal'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import DaisyField from './DaisyField'

export default function Collection() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="tienda" className="relative overflow-hidden bg-mist px-6 py-28 md:py-36">
      <DaisyField
        items={[
          { top: '3%', left: '6%', className: 'h-36 w-36 text-wine/[0.06]', duration: 84, drift: 14 },
          { top: '12%', right: '4%', className: 'h-48 w-48 text-rose/[0.055]', reverse: true, duration: 100 },
          { bottom: '4%', left: '38%', className: 'h-28 w-28 text-wine/[0.05]', duration: 62, petals: 6, drift: 12 },
          { bottom: '18%', right: '8%', className: 'h-20 w-20 text-wine/[0.06]', reverse: true, duration: 50 },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-wine/50">La colección</span>
          </Reveal>

          <SplitHeading
            text="Nuestras Referencias"
            className="mt-4 font-display text-4xl text-wine md:text-6xl"
          />

          <Reveal delay={0.2} className="mx-auto mt-6 h-px w-24 bg-wine/25" />

          <Reveal delay={0.28} as="p" className="mt-6 text-sm italic text-wine/55">
            Selecciona tu tipo y talla: el precio se ajusta solo y tu pedido llega a WhatsApp listo
            para enviar.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
