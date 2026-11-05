import { useEffect, useRef } from 'react'

/**
 * Very subtle scroll parallax for cinematic background plates.
 * The element should be larger than its container so edges never show.
 * Disabled automatically when the visitor prefers reduced motion.
 */
export function useParallax<T extends HTMLElement>(strength = 0.06) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) return

    let frame = 0

    const update = () => {
      frame = 0
      const element = ref.current
      if (!element) return

      const rect = element.parentElement?.getBoundingClientRect()
      if (!rect) return
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return

      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * strength
      element.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [strength])

  return ref
}
