import { ArrowDown } from 'lucide-react'
import { useParallax } from '@/hooks/useParallax'

export function HeroSection() {
  const parallaxRef = useParallax<HTMLDivElement>(0.05)

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div ref={parallaxRef} className="absolute -inset-[9%]">
          <img
            src="/images/hero-studio.jpg"
            alt="Professional cinema camera and studio lighting in a dark production studio"
            className="h-full w-full animate-hero-zoom object-cover object-[66%_center]"
            width={1920}
            height={1279}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 hero-scrim" />
        <div className="ambient-cyan absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl" />
        <div className="ambient-green absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full blur-3xl opacity-70" />
      </div>

      <div className="gradient-outline inset-3 sm:inset-5 lg:inset-7" aria-hidden />
      <div
        className="pointer-events-none absolute inset-3 rounded-[28px] border border-white/[0.04] sm:inset-5 lg:inset-7"
        aria-hidden
      />

      <div className="container-x relative flex flex-1 flex-col justify-center pb-24 pt-32 sm:pt-36 lg:pb-28">
        <div className="max-w-4xl">
          <div
            className="flex animate-fade-up items-center gap-4"
            style={{ animationDelay: '120ms' }}
          >
            <span className="gradient-line-short w-10" aria-hidden />
            <p className="eyebrow text-white/80">We Are</p>
          </div>

          <h1
            id="hero-heading"
            className="display-hero mt-6 animate-fade-up normal-case text-shadow-cinema text-white"
            style={{ animationDelay: '200ms' }}
          >
            <span className="block">
              FLICK<span className="gradient-text">so</span>
            </span>
            <span className="mt-1 block uppercase tracking-[0.01em] text-white">Production</span>
          </h1>

          <p
            className="body-copy mt-7 max-w-lg animate-fade-up text-body/90 sm:text-[17px] sm:leading-8"
            style={{ animationDelay: '300ms' }}
          >
            Cinematic storytelling, striking design and data-driven marketing — built for brands that
            want to be seen, heard and remembered.
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-wrap items-center gap-6"
            style={{ animationDelay: '400ms' }}
          >
            <a
              href="#about"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-gradient px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-navy shadow-[0_18px_55px_-22px_rgba(0,232,120,0.9)] transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-22px_rgba(0,200,255,1)]"
            >
              Start Your Slide
              <ArrowDown
                className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden
              />
            </a>
            <span
              className="hidden h-px max-w-[240px] flex-1 bg-gradient-to-r from-cyan/70 via-neon/45 to-transparent sm:block"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="container-x relative flex items-center justify-between gap-6 pb-7 text-[9px] font-semibold uppercase tracking-[0.28em] text-body/55 sm:pb-9 sm:text-[10px]">
        <span className="inline-flex items-center gap-3">
          <span className="size-1.5 animate-pulse rounded-full bg-neon" aria-hidden />
          Scroll to explore
        </span>
        <span className="hidden sm:block">Videography · Design · Script · Marketing</span>
      </div>
    </section>
  )
}
