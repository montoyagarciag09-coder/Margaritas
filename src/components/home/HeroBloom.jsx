import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { EASE } from '../../lib/motion'
import { PETAL } from '../Logo'

const CX = 200
const CY = 200
const RING_TEXT = 'MARGARITAS · UN INSTANTE PARA VOLVER A TI · PIJAMAS HECHAS EN COLOMBIA · '

// Pétalos sueltos que flotan alrededor de la flor.
const FLOATING = [
  { x: '6%', y: '18%', size: 26, rotate: -30, delay: 0, duration: 9 },
  { x: '84%', y: '12%', size: 20, rotate: 40, delay: 1.2, duration: 11 },
  { x: '90%', y: '64%', size: 30, rotate: 120, delay: 0.6, duration: 10 },
  { x: '10%', y: '78%', size: 18, rotate: 200, delay: 2, duration: 12 },
  { x: '48%', y: '-2%', size: 16, rotate: 80, delay: 1.6, duration: 8 },
  { x: '52%', y: '94%', size: 22, rotate: -120, delay: 0.9, duration: 13 },
]

function FloatingPetal({ x, y, size, rotate, delay, duration }) {
  return (
    <motion.svg
      viewBox="40 8 40 48"
      className="absolute text-petal drop-shadow-sm"
      style={{ left: x, top: y, width: size, height: size * 1.2 }}
      initial={{ opacity: 0, scale: 0, rotate }}
      animate={{
        opacity: [0, 1, 1, 0.8, 1],
        scale: 1,
        y: [0, -14, 6, -8, 0],
        x: [0, 8, -6, 4, 0],
        rotate: [rotate, rotate + 25, rotate - 15, rotate + 10, rotate],
      }}
      transition={{
        opacity: { duration: 1.2, delay: 1.6 + delay },
        scale: { duration: 1, ease: EASE, delay: 1.6 + delay },
        default: { duration, repeat: Infinity, ease: 'easeInOut', delay: 1.6 + delay },
      }}
      aria-hidden
    >
      <path d={PETAL} fill="currentColor" stroke="#7D5255" strokeOpacity="0.5" strokeWidth="1.2" />
    </motion.svg>
  )
}

/**
 * Animación del logo para el inicio: la margarita florece pétalo a pétalo,
 * "respira" suavemente y gira con el scroll; un anillo de texto da la vuelta
 * alrededor y algunos pétalos sueltos flotan. En escritorio se inclina hacia
 * el cursor. `compact` deja sólo la flor y el círculo, para tamaños pequeños.
 */
export default function HeroBloom({ className = '', compact = false }) {
  const { scrollY } = useScroll()
  const scrollRotate = useTransform(scrollY, [0, 800], [0, 90])

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 15 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 15 })

  function onMove(e) {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <div
      className={`relative aspect-square ${className}`}
      onPointerMove={onMove}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
      aria-hidden
    >
      {/* Halo suave detrás de la flor (degradado, sin filtros costosos) */}
      <motion.div
        className="absolute inset-[8%] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(241,217,214,0.9) 0%, rgba(241,217,214,0.35) 45%, rgba(251,246,241,0) 70%)' }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [1, 1.06, 1], opacity: 1 }}
        transition={{
          opacity: { duration: 1.2 },
          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {!compact && FLOATING.map((p, i) => <FloatingPetal key={i} {...p} />)}

      <motion.div className="absolute inset-0" style={{ rotateX, rotateY, transformPerspective: 900 }}>
        <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
          <defs>
            <path id="bloom-ring" d={`M${CX},${CY} m-168,0 a168,168 0 1,1 336,0 a168,168 0 1,1 -336,0`} />
          </defs>

          {/* Círculo fino que se dibuja */}
          <motion.circle
            cx={CX}
            cy={CY}
            r="186"
            fill="none"
            stroke="#7D5255"
            strokeOpacity="0.3"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          />

          {/* Anillo de texto girando (en la versión compacta sería ilegible) */}
          {!compact && (
          <motion.g
            style={{ originX: '50%', originY: '50%' }}
            initial={{ opacity: 0, rotate: -40 }}
            animate={{ opacity: 1, rotate: 320 }}
            transition={{
              opacity: { duration: 1.2, delay: 0.6 },
              rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
            }}
          >
            <text
              fill="#461B14"
              fillOpacity="0.75"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12.5, letterSpacing: '0.32em' }}
            >
              <textPath href="#bloom-ring" textLength={2 * Math.PI * 168 - 8} lengthAdjust="spacing">
                {RING_TEXT}
              </textPath>
            </text>
          </motion.g>
          )}

          {/* La margarita: florece, respira y gira con el scroll */}
          <motion.g style={{ rotate: scrollRotate, originX: '50%', originY: '50%' }}>
            <motion.g
              style={{ originX: '50%', originY: '50%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            >
              {/* El logo mide 120×120 con centro en (60,60): se escala a la flor grande */}
              <g transform={`translate(${CX - 60 * 2.65} ${CY - 60 * 2.65}) scale(2.65)`}>
                {Array.from({ length: 12 }, (_, i) => {
                  const long = i % 2 === 0
                  const scale = long ? 1 : 0.8
                  return (
                    <g key={i} transform={`rotate(${i * 30} 60 60)`}>
                      {/* Florece (0 → tamaño) y luego respira en bucle */}
                      <motion.g
                        style={{ transformOrigin: '60px 60px' }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: EASE, delay: 0.5 + i * 0.07 }}
                      >
                        <motion.path
                          d={PETAL}
                          fill={long ? '#F1D9D6' : '#E0CBB9'}
                          stroke="#7D5255"
                          strokeOpacity="0.45"
                          strokeWidth="0.5"
                          style={{ transformOrigin: '60px 60px' }}
                          initial={{ scale }}
                          animate={{ scale: [scale, scale * 1.05, scale] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 + i * 0.12 }}
                        />
                      </motion.g>
                    </g>
                  )
                })}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="11"
                  fill="#461B14"
                  style={{ transformOrigin: '60px 60px' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 1.4 }}
                />
                {Array.from({ length: 10 }, (_, i) => {
                  const a = (i / 10) * Math.PI * 2
                  const x = 60 + Math.cos(a) * 6.4
                  const y = 60 + Math.sin(a) * 6.4
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="1.3"
                      fill="#F1D9D6"
                      style={{ transformOrigin: `${x}px ${y}px` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 1.6 + i * 0.04 }}
                    />
                  )
                })}
              </g>
            </motion.g>
          </motion.g>
        </svg>
      </motion.div>

    </div>
  )
}
