import { Minus, Plus } from 'lucide-react'
import { PackageCard } from '@/components/cards/PackageCard'
import { CTASection } from '@/components/common/CTASection'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/common/Section'
import { EmptyState, ErrorState, SkeletonBlock } from '@/components/common/States'
import { ButtonLink } from '@/components/ui/Button'
import { useAsync } from '@/hooks/useAsync'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { api } from '@/services/api'

const faqs = [
  {
    question: 'Can we change what is in a package?',
    answer:
      'Yes. The packages are starting points, not boxes. We regularly swap a few static posts for extra video, add a shoot day, or combine a package with a one-off brand film. Tell us what the month actually needs.',
  },
  {
    question: 'What counts as a creative?',
    answer:
      'A creative is one finished asset: a static post, a carousel, or a short video edit. Videos are counted separately from static posters because they take longer to produce. Every deliverable is listed in the proposal before we start.',
  },
  {
    question: 'Do you handle the shoot as well?',
    answer:
      'Yes. Packages include shoot days, crew, lighting and direction. Larger productions — multiple locations, talent, sets — are quoted separately so you are not paying for scale you do not need.',
  },
  {
    question: 'Is ad spend included?',
    answer:
      'No. Packages cover strategy, production and delivery. Media buying and ad spend sit with you or your media agency. We do provide paid-ready edits and format variants so the content can run without rework.',
  },
  {
    question: 'How long do we need to commit?',
    answer:
      'The minimum is three months. Content systems need a few cycles to show what is working, and a single month rarely gives us enough signal to improve the next one.',
  },
]

export function PackagesPage() {
  useDocumentTitle(
    'Packages',
    'Monthly social media content packages from FLICKso Production — creatives, videos and static posters, with strategy and production included.',
  )

  const packagesState = useAsync(() => api.getPackages(), [])
  const packages = packagesState.data ?? []

  return (
    <>
      <PageHero
        eyebrow="Monthly content packages"
        title={
          <>
            Social, handled<span className="text-accent">.</span>
          </>
        }
        description="Consistent content without the monthly scramble. Pick a baseline, then we tailor the mix to what your brand actually needs to publish."
        aside={
          <div className="text-sm text-cream/50">
            <p className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              Three-month minimum
            </p>
            <p className="mt-1">Custom mixes available</p>
          </div>
        }
      />

      <Section>
        <div className="container-x">
          {packagesState.loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-[520px] w-full" />
              ))}
            </div>
          ) : null}

          {packagesState.error ? (
            <ErrorState message={packagesState.error} onRetry={packagesState.retry} />
          ) : null}

          {!packagesState.loading && !packagesState.error && packages.length === 0 ? (
            <EmptyState
              title="Packages are being updated."
              description="Our current package grid is temporarily offline. Send a brief and we will put together a custom scope for you."
              actionLabel="Build a custom plan"
              actionTo="/quote"
            />
          ) : null}

          {!packagesState.loading && !packagesState.error && packages.length > 0 ? (
            <>
              <h2 className="sr-only">Monthly content packages</h2>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {packages.map((pkg, index) => (
                  <Reveal key={pkg.id} delay={index * 70}>
                    <PackageCard package={pkg} />
                  </Reveal>
                ))}
              </div>
              <p className="mt-6 max-w-3xl text-xs leading-relaxed text-cream/55">
                Package contents are managed by the FLICKso team and pulled from the CMS — the
                numbers above are the current published offer, not hardcoded marketing copy.
              </p>
            </>
          ) : null}
        </div>
      </Section>

      {packages.length > 0 ? (
        <Section className="border-y border-cream/10 bg-ink-soft/40">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow">Side by side</p>
              <h2 className="display-2 mt-4">Compare the numbers.</h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <caption className="sr-only">Comparison of monthly content packages</caption>
                  <thead>
                    <tr className="border-y border-cream/15">
                      <th scope="col" className="py-4 pr-6 text-xs font-medium uppercase tracking-[0.14em] text-cream/55">
                        Deliverable
                      </th>
                      {packages.map((pkg) => (
                        <th key={pkg.id} scope="col" className="px-4 py-4">
                          <span className="block font-display text-lg font-medium text-cream">
                            {pkg.name}
                          </span>
                          <span className="mt-0.5 block text-[11px] font-normal text-cream/55">
                            {pkg.tagline}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { label: 'Creatives', key: 'creatives' as const },
                      { label: 'Videos', key: 'videos' as const },
                      { label: 'Static posters', key: 'posters' as const },
                    ].map((row) => (
                      <tr key={row.key} className="border-b border-cream/10">
                        <th scope="row" className="py-4 pr-6 font-normal text-cream/55">
                          {row.label}
                        </th>
                        {packages.map((pkg) => (
                          <td key={pkg.id} className="px-4 py-4 font-display text-xl text-cream">
                            {pkg[row.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <th scope="row" className="py-5 pr-6 font-normal text-cream/55">
                        <span className="sr-only">Choose a package</span>
                      </th>
                      {packages.map((pkg) => (
                        <td key={pkg.id} className="px-4 py-5">
                          <ButtonLink
                            to={`/quote?package=${pkg.slug}`}
                            variant={pkg.popular ? 'primary' : 'secondary'}
                            size="sm"
                          >
                            Choose {pkg.name}
                          </ButtonLink>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display-2 mt-4">Before you pick one.</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/50">
              Still unsure which tier fits? Send a short brief and we will recommend the smallest
              package that can actually do the job.
            </p>
            <ButtonLink to="/quote" variant="secondary" size="md" className="mt-7">
              Ask us
            </ButtonLink>
          </Reveal>

          <div className="border-t border-cream/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-cream/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg font-medium tracking-tight text-cream/85">
                    {faq.question}
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-cream/15 text-cream/50 transition-colors group-open:border-accent group-open:text-accent">
                    <Plus className="size-4 group-open:hidden" aria-hidden />
                    <Minus className="hidden size-4 group-open:block" aria-hidden />
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 pr-10 text-sm leading-relaxed text-cream/50">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        eyebrow="Custom scope"
        title="Need something outside the box?"
        description="A launch film, a one-off campaign, a quarterly shoot or a mix of everything. We quote custom work the same way: clear scope, clear timeline, clear number."
        primaryLabel="Build a custom plan"
        secondaryLabel="See the work"
      />
    </>
  )
}
