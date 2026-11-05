import { Mail } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/common/Section'
import { ErrorState, PageLoading } from '@/components/common/States'
import { siteSettings } from '@/data'
import { useAsync } from '@/hooks/useAsync'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { api } from '@/services/api'
import type { EnquiryReceipt, QuoteFormValues } from '@/types'

const nextSteps = [
  {
    title: 'We read the brief',
    copy: 'Within one working day, a real person on the team reads it — not a bot and not a sales queue.',
  },
  {
    title: 'A short call',
    copy: 'Twenty minutes to pressure-test the idea, the timeline and the budget. No deck, no hard sell.',
  },
  {
    title: 'Scope and quote',
    copy: 'A fixed scope, a delivery schedule and a number. You will know exactly what you are approving.',
  },
  {
    title: 'We make it',
    copy: 'Once approved, production starts. One producer owns the timeline and keeps you updated.',
  },
]

export function RequestQuotePage() {
  useDocumentTitle(
    'Request a quote',
    'Tell FLICKso Production about your project and get a scoped quote with a timeline. Brand films, social content, campaigns and more.',
  )

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const servicesState = useAsync(() => api.getServices(), [])
  const packagesState = useAsync(() => api.getPackages(), [])

  const services = servicesState.data ?? []
  const packages = packagesState.data ?? []
  const loading = servicesState.loading || packagesState.loading
  const error = servicesState.error ?? packagesState.error

  const requestedService = searchParams.get('service') ?? ''
  const requestedPackage = searchParams.get('package') ?? ''
  const initialService = services.some((service) => service.slug === requestedService)
    ? requestedService
    : ''
  const initialPackage = packages.some((pkg) => pkg.slug === requestedPackage)
    ? requestedPackage
    : ''

  const handleSubmitted = (receipt: EnquiryReceipt, values: QuoteFormValues) => {
    const serviceName = services.find((service) => service.slug === values.service)?.title
    const packageName = packages.find((pkg) => pkg.slug === values.packageId)?.name
    navigate('/quote/confirmation', {
      state: { receipt, values, serviceName, packageName },
    })
  }

  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title={
          <>
            Tell us what you
            <br />
            are making<span className="text-accent">.</span>
          </>
        }
        description="The more specific the brief, the more useful the quote. Two minutes now saves a week of back-and-forth later."
        aside={
          <div className="text-sm text-cream/50">
            <p className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              Replies within one working day
            </p>
            <p className="mt-1">No obligation. No mailing list.</p>
          </div>
        }
      />

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {loading ? <PageLoading label="Loading the quote form" /> : null}

            {!loading && error ? (
              <ErrorState
                message={error}
                onRetry={() => {
                  servicesState.retry()
                  packagesState.retry()
                }}
              />
            ) : null}

            {!loading && !error ? (
              <Reveal>
                <div className="card-surface p-6 md:p-9">
                  <QuoteForm
                    services={services}
                    packages={packages}
                    initialService={initialService}
                    initialPackage={initialPackage}
                    onSubmitted={handleSubmitted}
                  />
                </div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={100}>
            <aside className="space-y-8">
              <div className="border border-cream/10 bg-cream/[0.03] p-6 md:p-7">
                <p className="eyebrow">What happens next</p>
                <ol className="mt-6 space-y-6">
                  {nextSteps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-cream/15 font-mono text-[10px] text-accent">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-cream/90">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-cream/55">{step.copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t border-cream/10 pt-7">
                <p className="eyebrow">Rather just email?</p>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="mt-3 inline-flex items-center gap-2 font-display text-lg text-cream transition-colors hover:text-accent"
                >
                  <Mail className="size-4" aria-hidden />
                  {siteSettings.email}
                </a>
                <p className="mt-3 text-xs leading-relaxed text-cream/55">
                  Include a short description, a deadline and any links. We will take it from there.
                </p>
              </div>

              <div className="border border-accent/25 bg-accent/[0.06] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                  Good to know
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">
                  Your enquiry is saved before any notification is sent, so a failed email can never
                  lose your brief. You will get a reference number on the next screen.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
