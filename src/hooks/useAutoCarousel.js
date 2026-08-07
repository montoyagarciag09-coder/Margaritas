import { useEffect, useRef, useState } from 'react'

/** Centro de un elemento respecto al viewport. */
const centerOf = (el) => {
  const r = el.getBoundingClientRect()
  return r.left + r.width / 2
}

/**
 * Avanza solo un contenedor con scroll horizontal, en bucle y hacia un lado.
 *
 * - No hace nada si el contenedor no desborda (en escritorio pasa a rejilla).
 * - Se detiene mientras la persona lo toca y reanuda tras `resumeAfter`.
 * - Se detiene si el carrusel no está a la vista, para no gastar batería.
 * - Respeta `prefers-reduced-motion`.
 */
export function useAutoCarousel({ interval = 3600, resumeAfter = 7000 } = {}) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  // Permite que los indicadores desplacen el carrusel y pausen el avance.
  const controls = useRef({ goTo: () => {}, pause: () => {} })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = () => Array.from(el.children)
    const scrollable = () => el.scrollWidth > el.clientWidth + 1

    /** Índice cuyo centro está más cerca del centro del contenedor. */
    const currentIndex = () => {
      const mid = centerOf(el)
      let best = 0
      let min = Infinity
      items().forEach((item, i) => {
        const d = Math.abs(centerOf(item) - mid)
        if (d < min) {
          min = d
          best = i
        }
      })
      return best
    }

    const goTo = (index) => {
      const item = items()[index]
      if (!item) return
      el.scrollTo({
        left: el.scrollLeft + centerOf(item) - centerOf(el),
        behavior: 'smooth',
      })
    }

    let paused = false
    let visible = true
    let resumeTimer

    const pause = () => {
      paused = true
      clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => {
        paused = false
      }, resumeAfter)
    }

    let scrollTimer
    const onScroll = () => {
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => setActive(currentIndex()), 90)
    }

    controls.current = { goTo, pause }

    el.addEventListener('pointerdown', pause)
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('wheel', pause, { passive: true })
    el.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0.2 },
    )
    observer.observe(el)

    const timer = setInterval(() => {
      if (paused || !visible || !scrollable() || document.hidden) return
      goTo((currentIndex() + 1) % items().length)
    }, interval)

    return () => {
      clearInterval(timer)
      clearTimeout(resumeTimer)
      clearTimeout(scrollTimer)
      observer.disconnect()
      el.removeEventListener('pointerdown', pause)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('wheel', pause)
      el.removeEventListener('scroll', onScroll)
    }
  }, [interval, resumeAfter])

  return {
    ref,
    active,
    goTo: (index) => {
      controls.current.pause()
      controls.current.goTo(index)
    },
  }
}
