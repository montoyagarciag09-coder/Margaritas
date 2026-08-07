import { motion } from 'framer-motion'
import { EASE, viewport } from '../lib/motion'
import DaisyField from './DaisyField'

const ITEMS = [
  {
    title: 'Telas que acarician',
    text: 'Satín y algodón seleccionados por su caída y frescura.',
    icon: (
      <path d="M4 14c3-6 5-8 8-8s5 2 8 8c-2.5 3-5.2 4.5-8 4.5S6.5 17 4 14z" />
    ),
  },
  {
    title: 'Tallas S a XXL',
    text: 'Siluetas pensadas para acomodarse a cuerpos reales.',
    icon: <path d="M4 8h16M4 16h16M8 4v16M16 4v16" />,
  },
  {
    title: 'Hecho en Colombia',
    text: 'Emprendimiento local, confección cuidada puntada a puntada.',
    icon: <path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8L12 3z" />,
  },
  {
    title: 'Pedido por WhatsApp',
    text: 'Sin formularios: eliges y te escribimos de inmediato.',
    icon: <path d="M4 5h16v11H8l-4 4V5z" />,
  },
]

export default function Benefits() {
  return (
    <section className="relative overflow-hidden bg-cream px-6 py-20 md:py-24">
      <DaisyField
        items={[
          { top: '-8%', left: '30%', className: 'h-44 w-44 text-wine/[0.05]', duration: 88, drift: 13 },
          { bottom: '-10%', right: '14%', className: 'h-36 w-36 text-rose/[0.06]', reverse: true, duration: 72 },
          { top: '30%', left: '-3%', className: 'h-24 w-24 text-wine/[0.05]', duration: 58, petals: 6 },
        ]}
      />

      <motion.div
        className="relative z-10 mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        {ITEMS.map((item) => (
          <motion.div
            key={item.title}
            className="group text-center sm:text-left"
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
            }}
          >
            <motion.div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-nude/45 text-wine sm:mx-0"
              whileHover={{ rotate: -8, scale: 1.08, backgroundColor: '#E0CBB9' }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {item.icon}
              </svg>
            </motion.div>
            <h3 className="mt-5 font-display text-lg text-wine">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-wine/55">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
