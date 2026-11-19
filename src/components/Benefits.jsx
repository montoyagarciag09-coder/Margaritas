import { motion } from 'framer-motion'
import { EASE, viewport } from '../lib/motion'
import { image } from '../lib/images'
import { Bow, Heart, Sparkle } from './Icons'
import Tilt from './Tilt'
import Reveal, { SplitHeading } from './Reveal'

const fabricImage = image('samantha-satin-animal-short')

const ITEMS = [
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

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } },
}

export default function Benefits() {
  return (
    <section className="relative overflow-hidden bg-pearl px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow text-rose">(03) — Por qué Margaritas</span>
            </Reveal>
            <SplitHeading
              text="Pequeños detalles, gran diferencia."
              className="mt-5 max-w-xl font-display text-4xl leading-[1.05] text-wine md:text-6xl"
            />
          </div>
          <Reveal delay={0.2} as="p" className="max-w-xs text-sm leading-relaxed text-wine/60">
            Cada pijama se piensa como un abrazo: telas nobles, cortes amables y un trato cercano de
            principio a fin.
          </Reveal>
        </div>

        <motion.div
          className="mt-14 grid auto-rows-[minmax(13rem,auto)] gap-4 md:grid-cols-4 md:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Tarjeta destacada con foto */}
          <motion.div variants={card} className="md:col-span-2 md:row-span-2">
            <Tilt className="group h-full min-h-[24rem] overflow-hidden rounded-[2.5rem] bg-wine" max={5}>
              <img
                src={fabricImage.src}
                srcSet={fabricImage.srcSet}
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="Pijama en satín animal print"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-8 text-nude md:p-10" style={{ transform: 'translateZ(40px)' }}>
                <Bow className="mb-auto h-10 w-14 text-petal" />
                <span className="eyebrow text-petal/80">Telas que acarician</span>
                <p className="mt-3 font-display text-3xl italic leading-tight md:text-4xl">
                  Satín y algodón seleccionados por su caída y frescura.
                </p>
              </div>
            </Tilt>
          </motion.div>

          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              variants={card}
              
            >
              <Tilt
                className={`group flex h-full flex-col justify-between rounded-[2.5rem] p-7 ${
                  i === 0 ? 'bg-petal' : i === 1 ? 'bg-nude/60' : 'scallop-top bg-blush pt-10'
                }`}
              >
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-pearl text-wine"
                  whileHover={{ rotate: -12, scale: 1.1 }}
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </motion.div>
                <div className="mt-8">
                  <h3 className="font-display text-2xl text-wine">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-wine/60">{item.text}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}

          {/* Tarjeta de cifras */}
          <motion.div variants={card}>
            <Tilt className="group flex h-full flex-col items-center justify-center rounded-[2.5rem] border border-wine/10 bg-pearl p-7 text-center">
              <div className="flex gap-1 text-rose">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {i === 1 ? <Heart className="h-5 w-5" /> : <Sparkle className="h-4 w-4" />}
                  </motion.span>
                ))}
              </div>
              <p className="script mt-3 text-5xl text-wine">dulces sueños</p>
              <p className="eyebrow mt-3 text-wine/50">desde Colombia, con cariño</p>
            </Tilt>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
