import { Menu, Phone, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CONTACTS, NAV_LINKS } from '@/data/brochure'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(24)
  const active = useActiveSection()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useLockBodyScroll(open)

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return

    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }

      if (event.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, closeMenu])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth',
          scrolled
            ? 'border-b border-white/10 bg-navy/85 shadow-[0_20px_60px_-40px_rgba(0,200,255,0.6)] backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-navy/70 to-transparent',
        )}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <a href="#home" className="shrink-0">
            <Logo />
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="nav-link uppercase tracking-[0.16em]"
                data-active={active === link.id}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden items-center rounded-full bg-brand-gradient px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-navy transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              Start a Project
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="group grid size-11 place-items-center rounded-full border border-white/15 bg-midnight/40 text-white transition-colors hover:border-cyan/50 hover:bg-midnight/70 lg:hidden"
            >
              <Menu className="size-5 transition-transform duration-300 group-hover:scale-95" aria-hidden />
            </button>
          </div>
        </div>
        <span
          className={cn(
            'gradient-line absolute inset-x-0 bottom-0 transition-opacity duration-500',
            scrolled ? 'opacity-40' : 'opacity-0',
          )}
          aria-hidden
        />
      </header>

      {open ? (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="menu-panel fixed inset-0 z-[70] flex animate-menu-in flex-col lg:hidden"
        >
          <div className="container-x flex h-[76px] shrink-0 items-center justify-between">
            <a href="#home" onClick={() => closeMenu(false)}>
              <Logo />
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => closeMenu()}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan/50"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="container-x flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-8"
          >
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => closeMenu(false)}
                aria-current={active === link.id ? 'true' : undefined}
                className="mobile-nav-link group flex items-center gap-4 border-b border-white/10 py-4"
                style={{ animationDelay: `${60 + index * 55}ms` }}
              >
                <span className="font-display text-[11px] tracking-[0.2em] text-cyan/70">
                  0{index + 1}
                </span>
                <span
                  className={cn(
                    'font-display text-4xl font-medium uppercase leading-none tracking-wide transition-colors sm:text-5xl',
                    active === link.id ? 'gradient-text' : 'text-white group-hover:text-cyan',
                  )}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="container-x shrink-0 border-t border-white/10 py-6">
            <a
              href="#contact"
              onClick={() => closeMenu(false)}
              className="flex w-full items-center justify-center rounded-full bg-brand-gradient px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-navy"
            >
              Start a Project
            </a>
            <div className="mt-5 grid gap-2 text-xs text-body/70 sm:grid-cols-2">
              {CONTACTS.map((contact) => (
                <a
                  key={contact.tel}
                  href={`tel:${contact.tel}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="size-3.5 text-neon" aria-hidden />
                  <span>
                    {contact.name} · {contact.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
