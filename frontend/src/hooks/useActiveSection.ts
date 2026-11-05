import { useEffect, useState } from 'react'
import { SECTION_IDS } from '@/data/brochure'

/**
 * Tracks which top-level section is currently in view.
 * Uses the scroll position rather than IntersectionObserver so the active
 * state stays stable through short sections and the closing panel.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState<string>(SECTION_IDS[0])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 320)
      let current = SECTION_IDS[0]

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id)
        if (element && element.offsetTop <= marker) {
          current = id
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8

      if (atBottom) {
        current = SECTION_IDS[SECTION_IDS.length - 1]
      }

      setActive((previous) => (previous === current ? previous : current))
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
  }, [])

  return active
}
