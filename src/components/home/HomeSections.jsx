import { motion } from 'framer-motion'
import { EASE, viewport } from '../../lib/motion'
import { formatCOP } from '../../lib/pricing'
import { products } from '../../data/products'
import { ArrowIcon, Bow, Heart, Sparkle } from '../Icons'
import SectionHeader, { SECTION_Y } from './SectionHeader'
import ColorRequest from '../ColorRequest'

/* ------------------------------------------------------------------
   Por qué Margaritas: beneficios + guía de telas
------------------------------------------------------------------- */

const BENEFITS = [
  {
    title: 'Tallas S a XXL',
    text: 'Siluetas pensadas para acomodarse a cuerpos reales.',
    icon: <path d="M4 8h16M4 16h16M8 4v16M16 4v16" />,
    tone: 'bg-petal',
  },
  {
    title: 'Hecho en Colombia',
    text: 'Emprendimiento local, confección cuidada puntada a puntada.',
    icon: <path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8L12 3z" />,
    tone: 'bg-nude/60',
  },
  {
    title: 'Pedido por WhatsApp',
    text: 'Sin formularios: eliges y te escribimos de inmediato.',
    icon: <path d="M4 5h16v11H8l-4 4V5z" />,
    tone: 'scallop-top bg-blush pt-9',
  },
]

const rise = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export function WhyUs() {
  const fabrics = products.map((p) => ({
    id: p.id,
    name: p.name,
    fabric: p.tagline,
    text: p.description,
    from: Math.min(...Object.values(p.prices)),
    swatches: p.variants.map((v) => ({ label: v.label, src: v.photos[0].src })),
  }))

  return (
    <section id="por-que" className={`scroll-mt-24 bg-mist px-6 lg:px-10 ${SECTION_Y}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Por qué Margaritas"
          title={
            <>
              Pequeños detalles, <span className="italic">gran diferencia.</span>
            </>
          }
          text="Cada pijama se piensa como un abrazo: telas nobles, cortes amables y un trato cercano de principio a fin."
        />

        {/* Beneficios */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={rise}
            className="relative col-span-2 flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-wine p-7 text-nude md:row-span-2 md:min-h-[24rem] md:rounded-[2.5rem] md:p-10"
          >
            <div className="lace absolute inset-0 opacity-20" aria-hidden />
            <Bow className="relative h-10 w-14 text-petal" />
            <div className="relative">
              <span className="eyebrow text-petal/80">Telas que acarician</span>
              <p className="mt-3 font-display text-3xl italic leading-tight md:text-4xl">
                Satín y algodón seleccionados por su caída y frescura.
              </p>
            </div>
          </motion.div>

          {BENEFITS.map((item) => (
            <motion.div
              key={item.title}
              variants={rise}
              className={`flex flex-col justify-between rounded-[1.75rem] p-5 md:rounded-[2.5rem] md:p-7 ${item.tone}`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pearl text-wine md:h-14 md:w-14">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </span>
              <div className="mt-5 md:mt-8">
                <h3 className="font-display text-lg leading-tight text-wine md:text-2xl">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-wine/60 md:text-sm">{item.text}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={rise}
            className="flex flex-col items-center justify-center rounded-[1.75rem] border border-wine/10 bg-pearl/70 p-5 text-center md:rounded-[2.5rem] md:p-7"
          >
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
            <p className="script mt-3 text-4xl text-wine md:text-5xl">dulces sueños</p>
            <p className="eyebrow mt-3 text-wine/50">desde Colombia, con cariño</p>
          </motion.div>
        </motion.div>

        {/* Guía de telas, como parte del mismo bloque */}
        <div className="mt-16 border-t border-wine/10 pt-12 md:mt-24 md:pt-16">
          <h3 className="font-display text-3xl leading-tight text-wine md:text-4xl">
            ¿Qué tela es <span className="italic">para ti?</span>
          </h3>
          <motion.div
            className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {fabrics.map((f) => (
              <motion.a
                key={f.id}
                href={`tienda/?p=${f.id}`}
                className="group flex flex-col rounded-[1.75rem] bg-pearl p-6 transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(70,27,20,0.45)] md:p-8"
                variants={rise}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="eyebrow text-wine/55">{f.fabric}</span>
                  <span className="flex -space-x-2" title={f.swatches.map((s) => s.label).join(', ')}>
                    {f.swatches.map((s) => (
                      <img key={s.label} src={s.src} alt="" className="h-7 w-7 rounded-full border-2 border-pearl object-cover" />
                    ))}
                  </span>
                </div>
                <h4 className="mt-6 font-display text-2xl text-wine md:text-3xl">{f.name}</h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-wine/60">{f.text}</p>
                <div className="mt-6 flex items-center justify-between border-t border-wine/10 pt-4 text-sm">
                  <span className="text-wine">Desde {formatCOP(f.from)}</span>
                  <span className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-wine/60 group-hover:text-wine">
                    Ver <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
          <ColorRequest className="mt-6 md:max-w-xl" />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Cómo pedir
------------------------------------------------------------------- */

const STEPS = [
  {
    n: '01',
    title: 'Elige tu referencia',
    text: 'Samantha Satín, Samantha Algodón o Geraldine: tres maneras de descansar bonito.',
  },
  {
    n: '02',
    title: 'Tipo y talla',
    text: 'Short o pantalón, de la S a la XXL. El precio se ajusta solo mientras eliges.',
  },
  {
    n: '03',
    title: 'Escríbenos',
    text: 'Tu pedido llega a WhatsApp ya armado. Sin formularios, sin esperas.',
  },
  {
    n: '04',
    title: 'Recíbela en casa',
    text: 'Envíos nacionales a toda Colombia, empacada con el cariño de siempre.',
  },
]

export function HowToOrder() {
  return (
    <section id="como-pedir" className={`scroll-mt-24 bg-wine px-6 text-nude lg:px-10 ${SECTION_Y}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          dark
          eyebrow="Cómo pedir"
          title={
            <>
              Así de <span className="script text-petal">fácil</span>
            </>
          }
          text="Sin pasarelas ni formularios: tu carrito se convierte en un mensaje de WhatsApp con todo listo."
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              className="rounded-[2rem] bg-nude/10 p-6 md:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            >
              <span className="font-display text-5xl italic leading-none text-petal md:text-6xl">{s.n}</span>
              <h3 className="mt-6 font-display text-2xl italic">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-nude/70">{s.text}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-start gap-6 border-t border-nude/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-3xl italic leading-tight md:text-5xl">
            Lista para <span className="script text-petal">consentirte</span>
          </p>
          <a
            href="tienda/"
            className="rounded-full bg-petal px-8 py-4 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-wine transition-colors hover:bg-pearl"
          >
            Ir a la tienda
          </a>
        </div>
      </div>
    </section>
  )
}
