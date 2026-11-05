import { ArrowUpRight, Phone } from 'lucide-react'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CONTACTS } from '@/data/brochure'
import { useParallax } from '@/hooks/useParallax'

export function ContactSection() {
  const parallaxRef = useParallax<HTMLDivElement>(0.04)

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden border-t border-white/[0.06] py-24 lg:py-32"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div ref={parallaxRef} className="absolute -inset-[9%]">
          <img
            src="/images/contact-handshake.jpg"
            alt="Two professionals shaking hands in a dark, cinematic studio"
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
            width={1600}
            height={2400}
          />
        </div>
        <div className="absolute inset-0 contact-scrim" />
        <div className="ambient-cyan absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-70" aria-hidden />
        <div className="ambient-green absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-60" aria-hidden />
      </div>

      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            id="contact-heading"
            eyebrow="Contact"
            title="Contact Information"
            className="max-w-2xl"
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal delay={80}>
            <div>
              <p className="font-display text-4xl uppercase leading-none text-white sm:text-5xl">
                Get in Touch
              </p>
              <span className="gradient-line-short mt-6 h-[3px] w-20" aria-hidden />
              <p className="mt-6 max-w-md font-display text-2xl uppercase leading-tight text-body/85 sm:text-[28px]">
                Let&apos;s create something great together.
              </p>
              <p className="body-copy mt-5 max-w-md">
                Tell us what you have in mind — a campaign, a film, a rebrand or a content plan. Call
                us directly and let&apos;s talk it through.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-navy/50 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-body/70 backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon/60" aria-hidden />
                  <span className="relative inline-flex size-2 rounded-full bg-neon" aria-hidden />
                </span>
                Direct studio contact
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {CONTACTS.map((contact, index) => (
              <Reveal key={contact.tel} delay={120 + index * 90}>
                <article className="panel-strong panel-interactive group h-full p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-16 place-items-center rounded-full border border-cyan/30 bg-gradient-to-br from-cyan/15 to-neon/10 font-display text-xl text-white shadow-[0_0_35px_-18px_rgba(0,200,255,0.8)]">
                      {contact.initials}
                    </span>
                    <span className="grid size-9 place-items-center rounded-full border border-white/10 text-cyan/70 transition-colors duration-300 group-hover:border-cyan/40 group-hover:text-cyan">
                      <Phone className="size-4" aria-hidden />
                    </span>
                  </div>

                  <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.26em] text-neon/90">
                    {contact.role}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium uppercase tracking-wide text-white sm:text-[26px]">
                    {contact.name}
                  </h3>

                  <a
                    href={`tel:${contact.tel}`}
                    className="mt-5 inline-flex items-center gap-3 text-sm text-body/80 transition-colors duration-300 hover:text-white"
                  >
                    <span className="font-display text-lg tracking-wide text-white/90">
                      {contact.phone}
                    </span>
                    <ArrowUpRight
                      className="size-4 text-cyan transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                  <span className="gradient-line mt-6 opacity-30" aria-hidden />
                  <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-body/45">
                    Tap the number to call
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
