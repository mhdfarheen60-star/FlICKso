import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { ServiceRow } from '@/components/cards/ServiceRow'
import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { CTASection } from '@/components/common/CTASection'
import { Marquee } from '@/components/common/Marquee'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Stat } from '@/components/common/Stat'
import { ErrorState, ProjectGridSkeleton, SkeletonBlock } from '@/components/common/States'
import { ButtonLink } from '@/components/ui/Button'
import { clientNames, studioStats } from '@/data'
import { useAsync } from '@/hooks/useAsync'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { api } from '@/services/api'

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    copy: 'We dig into the brand, the audience and the numbers before a single frame is shot.',
  },
  {
    number: '02',
    title: 'Direct',
    copy: 'Concepts, scripts, shotlists and a production plan you can actually approve.',
  },
  {
    number: '03',
    title: 'Produce',
    copy: 'Crews, sets, talent, gear. We handle the chaos so the work stays calm.',
  },
  {
    number: '04',
    title: 'Deliver',
    copy: 'Edits, cutdowns, captions, formats. Everything ready for every platform.',
  },
]

export function HomePage() {
  useDocumentTitle()

  const servicesState = useAsync(() => api.getServices(), [])
  const projectsState = useAsync(() => api.getProjects(), [])
  const packagesState = useAsync(() => api.getPackages(), [])
  const testimonialsState = useAsync(() => api.getTestimonials(), [])

  const featuredProjects = (projectsState.data ?? []).filter((project) => project.featured).slice(0, 3)
  const featuredTestimonials = (testimonialsState.data ?? []).filter((item) => item.featured).slice(0, 3)
  const packages = packagesState.data ?? []

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="bg-radial-accent pointer-events-none absolute inset-0" aria-hidden />

        <div className="container-x relative grid gap-14 pb-16 pt-12 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24">
          <div>
            <p className="eyebrow flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              Independent production studio — Mumbai · Worldwide
            </p>

            <h1 className="display-1 mt-6">
              We make brands <span className="text-accent">impossible</span> to scroll past.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/60 md:text-lg">
              FLICKso is a full-stack production studio for brand films, social content and
              campaigns that actually get watched. Strategy, shoot, edit, ship — one team, no
              hand-offs.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink to="/quote" size="lg">
                Start a project
              </ButtonLink>
              <ButtonLink to="/portfolio" variant="secondary" size="lg">
                See the work
              </ButtonLink>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-cream/10 pt-8 sm:grid-cols-4">
              {studioStats.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-soft">
              <img
                src="/work/nova.svg"
                alt="Nova Athletics — Built for the last rep, a FLICKso brand film"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-cream/15" aria-hidden />
              <p className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.18em] text-cream/70">
                Nova Athletics — Brand Film
              </p>
            </div>

            <div className="absolute -bottom-10 -left-3 hidden w-40 rotate-[-6deg] overflow-hidden border-4 border-ink shadow-2xl sm:block lg:-left-8 lg:w-44">
              <img
                src="/work/atelier.svg"
                alt="Atelier Nine product photography"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="absolute -right-2 top-5 grid size-28 place-items-center rounded-full bg-accent text-ink sm:size-32 lg:-right-6">
              <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
                <defs>
                  <path
                    id="hero-badge-path"
                    d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
                  />
                </defs>
                <text
                  fontSize="8.4"
                  fontWeight="600"
                  letterSpacing="2.4"
                  fill="#0B0B0C"
                  fontFamily="Inter, sans-serif"
                >
                  <textPath href="#hero-badge-path">
                    STRATEGY · SHOOT · EDIT · SHIP ·
                  </textPath>
                </text>
              </svg>
              <ArrowDownRight className="size-6" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <Marquee items={clientNames} />

      {/* Selected work */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Selected work — 2024 / 25"
              title={
                <>
                  Recent frames<span className="text-accent">.</span>
                </>
              }
              description="A few projects we are proud of. Every one started as a blank page and a difficult deadline."
              action={
                <ButtonLink to="/portfolio" variant="secondary" size="sm">
                  All work
                </ButtonLink>
              }
            />
          </Reveal>

          <div className="mt-12">
            {projectsState.loading ? <ProjectGridSkeleton count={3} /> : null}
            {projectsState.error ? (
              <ErrorState message={projectsState.error} onRetry={projectsState.retry} />
            ) : null}
            {!projectsState.loading && !projectsState.error ? (
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project, index) => (
                  <Reveal key={project.id} delay={index * 90}>
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section className="border-y border-cream/10 bg-ink-soft/40">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="One studio. Every frame."
              description="From the first strategic question to the last platform cutdown — the same senior team stays on the work."
              action={
                <ButtonLink to="/services" variant="secondary" size="sm">
                  Explore services
                </ButtonLink>
              }
            />
          </Reveal>

          <div className="mt-10">
            {servicesState.loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-16 w-full" />
                ))}
              </div>
            ) : null}
            {servicesState.error ? (
              <ErrorState message={servicesState.error} onRetry={servicesState.retry} />
            ) : null}
            {!servicesState.loading && !servicesState.error
              ? (servicesState.data ?? []).map((service, index) => (
                  <ServiceRow key={service.id} service={service} index={index} />
                ))
              : null}
            <div className="border-t border-cream/10" />
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="From brief to broadcast."
              description="No black boxes, no mysterious delays. You always know what is happening, what comes next and what it costs."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 80} className="bg-ink">
                <div className="flex h-full flex-col p-6 md:p-7">
                  <span className="font-mono text-xs text-accent">{step.number}</span>
                  <h3 className="mt-8 font-display text-2xl font-medium tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/50">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Packages */}
      <Section className="border-y border-cream/10 bg-ink-soft/40">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Monthly content</p>
              <h2 className="display-2 mt-4">Social, handled.</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-cream/55">
                Content packages built for brands that need to show up — consistently. One shoot
                day becomes a month of platform-native work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to="/packages" size="md">
                  Compare packages
                </ButtonLink>
                <ButtonLink to="/quote" variant="ghost" size="md">
                  Build a custom plan
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <div className="border-t border-cream/10">
            {packagesState.loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonBlock key={index} className="mt-px h-24 w-full" />
                ))
              : null}
            {packagesState.error ? (
              <ErrorState message={packagesState.error} onRetry={packagesState.retry} />
            ) : null}
            {!packagesState.loading && !packagesState.error
              ? packages.map((pkg, index) => (
                  <Reveal key={pkg.id} delay={index * 70}>
                    <Link
                      to={`/quote?package=${pkg.slug}`}
                      className="group flex items-center justify-between gap-6 border-b border-cream/10 py-6 transition-colors hover:border-cream/25"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent">
                            {pkg.name}
                          </h3>
                          {pkg.popular ? (
                            <span className="bg-accent px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink">
                              Popular
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-cream/55">{pkg.tagline}</p>
                      </div>

                      <div className="hidden shrink-0 items-center gap-6 text-center sm:flex">
                        <div>
                          <p className="font-display text-xl">{pkg.creatives}</p>
                          <p className="text-[9px] uppercase tracking-[0.12em] text-cream/55">Creatives</p>
                        </div>
                        <div>
                          <p className="font-display text-xl">{pkg.videos}</p>
                          <p className="text-[9px] uppercase tracking-[0.12em] text-cream/55">Videos</p>
                        </div>
                        <div>
                          <p className="font-display text-xl">{pkg.posters}</p>
                          <p className="text-[9px] uppercase tracking-[0.12em] text-cream/55">Posters</p>
                        </div>
                      </div>

                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-cream/15 text-cream/50 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                    </Link>
                  </Reveal>
                ))
              : null}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Kind words"
              title="Clients who came back."
              action={
                <ButtonLink to="/testimonials" variant="secondary" size="sm">
                  All testimonials
                </ButtonLink>
              }
            />
          </Reveal>

          <div className="mt-12">
            {testimonialsState.loading ? (
              <div className="grid gap-6 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-64 w-full" />
                ))}
              </div>
            ) : null}
            {testimonialsState.error ? (
              <ErrorState message={testimonialsState.error} onRetry={testimonialsState.retry} />
            ) : null}
            {!testimonialsState.loading && !testimonialsState.error ? (
              <div className="grid gap-6 md:grid-cols-3">
                {featuredTestimonials.map((testimonial, index) => (
                  <Reveal key={testimonial.id} delay={index * 90}>
                    <TestimonialCard testimonial={testimonial} />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
