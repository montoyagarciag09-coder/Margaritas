import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Essence from './components/Essence'
import Benefits from './components/Benefits'
import Collection from './components/Collection'
import Footer from './components/Footer'
import FloatingWhatsapp from './components/FloatingWhatsapp'

/**
 * La cortina de apertura se muestra en cada carga: es parte de la identidad
 * de la marca. Sólo se omite si el sistema pide movimiento reducido.
 */
function shouldShowIntro() {
  if (typeof window === 'undefined') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function App() {
  const [loading, setLoading] = useState(shouldShowIntro)

  useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => setLoading(false), 1900)
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Essence />
        <Benefits />
        <Collection />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </MotionConfig>
  )
}
