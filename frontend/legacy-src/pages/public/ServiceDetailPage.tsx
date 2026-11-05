import { ArrowLeft, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { CTASection } from '@/components/common/CTASection'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/common/Section'
import { ErrorState, PageLoading } from '@/components/common/States'
import { ButtonLink } from '@/components/ui/Button'
import { useAsync } from '@/hooks/useAsync'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { api } from '@/services/api'

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const serviceState = useAsync(() => api.getService(slug ?? ''), [slug])
  const projectsState = useAsync(() => api.getProjects(), [])

  const service = serviceState.data
  const relatedProjects = service
    ? (projectsState.data ?? []).filter((project) => project.services.includes(service.title)).slice(0, 3)
    : []

  useDocumentTitle(service?.title, service?.summary)

  if (serviceState.loading) return <PageLoading label="Loading service" />

  if (serviceState.error || !service) {
    return (
      <div className="container-x py-24 md:py-32">
        <ErrorState
          message={serviceState.error ?? 'We could not find that service.'}
          onRetry={serviceState.retry}
        />
        <Link
          to="/services"
          className="mt-8 inline-flex items-center gap-2 text-sm text-cream/60 transition-colors hover:text-cream"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to all services
        </Link>
      </div>
    )
  }

  return (
    <>
      <PageHero
        eyebrow={service.tagline}
        title={service.title}
        description={service.summary}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
        aside={
          <ButtonLink to={`/quote?service=${service.slug}`} size="md">
            Start this project
          </ButtonLink>
        }
      />

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <img
                src={service.image}
                alt={`${service.title} by FLICKso Production`}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">The approach</p>
            <h2 className="display-2 mt-4">What you get.</h2>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-cream/60 md:text-base">
              {service.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="font-display text-xl">Included in the scope</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-cream/65">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-cream/10 pt-8">
              <ButtonLink to={`/quote?service=${service.slug}`} size="md">
                Request a quote
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-y border-cream/10 bg-ink-soft/40">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Why it works</p>
            <h2 className="display-2 mt-4 max-w-3xl">Built with intent, not decoration.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-cream/10 bg-cream/10 md:grid-cols-3">
            {service.features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 80} className="bg-ink">
                <div className="flex h-full flex-col p-7 md:p-8">
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <h3 className="mt-8 font-display text-xl font-medium tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/50">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {relatedProjects.length > 0 ? (
        <Section>
          <div className="container-x">
            <Reveal>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Related work</p>
                  <h2 className="display-2 mt-4">See it in action.</h2>
                </div>
                <ButtonLink to="/portfolio" variant="secondary" size="sm">
                  All work
                </ButtonLink>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 90}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <CTASection
        eyebrow={service.title}
        title="Let's put this to work."
        primaryLabel="Start a project"
        secondaryLabel="Compare packages"
        secondaryTo="/packages"
      />
    </>
  )
}
