import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CTASection } from '@/components/common/CTASection'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/common/Section'
import { ErrorState, PageLoading } from '@/components/common/States'
import { ButtonLink } from '@/components/ui/Button'
import { useAsync } from '@/hooks/useAsync'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { api } from '@/services/api'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const projectState = useAsync(() => api.getProject(slug ?? ''), [slug])
  const projectsState = useAsync(() => api.getProjects(), [])

  const project = projectState.data
  const allProjects = projectsState.data ?? []
  const currentIndex = project ? allProjects.findIndex((item) => item.id === project.id) : -1
  const nextProject =
    currentIndex >= 0 && allProjects.length > 1
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null

  useDocumentTitle(project?.title, project?.summary)

  if (projectState.loading) return <PageLoading label="Loading project" />

  if (projectState.error || !project) {
    return (
      <div className="container-x py-24 md:py-32">
        <ErrorState
          message={projectState.error ?? 'We could not find that project.'}
          onRetry={projectState.retry}
        />
        <Link
          to="/portfolio"
          className="mt-8 inline-flex items-center gap-2 text-sm text-cream/60 transition-colors hover:text-cream"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to portfolio
        </Link>
      </div>
    )
  }

  const meta = [
    { label: 'Client', value: project.client },
    { label: 'Category', value: project.category },
    { label: 'Year', value: project.year },
    { label: 'Services', value: project.services.join(' · ') },
  ]

  return (
    <>
      <PageHero
        eyebrow={`${project.category} — ${project.year}`}
        title={project.title}
        description={project.summary}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Portfolio', to: '/portfolio' },
          { label: project.client },
        ]}
        aside={
          <ButtonLink to="/quote" size="md">
            Brief us
          </ButtonLink>
        }
      />

      <div className="container-x pt-8 md:pt-12">
        <img
          src={project.coverImage}
          alt={`${project.client} — ${project.title}`}
          className="aspect-[16/10] w-full object-cover"
        />
      </div>

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <dl className="divide-y divide-cream/10 border-y border-cream/10">
                {meta.map((item) => (
                  <div key={item.label} className="grid gap-1 py-4 sm:grid-cols-[90px_1fr] sm:gap-4">
                    <dt className="text-[10px] uppercase tracking-[0.16em] text-cream/55">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-cream/75">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="border border-cream/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-cream/55"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-12">
            <Reveal>
              <div>
                <p className="eyebrow">The challenge</p>
                <h2 className="display-3 mt-3">What needed to change.</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-cream/60 md:text-base">
                  {project.challenge}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <p className="eyebrow">The approach</p>
                <h2 className="display-3 mt-3">How we made it.</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-cream/60 md:text-base">
                  {project.approach}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <p className="eyebrow">The outcome</p>
                <h2 className="display-3 mt-3">What happened next.</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-cream/60 md:text-base">
                  {project.outcome}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <div className="border-y border-cream/10 bg-ink-soft/40">
        <div className="container-x grid gap-8 py-10 sm:grid-cols-3 md:py-12">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl font-semibold tracking-tight text-accent md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-cream/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {project.gallery.length > 1 ? (
        <Section>
          <div className="container-x">
            <Reveal>
              <p className="eyebrow">Selected frames</p>
              <h2 className="display-2 mt-4">From the project.</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.gallery.slice(1, 3).map((image, index) => (
                <Reveal key={`${image}-${index}`} delay={index * 80}>
                  <img
                    src={image}
                    alt={`${project.client} — project still ${index + 1}`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {nextProject ? (
        <div className="border-t border-cream/10">
          <Link
            to={`/portfolio/${nextProject.slug}`}
            className="group container-x flex flex-col gap-6 py-12 transition-colors md:flex-row md:items-end md:justify-between md:py-16"
          >
            <div>
              <p className="eyebrow">Next project</p>
              <p className="mt-3 font-display text-3xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-5xl">
                {nextProject.title}
              </p>
              <p className="mt-2 text-sm text-cream/55">
                {nextProject.client} · {nextProject.category} · {nextProject.year}
              </p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-cream/20 text-cream/60 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
              <ArrowUpRight className="size-6" aria-hidden />
            </span>
          </Link>
        </div>
      ) : null}

      <CTASection
        eyebrow={project.client}
        title="Have a similar problem?"
        description="Tell us what you are trying to change. We will tell you honestly whether we are the right studio for it."
      />
    </>
  )
}
