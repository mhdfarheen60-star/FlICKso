import { useMemo, useState } from 'react'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { CTASection } from '@/components/common/CTASection'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/common/Section'
import { EmptyState, ErrorState, ProjectGridSkeleton } from '@/components/common/States'
import { useAsync } from '@/hooks/useAsync'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { api } from '@/services/api'
import { cn } from '@/lib/cn'

const ALL = 'All'

export function PortfolioPage() {
  useDocumentTitle(
    'Portfolio',
    'Selected brand films, campaigns, social content, product photography, motion design and UGC produced by FLICKso.',
  )

  const projectsState = useAsync(() => api.getProjects(), [])
  const [filter, setFilter] = useState(ALL)

  const projects = projectsState.data ?? []

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((project) => project.category)))
    return [ALL, ...unique]
  }, [projects])

  const filtered = filter === ALL ? projects : projects.filter((project) => project.category === filter)

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Work that had to work<span className="text-accent">.</span>
          </>
        }
        description="Brand films, campaigns and content systems made for real deadlines and real business goals. No student projects, no imaginary clients."
        aside={
          <p className="max-w-[220px] text-sm leading-relaxed text-cream/55">
            Every case study includes the brief, the approach and the result.
          </p>
        }
      />

      <Section>
        <div className="container-x">
          <div className="flex flex-col gap-5 border-b border-cream/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label="Filter projects by category">
              {categories.map((category) => {
                const active = filter === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    aria-pressed={active}
                    className={cn(
                      'shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors',
                      active
                        ? 'border-accent bg-accent text-ink'
                        : 'border-cream/15 text-cream/55 hover:border-cream/35 hover:text-cream',
                    )}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
            <p className="text-xs uppercase tracking-[0.14em] text-cream/55" aria-live="polite">
              {projectsState.loading ? 'Loading' : `${filtered.length} ${filtered.length === 1 ? 'project' : 'projects'}`}
            </p>
          </div>

          <div className="mt-10">
            <h2 className="sr-only">Selected projects</h2>
            {projectsState.loading ? <ProjectGridSkeleton count={6} /> : null}

            {projectsState.error ? (
              <ErrorState message={projectsState.error} onRetry={projectsState.retry} />
            ) : null}

            {!projectsState.loading && !projectsState.error && filtered.length === 0 ? (
              <EmptyState
                title="Nothing in this category yet."
                description="Try another filter, or tell us what you are looking for — there may be relevant work we have not published."
                actionLabel="View all work"
                actionTo="/portfolio"
              />
            ) : null}

            {!projectsState.loading && !projectsState.error && filtered.length > 0 ? (
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, index) => (
                  <Reveal key={project.id} delay={(index % 3) * 80}>
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      <CTASection
        eyebrow="Your project next"
        title="Let's make something worth showing."
        primaryLabel="Start a project"
        secondaryLabel="View packages"
        secondaryTo="/packages"
      />
    </>
  )
}
