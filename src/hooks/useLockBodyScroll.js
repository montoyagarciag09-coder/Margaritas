import { useEffect } from 'react'

// Cuántos overlays piden bloquear el scroll a la vez. Con un contador, cerrar
// una ficha mientras se abre el carrito no libera el scroll antes de tiempo.
let locks = 0
let previous = ''

/** Congela el scroll del body mientras un overlay está abierto. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    if (locks === 0) {
      previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    locks += 1
    return () => {
      locks -= 1
      if (locks === 0) document.body.style.overflow = previous
    }
  }, [locked])
}
