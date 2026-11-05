import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { CTASection } from '@/components/common/CTASection'
import { Marquee } from '@/components/common/Marquee'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/common/Section'
import { Stat } from '@/components/common/Stat'
import { EmptyState, ErrorState, SkeletonBlock } from '@/components/common/States'
import { clientNames, studioStats } from '@/data'
import { useAsync } from '@/hooks/useAsync'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { api } from '@/services/api'

export function TestimonialsPage() {
  useDocumentTitle(
    'Testimonials',
    'What clients say about working with FLICKso Production — brand films, social content, product photography and campaigns.',
  )

  const testimonialsState = useAsync(() => api.getTestimonials(), [])
  const testimonials = testimonialsState.data ?? []

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title={
          <>
            The receipts<span className="text-accent">.</span>
          </>
        }
        description="We could tell you we are good at this. Better that the people who paid us do."
        aside={
          <p className="max-w-[220px] text-sm leading-relaxed text-cream/55">
            98% of our clients have come back for a second project.
          </p>
        }
      />

      <div className="border-b border-cream/10 bg-ink-soft/40">
        <div className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {studioStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>

      <Section>
        <div className="container-x">
          {testimonialsState.loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-64 w-full" />
              ))}
            </div>
          ) : null}

          {testimonialsState.error ? (
            <ErrorState message={testimonialsState.error} onRetry={testimonialsState.retry} />
          ) : null}

          {!testimonialsState.loading && !testimonialsState.error && testimonials.length === 0 ? (
            <EmptyState
              title="No published testimonials yet."
              description="We are collecting a few more stories. In the meantime, ask us for references relevant to your category."
              actionLabel="Ask for references"
              actionTo="/contact"
            />
          ) : null}

          {!testimonialsState.loading && !testimonialsState.error && testimonials.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.id} delay={(index % 3) * 80}>
                  <TestimonialCard testimonial={testimonial} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </Section>

      <Marquee items={clientNames} />

      <CTASection
        eyebrow="Join them"
        title="Make something they will talk about."
        description="The best testimonial is the project you have not made yet. Tell us what it is."
      />
    </>
  )
}
