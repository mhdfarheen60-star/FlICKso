import { ArrowUp } from 'lucide-react'
import { BRAND, NAV_LINKS } from '@/data/brochure'
import { useParallax } from '@/hooks/useParallax'
import { Logo } from '@/components/layout/Logo'

export function ThankYouSection() {
  const parallaxRef = useParallax<HTMLDivElement>(0.045)
  const year = new Date().getFullYear()

  return (
    <footer
      id="thank-you"
      aria-labelledby="thank-you-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-t border-white/[0.06] bg-navy"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div ref={parallaxRef} className="absolute -inset-[9%]">
          <img
            src="/images/footer-camera.jpg"
            alt="Cinema camera on a tripod in a dark studio, lit with teal and green light"
            className="h-full w-full animate-hero-zoom object-cover object-[70%_center]"
            loading="lazy"
            decoding="async"
            width={1600}
            height={1172}
          />
        </div>
        <div className="absolute inset-0 closing-scrim" />
        <div className="ambient-cyan absolute -left-32 top-1/4 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-60" aria-hidden />
        <div className="ambient-green absolute bottom-10 right-0 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-50" aria-hidden />
      </div>

      <div className="gradient-outline inset-3 sm:inset-5 lg:inset-7" aria-hidden />

      <div className="container-x relative flex flex-1 flex-col justify-center py-28 sm:py-32">
        <div className="max-w-3xl">
          <a href="#home" className="inline-flex">
            <Logo className="scale-110 origin-left" />
          </a>

          <p className="eyebrow mt-14 flex items-center gap-3 text-white/70">
            <span className="gradient-line-short w-9" aria-hidden />
            Until Next Time
          </p>

          <h2
            id="thank-you-heading"
            className="display-hero mt-6 text-shadow-cinema text-white"
          >
            <span className="block">Thank You</span>
            <span className="block">For Your</span>
            <span className="block">Attention</span>
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#home"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-gradient px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-navy shadow-[0_18px_55px_-22px_rgba(0,232,120,0.9)] transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-22px_rgba(0,200,255,1)]"
            >
              See You Next
              <ArrowUp
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
            <span
              className="hidden h-px max-w-[220px] flex-1 bg-gradient-to-r from-cyan/60 via-neon/40 to-transparent sm:block"
              aria-hidden
            />
          </div>

          <p className="mt-12 max-w-md text-sm leading-7 text-body/65">
            {BRAND.name} — cinematic videography, graphic design, script writing and digital
            marketing. Built to be seen, heard and remembered.
          </p>
        </div>
      </div>

      <div className="container-x relative border-t border-white/10 py-7">
        <div className="flex flex-col gap-5 text-[10px] uppercase tracking-[0.16em] text-body/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#home"
            className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}
