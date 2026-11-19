import { MotionConfig } from 'framer-motion'
import { CartProvider } from './cart/CartContext'
import { CartDrawer, CartToast } from './cart/CartUI'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsapp from './components/FloatingWhatsapp'
import Catalog from './components/shop/Catalog'
import { ShopFaq, ShopHeader, ShopPerks } from './components/shop/ShopSections'

/** Página de la tienda: catálogo completo, garantías y preguntas frecuentes. */
export default function ShopApp() {
  return (
    <CartProvider>
    <MotionConfig reducedMotion="user">
      <div aria-hidden className="grain-overlay" />
      <Navbar page="shop" />
      <main>
        <ShopHeader />
        <Catalog />
        <ShopPerks />
        <ShopFaq />
      </main>
      <Footer eyebrow="Hablemos" />
      <FloatingWhatsapp threshold={300} />
      <CartDrawer />
      <CartToast />
    </MotionConfig>
    </CartProvider>
  )
}
