import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SERVICES, SERVICE_CHIPS } from '@/data/brochure'
import { ServiceSection } from './ServiceSection'

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden border-y border-white/[0.06] bg-midnight/35 py-24 lg:py-32"
    >
      <div className="ambient-green pointer-events-none absolute -left-52 top-40 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-70" aria-hidden />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="services-heading"
              eyebrow="What We Do"
              title="Services"
              description="Four connected disciplines, one production partner. From the first script to the final campaign report, everything is built to work together."
              className="max-w-2xl"
            />
          </Reveal>

          <Reveal delay={100}>
            <nav aria-label="Service sections" className="flex flex-wrap gap-2 lg:justify-end">
              {SERVICE_CHIPS.map((chip) => (
                <a
                  key={chip.id}
                  href={`#${chip.id}`}
                  className="rounded-full border border-white/12 bg-navy/50 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-body/70 transition-all duration-300 hover:border-cyan/45 hover:text-white"
                >
                  {chip.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>

        <div className="mt-14 space-y-6 lg:mt-20 lg:space-y-8">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index === 0 ? 0 : 40}>
              <ServiceSection service={service} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
