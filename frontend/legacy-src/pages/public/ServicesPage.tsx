import { ServiceShowcase } from '@/components/cards/ServiceShowcase'
import { CTASection } from '@/components/common/CTASection'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/common/Section'
import { ErrorState, EmptyState, ListSkeleton } from '@/components/common/States'
import { ButtonLink } from '@/components/ui/Button'
import { useAsync } from '@/hooks/useAsync'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { api } from '@/services/api'

export function ServicesPage() {
  useDocumentTitle(
    'Services',
    'Brand films, social content, product photography, motion design, creative strategy and UGC production — one senior team from brief to delivery.',
  )

  const servicesState = useAsync(() => api.getServices(), [])

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            One studio.
            <br />
            Every frame<span className="text-accent">.</span>
          </>
        }
        description="Six capabilities that work as one system. Start with a single film or hand us the whole content engine — the standard stays the same."
        aside={
          <ButtonLink to="/quote" size="md">
            Start a project
          </ButtonLink>
        }
      />

      <Section>
        <div className="container-x">
          {servicesState.loading ? <ListSkeleton rows={4} /> : null}
          {servicesState.error ? (
            <ErrorState message={servicesState.error} onRetry={servicesState.retry} />
          ) : null}
          {!servicesState.loading && !servicesState.error && (servicesState.data ?? []).length === 0 ? (
            <EmptyState
              title="Our service list is being updated."
              description="Tell us what you need and we will confirm the right scope — most projects fall into one of our core capabilities."
              actionLabel="Talk to us"
              actionTo="/quote"
            />
          ) : null}
          {!servicesState.loading && !servicesState.error && (servicesState.data ?? []).length > 0 ? (
            <div>
              {(servicesState.data ?? []).map((service, index) => (
                <Reveal key={service.id}>
                  <ServiceShowcase service={service} index={index} reverse={index % 2 === 1} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </Section>

      <Section className="border-t border-cream/10 bg-ink-soft/40">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">Not sure what you need?</p>
            <h2 className="display-2 mt-4">Start with the problem.</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/55">
              Tell us what you are trying to change — awareness, launches, conversion, content
              fatigue — and we will tell you which combination of services actually fits.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/quote" size="lg">
              Request a quote
            </ButtonLink>
            <ButtonLink to="/packages" variant="secondary" size="lg">
              View packages
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
