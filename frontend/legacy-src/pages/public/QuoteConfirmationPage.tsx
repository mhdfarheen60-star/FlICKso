import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PageHero } from '@/components/common/PageHero'
import { Section } from '@/components/common/Section'
import { ButtonLink } from '@/components/ui/Button'
import { packages as packageData, services as serviceData, siteSettings } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { formatDate } from '@/lib/format'
import { getLastEnquiry } from '@/lib/enquiry'
import type { EnquiryReceipt, QuoteFormValues } from '@/types'

interface ConfirmationState {
  receipt?: EnquiryReceipt
  values?: QuoteFormValues
  serviceName?: string
  packageName?: string
}

export function QuoteConfirmationPage() {
  useDocumentTitle('Enquiry received')
  const location = useLocation()
  const state = (location.state ?? null) as ConfirmationState | null
  const lastEnquiry = getLastEnquiry()

  const receipt: EnquiryReceipt | null =
    state?.receipt ??
    (lastEnquiry ? { reference: lastEnquiry.reference, createdAt: lastEnquiry.createdAt } : null)

  const values: QuoteFormValues | null = state?.values ?? lastEnquiry ?? null
  const [copied, setCopied] = useState(false)

  const copyReference = async () => {
    if (!receipt) return
    try {
      await navigator.clipboard.writeText(receipt.reference)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  if (!receipt) {
    return (
      <>
        <PageHero
          eyebrow="Enquiry"
          title="No recent enquiry found."
          description="If you just submitted a brief, check your email for the reference number. Otherwise, the form is still open."
        />
        <Section>
          <div className="container-x">
            <ButtonLink to="/quote" size="md">
              Start a new enquiry
            </ButtonLink>
          </div>
        </Section>
      </>
    )
  }

  const serviceName =
    state?.serviceName ??
    serviceData.find((service) => service.slug === values?.service)?.title ??
    values?.service ??
    '—'
  const packageName =
    state?.packageName ??
    packageData.find((pkg) => pkg.slug === values?.packageId)?.name ??
    (values?.packageId ? values.packageId : 'Not selected')
  const firstName = values?.fullName?.trim().split(/\s+/)[0] ?? 'there'

  return (
    <>
      <PageHero
        eyebrow="Enquiry received"
        title={
          <>
            Brief received.
            <br />
            We are on it<span className="text-accent">.</span>
          </>
        }
        description={`Thanks, ${firstName}. Your enquiry is safely in our system. A real person will read it and reply within one working day.`}
      />

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="border border-accent/30 bg-accent/[0.06] p-6 md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Your reference
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-2xl tracking-tight text-cream md:text-3xl">
                  {receipt.reference}
                </p>
                <button
                  type="button"
                  onClick={copyReference}
                  className="inline-flex items-center gap-2 border border-cream/15 px-3 py-2 text-xs text-cream/60 transition-colors hover:border-cream/35 hover:text-cream"
                >
                  {copied ? <Check className="size-3.5 text-accent" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-cream/55">
                Keep this number for any follow-up. Submitted {formatDate(receipt.createdAt)}.
              </p>
            </div>

            {values ? (
              <div className="mt-8">
                <p className="eyebrow">What you sent</p>
                <dl className="mt-4 divide-y divide-cream/10 border-y border-cream/10">
                  <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-cream/55">Name</dt>
                    <dd className="text-sm text-cream/80">{values.fullName}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-cream/55">Email</dt>
                    <dd className="break-all text-sm text-cream/80">{values.email}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-cream/55">Service</dt>
                    <dd className="text-sm text-cream/80">{serviceName}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-cream/55">Package</dt>
                    <dd className="text-sm text-cream/80">{packageName}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-cream/55">Budget</dt>
                    <dd className="text-sm text-cream/80">{values.budget || 'To be discussed'}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-cream/55">Deadline</dt>
                    <dd className="text-sm text-cream/80">{values.deadline || 'Flexible'}</dd>
                  </div>
                </dl>
              </div>
            ) : null}

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/portfolio" variant="secondary" size="md">
                Browse the work
              </ButtonLink>
              <ButtonLink to="/" variant="ghost" size="md">
                Back to home
              </ButtonLink>
            </div>
          </div>

          <aside>
            <div className="border border-cream/10 bg-cream/[0.03] p-6 md:p-8">
              <p className="eyebrow">What happens now</p>
              <ol className="mt-6 space-y-6">
                <li className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent font-mono text-[10px] text-ink">
                    01
                  </span>
                  <div>
                    <p className="text-sm font-medium text-cream/90">Review</p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/55">
                      We read the brief and check whether we are the right fit.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-cream/15 font-mono text-[10px] text-cream/50">
                    02
                  </span>
                  <div>
                    <p className="text-sm font-medium text-cream/90">Reply</p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/55">
                      Expect an email within one working day, often sooner.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-cream/15 font-mono text-[10px] text-cream/50">
                    03
                  </span>
                  <div>
                    <p className="text-sm font-medium text-cream/90">Call</p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/55">
                      A short conversation to sharpen scope, timeline and budget.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="mt-6 border-t border-cream/10 pt-6">
              <p className="text-xs uppercase tracking-[0.14em] text-cream/55">Need to add something?</p>
              <a
                href={`mailto:${siteSettings.email}?subject=Enquiry%20${encodeURIComponent(receipt.reference)}`}
                className="mt-2 inline-flex items-center gap-2 text-sm text-cream/75 transition-colors hover:text-accent"
              >
                <Mail className="size-4" aria-hidden />
                {siteSettings.email}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
              <p className="mt-2 text-xs text-cream/55">Quote the reference above.</p>
            </div>

            <Link
              to="/testimonials"
              className="group mt-8 flex items-center justify-between gap-4 border-t border-cream/10 pt-6 text-sm text-cream/50 transition-colors hover:text-cream"
            >
              See what clients say
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </aside>
        </div>
      </Section>
    </>
  )
}
