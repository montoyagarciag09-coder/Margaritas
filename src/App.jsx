import { MotionConfig } from 'framer-motion'
import { CartProvider } from './cart/CartContext'
import { CartDrawer, CartToast } from './cart/CartUI'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Essence from './components/Essence'
import Footer from './components/Footer'
import FloatingWhatsapp from './components/FloatingWhatsapp'
import { HowToOrder, ShopCta, WhyUs } from './components/home/HomeSections'
import { ShopFaq } from './components/shop/ShopSections'

/**
 * Landing de marca: la esencia, por qué elegirnos (beneficios y guía de
 * telas), cómo pedir y preguntas frecuentes. La compra vive en /tienda, a la
 * que llevan el inicio, el menú y la guía de telas. Sin pantalla de carga: la mayoría de visitas
 * llega desde Instagram en el celular y cada segundo de espera cuenta.
 */
export default function App() {
  return (
    <CartProvider>
      <MotionConfig reducedMotion="user">
        <div aria-hidden className="grain-overlay" />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <ShopCta />
          {/* 1 · La marca (la compra vive en /tienda) */}
          <Essence />
          {/* 2 · Por qué elegirnos */}
          <WhyUs />
          {/* 3 · Cómo pedir y dudas */}
          <HowToOrder />
          <ShopFaq />
        </main>
        <Footer />
        <FloatingWhatsapp />
        <CartDrawer />
        <CartToast />
      </MotionConfig>
    </CartProvider>
  )
}
