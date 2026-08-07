import { useEffect } from 'react'

/** Congela el scroll del body mientras un overlay está abierto. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
